const loader = () => {
  const htmlStr = `
        <div tabindex="-1"
         class="oct-loading-spinner-overlay">
        <div data-testid="loading-spinner"
             class="oct-loading-spinner">
            <div data-testid="loading-spinner-title-text"
                 class="oct-loading-spinner__title-text">Please wait...</div>
            <div class="oct-loading-spinner__container"><svg height="32"
                     width="32"
                     role="img"
                     class="oct-icon oct-loading-spinner__container__bounce1"
                     aria-hidden="true"
                     aria-label=""
                     style="height: 12px; width: 12px; fill: black;">
                    <circle cx="6"
                            cy="6"
                            r="6"></circle>
                </svg><svg height="32"
                     width="32"
                     role="img"
                     class="oct-icon oct-loading-spinner__container__bounce2"
                     aria-hidden="true"
                     aria-label=""
                     style="height: 12px; width: 12px; fill: black;">
                    <circle cx="6"
                            cy="6"
                            r="6"></circle>
                </svg><svg height="32"
                     width="32"
                     role="img"
                     class="oct-icon oct-loading-spinner__container__bounce3"
                     aria-hidden="true"
                     aria-label=""
                     style="height: 12px; width: 12px; fill: black;">
                    <circle cx="6"
                            cy="6"
                            r="6"></circle>
                </svg><svg height="32"
                     width="32"
                     role="img"
                     class="oct-icon oct-loading-spinner__container__bounce4"
                     aria-hidden="true"
                     aria-label=""
                     style="height: 12px; width: 12px; fill: black;">
                    <circle cx="6"
                            cy="6"
                            r="6"></circle>
                </svg><svg height="32"
                     width="32"
                     role="img"
                     class="oct-icon oct-loading-spinner__container__bounce5"
                     aria-hidden="true"
                     aria-label=""
                     style="height: 12px; width: 12px; fill: black;">
                    <circle cx="6"
                            cy="6"
                            r="6"></circle>
                </svg></div>
            <div data-testid="loading-spinner-description"
                 class="oct-loading-spinner__description-text"></div>
        </div>
    </div>

    `;
  return htmlStr;
};

export default loader;
