import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
    minimumScale: 1,
    initialScale: 1,
    width: "device-width",
    viewportFit: "cover",
};

export const metadata: Metadata = {
    title: "DRCS Memory Game",
    description: "Take-home-assignment by Toh Hong Xiang",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: [
        "nextjs",
        "nextjs14",
        "next14",
        "pwa",
        "next-pwa",
        "memory-game",
        "game",
    ],
    authors: [
        { name: "Toh Hong Xiang" },
        {
            name: "Toh Hong Xiang",
            url: "https://www.linkedin.com/in/toh-hong-xiang/",
        },
    ],

    icons: [
        { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
        { rel: "icon", url: "icons/icon-192x192.png" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "h-full min-h-screen bg-background",
                    inter.className
                )}
            >
                {children}
            </body>
        </html>
    );
}
