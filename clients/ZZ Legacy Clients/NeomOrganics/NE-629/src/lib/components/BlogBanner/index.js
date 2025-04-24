import shared from '../../../../../../../core-files/shared';

export default function Grid(image, title, subtitle, link) {
  const { ID } = shared;
  const element = document.createElement('div');
  element.classList.add(`${ID}-blog-banner`);
  element.style.backgroundImage = `url(${image})`;

  element.innerHTML = /* html */ `
	<div class="${ID}-blog-banner-content">
		<h2>${title}</h2>
		<p>${subtitle}</p>
		<div class="${ID}-blog-banner-content-cta-container">
			<a href="${link}" class="button is-black is-size-9 is-uppercase is-lspaced has-text-weight-semibold">Read more</a>
			<a href="/blogs/wellbeing" class="button is-black is-size-9 is-uppercase is-lspaced has-text-weight-semibold">Wellbeing blog</a>
		</div>
	</div>
	`;

  return element;
}
