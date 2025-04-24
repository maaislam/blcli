const offerBoxCards = (id) => {
    const htmlStr = `
    <div class='${id}__offerBoxCards'>
        <div class="offer-box ${id}__card">
        <div class="offer-container ${id}__plumbingCard">
            <div class="offer-image feature-left">
                <picture>
                    <img src="https://blcro.fra1.digitaloceanspaces.com/WTO-HS-015/boiler-heating-cover.png" class="feature-left" alt="boiler-heating"
                    style="background: url('https://blcro.fra1.digitaloceanspaces.com/WTO-HS-015/boiler-heating-cover.png'); background-size: cover; background-position: center; height: 100%; width: 100%"
                    >
                </picture>
            </div>
            <div class="offer-content">
                <h3>Boiler and heating cover</h3>
                <p>With boiler cover from HomeServe, you'll get peace of mind that if there's a problem at home, we'll help keep your radiators toasty and your water piping hot.</p>
                <a href="/insurance-cover/gas-and-boiler-comparison" class="btn--rounded ${id}__viewBoiler" role="button" aria-label="">View Boiler cover</a>
            </div>
        </div>
        </div>

        <div class="offer-box ${id}__card">
        <div class="offer-container ${id}__plumbingCard">
            <div class="offer-content">
                <h3>Electrical insurance and breakdown cover</h3>
                <p>With cover for wiring, fusebox breakdowns and broken sockets, our Home Experts will help make sure that unexpected electrical problems don't leave you in the dark.
                </p>
                <a href="/insurance-cover/electrical-comparison" class="btn--rounded ${id}__viewElectrical" role="button" aria-label="">View Electrical cover</a>
            </div>
            <div class="offer-image feature-right">
                <picture>
                    <img src="https://blcro.fra1.digitaloceanspaces.com/WTO-HS-015/electrics-category-limited-offer.png" class="feature-right" style="background: url('https://blcro.fra1.digitaloceanspaces.com/WTO-HS-015/electrics-category-limited-offer.png'); background-size: cover; background-position: center; height: 100%; width: 100%" alt="Electrics category">
                </picture>
            </div>
        </div>
        </div>

        <div class="offer-box ${id}__card">
        <div class="offer-container ${id}__plumbingCard">
            <div class="offer-image feature-left">
                <picture>
                    <img src="https://blcro.fra1.digitaloceanspaces.com/WTO-HS-015/plumbing-drainage-cover.png" class="feature-left" alt="plumbing-drainage-cover"
                    style="background: url('https://blcro.fra1.digitaloceanspaces.com/WTO-HS-015/plumbing-drainage-cover.png'); background-size: cover; background-position: center; height: 100%; width: 100%"
                    >
                </picture>
            </div>
            <div class="offer-content">
                <h3>Plumbing & Drainage Cover</h3>
                <p>With cover for your home's pipes, drains, toilets and tanks, you can be confident that plumbing and drainage problems won't stop you in your tracks</p>
                <a href="/insurance-cover/plumbing-and-drainage-comparison" class="btn--rounded ${id}__viewPlumbingDrainage" role="button" aria-label="">View Plumbing cover</a>
            </div>
        </div>
        </div>
    </div>
  `;

  return htmlStr;
}

export default offerBoxCards;