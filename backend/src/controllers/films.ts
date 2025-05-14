import { Request, Response } from "express";
import { db } from "../db/init";

export const getFilms = async (req: Request, res: Response): Promise<void> => {
  const q = req.query.title?.toString().toLowerCase() || "";

  try {
    const films = await db.all(
      "SELECT id, title FROM films WHERE LOWER(title) LIKE ?",
      [`%${q}%`]
    );

    res.json(films);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFilmById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const filmId = Number(req.params.id);

  if (isNaN(filmId)) {
    res.status(400).json({ error: "Invalid film ID" });
    return;
  }

  try {
    const film = await db.get("SELECT * FROM films WHERE id = ?", [filmId]);

    if (!film) {
      res.status(404).json({ error: "Film not found" });
      return;
    }

    // TODO: Maybe we can just send id + name here instead of sending all the person data since the FE won't use those values
    const people = await db.all(
      `
      SELECT p.id, p.name, p.gender
      FROM people p
      JOIN film_people fp ON p.id = fp.person_id
      WHERE fp.film_id = ?
      `,
      [filmId]
    );

    res.json({
      ...film,
      people,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
