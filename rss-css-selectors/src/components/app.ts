import LevelsList from './levels-lIst';
import LevelTask from './level-task';
import Editor from './editor';
import Table from './table';
import { levels } from './levels';
import { Level, Progress } from './types';

const delay = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const blankProgress: Progress = {
  currentLevel: 0,
  passedLevels: [],
  failedLevels: [],
};
const storageProgress: string | null = localStorage.getItem('userProgress');
const progress : Progress = (storageProgress) ? JSON.parse(storageProgress) : blankProgress;

class App {
  levelsList: LevelsList;

  constructor() {
    this.levelsList = new LevelsList();
  }

  public start(): void {
    const currentLevelsList = document.querySelectorAll<HTMLLinkElement>('.level');
    const levelNumber: number = progress.currentLevel;

    this.loadLevel(levelNumber);
    currentLevelsList?.forEach((link) => this.сlickLevelOnLevelsList(link));
    this.clickEnterButton();
    this.pressEnter();
    this.clickResetProgressButton();
    this.clickHelpButton();
  }

  private loadLevel(currentLevel: number): void {
    const isWin: boolean | null = this.checkIsWin();

    if (isWin) {
      this.endGame();
    } else if (isWin === false) {
      const level: Level = levels[currentLevel];
      const levelTask = new LevelTask(level);
      const editor = new Editor(level.boardMarkup);
      const table = new Table(level);

      this.addCurrentClassOnLevel();
      this.addCurrentClassOnLevel(currentLevel);
      levelTask.addLevelTask();
      levelTask.addAccordion();
      table.addElementsOnTable();
      editor.addBoardMarkup();
      this.markCompletedLevels(progress.passedLevels);
    }
  }

  private сlickLevelOnLevelsList(link: HTMLLinkElement): void {
    link.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLLinkElement;
      const levelNumberText: string | undefined = target.querySelector<HTMLSpanElement>('.level__number')?.innerText;
      const levelNumber = Number(levelNumberText);

      progress.currentLevel = levelNumber - 1;
      this.loadLevel(levelNumber - 1);
    });
  }

  private clickEnterButton(): void {
    const button = document.querySelector('.editor__button') as HTMLButtonElement;

    button.addEventListener('click', (): void => {
      if (this.checkInputResult()) {
        this.winLevel();
      } else { 
        this.failLevel();
      }
    });
  }

  private pressEnter(): void {
    const input = document.querySelector('.editor__input') as HTMLInputElement;

    input.addEventListener('keypress', (event: KeyboardEvent): void => {
      event.stopPropagation();
      if (event.key === 'Enter') {
        if (this.checkInputResult()) {
          this.winLevel();
        } else {
          this.failLevel();
        }
      }
    });
  }

  private checkInputResult(): boolean {
    const input = document.querySelector('.editor__input') as HTMLInputElement;
    const inputRule: string = input.value.trim();
    
    return (inputRule === levels[progress.currentLevel].selector);
  }

  private checkIsWin(): boolean | null {
    const currentLevel = progress.currentLevel;

    if (currentLevel >= levels.length) {
      if (progress.passedLevels.length === levels.length) {
        return true;
      }
      if (progress.passedLevels.length < levels.length) {
        progress.currentLevel = progress.failedLevels[0];
        this.loadLevel(progress.currentLevel);
        return null;
      }
    }

    return false;
  }

  private endGame(): void {
    const table = new Table(levels[0]);
    table.winMessageOnTable();
    this.markCompletedLevels(progress.passedLevels);
    this.resetProgress();
    LevelTask.hideLevelTask();
  }

  private resetProgress(): void {
    progress.currentLevel = 0;
    progress.failedLevels = [];
    progress.passedLevels = [];
    localStorage.setItem('userProgress', JSON.stringify(progress));
    Editor.clearEditor();
  }

  private winLevel(): void {
    progress.passedLevels.push(progress.currentLevel);
    progress.failedLevels = Array.from({ length: levels.length }, (_, i) => i).filter((el) => !progress.passedLevels.includes(el));
    progress.currentLevel += 1;
    while (progress.passedLevels.includes(progress.currentLevel)) {
      progress.currentLevel += 1;
    }
    localStorage.setItem('userProgress', JSON.stringify(progress));
    delay(700).then(() => this.loadLevel(progress.currentLevel));
  }

  private failLevel(): void {
    const editorBlock = document.querySelector('.editor') as HTMLDivElement;

    editorBlock.classList.add('shake');
    delay(500).then(() => editorBlock.classList.remove('shake'));
  }

  private markCompletedLevels(passedLevels: number[]): void {
    const levelList = document.querySelectorAll<HTMLLinkElement>('.level');
    if (passedLevels.length > 0) {
      passedLevels.forEach((index: number): void => {
        levelList[index].classList.add('completed');
      });
    } else {
      levelList.forEach((level: HTMLLinkElement): void => {
        level.classList.remove('completed');
      });
    }
  }

  private addCurrentClassOnLevel(levelIndex?: number): void {
    const levelList = document.querySelectorAll<HTMLLinkElement>('.level');
    const removeClass = (): void => levelList?.forEach((el) => el.classList.remove('current'));
    const addClass = (): void  => {
      if (levelIndex || levelIndex === 0) { 
        levelList[levelIndex].classList.add('current');
      }
    };

    if (levelIndex !== undefined) {
      addClass();
    } else {
      removeClass();
    }
  }

  private clickResetProgressButton(): void {
    const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;

    resetButton.addEventListener('click', (): void => {
      this.resetProgress();
      this.loadLevel(progress.currentLevel);
    });
  }

  private typeAnswer = (): void => {
    const input = document.querySelector('.editor__input') as HTMLInputElement;
    const answer: string = levels[progress.currentLevel].selector;
    const answerChars: Array<string> = answer.split('');
    let i = 0;

    const typeText = (): void => {
      input.value += answerChars[i];
      i += 1;
      if (i < answerChars.length) {
        delay(300).then(() => typeText());
      }
    };

    typeText();
  };

  private clickHelpButton(): void {
    const helpButton = document.querySelector('.editor__help') as HTMLButtonElement;

    helpButton.addEventListener('click', this.typeAnswer);
  }
}

export default App;
