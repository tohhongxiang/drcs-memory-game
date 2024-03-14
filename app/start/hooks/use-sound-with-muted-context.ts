import useSound, { HookOptions } from "use-sound";
import { useMutedContext } from "../_providers/muted-provider";

export default function useSoundWithMutedContext(
    src: string,
    options?: HookOptions
) {
    const { isMuted } = useMutedContext();
    const [play, soundControllers] = useSound(src, options);

    const handlePlay = (options?: Parameters<typeof play>[0]) => {
        if (!isMuted) play(options);
    };

    return [handlePlay, soundControllers] as const;
}
