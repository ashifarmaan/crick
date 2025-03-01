"use client";

import React, { useState } from "react";
import Link from "next/link";
import Banner from "./Banner";
import Image from "next/image";
import { urlStringEncode } from "../../../utils/utility";
import { format, isSameDay } from "date-fns";
import CountdownTimer from "@/app/components/countdownTimer";

interface Team {
  teamLast5match: any | null;
  params: any | null;
  teamDetails: any | null;
  teamUpcomingMatch: any | null;
}
export default function Team({
  teamLast5match,
  teamDetails,
  teamUpcomingMatch,
  params,
}: Team) {
  const teama_id = params.teamId;
  const matchData = teamLast5match;
  const upcomingMatch = teamUpcomingMatch;

  return (
    <section className="lg:w-[1000px] mx-auto md:mb-0 my-4 px-2 lg:px-0">
      <div className="md:grid grid-cols-12 gap-4">
        <div className="lg:col-span-8 md:col-span-7">
          <Banner teamDetails={teamDetails}></Banner>
        </div>
        <div className="lg:col-span-8 md:col-span-7">
          {/* <div className="rounded-lg bg-[#ffffff] my-4 p-4"> */}
          <div className="upcomingMatch">
            {upcomingMatch?.map((ucmatch: any) => (
              <div key={ucmatch.match_id}>
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
                    <div className="items-center space-x-2 hidden">
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
            {/* </div> */}
          </div>
        </div>
        <div className="lg:col-span-8 md:col-span-7">
          <div className="rounded-lg bg-[#ffffff] my-4 p-4">
            <div>
              <h3 className="text-[15px] font-semibold  pl-[7px] border-l-[3px] mb-3 border-[#229ED3]">
                Recent Team Performance{" "}
                <span className="text-[#909090]"> (Last 5 match) </span>
              </h3>
              <div className="border-t-[1px] border-[#E4E9F0]" />
              <div className="md:px-2">
                <div className="performance-section">
                  <div className="flex items-center justify-between my-3">
                    <Link href="">
                      <div className="flex items-center space-x-3">
                        <div>
                          <Image
                            src={teamDetails?.logo_url}
                            className="h-[25px]"
                            width={25}
                            height={20}
                            alt={teamDetails?.alt_name}
                          />
                        </div>
                        <h3 className="text-1xl font-medium">
                          {teamDetails?.title}
                        </h3>
                      </div>
                    </Link>
                    <div>
                      <div className="ml-auto flex gap-1 items-center">
                        {matchData?.map(
                          (items: {
                            winning_team_id: number;
                            match_id: number;
                          }) =>
                            items.winning_team_id == teama_id ? (
                              <span
                                key={items.match_id}
                                className="bg-[#13b76dbd] text-white text-[13px] px-[6px] py-[3px] rounded"
                              >
                                W
                              </span>
                            ) : (
                              <span
                                key={items.match_id}
                                className="bg-[#f63636c2] text-white text-[13px] px-[7px] py-[3px] rounded"
                              >
                                L
                              </span>
                            )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t-[1px] border-[#E4E9F0]" />

                  <div className="md:px-3 open-Performance-data">
                    {/* full screen teame data */}
                    <div className="overflow-x-auto lg:block hidden">
                      <table className="w-full text-left rtl:text-right">
                        <tbody>
                          {matchData?.map((items: any, index: number) => (
                            <tr
                              className="whitespace-nowrap bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[13px]"
                              key={index}
                            >
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
                                  {items.winning_team_id == teama_id ? (
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
                                <span className="text-[#909090]">AUS</span>
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
                                <span className="text-[#909090]">IND</span>
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
                              <span className="text-[#909090]">AUS</span>
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
                                <span className="text-[#909090]">IND</span>
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
                              <span className="text-[#909090]">PAK</span>
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
                                <span className="text-[#909090]">IND</span>
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
                              <span className="text-[#909090]">PAK</span>
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
                                <span className="text-[#909090]">IND</span>
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
                              <span className="text-[#909090]">PAK</span>
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
                                <span className="text-[#909090]">IND</span>
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
                              <span className="text-[#909090]">PAK</span>
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
                                <span className="text-[#909090]">IND</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
