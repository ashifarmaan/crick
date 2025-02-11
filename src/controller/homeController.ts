// lib/fetchMatches.ts
import { httpGet } from "@/lib/http";
import redis from "../config/redis";

export async function upcomingMatches() {
  const CACHE_KEY = "upcoming_matches";
  const CACHE_TTL = 60;
  const API_URL =  "https://rest.entitysport.com/exchange/matches?token=7b58d13da34a07b0a047e129874fdbf4&status=1&per_page=10";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    console.log("coming from cache upcoming_matches");
    return JSON.parse(cachedData);
  }


  const data = await httpGet(API_URL);
  const matches = data?.response?.items || [];
  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }
  console.log("coming from API upcoming_matches");
  return matches;
}

export async function liveMatches() {
  const CACHE_KEY = "live_matches";
  const CACHE_TTL = 60;
  const API_URL = "https://rest.entitysport.com/exchange/matches?token=7b58d13da34a07b0a047e129874fdbf4&status=3&per_page=10";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    console.log("coming from cache live_matches");
    return JSON.parse(cachedData);
  }

  
  const data = await httpGet(API_URL);
  const matches = data?.response?.items || [];
  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }
  console.log("coming from API live_matches");
  return matches;
}

export async function completedMatches() {
  const CACHE_KEY = "completed_matches";
  const CACHE_TTL = 60;
  const API_URL = "https://rest.entitysport.com/exchange/matches?token=7b58d13da34a07b0a047e129874fdbf4&status=2&per_page=10";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    console.log("coming from cache completed matches");
    return JSON.parse(cachedData);
  }

  
  const data = await httpGet(API_URL);
  const matches = data?.response?.items || [];
  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }
  console.log("coming from API completed_matches");
  return matches;
}
