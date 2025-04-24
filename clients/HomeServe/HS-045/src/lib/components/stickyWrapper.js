const stickyWrapper = (id, text, price, priceText, link) => {
  const html = `
        <div class="${id}__stickyWrapper">
            <div class="${id}__stickyContainer">
                <div class="${id}__sticky-content">
                    <h1>${text}</h1>
                    <div class="${id}__sticky-footer">
                        <div class="${id}__sticky-price">
                            <p class="${id}__sticky-price-main">
                                ${price}
                                ${priceText.includes('month') ? `<span>a month<span>` : ''}                         
                            </p>
                            <span class="${id}__sticky-price-text">
                                ${priceText.includes('month') ? 'in your first year' : `${priceText}`} 
                            </span>
                        </div>
                        <a href="${link}" class="btn secondary-btn apply-now-btn" aria-label="Apply now">Apply now</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;
  return html;
};
export default stickyWrapper;
