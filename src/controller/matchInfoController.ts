// lib/fetchMatches.ts
import { httpGet } from "@/lib/http";
// import redis from "../config/redis";


export async function MatcheInfo(matchid: number) {
    
//   const CACHE_KEY = "matches_info";
//   const CACHE_TTL = 60;
  const API_URL = "https://rest.entitysport.com/exchange/matches/"+matchid+"/info?token=7b58d13da34a07b0a047e129874fdbf4";
  
//   const cachedData = await redis.get(CACHE_KEY);
//   if (cachedData) {
//     console.log("coming from cache live_matches");
//     return JSON.parse(cachedData);
//   }

  
  const data = await httpGet(API_URL);
  const matches = data?.response || [];
//    console.log(matches);
//   if (matches.length > 0) {
//     await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
//   }
 // console.log("coming from API live_matches");
  return matches;
}

export async function Last10Match(matchid: number) {
    
    //   const CACHE_KEY = "matches_info";
    //   const CACHE_TTL = 60;
      const API_URL = "https://rest.entitysport.com/v4/matches/"+matchid+"/advance?token=7b58d13da34a07b0a047e129874fdbf4";
      
    //   const cachedData = await redis.get(CACHE_KEY);
    //   if (cachedData) {
    //     console.log("coming from cache live_matches");
    //     return JSON.parse(cachedData);
    //   }
    
      
      const data = await httpGet(API_URL);
      const matches = data?.response || [];
    //    console.log(matches);
    //   if (matches.length > 0) {
    //     await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
    //   }
     // console.log("coming from API live_matches");
      return matches;
    }

    export async function MatchStatistics(matchid: number) {
    
        //   const CACHE_KEY = "matches_info";
        //   const CACHE_TTL = 60;
          const API_URL = "https://rest.entitysport.com/exchange/matches/"+matchid+"/statistics?token=7b58d13da34a07b0a047e129874fdbf4";
          
        //   const cachedData = await redis.get(CACHE_KEY);
        //   if (cachedData) {
        //     console.log("coming from cache live_matches");
        //     return JSON.parse(cachedData);
        //   }
        
          
          const data = await httpGet(API_URL);
          const matches = data?.response || [];
        //    console.log(matches);
        //   if (matches.length > 0) {
        //     await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
        //   }
         // console.log("coming from API live_matches");
          return matches;
        }

        export async function MatchCommentary(matchid: number,inningNumer: number) {
    
            //   const CACHE_KEY = "matches_info";
            //   const CACHE_TTL = 60;
              const API_URL = "https://rest.entitysport.com/exchange/matches/"+matchid+"/innings/"+inningNumer+"/commentary?token=7b58d13da34a07b0a047e129874fdbf4";
              
            //   const cachedData = await redis.get(CACHE_KEY);
            //   if (cachedData) {
            //     console.log("coming from cache live_matches");
            //     return JSON.parse(cachedData);
            //   }
            
              
              const data = await httpGet(API_URL);
              const matches = data?.response || [];
            //    console.log(matches);
            //   if (matches.length > 0) {
            //     await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
            //   }
             // console.log("coming from API live_matches");
              return matches;
            }

            export async function MatcheStats(cid: number, statType: string) {
    
              //   const CACHE_KEY = "matches_info";
              //   const CACHE_TTL = 60;
                const API_URL = "https://rest.entitysport.com/exchange/competitions/"+cid+"/stats/"+statType+"?token=7b58d13da34a07b0a047e129874fdbf4";
                
              //   const cachedData = await redis.get(CACHE_KEY);
              //   if (cachedData) {
              //     console.log("coming from cache live_matches");
              //     return JSON.parse(cachedData);
              //   }
              
                
                const data = await httpGet(API_URL);
                const matches = data?.response || [];
              //    console.log(matches);
              //   if (matches.length > 0) {
              //     await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
              //   }
               // console.log("coming from API live_matches");
                return matches;
              }

              export async function SeriesPointsTable(cid: number) {
    
                //   const CACHE_KEY = "matches_info";
                //   const CACHE_TTL = 60;
                  const API_URL = "https://rest.entitysport.com/exchange/competitions/"+cid+"/info?token=7b58d13da34a07b0a047e129874fdbf4";
                  
                //   const cachedData = await redis.get(CACHE_KEY);
                //   if (cachedData) {
                //     console.log("coming from cache live_matches");
                //     return JSON.parse(cachedData);
                //   }
                
                  
                  const data = await httpGet(API_URL);
                  const matches = data?.response || [];
                //    console.log(matches);
                //   if (matches.length > 0) {
                //     await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
                //   }
                 // console.log("coming from API live_matches");
                  return matches;
                }

                export async function PlayerStats(pid: number, matchType: string, playerRole: string) {
    
                  //   const CACHE_KEY = "matches_info";
                  //   const CACHE_TTL = 60;
                    const API_URL = "https://rest.entitysport.com/exchange/players/"+pid+"/stats?token=7b58d13da34a07b0a047e129874fdbf4";
                    
                  //   const cachedData = await redis.get(CACHE_KEY);
                  //   if (cachedData) {
                  //     console.log("coming from cache live_matches");
                  //     return JSON.parse(cachedData);
                  //   }
                  
                    
                    const data = await httpGet(API_URL);
                    const playerProfile = data?.response || [];
                    const pdata = playerProfile?.[playerRole]?.[matchType];
                     console.log("pl",playerProfile?.[playerRole]?.[matchType]);
                  //   if (matches.length > 0) {
                  //     await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(matches));
                  //   }
                   // console.log("coming from API live_matches");
                    return pdata;
                  }

            

    