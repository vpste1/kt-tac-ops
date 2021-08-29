import React from "react";
import { WizardStep } from "./wizard-step";

export function Step0Instructions({ onNext }) {
  return (
    <WizardStep onNext={onNext}>
      <h2>Welcome</h2>
      <p>Deck creation consists of the following:</p>
      <ul>
        <li>Reviewing and selecting 6 Tac Ops cards to add to your deck</li>
        <li>Confirming your selection</li>
        <li>Drawing your cards</li>
        <li>Confirmation</li>
      </ul>
    </WizardStep>
  );
}
