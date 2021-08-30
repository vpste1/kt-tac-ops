import React from "react";
import styles from "./wizard-step.module.css";

interface WizardStepProperties {
  children: React.ReactNode;
  onNext?: () => void;
  onNextDisabled?: boolean;
  onBack?: () => void;
  onBackDisabled?: boolean;
}

export function WizardStep({
  children,
  onNext,
  onNextDisabled,
  onBack,
  onBackDisabled,
}: WizardStepProperties) {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.navigationButtons}>
        {onBack && !onBackDisabled ? (
          <button onClick={onBack} className="btnCancel">
            BACK
          </button>
        ) : (
          <span />
        )}

        {onNext && !onNextDisabled ? (
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
