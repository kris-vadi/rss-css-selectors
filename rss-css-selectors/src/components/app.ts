import LevelsList from './levels-lIst';
import LevelTask from './level-task';
import { levels, Level } from './levels';

//const CURRENT_LEVEL = 0;

class App {
  levelsList: LevelsList;

  constructor() {
    this.levelsList = new LevelsList();
  }

  public start(): void {
    const level = document.querySelectorAll<HTMLLinkElement>('.level');

    level?.forEach((link) => this.handleClick(link));
  }

  private loadLevel(): void {

  }

  private handleClick(link: HTMLLinkElement): void {
    link.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLLinkElement;
      const levelNumberText: string | undefined = target.querySelector<HTMLSpanElement>('.level__number')?.innerText;
      const levelNumber = Number(levelNumberText);
      const currentLevel: Level = levels[levelNumber - 1];

      const levelTask = new LevelTask(currentLevel);
      levelTask.addLevelTask();
    });
  }
}

export default App;
