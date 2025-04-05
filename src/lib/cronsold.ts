import cron from "node-cron";
import type { NextApiRequest, NextApiResponse } from "next";
import { 
  InsertOrUpdatePlayers,
  InsertOrUpdateTeams,
  InsertOrUpdateCompetitions,
  UpdateManOfTheMatches,
  MatchInfo,
  CompetitionInfo,
  MatchStatistics,
  CompetitionsStats,
  CompetitionMatches,
  MatchCommentary,
  TeamPlayersData,
  PlayerStatsData,
  PlayerAdvanceStatsData,
  Last10MatchData,
  TeamMatches,
  InsertOrUpdateUpcomingMatches,
  InsertOrUpdateLiveMatches,
  InsertOrUpdateCompletedMatches,
} from "../controller/dbController"; // Import the function


const job1 = cron.schedule("0 1 * * *", async () => {
  const response = await InsertOrUpdatePlayers();
}, { scheduled: false });

const job2 = cron.schedule("0 1 * * *", async () => {
  const response = await InsertOrUpdateTeams();
}, { scheduled: false });

const job3 = cron.schedule("0 2 * * *", async () => {
  const response = await InsertOrUpdateCompetitions();
}, { scheduled: false });

const job4 = cron.schedule("0 2 * * *", async () => {
  const response = await UpdateManOfTheMatches();
}, { scheduled: false });

const job5 = cron.schedule("*/5 * * * *", async () => {
  const response = await MatchInfo();
}, { scheduled: false });

const job6 = cron.schedule("0 3 * * *", async () => {
  const response = await CompetitionInfo();
}, { scheduled: false });

const job7 = cron.schedule("0 * * * *", async () => {
  const response = await MatchStatistics();
}, { scheduled: false });

const job8 = cron.schedule("0 4 * * *", async () => {
  const response = await CompetitionsStats();
}, { scheduled: false });

const job9 = cron.schedule("0 4 * * *", async () => {
  const response = await CompetitionMatches();
}, { scheduled: false });

const job10 = cron.schedule("0 * * * *", async () => {
  const response = await MatchCommentary();
}, { scheduled: false });

const job11 = cron.schedule("0 5 * * *", async () => {
  const response = await TeamPlayersData();
}, { scheduled: false });

const job12 = cron.schedule("0 5 * * *", async () => {
  const response = await PlayerStatsData();
}, { scheduled: false });

const job13 = cron.schedule("0 5 * * *", async () => {
  const response = await PlayerAdvanceStatsData();
}, { scheduled: false });

const job14 = cron.schedule("0 5 * * *", async () => {
  const response = await TeamMatches();
}, { scheduled: false });

const job15 = cron.schedule("0 4 * * *", async () => {
  const response = await PlayerStatsData();
}, { scheduled: false });

// Schedule the cron job
const job16 = cron.schedule("0 1 * * *", async () => { // Runs every day
  console.log("Executing cron job...");
  const response = await InsertOrUpdateCompletedMatches();
}, { scheduled: false });

const job17 = cron.schedule("*/1 * * * *", async () => { // Runs every hour
  console.log("Executing cron job...");
  const response = await InsertOrUpdateLiveMatches();
}, { scheduled: false });

const job18 = cron.schedule("0 * * * *", async () => { // Runs every day
  console.log("Executing cron job...");
  const response = await InsertOrUpdateUpcomingMatches();
}, { scheduled: false });

const job19 = cron.schedule("0 3 * * *", async () => { // Runs every day
  console.log("Executing cron job...");
  const response = await Last10MatchData();
}, { scheduled: false });

job1.start();
job2.start();
job3.start();
job4.start();
job5.start();
job6.start();
job7.start();
job8.start();
job9.start();
job10.start();
job11.start();
job12.start();
job13.start();
job14.start();
job15.start();
job16.start();
job17.start();
job18.start();
job19.start();
// export default cron;

export { job1, job2, job3, job4, job5, job6, job7, job8, job9, job10, job11, job12, job13, job14, job15, job16, job17, job18, job19};