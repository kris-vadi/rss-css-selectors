class Editor {
  boardMarkup: string;

  constructor(boardMarkup: string) {
    this.boardMarkup = boardMarkup;
    this.addMouseEventOnMarkup();
  }

  public addBoardMarkup():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    const newMarkup = this.getMarkup();
    Editor.clearEditor();
    markup.append(newMarkup);
  }

  public addMouseEventOnMarkup(): void {
    const editorMarkup = document.querySelector('.editor__markup') as HTMLDivElement;
    const tableSurface = document.querySelector('.table__surface') as HTMLDivElement;

    editorMarkup.addEventListener('mouseover', (event: Event): void => {
      const target = event.target as HTMLDivElement;

      if (target.classList.length === 0 && target.tagName.toLocaleLowerCase() === 'div') {
        target.classList.add('highlight');

        const el = document.querySelector('.highlight') as HTMLElement;
        const index = el.parentNode ? [...el.parentNode.children].indexOf(el) : -1;

        this.findElementOnTable(tableSurface, target.innerText, index);
      }
    });

    editorMarkup.addEventListener('mouseout', (event: Event): void => {
      const target = event.target as HTMLDivElement;
      if (target.tagName.toLocaleLowerCase() === 'div' && target.classList.contains('highlight')) {
        target.classList.remove('highlight');
        document.querySelector('.backlight')?.classList.remove('backlight');
      }
      
    });
  }

  private findElementOnTable(element: Element, text: string, index: number): void {
    const childrenElements: HTMLCollection = element.children;
    text = Editor.removeSpaces(text);

    // for (let i = 0; i < childrenElements.length; i += 1) {
    //   const el = childrenElements[i];
    //   let elementHtml = element.outerHTML.replace('class="dance"', '').replace('dance', '').replace('class=""', '');
    //   elementHtml = removeSpaces(elementHtml);

    //   if (elementHtml === text && index === i) {
    //     el.classList.add('backlight');
    //   }

    //   if (el.hasChildNodes()) {
    //     this.findElementOnTable(element, text, index);
    //   }
    // }
  }

  static clearEditor():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    const input = document.querySelector('.editor__input') as HTMLInputElement;

    input.value = '';
    markup.innerHTML = '';
  }

  static removeSpaces(str: string): string {
    return str.trim().split('').filter((el) => el != ' ').join('');
  };

  private getMarkup(): HTMLElement {
    const htmlElement = document.createElement('div') as HTMLDivElement;
    htmlElement.innerHTML = this.boardMarkup;
    const newElement = this.wrapTagsInDiv(htmlElement);

    return (newElement) ? newElement : htmlElement;
  }

  private wrapTagsInDiv(htmlMarkupElement: HTMLElement): HTMLElement | undefined {
    const hasChildren: boolean = (htmlMarkupElement.children.length > 0) ? true : false;
    const wrapper = document.createElement('div') as HTMLElement;

    if (hasChildren) {
      const markupElementChildren: HTMLCollection = htmlMarkupElement.children;

      for (const node of markupElementChildren) {
        if (markupElementChildren.length > 1) {
          const newElement = document.createElement('div') as HTMLElement;
          this.appendElement(node, newElement);
          wrapper.append(newElement);
        }
        if (markupElementChildren.length === 1) {
          this. appendElement(node, wrapper);
        }
      }
      
    } else {
      return undefined;
    }

    return wrapper;
  }

  private appendElement(node: Element, element: HTMLElement): void {
    if (node.classList.length > 0) {
      const openTag = `<${node.tagName.toLocaleLowerCase()} class="${node.classList}">`;
      element.append(openTag);
    } else {
      element.append(`<${node.tagName.toLocaleLowerCase()}>`);
    }
    const innerElement: HTMLElement | undefined = this.wrapTagsInDiv(node as HTMLElement);
    if (innerElement !== undefined) {
      element.append(innerElement);
    }
    element.append(`</${node.tagName.toLocaleLowerCase()}>`);
  }
}

export default Editor;