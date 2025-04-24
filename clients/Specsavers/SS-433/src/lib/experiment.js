import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	const titles = document.querySelectorAll("h2.h-md");
	let targetBlock;

	for (let i = 0; i < titles.length; i += 1) {
		if (
			titles[i].textContent.toLowerCase().trim() === "why choose specsavers?"
		) {
			if (VARIATION !== "control") {
				titles[i].textContent =
					"Why choose Specsavers Opticians and Audiologists?";
			}
			targetBlock = titles[i].parentElement;
		}
	}

	const ctas = targetBlock.querySelectorAll("a.carousel-cell");

	console.log(ctas);

	ctas.forEach((cta) =>
		cta.addEventListener("click", (e) => {
			e.preventDefault();
			fireEvent(
				`CTA Click (${e.target
					.querySelector("span.cta-text-chevron")
					.textContent.trim()})`
			);
		})
	);
};
