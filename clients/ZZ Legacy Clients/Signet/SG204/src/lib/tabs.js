import shared from "../../../../../core-files/shared";
import { categoryTabs } from "./data";
import { productsCarousel } from "./helpers";

const { ID } = shared;

const addBrands = (data) => {
    const brandsEl = data.brands.map((brand) =>
        `<div class="${ID}-brand">
            <a href="${brand.link}"></a> 
            <div class="${ID}-image" style="background-image:url(${brand.image})"></div> 
            <p class="text-large">${brand.text}</p>
        </div>`
    ).join("")

    return brandsEl;
}

export const tabMarkup = () => {
    const tabs = `
    <section class="${ID}-categoryTabs">
        <div class="${ID}-tabContainer">
            <div class="${ID}-tabs">
                <div class="${ID}-linksInner">
                    <h4>Shop:</h4>
                    <div class="${ID}-tabLinks">
                    <div class="${ID}-tab active" tab-target="rings">Rings</div>
                    <div class="${ID}-tab" tab-target="necklaces">Necklaces</div>
                    <div class="${ID}-tab" tab-target="watches">Watches</div>
                    <div class="${ID}-tab" tab-target="earrings">Earrings</div>
                    </div>
                </div>
               
                <div class="${ID}-tabContent active" tab-data="rings">
                    <div class="${ID}-catImage" style="background-image:url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/8c9c37ee-fc43-11ec-9151-6255e5ffafb1')"></div>
                    <div class="${ID}-tabInner">
                        <div class="${ID}-tabTop">
                            <div class="${ID}-catImage" style="background-image:url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/8c9c37ee-fc43-11ec-9151-6255e5ffafb1')"></div>
                            <div class="${ID}-text">
                                <h2 class="alternate">Rings</h2>
                                <p class="text-large">We have a stunning collection of rings on offer for you to celebrate any occasion, whether you are gifting to yourself or a loved one.</p>
                                <a href="https://www.hsamuel.co.uk/webstore/l/rings" class="${ID}-cta primary">Shop now</a>
                            </div>
                        </div>
                        <div class="${ID}-trending">
                            <h2 class="alternate">Trending</h2>
                            <div class="${ID}-brands">${addBrands(categoryTabs["rings"])}</div>
                        </div>
                    </div>
                </div>

                <div class="${ID}-tabContent" tab-data="necklaces">
                    <div class="${ID}-catImage" style="background-image:url('https://cdn.media.amplience.net/i/hsamuel/HS2206WC08_Summer_Campaign_Newness_1342x1050?w=671&fmt=webp')"></div>
                    <div class="${ID}-tabInner">
                        <div class="${ID}-tabTop">
                            <div class="${ID}-catImage" style="background-image:url('https://cdn.media.amplience.net/i/hsamuel/HS2206WC08_Summer_Campaign_Newness_1342x1050?w=671&fmt=webp')"></div>
                            <div class="${ID}-text">
                                <h2 class="alternate">Necklaces</h2>
                                <p class="text-large">Choose from gorgeous diamond-set pendants to our colourful array of necklaces adorned with precious gemstones, and everything in between.</p>
                                <a href="https://www.hsamuel.co.uk/webstore/l/necklaces/" class="${ID}-cta primary">Shop now</a>
                            </div>
                        </div>
                        <div class="${ID}-trending">
                            <h2 class="alternate">Trending</h2>
                            <div class="${ID}-brands">${addBrands(categoryTabs["necklaces"])}</div>
                        </div>
                    </div>
                </div>

                <div class="${ID}-tabContent" tab-data="watches">
                    <div class="${ID}-catImage" style="background-image:url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/0bb49096-0c0f-11ed-bdb1-7edc47212008')"></div>
                    <div class="${ID}-tabInner">
                        <div class="${ID}-tabTop">
                            <div class="${ID}-catImage" style="background-image:url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/0bb49096-0c0f-11ed-bdb1-7edc47212008')"></div>
                            <div class="${ID}-text">
                                <h2 class="alternate">Watches</h2>
                                <p class="text-large">Treat yourself or a loved one to a new timepiece from the collection of watches with some of the biggest brands.</p>
                                <a href="https://www.hsamuel.co.uk/webstore/l/watches/" class="${ID}-cta primary">Shop now</a>
                            </div>
                        </div>
                        <div class="${ID}-trending">
                            <h2 class="alternate">Trending</h2>
                            <div class="${ID}-brands">${addBrands(categoryTabs["watches"])}</div>
                        </div>
                    </div>
                </div>
                
                <div class="${ID}-tabContent" tab-data="earrings">
                    <div class="${ID}-catImage" style="background-image:url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7e49f702-0e73-11ed-b5a6-f6c9d84b23a0')"></div>
                    <div class="${ID}-tabInner">
                        <div class="${ID}-tabTop">
                            <div class="${ID}-catImage" style="background-image:url('https://storage.googleapis.com/exp-app-storage/9191200e-b0b2-11ea-ad2a-8afcbfbc1b77/media/original/7e49f702-0e73-11ed-b5a6-f6c9d84b23a0')"></div>
                            <div class="${ID}-text">
                                <h2 class="alternate">Earrings</h2>
                                <p class="text-large">With some of the biggest brands and a huge variety of designs, take your pick from cool and contemporary silver earrings to a more traditional collection of gold earrings.</p>
                                <a href="https://www.hsamuel.co.uk/webstore/l/earrings/" class="${ID}-cta primary">Shop now</a>
                            </div>
                        </div>
                        <div class="${ID}-trending">
                            <h2 class="alternate">Trending</h2>
                            <div class="${ID}-brands">${addBrands(categoryTabs["earrings"])}</div>
                        </div>
                    </div>
                </div>

        
                
            </div>
        </div>
    </section>`;
    
    return tabs;
}

export const tabSwitch = (event, tabContent) => {

    let allTabLinks;
    let allTabContent;
    

    allTabContent = document.querySelectorAll(`.${ID}-tabContent`);
    for (let i = 0; i < allTabContent.length; i += 1) {
        allTabContent[i].classList.remove('active');
    }
   
    allTabLinks = document.querySelectorAll(`.${ID}-tab`);
    for (let j = 0; j < allTabLinks.length; j++) {
        allTabLinks[j].classList.remove('active');
    }
  
    document.querySelector(`.${ID}-tabContent[tab-data="${tabContent}"]`).classList.add('active');
    event.currentTarget.classList.add('active');
}