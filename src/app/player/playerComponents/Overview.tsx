"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {   format  } from "date-fns";
import {getAgeDetails } from "@/utils/timerUtils";
import { urlStringEncode } from "@/utils/utility";

interface Overview {
  playerAdvanceStats: any | null;
  playerStats: any | null;
  urlString: string;
  ranking: any | null;
}
export default function Overview({playerAdvanceStats, playerStats, urlString, ranking}: Overview) {

  const profile = playerStats?.player;
  const playerBatting = playerStats?.batting ?? {};
  const playerBowling = playerStats?.bowling ?? {};
  const last10Match = playerAdvanceStats?.last10_matches ?? {};
  const teamsPlayedFor = playerAdvanceStats?.teams_played_for ?? [];
  const playerDebutData = playerAdvanceStats?.player?.debut_data ?? {};

  // Determine Player Role
  const playerRole =
    profile?.playing_role === "bat"
      ? "Batting"
      : profile?.playing_role === "bowl"
      ? "Bowler"
      : profile?.playing_role === "all"
      ? "All-Rounder"
      : "Unknown";

  // Player Rankings (Handles missing ranking data safely)
  let odiRank = "",
    testRank = "",
    t20Rank = "";
  const playerRank = ranking?.ranks ?? {};

  if (profile?.playing_role === "bat") {
    odiRank =
      playerRank?.batsmen?.odis?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
    testRank =
      playerRank?.batsmen?.tests?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
    t20Rank =
      playerRank?.batsmen?.t20s?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
  } else if (profile?.playing_role === "bowl") {
    odiRank =
      playerRank?.bowlers?.odis?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
    testRank =
      playerRank?.bowlers?.tests?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
    t20Rank =
      playerRank?.bowlers?.t20s?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
  } else if (profile?.playing_role === "all") {
    odiRank =
      playerRank?.["all-rounders"]?.odis?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
    testRank =
      playerRank?.["all-rounders"]?.tests?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
    t20Rank =
      playerRank?.["all-rounders"]?.t20s?.find(
        (item: { pid: number }) => Number(item.pid) === profile?.pid
      )?.rating ?? "";
  }

  // Convert Batting/Bowling Stats to Array
  const battingArray = Object.keys(playerBatting).map((key) => ({
    formatType: key.toUpperCase(),
    ...playerBatting[key],
  }));

  const bowlingArray = Object.keys(playerBowling).map((key) => ({
    formatType: key.toUpperCase(),
    ...playerBowling[key],
  }));

  // Career Tab Handling
  const [careerTab, setCareerTab] = useState("cust-box-click-batting");

  const handleCareerTabClick = (tab: string) => {
    setCareerTab(tab);
  };

  // Last 10 Match Stats (Handles undefined data safely)
  const slides =
    last10Match?.batting?.map((match: any, index: number) => ({
      id: index,
      text: `${match.runs}(${match.balls})`,
      match: match.match_title,
    })) ?? [];

  const slidesBol =
    last10Match?.bowling?.map((match: any, index: number) => ({
      id: index,
      text: `${match.runs}-${match.wickets}(${match.overs})`,
      match: match.match_title,
    })) ?? [];

  // console.log("Bowling Stats:", battingArray);

  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 3;
  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentIndex + visibleSlides < totalSlides) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  
  return (
    <section className="lg:w-[1000px] md:mx-auto my-5 mx-2">
      <div className="">

        <div id="tabs" className="my-4">
          <div className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto">
            <Link href={"/player/"+urlString}>
              <button className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white rounded-md"
              >
                Overview
              </button>
            </Link>
            <Link href={"/player/"+urlString+"/stats"}>
              <button className="font-medium py-2 px-3 whitespace-nowrap "
              >
                Stats
              </button>
            </Link>

            <Link href={"/player/"+urlString+"/news"}>
              <button
                className="font-medium py-2 px-3 whitespace-nowrap"
              >
                News
              </button>
            </Link>
            <Link href={"/player/"+urlString+"/photos"}>
              <button className="font-medium py-2 px-3 whitespace-nowrap"
              >
                Photos
              </button>
            </Link>
          </div>
        </div>

        <div id="tab-content">
          <div id="overview">
            <div className="md:grid grid-cols-12 gap-4">
              {/* Tabs */}
              <div className="lg:col-span-8 md:col-span-7">
                <div className="rounded-lg bg-white p-4 mb-4">
                  <h3 className="text-[15px] font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                    ICC Ranking
                  </h3>
                  <div className="border-t-[1px] border-[#E7F2F4]" />
                  <div className="grid md:grid-cols-1 grid-cols-1 gap-4 mt-4">
                    <div className="bg-[#f2f7ff] w-full  border-[1px] rounded-md">
                      <h6 className=" px-6 py-1 font-semibold rounded-t-md bg-[#c7dcff] text-[14px]">
                         {playerRole}
                      </h6>
                      <div className="flex font-semibold text-[#0F55A5] text-center px-6 justify-between space-x-4 my-2">
                        <p>
                          {testRank} <br /> <span className=""> TEST </span>
                        </p>
                        <div className="border-solid border-l-[1px] border-gray-400" />
                        <p>
                        {odiRank} <br /> <span className=""> ODI</span>
                        </p>
                        <div className="border-solid border-l-[1px] border-gray-400" />
                        <p>
                        {t20Rank} <br /> <span className=""> T20</span>
                        </p>
                      </div>
                    </div>
                    {/* <div className="bg-[#f2f7ff] w-full border-[1px] rounded-lg">
                      <h6 className="px-6 py-1 font-semibold rounded-t-md bg-[#c7dcff] text-[14px]">
                        Bowling
                      </h6>
                      <div className="flex px-6 font-semibold text-[#0F55A5] text-center justify-between space-x-4 mt-2">
                        <p>
                          154 <br /> <span className=""> TEST </span>
                        </p>
                        <div className="border-solid border-l-[1px] border-gray-400" />
                        <p>
                          328 <br /> <span className=""> ODI</span>
                        </p>
                        <div className="border-solid border-l-[1px] border-gray-400" />
                        <p>
                          799 <br /> <span className=""> T20</span>
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="rounded-lg p-4 bg-[#ffffff]">
                  <h3 className="text-[15px] font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                    Personal Information
                  </h3>
                  <div className="border-t-[1px] border-[#E7F2F4]" />
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 text-[13px]">
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Full Name
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                            {profile?.first_name}
                          </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Date of Birth
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                          {profile?.birthdate !== undefined && profile?.birthdate !== '' ? format(new Date(profile?.birthdate), "dd MMM yyyy") :""}
                          </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Age
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                            {profile?.birthdate !== undefined && profile?.birthdate !== '' ? getAgeDetails(profile?.birthdate) :""}
                          </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Nationality
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">{profile?.nationality}</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Birth Place
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                          {profile?.birthplace}
                          </td>
                        </tr>
                        
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Role
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">{playerRole}</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Batting Style
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                          {profile?.batting_style}
                          </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Bowling Style
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                          {profile?.bowling_style}
                          </td>
                        </tr>
                        {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Debut
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                            March 13, 2010
                          </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Jersey No.
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">63</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            Family
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                            Devisha Shetty (wife)
                          </td> 
                        </tr>*/}
                      </tbody>
                    </table>
                  </div>
                </div>


                <div className="cust-box-click-container">
                  <div className="flex justify-between items-center pt-4 pb-2">
                    <div id="careerstats">
                      <h3 className="text-1xl font-semibold pl-[7px] border-l-[3px] border-[#229ED3]">
                        Career &amp; Stats
                      </h3>
                    </div>
                    <div>
                      <button
                        onClick={() => handleCareerTabClick('cust-box-click-batting')}
                        className={`cust-box-click-button font-medium px-5 py-1 ${careerTab === 'cust-box-click-batting' ? 'bg-[#081736] text-white' : ''} rounded-full`}
                      >
                        <span>Batting</span>
                      </button>
                      <button
                        onClick={() => handleCareerTabClick('cust-box-click-bowling')}
                        className={`cust-box-click-button font-medium px-5 py-1 ${careerTab === 'cust-box-click-bowling' ? 'bg-[#081736] text-white' : ''} rounded-full`}
                      >
                        <span>Bowling</span>
                      </button>
                    </div>
                  </div>
                  <div className={`cust-box-click-content cust-box-click-batting ${careerTab === 'cust-box-click-batting' ? "" : "hidden"}`}>
                    <div className="rounded-lg p-6 bg-[#ffffff]">
                      <div className="md:flex items-center justify-between">
                        <h3 className="text-1xl font-medium mb-2">
                        {profile?.first_name} Recent Form
                        </h3>
                        <div className="text-right">
                          {/* <p className="text-[#1A80F8] font-semibold flex items-center text-[13px]">
                            Recent Form
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-3 ml-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </p> */}
                        </div>
                      </div>
                      <div className="border-t-[1px] border-[#E7F2F4]" />

                      <div className="cust-slider-container w-full overflow-hidden relative mt-4">
                        <div
                          className="cust-slider flex gap-4 transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
                        >
                          {slides.map((slide:any) => (
                            <div key={slide.id} className="cust-slide w-1/4 flex-shrink-0 rounded-lg border-[1px] border-[#ebebeb]">
                              <div className="bg-white p-4 text-center">
                                <p className="text-1xl text-[#1A80F8] font-semibold mb-2">{slide.text}</p>
                                <p className="text-gray-500 font-medium text-[12px]">{slide.match}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="cust-slider-nav flex justify-between items-center">
                          {currentIndex > 0 && (
                            <button
                              onClick={prevSlide}
                              className="cust-prev-btn bg-[#ffffff] p-[7px] rounded-full border-2 absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                            >
                              <span className="text-[20px] font-bold"> <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 19.5 8.25 12l7.5-7.5"
                                />
                              </svg></span>
                            </button>
                          )}
                          {currentIndex + visibleSlides < totalSlides && (
                            <button
                              onClick={nextSlide}
                              className="cust-next-btn bg-[#ffffff] p-[7px] rounded-full border-2 absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                            >
                              <span className="text-[20px] font-bold"><svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                              </svg></span>
                            </button>
                          )}
                        </div>
                      </div>


                      <h3 className="text-1xl font-medium mt-4 mb-2">
                      {profile?.first_name} Career Stats
                      </h3>
                      <div className="border-t-[1px] border-[#E7F2F4]" />
                      <h3 className="text-[14px] font-normal mt-2 mb-1">Batting</h3>
                      <div>
                        <div
                          className="relative overflow-x-auto  [&::-webkit-scrollbar] [&::-webkit-scrollbar]:h-[5px] 
                                  [&::-webkit-scrollbar-track]:bg-gray-100 
                                  [&::-webkit-scrollbar-thumb]:bg-[#DFE9F6] 
                                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
                                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                        >
                          <table className="w-full text-[13px] text-left text-gray-500">
                            <thead className="border-b text-gray-700 bg-[#C3DBFF33]">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-3 bg-[#C3DBFF33] font-semibold"
                                >
                                  Format
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Mat
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Inns
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Runs
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Avg
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  4s
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  6s
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  SR
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Not Out
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Balls
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Highest
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Fifty
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                 Century
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-xs">
                            {battingArray.map((item, index) => (
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                <th
                                  scope="row"
                                  className="px-4 py-4 font-medium text-gray-900 bg-[#C3DBFF33] whitespace-nowrap dark:text-white"
                                >
                                  {item.formatType}
                                </th>
                                <td className="px-4 py-4">{item.matches}</td>
                                <td className="px-4 py-4">{item.innings}</td>
                                <td className="px-4 py-4">{item.runs}</td>
                                <td className="px-4 py-4">{item.average}</td>
                                <td className="px-4 py-4">{item.run4}</td>
                                <td className="px-4 py-4">{item.run6}</td>
                                <td className="px-4 py-4">{item.strike}</td>
                                <td className="px-4 py-4">{item.notout}</td>
                                <td className="px-4 py-4">{item.balls}</td>
                                <td className="px-4 py-4">{item.highest}</td>
                                <td className="px-4 py-4">{item.run50}</td>
                                <td className="px-4 py-4">{item.run100}</td>
                              </tr>
                            ))}
                              
                              
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <h3 className="text-[14px] font-normal mt-2 mb-1">Teams</h3>
                      <div className="mt-4">
                        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
                        {teamsPlayedFor.map((teams:any, index: number) => (
                          <div className="col-span-1" key={index}>
                            <Link href={"/team/"+urlStringEncode(teams.abbr)+"/"+teams.tid}>
                            <div className="bg-white p-2 rounded-lg border-[1px] border-[#ebebeb] text-center mb-2">
                              <div className="flex items-center justify-center">
                              {teams.logo_url ? (
                                <Image
                                  src={teams.logo_url}
                                  width={20} height={20} alt={teams.alt_name}
                                  className="h-[30px] w-[30px] rounded-full"
                                />
                                ) : (
                                "")}
                              </div>
                              <p className=" font-semibold text-[12px] pt-1">
                                {teams.abbr}
                              </p>
                            </div>
                            </Link>
                          </div>
                        ))}
                         
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`cust-box-click-content cust-box-click-batting ${careerTab === 'cust-box-click-bowling' ? "" : "hidden"}`}>
                  <div className="rounded-lg p-6 bg-[#ffffff]">
                      <div className="md:flex items-center justify-between">
                        <h3 className="text-1xl font-medium mb-2">
                        {profile?.first_name} Recent Form
                        </h3>
                        <div className="text-right">
                          {/* <p className="text-[#1A80F8] font-semibold flex items-center text-[13px]">
                            Recent Form
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-3 ml-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </p> */}
                        </div>
                      </div>
                      <div className="border-t-[1px] border-[#E7F2F4]" />

                      <div className="cust-slider-container w-full overflow-hidden relative mt-4">
                        <div
                          className="cust-slider flex gap-4 transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
                        >
                          {slidesBol.map((slide:any) => (
                            <div key={slide.id} className="cust-slide w-1/4 flex-shrink-0 rounded-lg border-[1px] border-[#ebebeb]">
                              <div className="bg-white p-4 text-center">
                                <p className="text-1xl text-[#1A80F8] font-semibold mb-2">{slide.text}</p>
                                <p className="text-gray-500 font-medium text-[12px]">{slide.match}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="cust-slider-nav flex justify-between items-center">
                          {currentIndex > 0 && (
                            <button
                              onClick={prevSlide}
                              className="cust-prev-btn bg-[#ffffff] p-[7px] rounded-full border-2 absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                            >
                              <span className="text-[20px] font-bold"> <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 19.5 8.25 12l7.5-7.5"
                                />
                              </svg></span>
                            </button>
                          )}
                          {currentIndex + visibleSlides < totalSlides && (
                            <button
                              onClick={nextSlide}
                              className="cust-next-btn bg-[#ffffff] p-[7px] rounded-full border-2 absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                            >
                              <span className="text-[20px] font-bold"><svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                              </svg></span>
                            </button>
                          )}
                        </div>
                      </div>


                      <h3 className="text-1xl font-medium mt-4 mb-2">
                      {profile?.first_name} Career Stats
                      </h3>
                      <div className="border-t-[1px] border-[#E7F2F4]" />
                      <h3 className="text-[14px] font-normal mt-2 mb-1">Bowling</h3>
                      <div>
                        <div
                          className="relative overflow-x-auto  [&::-webkit-scrollbar] [&::-webkit-scrollbar]:h-[5px] 
                                  [&::-webkit-scrollbar-track]:bg-gray-100 
                                  [&::-webkit-scrollbar-thumb]:bg-[#DFE9F6] 
                                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
                                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                        >
                          <table className="w-full text-[13px] text-left text-gray-500">
                            <thead className="border-b text-gray-700 bg-[#C3DBFF33]">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-3 bg-[#C3DBFF33] font-semibold"
                                >
                                  Format
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Mat
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Inns
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Runs
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Avg
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                Wicket4i
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                Wicket5i
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  SR
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                Econ
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                  Balls
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                Wickets
                                </th>
                                <th scope="col" className="px-4 py-3 font-semibold">
                                Overs
                                </th>
                                
                              </tr>
                            </thead>
                            <tbody className="text-xs">
                            {bowlingArray.map((item, index) => (
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                <th
                                  scope="row"
                                  className="px-4 py-4 font-medium text-gray-900 bg-[#C3DBFF33] whitespace-nowrap dark:text-white"
                                >
                                  {item.formatType}
                                </th>
                                <td className="px-4 py-4">{item.matches}</td>
                                <td className="px-4 py-4">{item.innings}</td>
                                <td className="px-4 py-4">{item.runs}</td>
                                <td className="px-4 py-4">{item.average}</td>
                                <td className="px-4 py-4">{item.wicket4i}</td>
                                <td className="px-4 py-4">{item.wicket5i}</td>
                                <td className="px-4 py-4">{item.strike}</td>
                                <td className="px-4 py-4">{item.econ}</td>
                                <td className="px-4 py-4">{item.balls}</td>
                                <td className="px-4 py-4">{item.wickets}</td>
                                <td className="px-4 py-4">{item.overs}</td>
                              </tr>
                            ))}
                              
                              
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <h3 className="text-[14px] font-normal mt-2 mb-1">Teams</h3>
                      <div className="mt-4">
                        <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
                        {teamsPlayedFor.map((teams:any, index: number) => (
                          <div className="col-span-1" key={index}>
                            <Link href={"/team/"+urlStringEncode(teams.abbr)+"/"+teams.tid}>
                            <div className="bg-white p-2 rounded-lg border-[1px] border-[#ebebeb] text-center mb-2">
                              <div className="flex items-center justify-center">
                                {teams.logo_url ? (
                                <Image
                                  src={teams.logo_url}
                                  width={20} height={20} alt={teams.alt_name}
                                  className="h-[30px] w-[30px] rounded-full"
                                />
                                ):("")}
                              </div>
                              <p className=" font-semibold text-[12px] pt-1">
                                {teams.abbr}
                              </p>
                            </div>
                            </Link>
                          </div>
                        ))}
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                
                <div className="pt-4 mb-2">
                  <h3 className="text-1xl font-semibold pl-[3px] border-l-[3px] border-[#1a80f8]">
                    Debut &amp; Last Matches
                  </h3>
                </div>
                {playerDebutData.length > 0 &&
                <div className=" rounded-lg p-4 bg-[#ffffff] mb-4">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <tbody>
                        {playerDebutData.map((debut:any, index:number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                          <th
                            scope="row"
                            className="px-6 py-2 text-[#586577] whitespace-nowrap dark:text-white font-normal"
                          >
                            {debut.format_str}
                          </th>
                          <td className="px-6 py-2 text-[#2F335C]">
                            <p className="text-[#217AF7]">
                               {debut.match_title}, {format(new Date(debut.match_date), "dd MMM yyyy")}
                            </p>
                          </td>
                        </tr>
                        ))}
                      
                      </tbody>
                    </table>
                  </div>
                  <div className="items-center justify-between py-4 hidden">
                    <form action="" className="w-full md:w-[auto]">
                      <div className="md:flex items-center md:space-x-2">
                        <p>Popular Players</p>
                        <div className="mt-2 md:mt-0">
                          {/* select opction */}
                          <select
                            className="border-[1px] border-border-gray-700 md:w-[154px] w-full py-1 px-2 rounded-md"
                            name="select"
                            id=""
                          >
                            <option value="Select Match">All</option>
                            <option value="Test">Test</option>
                            <option value="ODI">ODI</option>
                            <option value="T20">T20</option>
                            <option value="IPL">IPL</option>
                          </select>
                        </div>
                      </div>
                    </form>
                    <div className="text-right md:mt-0 mt-2 w-full md:w-[auto]">
                      <Link href="#">
                        <p className="text-[#1A80F8] font-semibold flex items-center justify-end text-[13px]">
                          Recent Form
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-3 ml-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div className=" md:grid-cols-4 grid-cols-2 gap-4 hidden">
                    <div className="col-span-1 bg-white p-4 rounded-lg border-[1px] border-[#ebebeb] ">
                      <Link href="/player/playername/overview">
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <div className="relative">
                            <Image
                              src="/assets/img/player/g-11.png"
                              width={80} height={80} alt="Player Image"
                              className="w-16 h-16 mx-auto rounded-full mb-2"
                            />
                            <Image
                              src="/assets/img/player/bat.png"
                              className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                              width={24} height={24} alt=""
                            />
                          </div>
                        </div>
                        <p className="text-[14px] font-medium">V kohli</p>
                        <p className="text-gray-500 font-medium text-[12px]">
                          Batter
                        </p>
                      </div>
                      </Link>
                    </div>
                    <div className="col-span-1 bg-white p-4 rounded-lg border-[1px] border-[#ebebeb] ">
                    <Link href="/player/playername/overview">
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <div className="relative">
                            <Image
                              src="/assets/img/player/g-11.png"
                              width={80} height={80} alt="Player Image"
                              className="w-16 h-16 mx-auto rounded-full mb-2"
                            />
                            <Image
                              src="/assets/img/player/bat.png"
                              className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                              width={24} height={24} alt=""
                            />
                          </div>
                        </div>
                        <p className="text-[14px] font-medium">S Gill</p>
                        <p className="text-gray-500 font-medium text-[12px]">
                          Batter
                        </p>
                      </div>
                      </Link>
                    </div>
                    <div className="col-span-1 bg-white p-4 rounded-lg border-[1px] border-[#ebebeb] ">
                    <Link href="/player/playername/overview">
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <div className="relative">
                            <Image
                              src="/assets/img/player/g-11.png"
                              width={80} height={80} alt="Player Image"
                              className="w-16 h-16 mx-auto rounded-full mb-2"
                            />
                            <Image
                              src="/assets/img/player/bat.png"
                              className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                              width={24} height={24} alt=""
                            />
                          </div>
                        </div>
                        <p className="text-[14px] font-medium">R Sharma</p>
                        <p className="text-gray-500 font-medium text-[12px]">
                          Batter
                        </p>
                      </div>
                      </Link>
                    </div>
                    <div className="col-span-1 bg-white p-4 rounded-lg border-[1px] border-[#ebebeb] ">
                    <Link href="/player/playername/overview">
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <div className="relative">
                            <Image
                              src="/assets/img/player/g-11.png"
                              width={80} height={80} alt="Player Image"
                              className="w-16 h-16 mx-auto rounded-full mb-2"
                            />
                            <Image
                              src="/assets/img/player/bat.png"
                              className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                              width={24} height={24} alt=""
                            />
                          </div>
                        </div>
                        <p className="font-medium text-[14px]">Y Jaiswal</p>
                        <p className="text-gray-500 font-medium text-[12px]">
                          Batter
                        </p>
                      </div>
                      </Link>
                    </div>
                  </div>
                </div>
                }
                <div className="rounded-lg bg-[#ffffff] p-4 mb-4 hidden">
                  <h3 className="text-1xl font-semibold mb-1">
                    India vs Zimbabwe 2024
                  </h3>
                  <p className="text-gray-500 font-normal">
                    The biggest tournament in the cricketing circuit, the ICC T20
                    WORLD Cup is underway in the USAs and the West Indies. The
                    tournament received excellent response from the fans
                    worldwide...
                  </p>
                  <Link href="#">
                    <p className="text-[#1A80F8] font-semibold flex items-center text-[13px] pt-2 underline">
                      Read more{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-3 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </p>
                  </Link>
                </div>
                <div className="rounded-lg bg-[#ffffff] p-4 mb-4 hidden">
                  <h3 className="text-1xl font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                    News
                  </h3>
                  <div className="border-t-[1px] border-[#E4E9F0]" />
                  <div className="lg:grid grid-cols-12 gap-4 mt-4">
                    {/* Main News Item */}
                    <div className="col-span-6 border-r-[1px] border-[#E7F2F4] pr-[16px]">
                      <Image
                        src="/assets/img/team-1.png"
                        width={300} height={300} alt="Main news"
                        className="rounded-lg w-full h-48 object-cover mb-3"
                      />
                      <h3 className="text-1xl font-semibold mb-1">
                        Live - Jagadeesan hits a century; Haryana trounce
                      </h3>
                      <p className="text-gray-500 font-normal">
                        India will go into the home Test series against New Zealand
                        with pretty much the same squad that took on Bangladesh in
                        September - Indias last red-ball action ahead of the
                        five-Test...
                      </p>
                      <div className="border-l-[1px] border-[#E7F2F4]" />
                    </div>
                    {/* Side News Items */}
                    <div className="col-span-6">
                      {/* Single News Item */}
                      <div className="flex gap-3 my-3">
                        <Image
                          src="/assets/img/team-2.png"
                          width={77} height={77} alt="News thumbnail"
                          className="rounded-lg h-[77px]"
                        />
                        <div>
                          <h4 className="text-[13px] font-semibold mb-2">
                            Womens T20 World Cup, 2nd Semifinal | WI-W Vs NZ-W
                            Playing 11 Prediction
                          </h4>
                          <p className="text-[12px] text-gray-500 flex items-center">
                            <span className="ml-2 pr-[1px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width={15}
                                height={15}
                                viewBox="0 0 48 48"
                              >
                                <polygon
                                  fill="#42a5f5"
                                  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                                ></polygon>
                                <polygon
                                  fill="#fff"
                                  points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                                ></polygon>
                              </svg>
                            </span>{" "}
                            Akshita Patel{" "}
                            <span className="ml-2 pr-[1px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                ></path>
                              </svg>
                            </span>{" "}
                            October 9, 2024
                          </p>
                        </div>
                      </div>
                      <div className="border-t-[1px] border-[#E7F2F4]" />
                      <div className="flex gap-3 my-3">
                        <Image
                          src="/assets/img/team-3.png"
                          width={77} height={77} alt="News thumbnail"
                          className="rounded-lg h-[77px]"
                        />
                        <div>
                          <h4 className="text-[13px] font-semibold mb-2">
                            AUS-W Vs SA-W Highlights: Anneke Bosch Overpowers
                            Australia To Guide South Africa.
                          </h4>
                          <p className="text-[12px] text-gray-500 flex items-center">
                            <span className="ml-2 pr-[1px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width={15}
                                height={15}
                                viewBox="0 0 48 48"
                              >
                                <polygon
                                  fill="#42a5f5"
                                  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                                ></polygon>
                                <polygon
                                  fill="#fff"
                                  points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                                ></polygon>
                              </svg>
                            </span>{" "}
                            Akshita Patel{" "}
                            <span className="ml-2 pr-[1px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                ></path>
                              </svg>
                            </span>{" "}
                            October 9, 2024
                          </p>
                        </div>
                      </div>
                      <div className="border-t-[1px] border-[#E7F2F4]" />
                      <div className="flex gap-3 my-3">
                        <Image
                          src="/assets/img/team-4.png"
                          width={77} height={77} alt="News thumbnail"
                          className="rounded-lg h-[77px]"
                        />
                        <div>
                          <h4 className="text-[13px] font-semibold mb-2">
                            WI-W vs NZ-W Dream11 Prediction Today Match, Fantasy
                            Cricket Tips, Pitch Report
                          </h4>
                          <p className="text-[12px] text-gray-500 flex items-center">
                            <span className="ml-2 pr-[1px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width={15}
                                height={15}
                                viewBox="0 0 48 48"
                              >
                                <polygon
                                  fill="#42a5f5"
                                  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                                ></polygon>
                                <polygon
                                  fill="#fff"
                                  points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                                ></polygon>
                              </svg>
                            </span>{" "}
                            P Bhattachar{" "}
                            <span className="ml-2 pr-[1px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                ></path>
                              </svg>
                            </span>{" "}
                            October 9, 2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Sidebar Section */}
              <div className="lg:col-span-4 md:col-span-5">
                <div className="">
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex gap-1 items-center justify-between">
                      <div className="flex gap-1 items-center">
                        <div className="col-span-4 relative">
                          <Image
                            src="/assets/img/home/trofi.png"
                            className="h-[75px]"
                            width={75} height={75} alt=""
                          />
                        </div>
                        <div className="col-span-8 relative">
                          <h3 className="font-semibold text-[19px] mb-1">
                            Weekly challenge
                          </h3>
                          <p className="font-semibold text-[13px] text-[#1a80f8]">
                            <span className="text-[#586577]">Time Left:</span>2 Days
                            12h
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>




                  <div className=" my-4">
                    <div className="py-2 mb-2">
                      <h3 className="text-1xl font-semibold pl-[3px] border-l-[3px] border-[#1a80f8]">
                        Fantasy Tips
                      </h3>
                    </div>
                    <div className="bg-[#ffffff] rounded-lg ">
                      <div className="p-4">
                        <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                          <p className="text-[13px] font-semibold">
                            NZ-W Vs WI-W Highlights: Eden Carson, Amelia Kerr Pummel
                            West Indies In Semis As NZ Set Date With SA
                          </p>
                          <p className="text-[#586577] pt-2">15 hrs ago</p>
                        </div>
                        <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                          <p className="text-[13px] font-semibold">
                            Probably Took Wrong Risk: Alyssa Healy Regrets Sitting
                            Out As SA Stuns AUS In T20 WC
                          </p>
                          <p className="text-[#586577] pt-2">17 hrs ago</p>
                        </div>
                        <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                          <p className="text-[13px] font-semibold">
                            Womens T20 World Cup, NZ vs WI: Unchanged New Zealand
                            Opt To Bat; Check Out The Playing XIs
                          </p>
                          <p className="text-[#586577] pt-2">19 hrs ago</p>
                        </div>
                        <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                          <p className="text-[13px] font-semibold">
                            SA Cricketers Get Emotional After Historic Win Against
                            Australia To Enter T20 World Cup 2024 Final - Watch
                          </p>
                          <p className="text-[#586577] pt-2">18 Oct 2024</p>
                        </div>
                        <div className=" pb-2 mb-2">
                          <p className="text-[13px] font-semibold">
                            Probably Took Wrong Risk: Alyssa Healy Regrets Sitting
                            Out As SA Stuns AUS In T20 WC
                          </p>
                          <p className="text-[#586577] pt-2">18 Oct 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" pb-2 my-4">
                    <div className="py-2">
                      <h3 className="text-1xl font-semibold pl-[3px] border-l-[3px] border-[#1a80f8]">
                        POPULAR
                      </h3>
                    </div>
                    <div className="">
                      <Link href="#">
                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2">
                          <div>
                            <Image src="/assets/img/1.png" width={20} height={20} alt="" />
                          </div>
                          <div className="font-medium text-[#394351]">
                            ICC World cup
                          </div>
                        </div>
                      </Link>
                      <Link href="#">
                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                          <div>
                            <Image src="/assets/img/2.png" width={20} height={20} alt="" />
                          </div>
                          <div className="font-medium text-[#394351]">
                            ICC Champion Trophy
                          </div>
                        </div>
                      </Link>
                      <Link href="#">
                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                          <div>
                            <Image src="/assets/img/3.png" width={20} height={20} alt="" />
                          </div>
                          <div className="font-medium text-[#394351]">
                            T20 World Cup
                          </div>
                        </div>
                      </Link>
                      <Link href="#">
                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                          <div>
                            <Image src="/assets/img/4.png" width={20} height={20} alt="" />
                          </div>
                          <div className="font-medium text-[#394351]">
                            Indian Premium League
                          </div>
                        </div>
                      </Link>
                      <Link href="#">
                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                          <div>
                            <Image src="/assets/img/5.png" width={20} height={20} alt="" />
                          </div>
                          <div className="font-medium text-[#394351]">
                            Pakistan Super League
                          </div>
                        </div>
                      </Link>
                      <Link href="#">
                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                          <div>
                            <Image src="/assets/img/6.png" width={20} height={20} alt="" />
                          </div>
                          <div className="font-medium text-[#394351]">
                            Bangladesh Premium Leaguge
                          </div>
                        </div>
                      </Link>
                      <Link href="#">
                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                          <div>
                            <Image src="/assets/img/7.png" width={20} height={20} alt="" />
                          </div>
                          <div className="font-medium text-[#394351]">
                            Big Bash Leaguge
                          </div>
                        </div>
                      </Link>
                      <Link href="#">
                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3">
                          <div>
                            <Image src="/assets/img/8.png" width={20} height={20} alt="" />
                          </div>
                          <div className="font-medium text-[#394351]">
                            Super Smash
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}