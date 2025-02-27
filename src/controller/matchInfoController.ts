// lib/fetchMatches.ts
import { httpGet } from "@/lib/http";
import redis from "../config/redis";

export async function MatcheInfo(matchid: number) {
  if (!matchid) {
    return { notFound: true };
  }
  const CACHE_KEY = "match_info_by_id";
  const CACHE_TTL = 60;
  const API_URL =
    "https://rest.entitysport.com/exchange/matches/" +
    matchid +
    "/info?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
     
    return JSON.parse(cachedData);
  }
  const data = await httpGet(API_URL);
  const matches = data?.response || [];
  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }
  return matches;
}

export async function Last10Match(matchid: number) {
  if (!matchid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }

  const CACHE_KEY = "last_10_match";
  const CACHE_TTL = 600;

  const API_URL =
    "https://rest.entitysport.com/v4/matches/" +
    matchid +
    "/advance?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
     
    return JSON.parse(cachedData);
  }

  const data = await httpGet(API_URL);
  const matches = data?.response || [];
  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }
  return matches;
}

export async function MatchStatistics(matchid: number) {
  if (!matchid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }

  const CACHE_KEY = "match_statistics";
  const CACHE_TTL = 60;

  const API_URL =
    "https://rest.entitysport.com/exchange/matches/" +
    matchid +
    "/statistics?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
     
    return JSON.parse(cachedData);
  }

  const data = await httpGet(API_URL);
  const matches = data?.response || [];
  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }
  return matches;
}

export async function MatchCommentary(matchid: number, inningNumer: number) {
  console.log("match", matchid);
  if (!matchid || !inningNumer) {
    return { notFound: true }; // Handle undefined ID gracefully
  }

  const CACHE_KEY = "match_commentary";
  const CACHE_TTL = 60;

  const API_URL =
    "https://rest.entitysport.com/exchange/matches/" +
    matchid +
    "/innings/" +
    inningNumer +
    "/commentary?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
     
    return JSON.parse(cachedData);
  }

  const data = await httpGet(API_URL);
  const matchInningCommentaries = data?.response || [];

  if (matchInningCommentaries.length > 0) {
    await redis.setex(
      CACHE_KEY,
      CACHE_TTL,
      JSON.stringify(matchInningCommentaries)
    );
  }

  return matchInningCommentaries;
}

export async function MatcheStats(cid: number, statType: string) {
  if (!cid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }

  const CACHE_KEY = "match_stats";
  const CACHE_TTL = 60;

  const API_URL =
    "https://rest.entitysport.com/exchange/competitions/" +
    cid +
    "/stats/" +
    statType +
    "?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
     
    return JSON.parse(cachedData);
  }

  const data = await httpGet(API_URL);
  const matches = data?.response || [];

  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }

  return matches;
}

export async function SeriesPointsTable(cid: number) {
  if (!cid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }

  const CACHE_KEY = "seriesPointsTableCache";
  const CACHE_TTL = 60;

  const API_URL =
    "https://rest.entitysport.com/exchange/competitions/" +
    cid +
    "/info?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
     
    return JSON.parse(cachedData);
  }

  const data = await httpGet(API_URL);
  const matches = data?.response || [];

  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }

  return matches;
}

export async function SeriesPointsTableMatches(cid: number) {
  if (!cid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }

  const CACHE_KEY = "seriesPointsTableMatchesCache";
  const CACHE_TTL = 60;

  const API_URL =
    "https://rest.entitysport.com/exchange/competitions/" +
    cid +
    "/matches?token=7b58d13da34a07b0a047e129874fdbf4";

  const cachedData = await redis.get(CACHE_KEY);
  if (cachedData) {
     
    return JSON.parse(cachedData);
  }

  const data = await httpGet(API_URL);
  const matches = data?.response || [];

  if (matches.length > 0) {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
  }

  return matches;
}

export async function SeriesKeyStats(cid: number) {
  if (!cid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }

  const baseUrl = "https://rest.entitysport.com/exchange/competitions";
  const token = "7b58d13da34a07b0a047e129874fdbf4";

  const endpoints = {
    mostRuns: `${baseUrl}/${cid}/stats/batting_most_runs?token=${token}`,
    highStrike: `${baseUrl}/${cid}/stats/batting_highest_strikerate?token=${token}`,
    topWickets: `${baseUrl}/${cid}/stats/bowling_top_wicket_takers?token=${token}`,
    bestBowling: `${baseUrl}/${cid}/stats/bowling_best_bowling_figures?token=${token}`,
  };

  try {
    const [mostRuns, highStrike, topWickets, bestBowling] = await Promise.all(
      Object.values(endpoints).map((url) => httpGet(url))
    );

    return {
      mostRuns: mostRuns?.response?.stats?.[0] || [],
      highStrike: highStrike?.response?.stats?.[0] || [],
      topWickets: topWickets?.response?.stats?.[0] || [],
      bestBowling: bestBowling?.response?.stats?.[0] || [],
    };
  } catch (error) {
    console.error("Error fetching series stats:", error);
    return { error: "Failed to fetch series stats" };
  }
}

export async function SeriesMatches(cid: number) {
  if (!cid) {
    return { notFound: true }; // Handle undefined ID gracefully
  }

  const baseUrl = "https://rest.entitysport.com/exchange/competitions";
  const token = "7b58d13da34a07b0a047e129874fdbf4";

  const endpoints = {
    scheduledMatch: `${baseUrl}/${cid}/matches?token=${token}&status=1`,
    resultMatch: `${baseUrl}/${cid}/matches?token=${token}&status=2`,
    liveMatch: `${baseUrl}/${cid}/matches?token=${token}&status=3`,
  };

  try {
    const [scheduledMatch, resultMatch, liveMatch] = await Promise.all(
      Object.values(endpoints).map((url) => httpGet(url))
    );

    return {
      scheduledMatch: scheduledMatch?.response?.items || [],
      resultMatch: resultMatch?.response?.items || [],
      liveMatch: liveMatch?.response?.items || [],
    };
  } catch (error) {
    console.error("Error fetching series items:", error);
    return { error: "Failed to fetch series items" };
  }
}
