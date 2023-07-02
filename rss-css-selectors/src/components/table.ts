import { Level } from './types';

class Table {
  level: Level;

  constructor(level: Level) {
    this.level = level;
  }

  public winMessageOnTable(): void {
    const tableSurface = document.querySelector('.table__surface') as HTMLDivElement;
    const message = document.createElement('h4');

    tableSurface.innerHTML = '';
    message.classList.add('table__win-message');
    message.append('YOU WIN!');
    tableSurface.append(message);
  }

  public addElementsOnTable(): void {
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