import React from "react";
import styles from "./tac-ops-list.module.css";
import { useViewedCard } from "../../context/view-card-context";
import { TacOpsCard } from "../../types/card";
export function TacOpsList({ data }) {
  const { setViewedCard } = useViewedCard();
  const openTacOp = (title: TacOpsCard) => {
    setViewedCard(title);
  };
  return (
    <div>
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
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
}
