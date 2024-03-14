import shuffle from "@/lib/shuffle";
import { useState } from "react";
import useCountdown from "./use-countdown";
import useSound from "use-sound";

function initializeCells(count: number, numberOfTargets: number) {
    if (numberOfTargets > count) {
        throw new Error(
            "Number of targets should be less than the number of cells"
        );
    }

    const cells = [...Array(count)].map((_, index) => ({
        id: index,
        selected: false,
        isTarget: false,
    }));

    const targets = shuffle(Array.from(Array(count).keys())).slice(
        0,
        numberOfTargets
    );

    targets.forEach((target) => (cells[target].isTarget = true));

    return cells;
}

const levels = [
    { size: 3, target: 3 },
    { size: 3, target: 4 },
    { size: 4, target: 4 },
    { size: 4, target: 5 },
    { size: 4, target: 6 },
    { size: 5, target: 5 },
    { size: 5, target: 6 },
    { size: 5, target: 7 },
    { size: 6, target: 6 },
    { size: 7, target: 7 },
];

enum GameState {
    IDLE = "IDLE",
    STARTING = "STARTING",
    RUNNING = "RUNNING",
    FAILED = "FAILED",
    COMPLETE = "COMPLETE",
}

export default function useGame({
    startTimeMs,
    revealTimeMs,
}: {
    startTimeMs: number;
    revealTimeMs: number;
}) {
    const [gameState, setGameState] = useState(GameState.IDLE);
    const [level, setLevel] = useState(-1);
    const [cells, setCells] = useState(
        initializeCells(levels[0].size * levels[0].size, 0)
    );

    const [playReveal] = useSound("./reveal.mp3");
    const [playGo] = useSound("./go.mp3");

    const [isRevealed, setIsRevealed] = useState(false);
    const {
        msRemaining: revealTimer,
        startTimer: startRevealTimer,
        resetTimer: resetRevealTimer,
    } = useCountdown({
        timeMs: revealTimeMs,
        onTimerStart() {
            setIsRevealed(true);
            playReveal();
        },
        onTimerEnd() {
            setIsRevealed(false);
            playGo();
        },
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const startLevel = async (newLevel: number) => {
        setIsGenerating(true);

        setIsRevealed(false);
        setLevel(newLevel);
        setCells((previousCells) =>
            previousCells.map((c) => ({ ...c, selected: false }))
        );

        resetRevealTimer();

        await new Promise((resolve) => setTimeout(resolve, 400));

        setCells(
            initializeCells(
                levels[newLevel].size * levels[newLevel].size,
                levels[newLevel].target
            )
        );

        await new Promise((resolve) => setTimeout(resolve, 700));
        setIsGenerating(false);
        startRevealTimer();
    };

    const [showReady, setShowReady] = useState(false);
    const {
        msRemaining: readyCountdownTimeMs,
        startTimer: startReadyCountdown,
    } = useCountdown({
        timeMs: startTimeMs,
        intervalMs: 1000,
        onTimerStart() {
            setCells(
                initializeCells(
                    levels[0].size * levels[0].size,
                    levels[0].target
                )
            );
            setGameState(GameState.STARTING);
            setShowReady(true);
        },
        async onTimerEnd() {
            setShowReady(false);

            setGameState(GameState.RUNNING);
            startLevel(0);
        },
    });

    const start = async () => {
        startReadyCountdown();
    };

    const levelUp = async () => {
        if (level === levels.length - 1) {
            setGameState(GameState.COMPLETE);
            return;
        }

        startLevel(level + 1);
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const { startTimer: startSuccessTimer } = useCountdown({
        timeMs: revealTimeMs,
        onTimerStart() {
            setShowSuccess(true);
            setIsRevealed(true);
        },
        onTimerEnd() {
            setShowSuccess(false);
            setIsRevealed(false);
            levelUp();
        },
    });

    const [playSelect] = useSound("./select.mp3", {
        playbackRate: 0.75 + cells.filter((c) => c.selected).length * 0.16,
    });

    const selectCell = (id: number) => {
        playSelect();
        setCells((previousCells) =>
            previousCells.map((cell) =>
                cell.id === id ? { ...cell, selected: !cell.selected } : cell
            )
        );
    };

    const [playCorrect] = useSound("./correct.mp3");
    const [playWrong] = useSound("./wrong.mp3");

    const confirmUserSelection = () => {
        const succeeded = cells.every(
            (cell) => cell.selected === cell.isTarget
        );

        if (succeeded) {
            playCorrect();
            startSuccessTimer();
        } else {
            playWrong();
            gameOver();
        }
    };

    const gameOver = () => {
        setIsRevealed(true);
        setGameState(GameState.FAILED);
    };

    const reset = () => {
        setGameState(GameState.IDLE);
        setLevel(-1);
        setCells(initializeCells(levels[0].size * levels[0].size, 0));
        setIsRevealed(false);
    };

    return {
        gameState: {
            isStarting: gameState === GameState.STARTING,
            isIdle: gameState === GameState.IDLE,
            isRunning: gameState === GameState.RUNNING,
            isGameOver: gameState === GameState.FAILED,
            isCompleted: gameState === GameState.COMPLETE,
        },
        isRevealed,
        isGenerating,
        revealTimer,
        start,
        showReady,
        readyCountdownTimeMs,
        showSuccess,
        level,
        reset,
        cells,
        selectCell,
        confirmUserSelection,
    };
}
