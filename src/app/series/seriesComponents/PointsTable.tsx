
import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import WeeklySlider from "@/app/components/WeeklySlider";

export default function PointsTable() {



    return (


        <section className="lg:w-[1000px] mx-auto md:mb-0 mb-4 px-2 lg:px-0">
            <div id="tabs" className="my-4">
                <div className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto">
                    <Link href="/series/IPL/overview">
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap "
                        >
                            Overview
                        </button>
                    </Link>
                    <Link href="/series/IPL/schedule-results">
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap "
                        >
                            Schedule & Results

                        </button>
                    </Link>
                    <Link href="/series/IPL/squads">
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap "
                        >
                            Squads
                        </button>
                    </Link>
                    <Link href="/series/IPL/points-table">
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white rounded-md"
                        >
                            Points Table
                        </button>
                    </Link>
                    <Link href="/series/IPL/news">
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap"
                        >
                            News
                        </button>
                    </Link>
                    <Link href="/series/IPL/stats">
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap" >
                            Stats
                        </button>
                    </Link>

                </div>
            </div>


            <div id="points" className="">
                <div className="md:grid grid-cols-12 gap-4">
                    <div className="lg:col-span-8 md:col-span-7">
                        <div className="rounded-lg bg-[#ffffff] p-4 mb-4">
                            <h3 className="text-1xl font-semibold mb-1">
                                South Africa Women vs New Zealand Women, Final
                            </h3>
                            <p
                                className="text-gray-500 font-normal"
                            >

                                The biggest tournament in the cricketing circuit, the ICC T20
                                WORLD Cup is underway in the USAs and the West Indies. The
                                tournament received excellent response from the fans worldwide...

                            </p>
                            <button
                                className="text-blue-600 font-semibold flex items-center text-[13px] pt-2 underline"
                            >
                                Read More
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 ml-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="rounded-lg bg-[#ffffff] mb-2 p-4">
                            <h3 className="text-1xl font-semibold mb-3 pl-[7px] border-l-[3px] border-[#229ED3]">
                                IPl 2024 Pointe Table
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
                                            <tr className="hover:bg-[#fffae5]">
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">1</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px] w-[120px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/1.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>
                                                                KKR<span className="text-[#00B564]"> (Q)</span>
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">2</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/2.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>
                                                                SH<span className="text-[#00B564]"> (Q)</span>
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">3</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/3.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>
                                                                RR<span className="text-[#00B564]"> (Q)</span>
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">4</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/4.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>
                                                                RCB<span className="text-[#00B564]"> (Q)</span>
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">5</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/5.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>CSK</p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">6</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/6.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>DC</p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">7</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/7.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>LSG</p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">8</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/8.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>GT</p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">9</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/9.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>PK</p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                            <tr>
                                                <td className="md:px-2 pl-[14px] py-3 w-[10px]">10</td>
                                                <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                    <Link href="/team/kkr/overview">
                                                        <div className="flex items-center gap-[5px]">
                                                            <div>
                                                                <Image
                                                                    src="/assets/img/ipl/10.png"
                                                                    className="h-[20px]"
                                                                    width={20} height={20} alt=""
                                                                />
                                                            </div>
                                                            <p>MI</p>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">5</td>
                                                <td className="md:px-2 pl-[14px] py-3">123</td>
                                                <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                <td className="md:px-2 pl-[14px] py-3">9</td>
                                                <td className="md:px-2 pl-[14px] py-3">0</td>
                                                <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                <td className="md:px-2 pl-[14px] py-3">
                                                    <div className="ml-auto flex gap-1 items-center">
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#f63636c2] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            L
                                                        </span>
                                                        <span className="bg-[#13b76dbd] text-white text-[13px] px-[4px] py-[0px] rounded">
                                                            W
                                                        </span>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold">
                                {" "}
                                Last Updated On 17 Oct 2024, 22:49 IST
                            </p>
                            <p className="text-[14px] text-gray-500">
                                <span className="font-semibold text-[#1F2937]">M:</span>
                                Matches,<span className="font-semibold text-[#1F2937]">
                                    {" "}
                                    W:
                                </span>{" "}
                                Won, <span className="font-semibold text-[#1F2937]">L:</span>{" "}
                                Lost, <span className="font-semibold text-[#1F2937]">T:</span>{" "}
                                Tie, <span className="font-semibold text-[#1F2937]">N/R:</span> No
                                Result, <span className="font-semibold text-[#1F2937]">PTS:</span>{" "}
                                Points,{" "}
                                <span className="font-semibold text-[#1F2937]">Net RR:</span> Net
                                run rate, <span className="font-semibold text-[#1F2937]">Q:</span>{" "}
                                Qualified
                            </p>
                        </div>


                        <div className="rounded-lg bg-[#ffffff] p-4 mb-4">
                            <h3 className="text-1xl font-semibold mb-1">
                                India vs Zimbabwe 2024
                            </h3>
                            <p
                                className="text-gray-500 font-normal "
                            >
                                The biggest tournament in the cricketing circuit, the ICC T20
                                WORLD Cup is underway in the USAs and the West Indies. The
                                tournament received excellent response from the fans worldwide...

                            </p>
                            <button
                                className="text-blue-600 font-semibold flex items-center text-[13px] pt-2 underline"
                            >
                                Read More
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 ml-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="rounded-lg bg-[#ffffff] p-4 mb-4">
                            <div className="">
                                <h2 className="text-1xl font-semibold mb-1">FAQs on IPL Points Table</h2>
                                <div className="border-t-[1px] border-[#E7F2F4]" />
                                <div className="space-y-2 my-2">

                                    <div >
                                        <button
                                            className="w-full text-left flex justify-between items-center px-4 py-2 transition"

                                        >
                                            <span className="text-[14px] font-medium">What is NRR?</span>
                                            <span
                                                className="transition-transform transform"

                                            >
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
                                            </span>
                                        </button>
                                        <p
                                            className="my-2 px-4 text-gray-600 "
                                        >
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugiat itaque praesentium dolorum. Fuga ab eveniet minima perferendis beatae autem ducimus error et ex dolores vitae, deserunt mollitia, harum voluptates.
                                        </p>
                                        <div className="border-t-[1px] border-[#E7F2F4]" />
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
                                        <Image src="/assets/img/home/trofi.png" className="h-[75px]" width={75} height={75} alt="" />
                                    </div>
                                    <div className="col-span-8 relative">
                                        <h3 className="font-semibold text-[19px] mb-1">
                                            Weekly challenge
                                        </h3>
                                        <p className="font-semibold text-[13px] text-[#1a80f8]">
                                            <span className="text-[#586577]">Time Left:</span>2 Days 12h
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
                                    POPULAR</h3>

                            </div>
                            <div className="">
                                <Link href="/t20series">
                                    <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2">
                                        <div>
                                            <Image src="/assets/img/1.png" width={20} height={20} alt="" />
                                        </div>
                                        <div className="font-medium text-[#394351]">
                                            ICC World cup
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/t20series">
                                    <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                        <div>
                                            <Image src="/assets/img/2.png" width={20} height={20} alt="" />
                                        </div>
                                        <div className="font-medium text-[#394351]">
                                            ICC Champion Trophy
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/t20series">
                                    <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                        <div>
                                            <Image src="/assets/img/3.png" width={20} height={20} alt="" />
                                        </div>
                                        <div className="font-medium text-[#394351]">
                                            T20 World Cup
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/t20series">
                                    <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                        <div>
                                            <Image src="/assets/img/4.png" width={20} height={20} alt="" />
                                        </div>
                                        <div className="font-medium text-[#394351]">
                                            Indian Premium League
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/t20series">
                                    <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                        <div>
                                            <Image src="/assets/img/5.png" width={20} height={20} alt="" />
                                        </div>
                                        <div className="font-medium text-[#394351]">
                                            Pakistan Super League
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/t20series">
                                    <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                        <div>
                                            <Image src="/assets/img/6.png" width={20} height={20} alt="" />
                                        </div>
                                        <div className="font-medium text-[#394351]">
                                            Bangladesh Premium Leaguge
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/t20series">
                                    <div className="bg-[#ffffff] text-[14px] rounded-lg px-4 flex items-center space-x-3 py-3 mb-2 ">
                                        <div>
                                            <Image src="/assets/img/7.png" width={20} height={20} alt="" />
                                        </div>
                                        <div className="font-medium text-[#394351]">
                                            Big Bash Leaguge
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/t20series">
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


        </section>

    )
}