export const dynamic = "force-dynamic";
import Layout from "./components/Layout";
import WeeklySlider from "./components/WeeklySlider";
import CardSlider from "./components/CardSlider";
import Link from "next/link";
import ChatComponent from "./components/websocket";
import Image from "next/image";
import { notFound } from "next/navigation";
import TabButtons from "./components/buttonclick";
import { urlStringEncode } from "../utils/utility";

import {
  completedMatches,
  liveMatches,
  upcomingMatches,
} from "@/controller/homeController";

interface MatchItem {
  match_number: string;
  commentary: number;
  live: string;
  match_id: number;
  status_str: string;
  competition: {
    title: string;
    season: string;
  };
  teama: {
    short_name: string;
    logo_url: string;
    scores?: string;
    overs?: string;
    team_id?: string;
  };
  teamb: {
    short_name: string;
    logo_url: string;
    scores?: string;
    overs?: string;
    team_id?: string;
  };
  subtitle: string;
  format_str: string;
  venue: {
    name: string;
    location: string;
  };
  status_note: string;
  result: string;
  date_start_ist: string;
}


type Params = Promise<{ matchType: string }>;

export default async function Home(props: { params: Params }) {
  // const { matchType } = await params;
  const params = await props.params;
  const matchType = params.matchType;
  if (matchType && !["live", "upcoming", "result"].includes(matchType)) {
    notFound();
  }
 
  const open = null;
  let activeTabValue = "";
  

  if (matchType === "live") {
    activeTabValue = "live1";
  } else if (matchType === "upcoming") {
    activeTabValue = "scorecard1";
  } else if (matchType === "result") {
    activeTabValue = "finished1";
  } else {
    activeTabValue = "info1";
  }

  console.log("open", activeTabValue);
  const activeMainTab = activeTabValue;

  const completedMatch: MatchItem[] = await completedMatches();
  const upcomingMatch: MatchItem[] = await upcomingMatches();
  const liveMatch: MatchItem[] = await liveMatches();

  // const  matchData = ChatComponent();
console.log(liveMatch);
  
  return (
    <Layout>
      <ChatComponent></ChatComponent>
      <TabButtons></TabButtons>
      <section className="lg:w-[1000px] mx-auto md:mb-0 mb-4 px-2 lg:px-0">
        <div className="mt-2 mb-2">
          <Image
            src="/assets/img/home.png"
            className="w-[100%]"
            alt=""
            width={1000}
            height={50}
          />
        </div>

        <div className="md:grid grid-cols-12 gap-4">
          <div className="lg:col-span-8 md:col-span-7">
            <div className="tab-section">
              <div className="tabs my-3 md:my-4">
                <div
                  className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto relative overflow-x-auto  [&::-webkit-scrollbar] [&::-webkit-scrollbar]:h-[5px] 
                              [&::-webkit-scrollbar-track]:bg-gray-100 
                              [&::-webkit-scrollbar-thumb]:bg-[#DFE9F6] 
                               dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
                                 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                  
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
                  {liveMatch.map((items) => (
                    items.commentary !== 0 ? (
                      <div key={items.match_id}>
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
                        <Link href={"/live-score/"+urlStringEncode(items?.teama?.short_name+"-vs-"+items?.teamb?.short_name+"-match-"+items?.match_number+"-"+items?.competition?.title)+"/" + items.match_id}>
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
                          <Link href={"/points-table/"+urlStringEncode(items?.teama?.short_name+"-vs-"+items?.teamb?.short_name+"-match-"+items?.match_number+"-"+items?.competition?.title)+"/" + items.match_id}>
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
                      <Link href={"/live-score/"+urlStringEncode(items?.teama?.short_name+"-vs-"+items?.teamb?.short_name+"-match-"+items?.match_number+"-"+items?.competition?.title)+"/" + items.match_id}>
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
                                    
                                    <p className={
                                    "flex items-center gap-2 match" +
                                    items.match_id +
                                    "-" +
                                    items.teama.team_id
                                  }>
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
                              <p className={"text-[#2F335C] font-light mt-1 text-[11px]  statusNote" +
                                  items.match_id
                                }>
                              {items.status_note}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="border-t-[1px] border-[#E7F2F4]"></div>

                      <div className="flex items-center justify-between space-x-5 mt-2">
                        <div className="flex items-center">
                          <Link href={"/points-table/"+urlStringEncode(items?.teama?.short_name+"-vs-"+items?.teamb?.short_name+"-match-"+items?.match_number+"-"+items?.competition?.title)+"/" + items.match_id}>
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

                  ):("")
                  
                  
                  
                  ))}
                  
                  
                  </div>
                  <div className="completedMatch">
                  {completedMatch.map((cmatch) => (
                    <div key={cmatch.match_id}>
                    <div
                      className="lg:block hidden rounded-lg p-4 mb-4 bg-[#ffffff] hover:shadow-lg"
                    >
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
                          <Link href="/resultMatch/result-scorecard">
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

                          <Link href="/match-result">
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
                          <span className="rounded-full">●</span> {cmatch.status_str}
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
                      <Link href="/match-result">
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
                          <Link href={"/points-table/"+urlStringEncode(cmatch?.teama?.short_name+"-vs-"+cmatch?.teamb?.short_name+"-match-"+cmatch?.match_number+"-"+cmatch?.competition?.title)+"/" + cmatch.match_id}>
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
                              <p className="text-[11px]">Man of the match</p>
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
                  {upcomingMatch.map((ucmatch) => (
                    <div key={ucmatch.match_id}>
                    <div
                      className="lg:block hidden rounded-lg p-4 mb-4 bg-[#ffffff] hover:shadow-lg"
                    >
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
                      <Link href="/scheduled/infoUpcoming-match">
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
                                  <p className="text-[#2F335C] text-[14px]">
                                    {ucmatch.date_start_ist}
                                    {/* 20th September - Fri, <br /> 5:30 PM GMT */}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="border-t-[1px] border-[#E7F2F4]"></div>

                      <div className="flex items-center justify-between space-x-5 mt-3">
                        <div className="flex items-center">
                          <Link href={"/points-table/"+urlStringEncode(ucmatch?.teama?.short_name+"-vs-"+ucmatch?.teamb?.short_name+"-match-"+ucmatch?.match_number+"-"+ucmatch?.competition?.title)+"/" + ucmatch.match_id}>
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
                          <span className="rounded-full">●</span> {ucmatch.status_str}
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
                    <Link href="/scheduled/infoUpcoming-match">
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
                        <Link href={"/points-table/"+urlStringEncode(ucmatch?.teama?.short_name+"-vs-"+ucmatch?.teamb?.short_name+"-match-"+ucmatch?.match_number+"-"+ucmatch?.competition?.title)+"/" + ucmatch.match_id}>
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
                        <span className="text-[#909090] font-medium">BAN</span>
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
                          <span className="text-[#909090] font-medium">
                            BAN
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
            </div>

            <div className="tab-section">
              <div className="tabs my-4">
                <div className="flex text-1xl space-x-4 p-2 bg-[#ffffff] rounded-lg overflow-auto">
                  <button className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white  rounded-md">
                    News
                  </button>
                  <button className="font-medium py-2 px-3 whitespace-nowrap">
                    Fantasy Tips
                  </button>
                  <button className="font-medium py-2 px-3 whitespace-nowrap">
                    IPL 2025
                  </button>
                  <button className="font-medium py-2 px-3 whitespace-nowrap">
                    Daily Quiz
                  </button>
                  <button className="font-medium py-2 px-3 whitespace-nowrap">
                    Points Table
                  </button>
                  <button className="font-medium py-2 px-3 whitespace-nowrap">
                    Social Trends
                  </button>
                </div>
              </div>

              <div className="tab-content-container">
                <div id="news2" className="tab-content news2">
                  <div className="rounded-lg py-4 px-4 bg-[#ffffff] mb-4">
                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6 ">
                        <Image
                          src="/assets/img/team-1.png"
                          width={300}
                          height={300}
                          alt="Main news"
                          className="rounded-lg w-full h-48 object-cover mb-3"
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="text-gray-500 font-normal text-[13px] mb-2 flex items-center">
                          By{" "}
                          <span className="ml-2 pr-[1px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="15"
                              height="15"
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
                          Uc Team{" "}
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
                              />
                            </svg>
                          </span>{" "}
                          October 9, 2024
                        </p>
                        <h3
                          className="text-1xl font-semibold mb-1"
                          style={{ lineHeight: "21px" }}
                        >
                          Live - Jagadeesan hits a century; Haryana trounce
                        </h3>
                        <p className="text-gray-500 font-normal">
                          India will go into the home Test series against New
                          Zealand with pretty much the same squad that took on
                          Bangladesh in September - India s last red-ball action
                          ahead of the five-Test...
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
                    </div>

                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={90}
                              height={90}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={90}
                              height={90}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={90}
                              height={90}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>

                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={90}
                              height={90}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={90}
                              height={90}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={90}
                              height={90}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>
                    </div>

                    <Link href="#">
                      <div className="text-[#1A80F8] font-semibold flex items-center justify-center text-[13px] pt-2 underline">
                        More from News{" "}
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
                      </div>
                    </Link>
                  </div>
                </div>
                <div id="fantasytips2" className="tab-content hidden">
                  <div className="rounded-lg py-4 px-4 bg-[#ffffff] mb-4">
                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6 ">
                        <Image
                          src="/assets/img/team-1.png"
                          width={30}
                          height={30}
                          alt="Main news"
                          className="rounded-lg w-full h-48 object-cover mb-3"
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="text-gray-500 font-normal text-[13px] mb-2 flex items-center">
                          By{" "}
                          <span className="ml-2 pr-[1px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="15"
                              height="15"
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
                          Uc Team{" "}
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
                              />
                            </svg>
                          </span>{" "}
                          October 9, 2024
                        </p>
                        <h3
                          className="text-1xl font-semibold mb-1"
                          style={{ lineHeight: "21px" }}
                        >
                          Live - Jagadeesan hits a century; Haryana trounce
                        </h3>
                        <p className="text-gray-500 font-normal">
                          India will go into the home Test series against New
                          Zealand with pretty much the same squad that took on
                          Bangladesh in September - Indias last red-ball action
                          ahead of the five-Test...
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
                    </div>

                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>

                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>
                    </div>

                    <Link href="#">
                      <div className="text-[#1A80F8] font-semibold flex items-center justify-center text-[13px] pt-2 underline">
                        More from News{" "}
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
                      </div>
                    </Link>
                  </div>
                </div>
                <div id="ipl2" className="tab-content hidden">
                  <div className="rounded-lg py-4 px-4 bg-[#ffffff] mb-4">
                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6 ">
                        <Image
                          src="/assets/img/team-1.png"
                          width={30}
                          height={30}
                          alt="Main news"
                          className="rounded-lg w-full h-48 object-cover mb-3"
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="text-gray-500 font-normal text-[13px] mb-2 flex items-center">
                          By{" "}
                          <span className="ml-2 pr-[1px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="15"
                              height="15"
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
                          Uc Team{" "}
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
                              />
                            </svg>
                          </span>{" "}
                          October 9, 2024
                        </p>
                        <h3
                          className="text-1xl font-semibold mb-1"
                          style={{ lineHeight: "21px" }}
                        >
                          Live - Jagadeesan hits a century; Haryana trounce
                        </h3>
                        <p className="text-gray-500 font-normal">
                          India will go into the home Test series against New
                          Zealand with pretty much the same squad that took on
                          Bangladesh in September - Indias last red-ball action
                          ahead of the five-Test...
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
                    </div>

                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>

                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>
                    </div>

                    <Link href="#">
                      <div className="text-[#1A80F8] font-semibold flex items-center justify-center text-[13px] pt-2 underline">
                        More from News{" "}
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
                      </div>
                    </Link>
                  </div>
                </div>
                <div id="dailyquiz2" className="tab-content hidden">
                  <div className="rounded-lg py-4 px-4 bg-[#ffffff] mb-4">
                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6 ">
                        <Image
                          src="/assets/img/team-1.png"
                          width={30}
                          height={30}
                          alt="Main news"
                          className="rounded-lg w-full h-48 object-cover mb-3"
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="text-gray-500 font-normal text-[13px] mb-2 flex items-center">
                          By{" "}
                          <span className="ml-2 pr-[1px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="15"
                              height="15"
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
                          Uc Team{" "}
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
                              />
                            </svg>
                          </span>{" "}
                          October 9, 2024
                        </p>
                        <h3
                          className="text-1xl font-semibold mb-1"
                          style={{ lineHeight: "21px" }}
                        >
                          Live - Jagadeesan hits a century; Haryana trounce
                        </h3>
                        <p className="text-gray-500 font-normal">
                          India will go into the home Test series against New
                          Zealand with pretty much the same squad that took on
                          Bangladesh in September - Indias last red-ball action
                          ahead of the five-Test...
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
                    </div>

                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>

                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>
                    </div>

                    <Link href="#">
                      <div className="text-[#1A80F8] font-semibold flex items-center justify-center text-[13px] pt-2 underline">
                        More from News{" "}
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
                      </div>
                    </Link>
                  </div>
                </div>
                <div id="pointstable2" className="tab-content hidden">
                  <div className="rounded-lg py-4 px-4 bg-[#ffffff] mb-4">
                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6 ">
                        <Image
                          src="/assets/img/team-1.png"
                          width={30}
                          height={30}
                          alt="Main news"
                          className="rounded-lg w-full h-48 object-cover mb-3"
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="text-gray-500 font-normal text-[13px] mb-2 flex items-center">
                          By{" "}
                          <span className="ml-2 pr-[1px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="15"
                              height="15"
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
                          Uc Team{" "}
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
                              />
                            </svg>
                          </span>{" "}
                          October 9, 2024
                        </p>
                        <h3
                          className="text-1xl font-semibold mb-1"
                          style={{ lineHeight: "21px" }}
                        >
                          Live - Jagadeesan hits a century; Haryana trounce
                        </h3>
                        <p className="text-gray-500 font-normal">
                          India will go into the home Test series against New
                          Zealand with pretty much the same squad that took on
                          Bangladesh in September - Indias last red-ball action
                          ahead of the five-Test...
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
                    </div>

                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>

                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>
                    </div>

                    <Link href="#">
                      <div className="text-[#1A80F8] font-semibold flex items-center justify-center text-[13px] pt-2 underline">
                        More from News{" "}
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
                      </div>
                    </Link>
                  </div>
                </div>
                <div id="socialtrends2" className="tab-content hidden">
                  <div className="rounded-lg py-4 px-4 bg-[#ffffff] mb-4">
                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6 ">
                        <Image
                          src="/assets/img/team-1.png"
                          width={30}
                          height={30}
                          alt="Main news"
                          className="rounded-lg w-full h-48 object-cover mb-3"
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="text-gray-500 font-normal text-[13px] mb-2 flex items-center">
                          By{" "}
                          <span className="ml-2 pr-[1px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="15"
                              height="15"
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
                          Uc Team{" "}
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
                              />
                            </svg>
                          </span>{" "}
                          October 9, 2024
                        </p>
                        <h3
                          className="text-1xl font-semibold mb-1"
                          style={{ lineHeight: "21px" }}
                        >
                          Live - Jagadeesan hits a century; Haryana trounce
                        </h3>
                        <p className="text-gray-500 font-normal">
                          India will go into the home Test series against New
                          Zealand with pretty much the same squad that took on
                          Bangladesh in September - Indias last red-ball action
                          ahead of the five-Test...
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
                    </div>

                    <div className="lg:grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>

                      <div className="col-span-6">
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-1.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Action ahead of the five-Test series in
                                Australia to close out this year.into the home
                                Test series against
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>
                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-2.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                Star South African spinner to opt central
                                contract this is cricket
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>

                        <div className="border-t-[1px] border-[#E7F2F4]"></div>

                        <Link href="#">
                          <div className="flex gap-3 my-5">
                            <Image
                              src="/assets/img/flag/p-3.png"
                              width={30}
                              height={30}
                              alt="News thumbnail"
                              className="rounded-lg h-[90px]"
                            />
                            <div>
                              <h4 className="text-[13px] font-semibold mb-2">
                                After a campaign that never really took off,
                                they have some reflecting to do.
                              </h4>
                              <p className="text-[12px] text-gray-500 flex items-center">
                                By{" "}
                                <span className="ml-2 pr-[1px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="15"
                                    height="15"
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
                                Uc Team{" "}
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
                        </Link>
                      </div>
                    </div>

                    <Link href="#">
                      <div className="text-[#1A80F8] font-semibold flex items-center justify-center text-[13px] pt-2 underline">
                        More from News{" "}
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
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 md:col-span-5">
            <div className="bg-white rounded-lg p-4 my-4">
              <div className="flex gap-1 items-center justify-between">
                <div className="flex gap-1 items-center">
                  <div className="col-span-4 relative">
                    <Image
                      src="/assets/img/home/trofi.png"
                      className="h-[75px]"
                      width={75}
                      height={75}
                      alt=""
                    />
                  </div>
                  <div className="col-span-8 relative">
                    <h3 className="font-semibold text-[19px] mb-1">
                      Weekly challenge
                    </h3>
                    <p className="font-semibold text-[13px] text-[#1a80f8]">
                      <span className="text-[#586577]">Time Left:</span> 2 Days
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
                        alt=""
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
                        alt=""
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
                        alt=""
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
                        alt=""
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
                        alt=""
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
                        alt=""
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
                        alt=""
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
                        alt=""
                      />
                    </div>
                    <div className="font-medium text-[#394351]">
                      Super Smash
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div>
              <div className="mb-2">
                <h3 className="text-1xl font-semibold pl-[3px] border-l-[3px] border-[#1a80f8]">
                  Other Leagues (A-Z)
                </h3>
              </div>

              <div className="bg-white rounded-lg px-4">
                {/* Search Form */}
                <div className="py-2 mb-3">
                  <form className="flex justify-between items-center border-2 p-1 px-3 rounded-lg">
                    <div>
                      <input
                        className="font-medium text-[15px] outline-none"
                        type="text"
                        placeholder="Filter.."
                      />
                    </div>
                    <div>
                      <Image
                        src="/assets/img/flag/search.png"
                        className="h-[14px]"
                        width={15}
                        height={15}
                        alt=""
                      />
                    </div>
                  </form>
                </div>

                {/* Country Blocks */}
                {[
                  { name: "Afghanistan", flag: "/assets/img/flag/1.png" },
                  { name: "Australia", flag: "/assets/img/flag/2.png" },
                  { name: "Bangladesh", flag: "/assets/img/flag/3.png" },
                  { name: "Chinese Taipei", flag: "/assets/img/flag/4.png" },
                  { name: "Cyprus", flag: "/assets/img/flag/5.png" },
                  { name: "Czech", flag: "/assets/img/flag/6.png" },
                  { name: "China", flag: "/assets/img/flag/7.png" },
                  { name: "Colombia", flag: "/assets/img/flag/8.png" },
                  { name: "Croatia", flag: "/assets/img/flag/9.png" },
                  { name: "England", flag: "/assets/img/flag/10.png" },
                  { name: "South Africa", flag: "/assets/img/flag/11.png" },
                  { name: "New Zealand", flag: "/assets/img/flag/12.png" },
                  { name: "Sri Lanka", flag: "/assets/img/flag/13.png" },
                  { name: "West Indies", flag: "/assets/img/flag/14.png" },
                  { name: "Pakistan", flag: "/assets/img/flag/16.png" },
                ].map((country, index) => (
                  <div key={index} className="border-b mb-4">
                    <button className="w-full flex text-[14px] justify-between items-center pb-3">
                      <span className="flex items-center font-medium text-[#394351]">
                        <Image
                          src={country.flag}
                          className="mr-3"
                          width={20}
                          height={20}
                          alt={`${country.name} Flag`}
                        />
                        {country.name}
                      </span>
                      <span className="transform transition-transform">
                        <Image
                          src="/assets/img/arrow.png"
                          className="h-[7px]"
                          width={10}
                          height={15}
                          alt="Arrow"
                        />
                      </span>
                    </button>
                    {open === index && (
                      <div className="pl-8 py-2 space-y-2 font-normal text-[14px] text-[#51555E]">
                        <Link className="hover:text-[#1a80f8]" href="">
                          {" "}
                          <p>Bangabandhu T20 C</p>{" "}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex justify-between items-center py-4">
            <div>
              <h3 className="text-1xl font-semibold pl-[4px] border-l-[3px] border-[#2182F8]">
                TOP TEAMS
              </h3>
            </div>
            <Link href="#">
              <div className="text-[#1A80F8] font-semibold flex items-center justify-center text-[13px] pt-2 underline">
                View More{" "}
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
              </div>
            </Link>
          </div>

          <div className="rounded-lg bg-[#ffffff] p-4">
            <div className="grid md:gap-6 gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-3 px-2">
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a), url(img/home/bg-1.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/17.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">India</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a),url(img/home/bg-2.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/2.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">Australia</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a), url(img/home/bg-3.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/16.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">Pakistan</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a),url(img/home/bg-4.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/11.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">South Africa</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a),url(img/home/bg-5.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/12.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">New Zealand</p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a),url(img/home/bg-6.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/13.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">Sri Lanka</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a),url(img/home/bg-7.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/10.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">England</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a),url(img/home/bg-8.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/17.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">Afghanistan</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a),url(img/home/bg-9.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/13.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <p className="font-semibold">Bangladesh</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-1">
                <div
                  className="bg-cover bg-center py-3 rounded-md text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(20, 67, 158, 1), #14429e7a),url(img/home/bg-10.png)",
                  }}
                >
                  <Link href="/team">
                    <div className=" flex items-center space-x-2 justify-center">
                      <Image
                        src="/assets/img/flag/14.png"
                        width={20}
                        height={20}
                        alt=""
                        className="rounded-full"
                      />
                      <p className="font-semibold">West Indies</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <div>
              <h3 className="text-1xl font-semibold pl-[4px] border-l-[3px] border-[#2182F8]">
                Web Stories
              </h3>
            </div>
          </div>

          <CardSlider></CardSlider>

          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-4 w-full">
              <div className="flex-grow h-0.5 bg-gray-300"></div>
              <h2 className="md:text-[24px] text-[18px] text-black font-bold whitespace-nowrap">
                WOMENS T20 WORLD CUP 2024
              </h2>
              <div className="flex-grow h-0.5 bg-gray-300"></div>
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-12 gap-4">
          <div className="col-span-2"></div>

          <div className="col-span-8">
            <div className="mb-4">
              <div
                className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto relative overflow-x-auto  [&::-webkit-scrollbar] [&::-webkit-scrollbar]:h-[5px] 
    [&::-webkit-scrollbar-track]:bg-gray-100 
    [&::-webkit-scrollbar-thumb]:bg-[#DFE9F6] 
    dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              >
                <button className="font-medium py-2 px-5 bg-[#1A80F8] text-white rounded-md whitespace-nowrap">
                  <span>Fixtures</span>
                </button>
                <Link href="/matchpoints">
                  <button className="font-medium py-2 px-3 whitespace-nowrap">
                    Points Table
                  </button>
                </Link>
                <Link href="/live-stats/most-runs-stats">
                  <button className="font-medium py-2 px-3 whitespace-nowrap">
                    Stats
                  </button>
                </Link>
                <Link href="/match-squad">
                  <button className="font-medium py-2 px-3 whitespace-nowrap">
                    Squads
                  </button>
                </Link>
                <button className="font-medium py-2 px-3 whitespace-nowrap">
                  Fantasy Tips
                </button>
              </div>
            </div>

            {/* <!-- SCHEDULED match desktop view start --> */}

            <div className="lg:block hidden rounded-lg p-4 mb-4 bg-[#ffffff] hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div
                    className="flex items-center text-[#A45B09] rounded-full pr-2 font-semibold"
                    style={{ gap: "3px" }}
                  >
                    <span className="rounded-full">●</span> SCHEDULED
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold pl-[10px] border-l-[1px] border-[#E4E9F0]">
                      Afghanistan tour of South Africa
                    </h4>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[13px] font-medium">AFG</span>
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
              <Link href="/scheduled/infoUpcoming-match">
                <div className="py-4 px-3">
                  <div className="flex justify-between items-center text-[14px]">
                    <div className="">
                      <p className="text-[#586577] text-[12px] mb-4 font-medium">
                        2nd ODI , Sharjah Cricket Stadium, Sharjah
                      </p>
                      <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-4">
                        <div className="flex items-center space-x-2">
                          <Image
                            src="/assets/img/afg.png"
                            className="h-[30px] rounded-full"
                            width={30}
                            height={30}
                            alt="aus"
                          />
                          <span className="font-semibold">Afghanistan</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 font-medium w-[162px] md:w-full">
                          <div className="flex items-center space-x-2">
                            <Image
                              src="/assets/img/sa.png"
                              className="h-[30px]"
                              width={30}
                              height={30}
                              alt="ind"
                            />
                            <span className="font-semibold">South Africa</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" font-medium text-center">
                      <p className="text-[#2F335C] text-[14px]">
                        20th September - Fri, <br /> 5:30 PM GMT
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="border-t-[1px] border-[#E7F2F4]"></div>

              <div className="flex items-center justify-between space-x-5 mt-3">
                <div className="flex items-center">
                  <Link href="#">
                    <p className=" text-[#909090] font-medium"> Points Table</p>
                  </Link>
                  <div className="h-[20px] border-l-[1px] mx-5 border-[#d0d3d7]"></div>
                  <Link href="#">
                    <p className="text-[#909090] font-medium">Schedule</p>
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
                    <span className="text-[#909090] font-medium">H2H</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* <!-- SCHEDULED match desktop view end -->

<!-- SCHEDULED match mobile view start --> */}

            <div className="lg:hidden rounded-lg p-4 mb-4 bg-[#ffffff] performance-section relative">
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
                <div className="py-2 pb-3">
                  <p className="text-[#586577] text-[12px] mb-4 font-medium">
                    2nd ODI&nbsp;,&nbsp;Sharjah Cricket Stadium, Sharjah
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

                <div className="border-t-[1px] border-[#E7F2F4]"></div>

                <div className="flex items-center justify-between space-x-5 mt-2">
                  <div className="flex items-center">
                    <p className=" text-[#909090] text-[11px] font-medium">
                      {" "}
                      Points Table
                    </p>
                    <div className="h-[20px] border-l-[1px] mx-5 border-[#d0d3d7]"></div>
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

            {/* <!-- SCHEDULED match mobile view end --> */}

            <div className="rounded-lg py-4 px-4 bg-[#ffffff] mb-4">
              <div className=" md:grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <Image
                    src="/assets/img/home/img-7.png"
                    width={186}
                    height={186}
                    alt="Main news"
                    className="rounded-lg w-full object-cover mb-4 md:mb-0 h-[186px]"
                  />
                </div>
                <div className="col-span-7">
                  <p className="text-gray-500 font-normal text-[12px] mb-2 flex items-center">
                    By{" "}
                    <span className="ml-2 pr-[1px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="15"
                        height="15"
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
                    Uc Team{" "}
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
                  <h3 className="text-1xl font-semibold mb-1">
                    England show enviable bowling depth of crucial West Indies
                    clash.
                  </h3>
                  <p className="text-gray-500 font-normal">
                    England tested their pace and spin combinations to
                    devastating effect ahead of a move to Dubai for their
                    crucial last group game of this T20 World Cup, against West
                    Indies on Tuesday. Heather Knight, Englands captain,{" "}
                  </p>
                  <button className="text-[#1A80F8] font-semibold flex items-center text-[13px] pt-2 underline">
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
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex gap-3 py-4">
                  <Image
                    src="/assets/img/img-6.png"
                    width={100}
                    height={100}
                    alt="News thumbnail"
                    className="rounded-lg lg:h-[103px] h-[80px] md:h-[90px]"
                  />
                  <div>
                    <p className="text-gray-500 font-normal text-[12px] mb-2 flex items-center">
                      By{" "}
                      <span className="ml-2 pr-[1px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
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
                      Uc Team{" "}
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
                    <h4 className="md:text-1xl text-[13px] font-semibold mb-1">
                      Muzumdar: Australias experience saw them through
                    </h4>
                    <p className="hidden md:block text-gray-500 font-normal">
                      India lost another knockout game to Australia in the last
                      over and their coach said the team can.
                    </p>
                  </div>
                </div>

                <div className="border-t-[1px] border-[#E7F2F4]"></div>

                <div className="flex gap-3 py-4">
                  <Image
                    src="/assets/img/img-7.png"
                    width={100}
                    height={100}
                    alt="News thumbnail"
                    className="rounded-lg lg:h-[103px] h-[80px] md:h-[90px]"
                  />
                  <div>
                    <p className="text-gray-500 font-normal text-[12px] mb-2 flex items-center">
                      By{" "}
                      <span className="ml-2 pr-[1px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
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
                      Uc Team{" "}
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
                    <h4 className="md:text-1xl text-[13px] font-semibold mb-1">
                      India succumb to chaos in Sharjah spectacle
                    </h4>
                    <p className="hidden md:block text-gray-500 font-normal ">
                      India struck a familiar, unavoidable chaos fueled by
                      jangling nerves to lose from a winning position.
                    </p>
                  </div>
                </div>

                <div className="border-t-[1px] border-[#E7F2F4]"></div>

                <div className="flex gap-3 py-4">
                  <Image
                    src="/assets/img/img-8.png"
                    width={100}
                    height={100}
                    alt="News thumbnail"
                    className="rounded-lg lg:h-[103px] h-[80px] md:h-[90px]"
                  />
                  <div>
                    <p className="text-gray-500 font-normal text-[13px] mb-2 flex items-center">
                      By{" "}
                      <span className="ml-2 pr-[1px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
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
                      Uc Team{" "}
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
                    <h4 className="md:text-1xl text-[13px] font-semibold mb-1">
                      Australia clinch thriller to book yet another semi-final;
                      India on the brink
                    </h4>
                    <p className="hidden md:block text-gray-500 font-normal">
                      India suffered a collapse of 6 for 31 which left them nine
                      runs short in the end.
                    </p>
                  </div>
                </div>

                <div className="py-4 text-center flex justify-center text-[#2182F8] md:text-[15px] text-[13px] font-semibold">
                  <button className="underline flex items-center">
                    More from Womens T20 World Cup 2024
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2"></div>
        </div>
      </section>
    </Layout>
  );
}
