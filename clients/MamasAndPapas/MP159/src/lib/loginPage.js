export const loginPage = (guestElements, accountElements) => {
  const html = document.createElement('div');
  html.classList.add('MPLogin', 'checkout_form my-3 js-checkout');

  // Guest
  html.insertAdjacentHTML('beforeend', `
    <div className="MPLogin-guest">

    </div>
  `);
};