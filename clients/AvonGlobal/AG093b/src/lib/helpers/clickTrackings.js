const initClickTrackings = (fireEvent) => {
  document.body.addEventListener('click', (event) => {
    const targetMatched = (desiredMatch) => event.target.matches(desiredMatch) || event.target.closest(desiredMatch);

    if (targetMatched('.page_product_slide ')) {
      fireEvent('user clicks on a product in the product carousel');
    } else if (targetMatched('.add-to-cart')) {
      //fireEvent('user clicks new add to bag CTA in carousel');
    } else if (targetMatched('.btn_add')) {
      fireEvent('user adds a DY recommended product to their basket');
    }
  });
};
export default initClickTrackings;
