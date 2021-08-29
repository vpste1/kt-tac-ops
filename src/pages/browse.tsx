import React from "react";
import { Link } from "react-router-dom";
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
        <>
          <div className="pageHeader">
            <h1>BROWSE</h1>
            <Link to="/">Back</Link>
          </div>
          <TacOpsList data={tacOps} />
        </>
      )}
    </div>
  );
}
