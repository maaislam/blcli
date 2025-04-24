import shared from '../../../../../../../core-files/shared';

export default function Banner(image, content) {
  const { ID } = shared;
  const element = document.createElement('div');
  element.classList.add(`${ID}-banner`);
  element.style.backgroundImage = `url(${image})`;

  element.innerHTML = /* html */ `
	<div class="splide" role="group">
		<div class="splide__track">
			<ul class="splide__list">
			${content
        .map(
          (c) => /* html */ `
				<li class="splide__slide">
					<p><span>${c.main}</span> ${c.sub}</p>
				</li>`
        )
        .join('')}
			</ul>
		</div>
	</div>	
	`;

  return element;
}
