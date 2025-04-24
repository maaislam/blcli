import shared from '../../../../../../core-files/shared';
import { partnerUrlsConfig } from '../helpers/getCountry';
import imageBlock from './imageblock';

const imageBlocks = (id, data, country) => {
  const btnText =
    shared.VARIATION === '1'
      ? 'Automate your payments with 350+ partners'
      : 'Automate your payments with 350+ partners, <span class="extra-text">or directly from our dashboard</span>';

  const htmlStr = `
    <div class="${id}__imageblocks ${id}__container ">
        <div class="inner-container">
            <div class="${id}__imageblocks--wrapper">
                ${data.map((item) => imageBlock(id, item)).join('\n')}
            </div>
            <a href="${partnerUrlsConfig[country]}" class="${id}__imageblock--btn">
                ${btnText}
            </a>
        </div>
    </div>`;
  return htmlStr;
};

export default imageBlocks;
