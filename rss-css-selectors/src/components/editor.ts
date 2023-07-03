class Editor {
  boardMarkup: string;

  constructor(boardMarkup: string) {
    this.boardMarkup = boardMarkup;
  }

  public addBoardMarkup():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    const divElement = document.createElement('div');
    Editor.clearEditor();
    divElement.append(this.getMarkup());
    markup.append(divElement);
  }
  
  static clearEditor():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    const input = document.querySelector('.editor__input') as HTMLInputElement;

    input.value = '';
    markup.innerHTML = '';
  }

  private getMarkup(): HTMLElement {
    const markup = document.querySelector('.table__surface') as HTMLDivElement;
      
    const newMarkup: HTMLElement | undefined = this.wrapTagsInDiv(markup);
    return (newMarkup) ? newMarkup : markup;
  }

  private wrapTagsInDiv(markup: HTMLElement): HTMLElement | undefined {
    const hasChildren: boolean = (markup.children.length > 0) ? true : false;
    const wrapper = document.createElement('div') as HTMLElement;

    if (hasChildren) {
      const markupChildren: HTMLCollection = markup.children;

      for (const node of markupChildren) {
        const newElement = document.createElement('div') as HTMLElement;

        newElement.append(`<${node.tagName.toLocaleLowerCase()}>`);
        const innerElement: HTMLElement | undefined = this.wrapTagsInDiv(node as HTMLElement);
        if (innerElement !== undefined) {
          newElement.append(innerElement);
        }
        newElement.append(`</${node.tagName.toLocaleLowerCase()}>`);
        wrapper.append(newElement);
      }
    } else {
      return undefined;
    }
    
    return wrapper;
  }
}

export default Editor;