import PriceFilters from "./priceBlockWrapper";
import settings from "../settings";
import getPriceLinks from "./getPriceLinks";
import enterPriceBoxes from "./enterPriceBoxes";

const addPriceContent = () => {
  if (settings.VARIATION === '1') {
    const pricefilter = new PriceFilters(settings.ID, {
      content: `<h3>Customise your price range</h3><div class="${settings.ID}-priceLinks"></div>`,
    });
    getPriceLinks();
  }

  if (settings.VARIATION === '2') {
    const pricefilter = new PriceFilters(settings.ID, {
      content: `<h3>Customise your price range</h3><div class="${settings.ID}-priceInputs"></div>`,
    });
    enterPriceBoxes();
  }

  if (settings.VARIATION === '3') {
    const pricefilter = new PriceFilters(settings.ID, {
      content: `<h3>Customise your price range</h3><div class="${settings.ID}-priceSlider"></div>`,
    });
  }
};

export default addPriceContent;
