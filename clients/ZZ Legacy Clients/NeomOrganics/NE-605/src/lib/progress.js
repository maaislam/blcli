import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

export default class Progress {
	constructor(
		root,
		heading,
		text,
		cta,
		image,
		value,
		targetValue,
		currency,
		progressText,
		successText,
		instructionText,
		promoCode,
		onSuccess,
		onUnsuccess,
		transitionTime = 500
	) {
		this.heading = heading;
		this.text = text;
		this.cta = cta;
		this.image = image;
		this.value = value;
		this.targetValue = targetValue;
		this.currency = currency;
		this.progressText = progressText;
		this.successText = successText;
		this.instructionText = instructionText;
		this.promoCode = promoCode;
		this.onSuccess = onSuccess;
		this.onUnsuccess = onUnsuccess;
		this.transitionTime = transitionTime;

		this.root = root;
		this._render();
		this._bindResizeObserver();
		this._bindCopyCode();
		this.updateValue(value);
	}

	_render() {
		this.root.insertAdjacentHTML(
			"beforeend",
			`
    <div class="${ID}-progress-bar">
      <div class="${ID}-progress-bar__content">
        ${this.image ? `<img src="${this.image}" alt="" />` : ""}
        <div class="${ID}-progress-bar__content-box">
          <h2 class="${ID}-progress-bar__content-heading">${this.heading}</h2>
          ${
						this.text
							? `<p class="${ID}-progress-bar__content-text">${this.text}</p>`
							: ""
					}
					${
						this.cta
							? `
          <a class="${ID}-progress-bar__content-cta" href="${this.cta.url}">
            ${this.cta.text}
            <span>
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 6"><path d="M4.28508 5.35493c.19683.19136.51086.18915.70497-.00497l1.90248-1.90247a.845.845 0 0 0 0-1.19498L4.99056.35054c-.194-.194-.50819-.19511-.70357-.00249-.19692.19414-.19852.51137-.00358.7075L5.57001 2.35h-5.07c-.27614 0-.5.22386-.5.5s.22386.5.5.5h5.07L4.28005 4.63996c-.19802.19802-.19575.51976.00503.71497Z" fill="#000"/></svg>
						</span>
          </a>
          `
							: ""
					}
        </div>
      </div>
      <div class="${ID}-progress-bar__countdown">
        <p class="${ID}-progress-bar__countdown-progress">
				${this.currency}<span class="${ID}-progress-bar__countdown-text"></span> ${
				this.progressText
			}</p>
				<p class="${ID}-progress-bar__countdown-success">${this.successText}</p>
        <div class="${ID}-progress-bar__countdown-bar">
          <div class="${ID}-progress-bar__countdown-bar-progress"></div>
        </div>
      </div>
      <div class="${ID}-progress-bar__redeem" data-open="false">
				${this.instructionText ? `<p>${this.instructionText}</p>` : ""}
        ${
					this.promoCode
						? `
        <div class="${ID}-progress-bar__redeem-box">
          <div class="${ID}-progress-bar__redeem-code">${this.promoCode}</div>
          <button class="${ID}-progress-bar__redeem-copy">Copy</button>
        </div>
        `
						: ""
				}
      </div>
    </div>
    `
		);
	}

	_bindResizeObserver() {
		const el = this.root.querySelector(`.${ID}-progress-bar`);
		const contentEl = el.querySelector(`.${ID}-progress-bar__content`);
		const contentElImage = contentEl.querySelector("img");

		new ResizeObserver((entries) => {
			if (entries[0]) {
				if (
					entries[0].borderBoxSize[0] &&
					entries[0].borderBoxSize[0].inlineSize < 300
				) {
					contentEl.style.gap = "0";
					contentEl.style.gridTemplateColumns = "minmax(0, 1fr)";
					contentElImage.style.display = "none";
				} else if (entries[0].borderBoxSize.inlineSize < 300) {
					contentEl.style.gap = "0";
					contentEl.style.gridTemplateColumns = "minmax(0, 1fr)";
					contentElImage.style.display = "none";
				} else {
					contentEl.removeAttribute("style");
					contentElImage.removeAttribute("style");
				}
			}
		}).observe(el, {
			box: "border-box",
		});
	}

	_bindCopyCode() {
		if (this.promoCode) {
			const copyCodeEl = this.root.querySelector(
				`.${ID}-progress-bar__redeem-copy`
			);
			const codeEl = this.root.querySelector(
				`.${ID}-progress-bar__redeem-code`
			);

			copyCodeEl.addEventListener("click", ({ target }) => {
				target.textContent = "Copied";
				navigator.clipboard.writeText(codeEl.textContent);

				setTimeout(() => (target.textContent = "Copy"), 1000);
			});
		}
	}

	refillBar(cb) {
		this.emptyBar();

		if (cb) cb();

		setTimeout(() => {
			this.updateValue(this.value);
		}, this.transitionTime);
	}

	emptyBar() {
		const barEl = this.root.querySelector(
			`.${ID}-progress-bar__countdown-bar-progress`
		);

		barEl.style.width = "0%";
	}

	updateValue(val) {
		function normaliseValue(n) {
			return (Math.round(n * 100) / 100).toFixed(2);
		}

		this.value = val;

		const progressEl = this.root.querySelector(
			`.${ID}-progress-bar__countdown-bar-progress`
		);
		const countdownTextEl = this.root.querySelector(
			`.${ID}-progress-bar__countdown-text`
		);
		progressEl.style.width = `${
			Math.floor((this.value / this.targetValue) * 100) < 100
				? Math.floor((this.value / this.targetValue) * 100)
				: 100
		}%`;
		countdownTextEl.textContent = normaliseValue(
			this.targetValue - this.value <= 0 ? 0 : this.targetValue - this.value
		);

		const redeemEl = this.root.querySelector(`.${ID}-progress-bar__redeem`);
		const successEl = this.root.querySelector(
			`.${ID}-progress-bar__countdown-success`
		);
		const countdownEl = this.root.querySelector(
			`.${ID}-progress-bar__countdown-progress`
		);

		if (this.value >= this.targetValue) {
			if (redeemEl.getAttribute("data-open") == "true") {
				return;
			}
			redeemEl.setAttribute("data-open", "hidden");
			setTimeout(() => {
				redeemEl.setAttribute("data-open", "true");
			}, this.transitionTime / 2);
			countdownEl.style.display = "none";
			successEl.style.display = "block";

			if (this.onSuccess) {
				fireEvent("Threshold reached");
				this.onSuccess(this.root.querySelector(`.${ID}-progress-bar`));
			}
		} else {
			redeemEl.setAttribute("data-open", "false");
			countdownEl.style.display = "block";
			successEl.style.display = "none";

			if (this.onUnsuccess) {
				this.onUnsuccess(this.root.querySelector(`.${ID}-progress-bar`));
			}
		}
	}
}
