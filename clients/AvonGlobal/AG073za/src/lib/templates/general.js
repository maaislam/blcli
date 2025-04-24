import shared from "../../../../../../core-files/shared";
const { ID } = shared;

export default (content) => {
  // Make element.
  const elm = document.createElement("div");
  elm.classList.add(`${ID}_general`);
  elm.style.backgroundImage = `url('${content.image}')`;

  // Contents.
  elm.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${ID}_content">
    ${content.textBefore ? `<p>${content.textBefore}</p>` : ""}
      <p class="${ID}_quote">${content.title}</p>
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
