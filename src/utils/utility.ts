export function calculateRemainingOvers(maxOver: number, finishOver: number) {
    // Total balls in the match
    const totalBalls = maxOver * 6;
  
    // Balls bowled so far
    const fullOversBowled = Math.floor(finishOver);
    const ballsInCurrentOver = (finishOver - fullOversBowled) * 10;
    const ballsBowled = fullOversBowled * 6 + ballsInCurrentOver;
  
    // Remaining balls
    const remainingBalls = totalBalls - ballsBowled;
  
    // Convert remaining balls back to overs and balls
    const remainingOvers = Math.floor(remainingBalls / 6);
    const remainingBallsInOver = Math.trunc(Number(remainingBalls % 6));
    // Combine to get the result in overs.balls format
    return `${remainingOvers}.${remainingBallsInOver}`;
  }