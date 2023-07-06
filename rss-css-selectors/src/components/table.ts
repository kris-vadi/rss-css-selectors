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
    this.addDataNumber(tableSurface, 0);
  }

  private shakeTargetElements(): void {
    const tableSurface = document.querySelector('.table__surface') as HTMLDivElement;
    const elements = tableSurface.querySelectorAll<HTMLElement>(`${this.level.selector}`);

    elements.forEach((el) => el.classList.add('dance'));
  }

  private addDataNumber(element: Element, index: number): number {
    const childrens = element.children as HTMLCollection;
    for (let i = 0; i < childrens.length; i += 1) {
      const el = childrens[i];
      el.setAttribute('num', `${index}`);

      if (el.hasChildNodes()) {
        index += 1;
        const newIntex = this.addDataNumber(el, index);
        index = newIntex + 1;
      } else {
        index += 2;
      }
    }
    return index;
  }
}

export default Table;