/**
 * @desc Adds an icon bar to the page.
 * @param {Element} ref 
 * @param {String} pos 
 * @param {Boolean} desktop 
 */
export const iconBar = (ref, pos, desktop) => {
  if (!ref) return;
  if (document.querySelector('.DO001-iconBar')) return;
  ref.insertAdjacentHTML(pos ? pos : 'beforeend', `
    <div class="DO001-iconBar">
      ${desktop ? `
        <div class="DO001-iconBarMessage">
          <h3>Why 31 Dover?</h3>

          <p>We’re setting trends with curated wines, liqueurs & spirits. Be the first to know about innovative quality products from leading & new brands.</p>
        </div>
      ` : ''}
      <div>
        <span>
          <img src="https://storage.googleapis.com/ucimagehost/do001/savings.png" alt="Saving coins"/>
        </span>
        <p>Highly Competitive Pricing</p>
      </div>
      <div>
        <span>
          <img src="https://storage.googleapis.com/ucimagehost/do001/bluenextday.png" alt="Next day delivery"/>
        </span>
        <p>Next Day Delivery</p>
      </div>
      <div>
        <span>
          <img src="https://storage.googleapis.com/ucimagehost/do001/gift.png" alt="Gift wrap"/>
        </span>
        <p>Beautiful gift wrap</p>
      </div>
    </div>
  `);
};