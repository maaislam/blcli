/**
 * @desc New customisation options - only show on logo select
 */

import settings from '../../settings';

const { ID } = settings;

export default class NotesArea {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_newNotes_area`);

    /* create the fixed pop up basket */
    element.innerHTML = `
    <h2>Additional Notes/Comments</h2>
    <span>You get to see your item before we print it!</span>
    <p>We NEVER print or embroider your items without providing you with a visual representation of how it will look in PDF format - which will require approval before production</p>
    <div class="${ID}-notes-Area"></div>
    `;
    this.component = element;
  }

  render() {
    const { component } = this;
    const notes = document.querySelector('#notes_comments');
    notes.appendChild(component);

    const textBox = notes.querySelector('textarea');
    component.querySelector(`.${ID}-notes-Area`).appendChild(textBox);
  }
}
