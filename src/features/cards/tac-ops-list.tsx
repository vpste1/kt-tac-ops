import React from "react";
import styles from "./tac-ops-list.module.css";
import { useViewedCard } from "../../context/view-card-context";
import { TacOpsCardData } from "../../types/card";
import { useSelectedCards } from "../../context/selected-cards-context";
import { TacOpsData } from "../../types/tac-ops-data";

interface TacOpsListProperties {
  data: TacOpsData;
  selectable?: boolean;
}

export function TacOpsList({ data, selectable }: TacOpsListProperties) {
  const { setViewedCard } = useViewedCard();
  const { selectedCards } = useSelectedCards();
  const openTacOp = (card: TacOpsCardData) => {
    setViewedCard(card);
  };
  return (
    <>
      {data.map((set) => (
        <React.Fragment key={set.title}>
          <h2 className={styles.setTitle}>{set.title}</h2>
          {set.content.map((category) => (
            <React.Fragment key={category.title}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.list}>
                {category.tacOps.map((tacOp: TacOpsCardData) => (
                  <li key={tacOp.title}>
                    {
                      <button
                        className="btnSelect"
                        onClick={() => openTacOp(tacOp)}
                      >
                        {tacOp.title}
                      </button>
                    }
                    {selectable &&
                      selectedCards
                        .map((card) => card.title)
                        .includes(tacOp.title) && <span>✔</span>}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}
