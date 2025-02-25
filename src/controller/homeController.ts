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
  const sortedMatches = matches.sort((a: any, b: any) => (a.domestic === "0" ? -1 : b.domestic === "0" ? 1 : 0));
  if (sortedMatches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(sortedMatches));
  }
  console.log("coming from API live_matches");
  return sortedMatches;
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

export async function liveSeries() {
  const CACHE_KEY = "live_series";
  const CACHE_TTL = 60;
  const API_URL =  "https://rest.entitysport.com/exchange/competitions?token=7b58d13da34a07b0a047e129874fdbf4&status=live&per_page=100";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    console.log("coming from cache live_series");
    return JSON.parse(cachedData);
  }


  const data = await httpGet(API_URL);
  const series = data?.response?.items || [];
  if (series.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(series));
  }
  console.log("coming from API live_series");
  return series;
}

export async function seriesById(cid: number) {
  const CACHE_KEY = "series_info";
  const CACHE_TTL = 600;
  const API_URL =  "https://rest.entitysport.com/exchange/competitions/"+cid+"/info?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    console.log("coming from cache live_series");
    return JSON.parse(cachedData);
  }


  const data = await httpGet(API_URL);
  const series = data?.response || [];
  if (series.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(series));
  }
  console.log("coming from API live_series");
  return series;
}