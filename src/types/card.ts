export type TacOpsAction = {
  title: string;
  pretext: string;
  cost: string;
  text: string;
};

export type TacOpsCardData = {
  title: string;
  text: string;
  points: string[];
  actions?: TacOpsAction[];
};
