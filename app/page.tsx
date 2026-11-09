'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Bookmark, Check, CheckCheck, ChevronRight, CircleHelp, Crosshair, ExternalLink, Flame, Layers3, Map, Menu, Play, Search, Send, Shield, CloudFog, Sparkles, Target, X, Zap } from 'lucide-react';
import { maps, plans, type Grenade, type MapId, type Side, type Zone } from '../src/data/catalog';

const typeNames = { smoke: 'Смок', flash: 'Флешка', molotov: 'Молотов', he: 'Граната' };
const difficultyNames = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' };
const typeIcons = { smoke: CloudFog, flash: Zap, molotov: Flame, he: Target };
const mapShort: Record<MapId, string> = { mirage: 'MRG', dust2: 'D2', anubis: 'ANB', overpass: 'OVP', nuke: 'NUK' };
const mapPlaces: Record<MapId, string> = { mirage: 'МАРОККО', dust2: 'МАРОККО', anubis: 'ЕГИПЕТ', overpass: 'ГЕРМАНИЯ', nuke: 'США' };

function youtubeId(url: string) {
  try { const u = new URL(url); if (u.hostname === 'youtu.be') return u.pathname.slice(1); if (u.hostname.endsWith('youtube.com')) return u.searchParams.get('v') || u.pathname.split('/').at(-1); } catch { /* external source */ }
  return null;
}

function readIds(key: string): string[] {
  try { const data: unknown = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(data) ? data.filter((id): id is string => typeof id === 'string') : []; } catch { return []; }
}

export default function Home() {
  const [mapId, setMapId] = useState<MapId>('mirage');
  const [side, setSide] = useState<Side>('t');
  const [zone, setZone] = useState<Zone>('a');
  const [query, setQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [activeGrenade, setActiveGrenade] = useState<Grenade | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const currentMap = maps.find(map => map.id === mapId)!;
  const currentPlan = plans.find(plan => plan.mapId === mapId && plan.side === side && plan.zone === zone);
  const allGrenades = useMemo(() => Array.from(new globalThis.Map(plans.flatMap(plan => plan.grenades).map(grenade => [grenade.id, grenade])).values()), []);
  const filteredGrenades = useMemo(() => {
    const source = favoritesOnly ? allGrenades.filter(grenade => favoriteIds.includes(grenade.id)) : currentPlan?.grenades || [];
    const needle = query.trim().toLocaleLowerCase('ru');
    return source.filter(grenade => !needle || `${grenade.title} ${grenade.from} ${grenade.to} ${typeNames[grenade.type]}`.toLocaleLowerCase('ru').includes(needle));
  }, [allGrenades, currentPlan, favoriteIds, favoritesOnly, query]);
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'raskidkiotkocha_bot';
  const botLink = botUsername ? `https://t.me/${botUsername.replace(/^@/, '')}` : null;

  useEffect(() => { setFavoriteIds(readIds('lineup-favorites')); setMasteredIds(readIds('lineup-mastered')); }, []);
  useEffect(() => { if (activeGrenade || helpOpen) { dialog.current?.showModal(); closeRef.current?.focus(); } else dialog.current?.close(); }, [activeGrenade, helpOpen]);
  useEffect(() => { if (!notice) return; const timeout = setTimeout(() => setNotice(''), 2600); return () => clearTimeout(timeout); }, [notice]);

  function toggleSaved(id: string, kind: 'favorite' | 'mastered') {
    const ids = kind === 'favorite' ? favoriteIds : masteredIds;
    const next = ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id];
    if (kind === 'favorite') setFavoriteIds(next); else setMasteredIds(next);
    try { localStorage.setItem(`lineup-${kind === 'favorite' ? 'favorites' : 'mastered'}`, JSON.stringify(next)); }
    catch { setNotice('Хранилище браузера недоступно. Сохранено до закрытия страницы.'); return; }
    setNotice(kind === 'favorite' ? next.includes(id) ? 'В избранном на этом устройстве' : 'Удалено из избранного' : next.includes(id) ? 'Отмечено как отработанное' : 'Отметка тренировки снята');
  }

  function selectMap(next: MapId) { setMapId(next); setFavoritesOnly(false); setQuery(''); setMenuOpen(false); }
  function closeDialog() { setActiveGrenade(null); setHelpOpen(false); }
  const activeVideoId = activeGrenade ? youtubeId(activeGrenade.videoUrl) : null;

  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Навигация">
      <a className="wordmark" href="/" aria-label="LINEUP — главная"><span className="brand-icon"><Crosshair size={22} /></span>LINEUP<span className="brand-dot">.</span></a>
      <div className="sidebar-subtitle">ТВОЙ КАРМАННЫЙ ТРЕНЕР</div>
      <div className="nav-caption">ПЛЕЙБУК</div>
      <button className={`nav-item ${!favoritesOnly ? 'active' : ''}`} onClick={() => { setFavoritesOnly(false); setMenuOpen(false); }}><Layers3 size={17} />Каталог раскидок<ChevronRight size={15} className="nav-end" /></button>
      <button className={`nav-item ${favoritesOnly ? 'active' : ''}`} onClick={() => { setFavoritesOnly(true); setQuery(''); setMenuOpen(false); }}><Bookmark size={17} />Избранное<span className="count-pill">{favoriteIds.length}</span></button>
      <div className="nav-caption maps-caption">ВЫБЕРИ КАРТУ<span>05</span></div>
      <nav className="map-nav" aria-label="Карты Counter-Strike 2">
        {maps.map((map, index) => <button key={map.id} className={`map-nav-item ${mapId === map.id && !favoritesOnly ? 'selected' : ''}`} onClick={() => selectMap(map.id)} aria-pressed={mapId === map.id && !favoritesOnly}>
          <span className={`map-emblem emblem-${map.id}`}><Map size={20} /></span><span>{map.name}</span><span className="map-index">0{index + 1}</span>
        </button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="training-card"><div className="training-card-top"><Target size={17} /><span>Маленькие шаги.<br />Большие раунды.</span></div><p>Выучи одну раскидку.<br />Примени в следующей игре.</p><div className="training-progress"><span>{masteredIds.length} отработано</span><CheckCheck size={15} /></div></div>
        <button className="help-link" onClick={() => { setHelpOpen(true); setMenuOpen(false); }}><CircleHelp size={16} />Как пользоваться<ArrowUpRight size={14} /></button>
        <span className="sidebar-version">COUNTER-STRIKE 2 · UTILITY GUIDE</span>
      </div>
    </aside>
    {menuOpen && <button className="nav-overlay" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)} />}
    <main>
      <header className="topbar"><div className="breadcrumb"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню"><Menu size={22} /></button><span>Плейбук</span><ChevronRight size={14} /><strong>{favoritesOnly ? 'Избранное' : currentMap.name}</strong></div><div className="topbar-right"><span className="topbar-caption"><span className="status-dot" />МЕНЬШЕ ХАОСА. БОЛЬШЕ КОНТРОЛЯ.</span>{botLink && <a className="telegram-button" href={botLink} target="_blank" rel="noreferrer"><Send size={15} />Открыть бота<ArrowUpRight size={14} /></a>}</div></header>
      <div className="main-content">
        <section className="intro"><div className="eyebrow"><span />ГРАНАТЫ РЕШАЮТ РАУНДЫ</div><h1>Хорошая раскидка.<br /><span>Чистый выход.</span></h1><p>Нужная граната в нужный момент. Выбери карту,<br className="desktop-break" /> изучи бросок и забери преимущество.</p><div className="intro-stamp"><div className="stamp-crosshair"><Crosshair strokeWidth={1} /></div><span>PREPARE.<br />EXECUTE.<br /><b>REPEAT.</b></span></div></section>
        {favoritesOnly ? <section className="favorites-banner"><div><div className="eyebrow">ТВОЯ КОЛЛЕКЦИЯ</div><h2>Всегда под рукой</h2><p>Сохранённые раскидки со всех карт. Избранное веб-версии хранится на этом устройстве.</p></div><Bookmark size={58} strokeWidth={1} /></section> : <>
          <section className={`map-banner banner-${mapId}`} aria-label={`Карта ${currentMap.name}`}>
            <div className="map-art" aria-hidden="true"><div className="art-ring ring-outer" /><div className="art-ring ring-inner" /><div className="art-cross vertical" /><div className="art-cross horizontal" /><div className="art-route route-one" /><div className="art-route route-two" /><span className="art-site site-a">A</span><span className="art-site site-b">B</span><span className="art-coordinates">{mapShort[mapId]} / UTILITY OPERATIONS</span></div>
            <div className="map-banner-content"><div className="map-meta"><span className="map-meta-dot" />{mapPlaces[mapId]}<span className="meta-separator">/</span>5V5 · DEFUSAL</div><h2>{currentMap.name}<span>↗</span></h2><p>{currentMap.description}</p><div className="map-tags"><span><Layers3 size={13} />{plans.filter(plan => plan.mapId === mapId).length} планов</span><span><Play size={12} />Видео бросков</span><span>T + CT</span></div></div>
            <span className="banner-footnote">ТАКТИЧЕСКАЯ ИЛЛЮСТРАЦИЯ</span>
          </section>
          <section className="selection-row" aria-label="Выбор стороны и зоны"><div className="side-select" role="group" aria-label="Сторона"><button className={side === 't' ? 'selected t-side' : ''} aria-pressed={side === 't'} onClick={() => setSide('t')}><Crosshair size={16} /><b>T</b><span>Атака</span></button><button className={side === 'ct' ? 'selected ct-side' : ''} aria-pressed={side === 'ct'} onClick={() => setSide('ct')}><Shield size={16} /><b>CT</b><span>Защита</span></button></div><div className="zone-select" role="group" aria-label="Зона карты">{(['a', 'b', 'mid'] as Zone[]).map(item => <button key={item} className={zone === item ? 'selected' : ''} onClick={() => setZone(item)} aria-pressed={zone === item}>{item === 'mid' ? currentMap.midLabel || 'Мид' : `Плент ${item.toUpperCase()}`}{zone === item && <span />}</button>)}</div></section>
          {currentPlan && <section className="plan-section"><div className="plan-heading"><span className="section-number">01 / ПЛАН НА РАУНД</span><span className="plan-side-label">{side === 't' ? 'ЗАХВАТ ПРОСТРАНСТВА' : 'КОНТРОЛЬ И СДЕРЖИВАНИЕ'}</span></div><h3>{currentPlan.title}</h3><p className="plan-description">{currentPlan.description}</p><ol className="plan-steps">{currentPlan.steps.map((step, index) => <li key={`${index}-${step}`}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><p>{step}</p>{index < currentPlan.steps.length - 1 && <ArrowRight size={16} className="step-arrow" />}</li>)}</ol></section>}
        </>}
        <section className="grenades-section" aria-label="Карточки раскидок"><div className="grenades-heading"><div><span className="section-number">{favoritesOnly ? 'СОХРАНЁННЫЕ БРОСКИ' : '02 / ОТРАБОТАЙ БРОСКИ'}</span><h3>{favoritesOnly ? 'Избранное' : 'Арсенал для этого плана'}<span className="result-count">{filteredGrenades.length}</span></h3></div><label className="search-field"><Search size={16} /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Найти раскидку…" aria-label="Поиск раскидок" />{query && <button aria-label="Очистить поиск" onClick={() => setQuery('')}><X size={14} /></button>}</label></div>
          {filteredGrenades.length === 0 ? <div className="empty-state"><Bookmark size={30} /><h4>{favoritesOnly && !query ? 'Собери свой плейбук' : 'Здесь пока пусто'}</h4><p>{favoritesOnly && !query ? 'Нажми на закладку в карточке, чтобы сохранить полезный бросок.' : 'Попробуй другой запрос или выбери другую зону.'}</p><button className="text-button" onClick={() => { setQuery(''); setFavoritesOnly(false); }}>К каталогу<ArrowRight size={16} /></button></div> : <div className="grenade-grid">{filteredGrenades.map((grenade, index) => { const Icon = typeIcons[grenade.type]; const saved = favoriteIds.includes(grenade.id); const mastered = masteredIds.includes(grenade.id); const videoId = youtubeId(grenade.videoUrl); return <article className={`grenade-card type-${grenade.type}`} key={`${index}-${grenade.id}`}>
            <div className="grenade-preview">{videoId ? <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" /> : <div className="grenade-preview-art"><div className="preview-orbit" /><Icon size={58} strokeWidth={1} /><span>UTILITY / {grenade.type.toUpperCase()}</span></div>}<span className={`grenade-type type-label-${grenade.type}`}><Icon size={13} />{typeNames[grenade.type]}</span><button className={`bookmark-button ${saved ? 'saved' : ''}`} onClick={() => toggleSaved(grenade.id, 'favorite')} aria-label={saved ? `Удалить ${grenade.title} из избранного` : `Сохранить ${grenade.title}`} aria-pressed={saved}><Bookmark size={17} fill={saved ? 'currentColor' : 'none'} /></button><button className="preview-play" onClick={() => setActiveGrenade(grenade)} aria-label={`Открыть раскидку ${grenade.title}`}><Play size={19} fill="currentColor" /></button><div className="preview-bottom"><span>{grenade.technique}</span><span className={`difficulty difficulty-${grenade.difficulty}`}><i /><i /><i />{difficultyNames[grenade.difficulty]}</span></div></div>
            <div className="grenade-body"><h4>{grenade.title}</h4><div className="grenade-route"><span>{grenade.from}</span><ArrowRight size={13} /><span>{grenade.to}</span></div><p>{grenade.steps[0]}</p><div className="grenade-actions"><button className="watch-button" onClick={() => setActiveGrenade(grenade)}><Play size={13} fill="currentColor" />Смотреть раскидку<ArrowUpRight size={14} /></button><button className={`practice-button ${mastered ? 'mastered' : ''}`} onClick={() => toggleSaved(grenade.id, 'mastered')} aria-label={mastered ? `Снять отметку отработано: ${grenade.title}` : `Отметить отработано: ${grenade.title}`} aria-pressed={mastered} title={mastered ? 'Отработано на этом устройстве' : 'Отметить как отработанное'}><Check size={17} /></button></div></div>
          </article>; })}</div>}
        </section>
        <section className="practice-tip"><span className="tip-icon"><Sparkles size={20} /></span><div><strong>Сначала тренировка. Потом матч.</strong><p>Повтори бросок на тренировочном сервере: обновления CS2 могут менять геометрию и траектории гранат.</p></div><span className="tip-label">ХОРОШАЯ ПРИВЫЧКА</span></section>
        {botLink && <section className="telegram-strip"><div className="telegram-strip-icon"><Send size={25} /></div><div><h3>Твой плейбук — уже в Telegram</h3><p>Открывай раскидки между раундами. Сохраняй любимые и отмечай прогресс в боте.</p></div><a href={botLink} target="_blank" rel="noreferrer">Перейти в бота<ArrowUpRight size={16} /></a></section>}
        <footer><span className="footer-brand">LINEUP<span>.</span></span><p>Независимый гид по Counter-Strike 2. Не связан с Valve.</p><button onClick={() => setHelpOpen(true)}>Источники и данные<ArrowUpRight size={12} /></button></footer>
      </div>
    </main>
    <div className={`toast ${notice ? 'visible' : ''}`} role="status"><Check size={15} />{notice}</div>
    <dialog ref={dialog} className="lineup-dialog" onCancel={event => { event.preventDefault(); closeDialog(); }} onClick={event => { if (event.target === event.currentTarget) closeDialog(); }}>
      <div className="dialog-inner"><button className="dialog-close" ref={closeRef} onClick={closeDialog} aria-label="Закрыть"><X size={20} /></button>{activeGrenade ? <><div className="eyebrow">{typeNames[activeGrenade.type]} / {activeGrenade.technique}</div><h2>{activeGrenade.title}</h2><div className="dialog-route">{activeGrenade.from}<ArrowRight size={16} />{activeGrenade.to}</div>{activeVideoId ? <div className="video-container"><iframe title={`Видео: ${activeGrenade.title}`} src={`https://www.youtube-nocookie.com/embed/${activeVideoId}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div> : /\.(mp4|webm)(\?|$)/i.test(activeGrenade.videoUrl) ? <video className="inline-video" src={activeGrenade.videoUrl} controls playsInline preload="metadata" /> : <a className="external-video" href={activeGrenade.videoUrl} target="_blank" rel="noreferrer"><Play size={32} /><span>Открыть видео броска<small>Видео откроется на сайте источника</small></span><ArrowUpRight size={20} /></a>}<ol className="dialog-steps">{activeGrenade.steps.map((step, index) => <li key={index}><span>{index + 1}</span>{step}</li>)}</ol><div className="dialog-source"><span>Источник: <a href={activeGrenade.sourceUrl} target="_blank" rel="noreferrer">{activeGrenade.sourceName}<ExternalLink size={12} /></a></span><a href={activeGrenade.videoUrl} target="_blank" rel="noreferrer">Открыть оригинал<ArrowUpRight size={13} /></a></div><div className="dialog-actions"><button className={`save-action ${favoriteIds.includes(activeGrenade.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(activeGrenade.id, 'favorite')}><Bookmark size={16} />{favoriteIds.includes(activeGrenade.id) ? 'В избранном' : 'В избранное'}</button><button className={`save-action ${masteredIds.includes(activeGrenade.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(activeGrenade.id, 'mastered')}><Check size={16} />{masteredIds.includes(activeGrenade.id) ? 'Отработано' : 'Отметить отработано'}</button></div><p className="local-note">Отметки веб-версии сохраняются только на этом устройстве.</p></> : <><div className="eyebrow">ЗНАЙ СВОЙ ИНСТРУМЕНТ</div><h2>Пара минут до хорошего броска</h2><div className="help-content"><h3>Карта → сторона → зона</h3><p>Выбери карту и сторону T или CT, затем плент A, B или мид. На Nuke центральный контроль — это улица. В каждом разделе есть план и карточки бросков с видео.</p><h3>Смотри, повторяй, отмечай</h3><p>Открой карточку, посмотри видео и повтори бросок на тренировочном сервере. Точные ориентиры сверяй с видео. Иллюстрация в шапке декоративная и не заменяет радар карты.</p><h3>Избранное и прогресс</h3><p>На сайте они хранятся в браузере этого устройства. В Telegram избранное и прогресс привязаны к аккаунту и хранятся отдельно. Очистка данных браузера удалит локальные отметки.</p><h3>Видео и актуальность</h3><p>У каждой раскидки указан исходный материал. Видео принадлежат своим авторам. Каталог — учебная подборка, а не гарантия работы броска на текущем патче: перед матчем проверь его в игре.</p>{botLink && <a className="help-bot-link" href={botLink} target="_blank" rel="noreferrer"><Send size={16} />Открыть Telegram-бота<ArrowUpRight size={14} /></a>}</div></> }</div>
    </dialog>
  </div>;
}
