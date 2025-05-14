import { Button } from "../Button/Button";
import styles from "./Section.module.css";

type SectionProps = {
  title: string;
  onButtonClick: () => void;
};

export const Section = ({ title, onButtonClick }: SectionProps) => {
  return (
    <div className={styles.SectionContainer}>
      <p>{title}</p>
      <Button onClick={onButtonClick} width="134">
        SEE DETAILS
      </Button>
    </div>
  );
};
