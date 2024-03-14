"use client";

import { Button } from "@/components/ui/button";
import Game from "./_components/game";
import useGame from "./hooks/use-game";
import {
    Play,
    RotateCcw,
    SendHorizonal,
    Volume2,
    VolumeX,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressTimer from "./_components/progress-timer";
import SuccessOverlay from "./_components/success-overlay";
import ReadyOverlay from "./_components/ready-overlay";
import MutedContextProvider, {
    useMutedContext,
} from "./_providers/muted-provider";

const START_TIME = 4000;
const REVEAL_TIME = 1000;

export default function StartGamePage() {
    return (
        <MutedContextProvider>
            <GameUI />
        </MutedContextProvider>
    );
}

function GameUI() {
    const {
        gameState,
        readyCountdownTimeMs,
        revealCountdownTimeMs,
        levelInfo: { level, cells },
        start,
        reset,
        selectCell,
        confirmUserSelection,
    } = useGame({ startTimeMs: START_TIME, revealTimeMs: REVEAL_TIME });

    const { isMuted, toggleMuted } = useMutedContext();

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <Button
                className="absolute right-4 top-4 h-16 w-16"
                onClick={toggleMuted}
                variant="outline"
            >
                {isMuted ? (
                    <VolumeX className="h-full w-full" />
                ) : (
                    <Volume2 className="h-full w-full" />
                )}
            </Button>
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
                        <>
                            <h1
                                className={cn(
                                    "text-6xl font-bold",
                                    level < 0 && "opacity-0"
                                )}
                            >
                                Level {level + 1}
                            </h1>
                            <Game>
                                <Game.Board>
                                    {cells.map(({ id, selected, isTarget }) => (
                                        <Game.Cell
                                            key={id}
                                            selected={selected}
                                            isTarget={isTarget}
                                            isRevealed={gameState.isRevealed}
                                            canClick={
                                                gameState.isWaitingUserInput
                                            }
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
                                    {gameState.isShowingSuccess ? (
                                        <SuccessOverlay />
                                    ) : null}
                                    {gameState.isStarting ? (
                                        <ReadyOverlay
                                            readyCountdownTimeMs={
                                                readyCountdownTimeMs
                                            }
                                        />
                                    ) : null}
                                </Game.Overlay>
                            </Game>
                            <ProgressTimer
                                progress={revealCountdownTimeMs / REVEAL_TIME}
                            />
                            {gameState.isGameOver ? (
                                <Button
                                    onClick={reset}
                                    size="xl"
                                    className="group"
                                >
                                    <RotateCcw className="mr-4 h-8 w-8 transition duration-150 group-focus-within:-rotate-180 group-hover:-rotate-180" />{" "}
                                    <span>Restart</span>
                                </Button>
                            ) : gameState.isWaitingUserInput ? (
                                <Button
                                    size="xl"
                                    onClick={confirmUserSelection}
                                    className="group flex items-center"
                                >
                                    <span>Confirm</span>
                                    <SendHorizonal className="ml-4 h-8 w-8 transition duration-150 group-focus-within:translate-x-1 group-hover:translate-x-1" />
                                </Button>
                            ) : gameState.isShowingSuccess ? (
                                <Button
                                    size="xl"
                                    className="group bg-emerald-500"
                                    disabled
                                >
                                    Success!
                                </Button>
                            ) : (
                                <Button size="xl" className="group" disabled>
                                    {gameState.isRevealed
                                        ? "Memorizing..."
                                        : gameState.isGenerating
                                          ? "Generating..."
                                          : "Starting..."}
                                </Button>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
