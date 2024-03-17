/** @type {import('next').NextConfig} */

// Configuration options for Next.js
const nextConfig = {
    reactStrictMode: true, // Enable React strict mode for improved error handling
    swcMinify: true, // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
    },
};

// Configuration object tells the next-pwa plugin
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
    dest: "public", // Destination directory for the PWA files
    disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
    buildExcludes: [/middleware-manifest.json$/],
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

// Export the combined configuration for Next.js with PWA support
module.exports = withBundleAnalyzer(withPWA(nextConfig));
