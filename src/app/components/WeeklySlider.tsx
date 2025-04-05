"use client";
import Image from "next/image";
import React, { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { urlStringEncode } from "../../utils/utility";
interface featuredMatch {
  featuredMatch: any; // Adjust type based on your data
}
const WeeklySlider = ({ featuredMatch }: featuredMatch) => {
  const [activeIndex, setActiveIndex] = useState(0);
  let slides: any = "";

  if (featuredMatch) {
    slides = featuredMatch.map((match: any) => ({
      teams: [
        { country: match.teama.name, flag: match.teama.logo_url },
        { country: match.teamb.name, flag: match.teamb.logo_url },
      ],
      countdown: match.date_start_ist, // Replace with dynamic countdown logic
      match: match.title,
      match_number: match.match_number,
      title: match.competition?.title,
      season: match.competition?.season,
      match_id: match.match_id,
    }));
  }
  const handlePrevClick = () => {
    setActiveIndex(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  };

  const handleNextClick = () => {
    setActiveIndex(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div className="cust-slider-container w-full overflow-hidden my-4 ">
      {slides.length > 0 && (
        <>
          <div
            className="cust-slider w-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides?.map((slide: any, index: number) => (
              <div key={index} className="cust-slide w-full flex-shrink-0">
                <div className="rounded-lg p-4 mb-2 bg-[#ffffff]">
                  <div className="flex items-center justify-between md:mb-4 mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className="flex items-center text-[#0F55A5] rounded-full pr-3 font-semibold"
                        style={{ gap: 3 }}
                      >
                        <span className="rounded-full">●</span> FEATURED
                      </div>
                    </div>
                    <div className="h-[20px] border-l-[1px] border-[#d0d3d7]" />
                    <div className="flex items-center space-x-2">
                      <span className="text-[13px] font-medium">
                        {slide?.teams?.[0].country}
                      </span>
                      <span className="flex items-center bg-[#FAFFFC] border-[1px] border-[#0B773C] md:rounded-full rounded-md text-[#0B773C] pr-2">
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
                            />
                          </svg>
                        </span>
                        0
                      </span>
                      <span className="flex items-center bg-[#FFF7F7] border-[1px] border-[#A70B0B]  md:rounded-full rounded-md text-[#A70B0B] pr-2">
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
                            />
                          </svg>
                        </span>
                        0
                      </span>
                    </div>
                  </div>
                  <div className="border-t-[1px] border-[#E7F2F4]" />
                  <div className="md:py-4 py-2 md:px-3 md:mb-0 mb-2">
                  <Link href={"/matchinfo/"+urlStringEncode(slide?.teams?.[0].country+"-vs-"+slide?.teams?.[1].country+"-match-"+slide?.match_number+"-"+slide?.title+"-"+slide?.season)+"/" + slide.match_id}>
                    <div className="flex justify-between items-center text-[14px]">
                      <div>
                        {slide.teams?.map((team: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2 font-medium w-[162px] md:w-full mb-4"
                          >
                            
                            <div className="flex items-center space-x-2">
                              <Image
                                loading="lazy"
                                src={team.flag}
                                alt={team.country}
                                className="h-[25px] rounded-full"
                                width={25}
                                height={25}
                              />
                              <span className="text-[#5e5e5e] font-medium">
                                {team.country}
                              </span>
                            </div>
                            
                          </div>
                        ))}
                      </div>
                      <div className="md:block hidden h-[70px] border-l-[1px] border-[#d0d3d7]"></div>
                      <div className="font-semibold text-center">
                        <p className="text-[#586577] text-[12px] mb:mb-4 mb-1 font-medium">
                          {format(new Date(slide.countdown), "dd MMMM - EEEE")},{" "}
                          <br />
                          {format(new Date(slide.countdown), "hh:mm:aa")}
                        </p>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="border-t-[1px] border-[#E7F2F4]" />
                  <div className="mt-2">
                    <p className="text-[#909090] font-medium">{slide.match}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {slides.length > 1 && (
            <div className="cust-slider-nav flex justify-between items-center">
              <button
                onClick={handlePrevClick}
                className="cust-prev-btn bg-[#ffffff] p-[7px] rounded-full border-2"
              >
                <span className="text-[20px] font-bold">
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
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
              <div className="flex justify-center space-x-2">
                {slides &&
                  slides?.map((_: any, index: number) => (
                    <span
                      key={index}
                      className={`dot w-[13px] h-[4px] rounded-full cursor-pointer ${
                        activeIndex === index ? "bg-blue-500" : "bg-gray-400"
                      }`}
                      onClick={() => setActiveIndex(index)}
                    />
                  ))}
              </div>
              <button
                onClick={handleNextClick}
                className="cust-next-btn bg-[#ffffff] p-[7px] rounded-full border-2"
              >
                <span className="text-[20px] font-bold">
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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeeklySlider;