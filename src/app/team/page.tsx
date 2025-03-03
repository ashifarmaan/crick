import React from 'react'
import Layout from "@/app/components/Layout";
import { liveSeries } from "@/controller/homeController";
import { TeamDetails, TeamLast5match } from "@/controller/teamController";

import Teams from './teamComponents/teamDetails';

type Params = Promise<{ teamType: string; teamName: string; teamId: number }>

export default async function page(props: { params: Params }) {

  const params = await props.params;
  const teamName = params?.teamName;
  const teamType = params?.teamType;
  const teamId = params?.teamId;

  const liveSeriesData = await liveSeries();
  const teamDetails = await TeamDetails(teamId);
  const teamLast5match = await TeamLast5match(teamId,2);
  const teamUpcomingMatch = await TeamLast5match(teamId,1);


  return (
    <Layout headerData={liveSeriesData}>
      <Teams  teamLast5match={teamLast5match} teamUpcomingMatch={teamUpcomingMatch} teamDetails={teamDetails} params={params}/>

    </Layout>
  )
  
}