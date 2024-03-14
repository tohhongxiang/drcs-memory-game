import shuffle from "@/lib/shuffle";
import { useState } from "react";

type Cell = {
    id: number;
    selected: boolean;
    isTarget: boolean;
};

type Level = {
    size: number;
    targets: number;
};

const MAX_TARGETS = 30;

export default function useLevelState(levels: Level[]) {
    const [level, setLevel] = useState(0);
    const [cells, setCells] = useState<Cell[]>(() => {
        if (level < levels.length) {
            return initializeCells(
                levels[level].size * levels[level].size,
                levels[level].targets
            );
        }

        return [];
    });

    const selectCell = (id: number) => {
        setCells((previousCells) =>
            previousCells.map((cell) =>
                cell.id === id ? { ...cell, selected: !cell.selected } : cell
            )
        );
    };

    const deselectAll = () => {
        setCells((previousCells) =>
            previousCells.map((c) => ({ ...c, selected: false }))
        );
    };

    const initializeLevel = (level: number) => {
        setLevel(level);

        if (level < levels.length) {
            setCells(
                initializeCells(
                    levels[level].size * levels[level].size,
                    levels[level].targets
                )
            );
        } else {
            handleInfiniteLevelGeneration();
        }
    };

    const handleInfiniteLevelGeneration = () => {
        const levelSize = cells.length;
        const targets = cells.filter((cell) => cell.isTarget).length;

        setCells(
            initializeCells(
                levelSize,
                Math.min(targets + 1, MAX_TARGETS, levelSize)
            )
        );
    };

    return {
        level,
        cells,
        selectCell,
        deselectAll,
        initializeLevel,
    };
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
