import { generateStar } from '../helpers/utils';

const trustpilotRatings = (id, ratingCount) => {
  const htmlStr = `<div class='${id}__trustpilotContainer'>
        <div class='${id}__trustpilotContainer-stars'>
            <span class='${id}__starsGroup'>${generateStar(4)}</span>
            <span class='${id}__trustlogo'><img src='https://sb.monetate.net/img/1/581/5029101.png'/></span>
            <span class='${id}__reviewsCount'>${ratingCount} reviews</span>
        </div>
        <div class='${id}__divider'></div>
        <div class='${id}__reviewText'>
            <span class='${id}__text'>Our customers say we’re great!</span>
            <span class='${id}__reviewCount'>${ratingCount} <span>Trustpilot</span> reviews</span>
        </div>
    </div>`;
  return htmlStr;
};
export default trustpilotRatings;
