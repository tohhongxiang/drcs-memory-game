import shuffle from "@/lib/shuffle";
import { useEffect, useState } from "react";

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

function sleep(timeMs: number) {
    return new Promise((r) => setTimeout(r, timeMs));
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
    REVEALED = "REVEALED",
    HIDDEN = "HIDDEN",
    FAILED = "FAILED",
    COMPLETE = "COMPLETE",
}

const revealTime = 1000;

export default function useGame() {
    const [gameState, setGameState] = useState(GameState.IDLE);
    const [isRevealed, setIsRevealed] = useState(false);

    const [level, setLevel] = useState(-1);
    const [cells, setCells] = useState(
        initializeCells(levels[0].size * levels[0].size, 0)
    );

    const [showReady, setShowReady] = useState(false);
    const start = async () => {
        setCells(
            initializeCells(levels[0].size * levels[0].size, levels[0].target)
        );
        setGameState(GameState.STARTING);

        setShowReady(true);
        await sleep(revealTime);
        setShowReady(false);

        setGameState(GameState.RUNNING);
        setIsRevealed(true);
        setLevel(0);

        await sleep(revealTime);
        setIsRevealed(false);
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

    const selectCell = (id: number) => {
        setCells((previousCells) =>
            previousCells.map((cell) =>
                cell.id === id ? { ...cell, selected: !cell.selected } : cell
            )
        );
    };

    const validateSelected = () => {
        return cells.every((cell) => cell.selected === cell.isTarget);
    };

    const confirmUserSelection = () => {
        const succeeded = validateSelected();

        if (succeeded) {
            levelUp();
        } else {
            gameOver();
        }
    };

    const [showSuccess, setShowSuccess] = useState(false);
    const levelUp = async () => {
        setIsRevealed(true);
        setShowSuccess(true);
        await sleep(revealTime);
        setShowSuccess(false);

        if (level >= levels.length - 1) {
            setGameState(GameState.COMPLETE);
            return;
        }

        setLevel((c) => c + 1);

        await sleep(revealTime);
        setIsRevealed(false);
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
        start,
        showReady,
        showSuccess,
        level,
        reset,
        cells,
        selectCell,
        confirmUserSelection,
    };
}
