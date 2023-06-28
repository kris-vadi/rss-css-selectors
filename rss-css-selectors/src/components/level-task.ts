import { Level } from './levels';

class LevelTask {
  level: Level;

  constructor(level: Level) {
    this.level = level;
    this.addLevelTask();
  }

  addLevelTask(): void {
    let examples = '';
    const levelTask = document.querySelector('.level-task') as HTMLDivElement;

    this.level.examples.forEach((examle) => {
      examples += `<div class="level-task__example">${examle}</div>`;
    });

    const taskHtml = `
    <h2 class="level-task__title">${this.level.helpTitle}:</h2>
    <div class="level-task__description">${this.level.doThis}</div>
    <span class="level-task__selector">${this.level.selectorName}</span>
    <div class="level-task__syntax">${this.level.syntax}</div>
    <div class="level-task__help">${this.level.help}</div>
    <h3>Examples:</h3>
    ${examples}
    `;

    levelTask.innerHTML = '';
    levelTask.innerHTML = taskHtml;
  }
}

export default LevelTask;