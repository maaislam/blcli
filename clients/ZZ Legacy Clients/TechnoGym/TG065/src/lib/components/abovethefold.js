import settings from '../settings';

export default () => {
  /**
   * Create the above fold wrapper
   */
  const ID = `${settings.ID}`;
  const pageContainer = document.querySelector('#container');

  const aboveFold = document.createElement('div');
  aboveFold.classList.add(`${ID}-abovefold_wrapper`);
  aboveFold.innerHTML =
  `<div class="${ID}-header">
    <a href="https://www.technogym.com">
      <img src="http://www.technogym.com/land/wp-content/uploads/2017/02/Logo-Technogym_squeeze.png">
    </a>
  </div>
  <div class="${ID}-text_wrapper">
    <div class="${ID}-innerText">
      <h3>MYRUN</h3>
      <p>THE START OF <span>A BETTER YOU</span></p>
    </div>
    <div class="${ID}-finance_info">
      <p>Available from £122 a month/flexible payment plans available. Example of a loan: Price £3250, deposit £325, total credit amount £2925 to be returned in 24 monthly repayments each of £122. 0% interest.</p>
    </div>
  </div>
  `;

  pageContainer.insertAdjacentElement('afterbegin', aboveFold);
};
