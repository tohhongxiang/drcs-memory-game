import { useEffect, useState } from "react";

interface UseCountdownProps {
    timeMs: number;
    onTimerStart?: () => void | Promise<void>;
    onTimerEnd?: () => void | Promise<void>;
}

enum CountDownState {
    IDLE = "IDLE",
    STARTED = "STARTED",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

export default function useCountdown({
    timeMs,
    onTimerStart = () => {},
    onTimerEnd = () => {},
}: UseCountdownProps) {
    const [countdownState, setCountdownState] = useState(CountDownState.IDLE);
    const [msRemaining, setMsRemaining] = useState(timeMs);

    useEffect(() => {
        if (msRemaining <= 0) {
            if (countdownState === CountDownState.STARTED) {
                setCountdownState(CountDownState.STOPPED);
                onTimerEnd?.();
            }
            setMsRemaining(0);
            return;
        }

        let timeout: NodeJS.Timeout | null = null;

        if (countdownState === CountDownState.STARTED) {
            timeout = setTimeout(() => {
                setMsRemaining((c) => c - 100);
            }, 100);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [msRemaining, countdownState, onTimerEnd]);

    const startTimer = () => {
        setCountdownState(CountDownState.STARTED);
        setMsRemaining(timeMs);
        onTimerStart?.();
    };

    const resetTimer = () => {
        setMsRemaining(timeMs);
    };

    const pauseTimer = () => {
        setCountdownState(CountDownState.PAUSED);
    };

    const resumeTimer = () => {
        setCountdownState(CountDownState.STARTED);
    };

    return {
        msRemaining,
        progress: msRemaining / timeMs,
        countdownState,
        startTimer,
        resetTimer,
        pauseTimer,
        resumeTimer,
    };
}
