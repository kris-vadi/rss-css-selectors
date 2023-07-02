import LevelsList from './levels-lIst';
import LevelTask from './level-task';
import Editor from './editor';
import Table from './table';
import { levels } from './levels';
import { Level, Progress } from './types';

const delay = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const progress: Progress = {
  currentLevel: 0,
  passedLevels: [],
  failedLevels: [],
};
localStorage.setItem('userProgress', JSON.stringify(progress));

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
  }

  private loadLevel(currentLevel: number): void {
    console.log(`Заргужаем уровень ${currentLevel}`);
    const isWin: boolean | null = this.checkIsWin();
    console.log(isWin);
    if (isWin) {
      this.endGame();
    } else if (isWin === false) {
      const level: Level = levels[currentLevel];
      console.log(level);
      const levelTask = new LevelTask(level);
      const editor = new Editor(level.boardMarkup);
      const table = new Table(level);

      this.addCurrentClassOnLevel();
      this.addCurrentClassOnLevel(currentLevel);
      levelTask.addLevelTask();
      levelTask.addAccordion();
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
        console.log(`непройденные ур ${progress.currentLevel}`);
        console.log(progress);
        this.loadLevel(progress.currentLevel);
        return null;
      }
    }

    return false;
  }

  private endGame(): void {
    const table = new Table(levels[0]);
    table.winMessageOnTable();

    this.addCurrentClassOnLevel();
    this.markCompletedLevels(progress.passedLevels);
  }

  private resetProgress(): void {

  }

  private winLevel(): void {
    progress.passedLevels.push(progress.currentLevel);
    progress.failedLevels = Array.from({ length: levels.length }, (_, i) => i).filter((el) => !progress.passedLevels.includes(el));
    progress.currentLevel += 1;
    while (progress.passedLevels.includes(progress.currentLevel)) {
      progress.currentLevel += 1;
    }
    delay(700).then(() => this.loadLevel(progress.currentLevel));
  }

  private failLevel(): void {
    const editorBlock = document.querySelector('.editor') as HTMLDivElement;

    editorBlock.classList.add('shake');
    delay(500).then(() => editorBlock.classList.remove('shake'));
  }

  private markCompletedLevels(passedLevels: number[]): void {
    const levelList = document.querySelectorAll<HTMLLinkElement>('.level');

    passedLevels.forEach((index) => {
      levelList[index].classList.add('completed');
    });
  }

  private addCurrentClassOnLevel(levelIndex?: number): void {
    const levelList = document.querySelectorAll<HTMLLinkElement>('.level');
    const removeClass = (): void => levelList?.forEach((el) => el.classList.remove('current'));
    const addClass = (): void  => {
      if (levelIndex) { 
        levelList[levelIndex].classList.add('current');
      }
    };

    if (levelIndex !== undefined) {
      addClass();
    } else {
      removeClass();
    }
  }

}

export default App;
