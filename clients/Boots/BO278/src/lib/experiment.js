/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
	const { ID, VARIATION } = shared;
	setup();

	fireEvent("Conditions Met");

	if (window.usabilla_live) {
		window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
	}

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		if (location.pathname.includes("/sitesearch")) {
			pollerLite(["select#product_listings-sort-by__options"], () => {
				fireEvent("SLP - Sort option element visible");

				const selectWrapper = document.querySelector(
					`.product_listings-filters-container .product_listings-sort-by`
				);

				const selectWrapperObserver = new MutationObserver(
					(mutationList, observer) => {
						const selectOptionContainer = document.querySelector(
							"select#product_listings-sort-by__options"
						);

						if (
							selectOptionContainer &&
							!selectOptionContainer.classList.contains(
								"custom-select"
							)
						) {
							observer.disconnect();
							selectOptionContainer.addEventListener(
								"change",
								(e) => {
									const title = e.target
										.querySelector("option:checked")
										.innerText.trim();
									fireEvent(
										`SLP - Interactions with '${title}'`
									);
								}
							);
							selectOptionContainer.classList.add(
								"custom-select"
							);
							selectWrapperObserver.observe(selectWrapper, {
								attributes: true,
								childList: true,
								subtree: true,
							});
						}
					}
				);

				selectWrapperObserver.observe(selectWrapper, {
					attributes: true,
					childList: true,
					subtree: true,
				});
			});
		} else {
			pollerLite(
				[
					".sorting_view_controls_container .orderByDropdown table.dijit",
				],
				() => {
					const dojoContentPane = document.querySelector(
						".content .dijitContentPane"
					);
					const selectWrapper = document.querySelector(
						".sorting_view_controls_container .orderByDropdown table"
					);
					fireEvent("PLP - Sort option element visible");
					const selectWrapperObserver = new MutationObserver(
						(mutationList, observer) => {
							const selectOptionContainerId =
								selectWrapper?.getAttribute("id");

							const selectOptionContainer =
								document.getElementById(
									selectOptionContainerId + "_dropdown"
								);

							if (
								selectOptionContainer &&
								!selectOptionContainer.classList.contains(
									"custom-select"
								)
							) {
								const allOptions =
									selectOptionContainer.querySelectorAll(
										`table tr`
									);
								allOptions.forEach((option) => {
									option.addEventListener("click", (e) => {
										e.preventDefault();
										const title = option
											.querySelector(
												"td.dijitMenuItemLabel"
											)
											.innerText.trim();

										fireEvent(
											`PLP - Interactions with '${title}'`
										);
									});
								});
								selectOptionContainer.classList.add(
									"custom-select"
								);
							}
						}
					);

					selectWrapperObserver.observe(dojoContentPane, {
						attributes: true,
						childList: true,
						subtree: true,
					});
				}
			);
		}
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	// -----------------------------

	const renderOptionPLP = (selectOptionContainer) => {
		const allOptions = selectOptionContainer.querySelectorAll(`table tr`);
		allOptions.forEach((option) => {
			option.addEventListener("click", (e) => {
				e.preventDefault();
				const title = option
					.querySelector("td.dijitMenuItemLabel")
					.innerText.trim();

				fireEvent(`PLP - Interactions with '${title}'`);
			});
		});

		const thirdOption = selectOptionContainer.querySelector(
			`table tr:nth-child(3)`
		);
		let optionText;

		if (VARIATION == "1") {
			optionText = "Highest % Discount";
		} else {
			optionText = "Biggest Discount (£)";
		}
		const option = `<tr class="dijitReset dijitMenuItem ${ID}-option" data-dojo-attach-point="focusNode" role="option" aria-selected="false" style="user-select: none;">
                                <td class="dijitReset dijitMenuItemLabel" colspan="2" data-dojo-attach-point="containerNode" id="dijit_MenuItem_4_text">${optionText}</td>
                                <td class="dijitReset dijitMenuArrowCell" role="presentation">
                                  <div data-dojo-attach-point="arrowWrapper" style="visibility: hidden">
                                    <img src="/wcsstore/dojo18/dojo/resources/blank.gif" alt="" class="dijitMenuExpand">
                                    <span class="dijitMenuExpandA11y">+</span>
                                  </div>
                                </td>
                              </tr>`;
		thirdOption.insertAdjacentHTML("afterend", option);

		const selectWrapper = document.querySelector(
			".sorting_view_controls_container .orderByDropdown"
		);

		document
			.querySelector(`.${ID}-option`)
			?.addEventListener("mouseover", () => {
				allOptions.forEach((option) => {
					option.classList.remove("dijitMenuItemSelected");
					option.classList.remove("dijitMenuItemFocused");
					option.classList.remove("dijitFocused");
				});
			});
		document
			.querySelector(`.${ID}-option`)
			.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				const title = e.target
					.closest("tr")
					.querySelector("td.dijitMenuItemLabel")
					.innerText.trim();
				fireEvent(`PLP - Interactions with '${title}'`);

				const tooltip = selectWrapper.querySelector(
					`div.${ID}-tooltip`
				);
				if (tooltip) {
					tooltip.classList.add("active");
					setTimeout(() => {
						tooltip.classList.remove("active");
					}, 4000);
				}
			});

		if (!selectWrapper.querySelector(`div.${ID}-tooltip`)) {
			const tooltip = `<div class="tooltip ${ID}-tooltip">
                        <p>Sorry, this action is unavailable</p>
                      </div>`;
			selectWrapper.insertAdjacentHTML("afterbegin", tooltip);
		}
	};
	const renderOptionNewPLP = (selectOptionContainer) => {
		const selectContainerInterval = setInterval(() => {
			const selectContainer = document.querySelector(
				"#dropdown-oct-listers-sort-by-listbox"
			);
			if (
				selectContainer &&
				!selectContainer.querySelector(`.${ID}-option`)
			) {
				clearInterval(selectContainerInterval);
				if (!selectOptionContainer.querySelector(`div.${ID}-tooltip`)) {
					const tooltip = `<div class="tooltip ${ID}-tooltip">
				                <p>Sorry, this action is unavailable</p>
				              </div>`;
					selectOptionContainer.insertAdjacentHTML(
						"afterbegin",
						tooltip
					);
				}
				const allOptions = selectContainer.querySelectorAll(
					".oct-dropdown__container__listbox__option"
				);

				allOptions.forEach((option, index) => {
					if (index > 2) {
						option.setAttribute("tabindex", index + 1);
					}
					option.addEventListener("click", (e) => {
						e.preventDefault();
						const title = option
							.querySelector("span")
							.innerText.trim();

						fireEvent(`PLP - Interactions with '${title}'`);
					});
				});

				const thirdOption = selectContainer.querySelector(
					`.oct-dropdown__container__listbox__option:nth-child(3)`
				);
				let optionText;

				if (VARIATION == "1") {
					optionText = "Highest % Discount";
				} else {
					optionText = "Biggest Discount (£)";
				}
				const option = `<div
								role="option"
								aria-selected="false"
								tabindex="3"
								class="oct-dropdown__container__listbox__option oct-dropdown-option ${ID}-option"
								aria-label="Sort by most relevant"
							>
								<span>${optionText}</span>
							</div>`;

				thirdOption.insertAdjacentHTML("afterend", option);

				document
					.querySelector(`.${ID}-option`)
					.addEventListener("click", (e) => {
						e.preventDefault();
						e.stopPropagation();
						const title = e.target
							.closest(`.${ID}-option`)
							.querySelector("span")
							.innerText.trim();
						fireEvent(`PLP - Interactions with '${title}'`);

						const tooltip = selectOptionContainer.querySelector(
							`div.${ID}-tooltip`
						);
						if (tooltip) {
							tooltip.classList.add("active");
							setTimeout(() => {
								tooltip.classList.remove("active");
							}, 4000);
						}
					});
			}
		}, 50);
	};

	if (location.pathname.includes("/sitesearch")) {
		pollerLite(["select#product_listings-sort-by__options"], () => {
			const selectWrapper = document.querySelector(
				`.product_listings-filters-container .product_listings-sort-by`
			);

			let optionText;
			if (VARIATION == "1") {
				optionText = "Sort by: Highest % Discount";
			} else {
				optionText = "Sort by: Biggest Discount (£)";
			}

			const selectWrapperObserver = new MutationObserver(
				(mutationList, observer) => {
					const selectOptionContainer = document.querySelector(
						"select#product_listings-sort-by__options"
					);

					if (
						selectOptionContainer &&
						!document.getElementById(`customSelect`)
					) {
						observer.disconnect();

						let content = "";
						let selectedValue = "Select an option";
						Array.from(selectOptionContainer.options).forEach(
							(option, index) => {
								let isSelected = option.selected ? true : false;
								if (isSelected) {
									selectedValue = option.textContent;
								}
								content += `<li class="custom-option ${
									isSelected ? "selected" : ""
								}" data-value="${option.value}">${
									option.textContent
								}</li>`;
								if (index == 2) {
									content += `<li class="custom-option not_available" data-value="${optionText}">${optionText}</li>`;
								}
							}
						);

						const customSelectDom = `<div id="customSelect" class="custom-select">
                                      <span>${selectedValue}</span>
                                      <ul class="custom-options">
                                        ${content}
                                      </ul>
                                    </div>`;
						selectWrapper.insertAdjacentHTML(
							"beforeend",
							customSelectDom
						);

						const customSelect =
							document.getElementById(`customSelect`);

						if (!customSelect.querySelector(`div.${ID}-tooltip`)) {
							const tooltip = `<div class="tooltip ${ID}-tooltip">
											<p>Sorry, this action is unavailable</p>
										  </div>`;
							customSelect.insertAdjacentHTML(
								"beforeend",
								tooltip
							);
						}
						customSelect.addEventListener("click", (e) => {
							const target = e.target;

							if (target.closest(".custom-option")) {
								const element =
									target.closest(".custom-option");
								if (
									!element.classList.contains("not_available")
								) {
									const value =
										element.getAttribute("data-value");
									const text = element.innerText.trim();
									selectOptionContainer.value = value;
									customSelect.querySelector(
										"span"
									).textContent = text;
									fireEvent(
										`SLP - Interactions with '${text}'`
									);

									const event = new Event("change", {
										bubbles: true,
									});
									selectOptionContainer.dispatchEvent(event);
								} else {
									const text = element.innerText.trim();
									const tooltip = customSelect.querySelector(
										`div.${ID}-tooltip`
									);
									if (tooltip) {
										tooltip.classList.add("active");
										setTimeout(() => {
											tooltip.classList.remove("active");
										}, 4000);
									}
									fireEvent(
										`SLP - Interactions with '${text}'`
									);
								}
							}

							if (
								customSelect.classList.contains("active") &&
								!target.closest(".custom-option.not_available")
							) {
								customSelect.classList.remove("active");
							} else {
								customSelect.classList.add("active");
							}
						});

						// customSelect
						// 	.querySelectorAll(".custom-option")
						// 	.forEach((item) => {});

						document.body.addEventListener("click", (e) => {
							const target = e.target;
							if (!target.closest("#customSelect")) {
								document
									.getElementById(`customSelect`)
									.classList.remove("active");
							}
						});
						selectWrapperObserver.observe(selectWrapper, {
							attributes: true,
							childList: true,
							subtree: true,
						});
					}
				}
			);

			selectWrapperObserver.observe(selectWrapper, {
				attributes: true,
				childList: true,
				subtree: true,
			});
		});
	} else {
		pollerLite(
			[".sorting_view_controls_container .orderByDropdown table.dijit"],
			() => {
				const dojoContentPane = document.querySelector(
					".content .dijitContentPane"
				);
				const selectWrapper = document.querySelector(
					".sorting_view_controls_container .orderByDropdown table"
				);

				const selectWrapperObserver = new MutationObserver(
					(mutationList, observer) => {
						const selectOptionContainerId =
							selectWrapper?.getAttribute("id");

						const selectOptionContainer = document.getElementById(
							selectOptionContainerId + "_dropdown"
						);

						if (
							selectOptionContainer &&
							!selectOptionContainer.querySelector(
								`table tr.${ID}-option`
							)
						) {
							renderOptionPLP(selectOptionContainer, "PLP");
						}
					}
				);

				selectWrapperObserver.observe(dojoContentPane, {
					attributes: true,
					childList: true,
					subtree: true,
				});
			}
		);
		pollerLite(
			["#dropdown-oct-listers-sort-by .oct-dropdown__container"],
			() => {
				const dojoContentPane = document.querySelector(
					"#dropdown-oct-listers-sort-by .oct-dropdown__container"
				);

				const selectWrapperObserver = new MutationObserver(
					(mutationList, observer) => {
						const selectOptionContainer = document.getElementById(
							"#dropdown-oct-listers-sort-by-listbox"
						);

						renderOptionNewPLP(dojoContentPane, "PLP");
					}
				);

				selectWrapperObserver.observe(dojoContentPane, {
					attributes: true,
					childList: true,
					subtree: true,
				});
			}
		);
	}
};
