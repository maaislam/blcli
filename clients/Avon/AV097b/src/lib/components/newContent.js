import shared from './shared';

const { ID } = shared;
const samplePageUrl = '/collections/sample';

export const promotionSection = `
<section id="${ID}-promotion__section" class="${ID}-promotion">
  <div class="container-fluid">
      <a href="${samplePageUrl}" class="hero-link">
          <div class="hero-image">
           
            
            <img src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Sample_Header.png?v=1632476002"  alt="3 for £1 Samples">
           
              
          </div>
          <div class="hero-content text-left-desktop text-center-mobile">
              <h2 class="hero-title">Mix & Match</h2>
              <p class="post-title">Not sure what to buy? Start your Avon journey with</p>
              <span class="hero-price">3 for £1 Samples</span>
              <button type="button" class="btn btn-hero-white">Shop Samples</button>              
          </div>
      </a>
  </div>
</section>
`;

export const promotionTile = `

<a href="${samplePageUrl}" class="${ID}-promotion__tile">
<div class="img-wrapper">
    <div class=" tile-img img-fluid ls-is-cached lazyloaded"></div>
</div>
<span class="stack2">Samples</span>
</a>

`;
