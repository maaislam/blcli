const banner = (id, shopNowUrl) => {
    const htmlStr = `
	<div class='${id}-banner ${id}-background'>
        <div class="${id}-banner-content">
            <h3 class="title">The Winter Wellbeing Sale</h3>
            <p class='subTitle'>Your feel-good favourites with up to 50% off + an extra 10% with code: WELLBEING10</p>
            <a class="${id}__button button is-white is-size-9 is-uppercase has-text-weight-semibold" href="${shopNowUrl}">Shop Now</a>		
        </div>
    </div>
	`;
    return htmlStr;
};
export default banner;
