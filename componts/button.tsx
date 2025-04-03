import { Pause, Play, StopCircle } from "lucide-react";
import { MouseEventHandler } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  type: "Play" | "Pause" | "Stop";
}

export function Button({ onClick, type }: ButtonProps) {
    return (
        <button 
        onClick={onClick} 
        className="bg-white text-black p-5 rounded-full shadow-lg transition-transform transform active:scale-95 hover:bg-gray-200">
        {type == "Pause" ? <Pause size={32} /> : type == "Play" ? <Play size={32} />: <StopCircle size={32} /> }
      </button>
    );
}