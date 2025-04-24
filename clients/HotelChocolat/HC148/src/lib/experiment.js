import {
	setup,
	fireEvent,
	newEvents,
} from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
	const { ID, VARIATION } = shared;
	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	newEvents.property = "G-B37NQR1RWZ";
	//------------

	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	if (location.pathname.includes("uk/checkout/shipping")) {
		fireEvent("User progresses to delivery and gifting");
	}

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		const loginForm = document.querySelector(
			".login-intercept.checkout .login-box.welcome-back form"
		);
		const registerForm = document.querySelector(
			".login-intercept.checkout .login-box.create-account form"
		);

		loginForm
			.querySelector('button[type="submit"]')
			.addEventListener("click", (e) => {
				fireEvent("User clicks to sign in");
			});

		registerForm
			.querySelector('button[type="submit"]')
			.addEventListener("click", (e) => {
				fireEvent("User clicks to create an account");
			});

		const resetPass = loginForm.querySelector(`#password-reset`);
		if (resetPass) {
			resetPass.addEventListener("click", (e) => {
				fireEvent("User clicks to reset their password");
			});
		}

		const formError = document.querySelector(".error-form");
		if (
			formError &&
			formError.textContent.trim().includes("match our records")
		) {
			fireEvent("User sees an error message");
		}

		let loginErrorFired = false;
		let registerErrorFired = false;
		const loginFormObserver = new MutationObserver(
			(mutationsList, observer) => {
				for (let mutation of mutationsList) {
					if (
						mutation.type === "childList" &&
						mutation.target.matches("span.error")
					) {
						if (
							mutation.target.textContent
								.trim()
								.includes("email address") &&
							!mutation.target
								.getAttribute("style")
								.includes("none") &&
							!loginErrorFired
						) {
							fireEvent("User sees an error message");
							loginErrorFired = true;
						}
					}
				}
			}
		);

		const registerFormObserver = new MutationObserver(
			(mutationsList, observer) => {
				for (let mutation of mutationsList) {
					if (
						mutation.type === "childList" &&
						mutation.target.matches("span.error") &&
						!registerErrorFired
					) {
						if (
							mutation.target.textContent
								.trim()
								.includes("email address") &&
							!mutation.target
								.getAttribute("style")
								.includes("none")
						) {
							fireEvent("User sees an error message");
							registerErrorFired = true;
						}
					}
				}
			}
		);

		loginFormObserver.observe(loginForm, {
			childList: true,
			subtree: true,
			attributes: false,
		});
		registerFormObserver.observe(registerForm, {
			childList: true,
			subtree: true,
			attributes: false,
		});
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	pollerLite([`.login-intercept.checkout`], () => {
		const loginIntercept = document.querySelector(
			".login-intercept.checkout"
		);
		// ##################### //
		// MAIN DOM STRUCTURE
		// ##################### //

		const dom = `
					<div class="${ID}-simplified-checkout__wrapper">
						<div class="${ID}-simplified-checkout__inner">

							<div class="guest-checkout__content active">
							<div class="simplified-checkout__header">
								<h3>Guest checkout</h3>
								<p>You can create an account later.</p>
							</div>
							<div class="simplified-checkout__form">
							</div>
							</div>

							<div class="signInUp-checkout__content">
							<div class="simplified-checkout__header">
								<h3>Sign in or create an account</h3>
								<p>Checkout faster with your saved details.</p>
							</div>
							<div class="simplified-checkout__form">
								<div class="login-form active">
								
								</div>
								<div class="register-form">
								
								</div>
							</div>
							</div>
						</div>
					</div>`;

		loginIntercept.insertAdjacentHTML("afterend", dom);

		// ##################### //
		// GUEST FORM STRUCTURE
		// ##################### //

		const guestForm = loginIntercept.querySelector(".login-box form");
		guestForm.classList.add(
			"guest-checkout__form",
			"clearfix",
			"pre-validate",
			"wait-for-input"
		);

		const guestFormFields = `
			<label for="guest_email" class="required">Email</label>
			<div class="field-wrapper">
			<input class="input-text email-input email required valid" type="email" id="guest_email" value="" maxlength="100" autocapitalize="off" autocorrect="off" autocomplete="email" aria-required="true" aria-describedby="guest_email-error" aria-invalid="false" placeholder="example@example.com">
			</div>
			<span id="guest_email-error" class="error error-msg" style="display: none;"></span>
			<p class="email-error">
				<span class="info-icon">
					<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.7 10.5538H9.3V12.1538H7.7V10.5538ZM7.7 4.15381H9.3V8.95381H7.7V4.15381ZM8.492 0.153809C4.076 0.153809 0.5 3.73781 0.5 8.15381C0.5 12.5698 4.076 16.1538 8.492 16.1538C12.916 16.1538 16.5 12.5698 16.5 8.15381C16.5 3.73781 12.916 0.153809 8.492 0.153809ZM8.5 14.5538C4.964 14.5538 2.1 11.6898 2.1 8.15381C2.1 4.61781 4.964 1.75381 8.5 1.75381C12.036 1.75381 14.9 4.61781 14.9 8.15381C14.9 11.6898 12.036 14.5538 8.5 14.5538Z" fill="#BC0031"/>
					</svg>
				</span>
				<span class="error-massage">Sorry, your email doesn’t match the format example@email.com</span> 
			</p>
			<p class="massage">We’ll use your email to send you order updates.</p>
			`;

		guestForm.insertAdjacentHTML("afterbegin", guestFormFields);
		guestForm.querySelector('button[type="submit"] span').textContent =
			"Continue";

		const guestSimplified = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .guest-checkout__content .simplified-checkout__form`
		);

		guestSimplified.appendChild(guestForm);

		// ##################### //
		// LOGIN FORM STRUCTURE
		// ##################### //

		const loginForm = loginIntercept.querySelector(
			".login-box.welcome-back form"
		);

		const loginSimplified = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content .login-form`
		);

		loginForm.querySelectorAll("label").forEach((label) => {
			label.classList.remove("visually-hidden");
			const labelText = label.querySelector("span");
			if (labelText.textContent.trim().toLowerCase().includes("email")) {
				labelText.textContent = "Email";
				label.querySelector("span.required-indicator")?.remove();
			} else if (
				labelText.textContent.trim().toLowerCase().includes("password")
			) {
				labelText.textContent = "Password";
				label.querySelector("span.required-indicator")?.remove();
			}
		});
		const emailInput = loginForm.querySelector("input.email");
		const passwordInput = loginForm.querySelector("input.password-input");
		emailInput.setAttribute("placeholder", "example@example.com");
		passwordInput.setAttribute("placeholder", "******");

		const passFeildWrapper = passwordInput.closest(".field-wrapper");
		passFeildWrapper.classList.add("password-field-wrapper");

		const emailFeildWrapper = emailInput.closest(".field-wrapper");
		emailFeildWrapper.classList.add("email-field-wrapper");

		passFeildWrapper.insertAdjacentHTML(
			"beforeend",
			`<span class="eye-icon"><svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M8.16671 1.48714C9.39253 1.48307 10.5946 1.825 11.6348 2.47363C12.675 3.12225 13.511 4.05125 14.0467 5.15381C12.9467 7.40048 10.7 8.82048 8.16671 8.82048C5.63337 8.82048 3.38671 7.40048 2.28671 5.15381C2.82245 4.05125 3.65846 3.12225 4.69863 2.47363C5.73879 1.825 6.94088 1.48307 8.16671 1.48714ZM8.16671 0.153809C4.83337 0.153809 1.98671 2.22714 0.833374 5.15381C1.98671 8.08048 4.83337 10.1538 8.16671 10.1538C11.5 10.1538 14.3467 8.08048 15.5 5.15381C14.3467 2.22714 11.5 0.153809 8.16671 0.153809ZM8.16671 3.48714C8.60874 3.48714 9.03266 3.66274 9.34522 3.9753C9.65778 4.28786 9.83337 4.71178 9.83337 5.15381C9.83337 5.59584 9.65778 6.01976 9.34522 6.33232C9.03266 6.64488 8.60874 6.82048 8.16671 6.82048C7.72468 6.82048 7.30076 6.64488 6.9882 6.33232C6.67564 6.01976 6.50004 5.59584 6.50004 5.15381C6.50004 4.71178 6.67564 4.28786 6.9882 3.9753C7.30076 3.66274 7.72468 3.48714 8.16671 3.48714ZM8.16671 2.15381C6.51337 2.15381 5.16671 3.50048 5.16671 5.15381C5.16671 6.80714 6.51337 8.15381 8.16671 8.15381C9.82004 8.15381 11.1667 6.80714 11.1667 5.15381C11.1667 3.50048 9.82004 2.15381 8.16671 2.15381Z" fill="#7f7f7f"/>
		</svg></span>`
		);

		emailFeildWrapper.insertAdjacentHTML(
			"afterend",
			`<p class="massage">We’ll use your email to send you order updates.</p>`
		);
		emailFeildWrapper.insertAdjacentHTML(
			"afterend",
			`<p class="email-error">
				<span class="info-icon">
					<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.7 10.5538H9.3V12.1538H7.7V10.5538ZM7.7 4.15381H9.3V8.95381H7.7V4.15381ZM8.492 0.153809C4.076 0.153809 0.5 3.73781 0.5 8.15381C0.5 12.5698 4.076 16.1538 8.492 16.1538C12.916 16.1538 16.5 12.5698 16.5 8.15381C16.5 3.73781 12.916 0.153809 8.492 0.153809ZM8.5 14.5538C4.964 14.5538 2.1 11.6898 2.1 8.15381C2.1 4.61781 4.964 1.75381 8.5 1.75381C12.036 1.75381 14.9 4.61781 14.9 8.15381C14.9 11.6898 12.036 14.5538 8.5 14.5538Z" fill="#BC0031"/>
					</svg>
				</span>
				<span class="error-massage">Sorry, your email doesn’t match the format example@email.com</span> 
			</p>`
		);

		passFeildWrapper.insertAdjacentHTML(
			"afterend",
			`<p class="global-from-error">
				<span class="info-icon">
					<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.7 10.5538H9.3V12.1538H7.7V10.5538ZM7.7 4.15381H9.3V8.95381H7.7V4.15381ZM8.492 0.153809C4.076 0.153809 0.5 3.73781 0.5 8.15381C0.5 12.5698 4.076 16.1538 8.492 16.1538C12.916 16.1538 16.5 12.5698 16.5 8.15381C16.5 3.73781 12.916 0.153809 8.492 0.153809ZM8.5 14.5538C4.964 14.5538 2.1 11.6898 2.1 8.15381C2.1 4.61781 4.964 1.75381 8.5 1.75381C12.036 1.75381 14.9 4.61781 14.9 8.15381C14.9 11.6898 12.036 14.5538 8.5 14.5538Z" fill="#BC0031"/>
					</svg>
				</span>
				<span class="error-massage">Sorry, your email or password is incorrect.</span> 
			</p>`
		);

		const resetPass = loginForm.querySelector("#password-reset");
		resetPass.textContent = "Need help? Forgotten your password?";
		resetPass.setAttribute("title", "Reset your password");

		loginForm
			.querySelector(".form-row-button")
			.prepend(loginForm.querySelector("#password-reset"));

		const notGotacDiv = document.createElement("div");
		notGotacDiv.classList.add("not-gotac-div");
		notGotacDiv.insertAdjacentHTML(
			"afterbegin",
			`<span>Don’t have an account? </span>`
		);
		const notGotAnAccount = document.createElement("span");
		notGotAnAccount.classList.add("not-got-an-account");
		notGotAnAccount.textContent = "Create an account";
		notGotacDiv.appendChild(notGotAnAccount);
		loginForm.querySelector(".form-row-button").appendChild(notGotacDiv);

		const simplifiedLoginForm = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content .simplified-checkout__form .login-form`
		);

		const simplifiedRegisterForm = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content .simplified-checkout__form .register-form`
		);

		const registerText = `Register now for faster checkout and easier order tracking.`;
		const loginText = `Checkout faster with your saved details.`;
		const registerTextEl = document.querySelector(
			`.signInUp-checkout__content .simplified-checkout__header p`
		);
		notGotAnAccount.addEventListener("click", (e) => {
			e.preventDefault();
			simplifiedLoginForm.classList.remove("active");
			simplifiedRegisterForm.classList.add("active");
			registerTextEl.textContent = registerText;
		});

		loginSimplified.appendChild(loginForm);

		// ##################### //
		// REGISTER FORM STRUCTURE
		// ##################### //

		const registerForm = loginIntercept.querySelector(
			".login-box.create-account form"
		);

		const registerSimplified = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content .register-form`
		);

		registerForm.querySelectorAll("label").forEach((label) => {
			label.classList.remove("visually-hidden");
			const labelText = label.querySelector("span");
			if (labelText.textContent.trim().toLowerCase().includes("email")) {
				labelText.textContent = "Email";
				label.querySelector("span.required-indicator")?.remove();
			}
		});
		registerForm
			.querySelector('button[type="submit"]')
			.removeAttribute("disabled");
		registerForm.querySelector('button[type="submit"] span').textContent =
			"Create an account";
		const emailInputRegister = registerForm.querySelector("input.email");
		const emailInputRegisterWraper =
			emailInputRegister.closest(".field-wrapper");
		emailInputRegister.setAttribute("placeholder", "example@example.com");
		emailInputRegisterWraper.insertAdjacentHTML(
			"afterend",
			`<p class="massage">We’ll use your email to send you order updates.</p>`
		);
		emailInputRegisterWraper.insertAdjacentHTML(
			"afterend",
			`<p class="email-error">
				<span class="info-icon">
					<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.7 10.5538H9.3V12.1538H7.7V10.5538ZM7.7 4.15381H9.3V8.95381H7.7V4.15381ZM8.492 0.153809C4.076 0.153809 0.5 3.73781 0.5 8.15381C0.5 12.5698 4.076 16.1538 8.492 16.1538C12.916 16.1538 16.5 12.5698 16.5 8.15381C16.5 3.73781 12.916 0.153809 8.492 0.153809ZM8.5 14.5538C4.964 14.5538 2.1 11.6898 2.1 8.15381C2.1 4.61781 4.964 1.75381 8.5 1.75381C12.036 1.75381 14.9 4.61781 14.9 8.15381C14.9 11.6898 12.036 14.5538 8.5 14.5538Z" fill="#BC0031"/>
					</svg>
				</span>
				<span class="error-massage">Sorry, your email doesn’t match the format example@email.com</span> 
			</p>`
		);

		const gotacDiv = document.createElement("div");
		gotacDiv.classList.add("gotac-div");
		gotacDiv.insertAdjacentHTML(
			"afterbegin",
			`<span>Got an account? </span>`
		);
		const gotAnAccount = document.createElement("span");
		gotAnAccount.classList.add("got-an-account");
		gotAnAccount.textContent = "Sign in";
		gotacDiv.appendChild(gotAnAccount);
		gotacDiv.insertAdjacentHTML("beforeend", ` <span>instead</span>`);
		registerForm.querySelector(".form-row-button").appendChild(gotacDiv);

		gotAnAccount.addEventListener("click", (e) => {
			e.preventDefault();
			simplifiedLoginForm.classList.add("active");
			simplifiedRegisterForm.classList.remove("active");
			registerTextEl.textContent = loginText;
		});
		registerSimplified.appendChild(registerForm);
	});

	// ##################### //
	// FUNCTIONALITY
	// ##################### //
	pollerLite([`.${ID}-simplified-checkout__wrapper`], () => {
		const simplifiedHeaders = document.querySelectorAll(
			`.${ID}-simplified-checkout__inner .simplified-checkout__header`
		);

		simplifiedHeaders.forEach((header) => {
			header.addEventListener("click", (e) => {
				e.preventDefault();

				if (!header.parentNode.classList.contains("active")) {
					simplifiedHeaders.forEach((header) => {
						header.parentNode.classList.remove("active");
					});
					header.parentNode.classList.add("active");

					if (header.closest(".guest-checkout__content")) {
						fireEvent("User clicks back to guest checkout");
					}
				}
			});
		});
	});

	// ##################### //
	// Observer
	// ##################### //

	const formError = document.querySelector(".error-form");
	if (
		formError &&
		formError.textContent.trim().includes("match our records")
	) {
		formError
			.closest("form")
			.querySelector(".global-from-error")
			.classList.add("active");
		document
			.querySelector(
				`.${ID}-simplified-checkout__wrapper .guest-checkout__content`
			)
			.classList.remove("active");
		document
			.querySelector(
				`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content`
			)
			.classList.add("active");
		fireEvent("User sees an error message");
	}

	let loginErrorFired = false;
	let registerErrorFired = false;
	let guestErrorFired = false;

	pollerLite([`.${ID}-simplified-checkout__wrapper`], () => {
		const formObserver = new MutationObserver((mutationsList, observer) => {
			for (let mutation of mutationsList) {
				if (
					mutation.type === "childList" &&
					mutation.target.matches("span.error")
				) {
					if (
						mutation.target.textContent
							.trim()
							.includes("email address") &&
						mutation.target.getAttribute("style").includes("inline")
					) {
						mutation.target
							.closest("form")
							.querySelector(".email-error")
							.classList.add("active");

						if (
							mutation.target.closest(
								`.${ID}-simplified-checkout__wrapper .guest-checkout__content form`
							)
						) {
							if (!guestErrorFired) {
								fireEvent("User sees an error message");
								guestErrorFired = true;
							}
						} else if (
							mutation.target.closest(
								`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content .login-form form`
							)
						) {
							if (!loginErrorFired) {
								fireEvent("User sees an error message");
								loginErrorFired = true;
							}
						} else if (
							mutation.target.closest(
								`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content .register-form form`
							)
						) {
							if (!registerErrorFired) {
								fireEvent("User sees an error message");
								registerErrorFired = true;
							}
						}
					}
				}
			}
		});

		const guestForm = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .guest-checkout__content form`
		);
		const loginForm = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content .login-form form`
		);
		const registerForm = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .signInUp-checkout__content .register-form form`
		);

		formObserver.observe(guestForm, {
			childList: true,
			subtree: true,
			attributes: false,
		});
		formObserver.observe(loginForm, {
			childList: true,
			subtree: true,
			attributes: false,
		});
		formObserver.observe(registerForm, {
			childList: true,
			subtree: true,
			attributes: false,
		});

		const allEmailInputs = document.querySelectorAll(
			`.${ID}-simplified-checkout__wrapper input.email-input`
		);
		allEmailInputs.forEach((input) => {
			input.addEventListener("blur", (e) => {
				if (input.classList.contains("valid") && input.value !== "") {
					input.closest(".field-wrapper").classList.add("green_bg");
					input.classList.add("green_bg");
					input
						.closest("form")
						.querySelector(".email-error")
						.classList.remove("active");
				} else {
					input.classList.remove("green_bg");
					input
						.closest(".field-wrapper")
						.classList.remove("green_bg");
				}
			});
		});

		const allPasswordInputs = document.querySelectorAll(
			`.${ID}-simplified-checkout__wrapper input.password-input`
		);
		allPasswordInputs.forEach((input) => {
			input.addEventListener("blur", (e) => {
				if (input.value !== "") {
					input.classList.add("green_bg");
				} else {
					input.classList.remove("green_bg");
				}
			});
		});
		const allEmailFieldWrapper = document.querySelectorAll(
			`.${ID}-simplified-checkout__wrapper .field-wrapper`
		);
		allEmailFieldWrapper.forEach((wrapper) => {
			if (wrapper.querySelector("input.email-input")) {
				wrapper.insertAdjacentHTML(
					"beforeend",
					`<span class="green-check"><svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.5 8.65381L5.5 12.6538L16.5 1.65381" stroke="#118F40" stroke-width="2"/>
				</svg></span>`
				);
			}
		});

		const passFeildWrapper = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .login-form .password-field-wrapper span.eye-icon`
		);
		if (passFeildWrapper) {
			passFeildWrapper.addEventListener("click", (e) => {
				const input = passFeildWrapper
					.closest(".field-wrapper")
					.querySelector("input.password-input");
				if (input.type === "password") {
					input.type = "text";
					passFeildWrapper.classList.add("active");
				} else {
					input.type = "password";
					passFeildWrapper.classList.remove("active");
				}
			});
		}

		const guestFormSubmit = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .guest-checkout__content form`
		);
		guestFormSubmit.addEventListener("submit", (e) => {
			if (
				!guestFormSubmit
					.querySelector(".email-input")
					.classList.contains("error")
			) {
				const value =
					guestFormSubmit.querySelector(".email-input").value;
				localStorage.setItem(`${ID}-guestEmail`, value);
			}
		});

		const modalChange = () => {
			const modal = document.querySelector(
				".ui-dialog.forgot-password-dialog"
			);

			const modalInterval = setInterval(() => {
				if (
					modal.querySelector(".ui-dialog-content p") &&
					modal.querySelector(
						".ui-dialog-content form input.input-text"
					)
				) {
					clearInterval(modalInterval);
					const modalTitle = modal.querySelector(
						".ui-dialog-titlebar"
					);

					modalTitle.querySelector(
						"span.ui-dialog-title"
					).textContent = `Reset your password`;

					const modalCloseButton =
						modalTitle.querySelector("button.ui-button");
					modalCloseButton.innerHTML = "";
					modalCloseButton.insertAdjacentHTML(
						"afterbegin",
						`<span class="close-icon">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.1475 0.275425C1.23458 0.188119 1.33804 0.118851 1.45193 0.071589C1.56583 0.024327 1.68793 0 1.81125 0C1.93456 0 2.05666 0.024327 2.17056 0.071589C2.28446 0.118851 2.38791 0.188119 2.475 0.275425L7.43624 5.23855L12.3975 0.275425C12.4847 0.18826 12.5881 0.119117 12.702 0.071944C12.8159 0.0247707 12.938 0.000490844 13.0612 0.000490844C13.1845 0.000490844 13.3066 0.0247707 13.4205 0.071944C13.5343 0.119117 13.6378 0.18826 13.725 0.275425C13.8122 0.36259 13.8813 0.46607 13.9285 0.579956C13.9756 0.693843 13.9999 0.815906 13.9999 0.939175C13.9999 1.06245 13.9756 1.18451 13.9285 1.29839C13.8813 1.41228 13.8122 1.51576 13.725 1.60293L8.76187 6.56418L13.725 11.5254C13.8122 11.6126 13.8813 11.7161 13.9285 11.83C13.9756 11.9438 13.9999 12.0659 13.9999 12.1892C13.9999 12.3124 13.9756 12.4345 13.9285 12.5484C13.8813 12.6623 13.8122 12.7658 13.725 12.8529C13.6378 12.9401 13.5343 13.0092 13.4205 13.0564C13.3066 13.1036 13.1845 13.1279 13.0612 13.1279C12.938 13.1279 12.8159 13.1036 12.702 13.0564C12.5881 13.0092 12.4847 12.9401 12.3975 12.8529L7.43624 7.8898L2.475 12.8529C2.38783 12.9401 2.28435 13.0092 2.17046 13.0564C2.05658 13.1036 1.93452 13.1279 1.81125 13.1279C1.68798 13.1279 1.56591 13.1036 1.45203 13.0564C1.33814 13.0092 1.23466 12.9401 1.1475 12.8529C1.06033 12.7658 0.991188 12.6623 0.944014 12.5484C0.896841 12.4345 0.872561 12.3124 0.872561 12.1892C0.872561 12.0659 0.896841 11.9438 0.944014 11.83C0.991188 11.7161 1.06033 11.6126 1.1475 11.5254L6.11062 6.56418L1.1475 1.60293C1.06019 1.51584 0.990921 1.41239 0.943659 1.29849C0.896397 1.18459 0.87207 1.06249 0.87207 0.939175C0.87207 0.815862 0.896397 0.693759 0.943659 0.579862C0.990921 0.465965 1.06019 0.362511 1.1475 0.275425Z" fill="#252525"/>
							</svg>
						</span>`
					);

					if (modal.querySelector(".ui-dialog-content p")) {
						modal.querySelector(
							".ui-dialog-content p"
						).textContent = `Confirm your email below and we’ll send you a link to reset your password.`;
					}
					modal.querySelector("button[type='submit']").textContent =
						"Send email";
					const label = modal.querySelector(
						".ui-dialog-content form label"
					);

					const input = modal.querySelector(
						".ui-dialog-content form input.input-text"
					);
					input.setAttribute("placeholder", "example@example.com");

					label.classList.remove("visually-hidden");
					label.querySelector("span.required-indicator").remove();
					label.querySelector("span").textContent = "Email";

					const modalObserver = new MutationObserver(
						(mutationsList, observer) => {
							setTimeout(() => {
								for (let mutation of mutationsList) {
									if (
										mutation.type === "childList" &&
										!modal.querySelector(".email-error")
									) {
										observer.disconnect();
										if (
											!modal
												.querySelector(
													".ui-dialog-content p"
												)
												.textContent.trim()
												.includes("with instructions")
										) {
											modal.querySelector(
												".ui-dialog-content p"
											).textContent = `Confirm your email below and we’ll send you a link to reset your password.`;
											const label = modal.querySelector(
												".ui-dialog-content form label"
											);

											const input = modal.querySelector(
												".ui-dialog-content form input.input-text"
											);
											input.setAttribute(
												"placeholder",
												"example@example.com"
											);
											modal.querySelector(
												"button[type='submit']"
											).textContent = "Send email";
											label.classList.remove(
												"visually-hidden"
											);
											label
												.querySelector(
													"span.required-indicator"
												)
												?.remove();
											label.querySelector(
												"span"
											).textContent = "Email";

											const errorMessage = modal
												.querySelector(".form-caption")
												.textContent.trim();

											if (errorMessage) {
												modal
													.querySelector(".form-row")
													.insertAdjacentHTML(
														"beforeend",
														`<p class="email-error">
													<span class="info-icon">
														<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M7.7 10.5538H9.3V12.1538H7.7V10.5538ZM7.7 4.15381H9.3V8.95381H7.7V4.15381ZM8.492 0.153809C4.076 0.153809 0.5 3.73781 0.5 8.15381C0.5 12.5698 4.076 16.1538 8.492 16.1538C12.916 16.1538 16.5 12.5698 16.5 8.15381C16.5 3.73781 12.916 0.153809 8.492 0.153809ZM8.5 14.5538C4.964 14.5538 2.1 11.6898 2.1 8.15381C2.1 4.61781 4.964 1.75381 8.5 1.75381C12.036 1.75381 14.9 4.61781 14.9 8.15381C14.9 11.6898 12.036 14.5538 8.5 14.5538Z" fill="#BC0031"/>
														</svg>
													</span>
													<span class="error-msg">${errorMessage}</span> 
												</p>`
													);
												modal
													.querySelector(
														".row-inline.error"
													)
													?.classList.remove("error");
											}
										}
										modalObserver.observe(modal, {
											childList: true,
											subtree: true,
											attributes: false,
										});
									}
								}
							}, 500);
						}
					);

					modalObserver.observe(modal, {
						childList: true,
						subtree: true,
						attributes: false,
					});
				}
			}, 500);
		};

		const resetPass = document.querySelector(
			`.${ID}-simplified-checkout__wrapper .login-form #password-reset`
		);
		if (resetPass) {
			resetPass.addEventListener("click", (e) => {
				fireEvent("User clicks to reset their password");
				const modal = document.querySelector(
					".ui-dialog.forgot-password-dialog"
				);

				if (modal) {
					modalChange();
				} else {
					pollerLite([".ui-dialog.forgot-password-dialog"], () => {
						modalChange();
					});
				}
			});
		}

		loginForm
			.querySelector("button[type='submit']")
			.addEventListener("click", (e) => {
				fireEvent("User clicks to sign in");
			});
		registerForm
			.querySelector("button[type='submit']")
			.addEventListener("click", (e) => {
				fireEvent("User clicks to create an account");
			});
	});

	if (location.href.includes("/uk/checkout")) {
		pollerLite([".new-customer form#RegistrationForm"], () => {
			const emailInput = document.querySelector(
				".new-customer form#RegistrationForm input.email"
			);
			if (localStorage.getItem(`${ID}-guestEmail`)) {
				emailInput.value = localStorage.getItem(`${ID}-guestEmail`);
			}
		});

		pollerLite([".login-intercept.checkout"], () => {
			const securityIcons = document.querySelector(
				"#payments-and-security-icon"
			);
			const footer = document.querySelector("footer#checkout-footer");

			let securityIconsHeight = document
				.querySelector("#payments-and-security-icon")
				.getBoundingClientRect().height;
			let footerHeight = document
				.querySelector("footer#checkout-footer")
				.getBoundingClientRect().height;

			let subTractHeight = securityIconsHeight + footerHeight;

			const bodyHeight = document.body.scrollHeight;
			const windowHeight = window.innerHeight - subTractHeight;

			if (windowHeight > bodyHeight) {
				footer.classList.add("fixed");
				securityIcons.classList.add("fixed");
				document.body.classList.add("add_bg");
			} else {
				footer.classList.remove("fixed");
				securityIcons.classList.remove("fixed");
				document.body.classList.remove("add_bg");
			}

			const bodyObserver = new MutationObserver(
				(mutationsList, observer) => {
					let securityIconsHeight = document
						.querySelector("#payments-and-security-icon")
						.getBoundingClientRect().height;

					let footerHeight = document
						.querySelector("footer#checkout-footer")
						.getBoundingClientRect().height;

					let subTractHeight = securityIconsHeight + footerHeight;

					const bodyHeight = document.body.scrollHeight;
					const windowHeight = window.innerHeight - subTractHeight;

					if (windowHeight > bodyHeight) {
						footer.classList.add("fixed");
						securityIcons.classList.add("fixed");
						document.body.classList.add("add_bg");
					} else {
						footer.classList.remove("fixed");
						securityIcons.classList.remove("fixed");
						document.body.classList.remove("add_bg");
					}
				}
			);
			bodyObserver.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: false,
			});

			window.addEventListener("resize", () => {
				let securityIconsHeight = document
					.querySelector("#payments-and-security-icon")
					.getBoundingClientRect().height;

				let footerHeight = document
					.querySelector("footer#checkout-footer")
					.getBoundingClientRect().height;

				let subTractHeight = securityIconsHeight + footerHeight;

				const bodyHeight = document.body.scrollHeight;
				const windowHeight = window.innerHeight - subTractHeight;

				if (windowHeight > bodyHeight) {
					footer.classList.add("fixed");
					securityIcons.classList.add("fixed");
					document.body.classList.add("add_bg");
				} else {
					footer.classList.remove("fixed");
					securityIcons.classList.remove("fixed");
					document.body.classList.remove("add_bg");
				}
			});
		});
	}
};
