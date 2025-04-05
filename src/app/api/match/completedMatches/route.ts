import { NextRequest, NextResponse } from "next/server";
import db from "@/config/db"; // Ensure correct import path for DB
import redis from "@/config/redis"; // Ensure correct import path for
import fs from "fs";

export async function GET(req: NextRequest) {
  try {
    const CACHE_KEY = "completed_matches";
    const CACHE_TTL = 60;

    const cachedData = await redis.get(CACHE_KEY);
    if (cachedData) {
      console.log("coming from cache completed matches");
      return NextResponse.json({ success: true, data: JSON.parse(cachedData) });
    }

   
    const query =
      "SELECT mi.fileName FROM match_info mi JOIN ( SELECT match_id FROM matches WHERE commentary = 1 and status = 2 ORDER BY date_end_ist DESC LIMIT 10) m ON mi.match_id = m.match_id";
    const [rows] = await db.query<any[]>(query);
    if (!rows || !rows.length || rows.length === 0) {
      return NextResponse.json({ success: false, data: [] }, { status: 404 });
    }

    let allMatches: any[] = [];

    for (const row of rows) {
      const { match_id, fileName } = row;

      if (!fileName || !fs.existsSync(fileName)) {
        console.warn(`File not found: ${fileName}`);
        continue; // Skip missing files
      }

      try {
        const fileData = fs.readFileSync(fileName, "utf8");
        const parsedData = JSON.parse(fileData);

        // ✅ Extract team info & players
        const matchInfo = parsedData || {};

        // ✅ Push structured team object into array
        allMatches.push(matchInfo);
      } catch (error) {
        console.error(`Error reading/parsing file: ${fileName}`, error);
      }
    }
    // console.log("Players:", allMatches);
    // return allMatches;
    const updatedJson = allMatches.map(obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [["live_odds"].includes(k) && Array.isArray(v) && v.length === 0 ? k : k, (["live_odds"].includes(k) && Array.isArray(v) && v.length === 0) ? {} : v])));
    if (rows.length > 0) {
      await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(updatedJson));
    }

    return NextResponse.json({ success: true, data: updatedJson });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// export async function GET(req: NextRequest) {
//     try {
//         const CACHE_KEY = "completed_matches";
//         const CACHE_TTL = 60;

//         const cachedData = await redis.get(CACHE_KEY);
//         if (cachedData) {
//             console.log("coming from cache completed matches");
//             return NextResponse.json({ success: true, data: JSON.parse(cachedData) });
//         }

//         const query = 'SELECT * FROM matches where status = 2 order by id desc limit 10';
//         const [rows] = await db.query<any[]>(query);


//         if (rows.length > 0) {
//             await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(rows));
//         }

//         return NextResponse.json({ success: true, data: rows });
//     } catch (error) {
//         console.error("API Error:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
