const goBack = () => {
  const ref = document.querySelector('.ContentWrap .CheckWrap');
  if (ref) {
    ref.insertAdjacentHTML('beforeend', `
      <a href="https://www.flannels.com/checkout/deliverychoices" class="FL066-back">Back</a>
    `);
  }
};

export default goBack;
