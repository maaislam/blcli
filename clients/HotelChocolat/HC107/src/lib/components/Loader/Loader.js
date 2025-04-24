import shared from "../../../../../../../core-files/shared";
const { ID } = shared;

const Loader = () => {
  const el = document.createElement("div");
  el.classList.add(`${ID}-loader`);

  el.innerHTML = /* html */ `
		<p class="${ID}-visually-hidden">Loading</p>
		<span></span>
	`;

  return el;
};

export default Loader;
