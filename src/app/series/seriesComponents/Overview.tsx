"use client"

import React, { useState } from "react";
import Link from 'next/link'
import WeeklySlider from '@/app/components/WeeklySlider'
import Image from "next/image";
import { format  } from "date-fns";

interface Overview {
    //seriesData: any[]; // Adjust type based on your data
    seriesInfo: any;
    seriesKeystats: any;
    urlString: string; 
  }
export default function Overview({seriesInfo, seriesKeystats, urlString} : Overview) {

    const standings = seriesInfo?.standing?.standings;
    // console.log("seriesKeystats",seriesKeystats);

    const [open, setOpen] = useState({
        mostRuns: false,
        mostHundreds: false,
        mostFifties: false,
        mostDucks: false,
        highestBattingAverage: false,
        highestScore: false,
        mostMatchesAsCaptain: false,
    });

    const toggleOpen = (key: keyof typeof open) => {
        setOpen((prev) => ({
            ...prev,
            [key]: !prev[key],  // Now TypeScript knows 'key' is a valid key
        }));
    };



    return (
        <section className="lg:w-[1000px] mx-auto md:mb-0 mb-4 px-2 lg:px-0">
            <div id="tabs" className="my-4">
                <div className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto">
                    <Link href={urlString}>
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white rounded-md"
                        >
                            Overview
                        </button>
                    </Link>
                    <Link href={urlString+"/schedule-results"}>
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap "
                        >
                            Schedule & Results

                        </button>
                    </Link>
                    <Link href={urlString+"/squads"}>
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap "
                        >
                            Squads
                        </button>
                    </Link>
                    <Link href={urlString+"/points-table"}>
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap"
                        >
                            Points Table
                        </button>
                    </Link>
                    <Link href={urlString+"/news"}>
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap"
                        >
                            News
                        </button>
                    </Link>
                    <Link href={urlString+"/stats"}>
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap" >
                            Stats
                        </button>
                    </Link>

                </div>
            </div>


            <div id="tab-content">
                <div id="info"
                    className="tab-content ">
                    <div className="md:grid grid-cols-12 gap-4">
                        <div className="lg:col-span-8 md:col-span-7">
                            <div className="rounded-lg bg-white">
                                <div className="p-4">
                                    <h3 className="text-[15px] font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                                        Series Info
                                    </h3>
                                    <div className="border-t border-[#E4E9F0]" />
                                    {/* Responsive Grid Section */}
                                    <div className="grid gap-2 grid-cols-1 py-3 px-2">
                                        <div className="flex items-center gap-16">
                                            <h2 className="font-normal text-[#586577]">Series :</h2>
                                            <p className="text-[14px] font-medium">
                                                {seriesInfo?.title} {seriesInfo?.season}{" "}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-12">
                                            <h2 className="font-normal text-[#586577]">Duration :</h2>
                                            <p className="text-[14px] font-medium">
                                                {seriesInfo.datestart ? format(new Date(seriesInfo.datestart), "dd MMM") : ""} - {seriesInfo.datestart ? format(new Date(seriesInfo.dateend), "dd MMM, yyyy") : ""}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-14">
                                            <h2 className="font-normal text-[#586577]">Format :</h2>
                                            <p className="text-[14px] font-medium"> {seriesInfo?.game_format?.toUpperCase()}</p>
                                        </div>
                                        <div className="flex items-center gap-14">
                                            <h2 className="font-normal text-[#586577]">Teams :</h2>
                                            <p className="text-[14px] font-medium">{seriesInfo?.total_teams} (Teams)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-[#ffffff] my-4 p-4">
                                <h3 className="text-1xl font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                                    Featured Matches
                                </h3>
                                {/* Featured Matches desktop view  */}
                                <div className="border-t-[1px] border-[#E4E9F0]" />
                                <div className="hidden lg:block">
                                    <div className="py-3 flex justify-between items-center">
                                        <div className="flex space-x-2 font-medium	w-full">
                                            <Link href="/team/kkr/overview">
                                                <div className="flex items-center space-x-1 flex-col">
                                                    <Image
                                                        src="/assets/img/ipl/b-1.png"
                                                        className="h-[35px] rounded-full"
                                                        width={35} height={35} alt="csk"
                                                    />
                                                    <span className="text-[#909090]">CSK</span>
                                                </div>
                                            </Link>
                                            <div className="mt-1">
                                                <p className="text-1xl font-semibold">120/8</p>
                                                <p className="text-[#909090]">(20.0 overs)</p>
                                            </div>
                                        </div>
                                        <div className=" font-semibold text-center w-full">
                                            <p className="text-[#3D4DCF] text-[14px]">KKR Won</p>
                                            <p className="text-[#909090] text-[12px] font-normal">
                                                2nd Semi Final WT20 World Cup 2024
                                            </p>
                                        </div>
                                        <div className="flex space-x-2 font-medium justify-end w-full">
                                            <div className="mt-1 text-end">
                                                <p className="text-1xl font-semibold">128/9</p>
                                                <p className="text-[#909090]">(20.0 overs)</p>
                                            </div>
                                            <Link href="/team/kkr/overview">
                                                <div className="flex items-center space-x-1 flex-col font-medium">
                                                    <Image
                                                        src="/assets/img/ipl/b-2.png"
                                                        className="h-[35px] rounded-full"
                                                        width={35} height={35} alt="nz"
                                                    />
                                                    <span className="text-[#909090]">SRH</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="border-t-[1px] border-[#E4E9F0]" />
                                    <div className="py-3 flex justify-between items-center">
                                        <div className="flex space-x-2 font-medium	w-full">
                                            <Link href="/team/kkr/overview">
                                                <div className="flex items-center space-x-1 flex-col">
                                                    <Image
                                                        src="/assets/img/ipl/b-2.png"
                                                        className="h-[35px] rounded-full"
                                                        width={35} height={35} alt="srh"
                                                    />
                                                    <span className="text-[#909090]">SRH</span>
                                                </div>
                                            </Link>
                                            <div className="mt-1">
                                                <p className="text-1xl font-semibold">134/5</p>
                                                <p className="text-[#909090]">(20.0 overs)</p>
                                            </div>
                                        </div>
                                        <div className=" font-semibold text-center w-full">
                                            <p className="text-[#3D4DCF] text-[14px]">SRH Won</p>
                                            <p className="text-[#909090] text-[12px] font-normal">
                                                1st Semi Final WT20 World Cup 2024
                                            </p>
                                        </div>
                                        <div className="flex space-x-2 font-medium justify-end w-full">
                                            <div className="mt-1 text-end">
                                                <p className="text-1xl font-semibold">135/2</p>
                                                <p className="text-[#909090]">(17.2 overs)</p>
                                            </div>
                                            <Link href="/team/kkr/overview">
                                                <div className="flex items-center space-x-1 flex-col font-medium">
                                                    <Image
                                                        src="/assets/img/ipl/b-3.png"
                                                        className="h-[35px] rounded-full"
                                                        width={35} height={35} alt="nz"
                                                    />
                                                    <span className="text-[#909090]">RR</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="border-t-[1px] border-[#E4E9F0]" />
                                    <div className="py-3 pb-0 flex justify-between items-center">
                                        <div className="flex space-x-2 font-medium	w-full">
                                            <Link href="/team/kkr/overview">
                                                <div className="flex items-center space-x-1 flex-row">
                                                    <Image
                                                        src="/assets/img/ipl/b-3.png"
                                                        className="h-[35px] rounded-full"
                                                        width={35} height={35} alt="wiw"
                                                    />
                                                    <span className="text-[#909090]">RR</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className=" font-semibold text-center w-full">
                                            <p className="text-[#414143] text-[14px]">Final T20 on</p>
                                            <p className="text-[#909090] text-[12px] font-normal">
                                                Oct 20, 7:30 PM
                                            </p>
                                        </div>
                                        <div className="flex space-x-2 font-medium justify-end w-full">
                                            <Link href="/team/kkr/overview">
                                                <div className="flex items-center gap-1 flex-row-reverse font-medium">
                                                    <Image
                                                        src="/assets/img/ipl/b-4.png"
                                                        className="h-[35px] rounded-full"
                                                        width={35} height={35} alt="nz"
                                                    />
                                                    <span className="text-[#909090]">RCB</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Featured Matches responsive view view  */}
                                <div className="lg:hidden">
                                    <div className="py-4 px-3 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                        <p className="text-[#909090] text-[12px] mb-4 font-normal">
                                            2nd Semi Final WT20 World Cup 2024
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="">
                                                <div className="flex space-x-2 items-start font-medium w-[162px] md:w-full mb-3">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center space-x-1 flex-col">
                                                            <Image
                                                                src="/assets/img/ipl/b-1.png"
                                                                className="h-[25px] rounded-full"
                                                                width={20} height={20} alt="wiw"
                                                            />
                                                            <span className="text-[#909090]">CSK</span>
                                                        </div>
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-1xl font-semibold">120/8</p>
                                                        <p className="text-[#909090]">(20.0 overs)</p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 items-start font-medium w-[162px] md:w-full">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center space-x-1 flex-col">
                                                            <Image
                                                                src="/assets/img/ipl/b-2.png"
                                                                className="h-[25px] rounded-full"
                                                                width={20} height={20} alt="wiw"
                                                            />
                                                            <span className="text-[#909090]">SRH</span>
                                                        </div>
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-1xl font-semibold">128/9</p>
                                                        <p className="text-[#909090]">(20.0 overs)</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-[60px] border-l-[1px] border-[#d0d3d7]" />
                                            <div className=" font-semibold text-right">
                                                <p className="text-[#3D4DCF]">KKR Won</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 px-3 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                        <p className="text-[#909090] text-[12px] mb-4 font-normal">
                                            1st Semi Final WT20 World Cup 2024
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="">
                                                <div className="flex space-x-2 items-start font-medium w-[162px] md:w-full mb-3">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center space-x-1 flex-col">
                                                            <Image
                                                                src="/assets/img/ipl/b-2.png"
                                                                className="h-[25px] rounded-full"
                                                                width={20} height={20} alt="wiw"
                                                            />
                                                            <span className="text-[#909090]">SRH</span>
                                                        </div>
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-1xl font-semibold">134/5</p>
                                                        <p className="text-[#909090]">(20.0 overs)</p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 items-start font-medium w-[162px] md:w-full">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center space-x-1 flex-col">
                                                            <Image
                                                                src="/assets/img/ipl/b-3.png"
                                                                className="h-[25px] rounded-full"
                                                                width={20} height={20} alt="wiw"
                                                            />
                                                            <span className="text-[#909090]">RR</span>
                                                        </div>
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-1xl font-semibold">135/2</p>
                                                        <p className="text-[#909090]">(17.2 overs)</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-[60px] border-l-[1px] border-[#d0d3d7]" />
                                            <div className=" font-semibold text-right">
                                                <p className="text-[#3D4DCF]">SRH Won</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 px-3 bg-[#f7faff] rounded-lg my-3 border-b-[1px] border-[#E4E9F0]">
                                        <p className="text-[#909090] text-[12px] mb-4 font-normal">
                                            2nd Semi Final WT20 World Cup 2024
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="">
                                                <div className="flex space-x-2 items-start font-medium w-[162px] md:w-full mb-3">
                                                    <Link href="/team/kkr/overview">
                                                    <div className="flex items-center space-x-1 ">
                                                        <Image
                                                            src="/assets/img/ipl/b-3.png"
                                                            className="h-[25px] rounded-full"
                                                            width={20} height={20} alt="wiw"
                                                        />
                                                        <span className="text-[#909090]">RR</span>
                                                    </div>
                                                    </Link>
                                                </div>
                                                <div className="flex space-x-2 items-start font-medium w-[162px] md:w-full">
                                                    <Link href="/team/kkr/overview">
                                                    <div className="flex items-center space-x-1 ">
                                                        <Image
                                                            src="/assets/img/ipl/b-4.png"
                                                            className="h-[25px] rounded-full"
                                                            width={20} height={20} alt="wiw"
                                                        />
                                                        <span className="text-[#909090]">RCB</span>
                                                    </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="h-[60px] border-l-[1px] border-[#d0d3d7]" />
                                            <div className=" font-semibold text-right">
                                                <p className="text-[#414143]">Final T20 on</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {seriesInfo?.title === "Indian Premier League" &&
                            standings.map((rounds : any, index:number) => ( 
                           <div className="rounded-lg bg-[#ffffff] mb-2 p-4"  key={index}>
                    <h3 className="text-1xl font-semibold mb-3 pl-[7px] border-l-[3px] border-[#229ED3]">
                    {rounds?.round?.name}
                    </h3>
                    <div>
                        <div
                            className="overflow-x-auto  [&::-webkit-scrollbar] [&::-webkit-scrollbar]:h-[8px] 
                  [&::-webkit-scrollbar-track]:bg-gray-100 
                  [&::-webkit-scrollbar-thumb]:bg-[#DFE9F6] 
                  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
                  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                        >
                            <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap">
                                <thead className="bg-blue-50 text-gray-700 ">
                                    <tr>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium w-[10px]">
                                            No
                                        </th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                            Team
                                        </th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">M</th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">W</th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">L</th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">T</th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                            N/R
                                        </th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                            PTS
                                        </th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                            Net RR
                                        </th>
                                        <th className="md:px-2 pl-[14px] py-3 font-medium">
                                            Form
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {rounds.standings.map((point : any, index:number) => ( 
                                    <tr className="hover:bg-[#fffae5]"  key={index}>
                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">{index + 1}</td>
                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                            <Link href="/team/kkr/overview">
                                                <div className="flex items-center gap-[5px] w-[120px]">
                                                    <div>
                                                        <Image
                                                            src={point?.team?.thumb_url}
                                                            className="h-[20px]"
                                                            width={20} height={20} alt={point?.team?.abbr}
                                                        />
                                                    </div>
                                                    <p>
                                                    {point?.team?.abbr} {point?.quality === "true" ? <span className="text-[#00B564]"> (Q)</span> : ""}
                                                    </p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="md:px-2 pl-[14px] py-3">{point?.played}</td>
                                        <td className="md:px-2 pl-[14px] py-3">{point?.win}</td>
                                        <td className="md:px-2 pl-[14px] py-3">{point?.loss}</td>
                                        <td className="md:px-2 pl-[14px] py-3">{point?.draw}</td>
                                        <td className="md:px-2 pl-[14px] py-3">{point?.nr}</td>
                                        <td className="md:px-2 pl-[14px] py-3">{point?.points}</td>
                                        <td className="md:px-2 pl-[14px] py-3">{point?.netrr}</td>
                                        <td className="md:px-2 pl-[14px] py-3">
                                            <div className="ml-auto flex gap-1 items-center">
                                            {point?.lastfivematchresult.split(",").map((item: string, index:number) => (
                                                <span className={`${item === "W" ? "bg-[#13b76dbd]" : "bg-[#f63636c2]" } text-white text-[13px] px-[4px] py-[0px] rounded`} key={index}>
                                                {item}
                                            </span>
                                            ))}
                                                
                                                <span className="flex">
                                                    <button className="arro-button">
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
                                                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                            </div>
                            ))}
                            {seriesInfo?.title === "Indian Premier League" &&
                            <>
                            <div className="rounded-lg bg-[#ffffff] mb-4 p-4">
                                <h3 className="text-1xl font-semibold mb-3 pl-[7px] border-l-[3px] border-[#229ED3]">
                                    Orange Cap-Most Runs
                                </h3>
                                <div>
                                    <div
                                        className="overflow-x-auto  [&::-webkit-scrollbar] [&::-webkit-scrollbar]:h-[5px] 
      [&::-webkit-scrollbar-track]:bg-gray-100 
      [&::-webkit-scrollbar-thumb]:bg-[#DFE9F6] 
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                                    >
                                        <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap">
                                            <thead className="bg-blue-50 text-gray-700 ">
                                                <tr>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium w-[10px]">
                                                        Player
                                                    </th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                        Mat
                                                    </th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                        Inns
                                                    </th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">HS</th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                        Avg
                                                    </th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">SR</th>
                                                    <th className="md:px-2 px-3 py-3 font-medium">6S</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr className="bg-[#FB7E02] text-white">
                                                    <td className="md:px-3 pl-[14px] py-3">
                                                        <div className="flex items-center gap-[5px] md:w-[240px] w-[185px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/player/8.png"
                                                                    className="h-[33px]"
                                                                    width={33} height={33} alt="1"
                                                                />
                                                            </div>
                                                            <Link href="/player/playername/overview">
                                                                <div>
                                                                    <p className="font-medium">Virat Kohli</p>
                                                                    <p className="text-[12px]">RCB</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="md:px-2 pl-[14px] py-3">15</td>
                                                    <td className="md:px-2 pl-[14px] py-3">741</td>
                                                    <td className="md:px-2 pl-[14px] py-3">113</td>
                                                    <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                    <td className="md:px-2 pl-[14px] py-3">145.70</td>
                                                    <td className="md:px-2 pl-[14px] py-3">38</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-3">
                                                        <div className="flex items-center gap-[5px] md:w-[240px] w-[185px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/player/8.png"
                                                                    className="h-[33px]"
                                                                    width={33} height={33} alt="1"
                                                                />
                                                            </div>
                                                            <Link href="/player/playername/overview">
                                                                <div>
                                                                    <p className="text-[#3e3e3e] font-medium">
                                                                        Virat Kohli
                                                                    </p>
                                                                    <p className="text-[12px]">RCB</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="md:px-2 pl-[14px] py-3">15</td>
                                                    <td className="md:px-2 pl-[14px] py-3">741</td>
                                                    <td className="md:px-2 pl-[14px] py-3">113</td>
                                                    <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                    <td className="md:px-2 pl-[14px] py-3">145.70</td>
                                                    <td className="md:px-2 pl-[14px] py-3">38</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-3 md:w-[240px] w-[185px]">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/player/8.png"
                                                                    className="h-[33px]"
                                                                    width={33} height={33} alt="1"
                                                                />
                                                            </div>
                                                            <Link href="/player/playername/overview">
                                                                <div>
                                                                    <p className="text-[#3e3e3e] font-medium">
                                                                        Virat Kohli
                                                                    </p>
                                                                    <p className="text-[12px]">RCB</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="md:px-2 pl-[14px] py-3">15</td>
                                                    <td className="md:px-2 pl-[14px] py-3">741</td>
                                                    <td className="md:px-2 pl-[14px] py-3">113</td>
                                                    <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                    <td className="md:px-2 pl-[14px] py-3">145.70</td>
                                                    <td className="md:px-2 pl-[14px] py-3">38</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-[#ffffff] mb-4 p-4">
                                <h3 className="text-1xl font-semibold mb-3 pl-[7px] border-l-[3px] border-[#229ED3]">
                                    Purple Cap-Most Wickets
                                </h3>
                                <div>
                                    <div
                                        className="overflow-x-auto  [&::-webkit-scrollbar] [&::-webkit-scrollbar]:h-[5px] 
      [&::-webkit-scrollbar-track]:bg-gray-100 
      [&::-webkit-scrollbar-thumb]:bg-[#DFE9F6] 
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                                    >
                                        <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap">
                                            <thead className="bg-blue-50 text-gray-700 ">
                                                <tr>
                                                    <th className="px-3 py-3 font-medium w-[10px]">Player</th>
                                                    <th className="px-1 py-3 font-medium">Mat</th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                        Overs
                                                    </th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">W</th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                        Avg
                                                    </th>
                                                    <th className="md:px-2 pl-[14px] py-3 font-medium">
                                                        Eco
                                                    </th>
                                                    <th className="px-3 pl-[14px] py-3 font-medium">5W</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr className="bg-[#9E26BC] text-white">
                                                    <td className="px-3 py-3">
                                                        <div className="flex items-center gap-[5px] md:w-[240px] w-[185px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/player/8.png"
                                                                    className="h-[33px]"
                                                                    width={33} height={33} alt="1"
                                                                />
                                                            </div>
                                                            <Link href="/player/playername/overview">
                                                                <div>
                                                                    <p className="font-medium">Harshal Patel</p>
                                                                    <p className="text-[12px]">PBKS</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="md:px-2 pl-[14px] py-3">15</td>
                                                    <td className="md:px-2 pl-[14px] py-3">741</td>
                                                    <td className="md:px-2 pl-[14px] py-3">113</td>
                                                    <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                    <td className="md:px-2 pl-[14px] py-3">145.70</td>
                                                    <td className="md:px-2 pl-[14px] py-3">38</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-3">
                                                        <div className="flex items-center gap-[5px] md:w-[240px] w-[185px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/player/8.png"
                                                                    className="h-[33px]"
                                                                    width={33} height={33} alt="1"
                                                                />
                                                            </div>
                                                            <Link href="/player/playername/overview">
                                                                <div>
                                                                    <p className="text-[#3e3e3e] font-medium">
                                                                        Varun Chakaravarthy
                                                                    </p>
                                                                    <p className="text-[12px]">KKR</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="md:px-2 pl-[14px] py-3">15</td>
                                                    <td className="md:px-2 pl-[14px] py-3">741</td>
                                                    <td className="md:px-2 pl-[14px] py-3">113</td>
                                                    <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                    <td className="md:px-2 pl-[14px] py-3">145.70</td>
                                                    <td className="md:px-2 pl-[14px] py-3">38</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-3 py-3 md:w-[240px] w-[185px]">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/player/8.png"
                                                                    className="h-[33px]"
                                                                    width={33} height={33} alt="1"
                                                                />
                                                            </div>
                                                            <Link href="/player/playername/overview">
                                                                <div>
                                                                    <p className="text-[#3e3e3e] font-medium">
                                                                        Jasprit Bumrah
                                                                    </p>
                                                                    <p className="text-[12px]">MI</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="md:px-2 pl-[14px] py-3">15</td>
                                                    <td className="md:px-2 pl-[14px] py-3">741</td>
                                                    <td className="md:px-2 pl-[14px] py-3">113</td>
                                                    <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                    <td className="md:px-2 pl-[14px] py-3">145.70</td>
                                                    <td className="md:px-2 pl-[14px] py-3">38</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            </>
                            
                            }
                            <div className="flex justify-between items-center pb-4">
                                <div>
                                    <h3 className="text-1xl font-semibold pl-[4px] border-l-[3px] border-[#2182F8]">
                                        Key Stats
                                    </h3>
                                </div>

                            </div>
                            <div className="mb-4">
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 items-center gap-2">
                                    {seriesKeystats?.mostRuns?.player?.short_name &&
                                    <div className="col-span-1">
                                        <Link href="/player/playername/overview">
                                            <div className="rounded-lg bg-[#ffffff] p-4 flex flex-col items-center">
                                                <p className="mb-2 font-medium">Most Runs</p>
                                                <Image
                                                    src="/assets/img/player/g-1.png"
                                                    className="h-[45px]"
                                                    width={45} height={45} alt={seriesKeystats?.mostRuns?.player?.short_name}
                                                />
                                                <h3 className="mt-2 text-[14px] font-semibold">
                                                {seriesKeystats?.mostRuns?.player?.short_name}
                                                </h3>
                                                <p className="text-[#909090]">{seriesKeystats?.mostRuns?.team?.title}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-[18px] font-semibold">{seriesKeystats?.mostRuns?.runs}</p>
                                                    <p className="text-gray-600 text-sm">Runs</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    }
                                    {seriesKeystats?.highStrike?.player?.short_name &&
                                    <div className="col-span-1">
                                        <Link href="/player/playername/overview">
                                            <div className="rounded-lg bg-[#ffffff] p-4 flex flex-col items-center">
                                                <p className="mb-2 font-medium">Highest Strike</p>
                                                <Image
                                                    src="/assets/img/player/g-3.png"
                                                    className="h-[45px]"
                                                    width={45} height={45} alt={seriesKeystats?.highStrike?.player?.short_name}
                                                />
                                                <h3 className="mt-2 text-[14px] font-semibold">
                                                {seriesKeystats?.highStrike?.player?.short_name}
                                                </h3>
                                                <p className="text-[#909090]">{seriesKeystats?.highStrike?.team?.title}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-[18px] font-semibold">{seriesKeystats?.highStrike?.strike}</p>
                                                    <p className="text-gray-600 text-sm"></p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    }
                                    {seriesKeystats?.topWickets?.player?.short_name &&
                                    <div className="col-span-1">
                                        <Link href="/player/playername/overview">
                                            <div className="rounded-lg bg-[#ffffff] p-4 flex flex-col items-center">
                                                <p className="mb-2 font-medium">Most Wickets</p>
                                                <Image
                                                    src="/assets/img/player/g-2.png"
                                                    className="h-[45px]"
                                                    width={45} height={45} alt={seriesKeystats?.topWickets?.player?.short_name}
                                                />
                                                <h3 className="mt-2 text-[14px] font-semibold">{seriesKeystats?.topWickets?.player?.short_name}</h3>
                                                <p className="text-[#909090]">{seriesKeystats?.topWickets?.team?.title}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-[18px] font-semibold">{seriesKeystats?.topWickets?.wickets}</p>
                                                    <p className="text-gray-600 text-sm">Wickets</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    }
                                    {seriesKeystats?.bestBowling?.player?.short_name &&
                                    <div className="col-span-1">
                                        <Link href="/player/playername/overview">
                                            <div className="rounded-lg bg-[#ffffff] p-4 flex flex-col items-center">
                                                <p className="mb-2 font-medium">Best Figures</p>
                                                <Image
                                                    src="/assets/img/player/g-4.png"
                                                    className="h-[45px]"
                                                    width={45} height={45} alt={seriesKeystats?.bestBowling?.player?.short_name}
                                                />
                                                <h3 className="mt-2 text-[14px] font-semibold">{seriesKeystats?.bestBowling?.player?.short_name}</h3>
                                                <p className="text-[#909090]">{seriesKeystats?.bestBowling?.team?.title}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-[18px] font-semibold">{seriesKeystats?.bestBowling?.bestmatch}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="rounded-lg bg-[#ffffff] p-4 mb-4">
                                <h3 className="text-1xl font-semibold mb-2 pl-[7px] border-l-[3px] border-[#229ED3]">
                                    Team Name
                                </h3>
                                <div className="border-t-[1px] border-[#E4E9F0]" />
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
                                {seriesInfo?.teams?.map((teams:any, index: number) =>(
                                    <Link href="#" key={index}>

                                        <div className="border-[1px] border-[##E2E2E2] rounded-md py-4 px-2 flex flex-col items-center">
                                        {teams?.thumb_url ? (
                                            <Image
                                                src={teams?.thumb_url}
                                                width={42} height={42} alt={teams?.alt_name ? teams?.alt_name : "1"}
                                                className="h-[42px] mb-2"
                                            />
                                        ):("")}
                                            <p className="font-medium">{teams?.abbr}</p>
                                        </div>
                                    </Link>
                                    ))}
                                    
                                </div>


                            </div>
                            <div className="rounded-lg bg-[#ffffff] p-4 mb-4">
                                <h3 className="text-1xl font-semibold mb-1">
                                    India vs Zimbabwe 2024
                                </h3>
                                <p className="text-gray-500 font-normal">
                                    The biggest tournament in the cricketing circuit, the ICC T20
                                    WORLD Cup is underway in the USAs and the West Indies. The
                                    tournament received excellent response from the fans worldwide and
                                    the finals of the gran...
                                </p>
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
                            </div>
                            <div className="rounded-lg bg-[#ffffff] p-4 mb-4">
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
                        <div className="lg:col-span-4 md:col-span-5">
                            <div className="bg-white rounded-lg p-4 mb-4">
                                <div className="flex gap-1 items-center justify-between">
                                    <div className="flex gap-1 items-center">
                                        <div className="col-span-4 relative">
                                            <Image src="/assets/img/home/trofi.png" className="h-[75px]" width={75} height={75} alt="1" />
                                        </div>
                                        <div className="col-span-8 relative">
                                            <h3 className="font-semibold text-[19px] mb-1">
                                                Weekly challenge
                                            </h3>
                                            <p className="font-semibold text-[13px] text-[#1a80f8]">
                                                <span className="text-[#586577]">Time Left:</span>{" "}2 Days 12h
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
                            {/* Slider 1 */}
                            <WeeklySlider />
                            {seriesInfo?.title === "Indian Premier League" &&
                            <>
                            <div className="my-4">
                                <div className="mb-2">
                                    <h3 className="text-1xl font-semibold pl-[5px] border-l-[3px] border-[#1a80f8]">
                                        IPL Records
                                    </h3>
                                </div>
                                <div className="bg-white rounded-lg px-4">
                                    <div className="border-b mb-4">
                                        <button
                                            className="w-full flex text-[14px] justify-between items-center pb-3 pt-4"
                                            onClick={() => toggleOpen("mostRuns")}
                                        >
                                            <span className="flex items-center font-medium text-[#394351]">
                                                Most Runs in IPL
                                            </span>
                                            <span className="transform transition-transform ">
                                                <Image src="/assets/img/arrow.png" className="h-[7px]" width={10} height={15} alt="arrow" />
                                            </span>
                                        </button>
                                        {open.mostRuns && (
                                            <div className="pl-8 py-2 space-y-2 font-normal text-[14px] text-[#51555E]">
                                                <p>Bangabandhu T20 C</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b mb-4">
                                        <button
                                            className="w-full flex text-[14px] justify-between items-center pb-3"
                                            onClick={() => toggleOpen("mostHundreds")}
                                        >
                                            <span className="flex items-center font-medium text-[#394351]">
                                                Most Hundreds in IPL
                                            </span>
                                            <span className="transform transition-transform ">
                                                <Image src="/assets/img/arrow.png" className="h-[7px]" width={10} height={15} alt="arrow" />
                                            </span>
                                        </button>
                                        {open.mostHundreds && (
                                            <div className="pl-8 py-2 space-y-2 font-normal text-[14px] text-[#51555E]">
                                                <p>Bangabandhu T20 C</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b mb-4">
                                        <button
                                            className="w-full flex text-[14px] justify-between items-center pb-3"
                                            onClick={() => toggleOpen("mostFifties")}
                                        >
                                            <span className="flex items-center font-medium text-[#394351]">
                                                Most Fifties in IPL
                                            </span>
                                            <span className="transform transition-transform ">
                                                <Image src="/assets/img/arrow.png" className="h-[7px]" width={10} height={15} alt="arrow" />
                                            </span>
                                        </button>
                                        {open.mostFifties && (
                                            <div className="pl-8 py-2 space-y-2 font-normal text-[14px] text-[#51555E]">
                                                <p className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-3 text-[#1A80F8] mr-1"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                    Bangabandhu T20 C
                                                </p>
                                                <p className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-3 text-[#1A80F8] mr-1"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                    Bangladesh Premier
                                                </p>
                                                <p className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-3 text-[#1A80F8] mr-1"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                    Bangladesh Tri-Series
                                                </p>
                                                <p className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-3 text-[#1A80F8] mr-1"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                    BCB Presidents Cup
                                                </p>
                                                <p className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-3 text-[#1A80F8] mr-1"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                    Dhaka Premier League
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b mb-4">
                                        <button
                                            className="w-full flex text-[14px] justify-between items-center pb-3"
                                            onClick={() => toggleOpen("mostDucks")}
                                        >
                                            <span className="flex items-center font-medium text-[#394351]">
                                                Most Ducks in IPL
                                            </span>
                                            <span className="transform transition-transform ">
                                                <Image src="/assets/img/arrow.png" className="h-[7px]" width={10} height={15} alt="arrow" />
                                            </span>
                                        </button>
                                        {open.mostDucks && (
                                            <div className="pl-8 py-2 space-y-2 font-normal text-[14px] text-[#51555E]">
                                                <p>Bangabandhu T20 C</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b mb-4">
                                        <button
                                            className="w-full flex text-[14px] justify-between items-center pb-3"
                                            onClick={() => toggleOpen("highestBattingAverage")}
                                        >
                                            <span className="flex items-center font-medium text-[#394351]">
                                                Highest Batting Average in IPL
                                            </span>
                                            <span className="transform transition-transform ">
                                                <Image src="/assets/img/arrow.png" className="h-[7px]" width={10} height={15} alt="arrow" />
                                            </span>
                                        </button>
                                        {open.highestBattingAverage && (
                                            <div className="pl-8 py-2 space-y-2 font-normal text-[14px] text-[#51555E]">
                                                <p>Bangabandhu T20 C</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b mb-4">
                                        <button
                                            className="w-full flex text-[14px] justify-between items-center pb-3"
                                            onClick={() => toggleOpen("highestScore")}
                                        >
                                            <span className="flex items-center font-medium text-[#394351]">
                                                Highest Individual Score in IPL
                                            </span>
                                            <span className="transform transition-transform ">
                                                <Image src="/assets/img/arrow.png" className="h-[7px]" width={10} height={15} alt="arrow" />
                                            </span>
                                        </button>
                                        {open.highestScore && (
                                            <div className="pl-8 py-2 space-y-2 font-normal text-[14px] text-[#51555E]">
                                                <p>Bangabandhu T20 C</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <button
                                            className="w-full flex text-[14px] justify-between items-center pb-3"
                                            onClick={() => toggleOpen("mostMatchesAsCaptain")}
                                        >
                                            <span className="flex items-center font-medium text-[#394351]">
                                                Most Matches as Captain in IPL
                                            </span>
                                            <span className="transform transition-transform ">
                                                <Image src="/assets/img/arrow.png" className="h-[7px]" width={10} height={15} alt="arrow" />
                                            </span>
                                        </button>
                                        {open.mostMatchesAsCaptain && (
                                            <div className="pl-8 py-2 space-y-2 font-normal text-[14px] text-[#51555E]">
                                                <p>Bangabandhu T20 C</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className=" pb-2 my-4">
                                <div className="py-2">
                                    <h3 className="text-1xl font-semibold pl-[3px] border-l-[3px] border-[#1a80f8]">
                                        POPULAR</h3>

                                </div>
                                <div className="">
                                    <Link href="/t20series">
                                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2">
                                            <div>
                                                <Image src="/assets/img/1.png" width={20} height={20} alt="1" />
                                            </div>
                                            <div className="font-medium text-[#394351]">
                                                ICC World cup
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/t20series">
                                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                            <div>
                                                <Image src="/assets/img/2.png" width={20} height={20} alt="1" />
                                            </div>
                                            <div className="font-medium text-[#394351]">
                                                ICC Champion Trophy
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/t20series">
                                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                            <div>
                                                <Image src="/assets/img/3.png" width={20} height={20} alt="1" />
                                            </div>
                                            <div className="font-medium text-[#394351]">
                                                T20 World Cup
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/t20series">
                                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                            <div>
                                                <Image src="/assets/img/4.png" width={20} height={20} alt="1" />
                                            </div>
                                            <div className="font-medium text-[#394351]">
                                                Indian Premium League
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/t20series">
                                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                            <div>
                                                <Image src="/assets/img/5.png" width={20} height={20} alt="1" />
                                            </div>
                                            <div className="font-medium text-[#394351]">
                                                Pakistan Super League
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/t20series">
                                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                            <div>
                                                <Image src="/assets/img/6.png" width={20} height={20} alt="1" />
                                            </div>
                                            <div className="font-medium text-[#394351]">
                                                Bangladesh Premium Leaguge
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/t20series">
                                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                            <div>
                                                <Image src="/assets/img/7.png" width={20} height={20} alt="1" />
                                            </div>
                                            <div className="font-medium text-[#394351]">
                                                Big Bash Leaguge
                                            </div>
                                        </div>
                                    </Link>
                                    <Link href="/t20series">
                                        <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3">
                                            <div>
                                                <Image src="/assets/img/8.png" width={20} height={20} alt="1" />
                                            </div>
                                            <div className="font-medium text-[#394351]">
                                                Super Smash
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                            </>
                            }

                            <div className=" my-4">
                                <div className="py-2 mb-2">
                                    <h3 className="text-1xl font-semibold pl-[3px] border-l-[3px] border-[#1a80f8]">
                                        Fantasy Tips
                                    </h3>
                                </div>
                                <div className="bg-[#ffffff] rounded-lg ">
                                    <div className="p-4">
                                        <Link href="#">
                                            <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                                                <p className="text-[13px] font-semibold">
                                                    NZ-W Vs WI-W Highlights: Eden Carson, Amelia Kerr Pummel
                                                    West Indies In Semis As NZ Set Date With SA
                                                </p>
                                                <p className="text-[#586577] pt-2">15 hrs ago</p>
                                            </div>
                                        </Link>
                                        <Link href="#">
                                            <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                                                <p className="text-[13px] font-semibold">
                                                    Probably Took Wrong Risk: Alyssa Healy Regrets Sitting Out
                                                    As SA Stuns AUS In T20 WC
                                                </p>
                                                <p className="text-[#586577] pt-2">17 hrs ago</p>
                                            </div>
                                        </Link>
                                        <Link href="#">
                                            <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                                                <p className="text-[13px] font-semibold">
                                                    Womens T20 World Cup, NZ vs WI: Unchanged New Zealand Opt
                                                    To Bat; Check Out The Playing XIs
                                                </p>
                                                <p className="text-[#586577] pt-2">19 hrs ago</p>
                                            </div>
                                        </Link>
                                        <Link href="#">
                                            <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                                                <p className="text-[13px] font-semibold">
                                                    SA Cricketers Get Emotional After Historic Win Against
                                                    Australia To Enter T20 World Cup 2024 Final - Watch
                                                </p>
                                                <p className="text-[#586577] pt-2">18 Oct 2024</p>
                                            </div>
                                        </Link>
                                        <Link href="#">
                                            <div className=" pb-2 mb-2">
                                                <p className="text-[13px] font-semibold">
                                                    Probably Took Wrong Risk: Alyssa Healy Regrets Sitting Out
                                                    As SA Stuns AUS In T20 WC
                                                </p>
                                                <p className="text-[#586577] pt-2">18 Oct 2024</p>
                                            </div>
                                        </Link>
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