"use client"


import React, { useRef, useState } from "react";
import Image from "next/image";
import eventEmitter from "@/utils/eventEmitter";
import { format, isSameDay  } from "date-fns";
import CountdownTimer from "../../components/countdownTimer";

interface Banner {
    matchData: any | null; 
    match_id : number;
  }
export default function Banner({matchData, match_id } : Banner) {
    

    const [matchLiveData, setmatchLiveData] = useState(matchData);

    const handleMatchData = (data: any) => {
        // console.log("handledata", data?.match_id , "matchId", match_id);
        if (data?.match_id == match_id) {
          setmatchLiveData(data); // ✅ Update only when new data is received
        }
      };
    
    eventEmitter.on("matchLiveData", handleMatchData);

    const liveMatch = matchLiveData;
    const teamascores = liveMatch?.match_info?.teama?.scores ?? "";
    const teambscores = liveMatch?.match_info?.teamb?.scores ?? "";
    const teamaovers = liveMatch?.match_info?.teama?.overs ?? "";
    const teambovers = liveMatch?.match_info?.teamb?.overs ?? "";
  
    // Split by " & " to separate both innings
    const [inning1teamarun, inning2teamarun] = teamascores.includes(" & ")
      ? teamascores.split(" & ")
      : [teamascores, ""];
    const [inning1teambrun, inning2teambrun] = teambscores.includes(" & ")
      ? teambscores.split(" & ")
      : [teambscores, ""];
    const [inning1teamaOver, inning2teamaOver] = teamaovers.includes(" & ")
      ? teamaovers.split(" & ")
      : [teamaovers, ""];
    const [inning1teambOver, inning2teambOver] = teambovers.includes(" & ")
      ? teambovers.split(" & ")
      : [teambovers, ""];

    console.log("banner",liveMatch?.match_info?.teama);
    return (
        <>
          {liveMatch?.match_info?.status_str == "Completed" ? (
            <section className="bg-[#0E2149] border-[1px] border-[#E4E9F01A] lg:px-0 px-3">
              <div className="lg:w-[1000px] mx-auto">
                <div className="md:flex justify-between items-center md:py-0 py-4">
                  <div className=" text-1xl text-[#13b76dbd] font-bold uppercase ">
                    <span className="h-[10px] w-[10px] inline-block	bg-[#13b76dbd] rounded-full" />{" "}
                    {liveMatch?.match_info?.status_str}
                  </div>
                  <div className="text-[#8192B4] font-normal  text-1xl md:text-center md:mx-0 my-3">
                    {liveMatch?.match_info?.short_title},&nbsp;
                    <span className="font-semibold text-[#b9b9b9]">
                      {" "}
                       {liveMatch?.match_info?.subtitle}
                    </span>
                  </div>
                  <div className="flex text-[#8192B4] text-1xl font-normal md:justify-start">
                    <Image
                      src="/assets/img/clander.png"
                      className="mr-2"
                      width={20}
                      height={20}
                      alt=""
                    />
                    { liveMatch?.match_info?.date_start_ist ? format(new Date(liveMatch?.match_info?.date_start_ist), "dd MMM yyyy") :""}
                  </div>
                </div>
              </div>
              <div className="border-t-[1px] border-[#E4E9F01A]">
                <div className="lg:w-[1000px] mx-auto md:py-8 tracking-[1px]">
                  <div className="md:flex py-8 justify-between items-center">
                    <div className="flex gap-2 flex-row text-[#BDCCECA8] uppercase items-center w-full">
                    {liveMatch?.match_info?.teama?.logo_url ? (
                      <Image
                        className="lg:h-[42px] lg:w-[42px] h-[30px] w-[30px]"
                        src={liveMatch?.match_info?.teama?.logo_url}
                        width={30}
                        height={30}
                        alt="ind"
                      />
                    ):("")}
                      <div className="flex md:flex-col md:items-start items-center md:gap-0 gap-2">
                        <p className="text-[#BDCCECA8] md:text-[17px] lg:text-[19px] text-[14px] font-semibold uppercase">
                          {liveMatch?.match_info?.teama?.short_name}
                        </p>
                        <p
                          className={
                            "lg:text-[18px] text-[16px] font-semibold matchinfo" +
                            match_id +
                            "-" +
                            liveMatch?.match_info?.teama?.team_id
                          }
                        >
                          {inning1teamarun ? (
                            <>
                              {inning1teamarun}{" "}
                              <span className="text-[13px] font-medium">
                                ({inning1teamaOver})
                              </span>
                            </>
                          ) : (
                            "Yet To Bat"
                          )}
    
                          {inning2teamarun ? (
                            <>
                              {" "}
                              &nbsp; &amp; &nbsp; {inning2teamarun}{" "}
                              {inning2teamaOver !== "" && (
                                <span className="text-[13px] font-medium">
                                  ({inning2teamaOver})
                                </span>
                              )}
                            </>
                          ) : (
                            " "
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-[#8192B4] font-normal w-full text-center md:my-0 my-4 flex gap-2 items-center">
                      <p className="text-[#13b76dbd] lg:text-[24px] text-[16px] font-semibold">
                        {liveMatch?.live?.status_note}
                      </p>
                      <Image
                        src="/assets/img/home/win-2.png"
                        width={40}
                        height={40}
                        alt=""
                      />
                    </div>
                    <div className="flex gap-2 flex-row-reverse md:flex-row  items-center text-[#8192B4] font-normal w-full justify-end">
                      <div className="flex md:flex-col md:items-end items-center md:gap-0 gap-2">
                        <p className="text-[#BDCCECA8] md:text-[17px] lg:text-[19px] text-[14px] font-semibold uppercase">
                          {liveMatch?.match_info?.teamb?.short_name}
                        </p>
                        <p
                          className={
                            "lg:text-[18px] text-[16px] font-semibold matchinfo" +
                            match_id +
                            "-" +
                            liveMatch?.match_info?.teamb?.team_id
                          }
                        >
                          {inning1teambrun ? (
                            <>
                              {inning1teambrun}{" "}
                              <span className="text-[13px] font-medium">
                                ({inning1teambOver})
                              </span>
                            </>
                          ) : (
                            "Yet To Bat"
                          )}
    
                          {inning2teambrun ? (
                            <>
                              {" "}
                              &nbsp; &amp; &nbsp; {inning2teambrun}{" "}
                              {inning2teambOver !== "" && (
                                <span className="text-[13px] font-medium">
                                  ({inning2teambOver})
                                </span>
                              )}
                            </>
                          ) : (
                            " "
                          )}
                        </p>
                      </div>
                      {liveMatch?.match_info?.teamb?.logo_url ? (
                      <Image
                        src={liveMatch?.match_info?.teamb?.logo_url}
                        className="lg:h-[42px] lg:w-[42px] h-[30px] w-[30px]"
                        width={30}
                        height={30}
                        alt="ban"
                      />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : liveMatch?.match_info?.status_str == "Live" ? (
            <section className="bg-[#0E2149] border-[1px] border-[#E4E9F01A] lg:px-0 px-3">
              <div className="lg:w-[1000px] mx-auto">
                <div className="md:flex justify-between items-center md:py-0 py-4">
                  <div className="flex items-center text-1xl text-[#FE4848] font-bold uppercase relative">
                    <Image
                      src="/assets/img/home/blinking-dot.gif"
                      className="h-[20px]"
                      width={20}
                      height={20}
                      alt=""
                    />
                    {liveMatch?.match_info?.status_str}
                  </div>
                  <div className="text-[#8192B4] font-normal  text-1xl md:text-center md:mx-0 my-3">
                    {liveMatch?.match_info?.short_title},&nbsp;
                    <span className="font-semibold text-[#b9b9b9]">
                      {" "}
                       {liveMatch?.match_info?.subtitle}
                    </span>
                  </div>
                  <div className="flex text-[#8192B4] text-1xl font-normal md:justify-start">
                    <Image
                      src="/assets/img/clander.png"
                      className="mr-2"
                      width={20}
                      height={20}
                      alt=""
                    />
                    {liveMatch?.match_info?.date_start_ist ? format(new Date(liveMatch?.match_info?.date_start_ist), "dd MMM yyyy") :""}
                  </div>
                </div>
              </div>
              <div className="border-t-[1px] border-[#E4E9F01A]">
                <div className="lg:w-[1000px] mx-auto md:py-9 tracking-[1px]">
                  <div className="hidden md:flex py-8 justify-between items-center">
                    <div className="flex gap-2 flex-row text-[#BDCCECA8] uppercase items-center w-full">
                    {liveMatch?.match_info?.teama?.logo_url ? (
                      <Image
                        className="lg:h-[42px] lg:w-[42px] h-[30px] w-[30px]"
                        src={liveMatch?.match_info?.teama?.logo_url}
                        width={30}
                        height={30}
                        alt="ind"
                      />
                      ) : (
                        ""
                      )}
                      <div className="flex md:flex-col md:items-start items-center md:gap-0 gap-2">
                        <p className="text-[#BDCCECA8] md:text-[17px] lg:text-[19px] text-[14px] font-semibold uppercase">
                          {liveMatch?.match_info?.teama?.short_name}
                        </p>
                        <p
                          className={
                            "lg:text-[18px] text-[16px] font-semibold matchinfo" +
                            match_id +
                            "-" +
                            liveMatch?.match_info?.teama?.team_id
                          }
                        >
                          {inning1teamarun ? (
                            <>
                              {inning1teamarun}{" "}
                              <span className="text-[13px] font-medium">
                                ({inning1teamaOver})
                              </span>
                            </>
                          ) : (
                            "Yet To Bat"
                          )}
    
                          {inning2teamarun ? (
                            <>
                              {" "}
                              &nbsp; &amp; &nbsp; {inning2teamarun}{" "}
                              {inning2teamaOver !== "" && (
                                <span className="text-[13px] font-medium">
                                  ({inning2teamaOver})
                                </span>
                              )}
                            </>
                          ) : (
                            " "
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-[#8192B4] font-normal w-full text-center md:my-0 my-4">
                      <p
                        className={
                          "text-[#FFBD71] lg:text-[20px] text-[16px] ballEvent" +
                          match_id
                        }
                      >
                        {liveMatch?.live?.status_note}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-row-reverse md:flex-row  items-center text-[#8192B4] font-normal w-full justify-end">
                      <div className="flex md:flex-col md:items-end items-center md:gap-0 gap-2">
                        <p className="text-[#BDCCECA8] md:text-[17px] lg:text-[19px] text-[14px] font-semibold uppercase">
                          {liveMatch?.match_info?.teamb?.short_name}
                        </p>
                        <p
                          className={
                            "lg:text-[18px] text-[16px] font-semibold matchinfo" +
                            match_id +
                            "-" +
                            liveMatch?.match_info?.teamb?.team_id
                          }
                        >
                          {inning1teambrun ? (
                            <>
                              {inning1teambrun}{" "}
                              <span className="text-[13px] font-medium">
                                ({inning1teambOver})
                              </span>
                            </>
                          ) : (
                            "Yet To Bat"
                          )}
    
                          {inning2teambrun ? (
                            <>
                              {" "}
                              &nbsp; &amp; &nbsp; {inning2teambrun}{" "}
                              {inning2teambOver !== "" && (
                                <span className="text-[13px] font-medium">
                                  ({inning2teambOver})
                                </span>
                              )}
                            </>
                          ) : (
                            " "
                          )}
                        </p>
                      </div>
                      {liveMatch?.match_info?.teamb?.logo_url ? (
                      <Image
                        src={liveMatch?.match_info?.teamb?.logo_url}
                        className="lg:h-[42px] lg:w-[42px] h-[30px] w-[30px]"
                        width={30}
                        height={30}
                        alt="ban"
                      />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
    
                  <div className="md:hidden block bg-[white] p-4 rounded-md mb-4">
                    <div>
                      <div>
                        <div className="flex items-center text-[14px] text-[#FE4848] font-semibold  relative">
                          <Image
                            src="/assets/img/home/blinking-dot.gif"
                            className="h-[15px]"
                            width={30}
                            height={30}
                            alt=""
                          />
                          {liveMatch?.match_info?.status_str}
                        </div>
    
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2 flex-row  uppercase items-center w-full">
                            <Image
                              className="lg:h-[42px] lg:w-[42px] h-[40px] w-[40px]"
                              src="/assets/img/flg-1.png"
                              width={30}
                              height={30}
                              alt="ind"
                            />
                            <div className="flex flex-col items-start gap-0">
                              <p className="text-[14px] font-semibold uppercase">
                                {liveMatch?.live?.team_batting}
                              </p>
                              <p className="lg:text-[18px] text-[18px] font-semibold">
                                {liveMatch?.live?.live_score?.runs}/
                                {liveMatch?.live?.live_score?.wickets}{" "}
                                <span className="text-[13px] font-medium">
                                  ({liveMatch?.live?.live_score?.overs})
                                </span>
                              </p>
                            </div>
                          </div>
    
                          <div className="border-r-[1px] border-[#e5e5e5] h-[60px]"></div>
    
                          <div className="w-full text-center">
                            <h2
                              className={
                                "text-[24px] font-semibold text-[#342df2] ballEvent" +
                                match_id
                              }
                            ></h2>
                          </div>
                        </div>
    
                        <div className="flex items-center justify-between mt-3 text-[14px]">
                          <p>
                            CRR :{" "}
                            <span>{liveMatch?.live?.live_score?.runrate}</span>
                          </p>
                          <p>{/* Over left Today : <span>36.0</span> */}</p>
                        </div>
                      </div>
    
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="bg-[#0E2149] border-[1px] border-[#E4E9F01A] lg:px-0 px-3">
              <div className="lg:w-[1000px] mx-auto">
                <div className="md:flex justify-between items-center md:py-0 py-4">
                  <div className=" text-1xl text-[#FF912C] font-bold uppercase w-full">
                    <span className="h-[10px] w-[10px] inline-block	bg-[#FF912C] rounded-full" />{" "}
                    {liveMatch?.match_info?.status_str}
                  </div>
                  <div className="text-[#8192B4] font-normal w-full text-1xl md:text-center md:mx-0 my-3">
                  {liveMatch?.match_info?.short_title},&nbsp; {liveMatch?.match_info?.subtitle}
                  </div>
                  
                  <div className="flex text-[#8192B4] text-1xl font-normal w-full md:justify-end">
                    <Image
                      src="/assets/img/clander.png"
                      className="mr-2"
                      width={20}
                      height={10}
                      alt=""
                    />
                    {liveMatch?.match_info?.date_start_ist ? format(new Date(liveMatch?.match_info?.date_start_ist), "dd MMM yyyy") :""}
                  </div>
                </div>
              </div>
              <div className="border-t-[1px] border-[#E4E9F01A] h-48">
                <div className="lg:w-[1000px] mx-auto md:py-8 tracking-[1px]">
                  <div className="flex py-8 justify-between items-center">
                    <div className="flex flex-col md:flex-row text-[#FF912C] font-bold uppercase  md:items-center items-start w-full">
                    {liveMatch?.match_info?.teama?.logo_url?(
                      <Image
                        className="md:h-[42px] md:w-[42px] h-[30px] w-[30px]"
                        src={liveMatch?.match_info?.teama?.logo_url}
                        width={30}
                        height={30}
                        alt={liveMatch?.match_info?.teama?.short_name}
                      />
                      ) : (
                      "")}
                      <p className="text-[#BDCCECA8] md:mx-3 mx-0 md:text-[19px] text-[14px] font-semibold uppercase">
                      {liveMatch?.match_info?.teama?.short_name}
                      </p>
                    </div>
                    <div className="text-[#8192B4] font-normal w-full text-center">
                    <p className="text-[#C1CEEA] text-1xl"> {liveMatch?.match_info?.date_start_ist ?  format(new Date(liveMatch?.match_info?.date_start_ist), "hh:mm:aa") : ""}  </p>
                      
                      { liveMatch?.match_info?.date_start_ist ? isSameDay(new Date(), new Date(liveMatch?.match_info?.date_start_ist))?(
                                      <CountdownTimer targetTime={liveMatch?.match_info?.date_start_ist} />
                                    
                                    ):(
                                      
                                      <p className="text-[#FFBD71] md:text-[24px] text-[16px] font-semibold">
                                      {liveMatch?.match_info?.date_start_ist ? format(new Date(liveMatch?.match_info?.date_start_ist), "dd MMM yyyy") :""}
                                    </p>
                                  ) : ""}
                      
                      
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center items-end text-[#8192B4] font-normal w-full justify-end">
                      <p className="text-[#BDCCECA8] md:block hidden md:text-[19px] text-[14px] md:mx-3 mx-0 font-semibold uppercase">
                      {liveMatch?.match_info?.teamb?.short_name}
                      </p>
                      {liveMatch?.match_info?.teamb?.logo_url ?(
                      <Image
                        src={liveMatch?.match_info?.teamb?.logo_url}
                        className="md:h-[42px] md:w-[42px] h-[30px] w-[30px]"
                        width={30}
                        height={30}
                        alt={liveMatch?.match_info?.teamb?.short_name}
                      />
                      ) : (
                      ""
                      )}
                      <p className="text-[#BDCCECA8] md:hidden md:text-[19px] text-[14px] md:mx-3 mx-0 font-semibold uppercase">
                      {liveMatch?.match_info?.teamb?.short_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        }
    </>
    );
}
