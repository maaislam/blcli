const imageContainer = ({ contentPos, imageCaption, imageSource, imageText, url }, fireEvent) => {
  document.querySelectorAll('.GCO005_button').forEach((el) => {
    el.closest('.GCO005__valueprop').remove();
  });

  const content = `
    <div class="GCO005__valueprop">
        <div class="GCO005__valueprop--img-container"
            data-img-src="${imageSource}" >
            <img src="${imageSource}" alt="${imageText}" />
            <div class="image-quote">${imageText}</div>
        </div>
        <div class="GCO005__valueprop--caption">${imageCaption}</div>
        <div class="GCO005__valueprop--btn-container">
            <div class="GCO005_button GCO005_popupCta">Learn More</div>
        </div>
    </div>  
    `;

  document.querySelector(contentPos.id).insertAdjacentHTML(contentPos.type, content);
  const newLearnMoreBtn = document.querySelector('.GCO005__valueprop--btn-container>div');

  if (location.pathname === '/en-us/guides/posts/talking-to-customers-about-ach-debit/') {
    const hasLine = document.querySelector('.GCO005__valueprop').previousElementSibling.getAttribute('data-reading-optimized');

    hasLine && (document.querySelector('.GCO005__valueprop').previousElementSibling.style.display = 'none');
  }

  newLearnMoreBtn?.addEventListener('click', (e) => {
    fireEvent('Customer clicked the GCO005 Learn more Button');

    location.href = `https://gocardless.com/${url.includes('en-us') ? 'en-us/' : ''}solutions/learn-more/`;
  });
};

export default imageContainer;
