import React from "react";
import styles from "./tac-ops-list.module.css";
import { useViewedCard } from "../../context/view-card-context";
import { TacOpsCard } from "../../types/card";
import { useSelectedCards } from "../../context/selected-cards-context";
export function TacOpsList({ data, selectable }) {
  const { setViewedCard } = useViewedCard();
  const { selectedCards } = useSelectedCards();
  const openTacOp = (title: TacOpsCard) => {
    setViewedCard(title);
  };
  return (
    <div>
      {selectable && (
        <ul>
          {selectedCards.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      )}
      {data.base.map((category) => (
        <React.Fragment key={category.title}>
          <h2 className={styles.categoryTitle}>{category.title}</h2>
          <ul className={styles.list}>
            {category.tacOps.map((tacOp: TacOpsCard) => (
              <li key={tacOp.title}>
                {
                  <button
                    className="btnSelect"
                    onClick={() => openTacOp(tacOp)}
                  >
                    {tacOp.title}
                  </button>
                }
                {selectable && selectedCards.includes(tacOp.title) && (
                  <span>✔</span>
                )}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
}
