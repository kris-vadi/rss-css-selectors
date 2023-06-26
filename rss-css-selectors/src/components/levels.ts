export interface Level {
  selectorName: string;
  helpTitle: string;
  doThis: string;
  selector: string;
  syntax: string;
  help: string;
  examples: string[];
  boardMarkup: string;
} 

export const levels: Level[] = [
  {
    selectorName: 'First Child Pseudo-selector',
    helpTitle: 'Select a first child element inside of another element',
    doThis: 'Select the first apple',
    selector: 'plate :first-child',
    syntax: ':first-child',
    help: 'You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
    examples: [
      '<strong>:first-child</strong> selects all first child elements.',
      '<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.',
      '<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.',
    ],
    boardMarkup:`
    <plate />
    <plate>
      <apple />
      <apple />
      <apple />
    </plate>
    `,
  },
  {
    selectorName: 'Nth Child Pseudo-selector',
    helpTitle: 'Select an element by its order in another element',
    doThis: 'Select the 4rd plate',
    selector: ':nth-child(4)',
    syntax: ':nth-child(A)',
    help: 'Selects the <strong>nth</strong> (Ex: 1st, 3rd, 10th etc.) child element in another element.',
    examples: [
      '<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.',
      '<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>',
    ],
    boardMarkup: `
    <plate id="blue"/>
    <plate id="blue"/>
    <plate/>
    <plate/>
    <plate/>
    `,
  },
];