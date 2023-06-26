import { Level, levels } from './levels';

class LevelsList {
  levelsList: Level[];

  constructor() {
    this.levelsList = levels;
    this.createLevelsList();
  }

  createLevelsList():void {
    const levelList = document.querySelector('.levels-list') as HTMLDivElement;

    levels.forEach((level, index) => {
      const levelElement = `
      <a><span class="levels-list__checkmark"></span><span class="levels-list__number">${index + 1}</span>${level.syntax}</a>
      `;

      levelList.innerHTML += levelElement;
    });
  }
}

export default LevelsList;