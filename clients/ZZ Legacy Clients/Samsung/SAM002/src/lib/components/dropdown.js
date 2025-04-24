const renderCardDropdown = (id, anchorElem, parentElem) => {
  parentElem.querySelector(`.${id}__moreOptions`)?.remove();
  const htmlStr = `
    <div class="${id}__moreOptions ">
        <div class="${id}__moreOptions-btn cta cta--outlined cta--black">Meer opties</div>
        <div class="${id}__moreOptions-dropdown ${id}__hide">
            <div class="content-wrapper">
                <div class="title">Selecteer een optie</div>
                <div class="${id}__close-btn"><svg xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none">
                        <path fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.375 0.625C16.875 0.125 16.125 0.125 15.625 0.625L9 7.25L2.375 0.625C1.875 0.125 1.125 0.125 0.625 0.625C0.125 1.125 0.125 1.875 0.625 2.375L7.25 9L0.625 15.625C0.125 16.125 0.125 16.875 0.625 17.375C0.875 17.625 1.125 17.75 1.5 17.75C1.875 17.75 2.125 17.625 2.375 17.375L9 10.75L15.625 17.375C15.875 17.625 16.25 17.75 16.5 17.75C16.75 17.75 17.125 17.625 17.375 17.375C17.875 16.875 17.875 16.125 17.375 15.625L10.75 9L17.375 2.375C17.875 1.875 17.875 1.125 17.375 0.625Z"
                            fill="#000" />
                    </svg>
                </div>
                <ul>
                    <li class="${id}__compare"><svg class="icon"
                            focusable="false">
                            <use xlink:href="#compare-bold"
                                href="#compare-bold"></use>
                        </svg><span>Vergelijk</span></li>
                    <li class="${id}__location">
                        <svg class="icon"
                            focusable="false">
                            <use xlink:href="#location-bold"
                                href="#location-bold"></use>
                        </svg>
                        <span>Waar te koop</span>
                    </li>
                    <li class="${id}__wishlist">
                        <svg class="icon unselect"
                            focusable="false"
                            aria-hidden="true">
                            <use xlink:href="#wishlist-unselect-regular"
                                href="#wishlist-unselect-regular"></use>
                        </svg>
                        <span>Zet op verlanglijst</span>
                    </li>
                    <li class="${id}__viewDetails">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                    <circle cx="8" cy="6" r="5.5" stroke="black"/>
                    <line x1="4.35355" y1="10.3536" x2="0.353554" y2="14.3536" stroke="black"/>
                    </svg>
                        <span>Bekijk product</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;

  anchorElem.insertAdjacentHTML('beforeend', htmlStr);
};

export default renderCardDropdown;
