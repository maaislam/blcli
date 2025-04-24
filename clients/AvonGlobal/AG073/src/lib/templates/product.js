import shared from "../../../../../../core-files/shared";
const { ID } = shared;

export default (content) => {
  // Make element.
  const elm = document.createElement("div");
  elm.classList.add(`${ID}_product`);

  // Contents.
  elm.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${ID}_imageWrapper">
      <img class="${ID}_image" src="${content.image}" />
      <div class="${ID}_prices">
    ${content.priceWas ? `<p>was ${content.priceWas}</p>` : ""}
      ${
        contenNow
          ? `<p class="${ID}_price"><span>now</span> ${content.priceNow}</p>`
          : ""
      }

      </div>
    </div>
    <div class="${ID}_content" style="${
      content.colour
        ? `background-color: ${content.colour.hex}; color: ${content.colour.text}`
        : ""
    }">
    ${
      content.colour && content.colour.label
        ? `<p class="${ID}_colour" style="color: ${content.colour.hex}">${content.colour.label}</p>`
        : ""
    }
    <p class="${ID}_title">${content.title}</p>
    ${content.text ? `<p>${content.text}</p>` : ""}
      ${
        content.button
          ? `<a class="${ID}_button" href="${content.button.url}">${content.button.label}</a>`
          : ""
      }
    </div>
  `
  );

  return elm;
};
