import settings from "../settings";

const removePriceChanges = () => {
  const priceSlider = document.querySelector(`.${settings.ID}-slider`);
  const priceDropdowns = document.querySelector(`.${settings.ID}_priceDropdown`);
  const allApplyButtons = document.querySelectorAll(`.${settings.ID}-applyPrice`);

  if (priceSlider) {
    priceSlider.remove();
  }
  if (priceDropdowns) {
    priceDropdowns.remove();
  }

  if (allApplyButtons) {
    for (let index = 0; index < allApplyButtons.length; index += 1) {
      const element = allApplyButtons[index];
      element.remove();
    }
  }
};

export default removePriceChanges;
