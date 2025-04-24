import shared from "../../../../../../core-files/shared";
const { ID } = shared;

export default (content) => {
  // Make element.
  const elm = document.createElement("div");
  elm.classList.add(`${ID}_discountNoCode`);
  elm.style.backgroundImage = `url("${content.image}")`;

  // Contents.
  elm.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${ID}_content">
      <p>${content.textBefore}</p>
      <img src="${content.discount}" class="${ID}_discountImage" />
      ${content.textAfter ? `<p>${content.textAfter}</p>` : ""}
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
