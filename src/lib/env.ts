const envRef = {
    current: {
        SUPABASE_URL: "",
        SUPABASE_ANON_KEY: "",
        SUPABASE_BASE_KEY: "",
    },
};

export const reloadEnv = () => {
    envRef.current = {
        SUPABASE_URL: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
        SUPABASE_ANON_KEY: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        SUPABASE_BASE_KEY: String(
            process.env.NEXT_PUBLIC_SUPABASE_BASE_KEY ||
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        ),
    };
};

reloadEnv();

export function env() {
    return {
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    };
}
