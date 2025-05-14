import { SWAPI_API } from "../constants";
import { db } from "./init";
import {
  SwapiFilm,
  SwapiPerson,
  SwapiSingleResponse,
  SwapiPeopleListResponse,
  SwapiFilmsResponse,
} from "../types";

const parseCharacterId = (characterUrl: string): number | undefined => {
  const match = characterUrl.match(/\/people\/(\d+)$/);
  return match ? Number(match[1]) : undefined;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error("Error fetching SWAPI API");
  }
  return (await response.json()) as T;
};

const fetchAllPeopleDetails = async (): Promise<
  SwapiSingleResponse<SwapiPerson>[]
> => {
  const listRes = await fetch(`${SWAPI_API}/people?page=1&limit=100`).then(
    (res) => handleResponse<SwapiPeopleListResponse<{ uid: string }>>(res)
  );

  const peopleIds = listRes.results.map((person) => person.uid);

  return Promise.all(
    peopleIds.map((id) =>
      fetch(`${SWAPI_API}/people/${id}`).then((res) =>
        handleResponse<SwapiSingleResponse<SwapiPerson>>(res)
      )
    )
  );
};

const insertData = async (
  peopleData: SwapiSingleResponse<SwapiPerson>[],
  filmsData: SwapiFilm[]
): Promise<void> => {
  const insertPerson = await db.prepare(`
    INSERT INTO people (id, name, gender, eye_color, hair_color, height, mass, birth_year)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertFilm = await db.prepare(`
    INSERT INTO films (id, title, opening_crawl)
    VALUES (?, ?, ?)
  `);

  const insertRelation = await db.prepare(`
    INSERT INTO film_people (film_id, person_id)
    VALUES (?, ?)
  `);

  for (const { result } of peopleData) {
    const { uid, properties: p } = result;
    await insertPerson.run(
      Number(uid),
      p.name,
      p.gender,
      p.eye_color,
      p.hair_color,
      Number(p.height),
      Number(p.mass),
      p.birth_year
    );
  }

  for (const film of filmsData) {
    const { uid, properties: p } = film;

    await insertFilm.run(Number(uid), p.title, p.opening_crawl);

    for (const charUrl of p.characters) {
      const charId = parseCharacterId(charUrl);
      if (charId) {
        await insertRelation.run(Number(uid), charId);
      }
    }
  }

  await insertPerson.finalize();
  await insertFilm.finalize();
  await insertRelation.finalize();
};

export const hydrate = async (): Promise<void> => {
  try {
    const people = await db.all("SELECT id FROM people LIMIT 1");
    if (people.length > 0) {
      console.log("Database already hydrated");
      return;
    }

    console.log("Hydrating database from SWAPI...");

    const [peopleDetails, filmsRaw] = await Promise.all([
      fetchAllPeopleDetails(),
      fetch(`${SWAPI_API}/films`).then((res) =>
        handleResponse<SwapiFilmsResponse<SwapiFilm>>(res)
      ),
    ]);

    await insertData(peopleDetails, filmsRaw.result);

    console.log("Hydration complete");
  } catch (error) {
    console.error("Error during hydration:", error);
  }
};
