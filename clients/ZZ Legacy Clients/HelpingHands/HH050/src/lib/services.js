import { fullStory } from "../../../../../lib/utils";
import { pollerLite, observer } from "../../../../../lib/uc-lib";
import shared from "./shared";
import { eventFire } from "./../../../../../lib/utils";

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};
// =============== CONTACT US =======================================
export const contactUsPage = (mainContainer) => {
  const { ID, VARIATION } = shared;
  mainContainer.classList.add(`${shared.ID}-contact-us`);

  const contactUsMessage = `<div class="${shared.ID}-contactUs__wrapper">
    <div class="${shared.ID}-contactUs__content">
      <div class="${shared.ID}-header">
        <p>Talk to us</p>
      </div>
      <div class="${shared.ID}-subheader">
        <p>Discuss your care needs with our friendly team, seven days a week</p>
      </div>
      <div class="${shared.ID}-callUs">Call <span id="${shared.ID}-telNum">0333 060 0176</span></div>
      <div class="${shared.ID}-or">or</div>
      <div class="${shared.ID}-options__wrapper">
        <ul class="${shared.ID}-options">
          <li class="${shared.ID}-option">
            <div class="${shared.ID}-option__title">
              <div class="${shared.ID}-title__icon" id="${shared.ID}-call"></div>
              <div class="${shared.ID}-title__option">Request a call</div>
            </div>
            <div class="${shared.ID}-option__text">
              <p>Organise a time for us to call you and discuss your needs. We're available seven days a week.</p>
            </div>
            <div class="${shared.ID}-option__cta">
              <a class="${shared.ID}-option__btn" href="/about-us/contact-us/request-a-callback">Request a Call</a>
            </div>
          </li>
          <div class="${shared.ID}-option__split"></div>
          <li class="${shared.ID}-option">
            <div class="${shared.ID}-option__title">
              <div class="${shared.ID}-title__icon" id="${shared.ID}-visit"></div>
              <div class="${shared.ID}-title__option">Book a Home Visit</div>
            </div>
            <div class="${shared.ID}-option__text">
              <p>Complete the short form and we'll call you to arrange a free home consultation.</p>
            </div>
            <div class="${shared.ID}-option__cta">
              <a class="${shared.ID}-option__btn" href="/about-us/contact-us/book-a-home-visit">Book a Home Visit</a>
            </div>
          </li>
          <div class="${shared.ID}-option__split"></div>
          <li class="${shared.ID}-option">
            <div class="${shared.ID}-option__title">
              <div class="${shared.ID}-title__icon" id="${shared.ID}-message"></div>
              <div class="${shared.ID}-title__option">Send a Message</div>
            </div>
            <div class="${shared.ID}-option__text">
              <p>We're available seven days a week to answer any questions about care at home.</p>
            </div>
            <div class="${shared.ID}-option__cta">
              <a class="${shared.ID}-option__btn" href="/about-us/contact-us/send-a-message">Send a Message</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>`;

  document
    .querySelector("#main .container")
    .insertAdjacentHTML("afterbegin", contactUsMessage);

  // --- Sidebar
  document
    .querySelector("#sidebar")
    .classList.add(`${shared.ID}-contactUsPage`);

  setTimeout(() => {
    const phoneContent = document.querySelector(".phone-number.InfinityNumber");
    const phoneHref = phoneContent.getAttribute("href");
    const phoneData = phoneContent.getAttribute("data-ict-discovery-number");
    let phoneNumber = phoneContent.innerText.trim();

    phoneNumber = phoneNumber.replace(
      /\D*(\d{4})\D*(\d{3})\D*(\d{4})\D*/,
      "$1 $2 $3"
    );

    document.querySelector(`#${shared.ID}-telNum`).innerHTML = phoneNumber;
  }, 2000);
  // pollerLite(['.phone-number.InfinityNumber'], () => {
  //   const phoneContent = document.querySelector('.phone-number.InfinityNumber');
  //   const phoneHref = phoneContent.getAttribute('href');
  //   const phoneData = phoneContent.getAttribute('data-ict-discovery-number');
  //   let phoneNumber = phoneContent.innerText.trim();

  //   phoneNumber = phoneNumber.replace(/\D*(\d{4})\D*(\d{3})\D*(\d{4})\D*/, '$1 $2 $3');

  //   document.querySelector(`#${shared.ID}-telNum`).innerHTML = phoneNumber;
  // });
};

//  ============== SEND MESSAGE PAGE  =======================================
export const sendMessagePage = (mainContainer) => {
  const { ID, VARIATION } = shared;
  mainContainer.classList.add(`${shared.ID}-send-message`);

  /**
   * @desc Change form content
   */
  // --- Change Form Title
  document.querySelectorAll("#intro h2")[1].innerText = "Your details*";

  const formFields = mainContainer.querySelectorAll(
    "#intro form div.form-group"
  );
  [].forEach.call(formFields, (field) => {
    field;
  });
  for (let i = 0; i < formFields.length; i += 1) {
    const field = formFields[i];
    let type = "";
    switch (i) {
      case 0:
        type = `${shared.ID}-firstName`;
        field.querySelector("input").setAttribute("placeholder", "First Name*");
        break;
      case 1:
        type = `${shared.ID}-lastName`;
        field.querySelector("input").setAttribute("placeholder", "Last Name*");
        break;
      case 2:
        type = `${shared.ID}-telNum`;
        field
          .querySelector("input")
          .setAttribute("placeholder", "Contact Phone Number*");
        break;
      case 3:
        type = `${shared.ID}-email`;
        field
          .querySelector("input")
          .setAttribute("placeholder", "Email Address*");
        break;
      case 4:
        type = `${shared.ID}-postcode`;
        field.querySelector("input").setAttribute("placeholder", "Postcode*");
        break;
      case 5:
        type = `${shared.ID}-options`;
        break;
      case 6:
        type = `${shared.ID}-message`;
        field
          .querySelector("textarea")
          .setAttribute("placeholder", "Type your message*");
        break;
      case 7:
        type = `${shared.ID}-captcha`;
        // field.querySelector('textarea').setAttribute('placeholder', 'Type your message*');
        break;
      case 8:
        type = `${shared.ID}-sendCta`;
        break;
    }

    if (type !== "") {
      field.classList.add(type);
    }
  }

  const messageTextEl = document.querySelector(`.${shared.ID}-message`);
  const termsParagraph = `<p>By sending this message, you are opting to receive information about our home care services and for us to contact you directly. You can unsubscribe from this at any time. See our full <a href="/privacy/">privacy promise</a>.</p>`;
  document
    .querySelector("#sidebar")
    .insertAdjacentHTML("afterbegin", termsParagraph);
  const newMessageTextContainer = `<textarea name="description" cols="40" rows="10" maxlength="500" class="${shared.ID}-textArea wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required form-control" id="description" aria-required="true" aria-invalid="false" placeholder="Type your message*"></textarea>`;
  document
    .querySelector("#sidebar")
    .insertAdjacentHTML("afterbegin", newMessageTextContainer);
  document
    .querySelector("#sidebar")
    .insertAdjacentHTML("afterbegin", `<h2>Add your message*</h2>`);

  // --- Event Listener for new Textarea
  const newMessageText = document.querySelector(`.${shared.ID}-textArea`);
  const hiddenMessageText = document.querySelector(
    `.${shared.ID}-message textarea`
  );
  newMessageText.addEventListener("keyup", function (e) {
    hiddenMessageText.value = newMessageText.value;
  });

  const serviceOptionsEl = `<div class="form-group col-xs-12 HH050-servicesOptions__wrapper">
    <div class="HH050-servicesOptions__content">
      <h2>Which care service do you require?*</h2>
      <ul class="HH050-services__options">
        <li class="HH050-services__option" id="${shared.ID}-liveIn" value="Live-in Care">
          <div class="HH050-option__container">
            <div class="HH050-option__icon"></div>
            <div class="HH050-option__title">Live-in care</div>
            <div class="HH050-option__subtitle">24 hour support</div>
          </div>
        </li>
        <li class="HH050-services__option" id="${shared.ID}-visit" value="Visiting Care">
          <div class="HH050-option__container">
            <div class="HH050-option__icon"></div>
            <div class="HH050-option__title">Visiting care</div>
            <div class="HH050-option__subtitle">Flexible visits</div>
          </div>
        </li>
        <li class="HH050-services__option  active" id="${shared.ID}-notSure" value="Not Sure">
          <div class="HH050-option__container">
            <div class="HH050-option__icon"></div>
            <div class="HH050-option__title">Unsure</div>
            <div class="HH050-option__subtitle">We can help!</div>
          </div>
        </li>
      </ul>
    </div>
  </div>`;
  document
    .querySelector(`.${shared.ID}-message`)
    .insertAdjacentHTML("afterend", serviceOptionsEl);

  // --- Service Options
  // ---- CHANGE Select Options -- DEFAULT
  const serviceOptionsSelect = document.querySelector("select#callback");
  let opt;
  for (let i = 0; i < serviceOptionsSelect.length; i += 1) {
    opt = serviceOptionsSelect.options[i];
    if (opt.value === "Not Sure") {
      opt.selected = true;
      opt.selected = "selected";

      break;
    }
  }
  eventFire(serviceOptionsSelect, "change");

  // --- UPDATE Select Options -- Based on click
  const serviceOptions = document.querySelectorAll(
    `.${shared.ID}-servicesOptions__wrapper li.${shared.ID}-services__option`
  );
  [].forEach.call(serviceOptions, (service) => {
    service.addEventListener("click", (e) => {
      const clickedValue = service.getAttribute("value");
      // -- Remove previously selected
      const activeOption = document.querySelector(
        `.${shared.ID}-servicesOptions__wrapper li.${shared.ID}-services__option.active`
      );
      if (activeOption) {
        activeOption.classList.remove("active");
      }

      let opt;
      for (let i = 0; i < serviceOptionsSelect.length; i += 1) {
        opt = serviceOptionsSelect.options[i];
        if (opt.value === clickedValue) {
          opt.selected = true;
          opt.selected = "selected";

          // --- Add new active selection
          service.classList.add("active");
          break;
        }
      }
      eventFire(serviceOptionsSelect, "change");
    });
  });

  // --- POSTCODE Message
  const postcodeMsgContainer = `<div class="form-group col-md-6 col-sm-12 ${shared.ID}-postcode__msg">
    <p>Please enter the postcode of the person needing care. If you don’t know this, just provide your postcode for now.</p>
  </div>`;
  document
    .querySelector(`.${shared.ID}-postcode`)
    .insertAdjacentHTML("afterend", postcodeMsgContainer);

  // --- SEND CTA
  const sendCtaEl = document.querySelector(`.${shared.ID}-sendCta input`);
  sendCtaEl.value = "Send Message";
  sendCtaEl.setAttribute("style", "min-width: 300px !important;");
  /**
   * @desc Add new header
   */
  const contactUsMessage = `<div class="${shared.ID}-contactUs__wrapper">
    <ul class="${shared.ID}-contactUs__content">
      <li class="${shared.ID}-content__section header">
        <div class="${shared.ID}-header">
          <p>Send a Message</p>
        </div>
        <div class="${shared.ID}-subheader">
          <a href="/about-us/contact-us/">Other contact options</a>
        </div>
      </li>
      <li class="${shared.ID}-content__section option">
        <div class="${shared.ID}-option">
          <div class="${shared.ID}-option__icon">
            <span>1</span>
            <span class="icon" id="${shared.ID}-details"></span>
          </div>
          <div class="${shared.ID}-label">Add your message and details below</div>
        </div>
      </li>
      <li class="${shared.ID}-content__section option">
        <div class="${shared.ID}-option">
          <div class="${shared.ID}-option__icon">
            <span>2</span>
            <span class="icon" id="${shared.ID}-bubbles"></span>
          </div>
          <div class="${shared.ID}-label">We’ll get back to you as soon as possible!</div>
        </div>
      </li>
      <li class="${shared.ID}-content__section paragraph">
        <div class="${shared.ID}-paragraph">We’re available seven days a week to talk you through the options for quality care at home and to discuss how we can support you or your loved one.</div>
      </li>
    </ul>
  </div>`;

  document
    .querySelector("#main")
    .insertAdjacentHTML("afterbegin", contactUsMessage);

  /**
   * @desc Observe and update CTA text
   * in case of Error
   */
  const submitCta = document.querySelector(`.${shared.ID}-sendCta input`);
  ctaObserver(submitCta, "Send Message");

  // -- Mobile changes
  if (document.documentElement.clientWidth < 417) {
    pollerLite([
      ".HH050-message ~ .form-group.HH050-servicesOptions__wrapper",
      '#sidebar'
    ], () => {
      const servOptions = document.querySelector(
        ".HH050-servicesOptions__wrapper"
      );
      const messageArea = document.querySelector("#sidebar");
      servOptions.insertAdjacentElement("afterend", messageArea);
    });
  }
};

//  =============== REQUEST CALLBACK PAGE  =======================================
export const requestCallBackPage = (mainContainer) => {
  const { ID, VARIATION } = shared;
  mainContainer.classList.add(`${shared.ID}-request-callback`);

  /**
   * @desc Add new header
   */
  const contactUsMessage = `<div class="${shared.ID}-contactUs__wrapper">
    <ul class="${shared.ID}-contactUs__content">
      <li class="${shared.ID}-content__section header">
        <div class="${shared.ID}-header">
          <p>Request a Callback</p>
        </div>
        <div class="${shared.ID}-subheader">
          <a href="/about-us/contact-us/">Other contact options</a>
        </div>
      </li>
      <li class="${shared.ID}-content__section paragraph">
        <div class="${shared.ID}-paragraph">
          <p class="${shared.ID}-line telNum">call <span id=${shared.ID}-telNum></span></p>
          <p class="${shared.ID}-line">Mon - Fri: 8am - 7pm</p>
          <p class="${shared.ID}-line">Sat - Sun: 9am - 6pm</p>
        </div>
      </li>
      <li class="${shared.ID}-content__section option">
        <div class="${shared.ID}-option">
          <div class="${shared.ID}-option__icon">
            <span>1</span>
            <span class="icon" id="${shared.ID}-details"></span>
          </div>
          <div class="${shared.ID}-label"><p>Enter your details below</p></div>
        </div>
      </li>
      <li class="${shared.ID}-content__section option">
        <div class="${shared.ID}-option">
          <div class="${shared.ID}-option__icon">
            <span>2</span>
            <span class="icon" id="${shared.ID}-phone"></span>
          </div>
          <div class="${shared.ID}-label"><p style="width: 150%;">We will contact you to discuss your needs</p></div>
        </div>
      </li>
    </ul>
  </div>`;

  document
    .querySelector("#main")
    .insertAdjacentHTML("afterbegin", contactUsMessage);

  // -- Get Phone Number
  setTimeout(() => {
    const phoneContent = document.querySelector(".phone-number.InfinityNumber");
    const phoneHref = phoneContent.getAttribute("href");
    const phoneData = phoneContent.getAttribute("data-ict-discovery-number");
    let phoneNumber = phoneContent.innerText.trim();

    phoneNumber = phoneNumber.replace(
      /\D*(\d{4})\D*(\d{3})\D*(\d{4})\D*/,
      "$1 $2 $3"
    );

    document.querySelector(`#${shared.ID}-telNum`).innerHTML = phoneNumber;
  }, 1500);

  // --- Change Form Title
  document.querySelectorAll("#intro h2")[0].innerText = "Your details*";

  const formFields = mainContainer.querySelectorAll(
    "#intro form div.form-group"
  );
  [].forEach.call(formFields, (field) => {
    field;
  });
  for (let i = 0; i < formFields.length; i += 1) {
    const field = formFields[i];
    let type = "";
    switch (i) {
      case 0:
        type = `${shared.ID}-firstName`;
        field.querySelector("input").setAttribute("placeholder", "First Name*");
        break;
      case 1:
        type = `${shared.ID}-lastName`;
        field.querySelector("input").setAttribute("placeholder", "Last Name*");
        break;
      case 2:
        type = `${shared.ID}-telNum`;
        field
          .querySelector("input")
          .setAttribute("placeholder", "Contact Phone Number*");
        break;
      case 3:
        type = `${shared.ID}-email`;
        field
          .querySelector("input")
          .setAttribute("placeholder", "Email Address*");
        break;
      case 4:
        type = `${shared.ID}-postcode`;
        field.querySelector("input").setAttribute("placeholder", "Postcode*");
        break;
      case 5:
        type = `${shared.ID}-options`;
        break;
      case 9:
        type = `${shared.ID}-sendCta`;
        break;
    }

    if (type !== "") {
      field.classList.add(type);
    }
  }

  // --- POSTCODE Message
  const postcodeMsgContainer = `<div class="form-group col-md-6 col-sm-12 ${shared.ID}-postcode__msg">
    <p>Please enter the postcode of the person needing care. If you don’t know this, just provide your postcode for now.</p>
  </div>`;
  document
    .querySelector(`.${shared.ID}-postcode`)
    .insertAdjacentHTML("afterend", postcodeMsgContainer);

  // -- Terms
  const termsParagraph = `<p>By sending this message, you are opting to receive information about our home care services and for us to contact you directly. You can unsubscribe from this at any time. See our full <a href="/privacy/">privacy promise</a>.</p>`;
  document
    .querySelector("#sidebar")
    .insertAdjacentHTML("afterbegin", termsParagraph);

  const serviceOptionsEl = `<div class="form-group col-xs-12 HH050-servicesOptions__wrapper">
    <div class="HH050-servicesOptions__content">
      <h2>Which care service do you require?*</h2>
      <ul class="HH050-services__options">
        <li class="HH050-services__option" id="${shared.ID}-liveIn" value="Live-in Care">
          <div class="HH050-option__container">
            <div class="HH050-option__icon"></div>
            <div class="HH050-option__title">Live-in care</div>
            <div class="HH050-option__subtitle">24 hour support</div>
          </div>
        </li>
        <li class="HH050-services__option" id="${shared.ID}-visit" value="Visiting Care">
          <div class="HH050-option__container">
            <div class="HH050-option__icon"></div>
            <div class="HH050-option__title">Visiting care</div>
            <div class="HH050-option__subtitle">Flexible visits</div>
          </div>
        </li>
        <li class="HH050-services__option active" id="${shared.ID}-notSure" value="Not Sure">
          <div class="HH050-option__container">
            <div class="HH050-option__icon"></div>
            <div class="HH050-option__title">Unsure</div>
            <div class="HH050-option__subtitle">We can help!</div>
          </div>
        </li>
      </ul>
    </div>
  </div>`;
  document
    .querySelector(`#sidebar`)
    .insertAdjacentHTML("afterbegin", serviceOptionsEl);

  // --- Service Options
  // ---- CHANGE Select Options -- DEFAULT
  const serviceOptionsSelect = document.querySelector("select#callback");
  let opt;
  for (let i = 0; i < serviceOptionsSelect.length; i += 1) {
    opt = serviceOptionsSelect.options[i];
    if (opt.value === "Not Sure") {
      opt.selected = true;
      opt.selected = "selected";

      break;
    }
  }
  eventFire(serviceOptionsSelect, "change");

  // --- UPDATE Select Options -- Based on click
  const serviceOptions = document.querySelectorAll(
    `.${shared.ID}-servicesOptions__wrapper li.${shared.ID}-services__option`
  );
  [].forEach.call(serviceOptions, (service) => {
    service.addEventListener("click", (e) => {
      const clickedValue = service.getAttribute("value");
      // -- Remove previously selected
      const activeOption = document.querySelector(
        `.${shared.ID}-servicesOptions__wrapper li.${shared.ID}-services__option.active`
      );
      if (activeOption) {
        activeOption.classList.remove("active");
      }

      let opt;
      for (let i = 0; i < serviceOptionsSelect.length; i += 1) {
        opt = serviceOptionsSelect.options[i];
        if (opt.value === clickedValue) {
          opt.selected = true;
          opt.selected = "selected";

          // --- Add new active selection
          service.classList.add("active");
          break;
        }
      }
      eventFire(serviceOptionsSelect, "change");
    });
  });

  // -- New - Change label title
  const whenToCallOptionField = document.querySelector(`.${shared.ID}-options`)
    .nextElementSibling;
  const whenToCallLabel = whenToCallOptionField.querySelector("label");
  if (whenToCallLabel) {
    whenToCallLabel.innerHTML = `When would you like us to call you?<span class="mandatory">*</span>`;
  }

  /**
   * @desc Observe and update CTA text
   * in case of Error
   */
  const submitCta = document.querySelector(`.${shared.ID}-sendCta input`);
  ctaObserver(submitCta, "Request");

  // -- Mobile changes

  if (document.documentElement.clientWidth < 417) {
    const controlStart = document.querySelector(
      ".wpcf7-form-control-wrap.Start"
    );
    const formGroup = controlStart.parentElement;
    const serviceBoxes = document.querySelector("#sidebar");
    formGroup.insertAdjacentElement("afterend", serviceBoxes);
  }
};

//  ============== BOOK HOME VISIT PAGE  =======================================
export const bookHomeVisitPage = (mainContainer) => {
  const { ID, VARIATION } = shared;
  mainContainer.classList.add(`${shared.ID}-book-visit`);

  /**
   * @desc Add new header
   */
  const contactUsMessage = `<div class="${shared.ID}-contactUs__wrapper">
    <ul class="${shared.ID}-contactUs__content">
      <li class="${shared.ID}-content__section header">
        <div class="${shared.ID}-header">
          <p>Book a Home Visit</p>
        </div>
        <div class="${shared.ID}-subheader">
          <a href="/about-us/contact-us/">Other contact options</a>
        </div>
      </li>
      <li class="${shared.ID}-content__section option">
        <div class="${shared.ID}-option">
          <div class="${shared.ID}-option__icon">
            <span>1</span>
            <span class="icon" id="${shared.ID}-details"></span>
          </div>
          <div class="${shared.ID}-label">Add your message and details below</div>
        </div>
      </li>
      <li class="${shared.ID}-content__section option">
        <div class="${shared.ID}-option">
          <div class="${shared.ID}-option__icon">
            <span>2</span>
            <span class="icon" id="${shared.ID}-phone"></span>
          </div>
          <div class="${shared.ID}-label"><p>We will contact you to discuss your needs</p></div>
        </div>
      </li>
      <li class="${shared.ID}-content__section option">
        <div class="${shared.ID}-option">
          <div class="${shared.ID}-option__icon">
            <span>3</span>
            <span class="icon" id="${shared.ID}-bubbles"></span>
          </div>
          <div class="${shared.ID}-label">We’ll get back to you as soon as possible!</div>
        </div>
      </li>
    </ul>
  </div>`;

  document
    .querySelector("#main")
    .insertAdjacentHTML("afterbegin", contactUsMessage);

  // --- Move Calendar
  const calendarEl = document.querySelector("#RequestedDate_datepicker");
  const formContainer = document.querySelector("#intro form .row");
  calendarEl.insertAdjacentHTML(
    "beforebegin",
    `<h2 class="${shared.ID}-calendar__header">Choose a Time (optional)</h2>`
  );
  formContainer.insertAdjacentElement("afterend", calendarEl);
  const termsParagraph = `<p class="${shared.ID}-terms">By sending this message, you are opting to receive information about our home care services and for us to contact you directly. You can unsubscribe from this at any time. See our full <a href="/privacy/">privacy promise</a>.</p>`;
  const emailField = document.querySelector(`.${shared.ID}-email`);
  calendarEl.insertAdjacentHTML("afterend", termsParagraph);

  // const termsContainer = document.querySelector(`p.${shared.ID}-terms`);
  // emailField.insertAdjacentElement('afterend', termsContainer);

  // --- Change Form Title
  document.querySelectorAll("#intro h2")[0].innerText = "Your details*";

  const formFields = mainContainer.querySelectorAll(
    "#intro form div.form-group"
  );
  [].forEach.call(formFields, (field) => {
    field;
  });
  for (let i = 0; i < formFields.length; i += 1) {
    const field = formFields[i];
    let type = "";
    switch (i) {
      case 0:
        type = `${shared.ID}-firstName`;
        field.querySelector("input").setAttribute("placeholder", "First Name*");
        break;
      case 1:
        type = `${shared.ID}-lastName`;
        field.querySelector("input").setAttribute("placeholder", "Last Name*");
        break;
      case 2:
        type = `${shared.ID}-telNum`;
        field
          .querySelector("input")
          .setAttribute("placeholder", "Contact Phone Number*");
        break;
      case 3:
        type = `${shared.ID}-email`;
        field
          .querySelector("input")
          .setAttribute("placeholder", "Email Address*");
        break;
      case 5:
        type = `${shared.ID}-sendCta`;
        break;
    }

    if (type !== "") {
      field.classList.add(type);
    }
  }

  // --- Change text in CTA
  document.querySelector(`.${shared.ID}-sendCta input`).value =
    "Request Home Visit";

  // --- Time Selection
  const timeSelectionContainer = document.querySelector(
    "span.wpcf7-form-control-wrap.TimePreference"
  ).parentElement;
  timeSelectionContainer.classList.add(`${shared.ID}-timeSelection`);

  /**
   * @desc Observe and update CTA text
   * in case of Error
   */
  const submitCta = document.querySelector(`.${shared.ID}-sendCta input`);
  ctaObserver(submitCta, "Request Home Visit");

  // --- Mobile changes
  if (document.documentElement.clientWidth < 500) {
    // const datePickTitle = document.querySelector('.HH050-calendar__header');
    // const datePicker = document.querySelector('#RequestedDate_datepicker');
    // const emailInput = document.querySelector('.HH050-email');
    // const requestButton = document.querySelector('.HH050-sendCta');
    // const terms = document.querySelector('.HH050-terms');
    // terms.insertAdjacentElement('afterend', requestButton);
    // emailInput.insertAdjacentElement('afterend', datePickTitle);
    // emailInput.insertAdjacentElement('afterend', datePicker);

    pollerLite(
      ["#RequestedDate_datepicker", ".HH050-terms", ".HH050-sendCta"],
      () => {
        setTimeout(() => {
          const requestButton = document.querySelector(".HH050-sendCta");
          const terms = document.querySelector(".HH050-terms");
          terms.insertAdjacentElement("afterend", requestButton);
        }, 750);
      }
    );
  }
};

// Mobile-specific changes

// document.querySelectorAll('#intro h2')[0].innerText = "Your Details*";

export const ctaObserver = (submitCta, text) => {
  const { ID, VARIATION } = shared;

  observer.connect(
    document.querySelector(`.${shared.ID}-sendCta input`),
    () => {
      setTimeout(() => {
        submitCta.value = text;
      }, 1500);
    },
    {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // nodeTree: true,
      },
    }
  );
};
