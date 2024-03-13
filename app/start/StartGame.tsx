"use client";
import { Button } from "@/components/ui/button";
import Game from "./_components/game";
import useGame from "./hooks/use-game";
import { Check } from "lucide-react";

export default function StartGame() {
    const {
        gameState,
        isRevealed,
        start,
        showReady,
        showSuccess,
        level,
        reset,
        cells,
        selectCell,
        confirmUserSelection,
    } = useGame();

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            {gameState.isCompleted ? (
                <>
                    <h1 className="mb-4 text-5xl font-bold">
                        Congratulations!
                    </h1>
                    <p className="mb-16 text-muted-foreground">
                        You have completed all the levels!
                    </p>
                    <Button size="lg" onClick={reset}>
                        Restart
                    </Button>
                </>
            ) : (
                <>
                    <p
                        className={cn(
                            "text-3xl font-bold",
                            level < 0 && "opacity-0"
                        )}
                    >
                        Level {level + 1}
                    </p>
                    <div className="relative h-[80vw] w-[80vw] lg:h-[50vw] lg:w-[50vw] xl:h-[40vw] xl:w-[40vw]">
                        {showSuccess && (
                            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-emerald-800 bg-emerald-400/90 p-8 shadow-lg backdrop-blur-sm">
                                <Check className="h-48 w-48" />
                            </div>
                        )}
                        {showReady && (
                            <div className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2">
                                <p className="mx-8 rounded-lg bg-slate-200/70 p-8 text-center text-3xl font-bold shadow-lg backdrop-blur">
                                    Ready!
                                </p>
                            </div>
                        )}
                        <Game>
                            {cells.map(({ id, selected, isTarget }) => (
                                <Game.Cell
                                    key={id}
                                    selected={selected}
                                    isTarget={isTarget}
                                    isRevealed={isRevealed}
                                    onClick={() => selectCell(id)}
                                />
                            ))}
                        </Game>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        {gameState.isIdle && (
                            <Button onClick={start} size="lg">
                                Start
                            </Button>
                        )}
                        {gameState.isRunning && (
                            <Button
                                size="lg"
                                onClick={confirmUserSelection}
                                disabled={isRevealed}
                            >
                                Confirm
                            </Button>
                        )}
                        {gameState.isGameOver && (
                            <Button size="lg" onClick={reset}>
                                Restart
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
