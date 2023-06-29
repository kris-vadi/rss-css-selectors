class Editor {
  boardMarkup: string;

  constructor(boardMarkup: string) {
    this.boardMarkup = boardMarkup;
  }

  public addBoardMarkup():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    
    markup.innerHTML = this.boardMarkup;
  }

  
}

export default Editor;