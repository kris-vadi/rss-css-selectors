class Editor {
  boardMarkup: string;

  selector: string;

  constructor(boardMarkup: string, selector: string) {
    this.boardMarkup = boardMarkup;
    this.selector = selector;
  }

  public addBoardMarkup():void {
    const markup = document.querySelector('.editor__markup') as HTMLDivElement;
    
    markup.innerHTML = this.boardMarkup;
  }

  private checkInputResult(): boolean {
    const input = document.querySelector('.editor__input') as HTMLInputElement;
    const inputRule: string = input.value.trim();

    return (inputRule === this.selector);
  }

  public clickEnterButton(): void {
    const button = document.querySelector('.editor__button') as HTMLButtonElement;

    button.addEventListener('click', () => {
      this.checkInputResult();
    });
  }

  public pressEnter(): void {
    const input = document.querySelector('.editor__input') as HTMLInputElement;

    input.addEventListener('keypress', (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Enter') {
        this.checkInputResult();
      }
    });
  }
}

export default Editor;