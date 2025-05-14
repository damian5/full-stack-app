import { useState, type ChangeEventHandler } from "react";
import { Button } from "../Button/Button";
import styles from "./SearchForm.module.css";

export type ItemToSearch = "people" | "movies";

type SearchFormProps = {
  onSubmit: (value: string, selectedItemToSearch: ItemToSearch) => void;
};

export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [value, setValue] = useState<string>("");
  const [selectedItemToSearch, setSelectedItemToSearch] =
    useState<ItemToSearch>("people");

  const handleRadioChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value as ItemToSearch;
    setSelectedItemToSearch(value);
  };

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleOnButtonClick = () => {
    if (!value.length) return;
    onSubmit(value, selectedItemToSearch);
  };

  const placeHolder =
    selectedItemToSearch === "people"
      ? "e.g. Chewbacca, Yoda, Boba Fett"
      : "e.g. The Phantom Menace";

  return (
    <div className={styles.searchFormContainer}>
      <p>What are you searching for?</p>
      <div className={styles.radioButtonsContainer}>
        <label className={styles.radioButton}>
          People
          <input
            type="radio"
            value="people"
            checked={selectedItemToSearch === "people"}
            onChange={handleRadioChange}
          />
          <span className={styles.checkmark} />
        </label>
        <label className={styles.radioButton}>
          Movies
          <input
            type="radio"
            value="movies"
            checked={selectedItemToSearch === "movies"}
            onChange={handleRadioChange}
          />
          <span className={styles.checkmark} />
        </label>
      </div>
      {/* This can be extracted to another component if necessary */}
      <input
        placeholder={placeHolder}
        className={styles.input}
        type="text"
        value={value}
        onChange={handleValueChange}
      />
      <Button disabled={!value.length} onClick={handleOnButtonClick}>
        SEARCH
      </Button>
    </div>
  );
};
