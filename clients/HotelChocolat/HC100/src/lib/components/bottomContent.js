import shared from "../../../../../../core-files/shared";

const { ID } = shared;

export default () => {
	const bottomMarkup = `<div class="${ID}-container ${ID}-bottomGrid">
        <div class="row">
            <div class="${ID}-block ${ID}-half ${ID}-vid"></div>
            <div class="${ID}-block ${ID}-half">
                <div class="${ID}-innerBlock">
                    <div class="${ID}-image" style="background-image: url('https://editor-assets.abtasty.com/48343/620a4b3fbda201644841791.jpg')"></div>
                    <div class="${ID}-textBlock">
                        <h4>The Podcycler</h4>
                        <p>Every Podster comes with a complimentary Podcycler, our new innovation that allows you to put our pods and standards-sized Nespresso®* pods into your household recycling - because our planet should always come first.</p>
                        <a href="https://www.hotelchocolat.com/uk/blog/coffee/sustainable-coffee-pods.html" class="${ID}-textLink">Find out more</a> 
                    </div>
                </div>
            </div>
        </div>
        
    </div>`;
	/*<div class="row">
            <div class="${ID}-block ${ID}-full">
                <h2>Velvetiser™ + Podster</h2>
                <div class="${ID}-innerBlock">
                <div class="${ID}-image" style="background-image: url('https://editor-assets.abtasty.com/48343/620a491033b831644841232.jpg')"></div>
                    <div class="${ID}-textBlock">
                        <h4>Barista-Grade Drinks. At Home.</h4>
                        <p>Make your kitchen your café with two beautifully designed machines that deliver barista-grade drinking chocolate and coffee, at the touch of a button.</p>
                        <a href="https://www.hotelchocolat.com/uk/home-barista.html" class="${ID}-cta">Find out more</a> 
                    </div>
                </div>
            </div>
        </div>
        <div class="row ${ID}-last">
            <div class="${ID}-block ${ID}-half">
                <h3>Discover our hot chocolate system:</h3>
                <div class="${ID}-innerBlock">
                    <div class="${ID}-image" style="background-image: url('https://editor-assets.abtasty.com/48343/620a4baa00a951644841898.jpg')"></div>
                    <div class="${ID}-textBlock">
                        <h4>The Velvetiser™</h4>
                        <p>Barista-Grade drinking chocolate and chocolate lattes, at home.</p>
                        <ul>
                            <li>Pour in milk.</li>
                            <li>Add single-serve.</li>
                            <li>Press button.</li>
                            <li>It's that simple.</li>
                        </ul>
                        <a href="https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-maker.html" class="${ID}-cta">Shop now</a> 
                    </div>
                </div>
            </div>
            <div class="${ID}-block ${ID}-half ${ID}-right">
                <h3>Save with Velvetiser™ & Poster Subscription</h3>
                <div class="${ID}-innerBlock">
                <div class="${ID}-image" style="background-image: url('https://editor-assets.abtasty.com/48343/620a493c5947c1644841276.jpg')"></div>
                    <div class="${ID}-textBlock">
                        <h4>Velvetiser™ + Podster</h4>
                        <p>Buy both machines for £124.90 with a 120-month Drinking Chocolate and Rabot Estate Coffee Subscription.</p>
                        <a href="https://www.hotelchocolat.com/uk/home-barista-subscriptions.html" class="${ID}-cta">Find out more</a> 
                    </div>
                </div>
            </div>
        </div>*/
	document
		.querySelector(`.product-col-2.product-detail`)
		.insertAdjacentHTML("afterend", bottomMarkup);
};
