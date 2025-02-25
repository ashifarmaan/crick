import React from 'react'
import Link from 'next/link';

export default function Stats() {
    return (
        <section className="lg:w-[1000px] mx-auto md:mb-0 mb-4 px-2 lg:px-0">
            <div id="tabs" className="my-4">
                <div className="flex text-1xl space-x-8 p-2 bg-[#ffffff] rounded-lg overflow-auto">
                    <Link href="/series/IPL/overview">
                        <button
                            className="font-medium py-2 px-3 whitespace-nowrap " >
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
                            className="font-medium py-2 px-3 whitespace-nowrap bg-[#1A80F8] text-white rounded-md" >
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
                                <Link href="/live-stats/most-runs-stats">
                                    <button

                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left bg-[#ecf2fd] text-[#1a80f8] rounded-md "
                                    >
                                        Most Runs
                                    </button>
                                </Link>
                                <Link href="/live-stats/most-scors">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Highest Scores
                                    </button>
                                </Link>
                                <Link href="/live-stats/best-batting-average">
                                    <button

                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"

                                    >
                                        Best Batting Average
                                    </button>
                                </Link>
                                <button

                                    className=" state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"

                                >
                                    Best Batting Strike Rate
                                </button>
                                <Link href="/live-stats/most-hundreds">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most Hundreds
                                    </button>
                                </Link>

                                <Link href="/live-stats/most-fifties">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most Fifties
                                    </button>
                                </Link>

                                <Link href="/live-stats/most-fours">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most Fours
                                    </button>
                                </Link>

                                <Link href="/live-stats/most-sixes">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most Sixes
                                    </button>
                                </Link>

                                <Link href="/live-stats/most-nineties">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most Nineties
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
                                <Link href="/live-stats/most-wickets">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most Wickets
                                    </button>
                                </Link>
                                <Link href="/live-stats/best-bowling-average">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Best Bowling Average
                                    </button>
                                </Link>

                                <Link href="/live-stats/best-bowling">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Best Bowling
                                    </button>
                                </Link>

                                <Link href="/live-stats/most5wickets-haul">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Most 5 Wickets Haul
                                    </button>
                                </Link>

                                <Link href="/live-stats/best-economy">
                                    <button
                                        className="state-btn new-class border-t px-2 py-3 w-full font-medium active text-left rounded-md hover:bg-[#ecf2fd] hover:text-[#1a80f8]"
                                    >
                                        Best Economy
                                    </button>
                                </Link>

                                <Link href="/live-stats/best-bowling-strike-rate">
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
                                        Bowling
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
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">1</td>
                                                        <td className="md:px-2 py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Virat Kohli</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">2</td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">3</td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">4</td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">6</td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">7</td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">8</td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">
                                                            10
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">
                                                            11
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">
                                                            12
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">
                                                            13
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">
                                                            14
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">
                                                            15
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="md:px-2 pl-[14px] py-3 w-[10px]">
                                                            16
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3 text-[#217AF7]">
                                                            <Link href="/player/playername/overview"> Rohit Sharma</Link>
                                                        </td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">5</td>
                                                        <td className="md:px-2 pl-[14px] py-3">123</td>
                                                        <td className="md:px-2 pl-[14px] py-3">45.50</td>
                                                        <td className="md:px-2 pl-[14px] py-3">9</td>
                                                        <td className="md:px-2 pl-[14px] py-3">0</td>
                                                        <td className="md:px-2 pl-[14px] py-3">74.65</td>
                                                    </tr>

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