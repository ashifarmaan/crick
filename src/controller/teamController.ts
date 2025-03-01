import { httpGet } from "@/lib/http";
import redis from "../config/redis";

export async function TeamDetails(
    tid: number
  ) {
      // const CACHE_KEY = "team_info";
      // const CACHE_TTL = 600;
    const API_URL =
      "https://rest.entitysport.com/exchange/teams/"+tid+"?token=7b58d13da34a07b0a047e129874fdbf4";
  
      // const cachedData = await redis.get(CACHE_KEY);
      // if (cachedData) {
      //   console.log("coming from cache live_matches");
      //   return JSON.parse(cachedData);
      // }
  
    const data = await httpGet(API_URL);
    const teamProfile = data?.response || [];
      // if (teamProfile.length > 0) {
      //   await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(teamProfile));
      // }
    // console.log("coming from API live_matches");
    return teamProfile;
  }

  export async function TeamPlayers(
    tidArray: number []
  ) {
    const token = "7b58d13da34a07b0a047e129874fdbf4";

  const requests = tidArray.map((tid) =>
    httpGet(`https://rest.entitysport.com/exchange/teams/${tid}/player?token=${token}`)
  );

  // Execute all requests concurrently
  const responses = await Promise.all(requests);

  // Extract player data from each response
  const teamProfiles = responses.map((data) => data?.response?.items || []);

  return teamProfiles;
  }

  export async function TeamPlayersById(
    tid: number
  ) {
  const API_URL =
      "https://rest.entitysport.com/exchange/teams/"+tid+"/player?token=7b58d13da34a07b0a047e129874fdbf4";
  

  const data = await httpGet(API_URL);
  const teamPlayers = data?.response?.items  || [];

  return teamPlayers;
  }
  export async function TeamLast5match(
    tid: number,
    status: number
  ) {
  const API_URL =
      "https://rest.entitysport.com/exchange/teams/"+tid+"/matches?token=7b58d13da34a07b0a047e129874fdbf4&&status="+status+"&per_page=5";
  

  const data = await httpGet(API_URL);
  const teamMatches = data?.response?.items  || [];

  return teamMatches;
  }
