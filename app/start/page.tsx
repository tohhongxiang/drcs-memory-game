import Game from "./_components/game";

export default function StartGame() {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="h-[80vw] w-[80vw] lg:h-[50vw] lg:w-[50vw]">
                <Game size={6} />
            </div>
        </div>
    );
}
