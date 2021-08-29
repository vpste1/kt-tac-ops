export interface TacOpsAction {
  title: string;
  pretext: string;
  cost: string;
  text: string;
}

export interface TacOpsCard {
  title: string;
  text: string;
  points: string[];
  actions?: TacOpsAction[];
}
