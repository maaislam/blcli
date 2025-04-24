import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const header = (text) => {
  const el = document.createElement("h2");
  el.classList.add(`${ID}-header`);
  el.textContent = text;

  return el;
};

export default header;
