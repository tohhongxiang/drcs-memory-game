import { useEffect, useState } from "react";

function shuffle<T>(array: T[]) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

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

export default function useGame() {
    const [size, setSize] = useState(3);
    const [isRevealed, setIsRevealed] = useState(true);

    const [cells, setCells] = useState(initializeCells(size * size, 0));

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

    const deselectAllCells = () =>
        setCells((c) => c.map((c) => ({ ...c, selected: false })));

    useEffect(() => {
        setCells(initializeCells(size * size, size));
    }, [size]);

    return {
        cells,
        setSize,
        isRevealed,
        setIsRevealed,
        selectCell,
        validateSelected,
        deselectAllCells,
    };
}
