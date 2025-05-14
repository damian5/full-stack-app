import styles from "./Button.module.css";

type ButtonProps = {
  children: string;
  onClick: () => void;
  width?: string;
  disabled?: boolean;
};

export const Button = ({ children, onClick, width, disabled }: ButtonProps) => {
  const maxWidth = width ? `${width}px` : "none";
  const colorState = disabled ? "disabled" : "active";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      data-color={colorState}
      style={{
        maxWidth,
      }}
      className={styles.button}
    >
      {children}
    </button>
  );
};
