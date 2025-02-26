import React from 'react'
import Layout from "@/app/components/Layout";


import Overview from './seriesComponents/Overview'
import Banner from './seriesComponents/Banner'
import ScheduleResults from './seriesComponents/ScheduleResults'
import Squads from './seriesComponents/Squads'
import PointsTable from './seriesComponents/PointsTable';
import News from './seriesComponents/News'
import Stats from './seriesComponents/Stats'
import { liveSeries, seriesById } from "@/controller/homeController";

type Params = Promise<{ seriesName: string; seriesId: number; seriesTab: string }>

export default async function page(props: { params: Params }) {

  const params = await props.params;
  const seriesName = params?.seriesName;
  const seriesId = Number(params?.seriesId);
  const seriesTab = params?.seriesTab;

    const liveSeriesData = await liveSeries();
    const SeriesDetails = await seriesById(Number(seriesId));
//    console.log('params', SeriesDetails);

  return (
    <Layout headerData={liveSeriesData}>

          <Banner seriesData={liveSeriesData} seriesInfo={SeriesDetails}></Banner>

          {<Overview />}
          {/* {seriesTab === "schedule-Results" && <ScheduleResults />}
          {seriesTab === "squads" && <Squads />}
          {seriesTab === "points-table" && <PointsTable />}
          {seriesTab === "news" && <News />}
          {seriesTab === "stats" && <Stats />} */}

       
    </Layout>
  )
}