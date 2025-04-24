import { fireEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';
const { ID } = shared;
const plpClickHandler = (e) => {
  //console.log(e.target);

  const { target } = e;
  if (target.closest('[data-qaid="option"]')) {
    //console.log('clicked on compare');
    fireEvent('Interactions with the compare feature on PLP');
  } else if (target.closest('[data-qaid="button-click-and-collect"]')) {
    const hasDiscount = target.closest(`.${ID}__discount-card`);
    fireEvent(`Interactions with click & collect add to bag CTA on a ${hasDiscount ? '' : 'non '}discount product, on PLP`);
  } else if (target.closest('[data-qaid="button-deliver"]')) {
    const hasDiscount = target.closest(`.${ID}__discount-card`);
    fireEvent(`Interactions with delivery add to bag CTA on a ${hasDiscount ? '' : 'non '}discount product, on PLP`);
  }
};

export default plpClickHandler;
