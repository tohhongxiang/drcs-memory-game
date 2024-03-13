"use client";

import { Button } from "@/components/ui/button";
import Game from "./_components/game";
import useGame from "./hooks/use-game";
import { Play, RotateCcw, SendHorizonal } from "lucide-react";
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
                    <h1 className="mb-4 text-5xl font-bold">
                        Congratulations!
                    </h1>
                    <p className="mb-16 text-muted-foreground">
                        You have completed all the levels!
                    </p>
                    <Button onClick={reset} size="xl">
                        <RotateCcw className="mr-4 h-8 w-8" />{" "}
                        <span>Restart</span>
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
                    {gameState.isIdle ? (
                        <div className="flex h-full w-full flex-col items-center justify-center">
                            <Button onClick={start} size="xl">
                                <Play className="mr-4 h-8 w-8" />{" "}
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
                                    />
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
                                    showSuccess ? "bg-emerald-500" : ""
                                )}
                                disabled={isRevealed || showSuccess}
                            >
                                <span className="flex items-center">
                                    {showSuccess ? (
                                        "Success!"
                                    ) : isRevealed ? (
                                        "Wait..."
                                    ) : (
                                        <>
                                            <span>Confirm</span>
                                            <SendHorizonal className="ml-4 h-8 w-8" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        )}
                        {gameState.isGameOver && (
                            <Button onClick={reset} size="xl">
                                <RotateCcw className="mr-4 h-8 w-8" />{" "}
                                <span>Restart</span>
                            </Button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
