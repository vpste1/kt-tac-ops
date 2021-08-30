import React from "react";
import { Link } from "react-router-dom";
import styles from "./browse.module.css";
import tacOps from "../assets/tac-ops-cards.json";
import { TacOpsCard } from "../features/cards/tac-ops-card";
import { TacOpsList } from "../features/cards/tac-ops-list";
import { useViewedCard } from "../context/view-card-context";

export function Browse() {
  const { viewedCard, setViewedCard } = useViewedCard();
  return (
    <div>
      {viewedCard ? (
        <TacOpsCard cardInfo={viewedCard} onClose={() => setViewedCard(null)} />
      ) : (
        <div className={styles.container}>
          <h1>BROWSE</h1>
          <Link to="/">Back</Link>

          <TacOpsList data={tacOps} />
        </div>
      )}
    </div>
  );
}
