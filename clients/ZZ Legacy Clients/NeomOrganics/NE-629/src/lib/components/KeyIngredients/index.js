import shared from '../../../../../../../core-files/shared';

export default function KeyIngredients(content) {
  const { ID } = shared;
  const element = document.createElement('div');
  element.classList.add(`${ID}-key-ingredients`);

  element.innerHTML = /* HTML */ `
    <h2>Key Ingredients</h2>
    <div class="splide ${ID}-key-ingredients-slider">
      <div class="splide__track">
        <ul class="splide__list">
          ${content
            .map(
              (c) => /* html */ `
							<li class="splide__slide ${ID}-key-ingredients-slide">
								<div class="${ID}-key-ingredients-slide-image-container">
									<img src="${c.image}" alt="" />
									<img src="${c.mobileImage}" alt="" />
								</div>
								<div class="${ID}-key-ingredients-slide-content-container">
									<h3>${c.heading}</h3>
									${c.subheading ? `<h4>${c.subheading}</h4>` : ''}
									<p>${c.text}</p>
								</div>
							</li>
							`
            )
            .join('')}
        </ul>
      </div>
      <div class="splide__progress">
        <div class="splide__progress__bar"></div>
      </div>
    </div>
  `;

  return element;
}
