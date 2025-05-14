import { Fragment, useCallback, useEffect, useState } from "react";
import { API_URL } from "../../../constants";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../Details.module.css";
import { Button } from "../../../components/Button/Button";
import type { Person } from "../../../types";

export const PersonDetails = () => {
  const params = useParams<{ id: string }>();
  const personId = params.id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [personDetails, setPersonDetails] = useState<Person>();

  const fetchMovieDetails = useCallback(async () => {
    if (!personId) {
      return navigate("/", { replace: true });
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/people/${personId}`);
      if (!res.ok) {
        throw new Error("Error fetching the API");
      }
      const resJson: Person = await res.json();
      setPersonDetails(resJson);
    } catch (error) {
      // TODO: Open a toast or react properly to the error setError(error)
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [personId, navigate]);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.detailsContainer}>
      {loading && <p className={styles.loading}>Loading...</p>}
      {personDetails && !loading && (
        <div>
          <p className={styles.title}>{personDetails.name}</p>
          <div className={styles.detailsInformation}>
            <div className={styles.details}>
              <p className={styles.sectionTitle}>Details</p>
              <p className={styles.description}>
                Birth year: {personDetails.birth_year}
              </p>
              <p className={styles.description}>
                Gender: {personDetails.gender}
              </p>
              <p className={styles.description}>
                Eye color: {personDetails.eye_color}
              </p>
              <p className={styles.description}>
                Hair color: {personDetails.hair_color}
              </p>
              <p className={styles.description}>
                Height: {personDetails.height}
              </p>
              <p className={styles.description}>Mass: {personDetails.mass}</p>
            </div>
            <div className={styles.details}>
              <p className={styles.sectionTitle}>Movies</p>
              {/* TODO: Extract this to another component */}
              {personDetails.films.length
                ? personDetails.films.map((film, indx) => (
                    <Fragment key={film.id}>
                      <Link
                        className={styles.link}
                        to={`/details/movies/${film.id}`}
                      >
                        {film.title}
                      </Link>
                      <span>
                        {indx === personDetails.films.length - 1 ? "" : ", "}
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
