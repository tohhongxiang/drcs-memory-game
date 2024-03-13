import shuffle from "@/lib/shuffle";
import { useEffect, useState } from "react";
import useCountdown from "./use-countdown";

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
    // { size: 4, target: 5 },
    // { size: 4, target: 6 },
    // { size: 5, target: 5 },
    // { size: 5, target: 6 },
    // { size: 5, target: 7 },
    // { size: 6, target: 6 },
    // { size: 7, target: 7 },
];

enum GameState {
    IDLE = "IDLE",
    STARTING = "STARTING",
    RUNNING = "RUNNING",
    REVEALED = "REVEALED",
    HIDDEN = "HIDDEN",
    FAILED = "FAILED",
    COMPLETE = "COMPLETE",
}

export default function useGame(startTimeMs: number, revealTimeMs: number) {
    const [gameState, setGameState] = useState(GameState.IDLE);
    const [level, setLevel] = useState(-1);
    const [cells, setCells] = useState(
        initializeCells(levels[0].size * levels[0].size, 0)
    );

    const [isRevealed, setIsRevealed] = useState(false);
    const { msRemaining: revealTimer, startTimer: startRevealTimer } =
        useCountdown({
            onTimerStart: () => {
                setIsRevealed(true);
            },
            onTimerEnd: () => {
                setIsRevealed(false);
            },
        });
    const startLevel = (level: number) => {
        setLevel(level);
        startRevealTimer(revealTimeMs);
    };

    const [showReady, setShowReady] = useState(false);
    const {
        msRemaining: readyCountdownTimeMs,
        startTimer: startReadyCountdown,
    } = useCountdown({
        onTimerStart: () => {
            setCells(
                initializeCells(
                    levels[0].size * levels[0].size,
                    levels[0].target
                )
            );
            setGameState(GameState.STARTING);
            setShowReady(true);
        },
        onTimerEnd: async () => {
            setShowReady(false);

            setGameState(GameState.RUNNING);
            startLevel(0);
        },
    });

    const start = async () => {
        startReadyCountdown(startTimeMs - 1);
    };

    useEffect(() => {
        if (level < 0) return;

        setCells(
            initializeCells(
                levels[level].size * levels[level].size,
                levels[level].target
            )
        );
    }, [level]);

    const levelUp = async () => {
        if (level === levels.length - 1) {
            setGameState(GameState.COMPLETE);
            return;
        }

        startLevel(level + 1);
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const { startTimer: startSuccessTimer } = useCountdown({
        onTimerStart: () => {
            setShowSuccess(true);
        },
        onTimerEnd: () => {
            setShowSuccess(false);
            levelUp();
        },
    });

    const selectCell = (id: number) => {
        setCells((previousCells) =>
            previousCells.map((cell) =>
                cell.id === id ? { ...cell, selected: !cell.selected } : cell
            )
        );
    };

    const confirmUserSelection = () => {
        const succeeded = cells.every(
            (cell) => cell.selected === cell.isTarget
        );

        if (succeeded) {
            startSuccessTimer(revealTimeMs);
        } else {
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
