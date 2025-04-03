'use client';

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/componts";

export default function TimerApp() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [background, setBackground] = useState("bg-[radial-gradient(circle,_#3A6FA4_20%,_#1A4886_80%)]");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds:number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
    setBackground(
      isRunning
        ? "bg-[radial-gradient(circle,_#F5BC50_20%,_#D88D02_80%)]"
        : "bg-[radial-gradient(circle,_#4FBBAA_20%,_#1A8680_80%)]"
    );
  };

  const handleStop = () => {
    if (time > 0) {
      setHistory([...history, time]);
    }
    setTime(0);
    setIsRunning(false);
    setBackground("bg-[radial-gradient(circle,_#3A6FA4_20%,_#1A4886_80%)]");
  };

  const handleDelete = (index:number) => {
    setBackground("bg-[radial-gradient(circle,_#B25050_20%,_#8A2F2F_80%)]");
    setTimeout(() => {
      setHistory(history.filter((_, i) => i !== index));
      setBackground("bg-[radial-gradient(circle,_#3A6FA4_20%,_#1A4886_80%)]");
    }, 500);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${background} transition-colors duration-1000 p-4`} style={{ fontFamily: 'Zen Kaku Gothic New, sans-serif' }}> 
      <h1 className="text-white text-4xl font-semibold mb-4">Timer.io</h1>
      <div className="text-white text-7xl font-mono p-6 bg-white/10 rounded-xl shadow-lg relative">
        {formatTime(time)}
      </div>
      <div className="flex gap-6 mt-6">
        <Button onClick={handlePlayPause} type={isRunning ? "Pause" : "Play"} />
        <Button onClick={handleStop} type="Stop" />
      </div>
      <div className="mt-8 text-white w-full max-w-md">
        <h2 className="text-xl mb-3">Histórico</h2>
        <ul className="space-y-3">
          {history.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-white text-black p-4 rounded-lg shadow-md">
              #{index + 1} - {formatTime(item)}
              <button 
                onClick={() => handleDelete(index)} 
                className="text-red-600 hover:text-red-800 transition-colors">
                <Trash2 size={24} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
