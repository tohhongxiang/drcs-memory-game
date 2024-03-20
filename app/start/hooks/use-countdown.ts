import { useCallback, useEffect, useState } from "react";

interface UseCountdownProps {
    timeMs: number;
    intervalMs?: number;
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
    intervalMs = 100,
    onTimerStart = () => {},
    onTimerEnd = () => {},
}: UseCountdownProps) {
    const [countdownState, setCountdownState] = useState(CountDownState.IDLE);
    const [msRemaining, setMsRemaining] = useState(timeMs);

    useEffect(() => {
        if (msRemaining <= 0) {
            return;
        }

        let timeout: NodeJS.Timeout | null = null;
        if (countdownState === CountDownState.STARTED) {
            timeout = setTimeout(() => {
                setMsRemaining((c) => c - intervalMs);
            }, intervalMs);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [msRemaining, countdownState, intervalMs]);

    useEffect(() => {
        if (msRemaining <= 0 && countdownState === CountDownState.STARTED) {
            setCountdownState(CountDownState.STOPPED);
            onTimerEnd?.();
            setMsRemaining(0);
        }
    }, [onTimerEnd, countdownState, msRemaining]);

    const startTimer = useCallback(() => {
        setCountdownState(CountDownState.STARTED);
        setMsRemaining(timeMs);
        onTimerStart?.();
    }, [onTimerStart, timeMs]);

    const resetTimer = useCallback(() => {
        setMsRemaining(timeMs);
    }, [timeMs]);

    const pauseTimer = useCallback(() => {
        setCountdownState(CountDownState.PAUSED);
    }, []);

    const resumeTimer = useCallback(() => {
        setCountdownState(CountDownState.STARTED);
    }, []);

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
