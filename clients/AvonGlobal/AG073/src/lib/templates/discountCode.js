import shared from "../../../../../../core-files/shared";
const { ID } = shared;

export default (content) => {
  // Make element.
  const elm = document.createElement("div");
  elm.classList.add(`${ID}_discountCode`);

  // Contents.
  elm.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${ID}_content">
      <p class="${ID}_before">${content.textBefore}</p>
      <p class="${ID}_discount">${content.discount}</p>
      <p class="${ID}_code">${content.code}</p>
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
