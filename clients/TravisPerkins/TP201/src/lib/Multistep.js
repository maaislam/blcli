import {
  doScrolling,
  fireEvent,
  getCustomerLocation,
  getPageSKU,
  isMobile,
} from "./services";
import shared from "./shared";
import { getCookie } from "../../../../../lib/utils";
import { addForDelivery, addForCollection } from "./api";
const { ID } = shared;
const componentName = `${ID}_Multistep`;
const arrow = `<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1066 9.26395L20.5812 0.789341C21.2498 0.120713 22.3339 0.120713 23.0025 0.789341C23.6711 1.45797 23.6711 2.54203 23.0025 3.21066L12.1066 14.1066L1.21066 3.21066C0.54203 2.54203 0.54203 1.45797 1.21066 0.789341C1.87929 0.120713 2.96335 0.120713 3.63198 0.789341L12.1066 9.26395Z" fill="#606F80"/>
  </svg>
`;

const stepHeaders = (stepName, label, labelCompleted) => {
  const markup = {
    step1: `
    <div class="${componentName}-circle">
      <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7657 0.203831C11.4904 -0.055785 11.0672 -0.0680086 10.7773 0.170652L4.51458 6.13341L1.13214 3.98553C0.828862 3.80391 0.440603 3.85805 0.199032 4.11883C-0.040792 4.37728 -0.0669857 4.76903 0.137331 5.05776L3.90221 9.6916C4.04075 9.88777 4.26603 10.0054 4.50585 10.0077C4.50818 10.0077 4.51051 10.0077 4.51283 10.0077C4.75033 10.0077 4.97444 9.89533 5.1153 9.70208L11.8565 1.18874C12.0777 0.88547 12.0399 0.463447 11.7657 0.203831Z" fill="white"/>
      </svg>
    </div>
    <div class="${componentName}-graphic"><img src="http://sb.monetate.net/img/1/581/3509373.png" /></div>
    <div class="${componentName}-title"><strong>Step 1:</strong> Select your door dimensions</div>
    <div class="${componentName}-title ${componentName}-titleCompleted"><strong>Step 1:</strong> Door(s) added to basket</div>
    <div class="${componentName}-arrow">${arrow}</div>
  `,
    step2: `
    <div class="${componentName}-circle">
      <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7657 0.203831C11.4904 -0.055785 11.0672 -0.0680086 10.7773 0.170652L4.51458 6.13341L1.13214 3.98553C0.828862 3.80391 0.440603 3.85805 0.199032 4.11883C-0.040792 4.37728 -0.0669857 4.76903 0.137331 5.05776L3.90221 9.6916C4.04075 9.88777 4.26603 10.0054 4.50585 10.0077C4.50818 10.0077 4.51051 10.0077 4.51283 10.0077C4.75033 10.0077 4.97444 9.89533 5.1153 9.70208L11.8565 1.18874C12.0777 0.88547 12.0399 0.463447 11.7657 0.203831Z" fill="white"/>
      </svg>
    </div>
    <div class="${componentName}-graphic"><img src="http://sb.monetate.net/img/1/581/3509372.png" /></div>
    <div class="${componentName}-title"><strong>Step 2:</strong> ${label}</div>
    <div class="${componentName}-title ${componentName}-titleCompleted"><strong>Step 2:</strong> ${labelCompleted}</div>
    <div class="${componentName}-arrow">${arrow}</div>
  `,
    step3: `
    <div class="${componentName}-circle">
      <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7657 0.203831C11.4904 -0.055785 11.0672 -0.0680086 10.7773 0.170652L4.51458 6.13341L1.13214 3.98553C0.828862 3.80391 0.440603 3.85805 0.199032 4.11883C-0.040792 4.37728 -0.0669857 4.76903 0.137331 5.05776L3.90221 9.6916C4.04075 9.88777 4.26603 10.0054 4.50585 10.0077C4.50818 10.0077 4.51051 10.0077 4.51283 10.0077C4.75033 10.0077 4.97444 9.89533 5.1153 9.70208L11.8565 1.18874C12.0777 0.88547 12.0399 0.463447 11.7657 0.203831Z" fill="white"/>
      </svg>
    </div>
    <div class="${componentName}-graphic"><img src="http://sb.monetate.net/img/1/581/3509371.png" /></div>
    <div class="${componentName}-title"><strong>Step 3:</strong> ${label}</div>
    <div class="${componentName}-title ${componentName}-titleCompleted"><strong>Step 3:</strong> ${labelCompleted}</div>
    <div class="${componentName}-arrow">${arrow}</div>
  `,
    step4: `
    <div class="${componentName}-circle">
      <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7657 0.203831C11.4904 -0.055785 11.0672 -0.0680086 10.7773 0.170652L4.51458 6.13341L1.13214 3.98553C0.828862 3.80391 0.440603 3.85805 0.199032 4.11883C-0.040792 4.37728 -0.0669857 4.76903 0.137331 5.05776L3.90221 9.6916C4.04075 9.88777 4.26603 10.0054 4.50585 10.0077C4.50818 10.0077 4.51051 10.0077 4.51283 10.0077C4.75033 10.0077 4.97444 9.89533 5.1153 9.70208L11.8565 1.18874C12.0777 0.88547 12.0399 0.463447 11.7657 0.203831Z" fill="white"/>
      </svg>
    </div>
    <div class="${componentName}-graphic"><img src="http://sb.monetate.net/img/1/581/3509370.png" /></div>
    <div class="${componentName}-title"><strong>Step 4:</strong> ${label}</div>
    <div class="${componentName}-title ${componentName}-titleCompleted"><strong>Step 4:</strong> ${labelCompleted}</div>
    <div class="${componentName}-arrow">${arrow}</div>
  `,
  };

  return markup[stepName];
};

const openPostcodePopup = () => {
  const cta = document.querySelector('[data-test-id="edit-branch"]');

  cta.click();
};

export default class Multistep {
  constructor(data) {
    this.data = data;
    this.name = componentName;
    this.anchors = {
      desktop: '[class*="PDPDesktop__PDPBody"] [class*="PDPDesktop__Inner"]',
      mobile: '[class*="PDPMobile__PDPBody"]',
    };

    // Holds the wrapper DOM component of Multistep and individual steps.
    this.component = null;
    this.steps = {
      step1: {
        completed: false,
        $stepWrapper: null,
        $productList: null,
        $content: null,
      },
      step2: {
        completed: false,
        $stepWrapper: null,
        $productList: null,
        $content: null,
        products: [],
      },
      step3: {
        completed: false,
        $stepWrapper: null,
        $productList: null,
        $content: null,
        products: [],
      },
      step4: {
        completed: false,
        $stepWrapper: null,
        $productList: null,
        $content: null,
        products: [],
      },
    };

    this.sku = getPageSKU();

    this.basketId = null;

    // Start.
    this.buildComponent();
    this.addEventListeners();
  }

  setBasketId(basketId) {
    this.basketId = basketId;
  }

  // Open the next uncompleted step.
  openStep() {
    let selected = false;
    const otherActive = document.querySelector(`.${this.name}-active`);

    Object.keys(this.steps).forEach((step) => {
      if (!this.steps[step].completed && !selected) selected = step;
    });

    if (otherActive) {
      otherActive.classList.remove(`${this.name}-active`);
    }

    // Sort active state and scroll to open element.
    if (!selected) selected = "step1";
    const scrollELm = this.steps[selected].$stepWrapper;
    if (!scrollELm) return;
    const scrollPos = scrollELm.getBoundingClientRect().top + window.scrollY;
    if (this.steps[selected].$stepWrapper) {
      this.steps[selected].$stepWrapper.classList.add(`${this.name}-active`);
    }
    // Scroll into view.
    setTimeout(() => {
      doScrolling(scrollPos, 300);
    }, 500);
  }

  buildComponent() {
    if (document.querySelector(`.${this.name}`)) return;
    // Anchor for the component.
    const step1Content = document.querySelector(
      isMobile() ? this.anchors.mobile : this.anchors.desktop
    );

    if (step1Content) {
      // Wrapper.
      this.component = document.createElement("section");
      this.component.classList.add(`${this.name}`);

      // Steps.
      Object.keys(this.steps).forEach((step) => {
        const stepDom = document.createElement("div");
        stepDom.classList.add(`${this.name}-${step}`);
        stepDom.insertAdjacentHTML("afterbegin", this.buildStepHeader(step));

        this.component.insertAdjacentElement("beforeend", stepDom);
        this.steps[step].$stepWrapper = stepDom;
      });

      // Add wrapper in the right place.
      step1Content.insertAdjacentElement("afterend", this.component);
      step1Content.insertAdjacentHTML("afterbegin", this.makeBlocks("step1"));

      // Create new content wrapper for step 1
      const step1ContentWrapper = document.createElement("div");
      step1ContentWrapper.classList.add(`${this.name}-stepContent`);

      // Move it to within the step 1 wrapper
      this.steps.step1.$content = step1ContentWrapper;
      this.steps.step1.$stepWrapper.insertAdjacentElement(
        "beforeend",
        step1ContentWrapper
      );

      // Move step 1 content to our new content wrapper.
      while (step1Content.childNodes.length > 0) {
        this.steps.step1.$content.appendChild(step1Content.childNodes[0]);
      }

      // Build other steps content
      this.buildDoorInternals();
      this.buildDoorHandles();
      this.buildDoorLocks();
    }
  }

  basketConfirmationLoader() {
    const tick = `<svg data-test-id="styled-svg" fill="blue1"><use xlink:href="#success"></use></svg>`;

    const markup = `
      <div class="${this.name}-loader">
        <div class="${this.name}-spinner"></div>
        <div class="${this.name}-loaderSuccess">
          <p>${tick} Item added to your basket</p>
        </div>
        <div class="${this.name}-loaderFail">
          <p>Something went wrong, please try again</p>
        </div>
      </div>
    `;

    return markup;
  }

  // Build step 2 - door internals
  buildDoorInternals() {
    const elm = document.createElement("div");
    elm.classList.add(`${this.name}-stepContent`);
    elm.insertAdjacentHTML(
      "afterbegin",
      `
        <p class="${this.name}-stepIntro">
          All the door internals and hinges listed below are compatible with the door that you have selected above.
          <br />
          <a href="${this.data.step2.viewAll}">View all door internals</a> <strong>or</strong> <a href="/cart">continue to basket</a>
        </p>
    `
    );

    // Product list wrapper.
    const productList = document.createElement("div");
    productList.classList.add(`${this.name}-productList`);
    elm.insertAdjacentElement("beforeend", productList);
    elm.insertAdjacentHTML("afterbegin", this.makeBlocks("step2"));

    // Add to the DOM and keep an internal reference point.
    this.steps.step2.$stepWrapper.insertAdjacentElement("beforeend", elm);
    this.steps.step2.$content = elm;
    this.steps.step2.$productList = productList;
    this.steps.step2.$content.insertAdjacentHTML(
      "beforeend",
      this.basketConfirmationLoader()
    );
  }

  // Step 3
  buildDoorHandles() {
    const elm = document.createElement("div");
    elm.classList.add(`${this.name}-stepContent`);
    elm.insertAdjacentHTML(
      "afterbegin",
      `
        <p class="${this.name}-stepIntro">
          All the door internals and hinges listed below are compatible with the door that you have selected above.
          <br />
          <a href="${this.data.step3.viewAll}">View all door handles</a> <strong>or</strong> <a href="/cart">continue to basket</a>
        </p>
    `
    );

    // Product list wrapper.
    const productList = document.createElement("div");
    productList.classList.add(`${this.name}-productList`);
    elm.insertAdjacentElement("beforeend", productList);
    elm.insertAdjacentHTML("afterbegin", this.makeBlocks("step3"));

    // Add to the DOM and keep an internal reference point.
    this.steps.step3.$stepWrapper.insertAdjacentElement("beforeend", elm);
    this.steps.step3.$content = elm;
    this.steps.step3.$productList = productList;
    this.steps.step3.$content.insertAdjacentHTML(
      "beforeend",
      this.basketConfirmationLoader()
    );
  }

  // Step 4
  buildDoorLocks() {
    const elm = document.createElement("div");
    elm.classList.add(`${this.name}-stepContent`);

    elm.insertAdjacentHTML(
      "afterbegin",
      `
        <p class="${this.name}-stepIntro">
          ${
            this.data.step4.varnish
              ? "All the varnishes & oils below are compatible with the door you have selected above."
              : "All the door internals and hinges listed below are compatible with the door that you have selected above."
          }
          <br />
          <a href="${this.data.step4.viewAll}">
            ${
              this.data.step4.varnish
                ? "View all varnishes & oils"
                : "View all door locks"
            }
          </a> <strong>or</strong> <a href="/cart">continue to basket</a>
        </p>
    `
    );

    // Product list wrapper.
    const productList = document.createElement("div");
    productList.classList.add(`${this.name}-productList`);
    elm.insertAdjacentElement("beforeend", productList);
    elm.insertAdjacentHTML("afterbegin", this.makeBlocks("step4"));

    // Add to the DOM and keep an internal reference point.
    this.steps.step4.$stepWrapper.insertAdjacentElement("beforeend", elm);
    this.steps.step4.$content = elm;
    this.steps.step4.$productList = productList;
    this.steps.step4.$content.insertAdjacentHTML(
      "beforeend",
      this.basketConfirmationLoader()
    );
  }

  buildStepHeader(stepName) {
    return `
      <header class="${this.name}-stepHeader">
        <div class="${this.name}-flex">
          ${stepHeaders(
            stepName,
            this.data[stepName].label,
            this.data[stepName].labelCompleted
          )}
        </div>
      </header>
    `;
  }

  saveState(newState) {
    localStorage.setItem(`${this.name}_${this.sku}`, newState);
  }

  loadState() {
    return localStorage.getItem(`${this.name}_${this.sku}`);
  }

  // Mark a step as complete.
  completeStep(newStep) {
    this.state.currentStep = newStep;
    this.state[newStep] = true;

    this.saveState(this.state);
  }

  // Toggle steps content on header click
  addEventListeners() {
    Object.keys(this.steps).forEach((stepName) => {
      const step = this.steps[stepName].$stepWrapper;
      if (!step) return;

      const header = step.querySelector(`.${this.name}-stepHeader`);
      if (!header) return;

      header.addEventListener("click", () => {
        // If open already, close it.
        if (step.classList.contains(`${this.name}-active`)) {
          step.classList.remove(`${this.name}-active`);
        } else {
          // Track event.
          fireEvent(`Expand - Journey Step ${stepName}`);

          // Hide others, only one expaded at a time.
          const otherActive = document.querySelector(`.${this.name}-active`);
          if (otherActive) {
            otherActive.classList.remove(`${this.name}-active`);
          }

          // Toggle this.
          step.classList.toggle(`${this.name}-active`);
        }

        // Scroll into view.
        const scrollPos = step.getBoundingClientRect().top + window.scrollY;
        doScrolling(scrollPos, 300);
      });
    });
  }

  // Update the status of completed steps
  updateStatus(skus) {
    const markComplete = (step) => {
      this.steps[step].completed = true;
      if (this.steps[step].$stepWrapper) {
        this.steps[step].$stepWrapper.classList.add(`${this.name}-completed`);
      }
    };

    // Treat doors individually and only show in basket if the page matches the door in basket.
    const pageSku = getPageSKU();

    // Mark steps complete if there is a match between basket and step skus
    skus.forEach((sku) => {
      console.log(sku, pageSku);
      if (this.data.step1.skus.indexOf(sku) !== -1 && sku === pageSku) {
        markComplete("step1");
      }
      if (this.data.step2.skus.indexOf(sku) !== -1) markComplete("step2");
      if (this.data.step3.skus.indexOf(sku) !== -1) markComplete("step3");
      if (this.data.step4.skus.indexOf(sku) !== -1) markComplete("step4");
    });

    this.openStep(); // Open the next step
  }

  makeProductDom($stepWrapper, product, eligibility, stock, stepName) {
    const domElm = document.createElement("div");
    domElm.classList.add(`${this.name}-productItem`);
    domElm.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="${this.name}-productImage">
        <img src="${product.image.url}" alt="${product.image.altText}" />
      </div>
      <div>
        <p class="${this.name}-productLabel">Product code: ${product.code}</p>
        <p class="${this.name}-productName">${product.name}</p>
        <div>
          <p class="${this.name}-productPrice">£${product.price.incVat} <span class="${this.name}-productLabel">inc. VAT</span></p>
          <p class="${this.name}-productLabel">£${product.price.ExVat} <span>Ex. VAT</span></p>
        </div>

        <div class="${this.name}-productQuantity">
          <span class="${this.name}-productQuantityIcon  ${this.name}-QtyDown">-</span>
          <input type="number" min="1" pattern="\\d*" placeholder="Type..." value="1" class="${this.name}-Qty" />
          <span class="${this.name}-productQuantityIcon ${this.name}-QtyUp">+</span>
        </div>
        <div class="${this.name}-productButtons" data-product-id="${product.code}">
        </div>
      </div>
    `
    );

    // Quantity.
    const qtyUp = domElm.querySelector(`.${this.name}-QtyUp`);
    const qtyDown = domElm.querySelector(`.${this.name}-QtyDown`);
    const qty = domElm.querySelector(`.${this.name}-Qty`);
    const updateCollection = () => {
      const btn = domElm.querySelector(
        `.${this.name}-productCollection button`
      );
      const val = parseInt(qty.value, 10);
      if (val > stock) {
        btn.classList.add(`${this.name}-buttonDisabled`);
        btn.setAttribute("disabled", true);
      } else {
        btn.classList.remove(`${this.name}-buttonDisabled`);
        btn.removeAttribute("disabled");
      }
    };
    qtyUp.addEventListener("click", () => {
      qty.value = parseInt(qty.value, 10) + 1;
      updateCollection();
    });
    qtyDown.addEventListener("click", () => {
      let newval = parseInt(qty.value, 10) - 1;
      if (newval < 1) newval = 1;
      qty.value = newval;
      updateCollection();
    });
    qty.addEventListener("keyup", () => {
      // Update collection button.
      if (qty.value < 1) qty.value = 1;
      updateCollection();
    });

    // Buttons
    const btnWrapper = domElm.querySelector(`.${this.name}-productButtons`);
    this.setDeliveryButton(
      $stepWrapper,
      btnWrapper,
      eligibility,
      qty,
      stepName
    );
    this.setCollectionButton(
      $stepWrapper,
      btnWrapper,
      eligibility,
      stock,
      qty,
      stepName
    );

    return domElm;
  }

  // Add product and generate DOM element
  addProduct(step, productData, eligibility, stock) {
    const getPrice = (prices) => {
      return {
        incVat: prices.tradePrice.valueIncVat
          ? prices.tradePrice.valueIncVat
          : prices.retailPrice.valueIncVat,
        ExVat: prices.tradePrice.valueExVat
          ? prices.tradePrice.valueExVat
          : prices.retailPrice.valueExVat,
      };
    };
    const getImage = (images) => {
      let img = null;
      images.forEach((image) => {
        if (image.type === "thumbnail") {
          img = {
            url: image.url,
            altText: image.altText,
          };
        }
      });
      return img;
    };
    const product = {
      name: productData.name,
      code: productData.code,
      price: getPrice(productData.price),
      image: getImage(productData.primaryImage.images),
      review: {
        rating: productData.review.averageRating,
        total: productData.review.numberOfReviews,
      },
    };

    // Add to the multistep content.
    const productDom = this.makeProductDom(
      this.steps[step].$stepWrapper,
      product,
      eligibility,
      stock,
      step
    );
    if (this.steps[step].$productList) {
      this.steps[step].$productList.insertAdjacentElement(
        "beforeend",
        productDom
      );
    }
    // Check availability and update buttons.
    this.steps[step].products.push(productDom);
  }

  setDeliveryButton($stepWrapper, wrapper, eligibility, qtyElm, stepName) {
    let label = "";
    const delivery = document.createElement("div");
    const button = document.createElement("button");
    delivery.insertAdjacentElement("afterbegin", button);
    button.textContent = "Delivery";

    if (eligibility) {
      // Vars.
      const { deliveryEligibility } = eligibility;

      if (
        deliveryEligibility.status === "UNAVAILABLE" ||
        (deliveryEligibility.type === "CARRIER" &&
          deliveryEligibility.estimatedDate === null)
      ) {
        // Make disabled & add notice
        button.classList.add(`${this.name}-buttonDisabled`);
        button.setAttribute("disabled", true);

        label = `<p class="${this.name}-productLabel">Unavailable for delivery</p>`;
      } else {
        // Add to basket action
        button.addEventListener("click", () => {
          this.buyProduct(
            stepName,
            $stepWrapper,
            eligibility.item,
            qtyElm,
            true
          );
        });

        // Label for the delivery button
        if (deliveryEligibility.supplierLeadTimeDays) {
          label = `<p class="${this.name}-productLabel">
            Available for delivery in ${deliveryEligibility.supplierLeadTimeDays} working days
          </p>`;
        } else {
          label = `<p class="${this.name}-productLabel">
            Available for next working day delivery
          </p>`;
        }
      }
    } else {
      // Open postcode popup
      label = "Enter postcode for local availability";
      button.addEventListener("click", openPostcodePopup);
    }

    // Sort out button classes.
    delivery.classList.add(`${this.name}-productDelivery`);
    wrapper.insertAdjacentElement("beforeend", delivery);
    button.insertAdjacentHTML("afterend", label);
  }

  setCollectionButton(
    $stepWrapper,
    wrapper,
    eligibility,
    stock,
    qtyElm,
    stepName
  ) {
    let label = "";
    const collection = document.createElement("div");
    const button = document.createElement("button");
    collection.insertAdjacentElement("afterbegin", button);
    button.textContent = "Collection";

    if (eligibility) {
      // Vars.
      const { collectionEligibility } = eligibility;

      if (collectionEligibility.status === "UNAVAILABLE" || stock < 1) {
        // Make disabled & add notice
        button.classList.add(`${this.name}-buttonDisabled`);
        button.setAttribute("disabled", true);

        label = `<p class="${this.name}-productLabel">Unavailable for collection</p>`;
      } else {
        // Add to basket action
        button.addEventListener("click", () =>
          this.buyProduct(
            stepName,
            $stepWrapper,
            eligibility.item,
            qtyElm,
            false
          )
        );

        // Label for the collection button
        label = `<p class="${this.name}-productLabel">
            ${stock} available for collection
          </p>`;
      }
    } else {
      // Open postcode popup
      label = "Select collection branch for local availability";
      button.addEventListener("click", openPostcodePopup);
    }

    // Sort out button classes.
    wrapper.insertAdjacentElement("beforeend", collection);
    collection.classList.add(`${this.name}-productCollection`);
    button.insertAdjacentHTML("afterend", label);
  }

  makeBlocks(stepName) {
    return `
      <div class="${this.name}-stepBlocks" data-step="${stepName}">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  }

  buyProduct(stepName, domElm, product, qtyElm, isDelivery) {
    const code = product.productCode;
    const qty = qtyElm.value;
    const basketId = this.basketId;
    const loader = domElm.querySelector(`.${this.name}-loader`);
    const spinner = domElm.querySelector(`.${this.name}-spinner`);
    const loaderSuccess = domElm.querySelector(`.${this.name}-loaderSuccess`);
    const loaderFail = domElm.querySelector(`.${this.name}-loaderFail`);
    const customerLocation = getCustomerLocation();
    const branchId = customerLocation
      ? customerLocation.collectionBranchId
      : null;

    // Track event.
    fireEvent(`Add to basket - Step ${stepName}`);

    // Start spinner
    loader.classList.add(`${this.name}-active`);
    spinner.classList.add(`${this.name}-active`);

    const callback = (response) => {
      if (!response.basketAddTo) {
        // SOMETHING WENT WRONG
        spinner.classList.remove(`${this.name}-active`);
        loaderFail.classList.add(`${this.name}-active`);

        setTimeout(() => {
          loader.classList.remove(`${this.name}-active`);
        }, 2000);
      } else {
        // Delivery & collection have different responses
        let entries = null;
        if (response.basketAddTo.basketEntries) {
          entries = response.basketAddTo.basketEntries;
        } else if (response.basketAddTo.entries) {
          entries = response.basketAddTo.entries;
        }

        // EVERYTHING GOOD!
        const basketSkus = entries.map((entry) => entry.product.code);
        // Stop spinner, show success
        spinner.classList.remove(`${this.name}-active`);
        loaderSuccess.classList.add(`${this.name}-active`);

        // After message, toggle steps.
        setTimeout(() => {
          loader.classList.remove(`${this.name}-active`);
          loaderSuccess.classList.remove(`${this.name}-active`);
          // this.updateStatus(basketSkus);
          // @TODO test reload
          window.location.reload();
        }, 3000);
      }
    };

    if (isDelivery) addForDelivery(code, qty, basketId).then(callback);
    else addForCollection(code, qty, basketId, branchId).then(callback);
  }

  clearSteps() {
    // Clear up step 2, 3, 4
    if (this.steps.step2.$stepWrapper) this.steps.step2.$stepWrapper.remove();
    if (this.steps.step3.$stepWrapper) this.steps.step3.$stepWrapper.remove();
    if (this.steps.step4.$stepWrapper) this.steps.step4.$stepWrapper.remove();

    this.steps.step2 = {
      completed: false,
      $stepWrapper: null,
      $productList: null,
      $content: null,
      products: [],
    };

    this.steps.step3 = {
      completed: false,
      $stepWrapper: null,
      $productList: null,
      $content: null,
      products: [],
    };

    this.steps.step4 = {
      completed: false,
      $stepWrapper: null,
      $productList: null,
      $content: null,
      products: [],
    };
  }
}
