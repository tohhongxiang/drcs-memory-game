import Game from "./_components/game";

export default function StartGame() {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <h1>Game</h1>
            <Game size={3} />
        </div>
    );
}
