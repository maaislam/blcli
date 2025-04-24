import { editicon } from '../assets/icons';

const plpContent = (id, classes) => {
  const htnl = `
    <div class="${id}__plpContent ${classes ? `${classes}` : ''}">
      <p aria-label="Shop for a Job" class="${id}__select item-one">Shop for a Job</p>
      <p aria-label="I'm looking for products for, click to edit." class="${id}__select item-one ${id}__selectItemOne" data-step="item-one">I’m looking for products for 
        <span class="${id}__text"></span>&nbsp;<span class="${id}__iconEdit">${editicon}</span>
      </p>
      <p aria-labelledby="label-text-two" class="${id}__select item-two" data-step="item-two">I’m <span id="label-text-two" class="${id}__text"></span>&nbsp;<span class="${id}__iconEdit">${editicon}</span>
      </p>
      <p aria-labelledby="label-text-three" class="${id}__select item-three" data-step="item-three">I’m working on <span id="label-text-three" class="${id}__text"></span>&nbsp;<span class="${id}__iconEdit">${editicon}</span>
      </p>
    </div> 
    `;

  return htnl;
};
export default plpContent;
