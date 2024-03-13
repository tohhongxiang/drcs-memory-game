import { useEffect, useState } from "react";

interface UseCountdownProps {
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
    onTimerStart = () => {},
    onTimerEnd = () => {},
}: UseCountdownProps = {}) {
    const [countdownState, setCountdownState] = useState(CountDownState.IDLE);
    const [timeMs, setTimeMs] = useState(0);
    const [msRemaining, setMsRemaining] = useState(0);

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
                setMsRemaining((c) => c - 10);
            }, 10);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [msRemaining, countdownState, onTimerEnd]);

    const startTimer = (timeMs: number) => {
        setCountdownState(CountDownState.STARTED);
        setTimeMs(timeMs);
        setMsRemaining(timeMs);
        onTimerStart?.();
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
        pauseTimer,
        resumeTimer,
    };
}
