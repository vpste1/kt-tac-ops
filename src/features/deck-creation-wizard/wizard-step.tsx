import React from "react";
import styles from "./wizard-step.module.css";

export function WizardStep({ children, onNext, onBack }) {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.navigationButtons}>
        {onBack ? (
          <button onClick={onBack} className="btnCancel">
            BACK
          </button>
        ) : (
          <span />
        )}

        {onNext ? (
          <button onClick={onNext} className="btnProceed">
            NEXT
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
