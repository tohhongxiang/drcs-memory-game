"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface GameProps {
    size: number;
}

export default function Game({ size }: GameProps) {
    const [cells, setCells] = useState(
        [...Array(size * size)].map((_, index) => ({
            id: index,
            selected: false,
        }))
    );

    const handleClick = (id: number) => {
        setCells((previousCells) =>
            previousCells.map((cell) =>
                cell.id === id ? { ...cell, selected: !cell.selected } : cell
            )
        );
    };

    return (
        <div
            style={{
                gridTemplateColumns: `repeat(${size}, 1fr)`,
            }}
            className="grid aspect-square h-full w-full gap-1 md:gap-2"
        >
            {cells.map(({ id, selected }) => (
                <GameCell
                    key={id}
                    selected={selected}
                    onClick={() => handleClick(id)}
                />
            ))}
        </div>
    );
}

interface GameCellProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    selected?: boolean;
}

function GameCell({ selected = false, ...props }: GameCellProps) {
    return (
        <button
            {...props}
            className={cn(
                "box-border h-full w-full rounded-md border-4 border-gray-300 border-transparent bg-blue-400 transition duration-75",
                !selected && "hover:scale-105",
                selected && "scale-95 border-red-400 hover:scale-100"
            )}
        ></button>
    );
}
