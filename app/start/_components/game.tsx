"use client";

import { cn } from "@/lib/utils";

export default function Game({ children }: { children: React.ReactNode[] }) {
    return (
        <div className="relative h-[80vw] w-[80vw] lg:h-[50vw] lg:w-[50vw] xl:h-[40vw] xl:w-[40vw]">
            {children}
        </div>
    );
}

function GameBoard({ children }: { children: React.ReactNode[] }) {
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

function GameOverlay({ children }: { children: React.ReactNode }) {
    if (
        !children ||
        (children instanceof Array && children.every((child) => !child))
    )
        return null;

    return (
        <div className="absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            {children}
        </div>
    );
}

Game.Overlay = GameOverlay;
Game.Board = GameBoard;
Game.Cell = GameCell;