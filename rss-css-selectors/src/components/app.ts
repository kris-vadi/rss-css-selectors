import LevelsList from './levels-lIst';
import LevelTask from './level-task';
import Editor from './editor';
import Table from './table';
import { levels, Level } from './levels';

const CURRENT_LEVEL = 0;

class App {
  levelsList: LevelsList;

  constructor() {
    this.levelsList = new LevelsList();
  }

  public start(): void {
    const levelsList = document.querySelectorAll<HTMLLinkElement>('.level');
    const levelNumber: number = CURRENT_LEVEL;

    this.loadLevel(levelNumber);
    levelsList?.forEach((link) => this.handleClickLevel(link));
  }

  private loadLevel(currentLevel: number): void {
    const level: Level = levels[currentLevel];
    const levelTask = new LevelTask(level);
    const editor = new Editor(level.boardMarkup, level.selector);
    const table = new Table(level);

    levelTask.addLevelTask();
    levelTask.addAccordion();
    editor.addBoardMarkup();
    editor.clickEnterButton();
    editor.pressEnter();

    
  }

  private handleClickLevel(link: HTMLLinkElement): void {
    link.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLLinkElement;
      const levelNumberText: string | undefined = target.querySelector<HTMLSpanElement>('.level__number')?.innerText;
      const levelNumber = Number(levelNumberText);

      this.loadLevel(levelNumber - 1);
    });
  }
}

export default App;
