import { useState } from "react";
import useCountdown from "./use-countdown";
import useLevelState from "./use-level-state";
import useSoundWithMutedContext from "./use-sound-with-muted-context";

const levels = [
    { size: 3, targets: 3 },
    { size: 3, targets: 4 },
    { size: 4, targets: 4 },
    { size: 4, targets: 5 },
    { size: 4, targets: 6 },
    { size: 5, targets: 5 },
    { size: 5, targets: 6 },
    { size: 5, targets: 7 },
    { size: 6, targets: 6 },
    { size: 7, targets: 7 },
];

enum GameState {
    IDLE = "IDLE",
    STARTING = "STARTING",
    RUNNING = "RUNNING",
    WAITING_FOR_USER = "WAITING_FOR_USER",
    SHOW_SUCCESS = "SHOW_SUCCESS",
    GENERATING = "GENERATING",
    REVEALED = "REVEALED",
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
    const { cells, level, deselectAll, initializeLevel, selectCell } =
        useLevelState(levels);

    const [playReveal] = useSoundWithMutedContext("./audio/reveal.mp3");
    const [playGo] = useSoundWithMutedContext("./audio/go.mp3");

    const {
        msRemaining: revealCountdownTimeMs,
        startTimer: startRevealTimer,
        resetTimer: resetRevealTimer,
    } = useCountdown({
        timeMs: revealTimeMs,
        onTimerStart() {
            setGameState(GameState.REVEALED);
            playReveal();
        },
        onTimerEnd() {
            setGameState(GameState.WAITING_FOR_USER);
            playGo();
        },
    });

    const beginLevel = async (newLevel: number) => {
        setGameState(GameState.GENERATING);
        deselectAll();

        resetRevealTimer();

        await new Promise((resolve) => setTimeout(resolve, 400));

        initializeLevel(newLevel);

        await new Promise((resolve) => setTimeout(resolve, 700));
        setGameState(GameState.IDLE);
        startRevealTimer();
    };

    const {
        msRemaining: readyCountdownTimeMs,
        startTimer: startReadyCountdown,
    } = useCountdown({
        timeMs: startTimeMs,
        intervalMs: 1000,
        onTimerStart() {
            setGameState(GameState.STARTING);
        },
        async onTimerEnd() {
            setGameState(GameState.RUNNING);
            beginLevel(0);
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

        beginLevel(level + 1);
    };

    const { startTimer: startSuccessTimer } = useCountdown({
        timeMs: revealTimeMs,
        onTimerStart() {
            setGameState(GameState.SHOW_SUCCESS);
        },
        onTimerEnd() {
            setGameState(GameState.IDLE);
            levelUp();
        },
    });

    const [playSelect] = useSoundWithMutedContext("./audio/select.mp3", {
        playbackRate: 0.75 + cells.filter((c) => c.selected).length * 0.16,
    });

    const handleSelectCell = (id: number) => {
        playSelect();
        selectCell(id);
    };

    const [playCorrect] = useSoundWithMutedContext("./audio/correct.mp3");
    const [playWrong] = useSoundWithMutedContext("./audio/wrong.mp3");

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
        setGameState(GameState.FAILED);
    };

    const reset = () => {
        setGameState(GameState.IDLE);
        initializeLevel(0);
    };

    return {
        gameState: {
            isStarting: gameState === GameState.STARTING,
            isIdle: gameState === GameState.IDLE,
            isRunning: gameState === GameState.RUNNING,
            isGameOver: gameState === GameState.FAILED,
            isWaitingUserInput: gameState === GameState.WAITING_FOR_USER,
            isCompleted: gameState === GameState.COMPLETE,
            isRevealed:
                gameState === GameState.REVEALED ||
                gameState === GameState.FAILED ||
                gameState === GameState.SHOW_SUCCESS,
            isGenerating: gameState === GameState.GENERATING,
            isShowingSuccess: gameState === GameState.SHOW_SUCCESS,
        },
        levelInfo: {
            level,
            cells,
        },
        revealCountdownTimeMs,
        readyCountdownTimeMs,
        start,
        reset,
        selectCell: handleSelectCell,
        confirmUserSelection,
    };
}
