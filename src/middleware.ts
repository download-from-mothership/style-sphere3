import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export async function middleware(request: NextRequest) {
    try {
        let supabaseResponse = NextResponse.next({
            request,
        });

        const supabaseUrl = env().SUPABASE_URL || 'default_url';
        const supabaseAnonKey = env().SUPABASE_ANON_KEY || 'default_key';

        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('Supabase URL or Anon Key is not set');
        }

        const supabase = createServerClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) =>
                            request.cookies.set(name, value)
                        );
                        supabaseResponse = NextResponse.next({
                            request,
                        });
                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options)
                        );
                    },
                },
            },
        );

        // IMPORTANT: Avoid writing any logic between createServerClient and
        // supabase.auth.getUser(). A simple mistake could make it very hard to debug
        // issues with users being randomly logged out.

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            if (request.nextUrl.pathname.startsWith("/auth")) {
                // user is logged in, potentially respond by redirecting the user to the home page
                const url = request.nextUrl.clone();
                url.pathname = "/";
                return NextResponse.redirect(url);
            }
        } else {
            if (!request.nextUrl.pathname.startsWith("/auth")) {
                // no user, potentially respond by redirecting the user to the login page
                const url = request.nextUrl.clone();
                url.pathname = "/auth/login";
                url.searchParams.set("next", request.nextUrl.pathname);
                return NextResponse.redirect(url);
            }
        }

        // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
        // creating a new response object with NextResponse.next() make sure to:
        // 1. Pass the request in it, like so:
        //    const myNewResponse = NextResponse.next({ request })
        // 2. Copy over the cookies, like so:
        //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
        // 3. Change the myNewResponse object to fit your needs, but avoid changing
        //    the cookies!
        // 4. Finally:
        //    return myNewResponse
        // If this is not done, you may be causing the browser and server to go out
        // of sync and terminate the user's session prematurely!

        if (process.env.NODE_ENV !== 'production') {
            console.log('Supabase URL:', env().SUPABASE_URL);
            console.log('Supabase Anon Key:', env().SUPABASE_ANON_KEY ? 'Set' : 'Not Set');
        }

        return supabaseResponse;
    } catch (error) {
        console.error('Middleware error:', error);
        // Return a basic response to avoid crashing
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public file extensions
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
