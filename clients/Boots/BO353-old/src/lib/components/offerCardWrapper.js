import offerCard from './offerCard';

const offerCardWrapper = (id, data) => {
  const html = `
    <div class="${id}__offerCardWrapper">
        <div class="${id}__offer-filter-buttons">
            <button class="${id}__offer-filter-button" data-test-id="applied">applied</button>
            <button class="${id}__offer-filter-button" data-test-id="missing">missed</button>
        </div>
        <div class="${id}__oct-advantage-card-offers">
            <p class="oct-text oct-text--standard oct-text--size_s"
            data-testid="text">Your Advantage Card offers</p>
            ${data.map((item) => offerCard(id, item)).join('\n')}
        </div>
    </div>
  
  `;
  return html.trim();
};

export default offerCardWrapper;
