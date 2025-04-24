import HeroBanner from "./components/HeroBanner/HeroBanner";
import Comparison from "./components/Comparison/Comparison";
import TwoColumnLists from "./components/TwoColumnLists/TwoColumnLists";
import ThreeCards from "./components/ThreeCards/ThreeCards";
import OneColumnTabs from "./components/OneColumnTabs/OneColumnTabs";
import Callout from "./components/Callout/Callout";

import shared from "../../../../../core-files/shared";
import { addTracking } from "./utils";

export default function v2() {
	(function renderHeroBanner() {
		const currentEl = document.querySelector(".sib-banner.has-no-cta");
		const newEl = HeroBanner(
			"Book an OCT Scan",
			"We think everyone deserves access to advanced eyecare. Book a scan to get the full picture of your eye health",
			"https://blcro.fra1.digitaloceanspaces.com/SS-399/b2.png",
			"Book your scan",
			"/book/location"
		);

		if (currentEl) {
			currentEl.insertAdjacentElement("afterend", newEl);
			currentEl.remove();
			addTracking(newEl, "Hero Banner", "1");
		}
	})();

	(function renderComparison() {
		const currentEl = document.querySelector(".sib-split-youtube-video-and-content");
		const newEl = Comparison(
			"What is an OCT Scan?",
			[
				{
					image:
						"https://content.specsavers.com/sib/content-pages/img/split/Fundas-OCT_280x205.jpg",
					title: "Standard Eye Test Imaging",
					listItems: [
						{
							text: "2D image of the back of your eye (Retina)",
						},
						{
							text: "Checks your current eye health as well as how well you can see.",
						},
						{
							text: "Useful for identifying current eye health concerns",
						},
					],
					isHighlighted: false,
				},
				{
					image: "https://content.specsavers.com/sib/content-pages/img/split/OCT-scan_280x205.jpg",
					title: "OCT Scan",
					listItems: [
						{
							text: "3D topological image of the back of your eye (Retina, Vitreous, Macula & Optic Nerve)",
						},
						{
							text: "Checks your current eye health, and helps identify potential future risks before symptoms show",
						},
						{
							text: "Useful for identifying current and future eye health concerns",
						},
					],
					isHighlighted: true,
				},
			],
			"Book your scan",
			"/book/location"
		);

		if (currentEl) {
			currentEl.insertAdjacentElement("afterend", newEl);
			currentEl.remove();
			addTracking(newEl, "Comparison (What is an OCT scan", "2");

			(function removeOtherContent() {
				document.querySelector(".sib-custom-html").remove();
				document.querySelectorAll(".sib-text-multiple-column")[0].remove();
				document.querySelectorAll(".sib-text-multiple-column")[1].remove();
			})();
		}
	})();

	(function renderTwoColumnLists() {
		const currentEls = document.querySelectorAll(".sib-text-multiple-column, .sib-cta-ribbon");
		const newEl = TwoColumnLists("Do I Need an OCT Scan?", [
			{
				title: "Are you over 25?",
				description:
					"OCT scans help detect potentially sight threatening conditions that generally don’t have any symptoms until they start to have an impact on your vision, including:",
				items: [
					{
						text: "Glaucoma (An OCT scan can help detect glaucoma up to four years earlier than traditional methods.)",
					},
					{
						text: "Diabetic retinopathy",
					},
					{
						text: "Detached retina",
					},
					{
						text: "Age-related macular degeneration",
					},
					{
						text: "Macular hole",
					},
				],
			},
			{
				title: "Do you have any diabetic conditions?",
				description: "We recommend an OCT scan even if you have an annual diabetic check up:",
				items: [
					{
						text: "While both the diabetic screening check and OCT involve taking images of the back of the eye, there are significant differences.",
					},
					{
						text: "Diabetic checks involve a fundus picture – this is an image of the surface of the back of the eye (the retina) also known as digital retinal photography. OCT images allow us to look at the many layers beneath the surface of the retina, which helps us to spot changes to eye health earlier than just looking at the surface.",
					},
					{
						text: "OCT scans also help in the detection of a range of other eye problems, not just those that are linked to diabetes.",
					},
				],
			},
		]);

		if (currentEls) {
			currentEls[0].insertAdjacentElement("afterend", newEl);
			currentEls.forEach((el) => el.remove());
			addTracking(newEl, "Two Column Lists (Do I Need an OCT scan)", "3");
		}
	})();

	(function renderThreeCards() {
		const currentEl = document.querySelectorAll(".sib-cards")[0];
		const newEL = ThreeCards(
			"What should I do?",
			[
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/1.svg",
					text: "Click <strong>“book a scan”</strong> below and select an OCT scan when we ask you.",
				},
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/2.svg",
					text: "Your optician will perform a quick OCT scan as part of your eye test, which will take a matter of seconds.",
				},
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/3.svg",
					text: "Your optician will talk you through the results and you can pay for the OCT scan at the same time as your regular eye test.",
				},
			],
			"Book your scan",
			"/book/location"
		);

		if (currentEl) {
			currentEl.insertAdjacentElement("afterend", newEL);
			currentEl.remove();
			addTracking(newEL, "Three Cards (What should I do)", "4");
		}
	})();

	(function editFaqElement() {
		const currentEl = document.querySelector(".sib-accordion");
		const currentElTitle = currentEl.querySelector("h2");
		const currentItems = currentEl.querySelectorAll(".dev-tool__header");

		currentElTitle.textContent = "Frequently Asked Questions";

		const data = [
			{
				question: "Does it Hurt?",
				answer: "Not at all! It’s a quick, painless procedure. Just like having a photo taken.",
			},
			{
				question: "Is it like having an MRI?",
				answer:
					"No, it’s very different from having an MRI; You simply sit in a chair and look into the device for a matter of seconds.",
			},
			{
				question: "Does it take long?",
				answer: "No, the scan itself will take a matter of seconds!",
			},
			{
				question: "How much does it cost?",
				answer: "An OCT scan is in addition to your eye test and carries a small fee of £10.",
			},
			{
				question: "What do I get from having this Scan?",
				answer:
					"Even if your optician does not find any health concerns, we can use your OCT scans to see the change in your eye health over time, allowing us to identify concerns much faster.",
			},
		];

		if (currentEl) {
			currentItems.forEach((item, idx) => {
				if (data[idx]) {
					const question = item.querySelector("h3.sib-accordion-question");
					const answer = item.nextElementSibling.querySelector(".sib-accordion-answer p");

					question.textContent = data[idx].question;
					answer.textContent = data[idx].answer;
				} else {
					item.remove();
				}
			});

			addTracking(currentEl, "FAQ Accordion", "5");
		}
	})();

	(function renderOneColumnTabs() {
		const entry = document.querySelector(".sib-accordion");
		const newEl = OneColumnTabs("Need more information?", [
			{
				image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/machine.svg",
				text: "<strong>An optical coherence tomography scan</strong> (OCT) uses light to take over 1,000 images of the back of your eye, looking right back to the optic nerve.",
			},
			{
				image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/cake.svg",
				text: "<strong>Imagine it like a cake</strong> – we can see the top of the cake and the icing using the 2D fundus camera, but the 3D image produced from an OCT scan slices the cake in half and turns it on its side so we can see all the layers inside. Our opticians can then map out and measure the thickness of these layers to get an even clearer idea of your eye health.",
			},
			{
				image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/layers.svg",
				text: "<strong>A layered image is then created,</strong> that gives us an incredibly accurate picture of your eye and its structures. The images will then be stored so we can note changes over time. This lets us notice subtle changes in your eye health that may allow us to highlight issues before they start to affect your vision.",
			},
		]);

		if (entry) {
			entry.insertAdjacentElement("afterend", newEl);
			addTracking(newEl, "One Column Tabs (Need more information)", "6");
		}
	})();

	(function renderCallout() {
		const entry = document.querySelector(`.${shared.ID}-one-column-tabs`);
		const newEl = Callout(
			"Book an OCT scan today and get the full picture of your eye health",
			"Book your scan",
			"/book/location",
			"Or learn more below:"
		);

		if (entry) {
			entry.insertAdjacentElement("afterend", newEl);
			addTracking(newEl, "CTA Callout", "7");
		}
	})();
}
