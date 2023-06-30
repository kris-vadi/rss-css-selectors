import { Level } from './levels';

class Table {
  level: Level;

  constructor(level: Level) {
    this.level = level;
    this.addElementsOnTable();
  }

  private addElementsOnTable(): void {
    const tableSurface = document.querySelector('.table__surface') as HTMLDivElement;

    tableSurface.innerHTML = this.level.boardMarkup;
  }
}

export default Table;