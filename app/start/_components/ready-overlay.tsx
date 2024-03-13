export default function ReadyOverlay({
    readyCountdownTimeMs,
}: {
    readyCountdownTimeMs: number;
}) {
    return (
        <div className="relative flex h-64 w-64 flex-col items-center justify-center p-8">
            <p className="z-10 text-8xl font-extrabold">
                {Math.floor(readyCountdownTimeMs / 1000) > 0
                    ? Math.floor(readyCountdownTimeMs / 1000)
                    : "Go!"}
            </p>
            <div className="absolute h-full w-full rounded-xl border-8 border-green-600 bg-green-400/70 shadow-lg backdrop-blur-sm" />
        </div>
    );
}
