"use client";

import { Button } from "@/components/ui/button";
import { VolumeX, Volume2 } from "lucide-react";
import MutedContextProvider, {
    useMutedContext,
} from "./_providers/muted-provider";
import { LazyMotion, domMax } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MutedContextProvider>
            <LazyMotion features={domMax}>
                <StartLayout>{children}</StartLayout>
            </LazyMotion>
        </MutedContextProvider>
    );
}

function StartLayout({ children }: { children: React.ReactNode }) {
    const { isMuted, toggleMuted } = useMutedContext();
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
            <Button
                className="absolute right-4 top-4 h-16 w-16"
                onClick={toggleMuted}
                variant="outline"
                aria-label="Toggle sound"
            >
                {isMuted ? (
                    <VolumeX className="h-full w-full" />
                ) : (
                    <Volume2 className="h-full w-full" />
                )}
            </Button>
            {children}
        </div>
    );
}
