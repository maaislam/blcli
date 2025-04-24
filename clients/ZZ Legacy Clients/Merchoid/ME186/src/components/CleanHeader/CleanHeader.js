import settings from '../../lib/settings';

const { ID } = settings;

export default class CleanHeader {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    // Search bar
    const search = document.createElement('div');
    search.classList.add(`${ID}_Search`);
    search.innerHTML = `
      <input type="text" placeholder="Start typing a brand or product name..." />
      <div class="${ID}_Search-icon">
        <i class="fa fa-search init-search"></i>
      </div>
    `;

    this.searchBar = search;
  }

  bindEvents() {
    const { searchBar } = this;

    // Old form
    const oldSearch = document.querySelector('#searchform');
    const oldInput = oldSearch.querySelector('input');

    // New form
    const submit = searchBar.querySelector(`.${ID}_Search-icon`);
    const input = searchBar.querySelector('input');

    /** Submit original seach form with value from new input */
    const submitForm = () => {
      const { value } = input;

      if (value) {
        oldInput.value = value;
        oldSearch.submit();
      }
    };

    input.addEventListener('keydown', (e) => {
      if (e.which === 13) {
        submitForm();
      }
    });
    submit.addEventListener('click', submitForm);
  }

  render() {
    const { searchBar } = this;
    const header = document.querySelector('#masthead');
    header.insertAdjacentElement('afterend', searchBar);
  }
}
