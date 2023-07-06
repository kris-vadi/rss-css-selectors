export type Progress = {
  currentLevel: number;
  passedLevels: number[];
  failedLevels: number[];
};

export interface Level {
  selectorName: string;
  helpTitle: string;
  doThis: string;
  selector: string;
  syntax: string;
  help: string;
  examples: string[];
  boardMarkup: string;
}