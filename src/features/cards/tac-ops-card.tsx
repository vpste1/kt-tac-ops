import React from "react";
import { TacOpsCardData } from "../../types/card";
import { insertShapes } from "../../utils/insert-shapes";
import styles from "./tac-ops-card.module.css";

interface TacOpsCardProperties {
  cardInfo: TacOpsCardData;
  onClose: () => void;
  onToggleSelect?: (card: TacOpsCardData) => void;
  isSelected?: boolean;
}

export function TacOpsCard({
  cardInfo,
  onClose,
  onToggleSelect,
  isSelected,
}: TacOpsCardProperties) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{cardInfo.title}</h2>
      <p>{insertShapes(cardInfo.text)}</p>
      <ul>
        {cardInfo.points.map((point, i) => (
          <li key={i}>{insertShapes(point)}</li>
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
        {onToggleSelect && (
          <button className="btnProceed" onClick={() => onToggleSelect(cardInfo)}>
            {isSelected ? "REMOVE" : "SELECT"}
          </button>
        )}
      </div>
    </div>
  );
}
