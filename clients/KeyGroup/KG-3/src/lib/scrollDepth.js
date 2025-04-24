import debounce from "lodash/debounce";

const scrollDepth = (fireEvent) => {
	const getScrollPercent = () => {
		let scrollTop = window.scrollY;
		let docHeight = document.body.scrollHeight;
		let winHeight = window.innerHeight;
		let scrollPercent = scrollTop / (docHeight - winHeight);
		return Math.round(scrollPercent * 100);
	};

	window.addEventListener(
		"scroll",
		debounce(() => {
			fireEvent(`Scroll Depth ${getScrollPercent()}%`);
		}, 100)
	);
};
export default scrollDepth;
