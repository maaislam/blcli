import Accordion from ".";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const summary = (text, id) => {
  const summary = document.createElement("details");
  summary.setAttribute("data-id", id);
  summary.classList.add(`${ID}-details`);
  summary.innerHTML = /* html */ `
	<summary>
		${text}
		<span class="${ID}-cross"></span>
	</summary>
	<div class="${ID}-content"></div>
	`;

  new Accordion(summary);

  return summary;
};

export default summary;
