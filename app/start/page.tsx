"use client";

import { Button } from "@/components/ui/button";
import Game from "./_components/game";
import useGame from "./hooks/use-game";
import { Play, RotateCcw, SendHorizonal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressTimer from "./_components/progress-timer";
import SuccessOverlay from "./_components/success-overlay";
import ReadyOverlay from "./_components/ready-overlay";

const START_TIME = 4000;
const REVEAL_TIME = 1000;

export default function StartGame() {
    const {
        gameState,
        isRevealed,
        isGenerating,
        start,
        showSuccess,
        showReady,
        readyCountdownTimeMs,
        level,
        reset,
        cells,
        selectCell,
        confirmUserSelection,
        revealTimer,
    } = useGame({ startTimeMs: START_TIME, revealTimeMs: REVEAL_TIME });

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            {gameState.isCompleted ? (
                <>
                    <h1 className="mb-4 text-3xl font-bold sm:text-5xl">
                        Congratulations!
                    </h1>
                    <p className="mb-16 text-center text-lg text-muted-foreground sm:text-2xl">
                        You have completed all the levels!
                    </p>
                    <Button onClick={reset} size="xl" className="group">
                        <RotateCcw className="mr-4 h-8 w-8 transition duration-150 group-focus-within:-rotate-180 group-hover:-rotate-180" />{" "}
                        <span>Restart</span>
                    </Button>
                </>
            ) : (
                <>
                    <h1
                        className={cn(
                            "text-6xl font-bold",
                            level < 0 && "opacity-0"
                        )}
                    >
                        Level {level + 1}
                    </h1>
                    {gameState.isIdle ? (
                        <div className="flex h-full w-full flex-col items-center justify-center">
                            <p className="mb-8 text-lg font-semibold sm:text-3xl">
                                Click start when you are ready!
                            </p>
                            <Button onClick={start} size="xl" className="group">
                                <Play className="mr-4 h-8 w-8 transition duration-150 group-focus-within:translate-x-1 group-hover:translate-x-1" />{" "}
                                <span>Start</span>
                            </Button>
                        </div>
                    ) : (
                        <Game>
                            <Game.Board>
                                {cells.map(({ id, selected, isTarget }) => (
                                    <Game.Cell
                                        key={id}
                                        selected={selected}
                                        isTarget={isTarget}
                                        isRevealed={isRevealed}
                                        onClick={() => selectCell(id)}
                                    >
                                        {gameState.isGameOver &&
                                            selected !== isTarget && (
                                                <X className="h-full w-full text-red-600" />
                                            )}
                                    </Game.Cell>
                                ))}
                            </Game.Board>
                            <Game.Overlay>
                                {showSuccess ? <SuccessOverlay /> : null}
                                {showReady ? (
                                    <ReadyOverlay
                                        readyCountdownTimeMs={
                                            readyCountdownTimeMs
                                        }
                                    />
                                ) : null}
                            </Game.Overlay>
                        </Game>
                    )}
                    <ProgressTimer progress={revealTimer / REVEAL_TIME} />
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                        {gameState.isRunning && (
                            <Button
                                size="xl"
                                onClick={confirmUserSelection}
                                className={cn(
                                    "group",
                                    showSuccess ? "bg-emerald-500" : ""
                                )}
                                disabled={
                                    isRevealed || isGenerating || showSuccess
                                }
                            >
                                <span className="flex items-center">
                                    {showSuccess ? (
                                        "Success!"
                                    ) : isRevealed ? (
                                        "Memorizing..."
                                    ) : isGenerating ? (
                                        "Generating..."
                                    ) : (
                                        <>
                                            <span>Confirm</span>
                                            <SendHorizonal className="ml-4 h-8 w-8 transition duration-150 group-focus-within:translate-x-1 group-hover:translate-x-1" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        )}
                        {gameState.isGameOver && (
                            <Button onClick={reset} size="xl" className="group">
                                <RotateCcw className="mr-4 h-8 w-8 transition duration-150 group-focus-within:-rotate-180 group-hover:-rotate-180" />{" "}
                                <span>Restart</span>
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
