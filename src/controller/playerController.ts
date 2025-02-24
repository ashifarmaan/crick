import { httpGet } from "@/lib/http";
import redis from "../config/redis";

export async function PlayerStats(
    pid: number
  ) {
      const CACHE_KEY = "player_info";
      const CACHE_TTL = 600;
    const API_URL =
      "https://rest.entitysport.com/exchange/players/" +
      pid +
      "/stats?token=7b58d13da34a07b0a047e129874fdbf4";
  
      const cachedData = await redis.get(CACHE_KEY);
      if (cachedData) {
        console.log("coming from cache live_matches");
        return JSON.parse(cachedData);
      }
  
    const data = await httpGet(API_URL);
    const playerProfile = data?.response || [];
    // const pdata = playerProfile?.[playerRole]?.[matchType];
    // console.log("pl", pid);
      if (playerProfile.length > 0) {
        await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(playerProfile));
      }
    // console.log("coming from API live_matches");
    return playerProfile;
  }