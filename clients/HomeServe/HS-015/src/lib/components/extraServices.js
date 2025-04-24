import { evChargerIcon } from "../assets/svg";

const extraServices = (id) => {
    const htmlStr = `
    <div class="${id}__extraServicesSection page page--section products-services">
        <div class="row">
            <div class="page page--section">
                <div class="col-xs-10 col-xs-push-1 ${id}__cardsWrapper">
                    <h2>Looking for something extra?</h2>
                    <div class="grid grid-33x3 grid-offer-services-3 grid-offer-services-3">
                        <div class="promo-box">
                            <i class="icon-hs-home text-primary icon-hs-4x" alt="" title=""></i>
                            <h3>Home accident cover</h3>
                            <p class="blockBody">Cover to help with the unexpected costs of accidents in your home or garden</p>
                            <a href="/insurance/home-accident-cover" class="btn--rounded" role="button"
                            >View cover</a>
                        </div>
                        <div class="promo-box">
                            <i class="icon-hs-repair text-primary icon-hs-4x" alt="" title=""></i>
                            <h3>Repairs and services</h3>
                            <p class="blockBody">From one-off home repairs to boiler services, you can count on us</p>
                            <a href="/repairs" class="btn--rounded" role="button"
                            >Pick your repair</a>
                        </div>
                        <div class="promo-box">
                            <span>${evChargerIcon}</span>                      
                            <h3>EV charger installation</h3>
                            <p class="blockBody">Step into a more sustainable and cost effective future, from the comfort of your own home</p>
                            <a href="/ev-charger" class="btn--rounded" role="button"
                            >View EV charger installation</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return htmlStr;
};
export default extraServices;
