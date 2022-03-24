import React, { useEffect } from "react";
import styles from "./tac-ops-list.module.css";
import { TacOpsCardData } from "../../types/card";
import { useSelectedCards } from "../../context/selected-cards-context";
import { TacOpsData } from "../../types/tac-ops-data";


interface TacOpsListProperties {
  data: TacOpsData;
  onCardOpen: (card:TacOpsCardData) => void;
  onCardToggleSelection?: (card:TacOpsCardData) => void;
  scrollPosition: number;
}

export function TacOpsList({ data, onCardToggleSelection, onCardOpen, scrollPosition }: TacOpsListProperties) {
  const { selectedCards } = useSelectedCards();
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition])
  return (
    <>
      {data.map((set) => (
        <React.Fragment key={set.title}>
          <h2 className={styles.setTitle}>{set.title}</h2>
          {set.content.map((category) => (
            <React.Fragment key={category.title}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.list}>
                {category.tacOps.map((card: TacOpsCardData) => (
                  <li key={card.title}>
                    {
                      <button
                        className="btnSelect"
                        onClick={() => onCardOpen(card)}
                      >
                        {card.title}
                      </button>
                    }
                    {
                      onCardToggleSelection &&
                        <input
                          type="checkbox"
                          onClick={() => onCardToggleSelection(card)}
                          checked={
                            selectedCards
                              .map((c) => c.title)
                              .includes(card.title)}
                        />
                    }
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
