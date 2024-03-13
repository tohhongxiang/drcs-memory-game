import { Check } from "lucide-react";

export default function SuccessOverlay() {
    return (
        <div className="rounded-full border-8 border-emerald-800 bg-emerald-400/90 p-8 shadow-lg backdrop-blur-sm">
            <Check className="h-48 w-48" />
        </div>
    );
}
