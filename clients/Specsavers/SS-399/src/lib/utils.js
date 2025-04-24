import { fireEvent } from "../../../../../core-files/services";

export function addTracking(element, sectionName, sectionPlace) {
	const cta = element.querySelector('[href="/book/location"]');
	if (cta) {
		cta.addEventListener("click", () => {
			fireEvent(`CTA Clicked (${sectionName})(${sectionPlace})`);
		});
	}

	if (element.classList.contains("sib-accordion")) {
		const items = element.querySelectorAll("a.dev-tool__header");

		if (items) {
			items.forEach((item, index) => {
				item.addEventListener("click", () => {
					fireEvent(`Accordion Interaction (${index + 1})`);
				});
			});
		}
	}

	new IntersectionObserver((i) => {
		if (i[0].isIntersecting) {
			console.log(`In View(${sectionName})(${sectionPlace})`);
			fireEvent(`In View(${sectionName})(${sectionPlace})`);
		}
	}).observe(element);
}
