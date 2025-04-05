export const dynamic = "force-dynamic";
import React from 'react'
import Layout from "@/app/components/Layout";


import Overview from './seriesComponents/Overview';
import Banner from './seriesComponents/Banner';
import ScheduleResults from './seriesComponents/ScheduleResults';
import Squads from './seriesComponents/Squads';
import PointsTable from './seriesComponents/PointsTable';
import News from './seriesComponents/News';
import Stats from './seriesComponents/Stats';
import SeriesList from './seriesComponents/SeriesList';
import { liveSeries, seriesById, AllSeriesList, FeaturedMatch } from "@/controller/homeController";
import { SeriesKeyStats, SeriesMatches } from "@/controller/matchInfoController";
import { TeamPlayers } from "@/controller/teamController";

type Params = Promise<{ seriesName: string; seriesId: number; seriesTap: string; seriesStatsType: string }>

export default async function page(props: { params: Params }) {

  const params = await props.params;
  const seriesName = params?.seriesName;
  const seriesId = Number(params?.seriesId);
  const seriesTab = params?.seriesTap;
  const statsType = params?.seriesStatsType;

  const liveSeriesData = await liveSeries();
  const SeriesDetails = await seriesById(seriesId);
  const urlString = "/series/"+seriesName+"/"+seriesId;
  const seriesKeystats =  await SeriesKeyStats(seriesId);
  const seriesMatches =  await SeriesMatches(seriesId);

  const teamIds = SeriesDetails?.teams?.map((series: any) => series.tid) || [];
   
  const teamPlayers =  await TeamPlayers(teamIds);
  const tournamentsList = await AllSeriesList();
  const featuredMatch = await FeaturedMatch();

  const standings = SeriesDetails?.standing?.standings;
  const isPointTable = Array.isArray(standings) && standings.length > 0;
  //  console.log('teamIds', isPointTable);

  return (
    <Layout headerData={liveSeriesData}>
          {seriesName === '' || seriesName === undefined ? (
          <SeriesList tournamentsList={tournamentsList}></SeriesList>
          ):(
            <>
          <Banner seriesData={liveSeriesData} seriesInfo={SeriesDetails}></Banner>

          {seriesTab === ""  || seriesTab === undefined && <Overview  seriesInfo={SeriesDetails} seriesKeystats={seriesKeystats} urlString={urlString} featuredMatch={featuredMatch} isPointTable={isPointTable}/>}
          {seriesTab === "schedule-results" && <ScheduleResults seriesId={seriesId} seriesMatches={seriesMatches} urlString={urlString} statsType={statsType} featuredMatch={featuredMatch} isPointTable={isPointTable}/>}
          {seriesTab === "squads" && <Squads teamPlayers={teamPlayers}  seriesInfo={SeriesDetails} urlString={urlString} isPointTable={isPointTable}/>}
          {seriesTab === "points-table" && <PointsTable seriesInfo={SeriesDetails} urlString={urlString} featuredMatch={featuredMatch}/>}
          {seriesTab === "news" && <News  urlString={urlString} isPointTable={isPointTable}/>}
          {seriesTab === "stats" && <Stats seriesId={seriesId} urlString={urlString} statsType={statsType} isPointTable={isPointTable}/>}
          
          </>
          )
        }
    </Layout>
  )
}