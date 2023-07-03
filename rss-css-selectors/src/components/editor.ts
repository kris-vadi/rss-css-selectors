class Editor {
  boardMarkup: string;

  constructor(boardMarkup: string) {
    this.boardMarkup = boardMarkup;
  }

  public addBoardMarkup():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    const newMarkup = this.getMarkup();
    Editor.clearEditor();
    markup.append(newMarkup);
  }
  
  static clearEditor():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    const input = document.querySelector('.editor__input') as HTMLInputElement;

    input.value = '';
    markup.innerHTML = '';
  }

  private getMarkup(): HTMLElement {
    const htmlElement = document.createElement('div') as HTMLDivElement;
    htmlElement.innerHTML = this.boardMarkup;
    const newElement = this.wrapTagsInDiv(htmlElement);

    return (newElement) ? newElement : htmlElement;
  }

  private wrapTagsInDiv(htmlMarkupElement: HTMLElement): HTMLElement | undefined {
    const hasChildren: boolean = (htmlMarkupElement.children.length > 0) ? true : false;
    const wrapper = document.createElement('div') as HTMLElement;
    const appendElement = (node: Element, element: HTMLElement): void => {
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
    };

    if (hasChildren) {
      const markupElementChildren: HTMLCollection = htmlMarkupElement.children;

      for (const node of markupElementChildren) {
        if (markupElementChildren.length > 1) {
          const newElement = document.createElement('div') as HTMLElement;
          appendElement(node, newElement);
          wrapper.append(newElement);
        }
        if (markupElementChildren.length === 1) {
          appendElement(node, wrapper);
        }
      }
      
    } else {
      return undefined;
    }

    return wrapper;
  }
}

export default Editor;