import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";

export function createClient(request: NextRequest) {
  let response: NextResponse | undefined;

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          if (!response) {
            response = NextResponse.next();
          }
          cookiesToSet.forEach(({ name, value, options }) =>
            response!.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  return supabase;
}
