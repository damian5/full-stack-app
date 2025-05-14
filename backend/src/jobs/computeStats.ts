import cron from "node-cron";
import { db } from "../db/init";

export const computeStats = async (): Promise<void> => {
  try {
    const topQueries = await db.all(`
      SELECT query, COUNT(*) as count
      FROM logs
      GROUP BY query
      ORDER BY count DESC
      LIMIT 5
    `);

    const totalQueries = await db.get(`SELECT COUNT(*) as total FROM logs`);
    const topQueriesWithPercent = topQueries.map((q) => ({
      query: q.query,
      count: q.count,
      percentage: ((q.count / totalQueries.total) * 100).toFixed(2),
    }));

    const avgDurationRow = await db.get(`
      SELECT AVG(request_time) as avg FROM logs
    `);

    const popularHourRow = await db.get(`
      SELECT strftime('%H', created_at) as hour, COUNT(*) as count
      FROM logs
      GROUP BY hour
      ORDER BY count DESC
      LIMIT 1
    `);

    await db.run(
      `
      INSERT INTO statistics (top_queries, avg_request_duration, popular_hour)
      VALUES (?, ?, ?)
    `,
      [
        JSON.stringify(topQueriesWithPercent),
        Math.round(avgDurationRow.avg ?? 0),
        Number(popularHourRow?.hour ?? 0),
      ]
    );

    console.log("Statistics updated");
  } catch (err) {
    console.error("Error computing stats:", (err as Error).message);
  }
};

export const setupCron = () =>
  cron.schedule("*/5 * * * *", async () => {
    await computeStats();
  });
