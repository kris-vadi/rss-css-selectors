import { Level } from './types';

export const levels: Level[] = [
  {
    selectorName : 'Type Selector',
    helpTitle : 'Select elements by their type',
    doThis : 'Select all plates',
    selector : ['plate'],
    syntax : 'type',
    help : 'Selects all elements of type <strong>type</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples : [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    boardMarkup: `
    <plate></plate>
    <plate></plate>
    <plate></plate>
    `,
  },
  {
    selectorName: 'ID Selector',
    helpTitle: 'Select elements with an specific ID',
    doThis : 'Select the blue plate',
    selector : ['#blue', 'plate#blue'],
    syntax: '#id',
    help : 'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
    examples : [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    boardMarkup : `
    <plate id="blue"></plate>
    <plate></plate>
    <plate id="blue"></plate>
    `,
  },
  {
    selectorName : 'Descendant Selector',
    helpTitle: 'Select an element inside another element',
    doThis : 'Select the apple on the plate',
    selector : ['plate apple', 'plate > apple'],
    syntax: 'type A&nbsp;&nbsp;type B',
    help : 'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
    examples : [
      '<strong>p&nbsp;&nbsp;strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
      '<strong>#fancy&nbsp;&nbsp;span</strong> selects any <tag>span</tag> elements that are inside of the element with <strong>id="fancy"</strong>',
    ],
    boardMarkup : `
    <apple></apple>
    <plate>
      <apple></apple>
    </plate>
    <apple></apple>
    <plate></plate>
    `,
  },
  {
    selectorName: 'Combine class and css selector',
    helpTitle: 'Combine the Class Selector',
    doThis: 'Select the small oranges',
    selector: ['orange.big'],
    syntax: 'A.className',
    help: 'You can combine the class selector with other selectors, like the type selector.',
    examples : [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    boardMarkup :`
    <orange></orange>
    <orange class="big"></orange>
    <bento>
     <orange class="big"></orange>
    </bento>
    <plate>
      <orange></orange>
    </plate>
    `,
  },
  {
    selectorName: 'Select every element inside a plate',
    helpTitle: 'Combine the Universal Selector',
    doThis : 'Select everything on a plate',
    selector : ['plate *', 'plate > *'],
    syntax : 'type&nbsp;&nbsp;*',
    help : 'This selects all elements inside of <strong>A</strong>.',
    examples : [
      '<strong>p *</strong> selects every element inside all <tag>p</tag> elements.',
      '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
    ],
    boardMarkup: `
    <plate>
      <pear></pear>
    </plate>
    <plate id="blue">
      <orange></orange>
    </plate>
    <apple class="big">
    `,
  },
  {
    selectorName: 'First Child Pseudo-selector',
    helpTitle: 'Select a first child element inside of another element',
    doThis: 'Select the first apple',
    selector: ['bento :first-child'],
    syntax: ':first-child',
    help: 'You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
    examples: [
      '<strong>:first-child</strong> selects all first child elements.',
      '<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.',
      '<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.',
    ],
    boardMarkup: `
    <bento>
      <pear></pear>
      <pear></pear>
      <pear></pear>
    </bento>
    `,
  },
  {
    selectorName: 'Nth Child Pseudo-selector',
    helpTitle: 'Select an element by its order in another element',
    doThis: 'Select the 4rd pear on the bento',
    selector: ['bento :nth-child(4)'],
    syntax: ':nth-child(A)',
    help: 'Selects the <strong>nth</strong> (Ex: 1st, 3rd, 10th etc.) child element in another element.',
    examples: [
      '<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.',
      '<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>',
    ],
    boardMarkup: `
    <bento>
      <pear></pear>
      <pear class="big"></pear>
      <pear></pear>
      <pear></pear>
      <pear></pear>
    </bento>
    `,
  },
  {
    selectorName: 'Empty Selector',
    helpTitle: "Select elements that don't have children",
    doThis : 'Select the empty plates',
    selector : ['plate:empty'],
    syntax: ':empty',
    help : "Selects elements that don't have any other elements inside of them.",
    examples : [
      '<strong>div:empty</strong> selects all empty <tag>div</tag> elements.',
    ],
    boardMarkup:`
    <plate></plate>
    <plate id="blue">
      <orange></orange>
    </plate>
    <bento></bento>
    <plate></plate>`,
  },
  {
    selectorName : 'Comma Combinator',
    helpTitle: 'Combine, selectors, with... commas!',
    doThis : 'Select all apples and pears',
    selector : ['apple,pear', 'pear,apple'],
    syntax : 'A, B',
    help : 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
    examples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements',
    ],
    boardMarkup : `
    <pear class="big"></pear>
    <apple></apple>
    <plate id="blue">
      <apple></apple>
    </plate>
    <bento>
      <pear></pear>
    </bento>
    <orange></orange>
    `,
  },
  {
    selectorName: 'Last of Type Selector',
    helpTitle: 'Select the last element of a specific type',
    doThis : 'Select the last pear and orange',
    selector : ['.big:last-of-type'],
    syntax: ':last-of-type',
    help : 'Selects each last element of that type within another element. Remember type refers the kind of tag, so <tag>p</tag> and <tag>span</tag> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.',
    examples : [
      '<strong>div:last-of-type</strong> selects the last <tag>div</tag> in every element.',
      '<strong>p span:last-of-type</strong> selects the last <tag>span</tag> in every <tag>p</tag>.',
    ],
    boardMarkup : `
    <pear class="big"></pear>
    <pear class="big"></pear>
    <apple></apple>
    <plate id="blue"></plate>
    <orange class="big"></orange>
    <orange class="big"></orange>
    `,
  },
];