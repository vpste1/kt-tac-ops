import React from "react";
import { Link } from "react-router-dom";
import styles from "./create.module.css";
import { DeckCreationWizard } from "../features/deck-creation-wizard/deck-creation-wizard";

export function Create() {
  return (
    <div className={styles.container}>
      <h1>CREATE</h1>
      <Link to="/">Back</Link>
      <DeckCreationWizard />
    </div>
  );
}
