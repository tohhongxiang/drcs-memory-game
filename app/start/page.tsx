"use client";

import { Button } from "@/components/ui/button";
import Game from "./_components/game";
import useGame from "./hooks/use-game";

export default function StartGame() {
    const {
        cells,
        setSize,
        isRevealed,
        setIsRevealed,
        selectCell,
        validateSelected,
        deselectAllCells,
    } = useGame();

    const handleConfirm = () => {
        const result = validateSelected();
        console.log(result);
        deselectAllCells();
        setSize((c) => c + 1);
    };

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="h-[80vw] w-[80vw] lg:h-[50vw] lg:w-[50vw]">
                <Game>
                    {cells.map(({ id, selected, isTarget }) => (
                        <Game.Cell
                            key={id}
                            selected={selected}
                            isTarget={isTarget}
                            isRevealed={isRevealed}
                            onClick={() => selectCell(id)}
                        />
                    ))}
                </Game>
            </div>
            <div className="flex items-center justify-center gap-4">
                <Button size="lg" onClick={handleConfirm}>
                    Confirm
                </Button>
                <Button size="lg" onClick={() => setIsRevealed((c) => !c)}>
                    {isRevealed ? "Hide" : "Show"}
                </Button>
            </div>
        </div>
    );
}
