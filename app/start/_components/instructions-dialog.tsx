import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function InstructionsDialog({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <h1 className="pb-4 text-2xl">Instructions</h1>
                    </DialogTitle>
                    <DialogDescription>
                        <p className="mb-2 text-lg">
                            You will be shown a grid, with a few random green
                            squares. Memorize the locations of the green
                            squares! <br />
                        </p>
                        <p className="mb-2 text-lg">
                            The green squares will be hidden after a few
                            seconds. Click on the locations for all the green
                            squares!
                        </p>
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose>
                            <Button>Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
