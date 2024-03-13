export default function ReadyOverlay({
    readyCountdownTimeMs,
}: {
    readyCountdownTimeMs: number;
}) {
    return (
        <div className="flex h-64 w-64 flex-col items-center justify-center rounded-xl border-8 border-emerald-600 bg-emerald-400/70 p-8 shadow-lg backdrop-blur-sm">
            <p className="text-8xl font-extrabold">
                {Math.floor(readyCountdownTimeMs / 1000) > 0
                    ? Math.floor(readyCountdownTimeMs / 1000)
                    : "Go!"}
            </p>
        </div>
    );
}
