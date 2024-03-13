import { Check } from "lucide-react";

export default function SuccessOverlay() {
    return (
        <div className="flex flex-col items-center justify-center rounded-full p-8">
            <Check className="z-10 h-48 w-48" />
            <div className="absolute h-64 w-64 rounded-full border-8 border-green-600 bg-green-400/70 shadow-lg backdrop-blur-sm" />
        </div>
    );
}
