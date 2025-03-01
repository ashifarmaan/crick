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
  // console.log("coming from API live_series");
  return series;
}

export async function seriesById(cid: number) {
  if (!cid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }
  const CACHE_KEY = "series_info";
  const CACHE_TTL = 600;
  const API_URL =  "https://rest.entitysport.com/exchange/competitions/"+cid+"/info?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    // console.log("coming from cache live_series");
    return JSON.parse(cachedData);
  }


  const data = await httpGet(API_URL);
  const series = data?.response || [];
  if (series.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(series));
  }
  // console.log("coming from API live_series");
  return series;
}
export async function seriesUpcomingMatches(cid: number) {
  if (!cid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }
  const CACHE_KEY = "series_upcoming_match";
  const CACHE_TTL = 600;
  const API_URL =  "https://rest.entitysport.com/exchange/competitions/"+cid+"/matches?token=7b58d13da34a07b0a047e129874fdbf4&status=1";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    // console.log("coming from cache live_series");
    return JSON.parse(cachedData);
  }


  const data = await httpGet(API_URL);
  const seriesMatches = data?.response?.items || [];
  if (seriesMatches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(seriesMatches));
  }
  // console.log("coming from API live_series");
  return seriesMatches;
}

export async function TournamentsList() {
  const CACHE_KEY = "tournamentsListCache";
  const CACHE_TTL = 60;
  const API_URL =  "https://rest.entitysport.com/v4/tournaments?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    // console.log("coming from cache live_series");
    return JSON.parse(cachedData);
  }


  const data = await httpGet(API_URL);
  const tournaments = data?.response?.items || [];
  if (tournaments.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(tournaments));
  }
  // console.log("coming from API live_series");
  return tournaments;
}
export async function AllSeriesList() {
  const CACHE_KEY = "tournamentsListCache";
  const CACHE_TTL = 60;

  const API_URL_FIXTURE = "https://rest.entitysport.com/exchange/competitions?token=7b58d13da34a07b0a047e129874fdbf4&status=fixture&per_page=100";
  const API_URL_RESULT = "https://rest.entitysport.com/exchange/competitions?token=7b58d13da34a07b0a047e129874fdbf4&status=result&per_page=100";
  const API_URL_LIVE = "https://rest.entitysport.com/exchange/competitions?token=7b58d13da34a07b0a047e129874fdbf4&status=live&per_page=100";

  // Check Redis cache
  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // Fetch data from both URLs simultaneously
  const [fixtureData, resultData, liveData] = await Promise.all([
    httpGet(API_URL_FIXTURE),
    httpGet(API_URL_RESULT),
    httpGet(API_URL_LIVE),
  ]);

  // Extract items from responses
  const tournamentsFixture = fixtureData?.response?.items || [];
  const tournamentsResult = resultData?.response?.items || [];
  const tournamentsLive = liveData?.response?.items || [];

  // Combine both datasets
  const combinedTournaments = [...tournamentsFixture, ...tournamentsResult, ...tournamentsLive];
// console.log("ss",combinedTournaments);
  // Store in Redis cache
  if (combinedTournaments.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(combinedTournaments));
  }

  return combinedTournaments;
}
