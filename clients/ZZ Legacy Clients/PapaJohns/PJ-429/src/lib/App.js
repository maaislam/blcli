import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import shared from "../../../../../core-files/shared";
import { fireEvent } from "../../../../../core-files/services";

import Container from "./components/Container/Container";

const { ID } = shared;

export default function App() {
	const [isOpenState, setIsOpenState] = useState(false);
	const [isLoadingState, setIsLoadingState] = useState(false);
	const [drinkPriceState, setDrinkPriceState] = useState(2.29);

	function getDrinkUrl() {
		const menuLinks = document.querySelectorAll(".sectionsMenu > li a");

		for (const link of menuLinks) {
			if (link.textContent === "Drinks") return link.href;
		}
	}

	function redirectToBasketPage() {
		setIsOpenState("overlay");
		window.location.pathname = "/basket-confirmation.aspx";
	}

	function addItemToBasket() {
		setIsLoadingState(true);
		fireEvent("Add item to basket");

		fetch(
			"https://www.papajohns.co.uk/services/speediorder.aspx?dvpromo=PEPSIMAXUP&dvproducts=C3731D9A-DCB8-4B19-B0A4-DE4EE4531EBB"
		).then(() => redirectToBasketPage());
	}

	function lockBodyScroll() {
		if (isOpenState) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}

	useEffect(() => lockBodyScroll(), [isOpenState]);

	useEffect(() => {
		setIsOpenState("overlay");

		fetch(getDrinkUrl())
			.then((r) => r.text())
			.then((html) => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, "text/html");

				const pepsiMax = doc.querySelector(
					"option[value='c3731d9a-dcb8-4b19-b0a4-de4ee4531ebb']"
				);

				const price = pepsiMax.textContent.match(/(?<=£).*/)[0];

				setDrinkPriceState(price);

				setTimeout(() => setIsOpenState(true), 250);
			});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			document
				.querySelector(`.${ID}-transitions-only-after-page-load`)
				.classList.remove(`${ID}-transitions-only-after-page-load`);
		}, 250);
	}, []);

	return (
		<div className={`${ID}-app`} data-open={isOpenState}>
			<Container
				drinkPrice={drinkPriceState}
				buttonState={isLoadingState}
				onAdd={addItemToBasket}
				onClose={() => {
					if (!isLoadingState) {
						redirectToBasketPage();
						fireEvent("Close modal");
					}
				}}
			/>
		</div>
	);
}
