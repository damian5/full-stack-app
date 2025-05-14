import { Request, Response } from "express";
import { db } from "../db/init";
import { TopQuery } from "../types";

export const getStatistics = async (_: Request, res: Response): Promise<void> => {
  try {
    const row = await db.get(`
      SELECT * FROM statistics
      ORDER BY created_at DESC
      LIMIT 1
    `);

    if (!row) {
      res.status(404).json({ error: "No statistics available" });
      return;
    }

    let topQueries: TopQuery[] = [];
    try {
      topQueries = JSON.parse(row.top_queries);
    } catch {
      console.warn("ailed to parse top_queries");
    }

    res.json({
      id: row.id,
      top_queries: topQueries,
      avg_request_duration: row.avg_request_duration,
      popular_hour: row.popular_hour,
      created_at: row.created_at,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
