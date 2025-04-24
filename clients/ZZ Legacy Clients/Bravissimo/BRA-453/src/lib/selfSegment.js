import { logMessage } from "../../../../../lib/utils";
import braSVG from "./components/braImg";
import crossBtn from "./components/crossBtn";

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const backSizes = [28, 30, 32, 34, 36, 38, 40];
const cupSizes = [
	"D",
	"DD",
	"E",
	"F",
	"FF",
	"G",
	"GG",
	"H",
	"HH",
	"J",
	"JJ",
	"K",
	"KK",
	"L",
];

const selfSegment = (ID, fireEvent) => {
	const popUpModal = `
    <div id="${ID}_myModal" class="modal">
        <div class="modal-content">
            <div class="${ID}-modal-step-one">
                <div class="${ID}-top-section">
                    ${braSVG()}
                    <div class="${ID}-bra-header">Do you know your size?</div>
                    <div class="${ID}-cross-button">
                        ${crossBtn()}
                    </div>
                </div>
                <div class="${ID}-bottom-section">
                    <div class="${ID}-radio-btn-container">
                        <div style="box-sizing: unset">
                            <input type="radio" id="knownSize" name="bra-size-finder" value="I know my size">
                            <label for="knownSize" class="rad-button">I know my size</label>
                        </div>
                        <div style="box-sizing: unset">
                            <input type="radio" id="noKnownSize" name="bra-size-finder" value="I don't know my size">
                            <label for="noKnownSize" class="rad-button">I don't know my size</label>
                        </div>
                        </div>
                    <button type="button" disabled class="${ID}-radio-next-btn ${ID}-step-one-nex-btn-func">Next</button>
                </div>
            </div>

            <div class="${ID}-modal-step-two-known-size ${ID}-remove-show-modal">
                <div class="${ID}-top-section">
                    ${braSVG()}
                    <div class="${ID}-bra-header">What size are you shopping for today?</div>
                </div>
                <div class="${ID}-bottom-section">
                    <div class="${ID}-bra-size-header"> If you tell us your size we can recommend some bras that other customers bought in your size recently</div>
                    <div class="${ID}-size-recommendation-selectors-parent">
                        <div class="${ID}-recommendation-selectors-child c-results-display__item">
                            <label class="c-results-display__label ${ID}-label-design" for="back-size"><span>Back size</span></label>
                            <div class="c-results-display__options">
                                <select class="c-field-select ${ID}-select-design" id="back-size">
                                ${backSizes
									.map((item) => {
										return `<option value="${item}">${item}</option>`;
									})
									.join("\n")}
                                </select>
                            </div>
                        </div>
                        <div class="${ID}-recommendation-selectors-child c-results-display__item">
                            <label class="c-results-display__label ${ID}-label-design" for="cup-size"><span>Cup size</span></label>
                            <div class="c-results-display__options">
                                <select class="c-field-select ${ID}-select-design" id="cup-size">
                                    ${cupSizes
										.map((item) => {
											return `<option value="${item}">${item}</option>`;
										})
										.join("\n")}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="${ID}-radio-next-btn ${ID}-step-two-see-result-btn-func">SEE RESULTS</button>
                </div>
            </div>

            <div class="${ID}-modal-step-two-no-known-size ${ID}-remove-show-modal">
                <div class="${ID}-top-section">
                    ${braSVG()}
                    <div class="${ID}-bra-header">Let us help you find your size through our trusted online bra fitting guide</div>
                </div>
                <div class="${ID}-bottom-section">
                    <div class="${ID}-step-three-img"></div>
                    <button class="${ID}-radio-next-btn ${ID}-step-two-go-to-guide-btn-func">GO TO GUIDE</button>
                </div>
            </div>
        </div>
    </div>
    `;
	const ifExist = document.getElementById(`${ID}_myModal`);
	if (!ifExist) {
		document
			.querySelector('[id="app"]')
			.insertAdjacentHTML("afterbegin", popUpModal);
	}
	var modal = document.getElementById(`${ID}_myModal`);

	var span = document.getElementsByClassName("close")[0];

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
			setCookie(`${ID}-is-dismissed`, true, 3);
		}
	};

	document
		.querySelector(`.${ID}-cross-button`)
		.addEventListener("click", () => {
			modal.style.display = "none";
			setCookie(`${ID}-is-dismissed`, true, 3);
		});

	var radioValue;
	if (document.querySelector('input[type="radio"]')) {
		document.querySelectorAll('input[type="radio"]').forEach((elem) => {
			elem.addEventListener("change", (e) => {
				radioValue = e.target.id;
				document
					.querySelector(`.${ID}-step-one-nex-btn-func`)
					.removeAttribute("disabled");
			});
		});
	}

	document
		.querySelector(`.${ID}-step-one-nex-btn-func`)
		.addEventListener("click", (e) => {
			if (radioValue == "knownSize") {
				document
					.querySelector(`.${ID}-modal-step-one`)
					.classList.add(`${ID}-remove-show-modal`);
				document
					.querySelector(`.${ID}-modal-step-two-known-size`)
					.classList.remove(`${ID}-remove-show-modal`);
				document
					.querySelector(`.${ID}-modal-step-two-known-size`)
					.classList.add(`${ID}-show-modal`);
			} else {
				document
					.querySelector(`.${ID}-modal-step-one`)
					.classList.add(`${ID}-remove-show-modal`);
				document
					.querySelector(`.${ID}-modal-step-two-no-known-size`)
					.classList.remove(`${ID}-remove-show-modal`);
				document
					.querySelector(`.${ID}-modal-step-two-no-known-size`)
					.classList.add(`${ID}-show-modal`);
			}
		});

	document
		.querySelector(`.${ID}-step-two-go-to-guide-btn-func`)
		.addEventListener("click", (e) => {
			if (radioValue == "noKnownSize") {
				fireEvent("I don't know my size");
			}
			setCookie("modalSubmitted", true, 3);
			window.location.href = "/bra-fitting-guide/";
		});

	document
		.querySelector(`.${ID}-step-two-see-result-btn-func`)
		.addEventListener("click", (e) => {
			fireEvent("I know my size");
			setCookie("modalSubmitted", true, 3);
			const backSize = document.querySelector(`#back-size`).value;
			const cupSize = document.querySelector(`#cup-size`).value;
			localStorage.setItem("backSize", backSize);
			localStorage.setItem("cupSize", cupSize);
			window.location.href = `/shop-by/size/${
				backSize + cupSize
			}-bras/?modalReroute`;
		});
};

export const showBanner = (ID) => {
	const sizeBanner = `
        <section class="${ID}-banner-parent">
            <div class="${ID}-banner-child-img">
                ${braSVG()}
            </div>
            <div class="${ID}-banner-child-shop-size-title">
                <div class="${ID}-size-title">SHOPPING BY SIZE:</div>
                <div class="${ID}-size-number">${
		localStorage.getItem("backSize") + " " + localStorage.getItem("cupSize")
	}</div>
            </div>
            <button class="${ID}-clear-filter-size">CLEAR SIZE</button>
        </section>
        `;
	const insertionPointDOM = document.querySelector(
		"main.c-page #listing-container section.c-results section.c-container div.c-container__body"
	);
	insertionPointDOM?.insertAdjacentHTML("beforeend", sizeBanner);
	document
		.querySelector(`.${ID}-clear-filter-size`)
		?.addEventListener("click", () => {
			window.location.href = "/collections/all-lingerie/";
		});
};

export default selfSegment;
