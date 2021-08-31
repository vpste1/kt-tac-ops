import { TacOpsCardData } from "./card";

export type TacOpsCategoryType = {
  title: string;
  tacOps: TacOpsCardData[];
};

export type TacOpsCategory = {
  title: string;
  content: TacOpsCategoryType[];
};
export type TacOpsData = TacOpsCategory[];
