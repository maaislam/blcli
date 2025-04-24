import settings from '../settings';

export default () => {
  const id = settings.ID;

  const stepsBar = () => {
    const stepBarWrapper = document.createElement('div');
    stepBarWrapper.classList.add(`${id}-steps_bar`);

    const pageTitle = document.querySelector('.page-title');

    if (document.querySelector('#ifcPaymentContainer')) {
      stepBarWrapper.innerHTML = `
      <div class="${id}-finance_Step"><span>1</span><p>Basket</p></div>
      <div class="${id}-finance_Step"><span>2</span><p>Checkout</p></div>
      <div class="${id}-finance_Step"><span>3</span><p>Your details</p></div>
      <div class="${id}-finance_Step"><span>4</span><p>Credit Application</p></div>
      <div class="${id}-finance_Step"><span>5</span><p>Success</p></div>`;
    } else {
      stepBarWrapper.innerHTML = `
      <div class="${id}-finance_Step"><span>1</span><p>Basket</p></div>
      <div class="${id}-finance_Step"><span>2</span><p>Checkout</p></div>
      <div class="${id}-finance_Step"><span>3</span><p>Success</p></div>`;
    }
    pageTitle.insertAdjacentElement('beforebegin', stepBarWrapper);
  };

  if (settings.VARIATION === '3') {
    stepsBar();
  }
};
