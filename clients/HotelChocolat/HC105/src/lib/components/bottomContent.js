import shared from "../../../../../../core-files/shared"

const { ID } = shared;


export default () => {
    const bottomMarkup = 
    `<div class="${ID}-container ${ID}-bottomGrid">
        <div class="row">
            <div class="${ID}-block ${ID}-half ${ID}-vid"></div>
            <div class="${ID}-block ${ID}-half">
                <div class="${ID}-innerBlock">
                    <div class="${ID}-image" style="background-image: url('https://editor-assets.abtasty.com/48343/620a6067cad151644847207.jpg')"></div>
                    <div class="${ID}-textBlock">
                        <h4>The Drinking Chocolate Subscription</h4>
                        <p>Never run out of your favourite drinking chocolate again and earn chocolate rewards.</p>
                        <a href="https://www.hotelchocolat.com/uk/velvetiser-subscription.html" class="${ID}-textLink">Find out more</a> 
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
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
                <h3>Discover our Coffee Machine:</h3>
                <div class="${ID}-innerBlock">
                    <div class="${ID}-image" style="background-image: url('https://editor-assets.abtasty.com/48343/620a60253134e1644847141.jpg')"></div>
                    <div class="${ID}-textBlock">
                        <h4>The Podster</h4>
                        <p>Barista-Grade coffee from sustainable pods, at home.</p>
                        <ul>
                            <li>A sleek new pod coffee machine for your home. It’s designed to pair perfectly with the Velvetiser.</li>
                        </ul>
                        <a href="https://www.hotelchocolat.com/uk/podster.html" class="${ID}-cta">Shop now</a> 
                    </div>
                </div>
            </div>
            <div class="${ID}-block ${ID}-half ${ID}-right">
                <h3>Save with Velvetiser™ & Podster Subscription</h3>
                <div class="${ID}-innerBlock">
                <div class="${ID}-image" style="background-image: url('https://editor-assets.abtasty.com/48343/620a493c5947c1644841276.jpg')"></div>
                    <div class="${ID}-textBlock">
                        <h4>Velvetiser™ + Podster</h4>
                        <p>Buy both machines for £124.90 with a 120-month Drinking Chocolate and Rabot Estate Coffee Subscription.</p>
                        <a href="https://www.hotelchocolat.com/uk/home-barista-subscriptions.html" class="${ID}-cta">Find out more</a> 
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    document.querySelector(`.product-col-2.product-detail`).insertAdjacentHTML('afterend', bottomMarkup);
}
