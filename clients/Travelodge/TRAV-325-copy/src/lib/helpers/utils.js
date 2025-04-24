export const getRateData = (clickedButton) => {
  const row = clickedButton.closest('.card-pad');

  const saverRateBtn = row.querySelector('.rate-btn[data-room-rate-type-name="Saver"]');
  const flexibleRateBtn = row.querySelector('.rate-btn[data-room-rate-type-name="Flexible"]');

  let clickedSaverElem = null;
  let saverPriceText = '';
  let saverPriceNum = 0;
  let flexiblePriceText = '';
  let flexiblePriceNum = 0;
  let priceDifferenceText = '';
  let priceDifferenceNum = 0;

  // Extract saver rate button data
  if (saverRateBtn) {
    saverPriceText = saverRateBtn.textContent.trim();
    saverPriceNum = parseFloat(saverPriceText.replace(/[£,]/g, ''));
    if (saverRateBtn === clickedButton) {
      clickedSaverElem = saverRateBtn;
    }
  }

  // Extract flexible rate button data
  if (flexibleRateBtn) {
    flexiblePriceText = flexibleRateBtn.textContent.trim();
    flexiblePriceNum = parseFloat(flexiblePriceText.replace(/[£,]/g, ''));
  }

  // Calculate price difference
  if (saverPriceNum && flexiblePriceNum) {
    priceDifferenceNum = flexiblePriceNum - saverPriceNum;
    priceDifferenceText = `£${priceDifferenceNum.toFixed(2)}`;
  }

  // Return the required object
  return {
    clickedSaverElem,
    flexibleRateBtn,
    saverPriceText,
    saverPriceNum,
    flexiblePriceText,
    flexiblePriceNum,
    priceDifferenceText,
    priceDifferenceNum,
  };
};
