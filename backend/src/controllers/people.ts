import { Request, Response } from "express";
import { db } from "../db/init";

export const getPeople = async (req: Request, res: Response): Promise<void> => {
  const q = req.query.name?.toString().toLowerCase() || "";

  try {
    const people = await db.all(
      "SELECT id, name FROM people WHERE LOWER(name) LIKE ?",
      [`%${q}%`]
    );

    res.json(people);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPersonById = async (req: Request, res: Response): Promise<void> => {
  const personId = Number(req.params.id);

  if (isNaN(personId)) {
    res.status(400).json({ error: "Invalid person ID" });
    return;
  }

  try {
    const person = await db.get(
      "SELECT * FROM people WHERE id = ?",
      [personId]
    );

    if (!person) {
      res.status(404).json({ error: "Person not found" });
      return;
    }

    const films = await db.all(
      `
      SELECT f.id, f.title, f.opening_crawl
      FROM films f
      JOIN film_people fp ON f.id = fp.film_id
      WHERE fp.person_id = ?
      `,
      [personId]
    );

    res.json({
      ...person,
      films,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};