import { fireEvent } from "../../../../../../core-files/services";

export const kitHandler = (step) => {
  // setTimeout(() => {
  const stepSummaryContainer = document.querySelector(`div.info_and_summary div[id="${step}"]`);
  if (stepSummaryContainer) {
    const summarytileWrapper = stepSummaryContainer.querySelectorAll(`.summarytile_wrapper .summary_wrapper`);
    let option;
    summarytileWrapper.forEach((product) => {
      option = product.querySelector(`.subscription-title`)?.textContent?.trim();
      let productName = product.querySelector(`.product_title`)?.textContent?.trim();
      let quantity;
      if (step.includes("1")) {
        //   console.log(productName);
        let color;
        if (productName.indexOf("-") > -1) color = productName?.split("-")?.[1]?.trim();
        else if (productName.indexOf("–") > -1) color = productName?.split("–")?.[1]?.trim();
        else color = productName?.split(":")?.[1]?.trim();
        //   console.log(`User clicks on the ${color}`);
        color && fireEvent(`User clicks on the ${color}`);
      } else if (step.includes("2")) {
        quantity = product.querySelector(`.subscription-details`)?.textContent?.trim()?.split(/\s/)?.[0];
        // console.log(`User adds a starter kit ${productName} and quantity: ${quantity}`);
        fireEvent(`User adds a starter kit ${productName} and quantity: ${quantity}`);
      } else {
        quantity = product.querySelector(`input[name="quantity"]`)?.value;
        // console.log(`user adds extra ${productName} and quantity: ${quantity}`);
        fireEvent(`user adds extra ${productName} and quantity: ${quantity}`);
      }
    });
    // option && console.log(`User chooses ${option}`);
    option && fireEvent(`User chooses ${option}`);
  }
  // }, 1000);
};
