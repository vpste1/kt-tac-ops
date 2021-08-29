import React from "react";
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
  toggleCardSelection?: () => void;
}

export function TacOpsCard({
  cardInfo,
  onClose,
  toggleCardSelection,
}: TacOpsCardProperties) {
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
        {toggleCardSelection && (
          <button className="btnProceed" onClick={toggleCardSelection}>
            ADD TO DECK
          </button>
        )}
      </div>
    </div>
  );
}
