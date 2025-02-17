import React from 'react'
import Link from 'next/link';
import { MatcheStats } from "@/controller/matchInfoController";
import { urlStringEncode } from "@/utils/utility";

interface Stats {
    match_id: number;
  
    matchData:any | null;

    matchUrl :string | null;

    matchTitle :string | null;
  }
export default async function Stats({
    match_id,
    matchData,
    matchUrl,
    matchTitle
  }: Stats) {

    const cid = matchData?.match_info?.competition?.cid;
    
    const renderStatus = () => {
    switch (matchTitle) {
        case "most-run":
          return "batting_most_runs";
        case "highest-average":
          return "batting_highest_average";
        case "highest-strikerate":
          return "batting_highest_strikerate";
        case "most-hundreds":
          return "batting_most_run100";
        case "most-fifties":
          return "batting_most_run50";
        case "most-fours":
          return "batting_most_run4";
        case "most-sixes":
          return "batting_most_run6";       
        

        case "most-wicket":
          return "bowling_top_wicket_takers";
        case "best-average":
          return "bowling_best_averages";
        case "best-bowling":
          return "bowling_best_bowling_figures";
        case "most-five_wickets":
          return "bowling_five_wickets";
        case "best-economy":
          return "bowling_best_economy_rates";
        case "best-strike":
          return "bowling_best_strike_rates";
        default:
          return "batting_most_runs";
      }
    };
    const statType = renderStatus();
    const statsMatch =  await MatcheStats(cid, statType);
    const matchStats= statsMatch.stats;
    console.log("renderStatus",statType);
    return (
        <section className="lg:w-[1000px] mx-auto md:mb-0 mb-4 px-2 lg:px-0">
            <div id="tabs" className="my-4">
            <div className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto">
        <Link href={"/moreinfo/"+matchUrl+"/" + match_id}>
            <button
              className="font-medium py-2 px-3 whitespace-nowrap "
            >
              More Info
            </button>
          </Link>
          <Link href={"/live-score/"+matchUrl+"/" + match_id}>
            <button
              className="font-medium py-2 px-3 whitespace-nowrap"
            >
              Live
            </button>
          </Link>
          <Link href={"/scorecard/"+matchUrl+"/" + match_id}>
            <button
              className="font-medium py-2 px-3 whitespace-nowrap"
            >
              Scorecard
            </button>
          </Link>
          <Link href={"/squad/"+matchUrl+"/"+ match_id}>
            <button
              className="font-medium py-2 px-3 whitespace-nowrap"
            >
              Squad
            </button>
          </Link>
          <Link href={"/points-table/"+matchUrl+"/"+ match_id}>
            <button
              className="font-medium py-2 px-3 whitespace-nowrap"
            >
              Points Table
            </button>
          </Link>
          <Link href={"/stats/"+matchUrl+"/"+ match_id}>
            <button
              className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white rounded-md"
            >
              Stats
            </button>
          </Link>
        </div>
            </div>

            <div id="stats">
                <div className="md:grid grid-cols-12 gap-4">
                    <div className="lg:col-span-3 md:col-span-4">
                        <div className="rounded-lg p-2 mb-4 bg-[#ffffff]">
                            <div className="py-2 mb-2">
                                <h3 className="text-1xl font-semibold pl-[6px] border-l-[3px] border-[#1a80f8]">
                                    Batting
                                </h3>
                            </div>
                            <div id="team-buttons" className="">
                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/most-run"}>
                                    <button

                                        className={`state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md ${matchTitle == 'most-run' ? "bg-[#ecf2fd] text-[#1a80f8]" : "hover:bg-[#ecf2fd] hover:text-[#1a80f8]" } `}
                                    >
                                        Most Runs
                                    </button>
                                </Link>
                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/highest-average"}>
                                    <button
                                        className={`state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md ${matchTitle == 'highest-average' ? "bg-[#ecf2fd] text-[#1a80f8]" : "hover:bg-[#ecf2fd] hover:text-[#1a80f8]" } `}
                                    >
                                        Best Batting Average
                                    </button>
                                </Link>
                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/highest-strikerate"}>
                                    <button

                                        className={`state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md ${matchTitle == 'highest-strikerate' ? "bg-[#ecf2fd] text-[#1a80f8]" : "hover:bg-[#ecf2fd] hover:text-[#1a80f8]" } `}

                                    >
                                        Best Batting Strike Rate
                                    </button>
                                </Link>
                               
                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/most-hundreds"}>
                                    <button
                                        className={`state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md ${matchTitle == 'most-hundreds' ? "bg-[#ecf2fd] text-[#1a80f8]" : "hover:bg-[#ecf2fd] hover:text-[#1a80f8]" } `}
                                    >
                                        Most Hundreds
                                    </button>
                                </Link>

                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/most-fifties"}>
                                    <button
                                        className={`state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md ${matchTitle == 'most-fifties' ? "bg-[#ecf2fd] text-[#1a80f8]" : "hover:bg-[#ecf2fd] hover:text-[#1a80f8]" } `}
                                    >
                                        Most Fifties
                                    </button>
                                </Link>

                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/most-fours"}>
                                    <button
                                        className={`state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md ${matchTitle == 'most-fours' ? "bg-[#ecf2fd] text-[#1a80f8]" : "hover:bg-[#ecf2fd] hover:text-[#1a80f8]" } `}
                                    >
                                        Most Fours
                                    </button>
                                </Link>

                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/most-sixes"}>
                                    <button
                                        className={`state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md ${matchTitle == 'most-sixes' ? "bg-[#ecf2fd] text-[#1a80f8]" : "hover:bg-[#ecf2fd] hover:text-[#1a80f8]" } `}
                                    >
                                        Most Sixes
                                    </button>
                                </Link>

                            </div>
                        </div>
                        <div className="rounded-lg p-2 mb-4 bg-[#ffffff]">
                            <div className="py-2 mb-2">
                                <h3 className="text-1xl font-semibold pl-[6px] border-l-[3px] border-[#1a80f8]">
                                    Bowler
                                </h3>
                            </div>
                            <div id="team-buttons" className="">
                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/most-wicket"}>
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most Wickets
                                    </button>
                                </Link>
                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/best-average"}>
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Best Bowling Average
                                    </button>
                                </Link>

                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/best-bowling"}>
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Best Bowling
                                    </button>
                                </Link>

                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/most-five_wickets"}>
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most 5 Wickets Haul
                                    </button>
                                </Link>

                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/best-economy"}>
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Best Economy
                                    </button>
                                </Link>

                                <Link href={"/stats/"+matchUrl+"/"+ match_id+"/best-strike"}>
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Best Bowling Strike Rate
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-9 md:col-span-8">
                        <div id="most-runs" className={`state-content most-runs" ? "" : "hidden"}`} >
                            <div>
                                <div className="rounded-lg bg-[#ffffff] mb-4 p-4">
                                    <h3 className="text-1xl font-semibold mb-3 pl-[7px] border-l-[3px] border-[#229ED3]">
                                    Batting
                                    </h3>
                                    <div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap">
                                                <thead className="bg-blue-50 text-gray-700 ">
                                                    <tr>
                                                        <th className="px-4 py-3 font-medium w-[10px]" />
                                                        <th className="px-4 py-3 font-medium">Batter</th>
                                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                            Match
                                                        </th>
                                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                            Inns
                                                        </th>
                                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                            Runs
                                                        </th>
                                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                            Avg
                                                        </th>
                                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                            4s
                                                        </th>
                                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                            6s
                                                        </th>
                                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                            SR
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {matchStats.map((stats:any, index:number) => (
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">{index+1}</td>
                                                        <td className="md:px-2 py-3 text-[#217AF7]">
                                                            <Link href="/profile"> {stats?.player?.short_name}</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">{stats?.matches}</td>
                                                        <td className="md:px-2 pl-[14px] py-3">{stats?.innings}</td>
                                                        <td className="md:px-2 pl-[14px] py-3">{stats?.runs}</td>
                                                        <td className="md:px-2 pl-[14px] py-3">{stats?.average}</td>
                                                        <td className="md:px-2 pl-[14px] py-3">{stats?.run4}</td>
                                                        <td className="md:px-2 pl-[14px] py-3">{stats?.run6}</td>
                                                        <td className="md:px-2 pl-[14px] py-3">{stats?.strike}</td>
                                                    </tr>
                                                    ))}
                                                    

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="rounded-lg py-4 px-4 bg-[#ffffff] mb-4">
                <div className="lg:grid grid-cols-12 gap-4">
                    <div className="col-span-12">

                        <h3 className="text-1xl font-semibold mb-1" style={{ lineHeight: "21px" }}>Live - Jagadeesan hits
                            a century; Haryana trounce
                        </h3>
                        <p className="text-gray-500 font-normal">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias dicta maiores esse adipisci autem nesciunt placeat saepe corporis explicabo, enim tenetur non laboriosam ipsam nihil est aut. Odit nostrum dicta maiores, ipsam vero hic, recusandae, fugit doloribus voluptas a at! Quae recusandae est reprehenderit ratione. Nam, cupiditate quibusdam ab aut eos corporis omnis, culpa dolorum eligendi ea inventore! A, quo modi excepturi neque similique aliquam saepe quis, aut alias pariatur eligendi enim expedita doloremque ex recusandae distinctio. Ut mollitia adipisci soluta consequatur! Quisquam sit nemo doloremque illo libero sapiente facere minima, impedit maxime ut porro eius adipisci asperiores? Sit, architecto.
                        </p>

                    </div>
                </div>


            </div>

        </section>
    )
}