const getSavedCards = () => {
  const savedCardsEl = document.querySelector('.PaymentMethodList .savedcard');
  if (savedCardsEl) {
    return true;
  } else {
    return false;
  }
};

export default getSavedCards;
