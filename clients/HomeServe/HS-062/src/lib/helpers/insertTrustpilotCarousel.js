const insertTrustpilotCarousel = (id, targetElement) => {
  if (!targetElement) {
    return;
  }

  let trustpilotWidget = `
    <div class="trustpilot-widget ${id}__trustpilotCarousel" data-locale="en-GB" data-template-id="54ad5defc6454f065c28af8b" data-businessunit-id="64b11585032e5461343eaae5" data-style-height="236px" data-style-width="100%" data-theme="light" data-stars="4,5" data-review-languages="en" style="padding-bottom: 3em;">
        <a href="https://uk.trustpilot.com/review/www.homeserve.co.uk" target="_blank" rel="noopener">Trustpilot</a>
    </div>
  `;

  targetElement.insertAdjacentHTML('beforebegin', trustpilotWidget);
};

export default insertTrustpilotCarousel;
