"use client";
import { useEffect, useState } from "react";
import { getTimeLeft } from "@/utils/timerUtils";

const CountdownTimer = ({ targetTime }: { targetTime: string }) => {
//   const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetTime));
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isFinished: boolean } | null>(null);

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    const timer = setInterval(() => {
      const updatedTimeLeft = getTimeLeft(targetTime);
      setTimeLeft(updatedTimeLeft);
    //   console.log("timeLeft",hasRefreshed);
      // 🔄 Refresh page when time is up
      if (updatedTimeLeft.isFinished && !hasRefreshed) {
        sessionStorage.setItem("hasRefreshed", "true");
        clearInterval(timer); // Stop the timer
        window.location.reload(); // Refresh the page
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  

  useEffect(() => {
    sessionStorage.removeItem("hasRefreshed");
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="text-xl font-bold text-blue-600">
      {timeLeft.isFinished ? (
        "Time's up!"
      ) : (
        <span>
           {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;
