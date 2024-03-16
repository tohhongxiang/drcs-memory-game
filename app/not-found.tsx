import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
            <div>
                <p className="mb-4 text-center text-5xl sm:text-7xl">⚠️</p>
                <h1 className="text-center text-3xl font-bold sm:text-5xl">
                    Not Found!
                </h1>
            </div>
            <p className="max-w-prose text-balance text-center text-lg text-muted-foreground sm:text-3xl">
                Sorry, but this page does not exist
            </p>
            <Button size="xl" asChild>
                <Link href="/">Go home</Link>
            </Button>
        </div>
    );
}
