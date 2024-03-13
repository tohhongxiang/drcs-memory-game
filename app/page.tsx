import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-8">
            <h1 className="text-3xl font-bold">DRCS Memory Game</h1>
            <p className="max-w-prose text-muted-foreground">
                Memorize the location of the green squares!
            </p>
            <div className="flex gap-8">
                <Button asChild>
                    <Link href="/start">Start Game</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/instructions">Instructions</Link>
                </Button>
            </div>
        </main>
    );
}
