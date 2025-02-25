import React from 'react'
import Image from "next/image";
import Link from 'next/link';

export default function Squad() {
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
                            className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white rounded-md"
                        >
                            Squads
                        </button>
                    </Link>
                    <Link href="/series/IPL/points-table">
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap"
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


            <div id="squads" className="tab-content">
                <div className="py-2 mb-2">
                    <h3 className="text-1xl font-semibold pl-[3px] border-l-[3px] border-[#1a80f8]">
                        WT20 World Cup 2024 Squads
                    </h3>
                </div>
                <div className="md:grid grid-cols-12 gap-4">
                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="rounded-lg p-2 mb-4 bg-[#ffffff]">
                            <div id="team-buttons" className="">
                                <Link href="#">
                                    <button
                                        className="team-btn border-b px-2 mb-1 py-3 w-full text-[#394351] bg-[#eaeaea] rounded-md font-medium flex items-center"
                                        data-target="aus-team"
                                    >
                                        <Image
                                            src="/assets/img/flag/1.png"
                                            className="mr-3"
                                            width={20} height={20} alt="Afghanistan Flag"
                                        />
                                        Australia-W
                                    </button>
                                </Link>

                                <Link href="/match-squad-india">
                                    <button
                                        className="team-btn px-2 py-3 w-full text-[#394351] font-medium hover:bg-[#eaeaea] rounded-md flex items-center"
                                        data-target="ind-team"
                                    >
                                        <Image
                                            src="/assets/img/flag/1.png"
                                            className="mr-3"
                                            width={20} height={20} alt="Bangladesh Flag"
                                        />
                                        India-W
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 md:col-span-7">
                    <div id="south-team" className="team-content ">
                                <div className="max-w-7xl mx-auto bg-white rounded-lg p-6">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <Image
                                            src="/assets/img/flag/b-5.png"
                                            width={45} height={45} alt="South Africa Flag"
                                            className="h-[45px] rounded-full"
                                        />
                                        <h1 className="text-[16px] font-semibold text-gray-800">
                                            South Africa Women{" "}
                                            <span className="text-gray-500">(15 players)</span>
                                        </h1>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        
                                        <div>
                                            <h2 className="text-1xl font-semibold pl-[5px] border-l-[3px] border-[#1a80f8] mb-4">
                                                Batsman
                                            </h2>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-7.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-blue-500 ">
                                                            L Wolvaardt<span className="text-blue-500">(c)</span>
                                                        </h3>
                                                        <p className="text-xs text-gray-600">Batsman</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-8.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            T Brits
                                                        </h3>
                                                        <p className="text-xs text-gray-600">Batsman</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-9.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-blue-500">
                                                            M Ridder<span className="text-blue-500">(wk)</span>
                                                        </h3>
                                                        <p className="text-xs text-gray-600">Batsman</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-10.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            S Jafta<span className="text-blue-500">(wk)</span>
                                                        </h3>
                                                        <p className="text-xs text-gray-600">Batsman</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        {/* Bowler Section */}
                                        <div>
                                            <h2 className="text-1xl font-semibold pl-[5px] border-l-[3px] border-[#1a80f8] mb-4">
                                                Bowler
                                            </h2>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-11.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/ball.png"
                                                                className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={24} height={24} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            A Hlubi
                                                        </h3>
                                                        <p className="text-xs text-gray-600">Bowler</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-12.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/ball.png"
                                                                className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={24} height={24} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            A Khaka
                                                        </h3>
                                                        <p className="text-xs text-gray-600">Bowler</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-13.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/ball.png"
                                                                className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={24} height={24} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            N Mlaba
                                                        </h3>
                                                        <p className="text-xs text-gray-600">Bowler</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-14.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/ball.png"
                                                                className="h-[24px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={24} height={24} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            T Sekhukhune
                                                        </h3>
                                                        <p className="text-xs text-gray-600">Bowler</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        {/* All-Rounder Section */}
                                        <div>
                                            <h2 className="text-1xl font-semibold pl-[5px] border-l-[3px] border-[#1a80f8] mb-4">
                                                All-Rounder
                                            </h2>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-15.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat-ball.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            A Bosch
                                                        </h3>
                                                        <p className="text-xs text-gray-600">All-Rounder</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-16.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat-ball.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            N Klerk
                                                        </h3>
                                                        <p className="text-xs text-gray-600">All-Rounder</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-17.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat-ball.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            A Dercksen
                                                        </h3>
                                                        <p className="text-xs text-gray-600">All-Rounder</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-18.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat-ball.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            M Kapp
                                                        </h3>
                                                        <p className="text-xs text-gray-600">All-Rounder</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-19.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat-ball.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            M Kapp
                                                        </h3>
                                                        <p className="text-xs text-gray-600">All-Rounder</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-20.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat-ball.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            M Kapp
                                                        </h3>
                                                        <p className="text-xs text-gray-600">All-Rounder</p>
                                                    </div>
                                                </Link>
                                                <Link href="/player/playername/overview">
                                                    <div className="text-center p-4 rounded-md border-[1px] border-[##E2E2E2]">
                                                        <div className="relative">
                                                            <Image
                                                                src="/assets/img/player/g-21.png"
                                                                width={80} height={80} alt="Player Image"
                                                                className="w-16 h-16 mx-auto rounded-full mb-2"
                                                            />
                                                            <Image
                                                                src="/assets/img/player/bat-ball.png"
                                                                className="h-[27px] absolute right-2 bottom-0 bg-white rounded-full p-[4px]"
                                                                width={27} height={27} alt=""
                                                            />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-800">
                                                            M Kapp
                                                        </h3>
                                                        <p className="text-xs text-gray-600">All-Rounder</p>
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