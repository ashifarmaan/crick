import { httpGet } from "@/lib/http";
import redis from "../config/redis";

export async function PlayerStats(
    pid: number
  ) {
    if (!pid) {
      return { notFound: true }; // Handle undefined ID gracefully
    }
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

  export async function PlayerAdvanceStats(
    pid: number
  ) {
    if (!pid) {
      return { notFound: true }; // Handle undefined ID gracefully
    }
      const CACHE_KEY = "player_advance_stats";
      const CACHE_TTL = 600;
    const API_URL =
      "https://rest.entitysport.com/v4/players/" +
      pid +
      "/advancestats?token=7b58d13da34a07b0a047e129874fdbf4";
  
      const cachedData = await redis.get(CACHE_KEY);
      if (cachedData) {
        console.log("coming from cache live_matches");
        return JSON.parse(cachedData);
      }
  
    const data = await httpGet(API_URL);
    const playerStats = data?.response || [];
    // console.log("pl", pid);
      if (playerStats.length > 0) {
        await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(playerStats));
      }
    // console.log("coming from API live_matches");
    return playerStats;
  }


  export async function Ranking() {
      // const CACHE_KEY = "ranking";
      // const CACHE_TTL = 600;
    const API_URL =
      "https://rest.entitysport.com/exchange/iccranks?token=7b58d13da34a07b0a047e129874fdbf4";
  
      // const cachedData = await redis.get(CACHE_KEY);
      // if (cachedData) {
      //   console.log("coming from cache live_matches");
      //   return JSON.parse(cachedData);
      // }
  
    const data = await httpGet(API_URL);
    const ranking = data?.response?.ranks || [];
    // console.log("ranking", ranking);
      // if (ranking.length > 0) {
      //   await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(ranking));
      // }
    // console.log("coming from API live_matches");
    return ranking;
  }