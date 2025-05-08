// next.config.ts
import nextPwa from 'next-pwa';
import type { NextConfig } from 'next';

const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // disables PWA in dev mode
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ✅ Remove swcMinify — no longer valid in Next.js 14+
};

export default withPWA(nextConfig);
