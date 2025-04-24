import HeroBanner from "./components/HeroBanner/HeroBanner";
import ThreeCards from "./components/ThreeCards/ThreeCards";
import TwoColumnLists from "./components/TwoColumnLists/TwoColumnLists";
import FrequentQuestions from "./components/FrequentQuestions/FrequentQuestions";
import Callout from "./components/Callout/Callout";
import { addTracking } from "./utils";

export default function v1() {
	(function renderHeroBanner() {
		const currentEl = document.querySelector(".sib-banner.has-no-cta");
		const newEl = HeroBanner(
			"Book an OCT Scan",
			"Upgrade your eye test to catch problems before they affect your vision",
			"https://blcro.fra1.digitaloceanspaces.com/SS-399/b1.png",
			"Book your scan",
			"/book/location"
		);

		if (currentEl) {
			currentEl.insertAdjacentElement("afterend", newEl);
			currentEl.remove();
			addTracking(newEl, "Hero Banner", "1");
		}
	})();

	(function renderThreeCards() {
		const currentEl = document.querySelector(".sib-split-youtube-video-and-content");
		const newEl = ThreeCards(
			"",
			[
				{
					title: "What is an OCT Scan?",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/layers.svg",
					text: "Our OCT device lets us take a 3D image of your eye so we can see your eye health in more detail.",
				},
				{
					title: "Why Should I Get One?",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/check.svg",
					text: "An OCT scan allows your optician to identify eye problems before they start to affect your vision.",
				},
				{
					title: "How Much Does an OCT Scan Cost?",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/pound.svg",
					text: "From only £10, you will get a full understanding of your eye health. ",
				},
			],
			"Book your scan",
			"/book/location"
		);

		if (currentEl) {
			currentEl.insertAdjacentElement("afterend", newEl);
			currentEl.remove();
			addTracking(newEl, "Three Cards (What is an OCT scan)", "2");

			(function removeOtherContent() {
				document.querySelector(".sib-custom-html").remove();
				document.querySelectorAll(".sib-text-multiple-column")[0].remove();
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
			addTracking(newEl, "Two Column Lists (Do I need an OCT scan)", "3");
		}
	})();

	(function renderThreeCards() {
		const currentEls = document.querySelectorAll(".sib-cards, .sib-accordion");
		const newEl = ThreeCards(
			"What happens next?",
			[
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/1.svg",
					text: "Click <strong>“book a scan”</strong> below and select an OCT scan when we ask you.",
				},
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/2.svg",
					text: "An OCT scan allows your optician to identify eye problems before they start to affect your vision.",
				},
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/3.svg",
					text: "From only £10, you will get a full understanding of your eye health.",
				},
			],
			"Book your scan",
			"/book/location"
		);

		if (currentEls) {
			currentEls[0].insertAdjacentElement("afterend", newEl);

			currentEls.forEach((el) => el.remove());
			addTracking(newEl, "Three Cards (What happens next)", "4");
		}
	})();

	(function renderFrequentQuestions() {
		const entry = document.querySelector("div.dev");
		const newEl = FrequentQuestions("Frequently Asked Questions", [
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
		]);

		if (entry) {
			entry.insertAdjacentElement("beforeend", newEl);
			addTracking(newEl, "Frequent Questions", "5");
		}
	})();

	(function renderThreeCards() {
		const entry = document.querySelector("div.dev");
		const newEl = ThreeCards(
			"Need more information?",
			[
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/machine.svg",
					text: "<strong>An optical coherence tomography scan</strong> (OCT) uses light to take over 1,000 images of the back of your eye, looking right back to the optic nerve.<br /><br /> An OCT scan is a non-invasive and painless procedure, using laser imaging to create a map of your eye.",
				},
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/cake.svg",
					text: "Imagine it like a cake – we can see the top of the cake and the icing using the 2D fundus camera, but the 3D image produced from an OCT scan slices the cake in half and turns it on its side so we can see all the layers inside. Our opticians can then map out and measure the thickness of these layers to get an even clearer idea of your eye health.",
				},
				{
					title: "",
					image: "https://blcro.fra1.digitaloceanspaces.com/SS-399/layers.svg",
					text: "A layered image is then created, that gives us an incredibly accurate picture of your eye and its structures. The images will then be stored so we can note changes over time. This lets us notice subtle changes in your eye health that may allow us to highlight issues before they start to affect your vision.",
				},
			],
			"",
			""
		);

		if (entry) {
			entry.insertAdjacentElement("beforeend", newEl);
			addTracking(newEl, "Three Cards (Need more information)", "6");
		}
	})();

	(function renderCallout() {
		const entry = document.querySelector("div.dev");
		const newEl = Callout(
			"Book an OCT scan today and get the full picture of your eye health",
			"Book your scan",
			"/book/location"
		);

		if (entry) {
			entry.insertAdjacentElement("beforeend", newEl);
			addTracking(newEl, "CTA Callout", "7");
		}
	})();
}
