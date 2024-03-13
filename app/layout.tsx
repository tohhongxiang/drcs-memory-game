import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DRCS Memory Game",
    description: "Take-home-assignment by Toh Hong Xiang",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
