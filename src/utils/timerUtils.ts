export const getTimeLeft = (targetTime: string) => {
    const targetDate = new Date(targetTime).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
  
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isFinished: true };
    }
  
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
  
    return { hours, minutes, seconds, isFinished: false };
  };
  