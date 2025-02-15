"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface MatchInfo {
  match_id: number;

  matchData: any| null;

  matchLast: any | null;
  matchUrl :string | null;
}

export default function MoreInfo({
  match_id,
  matchData,
  matchLast,
  matchUrl
}: MatchInfo) {
    
  const teama_id = matchData?.match_info?.teama?.team_id;
  const teamb_id = matchData?.match_info?.teamb?.team_id;

  const playing11 = matchData?.["match-playing11"];
  const teama11Players = [
    ...(playing11?.teama?.squads.filter(
      (player: { playing11: string; }) => player.playing11 === "true"
    ) || []),
  ];
  const teamb11Players = [
    ...(playing11?.teamb?.squads.filter(
      (player: { playing11: string; }) => player.playing11 === "true"
    ) || []),
  ];
  // console.log("test1",matchLast.items.teama_last10_match[0].winning_team_id);
  const matchlistA = matchLast?.items?.teama_last10_match;
  const matchlistB = matchLast?.items?.teamb_last10_match;
  const matchlistAB = matchLast?.items?.teama_vs_teamb_last10_match ?? "";
  const matchlistSameVenue = matchLast?.items?.teama_vs_teamb_last10_match_same_venue ?? "";

  let teamaWinMatch = 0;
  let teambWinMatch = 0;
  const matchPlayed = matchlistAB.length;
  matchlistAB.map((items: { winning_team_id:any; }) =>
    items.winning_team_id === teama_id
      ? teamaWinMatch++
      : items.winning_team_id === teamb_id
      ? teambWinMatch++
      : ""
  );

  const teamaWinper = teamaWinMatch > 0 ? (teamaWinMatch / matchPlayed) * 100 : 0;
  const teambWinper = teambWinMatch > 0 ? (teambWinMatch / matchPlayed) * 100 : 0;

  const teamAScores = matchlistAB.map((match: { teama: { scores: string; }; }) => {
    const score = match.teama.scores.split("/")[0]; // Get the runs before "/"
    return parseInt(score, 10); // Convert to a number
  });
  const highestScoreTeamA = teamAScores > 0 ? Math.max(...teamAScores): 0;
  const lowestScoreTeamA = teamAScores > 0 ? Math.min(...teamAScores): 0;
  const averageScoreTeamA =teamAScores > 0 ? 
    teamAScores.reduce((sum:any, score:any) => sum + score, 0) / teamAScores.length : 0;

  const teamBScores = matchlistAB.map((match: { teamb: { scores: string; }; }) => {
    const score = match.teamb.scores.split("/")[0]; // Get the runs before "/"
    return parseInt(score, 10); // Convert to a number
  });
  const highestScoreTeamB = teamBScores > 0 ? Math.max(...teamBScores) :0;
  const lowestScoreTeamB = teamBScores > 0 ? Math.min(...teamBScores) :0;
  const averageScoreTeamB = teamBScores > 0 ? 
    teamBScores.reduce((sum:any, score:any) => sum + score, 0) / teamBScores.length: 0;


    let sameVenueteamaWinMatch = 0;
    let sameVenueteambWinMatch = 0;
    const sameVenuematchPlayed = matchlistSameVenue.length;
    matchlistSameVenue.map((items: { winning_team_id:any; }) =>
      items.winning_team_id === teama_id
        ? sameVenueteamaWinMatch++
        : items.winning_team_id === teamb_id
        ? sameVenueteambWinMatch++
        : ""
    );

  
    const sameVenueteamaWinper = sameVenuematchPlayed > 0 ? (sameVenueteamaWinMatch / sameVenuematchPlayed) * 100    : 0;
    const sameVenueteambWinper = sameVenuematchPlayed > 0 ? (sameVenueteambWinMatch / sameVenuematchPlayed) * 100    : 0;
  
    const sameVenueteamAScores = matchlistSameVenue.map((match: { teama: { scores: string; }; }) => {
      const score = match.teama.scores.split("/")[0]; // Get the runs before "/"
      return parseInt(score, 10); // Convert to a number
    });
    const sameVenuehighestScoreTeamA = sameVenueteamAScores > 0 ? Math.max(...sameVenueteamAScores) : 0;
    const sameVenuelowestScoreTeamA = sameVenueteamAScores > 0 ? Math.min(...sameVenueteamAScores) : 0;
    const sameVenueaverageScoreTeamA = sameVenueteamAScores > 0 ?
    sameVenueteamAScores.reduce((sum:any, score:any) => sum + score, 0) / sameVenueteamAScores.length: 0;
  
    const sameVenueteamBScores = matchlistSameVenue.map((match: { teamb: { scores: string; }; }) => {
      const score = match.teamb.scores.split("/")[0]; // Get the runs before "/"
      return parseInt(score, 10); // Convert to a number
    });
    const sameVenuehighestScoreTeamB = sameVenueteamBScores > 0 ? Math.max(...sameVenueteamBScores):0;
    const sameVenuelowestScoreTeamB = sameVenueteamBScores > 0 ? Math.min(...sameVenueteamBScores):0;
    const sameVenueaverageScoreTeamB =
    sameVenueteamBScores > 0 ? sameVenueteamBScores.reduce((sum:any, score:any) => sum + score, 0) / sameVenueteamBScores.length: 0;

  console.log("playing11", teama11Players);

  const [openHeading, setOpenHeading] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenHeading(openHeading === index ? null : index);
  };

  const [activeTab, setActiveTab] = useState("cust-box-click-firview");

  const handleProbabilityTab = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName);
  };

  const [playing11Tab, setPlaying11Tab] = useState("cust-box-click-playing11");

  const handlePlaying11Tab = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tabName: React.SetStateAction<string>) => {
    setPlaying11Tab(tabName);
  };

  return (
    <>
      <section className="lg:w-[1000px] mx-auto md:mb-0 mb-4 px-2 lg:px-0">
        <div id="tabs" className="my-4">
        <div className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto">
        <Link href={"/moreinfo/"+matchUrl+"/" + match_id}>
            <button
              className="font-medium py-2 px-3 whitespace-nowrap  bg-[#1A80F8] text-white rounded-md"
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
              className="font-medium py-2 px-3 whitespace-nowrap"
            >
              Stats
            </button>
          </Link>
        </div>
        </div>

        <div id="tab-content">
          {/*------------------------  More Info Seaction Start ---------------------------*/}
          <div id="info" className="tab-content">
            <div className="md:grid grid-cols-12 gap-4">
              {/* Match Detail */}
              <div className="lg:col-span-8 md:col-span-7">
                <div className="rounded-lg bg-white">
                  <div className="p-4">
                    <div className="md:flex items-center justify-between">
                      <div className="flex gap-4 items-center md:mb-0 mb-[15px]">
                        <div>
                          <Image
                            src="/assets/img/vs-img.png"
                            className="md:h-[auto] h-[56px]"
                            width={80}
                            height={80}
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="text-[16px] text-[#909090] font-medium mb-1">
                            {matchData?.match_info?.subtitle}
                          </p>
                          <p className="text-[16px] text-[#272B47] font-medium mb-2">
                            {matchData?.match_info?.competition?.title}
                          </p>
                        </div>
                      </div>
                      <div className="md:text-end">
                        <p className="text-[14px] mb-1 text-[#272B47] font-medium">
                          <span className="text-[14px] text-[#909090]">
                            Date :
                          </span>
                          {matchData?.match_info?.date_start_ist}
                        </p>
                        <p className="text-[14px] text-[#272B47] font-medium">
                          <span className="text-[14px] text-[#909090]">
                            Toss :
                          </span>{" "}
                          {matchData?.match_info?.toss?.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#ffffff] my-4 p-4">
                  <div>
                    <h3 className="text-[15px] font-semibold  pl-[7px] border-l-[3px] mb-3 border-[#229ED3]">
                      Recent Performance{" "}
                      <span className="text-[#909090]"> (Last 5 match) </span>
                    </h3>
                    <div className="border-t-[1px] border-[#E4E9F0]" />
                    <div className="md:px-2">
                      <div className="performance-section">
                        <div
                          className="flex items-center justify-between my-3"
                          onClick={() => handleToggle(1)}
                        >
                          <Link href="">
                            <div className="flex items-center space-x-3">
                              <div>
                                <Image
                                  src={matchData?.match_info?.teama?.logo_url}
                                  className="h-[25px]"
                                  width={25}
                                  height={20}
                                  alt={matchData?.match_info?.teama?.name}
                                />
                              </div>
                              <h3 className="text-1xl font-medium">
                                {matchData?.match_info?.teama?.name}
                              </h3>
                            </div>
                          </Link>
                          <div>
                            <div className="ml-auto flex gap-1 items-center">
                              {matchlistA
                                .slice(0, 5)
                                .map((items: {
                                    match_id: number | undefined; winning_team_id: number; 
}) =>
                                  items.winning_team_id === teama_id ? (
                                    <span key={items.match_id} className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                      W
                                    </span>
                                  ) : (
                                    <span key={items.match_id}  className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded">
                                      L
                                    </span>
                                  )
                                )}

                              <span>
                                <button
                                  className={`transform transition-transform ${
                                    openHeading === 1
                                      ? "rotate-180"
                                      : "rotate-0"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-gray-600"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M19.5 12l-7.5 7.5L4.5 12"
                                    />
                                  </svg>
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t-[1px] border-[#E4E9F0]" />
                        {openHeading === 1 && (
                          <div className="md:px-3 open-Performance-data">
                            {/* full screen teame data */}
                            <div className="overflow-x-auto lg:block hidden">
                              <table className="w-full text-left rtl:text-right">
                                <tbody>
                                  {matchlistA.slice(0, 5).map((items:any, index:number) => (
                                    <tr className="whitespace-nowrap bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[13px]" key={index}>
                                      <td className="px-4 pl-0 py-1 ">
                                        <Link href="#">
                                          <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                            <div className="flex items-center space-x-1">
                                              <Image
                                                src={items.teama.logo_url}
                                                className="h-[24px] rounded-full"
                                                width={25}
                                                height={25}
                                                alt={items.teama.short_name}
                                              />
                                              <span className="text-[#909090]">
                                                {items.teama.short_name}
                                              </span>
                                            </div>
                                            <p>{items.teama.scores}</p>
                                          </div>
                                        </Link>
                                      </td>
                                      <td className="md:px-4 py-2 font-medium text-[#6A7586]">
                                        VS
                                      </td>
                                      <td className="md:px-4 py-2">
                                        <Link href="#">
                                          <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                            <p>{items.teamb.scores}</p>
                                            <div className="flex items-center space-x-1">
                                              <span className="text-[#909090]">
                                                {items.teamb.short_name}
                                              </span>
                                              <Image
                                                src={items.teamb.logo_url}
                                                className="h-[24px]"
                                                width={25}
                                                height={25}
                                                alt={items.teamb.short_name}
                                              />
                                            </div>
                                          </div>
                                        </Link>
                                      </td>
                                      <td className="md:px-4 py-2">
                                        <div className="text-right leading-6">
                                          <p className="font-medium">
                                            {items.subtitle}
                                          </p>
                                          <p className="text-[#909090] font-normal">
                                            {items.short_title}
                                          </p>
                                        </div>
                                      </td>
                                      <td className="px-0 pr-0 py-1 text-[#2F335C]">
                                        <div className="text-center">
                                          {items.winning_team_id ===
                                          teama_id ? (
                                            <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                              W
                                            </span>
                                          ) : (
                                            <span className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded">
                                              L
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {/* responsive teame data  */}
                            <div className="lg:hidden block">
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <Link href="#">
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/18.png"
                                          className="h-[18px] rounded-full"
                                          width={25}
                                          height={25}
                                          alt="aus"
                                        />
                                        <span className="text-[#909090]">
                                          AUS
                                        </span>
                                      </div>
                                      <p>274/10 &amp; 170/10</p>
                                    </div>
                                  </Link>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>274/10 &amp; 170/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/18.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        AUS
                                      </span>
                                    </div>
                                    <p>540/10 &amp; 220/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>140/10 &amp; 420/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded">
                                        L
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/19.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        PAK
                                      </span>
                                    </div>
                                    <p>274/10 &amp; 170/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>250/10 &amp; 160/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded">
                                        L
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between py-4 items-center px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/19.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        PAK
                                      </span>
                                    </div>
                                    <p>274/10 &amp; 170/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>250/10 &amp; 160/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/19.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        PAK
                                      </span>
                                    </div>
                                    <p>274/10 &amp; 170/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>250/10 &amp; 160/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/19.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        PAK
                                      </span>
                                    </div>
                                    <p>274/10 &amp; 170/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>250/10 &amp; 160/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="performance-section">
                        <div className="mt-6">
                          <div
                            className="flex items-center justify-between my-3"
                            onClick={() => handleToggle(2)}
                          >
                            <Link href="">
                              <div className="flex items-center space-x-3">
                                <div>
                                  <Image
                                    src={matchData?.match_info?.teamb?.logo_url}
                                    width={25}
                                    height={25}
                                    alt={matchData?.match_info?.teamb?.name}
                                    className="h-[25px]"
                                  />
                                </div>
                                <h3 className="text-1xl font-medium">
                                  {matchData?.match_info?.teamb?.name}
                                </h3>
                              </div>
                            </Link>
                            <div>
                              <div className="ml-auto flex gap-1 items-center">
                                {matchlistB
                                  .slice(0, 5)
                                  .map((items: {
                                      match_id: number; winning_team_id:any; 
}) =>
                                    items.winning_team_id === teamb_id ? (
                                      <span  key={items.match_id} className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    ) : (
                                      <span key={items.match_id} className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded">
                                        L
                                      </span>
                                    )
                                  )}
                                <span>
                                  <button
                                    className={`transform transition-transform ${
                                      openHeading === 2
                                        ? "rotate-180"
                                        : "rotate-0"
                                    }`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-5 h-5 text-gray-600"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 12l-7.5 7.5L4.5 12"
                                      />
                                    </svg>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="border-t-[1px] border-[#E4E9F0]" />
                        </div>
                        {openHeading === 2 && (
                          <div className="md:px-3 open-Performance-data">
                            {/* full screen teame data */}
                            <div className="overflow-x-auto lg:block hidden">
                              <table className="w-full text-left rtl:text-right">
                                <tbody>
                                {matchlistB.slice(0, 5).map((items:any, index:number) => (
                                  <tr className="whitespace-nowrap bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[13px]" key={index}>
                                    <td className="px-4 pl-0 py-1 ">
                                      <Link href="#">
                                        <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                          <div className="flex items-center space-x-1">
                                            <Image
                                              src={items.teama.logo_url}
                                              className="h-[24px] rounded-full"
                                              width={25}
                                              height={25}
                                              alt={items.teama.short_name}
                                            />
                                            <span className="text-[#909090]">
                                            {items.teama.short_name}
                                            </span>
                                          </div>
                                          <p>{items.teama.scores}</p>
                                        </div>
                                      </Link>
                                    </td>
                                    <td className="md:px-4 py-2 font-medium text-[#6A7586]">
                                      VS
                                    </td>
                                    <td className="md:px-4 py-2">
                                      <Link href="#">
                                        <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                          <p>{items.teamb.scores}</p>
                                          <div className="flex items-center space-x-1">
                                            <span className="text-[#909090]">
                                            {items.teamb.short_name}
                                            </span>
                                            <Image
                                              src={items.teamb.logo_url}
                                              className="h-[24px]"
                                              width={25}
                                              height={25}
                                              alt={items.teamb.short_name}
                                            />
                                          </div>
                                        </div>
                                      </Link>
                                    </td>
                                    <td className="md:px-4 py-2">
                                      <div className="text-right leading-6">
                                        <p className="font-medium">{items.subtitle}</p>
                                        <p className="text-[#909090] font-normal">
                                        {items.short_title}
                                        </p>
                                      </div>
                                    </td>
                                    <td className="px-0 pr-0 py-1 text-[#2F335C]">
                                      <div className="text-center">
                                      {items.winning_team_id ===
                                          teamb_id ? (
                                            <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                              W
                                            </span>
                                          ) : (
                                            <span className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded">
                                              L
                                            </span>
                                          )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                                  
                                </tbody>
                              </table>
                            </div>
                            {/* responsive teame data  */}
                            <div className="lg:hidden block">
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <Link href="#">
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/18.png"
                                          className="h-[18px] rounded-full"
                                          width={25}
                                          height={25}
                                          alt="aus"
                                        />
                                        <span className="text-[#909090]">
                                          AUS
                                        </span>
                                      </div>
                                      <p>274/10 &amp; 170/10</p>
                                    </div>
                                  </Link>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>274/10 &amp; 170/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/18.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        AUS
                                      </span>
                                    </div>
                                    <p>540/10 &amp; 220/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>140/10 &amp; 420/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded">
                                        L
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/19.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        PAK
                                      </span>
                                    </div>
                                    <p>274/10 &amp; 170/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>250/10 &amp; 160/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded">
                                        L
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between py-4 items-center px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/19.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        PAK
                                      </span>
                                    </div>
                                    <p>274/10 &amp; 170/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>250/10 &amp; 160/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/19.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        PAK
                                      </span>
                                    </div>
                                    <p>274/10 &amp; 170/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>250/10 &amp; 160/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center py-4 px-2 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                <div className="">
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Image
                                        src="/assets/img/flag/19.png"
                                        className="h-[18px] rounded-full"
                                        width={25}
                                        height={25}
                                        alt="aus"
                                      />
                                      <span className="text-[#909090]">
                                        PAK
                                      </span>
                                    </div>
                                    <p>274/10 &amp; 170/10</p>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-1">
                                        <Image
                                          src="/assets/img/flag/17.png"
                                          className="h-[18px]"
                                          width={25}
                                          height={25}
                                          alt="ind"
                                        />
                                        <span className="text-[#909090]">
                                          IND
                                        </span>
                                      </div>
                                      <p>250/10 &amp; 160/10</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:block h-[35px] border-l-[1px] border-[#d0d3d7]"></div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right leading-6">
                                    <p className="font-medium">2nd TEST</p>
                                    <p className="text-[#909090] font-normal">
                                      AUS VS IND 2024
                                    </p>
                                  </div>
                                  <div>
                                    <div className="text-center">
                                      <span className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded">
                                        W
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-[#ffffff] my-4 p-4">
                  <div key="mypage">
                    <h3 className="text-1xl font-semibold pl-[7px] border-l-[3px] mb-3 border-[#229ED3]">
                      Head To Head (Last 10 matches)
                    </h3>
                    <div className="border-t-[1px] border-[#E4E9F0]" />
                    <div className="py-4 text-1xl flex justify-between items-center">
                      <Link href="">
                        <div className="font-bold uppercase flex items-center">
                          <Image
                            className="h-[30px]"
                            src={matchData?.match_info?.teama?.logo_url}
                            width={30}
                            height={30}
                            alt={matchData?.match_info?.teama?.short_name}
                          />
                          <p className="mx-2 font-semibold uppercase">
                            {matchData?.match_info?.teama?.short_name}
                          </p>
                        </div>
                      </Link>
                      <div className=" font-normal text-center">
                        <p className="text-[#D28505] text-[17px] font-semibold">
                          {teamaWinMatch}{" "}
                          <span className="text-[#009900]">
                            - {teambWinMatch}
                          </span>
                        </p>
                      </div>
                      <Link href="">
                        <div className="font-bold uppercase flex items-center">
                          <p className="mx-2 font-semibold uppercase">
                            {matchData?.match_info?.teamb?.short_name}
                          </p>
                          <Image
                            className="h-[30px]"
                            src={matchData?.match_info?.teamb?.logo_url}
                            width={30}
                            height={30}
                            alt={matchData?.match_info?.teamb?.short_name}
                          />
                        </div>
                      </Link>
                    </div>

                    <div className="border-t-[1px] border-[#E4E9F0]" />
                    {matchlistAB.slice(0, 5).map((items:any, index:number) => (
                      <div className="py-4 flex justify-between items-center" key={index}>
                        <Link href="">
                          <div className="font-medium  w-full">
                            <p className="mx-2 font-semibold uppercase">
                              {items.teama.short_name}
                            </p>
                            <p className="mx-2 font-medium uppercase text-[#586577]">
                              {items.teama.scores}
                            </p>
                          </div>
                        </Link>
                        <div className=" font-semibold text-center w-full">
                          <p className="text-[#3D4DCF]">{items.status_note}</p>
                          <p className="text-[#586577] font-medium">
                            {items.subtitle}, {items.short_title}
                          </p>
                        </div>
                        <Link href="">
                          <div className="font-medium text-right w-full">
                            <p className="mx-2 font-semibold uppercase">
                              {items.teamb.short_name}
                            </p>
                            <p className="mx-2 font-medium uppercase text-[#586577]">
                              {items.teamb.scores}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-[#ffffff] my-4 p-4">
                  <div className="cust-box-click-container">
                    <div className="md:flex justify-between items-center  mb-3">
                      <h3 className="text-1xl font-semibold pl-[7px] border-l-[3px] border-[#229ED3]">
                        Team Comparison (Last 10 matches)
                      </h3>
                      <div className="flex items-center md:justify-center justify-end md:mt-0 mt-4">
                        <button
                          onClick={(e) =>
                            handleProbabilityTab(e, "cust-box-click-firview")
                          }
                          className={` cust-box-click-button font-medium px-5 py-1 rounded-full ${
                            activeTab === "cust-box-click-firview"
                              ? "bg-[#081736] text-white"
                              : "bg-[#ffffff] text-[#6A7586]"
                          }`}
                        >
                          <span>Overall</span>
                        </button>

                        <button
                          onClick={(e) =>
                            handleProbabilityTab(e, "cust-box-click-oddsview")
                          }
                          className={` cust-box-click-button font-medium px-5 py-1 rounded-full ${
                            activeTab === "cust-box-click-oddsview"
                              ? "bg-[#081736] text-white"
                              : "bg-[#ffffff] text-[#6A7586]"
                          }`}
                        >
                          <span>On Venue</span>
                        </button>
                      </div>
                    </div>

                    <div className="border-t-[1px] border-[#E4E9F0]" />

                    <div>
                      <div
                        className={`cust-box-click-content cust-box-click-firview mt-4 ${
                          activeTab === "cust-box-click-firview" ? "" : "hidden"
                        }`}
                      >
                        <div className="cust-box-click-content cust-box-click-overall1 mt-4">
                          <div>
                            <div className="py-4 flex justify-between items-center">
                              <Link href="">
                                <div className="font-bold flex items-center">
                                  <Image
                                    className="h-[30px]"
                                    src={matchData?.match_info?.teama?.logo_url}
                                    width={30}
                                    height={30}
                                    alt={
                                      matchData?.match_info?.teama?.short_name
                                    }
                                  />
                                  <p className="mx-2 text-1xl font-semibold">
                                    {matchData?.match_info?.teama?.short_name}
                                    <span className="text-[13px] text-[#9094b6] font-medium block">
                                      vs all teams
                                    </span>
                                  </p>
                                </div>
                              </Link>
                              <Link href="">
                                <div className="font-bold flex items-center">
                                  <p className="mx-2 text-1xl font-semibold text-right">
                                    {matchData?.match_info?.teamb?.short_name}
                                    <span className="text-[13px] text-[#9094b6] font-medium block">
                                      vs all teams
                                    </span>
                                  </p>
                                  <Image
                                    className="h-[30px]"
                                    src={matchData?.match_info?.teamb?.logo_url}
                                    width={30}
                                    height={30}
                                    alt={
                                      matchData?.match_info?.teamb?.short_name
                                    }
                                  />
                                </div>
                              </Link>
                            </div>
                            <div className="border-t-[1px] border-[#E4E9F0]" />
                            <div className="py-2 flex justify-between items-center">
                              <div className="font-medium text-[#586577] w-full">
                                <p className="mx-2 font-semibold uppercase">
                                  {matchPlayed}
                                </p>
                              </div>
                              <div className=" font-semibold text-center w-full">
                                <p className="text-[#73758B] font-normal">
                                  Matches Played
                                </p>
                              </div>
                              <div className="font-medium text-right w-full">
                                <p className="text-[#586577] font-medium">
                                  {matchPlayed}
                                </p>
                              </div>
                            </div>
                            <div className="border-t-[1px] border-[#E4E9F0]" />
                            <div className="py-2 flex justify-between items-center">
                              <div className="font-medium text-[#586577] w-full">
                                <p className="mx-2 font-semibold text-[#439F76] uppercase">
                                  {teamaWinper}%
                                </p>
                              </div>
                              <div className=" font-semibold text-center w-full">
                                <p className="text-[#73758B] font-normal">
                                  Win
                                </p>
                              </div>
                              <div className="font-medium text-right w-full">
                                <p className="text-[#586577] font-medium">
                                  {teambWinper}%
                                </p>
                              </div>
                            </div>
                            <div className="border-t-[1px] border-[#E4E9F0]" />
                            <div className="py-2 flex justify-between items-center">
                              <div className="font-medium text-[#586577] w-full">
                                <p className="mx-2 font-semibold uppercase text-[#439F76]">
                                  {averageScoreTeamA}
                                </p>
                              </div>
                              <div className=" font-semibold text-center w-full">
                                <p className="text-[#73758B] font-normal">
                                  Avg Score
                                </p>
                              </div>
                              <div className="font-medium text-right w-full">
                                <p className="text-[#586577] font-medium">
                                  {averageScoreTeamB}
                                </p>
                              </div>
                            </div>
                            <div className="border-t-[1px] border-[#E4E9F0]" />
                            <div className="py-2 flex justify-between items-center">
                              <div className="font-medium text-[#586577] w-full">
                                <p className="mx-2 font-semibold uppercase text-[#439F76]">
                                  {highestScoreTeamA}
                                </p>
                              </div>
                              <div className=" font-semibold text-center w-full">
                                <p className="text-[#73758B] font-normal">
                                  Highest Score
                                </p>
                              </div>
                              <div className="font-medium text-right w-full">
                                <p className="text-[#586577] font-medium">
                                  {highestScoreTeamB}
                                </p>
                              </div>
                            </div>
                            <div className="border-t-[1px] border-[#E4E9F0]" />
                            <div className="py-2 flex justify-between items-center">
                              <div className="font-medium text-[#586577] w-full">
                                <p className="mx-2 font-semibold uppercase text-[#E14848]">
                                  {lowestScoreTeamA}
                                </p>
                              </div>
                              <div className=" font-semibold text-center w-full">
                                <p className="text-[#73758B] font-normal">
                                  Lowest Score
                                </p>
                              </div>
                              <div className="font-medium text-right w-full">
                                <p className="text-[#586577] font-medium">
                                  {lowestScoreTeamB}
                                </p>
                              </div>
                            </div>
                            <div className="border-t-[1px] border-[#E4E9F0]" />
                          </div>
                        </div>
                      </div>

                      <div
                        className={`cust-box-click-content cust-box-click-oddsview mt-4 ${
                          activeTab === "cust-box-click-oddsview"
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <div className="cust-box-click-content cust-box-click-overall1 mt-4">
                          <div className="cust-box-click-content cust-box-click-overall1 mt-4">
                            <div>
                              <div className="py-4 flex justify-between items-center">
                                <Link href="">
                                  <div className="font-bold flex items-center">
                                    <Image
                                      className="h-[30px]"
                                      src={
                                        matchData?.match_info?.teama?.logo_url
                                      }
                                      width={30}
                                      height={30}
                                      alt={
                                        matchData?.match_info?.teama?.short_name
                                      }
                                    />
                                    <p className="mx-2 text-1xl font-semibold">
                                      {matchData?.match_info?.teama?.short_name}
                                      <span className="text-[13px] text-[#9094b6] font-medium block">
                                        vs all teams
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                                <Link href="">
                                  <div className="font-bold flex items-center">
                                    <p className="mx-2 text-1xl font-semibold text-right">
                                      {matchData?.match_info?.teamb?.short_name}
                                      <span className="text-[13px] text-[#9094b6] font-medium block">
                                        vs all teams
                                      </span>
                                    </p>
                                    <Image
                                      className="h-[30px]"
                                      src={
                                        matchData?.match_info?.teamb?.logo_url
                                      }
                                      width={30}
                                      height={30}
                                      alt={
                                        matchData?.match_info?.teamb?.short_name
                                      }
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div className="border-t-[1px] border-[#E4E9F0]" />
                              <div className="py-2 flex justify-between items-center">
                                <div className="font-medium text-[#586577] w-full">
                                  <p className="mx-2 font-semibold uppercase">
                                    {sameVenuematchPlayed}
                                  </p>
                                </div>
                                <div className=" font-semibold text-center w-full">
                                  <p className="text-[#73758B] font-normal">
                                    Matches Played
                                  </p>
                                </div>
                                <div className="font-medium text-right w-full">
                                  <p className="text-[#586577] font-medium">
                                    {sameVenuematchPlayed}
                                  </p>
                                </div>
                              </div>
                              <div className="border-t-[1px] border-[#E4E9F0]" />
                              <div className="py-2 flex justify-between items-center">
                                <div className="font-medium text-[#586577] w-full">
                                  <p className="mx-2 font-semibold text-[#439F76] uppercase">
                                    {sameVenueteamaWinper}%
                                  </p>
                                </div>
                                <div className=" font-semibold text-center w-full">
                                  <p className="text-[#73758B] font-normal">
                                    Win
                                  </p>
                                </div>
                                <div className="font-medium text-right w-full">
                                  <p className="text-[#586577] font-medium">
                                    {sameVenueteambWinper}%
                                  </p>
                                </div>
                              </div>
                              <div className="border-t-[1px] border-[#E4E9F0]" />
                              <div className="py-2 flex justify-between items-center">
                                <div className="font-medium text-[#586577] w-full">
                                  <p className="mx-2 font-semibold uppercase text-[#439F76]">
                                    {sameVenueaverageScoreTeamA}
                                  </p>
                                </div>
                                <div className=" font-semibold text-center w-full">
                                  <p className="text-[#73758B] font-normal">
                                    Avg Score
                                  </p>
                                </div>
                                <div className="font-medium text-right w-full">
                                  <p className="text-[#586577] font-medium">
                                    {sameVenueaverageScoreTeamB}
                                  </p>
                                </div>
                              </div>
                              <div className="border-t-[1px] border-[#E4E9F0]" />
                              <div className="py-2 flex justify-between items-center">
                                <div className="font-medium text-[#586577] w-full">
                                  <p className="mx-2 font-semibold uppercase text-[#439F76]">
                                    {sameVenuehighestScoreTeamA}
                                  </p>
                                </div>
                                <div className=" font-semibold text-center w-full">
                                  <p className="text-[#73758B] font-normal">
                                    Highest Score
                                  </p>
                                </div>
                                <div className="font-medium text-right w-full">
                                  <p className="text-[#586577] font-medium">
                                    {sameVenuehighestScoreTeamB}
                                  </p>
                                </div>
                              </div>
                              <div className="border-t-[1px] border-[#E4E9F0]" />
                              <div className="py-2 flex justify-between items-center">
                                <div className="font-medium text-[#586577] w-full">
                                  <p className="mx-2 font-semibold uppercase text-[#E14848]">
                                    {sameVenuelowestScoreTeamA}
                                  </p>
                                </div>
                                <div className=" font-semibold text-center w-full">
                                  <p className="text-[#73758B] font-normal">
                                    Lowest Score
                                  </p>
                                </div>
                                <div className="font-medium text-right w-full">
                                  <p className="text-[#586577] font-medium">
                                    {sameVenuelowestScoreTeamB}
                                  </p>
                                </div>
                              </div>
                              <div className="border-t-[1px] border-[#E4E9F0]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-[#ffffff] my-4 p-4">
                  <div className="relative">
                    <h3 className="text-1xl font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                      Weather Condition
                    </h3>
                    <div className="border-t-[1px] border-[#E4E9F0]" />
                    <div className="flex lg:grid md:grid-cols-12 justify-between md:gap-4 items-center py-3">
                      <div className="col-span-3">
                        <div>
                          <Image
                            src="/assets/img/weather.png"
                            className="md:h-[75px] h-[60px]"
                            width={75}
                            height={75}
                            alt=""
                          />
                          <p className="text-1xl ml-2 font-semibold">Sunny</p>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="font-normal text-[#616161] mb-2">
                          <p className="lg:relative lg:top-0 lg:right-0 lg:text-left lg:text-[13px] absolute top-[4px] right-0 text-right text-[10px]">
                            <span className="lg:block"> Last Updated: </span>
                            12:00AM / 18th Nov 2024
                          </p>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <p className="font-bold	md:text-[28px] text-[24px]">
                          {matchData?.match_info?.weather?.temp}°C
                        </p>
                      </div>
                      <div className="col-span-3 text-[#616161] md:text-[13px] text-[11px]">
                        <div className="flex justify-between pb-1 items-center">
                          <div className="flex space-x-2 items-center">
                            <Image
                              src="/assets/img/w-1.png"
                              className="h-[16px]"
                              width={15}
                              height={15}
                              alt=""
                            />
                            <p className="">Humidity:</p>
                          </div>
                          <div>
                            <span className="text-[#FEA126]">
                              {matchData?.match_info?.weather?.humidity}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between pb-1 space-x-2 items-center">
                          <div className="flex space-x-2 items-center">
                            <Image
                              src="/assets/img/w-2.png"
                              className="h-[16px]"
                              width={15}
                              height={15}
                              alt=""
                            />
                            <p className="">Rain chance: </p>
                          </div>
                          <div>
                            <span className="text-[#16A1EF]">40%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2 items-center">
                            <Image
                              src="/assets/img/wind.png"
                              className="h-[16px]"
                              width={15}
                              height={15}
                              alt=""
                            />
                            <p className="">Wind:</p>
                          </div>
                          <div>
                            <span className="text-[#1565c0]">
                              {matchData?.match_info?.weather?.wind_speed}km/h
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t-[1px] border-[#E4E9F0]" />
                    <div className="flex space-x-2 pt-3 items-center">
                      <Image
                        src="/assets/img/map.png"
                        width={15}
                        height={15}
                        alt="location"
                      />
                      <p className="text-[#3E436D]">
                        {matchData?.match_info?.venue?.name},{" "}
                        {matchData?.match_info?.venue?.location},{" "}
                        {matchData?.match_info?.venue?.country}.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-[#ffffff] my-4 p-4">
                  <h3 className="text-1xl font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                    Venue Stats
                  </h3>
                  <div className="border-t-[1px] border-[#E4E9F0]" />
                  {/* full screen view */}
                  <div className="lg:flex hidden justify-between items-center py-4">
                    <div className="col-span-1 relative">
                      <Image
                        src="/assets/img/ring.png"
                        className="h-[90px]"
                        width={90}
                        height={90}
                        alt=""
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="font-bold text-[18px]">7</p>
                        <p className="text-[10px]">Matches</p>
                      </div>
                    </div>
                    <div className="col-span-1 relative">
                      <div className="pb-5">
                        <p className="text-[#13b76dbd] font-semibold">43%</p>
                        <p className="text-[13px] text-[#3E436D]">
                          Win Bat first{" "}
                        </p>
                      </div>
                      <div className="">
                        <p className="text-[#B7132B] font-semibold">29%</p>
                        <p className="text-[13px] text-[#3E436D]">
                          Win Bat first{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 relative">
                      <div className="pb-5">
                        <p className="font-semibold">398</p>
                        <p className="text-[13px] text-[#3E436D]">
                          Avg 1st Innings
                        </p>
                      </div>
                      <div className="">
                        <p className="font-semibold">405</p>
                        <p className="text-[13px] text-[#3E436D]">
                          Avg 2st Innings
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 relative">
                      <div className="pb-5">
                        <p className="font-semibold">222</p>
                        <p className="text-[13px] text-[#3E436D]">
                          Avg 3st Innings
                        </p>
                      </div>
                      <div className="">
                        <p>43%</p>
                        <p className="text-[13px] text-[#3E436D]">
                          Avg 4st Innings
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 relative">
                      <p className="text-[13px] text-center font-semibold  pb-5">
                        Highest Total
                      </p>
                      <p className="text-[13px] text-center font-semibold ">
                        Lowest Total
                      </p>
                    </div>
                    <div className="col-span-1 relative">
                      <p className="text-[13px] text-center text-[#3E436D] pb-5">
                        by ENG vs IND
                      </p>
                      <p className="text-[13px] text-center text-[#3E436D]">
                        by AUS vs IND
                      </p>
                    </div>
                    <div className="col-span-1 relative text-center">
                      <p className="font-bold pb-5">759-7</p>
                      <p className="font-bold">50-2</p>
                    </div>
                  </div>
                  {/* responsive screen view */}
                  <div className="lg:hidden">
                    <div className="flex items-center justify-around my-2 py-3 rounded-lg bg-[#f7faff]">
                      <div className="col-span-1 relative">
                        <div
                          className="flex justify-center items-center w-[81px] h-[81px] rounded-full"
                          style={{
                            background:
                              "conic-gradient(#3e436d 0 29%, #b7132b 0 50%, #13b76dbd 0 100%)",
                          }}
                        >
                          <div className="flex flex-col items-center w-[65px] h-[64px] p-4 rounded-full bg-white">
                            <p className="font-bold text-[18px]">7</p>
                            <p className="text-[10px]">Matches</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 relative">
                        <div className="flex items-center space-x-8 mb-4">
                          <p className="text-[13px] text-[#3E436D]">
                            Win Bat first{" "}
                          </p>
                          <p className="text-[#13b76dbd] font-semibold text-1xl">
                            43%
                          </p>
                        </div>
                        <div className="flex items-center space-x-8">
                          <p className="text-[13px] text-[#3E436D]">
                            Win Bat first{" "}
                          </p>
                          <p className="text-[#B7132B] font-semibold text-1xl">
                            29%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 mb-3 pb-3 border-b border-[#e4e9f0]">
                      <div className="flex flex-col items-start space-y-1">
                        <p className="text-[13px] text-[#3E436D]">
                          Avg 1st Innings
                        </p>
                        <p className="font-medium text-1xl">398</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <p className="text-[13px] text-[#3E436D]">
                          Avg 2st Innings
                        </p>
                        <p className="font-medium text-1xl">405</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-3 mb-3 border-b border-[#e4e9f0]">
                      <div className="flex flex-col items-start space-y-1">
                        <p className="text-[13px] text-[#3E436D]">
                          Avg 3st Innings
                        </p>
                        <p className="font-medium text-1xl">222</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <p className="text-[13px] text-[#3E436D]">
                          Avg 4st Innings
                        </p>
                        <p className="font-medium text-1xl">43%</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end pb-3 mb-3 border-b border-[#e4e9f0]">
                      <div className="flex flex-col items-start space-y-1">
                        <p className="text-[13px] text-[#3E436D]">Highest</p>
                        <p className="font-medium text-1xl">
                          759-7{" "}
                          <span className="text-[13px] text-[#3E436D]">
                            by ENG
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <p className="text-[13px] text-[#3E436D]">ENG vs IND</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end pb-3 mb-3 border-b border-[#e4e9f0]">
                      <div className="flex flex-col items-start space-y-1">
                        <p className="text-[13px] text-[#3E436D]">Lowest</p>
                        <p className="font-medium text-1xl">
                          50-2{" "}
                          <span className="text-[13px] text-[#3E436D]">
                            by AUS
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <p className="text-[13px] text-[#3E436D]">AUS vs IND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-[#ffffff] my-4 md:hidden">
                  <div className="p-4">
                    <div className="flex space-x-2">
                      <div className="border-l-[3px] border-[#229ED3] h-[19px]" />
                      <h3 className="text-1xl font-semibold mb-3">
                        Pace vs Spin on Venue{" "}
                        <span className="text-[#909090]">
                          {" "}
                          &nbsp;(Last 10 matches){" "}
                        </span>
                      </h3>
                    </div>
                    <div className="w-full">
                      <div className="bg-[#B7132B] h-[4px] mr-2 mb-2">
                        <div
                          className="bg-[#13b76dbd] h-[4px]"
                          style={{ width: "40%" }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className=" text-gray-500">
                          {" "}
                          Pace:{" "}
                          <span className="text-[#13b76dbd] text-[15px] font-semibold">
                            40%{" "}
                          </span>
                        </p>
                        <p className="text-gray-500 ">
                          {" "}
                          Spin:{" "}
                          <span className="text-[#B7132B] text-[15px] font-semibold">
                            60%{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-[#ffffff] my-4 p-4">
                  <h3 className="text-1xl font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                    Umpires
                  </h3>
                  <div className="border-t-[1px] border-[#E4E9F0]" />
                  <div className="py-2 flex justify-between items-center">
                    <div className="">
                      <p className="mx-2 font-medium">On-field Umpire :</p>
                    </div>
                    <div className="">
                      <p className="mx-2 text-[#586577] font-medium ">
                        {matchData.match_info.umpires}
                      </p>
                    </div>
                  </div>
                  {/* <div className="border-t-[1px] border-[#E4E9F0]" />
                  <div className="py-2 flex justify-between items-center">
                    <div className="">
                      <p className="mx-2 font-medium">Third Umpire :</p>
                    </div>
                    <div className="">
                      <p className="mx-2 text-[#586577] font-medium ">
                        Sue Redfern
                      </p>
                    </div>
                  </div> */}
                  <div className="border-t-[1px] border-[#E4E9F0]" />
                  <div className="py-2 pb-0 flex justify-between items-center">
                    <div className="">
                      <p className="mx-2 font-medium">Referee :</p>
                    </div>
                    <div className="">
                      <p className="mx-2 text-[#586577] font-medium ">
                        {matchData.match_info.referee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 md:col-span-5">
                <div className="rounded-lg bg-[#ffffff]">
                  <div className="p-4 cust-box-click-container">
                    <h3 className="text-1xl font-semibold pl-[7px] mb-3 border-l-[3px] border-[#229ED3]">
                      Playing XI
                    </h3>
                    <div className="border-t-[1px] border-[#E4E9F0]" />
                    <div className="flex items-center justify-around py-4">








                    <button
                          onClick={(e) =>
                            handlePlaying11Tab(e, "cust-box-click-playing11")
                          }
                          className={` cust-box-click-button font-medium px-5 py-1 rounded-full ${
                            playing11Tab === "cust-box-click-playing11"
                              ? "bg-[#081736] text-white"
                              : "bg-[#ffffff] text-[#6A7586]"
                          }`}
                        >
                     
                        <span>{matchData?.match_info?.teama.name}</span>
                      </button>
                      
                      <button
                          onClick={(e) =>
                            handlePlaying11Tab(e, "cust-box-click-playing12")
                          }
                          className={` cust-box-click-button font-medium px-5 py-1 rounded-full ${
                            playing11Tab === "cust-box-click-playing12"
                              ? "bg-[#081736] text-white"
                              : "bg-[#ffffff] text-[#6A7586]"
                          }`}
                        >
                          <span>{matchData?.match_info?.teamb.name}</span>
                        </button>
                     
                    </div>
                    <div className="border-t-[1px] border-[#E4E9F0]" />

                    

                    <div className={`cust-box-click-content cust-box-click-playing11 mt-4 ${
                          playing11Tab === "cust-box-click-playing11" ? "" : "hidden"
                        }`}>
                      <div>
                        {teama11Players.map((player) => (
                          <Link href="/profile"  key={player.player_id}>
                            <div className="flex items-center space-x-3 py-3 border-b-[1px] border-border-gray-700">
                              <div>
                                <Image
                                  src="/assets/img/player/1.png"
                                  width={40}
                                  height={40}
                                  alt={player.name}
                                />
                              </div>
                              <div className="font-medium">
                                <h2 className="text-[15px]">
                                  {" "}
                                  {player.name}{" "}
                                  {player.role_str !== ""
                                    ? player.role_str
                                    : ""}{" "}
                                </h2>
                                <p className="text-[#909090] font-normal">
                                  {player.role}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>


                    <div className={`cust-box-click-content cust-box-click-playing12 mt-4 ${
                          playing11Tab === "cust-box-click-playing12" ? "" : "hidden"
                        }`}>
                      <div>
                        {teamb11Players.map((player) => (
                          <Link href="/profile"  key={player.player_id}>
                            <div className="flex items-center space-x-3 py-3 border-b-[1px] border-border-gray-700">
                              <div>
                                <Image
                                  src="/assets/img/player/1.png"
                                  width={40}
                                  height={40}
                                  alt={player.name}
                                />
                              </div>
                              <div className="font-medium">
                                <h2 className="text-[15px]">
                                  {" "}
                                  {player.name}{" "}
                                  {player.role_str !== ""
                                    ? player.role_str
                                    : ""}{" "}
                                </h2>
                                <p className="text-[#909090] font-normal">
                                  {player.role}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>


                  </div>
                </div>
                <div className="rounded-lg bg-[#ffffff] my-4 hidden md:block">
                  <div className="p-4">
                    <div className="flex space-x-2">
                      <div className="border-l-[3px] border-[#229ED3] h-[19px]" />
                      <h3 className="text-1xl font-semibold mb-3">
                        Pace vs Spin on Venue{" "}
                        <span className="text-[#909090]">
                          {" "}
                          &nbsp;(Last 10 matches){" "}
                        </span>
                      </h3>
                    </div>
                    <div className="w-full">
                      <div className="bg-[#B7132B] h-[4px] mr-2 mb-2">
                        <div
                          className="bg-[#13b76dbd] h-[4px]"
                          style={{ width: "40%" }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className=" text-gray-500">
                          {" "}
                          Pace:{" "}
                          <span className="text-[#13b76dbd] text-[15px] font-semibold">
                            40%{" "}
                          </span>
                        </p>
                        <p className="text-gray-500 ">
                          {" "}
                          Spin:{" "}
                          <span className="text-[#B7132B] text-[15px] font-semibold">
                            60%{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
