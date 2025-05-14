import { Fragment, useCallback, useEffect, useState } from "react";
import { API_URL } from "../../../constants";
import { useSearchParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../Details.module.css";
import { Button } from "../../../components/Button/Button";
import type { Movie } from "../../../types";

// To follow AHA pattern si better to keep MovieDetails & PersonDetails separately even if the layout is the same
// The component could get too complex checking for different keys and adding conditional fetch logic
export const MovieDetails = () => {
  const [searchParams] = useSearchParams();
  const filmId = searchParams.get("id");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [movieDetail, setMovieDetail] = useState<Movie>();

  const fetchMovieDetails = useCallback(async () => {
    if (!filmId) {
      return navigate("/", { replace: true });
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/films/${filmId}`);
      if (!res.ok) {
        throw new Error("Error fetching the API");
      }
      const resJson: Movie = await res.json();
      setMovieDetail(resJson);
    } catch (error) {
      // TODO: Open a toast or react properly to the error setError(error)
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filmId, navigate]);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.detailsContainer}>
      {loading && <p className={styles.loading}>Loading...</p>}
      {movieDetail && !loading && (
        <div>
          <p className={styles.title}>{movieDetail.title}</p>
          <div className={styles.detailsInformation}>
            <div className={styles.details}>
              <p className={styles.sectionTitle}>Opening Crawl</p>
              <p className={styles.description}>{movieDetail.opening_crawl}</p>
            </div>
            <div className={styles.details}>
              <p className={styles.sectionTitle}>Characters</p>
              {movieDetail.people.length
                ? movieDetail.people.map((person, indx) => (
                    <Fragment key={person.id}>
                      <Link
                        className={styles.link}
                        to={{
                          pathname: "/details/people",
                          search: `?id=${person.id}`,
                        }}
                      >
                        {person.name}
                      </Link>
                      <span>
                        {indx === movieDetail.people.length - 1 ? "" : ", "}
                      </span>
                    </Fragment>
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
      <Button width="187" onClick={handleGoBack}>
        BACK TO SEARCH
      </Button>
    </div>
  );
};
