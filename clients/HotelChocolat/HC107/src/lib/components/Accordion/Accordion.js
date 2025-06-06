import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

class Accordion {
	constructor(el) {
		this.el = el;
		this.summary = el.querySelector("summary");
		this.content = el.querySelector(`.${ID}-accordion__content`);

		this.animation = null;
		this.isClosing = false;
		this.isExpanding = false;
		this.summary.addEventListener("click", (e) => this.onClick(e));
	}

	onClick(e) {
		e.preventDefault();

		this.el.style.overflow = "hidden";
		const heading = this.el.querySelector("summary span.accordion-heading");
		if (this.isClosing || !this.el.open) {
			this.open();
			if (heading) {
				heading.innerHTML = "Menu";
			}
		} else if (this.isExpanding || this.el.open) {
			this.shrink();
			if (heading) {
				heading.innerHTML = "What's in the box?";
			}
		}
	}

	shrink() {
		this.isClosing = true;

		const startHeight = `${this.el.offsetHeight}px`;
		const endHeight = `${this.summary.offsetHeight}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		this.animation = this.el.animate(
			{
				height: [startHeight, endHeight],
			},
			{
				duration: 200,
				easing: "ease",
			}
		);

		this.animation.onfinish = () => this.onAnimationFinish(false);
		this.animation.oncancel = () => (this.isClosing = false);
	}

	open() {
		this.el.style.height = `${this.el.offsetHeight}px`;
		this.el.open = true;
		window.requestAnimationFrame(() => this.expand());
	}

	expand() {
		this.isExpanding = true;
		const startHeight = `${this.el.offsetHeight}px`;
		const endHeight = `${
			this.summary.offsetHeight + this.content.offsetHeight
		}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		this.animation = this.el.animate(
			{
				height: [startHeight, endHeight],
			},
			{
				duration: 200,
				easing: "ease",
			}
		);
		this.animation.onfinish = () => this.onAnimationFinish(true);
		this.animation.oncancel = () => (this.isExpanding = false);
	}

	onAnimationFinish(open) {
		this.el.open = open;
		this.animation = null;
		this.isClosing = false;
		this.isExpanding = false;
		this.el.style.height = this.el.style.overflow = "";
	}
}

export default Accordion;
