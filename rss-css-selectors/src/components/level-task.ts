import { Level } from './types';

class LevelTask {
  level: Level;

  constructor(level: Level) {
    this.level = level;
    this.addLevelTask();
  }

  public addLevelTask(): void {
    let examples = '';
    const levelTask = document.querySelector('.level-task') as HTMLDivElement;

    this.level.examples?.forEach((examle: string) => {
      examples += `<div class="level-task__example">${examle}</div>`;
    });

    const taskHtml = `
    <h2 class="level-task__title">${this.level.helpTitle}:</h2>
    <div class="level-task__description">${this.level.doThis}</div>
    <div class="level-task__accordion">
      <span class="level-task__selector">${this.level.selectorName}</span>
      <div class="level-task__syntax">${this.level.syntax}</div>
    </div>
    <div class="level-task__panel">
      <div class="level-task__help">${this.level.help}</div>
      <h3>Examples:</h3>
      ${examples}
    </div>
    `;

    levelTask.innerHTML = '';
    levelTask.innerHTML = taskHtml;
  }

  public addAccordion(): void {
    const accordion = document.querySelector('.level-task__accordion') as HTMLDivElement;
    const panel = document.querySelector('.level-task__panel') as HTMLDivElement;

    const toggleClass = (element: HTMLDivElement): void=> {
      if (element.classList.contains('active')) {
        element.classList.remove('active');
      } else {
        element.classList.add('active');
      }
    };

    accordion.addEventListener('click', () => {
      toggleClass(accordion);
      toggleClass(panel);
    });
  }
}

export default LevelTask;