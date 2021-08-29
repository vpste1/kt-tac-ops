import React from "react";
import { useSelectedCards } from "../../context/selected-cards-context";
import { insertShapes } from "../../utils/insert-shapes";
import styles from "./tac-ops-card.module.css";

interface TacOpsAction {
  title: string;
  pretext: string;
  cost: string;
  text: string;
}

interface TacOpsCard {
  title: string;
  text: string;
  points: string[];
  actions?: TacOpsAction[];
}

interface TacOpsCardProperties {
  cardInfo: TacOpsCard;
  onClose: () => void;
  selectable: boolean;
}

export function TacOpsCard({
  cardInfo,
  onClose,
  selectable,
}: TacOpsCardProperties) {
  const { selectedCards, setSelectedCards } = useSelectedCards();
  const isSelected = selectable && selectedCards.includes(cardInfo.title);
  const toggleCardSelection = () => {
    if (isSelected) {
      // remove card
      setSelectedCards(
        selectedCards.filter((storedTitle) => storedTitle !== cardInfo.title)
      );
    } else {
      // add card
      setSelectedCards([...selectedCards, cardInfo.title]);
    }
    onClose();
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{cardInfo.title}</h2>
      <p>{cardInfo.text}</p>
      <ul>
        {cardInfo.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
      {cardInfo.actions &&
        cardInfo.actions.length > 0 &&
        cardInfo.actions.map((action) => (
          <React.Fragment key={action.title}>
            <p>{action.pretext}</p>
            <h2 className={styles.actionTitle}>
              <span>{action.title}</span>
              <span>{action.cost}</span>
            </h2>
            <p>{insertShapes(action.text)} </p>
          </React.Fragment>
        ))}
      <div className={styles.buttonContainer}>
        <button className="btnCancel" onClick={onClose}>
          CLOSE
        </button>
        {selectable && (
          <button className="btnProceed" onClick={toggleCardSelection}>
            {isSelected ? "REMOVE" : "ADD TO DECK"}
          </button>
        )}
      </div>
    </div>
  );
}
