import shared from '../../../../../core-files/shared';
import { generateStar } from '../helpers/utils';

const trustpilotRatings = (id, ratingCount) => {
  const htmlStr = `<div class='${id}__trustpilotContainer'>
        ${
          shared.VARIATION === '2'
            ? `<div class='${id}__reviewTextv2'>
            Our customers say we’re great
          </div>`
            : ''
        } 
        <div class='${id}__trustpilotContainer-stars'>
            <span class='${id}__starsGroup'>${generateStar(4)}</span>
            <span class='${id}__trustlogo'><img src='https://sb.monetate.net/img/1/581/5030258.png'/></span>
           
        </div>
        <div class='${id}__divider'></div>
        <div class='${id}__reviewText'>
            <span class='${id}__text'>Our customers say we’re great</span>
            <span class='${id}__reviewCount'>${ratingCount} <span>Trustpilot</span> reviews</span>
        </div>
    </div>`;
  return htmlStr;
};
export default trustpilotRatings;
