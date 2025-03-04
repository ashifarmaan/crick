import React from 'react'
import Layout from "@/app/components/Layout";
import Image from 'next/image';
import WeeklySlider from "@/app/components/WeeklySlider";
import H2h from './h2h';
import { liveSeries } from "@/controller/homeController";

export default async function Page() {

  const liveSeriesData = await liveSeries();



    return (
        <Layout  headerData={liveSeriesData}>
            
        <H2h ></H2h>

        </Layout>
    )
}