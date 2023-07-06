import hljs from 'highlight.js';
import 'highlight.js/styles/rainbow.css';

class Editor {
  boardMarkup: string;

  constructor(boardMarkup: string) {
    this.boardMarkup = boardMarkup;
  }

  public addBoardMarkup():void {
    const markup = document.querySelector('.editor__markup') as HTMLElement;
    Editor.clearEditor();
    markup.innerHTML = hljs.highlight(this.boardMarkup, { language: 'xml' }).value;
    this.addMouseEventOnMarkup();
  }

  public addMouseEventOnMarkup(): void {
    const markupElements = document.querySelectorAll<HTMLElement>('.hljs-tag');

    this.addMouseOverEvent(markupElements);
    this.addMoueOutEvent(markupElements);
  }

  private addMoueOutEvent(elements: NodeListOf<HTMLElement>): void {
    const tableElements = document.querySelectorAll<HTMLElement>('.table__surface *');
    const tooltip = document.querySelector<HTMLElement>('.tooltip');

    elements.forEach((element) => {
      element.addEventListener('mouseout', (event: Event): void => {
        event.stopPropagation();

        elements.forEach((el) => {
          el.classList.remove('selected');
        });
        tableElements.forEach((el) => {
          el.classList.remove('selected');
        });
        tooltip?.classList.remove('visible');
      });
    });
  }

  private addMouseOverEvent(elements: NodeListOf<HTMLElement>): void {
    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      element.addEventListener('mouseover', (event: Event): void => {
        event.stopPropagation();
        element.classList.add('selected');
        this.addClassOnTaggetElements(i, element, elements);
      });
    }
  }

  private showTooltip(elemenet: string): void {
    const tooltip = document.querySelector('.tooltip') as HTMLDivElement;

    tooltip.innerHTML = '';
    tooltip.append(elemenet);
    tooltip.classList.add('visible');
  }

  private addClassOnTaggetElements(i: number, element: HTMLElement, elements: NodeListOf<HTMLElement>): void {
    const table = document.querySelector('.table__surface') as HTMLElement;
    const elementText: string | null = element.textContent;
    let openTag: string | null;
    let closeTag: string | null;
    const regex = /<|>|\//ig;

    if (elementText && elementText.includes('</')) {
      openTag = this.findOpenTag(i, elements);
      const tag = openTag?.replace(regex, '');
      if (tag) this.findMatchingElement(tag, i - 1, table);
    } else {
      closeTag = this.findCloseTag(i, elements);
      const tag = closeTag?.replace(regex, '');
      if (tag) {
        this.findMatchingElement(tag, i, table);
      }
    }

  }

  private getTextContent(i: number, elements: NodeListOf<HTMLElement>): string | null {
    const element = elements[i].querySelector('.hljs-name') as HTMLSpanElement;
    const tagName: string | null = element?.textContent;
    return tagName;
  }
  
  private findCloseTag(i: number, elements: NodeListOf<HTMLElement>): string | null  {
    const tagName: string | null = this.getTextContent(i, elements);

    for (let j = i + 1; j < elements.length; j += 1) {
      const currentTagName: string | null = this.getTextContent(j, elements);
      elements[j].classList.add('selected');
      if (tagName === currentTagName && elements[j].textContent?.includes('</')) {
        return (elements[j]) ? elements[j].textContent : null;
      }
    }
    return null;
  }

  private findOpenTag(i: number, elements: NodeListOf<HTMLElement>): string | null {
    const tagName: string | null = this.getTextContent(i, elements);

    for (let j = i; j >= 0; j -= 1) {
      const currentTagName: string | null = this.getTextContent(j, elements);
      if (tagName === currentTagName && !elements[j].textContent?.includes('</')) {
        elements[j].classList.add('selected');
        return (elements[j]) ? elements[j].textContent : null;
      }
    }
    return null;
  }

  private findMatchingElement(tag: string, index: number, elemenet: HTMLElement): void {
    const tableElements = elemenet.children as HTMLCollection;

    for (let i = 0; i < tableElements.length; i += 1) {
      const currentElement = tableElements[i] as HTMLElement;
      const currentDataNum: string | null = currentElement.getAttribute('num');
      const id: number = (currentDataNum) ? parseInt(currentDataNum) : i;

      if (currentElement.tagName.toLocaleLowerCase() === tag && index === id) {
        currentElement.classList.add('selected');
        const currentId: string = (currentElement.id) ? ` id="${currentElement.id}"` : '';
        this.showTooltip(`<${tag}${currentId}></${tag}>`);
      }

      if (currentElement.hasChildNodes()) {
        this.findMatchingElement(tag, index, currentElement as HTMLElement);
      }
    }
  }

  static clearEditor():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    const input = document.querySelector('.editor__input') as HTMLInputElement;

    input.value = '';
    markup.innerHTML = '';
  }

  static removeSpaces(str: string): string {
    return str.trim().split('').filter((el) => el != ' ').join('');
  }
}

export default Editor;