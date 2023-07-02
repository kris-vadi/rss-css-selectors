import { levels } from './levels';
import { Level } from './types';

class LevelsList {
  levelsList: Level[];
  

  constructor() {
    this.levelsList = levels;
    this.createLevelsList();
  }
  
  public createLevelsList():void {
    const levelList = document.querySelector('.levels-list') as HTMLDivElement;

    levels.forEach((level, index) => {
      const levelElement = `
      <a class="level">
        <span class="level__checkmark"></span>
        <span class="level__number">${index + 1}</span>
        <span class="level__text">${level.syntax}</span>
      </a>
      `;

      levelList.innerHTML += levelElement;
    });
  }
}

export default LevelsList;