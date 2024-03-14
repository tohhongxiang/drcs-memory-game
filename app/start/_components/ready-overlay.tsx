import { useEffect, useRef } from "react";
import useSound from "use-sound";

export default function ReadyOverlay({
    readyCountdownTimeMs,
}: {
    readyCountdownTimeMs: number;
}) {
    const ref = useRef<HTMLParagraphElement | null>(null);
    const [playGo, { stop: stopGo }] = useSound("./correct.mp3");
    const [playReady, { stop: stopReady }] = useSound("./reveal.mp3");

    useEffect(() => {
        if (readyCountdownTimeMs > 1000) {
            playReady();
        } else if (readyCountdownTimeMs > 0) {
            playGo();
        }
        return () => {
            stopReady();
            stopGo();
        };
    }, [readyCountdownTimeMs, playReady, playGo, stopReady, stopGo]);

    return (
        <div
            className="relative flex h-64 w-64 flex-col items-center justify-center p-8"
            ref={ref}
        >
            <p className="z-10 text-8xl font-extrabold">
                {Math.floor((readyCountdownTimeMs - 1) / 1000) > 0 // prevent flash of initial number by subtracting 1
                    ? Math.floor((readyCountdownTimeMs - 1) / 1000)
                    : "Go!"}
            </p>
            <div className="absolute h-full w-full rounded-xl border-8 border-green-600 bg-green-400/70 shadow-lg backdrop-blur-sm" />
        </div>
    );
}
