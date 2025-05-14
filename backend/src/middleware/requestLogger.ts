import { Request, Response, NextFunction } from "express";
import { db } from "../db/init";

export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;
    const query = req.originalUrl;

    try {
      await db.run(
        `
        INSERT INTO logs (query, request_time)
        VALUES (?, ?)
        `,
        [query, duration]
      );
    } catch (err) {
      console.error("Error saving request log:", (err as Error).message);
    }
  });

  next();
};
