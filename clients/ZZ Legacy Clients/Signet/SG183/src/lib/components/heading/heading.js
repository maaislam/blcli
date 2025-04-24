import { pollerLite } from "../../../../../../../lib/utils";

const heading = (ID, items, url) => {
  const callback = () => {
    const headingContainer = document.querySelector(".page-info");
    headingContainer.classList.add(`${ID}-header`);
    headingContainer.innerHTML = /* HTML */ `
      <div class="${ID}-heading__inner">
        <h1 class="${ID}-heading__title">All Jewellery</h1>
        <ul class="${ID}-heading__list">
          ${items
            .map((item) => {
              return /* HTML */ `
                <li>
                  <a class="${ID}-heading__item" href="${item.url}">
                    <div class="${ID}-heading__item-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <h2 class="${ID}-heading__item-name">${item.name}</h2>
                  </a>
                </li>
              `;
            })
            .join("")}
        </ul>
      </div>
    `;
  };

  pollerLite([".page-info"], () => callback());
};

export default heading;
