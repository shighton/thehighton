import { createServerClient } from '@supabase/ssr';

export function createClient(req, res) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return Object.entries(req.cookies || {}).map(([name, value]) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          const serialized = cookiesToSet.map(({ name, value, options }) => {
            return `${name}=${value}; Path=/; HttpOnly`;
          });

          res.setHeader('Set-Cookie', serialized);
        },
      },
    }
  );
}