import shared from "../../../../../../core-files/shared";

const { ID } = shared;

export default () => {
	const bottomMarkup = `<div class="${ID}-container ${ID}-bottomGrid">
        <div class="row">
            <div class="${ID}-block ${ID}-half ${ID}-vid"></div>
            <div class="${ID}-block ${ID}-half">
                <div class="${ID}-innerBlock">
                    <div class="${ID}-image" style="background-image: url('https://blcro.fra1.digitaloceanspaces.com/HC129/ethicalFarmingImage.jpg')"></div>
                    <div class="${ID}-textBlock">
                        <h4>Gentle Farming</h4>
                        <p>Ethical, sustainable cacao - from root to wrapper.</p>
                        <a href="https://www.hotelchocolat.com/uk/engaged-ethics/gentle-farming.html" class="${ID}-textLink">Learn More</a> 
                    </div>
                </div>
            </div>
        </div>
    </div>`;

	document
		.querySelector(`.product-col-2.product-detail`)
		.insertAdjacentHTML("afterend", bottomMarkup);
};
