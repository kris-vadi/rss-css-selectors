class Editor {
  boardMarkup: string;

  constructor(boardMarkup: string) {
    this.boardMarkup = boardMarkup;
  }

  public addBoardMarkup():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    const input = document.querySelector('.editor__input') as HTMLInputElement;
    
    input.value = '';
    markup.innerHTML = '';
    markup.append(this.boardMarkup);
    this.getMarkup();
  }

  private getMarkup(): HTMLDivElement {
    const markup = document.querySelector('.table__surface') as HTMLDivElement;
      
    const newMarkup: HTMLDivElement | undefined = this.wrapTagsInDiv(markup);
    return (newMarkup) ? newMarkup : markup;
  }

  private wrapTagsInDiv(markup: HTMLDivElement): HTMLDivElement | undefined {
    const hasChildren: boolean = (markup.children.length > 0) ? true : false;
    const regexp = /<[^<>]+>/g;
    //console.log(markup);

    if (hasChildren) {
      const markupChildrens: HTMLCollection = markup.children;
      //console.log(markupChildrens);
      
      // for(let i = 0; i < markupChildrens.length; i += 1) {
      //   const el = markupChildrens[i];
      //   console.log(el);
      //   const newDiv = document.createElement('div');
      //   const tags: string[] | null= el.outerHTML.match(regexp);
      //   const openTag: string = (tags) ? tags[0] : '';
      //   const closeTag: string = (tags) ? tags[1] : '';
      //   const innerEl: HTMLDivElement | undefined = this.wrapTagsInDiv(el as HTMLDivElement);

      //   newDiv.append(openTag);
      //   //innerEl && newDiv.append(innerEl);
      //   newDiv.append(closeTag);
        
      //   markup.append(newDiv);
      // }

      return markup;
    } 

    if (!hasChildren) return markup;

  }
}

export default Editor;