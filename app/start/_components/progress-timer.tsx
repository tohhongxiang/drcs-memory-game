export default function ProgressTimer({ progress }: { progress: number }) {
    return (
        <div className="flex w-full flex-col items-center justify-center px-8 py-2">
            <div
                className={"h-4 w-full rounded-full bg-emerald-500"}
                style={{ transform: `scaleX(${progress * 100}%)` }}
            />
        </div>
    );
}
