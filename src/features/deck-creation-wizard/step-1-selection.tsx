import React, { useState } from "react";
import tacOps from "../../assets/tac-ops-cards.json";
import { TacOpsList } from "../cards/tac-ops-list";
import { WizardStep } from "./wizard-step";

export function Step1Selection({ onNext, onBack }) {
  return (
    <WizardStep onBack={onBack} onNext={onNext}>
      <h2>Select cards</h2>
      <p>Select 6 cards from the following list:</p>
      <TacOpsList data={tacOps} selectable />
    </WizardStep>
  );
}
