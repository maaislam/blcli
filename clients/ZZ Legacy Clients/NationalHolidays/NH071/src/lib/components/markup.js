import shared from '../shared';

const { ID } = shared;

export default class NoResultsMarkup{
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const element = document.createElement('div');
    element.classList.add(`${ID}_noResultsWrapper`);
    element.classList.add(`${ID}_noResultsWrapper--hidden`);
    element.innerHTML = `
      <div class="${ID}-resultDiv ${ID}-didYouMean ${ID}-resultDiv--hidden">
        <h3>Did you mean?</h3>
        <div class="${ID}-term_links"></div>
      </div>

      <div class="${ID}-resultDiv ${ID}-closestMatch ${ID}-resultDiv--hidden">
        <h3>Here's our closest match we have on site:</h3>
        <div class="${ID}-term_links"></div>
      </div>

      <div class="${ID}-resultDiv ${ID}-otherSuggestions">
        <h3>We also found the following results for your terms:</h3>
        <div class="${ID}-term_links"></div>
      </div>

      <div class="${ID}-resultDiv ${ID}-viewAllResults">
        <h3>Search all holidays in your departure region</h3>
        <a href="" class="${ID}-allDepartures">Search all holidays</a>
      </div>

      <div class="${ID}-resultDiv ${ID}-searchAgain">
        <h3>Not what you're looking for? Search all departure points</h3>
        <input type="text" value=""/><div class="${ID}-search_again_button">Search</div>
      </div>

     
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const noResultsContainer = document.querySelector(`.content.search-content .container`);
    noResultsContainer.appendChild(component);

    // move the search again box below this
    const searchAgainBox = document.querySelector('.search-again');
    noResultsContainer.insertAdjacentElement('afterend', searchAgainBox);
  }
}
