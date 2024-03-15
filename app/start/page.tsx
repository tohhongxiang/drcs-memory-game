"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Game from "./_components/game";
import useGame from "./hooks/use-game";
import {
    Book,
    Lightbulb,
    Play,
    RotateCcw,
    SendHorizonal,
    StepForward,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressTimer from "./_components/progress-timer";
import SuccessOverlay from "./_components/success-overlay";
import ReadyOverlay from "./_components/ready-overlay";
import InstructionsDialog from "./_components/instructions-dialog";
import { motion } from "framer-motion";

const START_TIME = 4000;
const REVEAL_TIME = 1000;

export default function StartGamePage() {
    const {
        gameState,
        readyCountdownTimeMs,
        revealCountdownTimeMs,
        levelInfo: { level, cells },
        hintsRemaining,
        getHint,
        start,
        reset,
        continueGame,
        selectCell,
        confirmUserSelection,
    } = useGame({ startTimeMs: START_TIME, revealTimeMs: REVEAL_TIME });

    if (gameState.isCompleted) {
        return (
            <>
                <h1 className="mb-4 text-3xl font-bold sm:text-5xl">
                    Congratulations!
                </h1>
                <p className="mb-16 text-center text-lg text-muted-foreground sm:text-2xl">
                    You have completed all the levels!
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        onClick={reset}
                        size="xl"
                        className="group"
                        variant="secondary"
                    >
                        <RotateCcw className="mr-4 h-8 w-8 transition duration-150 group-focus-within:-rotate-180 group-hover:-rotate-180" />{" "}
                        <span>Restart</span>
                    </Button>
                    <Button onClick={continueGame} size="xl" className="group">
                        <StepForward className="mr-4 h-8 w-8 transition duration-150 group-focus-within:translate-x-1 group-hover:translate-x-1" />{" "}
                        <span>Continue</span>
                    </Button>
                </div>
            </>
        );
    }

    if (gameState.isIdle) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center px-4">
                <p className="mb-8 text-center text-3xl font-medium text-muted-foreground sm:text-5xl">
                    Click start when you are ready!
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button onClick={start} size="xl" className="group">
                        <Play className="mr-4 h-8 w-8 transition duration-150 group-focus-within:translate-x-1 group-hover:translate-x-1" />{" "}
                        <span>Start</span>
                    </Button>
                    <InstructionsDialog>
                        <div
                            className={buttonVariants({
                                size: "xl",
                                variant: "outline",
                                className: "group",
                            })}
                        >
                            <Book className="mr-4 h-8 w-8 transition duration-150 group-focus-within:scale-105 group-hover:scale-105" />{" "}
                            <span>Instructions</span>
                        </div>
                    </InstructionsDialog>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-stretch gap-4">
            <div className="flex h-[25%] flex-col justify-end">
                <h1
                    className={cn(
                        "text-3xl font-bold sm:text-5xl",
                        level < 0 && "opacity-0"
                    )}
                >
                    {gameState.hasCompletedGame && "👑"} Level {level + 1}{" "}
                    {gameState.hasCompletedGame && "👑"}
                </h1>
            </div>
            <div className="flex w-full flex-col items-center gap-2">
                <Game>
                    <Game.Board>
                        {cells.map(({ id, selected, isTarget }) => (
                            <Game.Cell
                                key={id}
                                selected={selected}
                                isTarget={isTarget}
                                isRevealed={gameState.isRevealed}
                                canClick={gameState.isWaitingUserInput}
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
                        {gameState.isShowingSuccess ? <SuccessOverlay /> : null}
                        {gameState.isStarting ? (
                            <ReadyOverlay
                                readyCountdownTimeMs={readyCountdownTimeMs}
                            />
                        ) : null}
                    </Game.Overlay>
                </Game>
                <ProgressTimer progress={revealCountdownTimeMs / REVEAL_TIME} />
            </div>
            <div className="flex h-[25%] flex-col items-center gap-4 sm:flex-row">
                <ShowButtonBasedOnGameState
                    gameState={gameState}
                    reset={reset}
                    getHint={getHint}
                    hintsRemaining={hintsRemaining}
                    confirmUserSelection={confirmUserSelection}
                />
            </div>
        </div>
    );
}

const MotionButton = motion(Button);
const buttonAnimationVariants = {
    hidden: { opacity: 0, y: -10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { ease: "easeInOut", duration: 0.1 },
    },
};

function ShowButtonBasedOnGameState({
    gameState,
    reset,
    getHint,
    hintsRemaining,
    confirmUserSelection,
}: {
    gameState: ReturnType<typeof useGame>["gameState"];
    reset: () => void;
    getHint: () => void;
    hintsRemaining: number;
    confirmUserSelection: () => void;
}) {
    if (gameState.isGameOver) {
        return (
            <MotionButton
                variants={buttonAnimationVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                key="reset-button"
                onClick={reset}
                size="xl"
                className="group"
            >
                <RotateCcw className="mr-4 h-8 w-8 transition duration-150 group-focus-within:-rotate-180 group-hover:-rotate-180" />{" "}
                <span>Restart</span>
            </MotionButton>
        );
    }

    if (gameState.isShowingSuccess) {
        return (
            <motion.div
                variants={buttonAnimationVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                key="right-button"
                className="group"
            >
                <div
                    className={cn(
                        buttonVariants({ size: "xl", variant: "secondary" }),
                        "bg-emerald-300 text-emerald-900 opacity-70 hover:bg-emerald-300"
                    )}
                >
                    Success!
                </div>
            </motion.div>
        );
    }

    if (gameState.isRevealed) {
        return (
            <motion.div
                variants={buttonAnimationVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                key="right-button"
                className="group"
            >
                <div
                    className={cn(
                        buttonVariants({ size: "xl", variant: "secondary" }),
                        "opacity-70"
                    )}
                >
                    Memorizing...
                </div>
            </motion.div>
        );
    }

    if (gameState.isGenerating) {
        return (
            <motion.div
                variants={buttonAnimationVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                key="right-button"
                className="group"
            >
                <div
                    className={cn(
                        buttonVariants({ size: "xl", variant: "secondary" }),
                        "opacity-70"
                    )}
                >
                    Generating...
                </div>
            </motion.div>
        );
    }

    if (gameState.isStarting) {
        return (
            <motion.div
                variants={buttonAnimationVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                key="right-button"
                className="group"
            >
                <div
                    className={cn(
                        buttonVariants({ size: "xl", variant: "secondary" }),
                        "opacity-70"
                    )}
                >
                    Starting...
                </div>
            </motion.div>
        );
    }

    return (
        <>
            <motion.div
                variants={buttonAnimationVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
            >
                <Button
                    size="xl"
                    key="left-button"
                    onClick={getHint}
                    className="group flex items-center"
                    variant="outline"
                    disabled={hintsRemaining === 0}
                >
                    <span>Hint ({hintsRemaining})</span>
                    <Lightbulb className="ml-4 h-8 w-8 transition duration-150 group-focus-within:scale-105 group-hover:scale-105" />
                </Button>
            </motion.div>
            <MotionButton
                variants={buttonAnimationVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                key="right-button"
                size="xl"
                onClick={confirmUserSelection}
                className="group flex items-center"
            >
                <span>Confirm</span>
                <SendHorizonal className="ml-4 h-8 w-8 transition duration-150 group-focus-within:translate-x-1 group-hover:translate-x-1" />
            </MotionButton>
        </>
    );
}
