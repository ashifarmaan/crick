"use client";

import React, { useState, useEffect } from "react";
import WeeklySlider from "@/app/components/WeeklySlider";
import Link from "next/link";
import Image from "next/image";
import { urlStringEncode } from "../../../utils/utility";
import { format, isSameDay } from "date-fns";
import CountdownTimer from "../../components/countdownTimer";

interface ScheduleResults {
  urlString: string;
  seriesMatches: any;
  statsType: string;
}
export default function ScheduleResults({
  urlString,
  seriesMatches,
  statsType,
}: ScheduleResults) {
   

  let completedMatch = seriesMatches.resultMatch;
  let liveMatch = seriesMatches.liveMatch;
  let upcomingMatch = seriesMatches.scheduledMatch;


  useEffect(() => {
      const elements = document.querySelectorAll("#all-tab, #live-tab, #completed-tab, #upcoming-tab");
  
      // Ensure elements exist before adding event listeners
      if (elements.length === 0) {
        console.error("Tabs not found in the DOM!");
        return;
      }
  
      function handleClick(event: Event) {
        const target = event.target as HTMLElement;
        console.log("Clicked ID:", target.id);
  
        // Remove active styles from all tabs
        document.querySelectorAll("#all-tab, #live-tab, #completed-tab, #upcoming-tab").forEach((el) => {
          el.classList.remove("bg-[#1A80F8]", "text-white");
        });
  
        // Add active style to clicked tab
        target.classList.add("bg-[#1A80F8]", "text-white");
  
        // Hide all sections initially
        document.querySelectorAll(".liveMatch, .completedMatch, .upcomingMatch").forEach((el) => {
          el.classList.add("hidden");
        });
  
        // Show only the relevant section
        const sectionMap: Record<string, string> = {
          "live-tab": ".liveMatch",
          "completed-tab": ".completedMatch",
          "upcoming-tab": ".upcomingMatch",
          "all-tab": ".liveMatch, .completedMatch, .upcomingMatch",
        };
  
        if (sectionMap[target.id]) {
          document.querySelectorAll(sectionMap[target.id]).forEach((el) => el.classList.remove("hidden"));
        }
      }
  
      // Add event listeners
      elements.forEach((element) => element.addEventListener("click", handleClick));
  
      if(statsType === 'schedule'){
        const upcomingTab = document.querySelector("#upcoming-tab") as HTMLElement;
        if (upcomingTab) {
          upcomingTab.click();
        } 
      }
      // Cleanup function to remove event listeners when component unmounts
      return () => {
        elements.forEach((element) => element.removeEventListener("click", handleClick));
      };
    }, []); // Run only once when component mounts
  
    const [activeMainTab, setActiveMainTab] = useState("info1");

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
            <button className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white rounded-md">
              Schedule & Results
            </button>
          </Link>
          <Link href={urlString + "/squads"}>
            <button className="font-medium py-2 px-3 whitespace-nowrap ">
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
      <div id="live" className="">
        <div className="md:grid grid-cols-12 gap-4">
          <div className="lg:col-span-8 md:col-span-7">
            <div className="rounded-lg bg-[#ffffff] p-4 mb-4">
              <div className="flex space-x-4">
              <button  id="all-tab"
                      className={`font-medium py-2 px-5 whitespace-nowrap ${
                        activeMainTab === "info1"
                          ? "bg-[#1A80F8] text-white"
                          : ""
                      } rounded-md`}
                    >
                      All
                    </button>
                  
                    <button id="live-tab"
                      className={`font-medium py-2 px-5 whitespace-nowrap ${
                        activeMainTab === "live1"
                          ? "bg-[#1A80F8] text-white"
                          : ""
                      } rounded-md`}
                    >
                      Live
                    </button>
                  
                    <button  id="completed-tab"
                      className={`font-medium py-2 px-5 whitespace-nowrap ${
                        activeMainTab === "finished1"
                          ? "bg-[#1A80F8] text-white"
                          : ""
                      } rounded-md`}
                    >
                      Finished
                    </button>
                  
                    <button  id="upcoming-tab"
                      className={`font-medium py-2 px-5 whitespace-nowrap ${
                        activeMainTab === "scorecard1"
                          ? "bg-[#1A80F8] text-white"
                          : ""
                      } rounded-md`}
                    >
                      Scheduled
                    </button>
              </div>
            </div>
            <div className="tab-content-container">
              <div
                id="info1"
                className={`tab-content ${
                  activeMainTab === "info1" ? "" : "hidden"
                }`}
              >
                {/* <!-- live match desktop view start --> */}
                <div className="liveMatch">
                  {liveMatch.map((items:any, index: number) => (
                    <div key={index}>
                      <div
                        data-key={items.match_id}
                        data-id="aaa"
                        className="lg:block hidden rounded-lg p-4 mb-4 bg-[#ffffff] hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className="flex items-center text-[#A70B0B] rounded-full pr-3  font-semibold"
                              style={{ gap: "3px" }}
                            >
                              <span className="rounded-full">
                                <svg className="h-[10px] w-[11px]">
                                  <circle
                                    fill="#ff0000"
                                    stroke="none"
                                    cx="5"
                                    cy="5"
                                    r="5"
                                  >
                                    <animate
                                      attributeName="opacity"
                                      dur="1s"
                                      values="0;1;0"
                                      repeatCount="indefinite"
                                      begin="0.1"
                                    />
                                  </circle>
                                </svg>
                              </span>{" "}
                              {items.status_str}
                            </div>
                            <div>
                              <h4 className="text-[15px] font-semibold pl-[15px] border-l-[1px] border-[#E4E9F0]">
                                {items.competition.title} -{" "}
                                {items.competition.season}
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[13px] font-medium">
                              {items.teama.short_name}
                            </span>
                            <span className="flex items-center bg-[#FAFFFC] border-[1px] border-[#0B773C] rounded-full text-[#0B773C] pr-2">
                              <span className="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-[14px] w-[17px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                                  />
                                </svg>
                              </span>
                              <span className={"oddback" + items.match_id}>
                                0
                              </span>
                            </span>
                            <span className="flex items-center bg-[#FFF7F7] border-[1px] border-[#A70B0B]  rounded-full text-[#A70B0B] pr-2">
                              <span className="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-[14px] w-[17px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                                  />
                                </svg>
                              </span>
                              <span className={"oddlay" + items.match_id}>
                                0
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <div className="py-4 px-3">
                          <Link
                            href={
                              "/live-score/" +
                              urlStringEncode(
                                items?.teama?.short_name +
                                  "-vs-" +
                                  items?.teamb?.short_name +
                                  "-match-" +
                                  items?.match_number +
                                  "-" +
                                  items?.competition?.title
                              ) +
                              "/" +
                              items.match_id
                            }
                          >
                            <div className="flex justify-between items-center text-[14px]">
                              <div className="">
                                <p className="text-[#586577] text-[12px] mb-4 font-medium">
                                  {items.subtitle} ,{items.format_str} 
                                  {items.venue.name}, {items.venue.location}
                                </p>
                                <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-4">
                                  <div className="flex items-center space-x-2">
                                    <Image
                                      src={items.teama.logo_url}
                                      className="h-[30px] rounded-full"
                                      width={30}
                                      height={30}
                                      alt={items.teama.short_name}
                                    />
                                    <span className="text-[#909090] font-semibold">
                                      {items.teama.short_name} -{" "}
                                    </span>
                                  </div>
                                  <p
                                    className={
                                      "flex items-center gap-[1px] match" +
                                      items.match_id +
                                      "-" +
                                      items.teama.team_id
                                    }
                                  >
                                    {items.teama.scores === undefined ||
                                    items.teama.scores === null ||
                                    items.teama.scores === "" ? (
                                      <span className="font-semibold">
                                        {" "}
                                        (Yet to bat){" "}
                                      </span>
                                    ) : (
                                      <>
                                        <span className="font-semibold">
                                          {items.teama.scores}
                                        </span>
                                        <span className="text-[#909090] text-[13px]">
                                          {" "}
                                          ({items.teama.overs}){" "}
                                        </span>
                                      </>
                                    )}
                                  </p>
                                </div>

                                <div>
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                    <div className="flex items-center space-x-2">
                                      <Image
                                        src={items.teamb.logo_url}
                                        className="h-[30px]"
                                        width={30}
                                        height={30}
                                        alt={items.teamb.short_name}
                                      />
                                      <span className="text-[#909090] font-semibold">
                                        {items.teamb.short_name} -
                                      </span>
                                    </div>
                                    <p
                                      className={
                                        "flex items-center gap-[1px] match" +
                                        items.match_id +
                                        "-" +
                                        items.teamb.team_id
                                      }
                                    >
                                      {items.teamb.scores === undefined ||
                                      items.teamb.scores === null ||
                                      items.teamb.scores === "" ? (
                                        <span className="font-semibold">
                                          {" "}
                                          (Yet to bat){" "}
                                        </span>
                                      ) : (
                                        <>
                                          <span className="font-semibold">
                                            {items.teamb.scores}
                                          </span>
                                          <span className="text-[#909090] text-[13px]">
                                            {" "}
                                            ({items.teamb.overs}){" "}
                                          </span>
                                        </>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className=" font-medium text-center">
                                <p
                                  className={
                                    "text-[#2F335C] text-[14px] statusNote" +
                                    items.match_id
                                  }
                                  style={{
                                    whiteSpace: "break-word",
                                    width: "200px",
                                  }}
                                >
                                  {items.status_note}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <div className="flex items-center justify-between space-x-5 mt-3">
                          <div className="flex items-center">
                            <Link
                              href={
                                "/points-table/" +
                                urlStringEncode(
                                  items?.teama?.short_name +
                                    "-vs-" +
                                    items?.teamb?.short_name +
                                    "-match-" +
                                    items?.match_number +
                                    "-" +
                                    items?.competition?.title
                                ) +
                                "/" +
                                items.match_id
                              }
                            >
                              <p className=" text-[#909090] font-medium">
                                {" "}
                                Points Table
                              </p>
                            </Link>
                            <div className="h-[20px] border-l-[1px] mx-5 border-[#d0d3d7]"></div>
                            <Link href="#">
                              <p className="text-[#909090] font-medium">
                                Schedule
                              </p>
                            </Link>
                          </div>

                          <Link href="/h2h">
                            <div className="flex mt-2 justify-end items-center space-x-2">
                              <Image
                                src="/assets/img/home/handshake.png"
                                width={30}
                                height={30}
                                alt=""
                              />
                              <span className="text-[#909090] font-medium">
                                H2H
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* mobile */}

                      <div className="lg:hidden rounded-lg p-4 mb-4 bg-[#ffffff] performance-section relative hover:shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center text-[#a70b0b] rounded-full font-semibold">
                              <span className="rounded-full">
                                <svg className="h-[8px] w-[10px]">
                                  <circle
                                    fill="#ff0000"
                                    stroke="none"
                                    cx="3"
                                    cy="3"
                                    r="3"
                                  >
                                    <animate
                                      attributeName="opacity"
                                      dur="1s"
                                      values="0;1;0"
                                      repeatCount="indefinite"
                                      begin="0.1"
                                    />
                                  </circle>
                                </svg>
                              </span>
                              {items.status_str}
                            </div>
                            <div>
                              <h4 className="text-[15px] font-semibold pl-[10px] border-l-[1px] border-[#E4E9F0]">
                                {items.competition.title} -{" "}
                                {items.competition.season}
                              </h4>
                            </div>
                            <span className="absolute right-4 top-[19px]">
                              <button className="arro-button">
                                <Image
                                  src="/assets/img/arrow.png"
                                  className=""
                                  width={10}
                                  height={15}
                                  alt=""
                                />
                              </button>
                            </span>
                          </div>
                        </div>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <div className="open-Performance-data">
                          <Link
                            href={
                              "/live-score/" +
                              urlStringEncode(
                                items?.teama?.short_name +
                                  "-vs-" +
                                  items?.teamb?.short_name +
                                  "-match-" +
                                  items?.match_number +
                                  "-" +
                                  items?.competition?.title
                              ) +
                              "/" +
                              items.match_id
                            }
                          >
                            <div className="py-2 pb-3">
                              <p className="text-[#586577] text-[11px] mb-4 font-normal">
                                {items.subtitle} ,{items.format_str} 
                                {items.venue.name}, {items.venue.location}
                              </p>
                              <div className="flex justify-between items-center text-[14px]">
                                <div className="">
                                  <div className="items-center space-x-2 font-medium w-[162px] md:w-full mb-4">
                                    <div className="flex items-center space-x-2">
                                      <Image
                                        src={items.teama.logo_url}
                                        className="h-[30px] rounded-full"
                                        width={30}
                                        height={30}
                                        alt={items.teama.short_name}
                                      />
                                      <div>
                                        <span className="flex items-center gap-1">
                                          <span className="text-[#5e5e5e] font-medium">
                                            {items.teama.short_name}
                                          </span>
                                          <Image
                                            src="/assets/img/home/bat.png"
                                            className="h-[15px]"
                                            width={30}
                                            height={30}
                                            alt=""
                                          />
                                        </span>

                                        <p
                                          className={
                                            "flex items-center gap-2 match" +
                                            items.match_id +
                                            "-" +
                                            items.teama.team_id
                                          }
                                        >
                                          {items.teama.scores === undefined ||
                                          items.teama.scores === null ||
                                          items.teama.scores === "" ? (
                                            <span className="font-semibold">
                                              {" "}
                                              (Yet to bat){" "}
                                            </span>
                                          ) : (
                                            <>
                                              <span className="font-semibold">
                                                {items.teama.scores}
                                              </span>
                                              <span className="text-[#909090] text-[12px]">
                                                {" "}
                                                ({items.teama.overs}){" "}
                                              </span>
                                            </>
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-2">
                                        <Image
                                          src={items.teamb.logo_url}
                                          className="h-[30px]"
                                          width={30}
                                          height={30}
                                          alt={items.teamb.short_name}
                                        />
                                        <div>
                                          <span className="text-[#5e5e5e] font-medium">
                                            {items.teamb.short_name}
                                          </span>
                                          <p
                                            className={
                                              "font-normal text-[11px] match" +
                                              items.match_id +
                                              "-" +
                                              items.teamb.team_id
                                            }
                                          >
                                            {items.teamb.scores === undefined ||
                                            items.teamb.scores === null ||
                                            items.teamb.scores === "" ? (
                                              <span className="font-semibold">
                                                {" "}
                                                (Yet to bat){" "}
                                              </span>
                                            ) : (
                                              <>
                                                <span className="font-semibold">
                                                  {items.teamb.scores}
                                                </span>
                                                <span className="text-[#909090] text-[12px]">
                                                  {" "}
                                                  ({items.teamb.overs}){" "}
                                                </span>
                                              </>
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className=" font-medium text-center">
                                  <p
                                    className={
                                      "text-[#2F335C] font-light mt-1 text-[11px]  statusNote" +
                                      items.match_id
                                    }
                                  >
                                    {items.status_note}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>

                          <div className="border-t-[1px] border-[#E7F2F4]"></div>

                          <div className="flex items-center justify-between space-x-5 mt-2">
                            <div className="flex items-center">
                              <Link
                                href={
                                  "/points-table/" +
                                  urlStringEncode(
                                    items?.teama?.short_name +
                                      "-vs-" +
                                      items?.teamb?.short_name +
                                      "-match-" +
                                      items?.match_number +
                                      "-" +
                                      items?.competition?.title
                                  ) +
                                  "/" +
                                  items.match_id
                                }
                              >
                                <p className=" text-[#909090] text-[11px] font-medium">
                                  {" "}
                                  Points Table
                                </p>
                              </Link>

                              <div className="h-[20px] border-l-[1px] mx-5 border-[#d0d3d7]"></div>
                              <Link href="#">
                                <div className="flex justify-end items-center space-x-2">
                                  <Image
                                    src="/assets/img/home/handshake.png"
                                    className="h-[15px]"
                                    width={30}
                                    height={30}
                                    alt=""
                                  />
                                  <span className="text-[#909090] text-[11px] font-medium">
                                    H2H
                                  </span>
                                </div>
                              </Link>
                            </div>

                            <div className="flex items-center space-x-2 text-[11px]">
                              <span className="text-[#909090] font-medium">
                                {items.teama.short_name}
                              </span>
                              <span className="flex items-center bg-[#FAFFFC] border-[1px] border-[#0B773C] rounded-md text-[#0B773C] pr-2">
                                <span className="">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-[14px] w-[17px]"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                                    />
                                  </svg>
                                </span>
                                <span className={"oddback" + items.match_id}>
                                  0
                                </span>
                              </span>
                              <span className="flex items-center bg-[#FFF7F7] border-[1px] border-[#A70B0B]  rounded-md text-[#A70B0B] pr-2">
                                <span className="">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-[14px] w-[17px]"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                                    />
                                  </svg>
                                </span>
                                <span className={"oddlay" + items.match_id}>
                                  0
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="completedMatch">
                  {completedMatch.map((cmatch: any, index: number) => (
                    <div key={index}>
                      <div className="lg:block hidden rounded-lg p-4 mb-4 bg-[#ffffff] hover:shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className="flex items-center text-[#0B773C] rounded-full pr-3  font-semibold"
                              style={{ gap: "3px" }}
                            >
                              <span className="rounded-full">●</span>{" "}
                              {cmatch.status_str}
                            </div>
                            <div>
                              <h4 className="text-[15px] font-semibold pl-[15px] border-l-[1px] border-[#E4E9F0]">
                                {cmatch.competition.title} -{" "}
                                {cmatch.competition.season}
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2  font-medium">
                            <span className="text-[13px]">AUS</span>
                            <span className="flex items-center bg-[#FAFFFC] border-[1px] border-[#0B773C] rounded-full text-[#0B773C] pr-2">
                              <span className="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-[14px] w-[17px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                                  />
                                </svg>
                              </span>
                              37
                            </span>
                            <span className="flex items-center bg-[#FFF7F7] border-[1px] border-[#A70B0B]  rounded-full text-[#A70B0B] pr-2">
                              <span className="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-[14px] w-[17px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                                  />
                                </svg>
                              </span>
                              40
                            </span>
                          </div>
                        </div>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <div className="py-4 px-3">
                          <div className="flex justify-between items-center text-[14px]">
                            <Link
                              href={
                                "/scorecard/" +
                                urlStringEncode(
                                  cmatch?.teama?.short_name +
                                    "-vs-" +
                                    cmatch?.teamb?.short_name +
                                    "-match-" +
                                    cmatch?.match_number +
                                    "-" +
                                    cmatch?.competition?.title
                                ) +
                                "/" +
                                cmatch.match_id
                              }
                            >
                              <div className="">
                                <p className="text-[#586577] text-[12px] mb-4 font-medium">
                                  {cmatch.subtitle} ,{cmatch.format_str} 
                                  {cmatch.venue.name}, {cmatch.venue.location}
                                </p>
                                <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-4">
                                  <div className="flex items-center space-x-2">
                                    <Image
                                      src={cmatch.teama.logo_url}
                                      className="h-[30px] rounded-full"
                                      width={30}
                                      height={30}
                                      alt={cmatch.teama.short_name}
                                    />
                                    <span className="text-[#909090] font-semibold">
                                      {cmatch.teama.short_name} -{" "}
                                    </span>
                                  </div>
                                  <p>
                                    <span className=" font-semibold">
                                      {cmatch.teama.scores}
                                    </span>
                                    <span className="text-[#909090] text-[13px]">
                                      {" "}
                                      ({cmatch.teama.overs})
                                    </span>
                                  </p>
                                </div>

                                <div>
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                    <div className="flex items-center space-x-2">
                                      <Image
                                        src={cmatch.teamb.logo_url}
                                        className="h-[30px]"
                                        width={30}
                                        height={30}
                                        alt={cmatch.teamb.short_name}
                                      />
                                      <span className="text-[#909090] font-semibold">
                                        {cmatch.teamb.short_name} -{" "}
                                      </span>
                                    </div>
                                    <p>
                                      <span className=" font-semibold">
                                        {cmatch.teamb.scores}
                                      </span>
                                      <span className="text-[#909090] text-[13px]">
                                        ({cmatch.teamb.overs})
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                            <div className="h-[100px] border-l-[1px] border-[#d0d3d7]"></div>

                            <Link
                              href={
                                "/scorecard/" +
                                urlStringEncode(
                                  cmatch?.teama?.short_name +
                                    "-vs-" +
                                    cmatch?.teamb?.short_name +
                                    "-match-" +
                                    cmatch?.match_number +
                                    "-" +
                                    cmatch?.competition?.title
                                ) +
                                "/" +
                                cmatch.match_id
                              }
                            >
                              <div className=" font-semibold flex flex-col items-center">
                                <Image
                                  src="/assets/img/home/win.png"
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                <p className="text-[#0B773C] text-1xl w-[75%] text-center">
                                  {cmatch.result}
                                </p>
                              </div>
                            </Link>

                            <div className="h-[100px] border-l-[1px] border-[#d0d3d7]"></div>

                            <div className="flex flex-col items-center">
                              <Image
                                src="/assets/img/player-2.png"
                                width={40}
                                height={40}
                                alt=""
                              />

                              <p className=" font-semibold">Adam Zampa</p>
                              <p>Man of the match</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Mobile */}

                      <div className="lg:hidden rounded-lg p-4 mb-4 bg-[#ffffff] performance-section relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div
                              className="flex items-center text-[#0B773C] rounded-full  font-semibold"
                              style={{ gap: "3px" }}
                            >
                              <span className="rounded-full">●</span>{" "}
                              {cmatch.status_str}
                            </div>
                            <div>
                              <h4 className="text-[15px] font-semibold pl-[10px] border-l-[1px] border-[#E4E9F0]">
                                {cmatch.competition.title} -{" "}
                                {cmatch.competition.season}
                              </h4>
                            </div>
                            <span className="absolute right-4 top-[19px]">
                              <button className="arro-button">
                                <Image
                                  src="/assets/img/arrow.png"
                                  className=""
                                  width={10}
                                  height={15}
                                  alt=""
                                />
                              </button>
                            </span>
                          </div>
                        </div>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <div className="open-Performance-data">
                          <Link
                            href={
                              "/scorecard/" +
                              urlStringEncode(
                                cmatch?.teama?.short_name +
                                  "-vs-" +
                                  cmatch?.teamb?.short_name +
                                  "-match-" +
                                  cmatch?.match_number +
                                  "-" +
                                  cmatch?.competition?.title
                              ) +
                              "/" +
                              cmatch.match_id
                            }
                          >
                            <div className="py-2 pb-3">
                              <p className="text-[#586577] text-[11px] mb-4 font-normal">
                                {cmatch.subtitle} ,{cmatch.format_str} 
                                {cmatch.venue.name}, {cmatch.venue.location}
                              </p>
                              <div className="flex justify-between items-center text-[14px]">
                                <div className="">
                                  <div className="items-center space-x-2 font-medium w-[162px] md:w-full mb-4">
                                    <div className="flex items-center space-x-2">
                                      <Image
                                        src={cmatch.teama.logo_url}
                                        className="h-[30px] rounded-full"
                                        width={30}
                                        height={30}
                                        alt={cmatch.teama.short_name}
                                      />
                                      <div>
                                        <span className="flex items-center gap-1">
                                          <span className="text-[#5e5e5e] font-medium">
                                            {cmatch.teama.short_name}
                                          </span>
                                        </span>
                                        <p className="flex items-end gap-2">
                                          <span className=" font-semibold">
                                            {cmatch.teama.scores}
                                          </span>

                                          <span className="text-[#909090] text-[12px] font-normal">
                                            ({cmatch.teama.overs})
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                      <div className="flex items-center space-x-2">
                                        <Image
                                          src={cmatch.teamb.logo_url}
                                          className="h-[30px] rounded-full"
                                          width={30}
                                          height={30}
                                          alt={cmatch.teamb.short_name}
                                        />
                                        <div>
                                          <span className="flex items-center gap-1">
                                            <span className="text-[#5e5e5e] font-medium">
                                              {cmatch.teamb.short_name}
                                            </span>
                                          </span>
                                          <p className="flex items-end gap-2">
                                            <span className=" font-semibold">
                                              {cmatch.teamb.scores}
                                            </span>

                                            <span className="text-[#909090] text-[12px] font-normal">
                                              ({cmatch.teama.overs})
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* <!-- <div className="h-[100px] border-l-[1px] border-[#d0d3d7]"></div> --> */}

                                <div className=" font-semibold flex flex-col items-center">
                                  <Image
                                    src="/assets/img/home/win.png"
                                    width={30}
                                    height={30}
                                    alt=""
                                  />
                                  <p className="text-[#0B773C] font-semibold mt-1 text-[13px] w-[75%] text-center">
                                    {cmatch.result}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>

                          <div className="border-t-[1px] border-[#E7F2F4]"></div>

                          <div className="flex items-center justify-between space-x-5 mt-2">
                            <div className="flex items-center">
                              <Link
                                href={
                                  "/points-table/" +
                                  urlStringEncode(
                                    cmatch?.teama?.short_name +
                                      "-vs-" +
                                      cmatch?.teamb?.short_name +
                                      "-match-" +
                                      cmatch?.match_number +
                                      "-" +
                                      cmatch?.competition?.title
                                  ) +
                                  "/" +
                                  cmatch.match_id
                                }
                              >
                                <p className=" text-[#909090] text-[11px] font-medium">
                                  {" "}
                                  Points Table
                                </p>
                              </Link>

                              <div className="h-[20px] border-l-[1px] mx-5 border-[#d0d3d7]"></div>
                              <Link href="#">
                                <div className="flex justify-end items-center space-x-2">
                                  <Image
                                    src="/assets/img/home/handshake.png"
                                    className="h-[15px]"
                                    width={30}
                                    height={30}
                                    alt=""
                                  />
                                  <span className="text-[#909090] text-[11px] font-medium">
                                    H2H
                                  </span>
                                </div>
                              </Link>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Image
                                  src="/assets/img/player-2.png"
                                  className="h-[32px]"
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                <div>
                                  <p className=" font-semibold">Adam Zampa</p>
                                  <p className="text-[11px]">
                                    Man of the match
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="upcomingMatch">
                  {upcomingMatch.map((ucmatch: any, index: number) => (
                    <div key={index}>
                      <div className="lg:block hidden rounded-lg p-4 mb-4 bg-[#ffffff] hover:shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className="flex items-center text-[#A45B09] rounded-full pr-3  font-semibold"
                              style={{ gap: "3px" }}
                            >
                              <span className="rounded-full">●</span>{" "}
                              {ucmatch.status_str}
                            </div>
                            <div>
                              <h4 className="text-[15px] font-semibold pl-[15px] border-l-[1px] border-[#E4E9F0]">
                                {ucmatch.competition.title} -{" "}
                                {ucmatch.competition.season}
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[13px] font-medium">AUS</span>
                            <span className="flex items-center bg-[#FAFFFC] border-[1px] border-[#0B773C] rounded-full text-[#0B773C] pr-2">
                              <span className="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-[14px] w-[17px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                                  />
                                </svg>
                              </span>
                              41
                            </span>
                            <span className="flex items-center bg-[#FFF7F7] border-[1px] border-[#A70B0B]  rounded-full text-[#A70B0B] pr-2">
                              <span className="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-[14px] w-[17px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                                  />
                                </svg>
                              </span>
                              45
                            </span>
                          </div>
                        </div>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link
                          href={
                            "/moreinfo/" +
                            urlStringEncode(
                              ucmatch?.teama?.short_name +
                                "-vs-" +
                                ucmatch?.teamb?.short_name +
                                "-match-" +
                                ucmatch?.match_number +
                                "-" +
                                ucmatch?.competition?.title
                            ) +
                            "/" +
                            ucmatch.match_id
                          }
                        >
                          <div className="py-4 px-3">
                            <div className="flex justify-between items-center text-[14px]">
                              <div className="">
                                <p className="text-[#586577] text-[12px] mb-4 font-medium">
                                  {ucmatch.subtitle} ,{ucmatch.format_str} 
                                  {ucmatch.venue.name}, {ucmatch.venue.location}
                                </p>
                                <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-4">
                                  <div className="flex items-center space-x-2">
                                    <Image
                                      src={ucmatch.teama.logo_url}
                                      className="h-[30px] rounded-full"
                                      width={30}
                                      height={30}
                                      alt={ucmatch.teama.short_name}
                                    />
                                    <span className="font-semibold">
                                      {ucmatch.teama.short_name}
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                    <div className="flex items-center space-x-2">
                                      <Image
                                        src={ucmatch.teamb.logo_url}
                                        className="h-[30px]"
                                        width={30}
                                        height={30}
                                        alt={ucmatch.teamb.short_name}
                                      />
                                      <span className="font-semibold">
                                        {ucmatch.teamb.short_name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="font-semibold text-center">
                                <div className="text-[#144280]">
                                  <div className=" font-medium text-center">
                                    {isSameDay(
                                      new Date(),
                                      new Date(ucmatch.date_start_ist)
                                    ) ? (
                                      <CountdownTimer
                                        targetTime={ucmatch.date_start_ist}
                                      />
                                    ) : (
                                      <p className="text-[#2F335C] text-[14px]">
                                        {format(
                                          new Date(ucmatch.date_start_ist),
                                          "dd MMMM - EEEE"
                                        )}
                                        , <br />
                                        {format(
                                          new Date(ucmatch.date_start_ist),
                                          "hh:mm:aa"
                                        )}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <div className="flex items-center justify-between space-x-5 mt-3">
                          <div className="flex items-center">
                            <Link
                              href={
                                "/points-table/" +
                                urlStringEncode(
                                  ucmatch?.teama?.short_name +
                                    "-vs-" +
                                    ucmatch?.teamb?.short_name +
                                    "-match-" +
                                    ucmatch?.match_number +
                                    "-" +
                                    ucmatch?.competition?.title
                                ) +
                                "/" +
                                ucmatch.match_id
                              }
                            >
                              <p className=" text-[#909090] font-medium">
                                {" "}
                                Points Table
                              </p>
                            </Link>
                            <div className="h-[20px] border-l-[1px] mx-5 border-[#d0d3d7]"></div>
                            <Link href="#">
                              <p className="text-[#909090] font-medium">
                                Schedule
                              </p>
                            </Link>
                          </div>

                          <Link href="#">
                            <div className="flex mt-2 justify-end items-center space-x-2">
                              <Image
                                src="/assets/img/home/handshake.png"
                                width={30}
                                height={30}
                                alt=""
                              />
                              <span className="text-[#909090] font-medium">
                                H2H
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="lg:hidden rounded-lg p-4 mb-4 bg-[#ffffff] performance-section relative hover:shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div
                              className="flex items-center text-[#A45B09] rounded-full font-semibold"
                              style={{ gap: "3px" }}
                            >
                              <span className="rounded-full">●</span>{" "}
                              {ucmatch.status_str}
                            </div>
                            <div>
                              <h4 className="text-[15px] font-semibold pl-[10px] border-l-[1px] border-[#E4E9F0]">
                                {ucmatch.competition.title} -{" "}
                                {ucmatch.competition.season}
                              </h4>
                            </div>
                            <span className="absolute right-[12px] top-[19px]">
                              <button className="arro-button">
                                <Image
                                  src="/assets/img/arrow.png"
                                  className=""
                                  width={10}
                                  height={15}
                                  alt=""
                                />
                              </button>
                            </span>
                          </div>
                        </div>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link
                          href={
                            "/moreinfo/" +
                            urlStringEncode(
                              ucmatch?.teama?.short_name +
                                "-vs-" +
                                ucmatch?.teamb?.short_name +
                                "-match-" +
                                ucmatch?.match_number +
                                "-" +
                                ucmatch?.competition?.title
                            ) +
                            "/" +
                            ucmatch.match_id
                          }
                        >
                          <div className="open-Performance-data">
                            <div className="py-2 pb-3">
                              <p className="text-[#586577] text-[12px] mb-4 font-medium">
                                {ucmatch.subtitle} ,{ucmatch.format_str} 
                                {ucmatch.venue.name}, {ucmatch.venue.location}
                              </p>
                              <div className="flex justify-between items-center text-[14px]">
                                <div>
                                  <div className="items-center space-x-2 font-medium w-[162px] md:w-full mb-4">
                                    <div className="flex items-center space-x-2">
                                      <Image
                                        src={ucmatch.teama.logo_url}
                                        className="h-[30px] rounded-full"
                                        width={30}
                                        height={30}
                                        alt={ucmatch.teama.short_name}
                                      />
                                      <div>
                                        <span className="flex items-center gap-1">
                                          <span className="text-[#5e5e5e] font-medium">
                                            {ucmatch.teama.short_name}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                    <div className="flex items-center space-x-2">
                                      <Image
                                        src={ucmatch.teamb.logo_url}
                                        className="h-[30px] rounded-full"
                                        width={30}
                                        height={30}
                                        alt={ucmatch.teamb.short_name}
                                      />
                                      <div>
                                        <span className="flex items-center gap-1">
                                          <span className="text-[#5e5e5e] font-medium">
                                            {ucmatch.teamb.short_name}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="font-semibold text-center">
                                  <div className="text-[#144280] mt-1">
                                    <div
                                      className="flex space-x-1 justify-center countdown"
                                      data-time="28800"
                                    >
                                      {/* <!-- 08:00:00 = 8 * 60 * 60 = 28800 seconds --> */}
                                      <div className="flex flex-col items-center">
                                        <div className="text-[16px]">
                                          <span className="hours"></span>
                                        </div>
                                        <span className="text-[11px] font-normal">
                                          {" "}
                                          Hrs{" "}
                                        </span>
                                      </div>
                                      <div>:</div>
                                      <div className="flex flex-col items-center">
                                        <div className="text-[16px]">
                                          <span className="minutes"></span>
                                        </div>
                                        <span className="text-[11px] font-normal">
                                          {" "}
                                          Min{" "}
                                        </span>
                                      </div>
                                      <div>:</div>
                                      <div className="flex flex-col items-center">
                                        <div className="text-[16px] seconds"></div>
                                        <span className="text-[11px] font-normal">
                                          {" "}
                                          Sec{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <div className="flex items-center justify-between space-x-5 mt-2">
                          <div className="flex items-center">
                            <Link
                              href={
                                "/points-table/" +
                                urlStringEncode(
                                  ucmatch?.teama?.short_name +
                                    "-vs-" +
                                    ucmatch?.teamb?.short_name +
                                    "-match-" +
                                    ucmatch?.match_number +
                                    "-" +
                                    ucmatch?.competition?.title
                                ) +
                                "/" +
                                ucmatch.match_id
                              }
                            >
                              <p className="text-[#909090] text-[11px] font-medium">
                                Points Table
                              </p>
                            </Link>
                            <div className="h-[20px] border-l-[1px] mx-5 border-[#d0d3d7]"></div>
                            <Link href="#">
                              <div className="flex justify-end items-center space-x-2">
                                <Image
                                  src="/assets/img/home/handshake.png"
                                  className="h-[15px]"
                                  width={30}
                                  height={30}
                                  alt=""
                                />
                                <span className="text-[#909090] text-[11px] font-medium">
                                  H2H
                                </span>
                              </div>
                            </Link>
                          </div>

                          <div className="flex items-center space-x-2 text-[11px]">
                            <span className="text-[#909090] font-medium">
                              BAN
                            </span>
                            <span className="flex items-center bg-[#FAFFFC] border-[1px] border-[#0B773C] rounded-md text-[#0B773C] pr-2">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-[14px] w-[17px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                                  ></path>
                                </svg>
                              </span>
                              41
                            </span>
                            <span className="flex items-center bg-[#FFF7F7] border-[1px] border-[#A70B0B] rounded-md text-[#A70B0B] pr-2">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-[14px] w-[17px]"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                                  ></path>
                                </svg>
                              </span>
                              45
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:hidden rounded-lg p-4 mb-4 bg-[#ffffff] performance-section relative hover:shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className="flex items-center text-[#A45B09] rounded-full font-semibold"
                        style={{ gap: "3px" }}
                      >
                        <span className="rounded-full">●</span> SCHEDULED
                      </div>
                      <div>
                        <h4 className="text-[15px] font-semibold pl-[10px] border-l-[1px] border-[#E4E9F0]">
                          Australia tour of England 2024
                        </h4>
                      </div>
                      <span className="absolute right-[12px] top-[19px]">
                        <button className="arro-button">
                          <Image
                            src="/assets/img/arrow.png"
                            className=""
                            width={10}
                            height={15}
                            alt=""
                          />
                        </button>
                      </span>
                    </div>
                  </div>

                  <div className="border-t-[1px] border-[#E7F2F4]"></div>

                  <div className="open-Performance-data">
                    <Link href="/scheduled/infoUpcoming-match">
                      <div className="py-2 pb-3">
                        <p className="text-[#586577] text-[12px] mb-4 font-medium">
                          2nd ODI , Sharjah Cricket Stadium, Sharjah
                        </p>
                        <div className="flex justify-between items-center text-[14px]">
                          <div className="">
                            <div className="items-center space-x-2 font-medium w-[162px] md:w-full mb-4">
                              <div className="flex items-center space-x-2">
                                <Image
                                  src="/assets/img/afg.png"
                                  className="h-[30px] rounded-full"
                                  width={30}
                                  height={30}
                                  alt="aus"
                                />
                                <div>
                                  <span className="flex items-center gap-1">
                                    <span className="text-[#5e5e5e] font-medium">
                                      Afghanistan
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                                <div className="flex items-center space-x-2">
                                  <Image
                                    src="/assets/img/sa.png"
                                    className="h-[30px] rounded-full"
                                    width={30}
                                    height={30}
                                    alt="aus"
                                  />
                                  <div>
                                    <span className="flex items-center gap-1">
                                      <span className="text-[#5e5e5e] font-medium">
                                        South Africa
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className=" font-medium text-center">
                              <p className="ttext-[#2F335C] font-light mt-1 text-[11px]">
                                20th September - Fri,
                                <br />
                                5:30 PM GMT
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="border-t-[1px] border-[#E7F2F4]"></div>

                    <div className="flex items-center justify-between space-x-5 mt-2">
                      <div className="flex items-center">
                        <Link href="#">
                          <p className=" text-[#909090] text-[11px] font-medium">
                            {" "}
                            Points Table
                          </p>
                        </Link>

                        <div className="h-[20px] border-l-[1px] mx-5 border-[#d0d3d7]"></div>
                        <Link href="#">
                          <div className="flex justify-end items-center space-x-2">
                            <Image
                              src="/assets/img/home/handshake.png"
                              className="h-[15px]"
                              width={30}
                              height={30}
                              alt=""
                            />
                            <span className="text-[#909090] text-[11px] font-medium">
                              H2H
                            </span>
                          </div>
                        </Link>
                      </div>

                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="text-[#909090] font-medium">BAN</span>
                        <span className="flex items-center bg-[#FAFFFC] border-[1px] border-[#0B773C] rounded-md text-[#0B773C] pr-2">
                          <span className="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-[14px] w-[17px]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                              ></path>
                            </svg>
                          </span>
                          41
                        </span>
                        <span className="flex items-center bg-[#FFF7F7] border-[1px] border-[#A70B0B]  rounded-md text-[#A70B0B] pr-2">
                          <span className="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-[14px] w-[17px]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                              ></path>
                            </svg>
                          </span>
                          45
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[#ffffff] p-4 mb-4">
              <h3 className="text-1xl font-semibold mb-1">
                South Africa Women vs Australia Women, Semi Final
              </h3>
              <p className="text-gray-500 font-normal">
                The biggest tournament in the cricketing circuit, the ICC T20
                WORLD Cup is underway in the USAs and the West Indies. The
                tournament received excellent response from the fans worldwide
                and the finals of the gran...
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
          </div>

          <div className="lg:col-span-4 md:col-span-5">
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex gap-1 items-center justify-between">
                <div className="flex gap-1 items-center">
                  <div className="col-span-4 relative">
                    <Image
                      src="/assets/img/home/trofi.png"
                      className="h-[75px]"
                      width={75}
                      height={75}
                      alt="1"
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

            <WeeklySlider />

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
                        Probably Took Wrong Risk: Alyssa Healy Regrets Sitting
                        Out As SA Stuns AUS In T20 WC
                      </p>
                      <p className="text-[#586577] pt-2">17 hrs ago</p>
                    </div>
                  </Link>
                  <Link href="#">
                    <div className=" pb-2 mb-4 border-b-[1px] border-border-gray-700 ">
                      <p className="text-[13px] font-semibold">
                        Womens T20 World Cup, NZ vs WI: Unchanged New Zealand
                        Opt To Bat; Check Out The Playing XIs
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
                        Probably Took Wrong Risk: Alyssa Healy Regrets Sitting
                        Out As SA Stuns AUS In T20 WC
                      </p>
                      <p className="text-[#586577] pt-2">18 Oct 2024</p>
                    </div>
                  </Link>
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
                <Link href="/t20series">
                  <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2">
                    <div>
                      <Image
                        src="/assets/img/1.png"
                        width={20}
                        height={20}
                        alt="1"
                      />
                    </div>
                    <div className="font-medium text-[#394351]">
                      ICC World cup
                    </div>
                  </div>
                </Link>
                <Link href="/t20series">
                  <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                    <div>
                      <Image
                        src="/assets/img/2.png"
                        width={20}
                        height={20}
                        alt="1"
                      />
                    </div>
                    <div className="font-medium text-[#394351]">
                      ICC Champion Trophy
                    </div>
                  </div>
                </Link>
                <Link href="/t20series">
                  <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                    <div>
                      <Image
                        src="/assets/img/3.png"
                        width={20}
                        height={20}
                        alt="1"
                      />
                    </div>
                    <div className="font-medium text-[#394351]">
                      T20 World Cup
                    </div>
                  </div>
                </Link>
                <Link href="/t20series">
                  <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                    <div>
                      <Image
                        src="/assets/img/4.png"
                        width={20}
                        height={20}
                        alt="1"
                      />
                    </div>
                    <div className="font-medium text-[#394351]">
                      Indian Premium League
                    </div>
                  </div>
                </Link>
                <Link href="/t20series">
                  <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                    <div>
                      <Image
                        src="/assets/img/5.png"
                        width={20}
                        height={20}
                        alt="1"
                      />
                    </div>
                    <div className="font-medium text-[#394351]">
                      Pakistan Super League
                    </div>
                  </div>
                </Link>
                <Link href="/t20series">
                  <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                    <div>
                      <Image
                        src="/assets/img/6.png"
                        width={20}
                        height={20}
                        alt="1"
                      />
                    </div>
                    <div className="font-medium text-[#394351]">
                      Bangladesh Premium Leaguge
                    </div>
                  </div>
                </Link>
                <Link href="/t20series">
                  <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                    <div>
                      <Image
                        src="/assets/img/7.png"
                        width={20}
                        height={20}
                        alt="1"
                      />
                    </div>
                    <div className="font-medium text-[#394351]">
                      Big Bash Leaguge
                    </div>
                  </div>
                </Link>
                <Link href="/t20series">
                  <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3">
                    <div>
                      <Image
                        src="/assets/img/8.png"
                        width={20}
                        height={20}
                        alt="1"
                      />
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
    </section>
  );
}
