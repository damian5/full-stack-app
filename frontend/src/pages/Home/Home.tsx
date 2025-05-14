import { useState } from "react";
import styles from "./Home.module.css";
import {
  SearchForm,
  type ItemToSearch,
} from "../../components/SearchForm/SearchForm";
import { ResultList } from "../../components/ResultList/ResultList";
import { API_URL } from "../../constants";
import type { Movie, Person } from "../../types";

export const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<{
    type?: ItemToSearch;
    list: Movie[] | Person[];
  }>({
    list: [],
  });

  const handleSubmit = async (
    value: string,
    selectedItemToSearch: ItemToSearch
  ) => {
    // TODO: Since we are reusing the same fetch logic in Home, MovieDetails and PersonDetails
    // it would be nice to extract it to a helper or custom hook to follow DRY patters
    try {
      setLoading(true);
      const res = await fetch(
        selectedItemToSearch === "people"
          ? `${API_URL}/people/?name=${value}`
          : `${API_URL}/films/?title=${value}`
      );
      const resJson = await res.json();
      if (!res.ok) {
        throw new Error("Error fetching the API");
      }
      setResults({ type: selectedItemToSearch, list: resJson });
    } catch (error: unknown) {
      // TODO: Open a toast or react properly to the error setError(error)
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <SearchForm onSubmit={handleSubmit} />
      <ResultList searching={loading} result={results} />
    </div>
  );
};
