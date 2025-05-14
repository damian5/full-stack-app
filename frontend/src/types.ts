export type Person = {
  id: string;
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: number;
  mass: number;
  created_at: string;
  films: MovieInPerson[];
};

// TODO: In the BE, this is called Films. Maybe it would be nice to keep the same name?
// I wanted to be aligned with the name in the screen, but it may cause confusion
export type Movie = {
  id: string;
  created_at: string;
  opening_crawl: string;
  people: PersonInFilm[];
  title: string;
};

type PersonInFilm = Pick<Person, "id" | "gender" | "name">;
type MovieInPerson = Pick<Movie, "id" | "opening_crawl" | "title">;
