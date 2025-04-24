import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function Grid() {
	const el = document.createElement("div");
	el.classList.add(`${ID}-grid`);

	return el;
}
