import shared from "../../../../../../../core-files/shared";
import svg from "../svg/svg";

const { ID } = shared;

const tab = (icon, text, attribute) => {
  const root = document.createElement("li");
  root.classList.add(`${ID}-category-tab`);
  root.innerHTML = /* html */ `
		<button data-category='${attribute}'>
			<span class="${ID}-category-tab__icon">${svg(icon)}</span>
			<span class="${ID}-category-tab__content">
				<span class="${ID}-category-tab__content-text">Shop</span>
				<h2 class="${ID}-category-tab__content-title">${text}</h2>
			</span>
		</button>
	`;

  return root;
};

export default function categoryTabs(data) {
  const root = document.createElement("ul");
  root.classList.add(`${ID}-category-tabs`);

  const tabs = data.map((t) => tab(t.icon, t.text, t.attribute));
  tabs.forEach((t) => root.append(t));

  return root;
}
