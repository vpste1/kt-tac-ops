import React from "react";
import { Link } from "react-router-dom";
import { useViewedCard } from "../context/view-card-context";
import { TacOpsCard } from "../features/cards/tac-ops-card";
import { DeckCreationWizard } from "../features/deck-creation-wizard/deck-creation-wizard";

export function Create() {
  const { viewedCard, setViewedCard } = useViewedCard();
  return (
    <div>
      {viewedCard && (
        <TacOpsCard
          cardInfo={viewedCard}
          onClose={() => setViewedCard(null)}
          selectable
        />
      )}
      <>
        <div className="pageHeader">
          <h1>CREATE</h1>
          <Link to="/">Back</Link>
        </div>
        <DeckCreationWizard />
      </>
    </div>
  );
}
