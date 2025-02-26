import React from 'react'
import Layout from "@/app/components/Layout";


import Overview from './seriesComponents/Overview'
import Banner from './seriesComponents/Banner'
import ScheduleResults from './seriesComponents/ScheduleResults'
import Squads from './seriesComponents/Squads'
import PointsTable from './seriesComponents/PointsTable';
import News from './seriesComponents/News'
import Stats from './seriesComponents/Stats'
import { liveSeries, seriesById, seriesUpcomingMatches } from "@/controller/homeController";
import { SeriesKeyStats } from "@/controller/matchInfoController";

type Params = Promise<{ seriesName: string; seriesId: number; seriesTap: string; }>

export default async function page(props: { params: Params }) {

  const params = await props.params;
  const seriesName = params?.seriesName;
  const seriesId = Number(params?.seriesId);
  const seriesTab = params?.seriesTap;

    const liveSeriesData = await liveSeries();
    const SeriesDetails = await seriesById(seriesId);
    // const upcomingMatches = await seriesUpcomingMatches(seriesId);
  const urlString = "/series/"+seriesName+"/"+seriesId;
  const seriesKeystats =  await SeriesKeyStats(seriesId);
   
  //  console.log('param', params);

  return (
    <Layout headerData={liveSeriesData}>

          <Banner seriesData={liveSeriesData} seriesInfo={SeriesDetails}></Banner>

          {seriesTab === ""  || seriesTab === undefined && <Overview  seriesInfo={SeriesDetails} seriesKeystats={seriesKeystats} urlString={urlString}/>}
          {seriesTab === "schedule-results" && <ScheduleResults  urlString={urlString}/>}
          {seriesTab === "squads" && <Squads  urlString={urlString}/>}
          {seriesTab === "points-table" && <PointsTable seriesInfo={SeriesDetails} urlString={urlString} />}
          {seriesTab === "news" && <News  urlString={urlString}/>}
          {seriesTab === "stats" && <Stats  urlString={urlString}/>}

       
    </Layout>
  )
}