import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function filterMarker(text, onClick) {
  const root = document.createElement("button");
  root.classList.add(`${ID}-filter-marker`);
  root.textContent = text.replaceAll("-", " ");
  root.addEventListener("click", onClick);

  return root;
}
