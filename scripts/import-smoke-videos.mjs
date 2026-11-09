// node scripts/import-smoke-videos.mjs /absolute/path/to/manifest.json
// Manifest: { "mirage-t-a-1": "/absolute/path/to/smoke.mp4", ... }
import { readFile, copyFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const input = process.argv[2];
if (!input) throw new Error('Укажите JSON-манифест: { "ID броска": "/путь/к/видео.mp4" }');
const catalog = await readFile(path.join(root, 'src/data/catalog.ts'), 'utf8');
const plans = JSON.parse(catalog.split('export const plans: Plan[] = ')[1].trim().replace(/;$/, ''));
const allowed = new Set(plans.flatMap(p => p.grenades.filter(g => g.type === 'smoke').map(g => g.id)));
const current = await readFile(path.join(root, 'src/data/media.ts'), 'utf8');
const media = JSON.parse(current.split('= ')[1].trim().replace(/;$/, ''));
const entries = JSON.parse(await readFile(input, 'utf8'));
const validated = [];
for (const [id, file] of Object.entries(entries)) {
  if (!allowed.has(id) || typeof file !== 'string' || !/\.(mp4|webm)$/i.test(file)) throw new Error(`Некорректная запись: ${id}`);
  const bytes = await readFile(file);
  if (bytes.length > 25 * 1024 * 1024) throw new Error(`Сожмите ${id}: максимум 25 МБ на ролик.`);
  const mp4 = bytes.subarray(4, 8).toString() === 'ftyp';
  const webm = bytes.subarray(0, 4).equals(Buffer.from([0x1a,0x45,0xdf,0xa3]));
  if (!mp4 && !webm) throw new Error(`Файл ${id} не является MP4 или WebM.`);
  const name = `${id}-${createHash('sha256').update(bytes).digest('hex').slice(0, 12)}.${mp4 ? 'mp4' : 'webm'}`;
  validated.push({ id, file, name });
}
await mkdir(path.join(root, 'public/videos'), { recursive: true });
for (const { id, file, name } of validated) { await copyFile(file, path.join(root, 'public/videos', name)); media[id] = `/videos/${name}`; }
await writeFile(path.join(root, 'src/data/media.ts'), `/** Imported native video files. */\nexport const nativeVideos: Record<string, string> = ${JSON.stringify(media, null, 2)};\n`);
console.log(`Импортировано видео: ${validated.length}. Теперь выполните сборку и deploy.`);
