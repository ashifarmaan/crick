import { NextResponse } from "next/server";
import { InsertOrUpdateLiveMatches } from "@/controller/dbController"; // Import your function

export async function GET() {
  try {
    const result = await InsertOrUpdateLiveMatches(); // Call your function
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}