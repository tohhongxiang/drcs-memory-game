import { createContext, useContext, useState } from "react";

const MutedContext = createContext({
    isMuted: false,
    toggleMuted: () => {},
});

export default function MutedContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMuted, setIsMuted] = useState(false);
    const toggleMuted = () => setIsMuted((c) => !c);

    return (
        <MutedContext.Provider value={{ isMuted, toggleMuted }}>
            {children}
        </MutedContext.Provider>
    );
}

export function useMutedContext() {
    return useContext(MutedContext);
}
