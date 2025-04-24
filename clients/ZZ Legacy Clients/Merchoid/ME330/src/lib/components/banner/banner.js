import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const readMoreToggle = (onClick) => {
  const root = document.createElement("button");
  root.classList.add(`${ID}-banner__read-more-button`);
  root.textContent = "Read more";
  root.addEventListener("click", onClick);

  return root;
};

export default function banner({ title, text, logo, image = null }) {
  const root = document.createElement("header");
  root.classList.add(`${ID}-banner`);

  if (image) {
    /**
     * TODO: Handle passed in image ("luxury" image)
     */
    root.innerHTML = /* html */ `
			<div class="${ID}-banner__container"></div>
		`;
  } else {
    root.innerHTML = /* html */ `
			<div class="${ID}-banner__container">
				<img class="${ID}-banner__logo" src="${logo}" alt="${title}" />
				<h1 class="${ID}-banner__title">${title}</h1>
				${
          text
            ? /* html */ `<p class="${ID}-banner__text" data-collapsing-text>${text}</p>`
            : ""
        }
			</div>
		`;
  }

  const getWordCount = (text) => {
    const words = text.split("");
    return words.length;
  };

  const MAX_WORD_COUNT = 150;
  const collapsingText = root.querySelector("[data-collapsing-text]");
  const rootContainer = root.querySelector(`.${ID}-banner__container`);

  if (text && getWordCount(collapsingText.textContent) > MAX_WORD_COUNT) {
    collapsingText.setAttribute("collapsed", "");

    rootContainer.append(
      readMoreToggle((e) => {
        if (collapsingText.hasAttribute("collapsed")) {
          collapsingText.removeAttribute("collapsed");
          e.target.textContent = "Show less";

          return;
        }

        collapsingText.setAttribute("collapsed", "");
        e.target.textContent = "Read more";
      })
    );
  }

  return root;
}
