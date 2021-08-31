import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { useViewedCard } from "../context/view-card-context";
import { TacOpsCard } from "../features/cards/tac-ops-card";
import { TacOpsCardData } from "../types/card";

export function Home() {
  const [savedDeck, setSavedDeck] = useState<TacOpsCardData[] | null>(null);
  const { viewedCard, setViewedCard } = useViewedCard();
  useEffect(() => {
    const deck = JSON.parse(
      localStorage.getItem("drawnDeck")
    ) as TacOpsCardData[];
    setSavedDeck(deck);
  }, []);
  const clearSavedDeck = () => {
    setSavedDeck(null);
    localStorage.setItem("drawnDeck", null);
  };
  return viewedCard ? (
    <TacOpsCard cardInfo={viewedCard} onClose={() => setViewedCard(null)} />
  ) : (
    <div className={styles.container}>
      <h1>Tac Ops Deck Builder</h1>
      <ul className={styles.navigation}>
        <li>
          <Link to="/browse">Browse Tac Ops cards</Link>
        </li>
        {!savedDeck && (
          <li>
            <Link to="/create">Create new deck</Link>
          </li>
        )}
      </ul>

      {savedDeck ? (
        <div className={styles.viewDeckContainer}>
          <h2>Current saved deck:</h2>
          <ul className={styles.savedDeckList}>
            {savedDeck.map((card) => (
              <li key={card.title}>
                {
                  <button
                    className={["btnSelect", styles.cardSelect].join(" ")}
                    onClick={() => setViewedCard(card)}
                  >
                    {card.title}
                  </button>
                }
              </li>
            ))}
          </ul>
          <button className="btnProceed" onClick={clearSavedDeck}>
            Delete Saved Deck
          </button>
        </div>
      ) : (
        <>
          <p>
            Welcome to the Tac Ops deck builder. Currently consisting of all
            Core Tac Ops, alongside faction-specific Tac Ops as part of the
            Octarius starter set.
          </p>
          <p>
            This tool is designed to assist in building your 6 card Tac Ops
            deck, and subsequent 3 Tac Ops for a given mission without having to
            wrangle a rule book.
          </p>
        </>
      )}
    </div>
  );
}
