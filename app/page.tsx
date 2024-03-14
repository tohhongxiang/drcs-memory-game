import { Button } from "@/components/ui/button";
import Link from "next/link";
import Icon from "./icon.svg";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-8 p-4">
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                <Image src={Icon} alt="logo" />
                <h1 className="text-center text-3xl font-bold sm:text-5xl">
                    DRCS Memory Game
                </h1>
            </div>
            <p className="max-w-prose text-balance text-center text-lg text-muted-foreground sm:text-3xl">
                You will be shown a grid, with a few random green squares.
                Memorize the locations of the green squares! <br />
            </p>
            <p className="max-w-prose text-balance text-center text-lg text-muted-foreground sm:text-3xl">
                The green squares will be hidden after a few seconds. Click on
                the locations for all the green squares!
            </p>
            <div className="mt-4 flex gap-8">
                <Button asChild size="xl">
                    <Link href="/start">Begin!</Link>
                </Button>
            </div>
        </main>
    );
}
