import shared from "../../../../../../core-files/shared";
const { ID } = shared;

export default (content) => {
  // Make element.
  const elm = document.createElement("div");
  elm.classList.add(`${ID}_category`);

  // Contents.
  elm.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${ID}_imageWrap">
      <img class="${ID}_image" src="${content.image}" />
    </div>
    <div class="${ID}_content">
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
