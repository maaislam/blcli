import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import smoothscroll from "smoothscroll-polyfill";

const { ID } = shared;

smoothscroll.polyfill();
export default class Accordion {
	constructor(el) {
		this.el = el;
		this.summary = el.querySelector("summary");
		this.content = el.querySelector(`.${ID}-set-dropdown__content`);

		this.animation = null;
		this.isClosing = false;
		this.isExpanding = false;
		this.summary.addEventListener("click", (e) => this.onClick(e));
	}

	onClick(e) {
		e.preventDefault();

		this.el.style.overflow = "hidden";
		if (this.isClosing || !this.el.open) {
			this.open();
			fireEvent("Expanded");
		} else if (this.isExpanding || this.el.open) {
			this.shrink();
			fireEvent("Minimised");
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
				duration: 250,
				easing: "ease",
			}
		);

		this.animation.onfinish = () => {
			this.onAnimationFinish(false);
			// Scroll set list to top on close
			this.content.querySelector(":scope > ul").scroll({ top: 0 });
		};
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
		const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

		if (this.animation) {
			this.animation.cancel();
		}

		this.animation = this.el.animate(
			{
				height: [startHeight, endHeight],
			},
			{
				duration: 250,
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
