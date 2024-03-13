interface GameProps {
    size: number;
}

export default function Game({ size }: GameProps) {
    return <div>This is the game board {size}</div>;
}
