const renderBanner = (ID) => {
  const content = `
  <div class="container-fluid AV095__desktop-hide AV095__mobile--banner">
      <div class="AV095__mobile-header">
          <div class="title">Samples</div>
          <div class="sub-title">Browse our range of samples</div>
      </div>
  </div>
  <div class="container-fluid ">
  <div class="${ID}__sample--banner ">
    <div class="hero-content text-left-desktop text-center-mobile">
        <span class="hero-title">Mix & Match</span>
        <p class="post-title">Not sure what to buy? Start your Avon journey with</p>
        <span class="hero-price">3 for £1 Samples</span>            
    </div>
    <div class="hero-image" style="background-image: url(https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Sample_Header.png?v=1632476002)">
        <img width="0" src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/Sample_Header.png?v=1632476002"  alt="3 for £1 Samples">
    </div>
</div></div>
    `;
  document.querySelectorAll(`header.page-header`).forEach((item) => {
    item.insertAdjacentHTML('afterend', content);
  });
};

export default renderBanner;
