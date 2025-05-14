import React from "react";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <p className={styles.title}>SWStarter</p>
      </div>
      <div className={styles.pageContainer}>{children}</div>
    </div>
  );
};
