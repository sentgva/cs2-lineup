import { secretHash } from "./auth.ts";
import { handleStoreRequest } from "./handler.ts";

// This runs on Supabase Edge (Deno), not in the Next.js bundle.
Deno.serve((req: Request) => {
  const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
  return handleStoreRequest(req, {
    secretHash,
    supabaseUrl: Deno.env.get("SUPABASE_URL") || "",
    serviceKey: keys.default || Object.values(keys)[0] || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
  });
});
