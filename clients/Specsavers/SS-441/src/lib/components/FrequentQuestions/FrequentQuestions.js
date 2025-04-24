import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

export default function FrequentQuestions(title, questionsAndAnswers) {
	const element = document.createElement("div");
	element.classList.add(`${ID}-frequent-questions`, `${ID}-container`);
	element.innerHTML = /* html */ `
	<h2 class="${ID}-frequent-questions__title">${title}</h2>
	<ul class="${ID}-frequent-questions__list">
		${questionsAndAnswers
			.map(
				({ question, answer }) => /* html */ `
			<li class="${ID}-frequent-questions__list-item">
				<h3 class="${ID}-frequent-questions__list-item-question">${question}</h3>
				<p class="${ID}-frequent-questions__list-item-answer">${answer}</p>
			</li>
		`
			)
			.join("")}
	</ul>
	`;

	return element;
}
