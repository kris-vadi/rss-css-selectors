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
    this.shakeTargetElements();
  }

  private shakeTargetElements(): void {
    const tableSurface = document.querySelector('.table__surface') as HTMLDivElement;
    const elements = tableSurface.querySelectorAll<HTMLElement>(`${this.level.selector}`);

    elements.forEach((el) => el.classList.add('dance'));
  }
}

export default Table;