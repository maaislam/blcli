const updateProgress = (totalAmount, progressBar, messageElement) => {
  let percentage;
  let deductedAmount = 0;

  if (totalAmount >= 50) {
    percentage = 100;
  } else {
    percentage = (totalAmount / 50) * 100;
  }

  progressBar.style.width = percentage + '%';

  if (totalAmount < 25) {
    deductedAmount = 25 - totalAmount;
    messageElement.textContent = `Ti mancano ${deductedAmount.toFixed(2)}€ per ricevere un campioncino gratuito.`;
  } else if (totalAmount < 39) {
    deductedAmount = 39 - totalAmount;
    messageElement.textContent = `Ti mancano ${deductedAmount.toFixed(2)}€ per sbloccare la spedizione gratuita.`;
  } else if (totalAmount < 50) {
    deductedAmount = 50 - totalAmount;
    messageElement.textContent = `Ti mancano ${deductedAmount.toFixed(2)}€ per ricevere due campioncini gratuiti.`;
  } else {
    messageElement.textContent = 'Complimenti! Hai tutti i tuoi campioncini.';
  }
};

const progressCalc = (id, totalAmount) => {
  const progressBar = document.querySelector(`.${id}__basketUpsellSection #progress`);
  const messageElement = document.querySelector(`.${id}__basketUpsellSection #message`);

  updateProgress(totalAmount, progressBar, messageElement);
};
export default progressCalc;
