"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlStringEncode} from "@/utils/utility";

interface Squad {
  urlString: string;
  teamPlayers: any;
  seriesInfo: any;
}
export default function Squad({ urlString, teamPlayers, seriesInfo }: Squad) {
  const [activeTab, setActiveTab] = useState("tab0");
  const seriesName = seriesInfo?.abbr;
  const seriesFormat = seriesInfo?.game_format;
console.log("seriesFormat", seriesFormat);
  return (
    <section className="lg:w-[1000px] mx-auto md:mb-0 mb-4 px-2 lg:px-0">
      <div id="tabs" className="my-4">
        <div className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto">
          <Link href={urlString}>
            <button className="font-medium py-2 px-3 whitespace-nowrap ">
              Overview
            </button>
          </Link>
          <Link href={urlString + "/schedule-results"}>
            <button className="font-medium py-2 px-3 whitespace-nowrap ">
              Schedule & Results
            </button>
          </Link>
          <Link href={urlString + "/squads"}>
            <button className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white rounded-md">
              Squads
            </button>
          </Link>
          <Link href={urlString + "/points-table"}>
            <button className="font-medium py-2 px-3 whitespace-nowrap">
              Points Table
            </button>
          </Link>
          <Link href={urlString + "/news"}>
            <button className="font-medium py-2 px-3 whitespace-nowrap">
              News
            </button>
          </Link>
          <Link href={urlString + "/stats"}>
            <button className="font-medium py-2 px-3 whitespace-nowrap">
              Stats
            </button>
          </Link>
        </div>
      </div>

      <div id="squads" className="tab-content">
        <div className="py-2 mb-2">
          <h3 className="text-1xl font-semibold pl-[3px] border-l-[3px] border-[#1a80f8]">
            {seriesName} Squads
          </h3>
        </div>
        <div className="md:grid grid-cols-12 gap-4">
          <div className="lg:col-span-4 md:col-span-5">
            <div className="rounded-lg p-2 mb-4 bg-[#ffffff]">
              <div id="team-buttons" className="">
                {teamPlayers?.map((teamslist: any, index: number) => (
                  <button
                    key={index}
                    className={`team-btn border-b px-2 mb-1 py-3 w-full font-medium flex items-center ${
                      activeTab === "tab"+index
                        ? "text-[#394351] bg-[#eaeaea] rounded-md"
                        : "text-[#1c1c1c] bg-[#fcfcfc] rounded-md"
                    }`}
                    onClick={() => setActiveTab("tab" + index)}
                  >
                    <Image
                      src={teamslist?.team?.logo_url}
                      className="mr-3"
                      width={20}
                      height={20}
                      alt={teamslist?.team?.alt_name}
                    />
                    {teamslist?.team?.alt_name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 md:col-span-7">
          {teamPlayers?.map((teamslist: any, index: number) => (
            activeTab === "tab"+index && (
              <div id="south-team" className="team-content " key={index}>
                <div className="max-w-7xl mx-auto bg-white rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Image
                      src={teamslist?.team.logo_url}
                      width={45}
                      height={45}
                      alt={teamslist?.team.abbr}
                      className="h-[45px] rounded-full"
                    />
                    <h1 className="text-[16px] font-semibold text-gray-800">
                      {teamslist?.team.abbr}{" "}
                      <span className="text-gray-500">
                        ({teamslist?.players?.[seriesFormat].length} players)
                      </span>
                    </h1>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-1xl font-semibold pl-[5px] border-l-[3px] border-[#1a80f8] mb-4">
                        Batsman
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {teamslist?.players?.[seriesFormat].map((squads: any, index: number) => (
                            (squads.playing_role === 'bat' || squads.playing_role === 'wk') &&
                          <Link
                            href={
                              "/player/" +
                              urlStringEncode(squads?.short_name) +
                              "/" +
                              squads?.pid
                            }
                            key={index}
                          >
                            <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                              <div className="relative">
                                <Image
                                  src="/assets/img/player/g-7.png"
                                  width={80}
                                  height={80}
                                  alt={squads.short_name}
                                  className="w-16 h-16 mx-auto rounded-full mb-2"
                                />
                                <Image
                                  src="/assets/img/player/bat.png"
                                  className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                  width={27}
                                  height={27}
                                  alt={squads.short_name}
                                />
                              </div>
                              <h3 className="text-sm font-semibold text-blue-500 ">
                                {squads.name}{" "}
                                {squads.playing_role !== "" &&
                                squads.playing_role !== undefined ? (
                                  <span className="text-blue-500">
                                    {squads.short_name}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </h3>
                              <p className="text-xs text-gray-600">Batsman</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Bowler Section */}
                    <div>
                      <h2 className="text-1xl font-semibold pl-[5px] border-l-[3px] border-[#1a80f8] mb-4">
                        Bowler
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {teamslist?.players?.[seriesFormat].map((bowler: any, index: number) => (
                            bowler.playing_role === 'bowl' &&
                          <Link
                            href={
                              "/player/" +
                              urlStringEncode(bowler?.short_name) +
                              "/" +
                              bowler?.pid
                            }
                            key={index}
                          >
                            <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                              <div className="relative">
                                <Image
                                  src="/assets/img/player/g-11.png"
                                  width={80}
                                  height={80}
                                  alt={bowler.short_name}
                                  className="w-16 h-16 mx-auto rounded-full mb-2"
                                />
                                <Image
                                  src="/assets/img/player/ball.png"
                                  className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                  width={24}
                                  height={24}
                                  alt={bowler.short_name}
                                />
                              </div>
                              <h3 className="text-sm font-semibold text-gray-800">
                                {bowler.short_name}
                              </h3>
                              <p className="text-xs text-gray-600">Bowler</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* All-Rounder Section */}
                    <div>
                      <h2 className="text-1xl font-semibold pl-[5px] border-l-[3px] border-[#1a80f8] mb-4">
                        All-Rounder
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {teamslist?.players?.[seriesFormat].map((allrounder: any, index: number) => (
                        allrounder.playing_role === 'all' &&
                          <Link
                            href={
                              "/player/" +
                              urlStringEncode(allrounder?.short_name) +
                              "/" +
                              allrounder?.pid
                            }
                            key={index}
                          >
                            <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                              <div className="relative">
                                <Image
                                  src="/assets/img/player/g-15.png"
                                  width={80}
                                  height={80}
                                  alt={allrounder.short_name}
                                  className="w-16 h-16 mx-auto rounded-full mb-2"
                                />
                                <Image
                                  src="/assets/img/player/bat-ball.png"
                                  className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                  width={27}
                                  height={27}
                                  alt={allrounder.short_name}
                                />
                              </div>
                              <h3 className="text-sm font-semibold text-gray-800">
                                {allrounder.short_name}
                              </h3>
                              <p className="text-xs text-gray-600">
                                All-Rounder
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        ))}
          </div>
        </div>
      </div>
    </section>
  );
}
