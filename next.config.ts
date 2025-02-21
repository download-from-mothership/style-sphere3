import type { NextConfig } from "next";
import { env } from "./src/lib/env";
import createNextIntlPlugin from "next-intl/plugin";

// Example of disabling the rule for a specific line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const someVariable: any = {}; // Replace with the actual line where `any` is used

const nextConfig: NextConfig = {
  env: env(),
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
