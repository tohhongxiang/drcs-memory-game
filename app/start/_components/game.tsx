"use client";

import { cn } from "@/lib/utils";

interface GameProps {
    children: React.ReactNode[];
}

export default function Game({ children }: GameProps) {
    return (
        <div
            style={{
                gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(children.length))}, 1fr)`,
            }}
            className="grid aspect-square h-full w-full gap-1 md:gap-2"
        >
            {children}
        </div>
    );
}

interface GameCellProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    selected?: boolean;
    isTarget?: boolean;
    isRevealed?: boolean;
}

function GameCell({
    id,
    selected = false,
    isTarget = false,
    isRevealed = true,
    ...props
}: GameCellProps) {
    return (
        <div
            className={cn(
                "relative h-full w-full [transform-style:preserve-3d]",
                isRevealed && "cursor-not-allowed"
            )}
        >
            <button
                {...props}
                className={cn(
                    "absolute inset-0 box-border h-full w-full rounded-md border-4 border-gray-300 border-transparent bg-blue-400 transition duration-150",
                    isTarget &&
                        isRevealed &&
                        "bg-green-400 [transform:rotateX(180deg)]",
                    isRevealed && "pointer-events-none",
                    !selected && "hover:scale-105",
                    selected && "scale-95 border-red-400 hover:scale-100"
                )}
            >
                {id}
            </button>
        </div>
    );
}

Game.Cell = GameCell;
