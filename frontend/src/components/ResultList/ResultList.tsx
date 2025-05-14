import { useNavigate } from "react-router-dom";
import type { ItemToSearch } from "../SearchForm/SearchForm";
import { Section } from "../Section/Section";
import styles from "./ResultList.module.css";
import type { Movie, Person } from "../../types";

type ResultListProps = {
  result: {
    type?: ItemToSearch;
    list: Pick<Person, "id" | "name">[] | Pick<Movie, "id" | "title">[];
  };
  searching: boolean;
};

export const ResultList = ({ result, searching }: ResultListProps) => {
  const navigate = useNavigate();
  const listOfPeopleOrFilms = result.list;
  const renderType = result.type;

  const handleOnButtonClick = (
    id: string,
    renderType: ItemToSearch | undefined
  ) => {
    if (!id || !renderType) return;
    if (renderType === "movies") {
      navigate(`/details/movies/${id}`);
    } else {
      navigate(`/details/people/${id}`);
    }
  };

  return (
    <div className={styles.ResultListContainer}>
      <p className={styles.title}>Results</p>
      <div className={styles.contentContainer}>
        {searching && <p className={styles.emptyState}>Searching...</p>}
        {!searching && listOfPeopleOrFilms.length === 0 && (
          <p className={styles.emptyState}>
            There are zero matches. Use the form to search for People or Movies.
          </p>
        )}
        {!searching && listOfPeopleOrFilms.length ? (
          <div className={styles.listOfPeopleContainer}>
            {listOfPeopleOrFilms.map((item) => (
              <Section
                key={item.id}
                // TypeGuard to avoid TS to complain
                title={"title" in item ? item.title : item.name}
                onButtonClick={() => handleOnButtonClick(item.id, renderType)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
