export type SwapiSingleResponse<T> = {
  message: string;
  result: {
    uid: string;
    properties: T;
  };
}

export type SwapiPeopleListResponse<T> = {
  message: string;
  results: T[];
}

export type SwapiFilmsResponse<T> = {
  message: string;
  result: T[];
}

export type SwapiPerson = {
  name: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  birth_year: string;
}

export type SwapiFilm = {
  uid: string;
  properties: {
    title: string;
    opening_crawl: string;
    characters: string[];
  };
}

export type TopQuery = {
  query: string;
  count: number;
  percentage: string;
}
