import settings from './settings';
import pubSub from './PublishSubscribe';

/**
 * @constant Quotes
 */
const QUOTES = [
  {
    title: "She'll love how they look",
    quote: "Fantastic value for money, they simply sparkle together. I can’t wait until my Fiancé places the wedding band on my finger! Until then, I will just look at it in the box every now and then",
  },
  {
    title: "Give her something unique",
    quote: "The pictures don't do these rings justice! It's so gorgeous, sparkly & something a bit different from your usual rings. I wear my set together, but the engagement ring on its own is lovely too.",
  },
  {
    title: "Rings that sparkle together",
    quote: "I am so glad he made this choice as it is literally stunning. Not something I would normally go for but glad I have this exquisite ring on my finger. Also the sparkle on it is lovely!!",
  },
];

/**
 * Note in the Brief positions are identified as 2, 5, 9. These positions refer 
 * to zero-based position of product _after_ which the review should 
 * appear, so subtract 2 from user 'desired'
 *
 * @constant 
 */
const positions = {
  'mobile': [0,3,7],
  'desktop': [0,7,11],
};

/**
 * Get a Quote
 *
 * @param {Number} idx
 * @return {Object}
 */
export const getQuote = (idx) => QUOTES[idx];

/**
 * Count Quotes
 *
 * @return {Number}
 */
export const countQuotes = () => QUOTES.length;

/**
 * Decorate a quote item
 *
 * @param {Function} fn
 * @return {Function}
 */
export const decorateQuote = (fn) => {
  return (idx) => {
    const title = fn(idx).title;
    const quote = fn(idx).quote;

    const html = `
      <div class="${settings.ID}-quote">
        <span class="${settings.ID}-quote__title">${title}</span>
        <blockquote class="${settings.ID}-quote__text">${quote}</blockquote>

        <div class="${settings.ID}-quote__rating">
          <span class="rating-stars__stars" aria-hidden="true" role="presentation">&#9733;</span>
          <span class="rating-stars__stars" aria-hidden="true" role="presentation">&#9733;</span>
          <span class="rating-stars__stars" aria-hidden="true" role="presentation">&#9733;</span>
          <span class="rating-stars__stars" aria-hidden="true" role="presentation">&#9733;</span>
          <span class="rating-stars__stars" aria-hidden="true" role="presentation">&#9733;</span>
        </div>
      </div>
    `;

    return html;
  }
};

/**
 * Decorate a product item
 *
 * @param {Function} fn
 * @return {Function}
 */
export const decorateProductItem = (fn) => {
  return (idx) => {
    const html = `
      <li class="product-tile-list__item list-item ${settings.ID}-list-item">
        ${fn(idx)}
      </li>
    `;

    return html;
  }
};

/**
 * Get location to place quote
 *
 * @param {Number} idx
 * @param {String} breakpoint
 * @return {Number}
 */
export const getQuotePositions = (breakpoint = 'desktop') => positions[breakpoint];
