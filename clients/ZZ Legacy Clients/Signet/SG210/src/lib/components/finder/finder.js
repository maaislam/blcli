import { Fragment, h } from "preact";
import { useState, useEffect } from "preact/hooks";
// import shared from "../../../../../../../core-files/shared";
import config from "../../data/config";
import data from "../../data/finderdata";
import images from "../../data/imageData";
import FinderBanner from "../banner/banner";
import { Option } from "./optionTypes";

const ProductFinder = () => {
	const [finderState, setFinderState] = useState(false);
	const [currentOptions, setCurrentOptions] = useState([]);
	const [chosenOptionsArray, setChosenOptionsArray] = useState([]);
	const [loaderState, setLoaderState] = useState(false);

	const getValueFromPath = (obj, path) => {
		let current = obj;

		for (let i = 0; i < path.length; i += 1) {
			if (current[path[i]]) {
				current = current[path[i]];
			}
		}

		return current;
	};

	const goBack = () => {
		if (chosenOptionsArray.length === 0) return;

		setChosenOptionsArray((s) => s.slice(0, -1));
	};

	const selectAnswer = (name) => {
		if (chosenOptionsArray.length < config.questions.length) {
			setChosenOptionsArray((s) => [...s, name]);
		}
	};

	const optionImage = (name) => {
		if (images[name]) {
			return images[name];
		}
	};

	const resetFinder = () => {
		setFinderState(false);
		setCurrentOptions([]);
		setChosenOptionsArray([]);
		setLoaderState(false);
	};

	useEffect(() => {
		if (chosenOptionsArray.length < config.questions.length) {
			setCurrentOptions(Object.keys(getValueFromPath(data, chosenOptionsArray)));
		}
	}, [setCurrentOptions, chosenOptionsArray]);

	useEffect(() => {
		if (chosenOptionsArray.length === config.questions.length) {
			setLoaderState(true);

			setTimeout(() => {
				window.location.href = getValueFromPath(data, chosenOptionsArray);
			}, 1000);
		}
	}, [chosenOptionsArray]);

	return (
		<Fragment>
			<FinderBanner
				title={config.bannerTitle}
				onClick={() => setFinderState(true)}
				content={config.bannerContent}
				backgroundImg={
					window.innerWidth > 767 ? config.bannerCreative : config.bannerCreativeMobile
				}
			></FinderBanner>
			<div
				className={finderState ? "finder-overlay active" : "finder-overlay"}
				onClick={() => resetFinder()}
			></div>
			<div className={finderState ? "product-finder active" : "product-finder"}>
				<div className="finder-loader" style={loaderState ? "display: flex;" : "display: none;"}>
					<span style={{ backgroundImage: "url('" + config.loaderIcon + "')" }}></span>
					<p>{config.loaderText}</p>
				</div>
				<div className="finder-actions">
					<div className="finder-close" onClick={() => resetFinder()}></div>
					<button
						className="textLink back"
						style={chosenOptionsArray.length + 1 == 1 ? "display : none;" : "display:flex"}
						onClick={() => goBack()}
					>
						<span></span>Back
					</button>
				</div>
				<div className="finder-container">
					<div className="question">
						<span className="questionNo">
							Question{" "}
							{chosenOptionsArray.length < config.questions.length
								? chosenOptionsArray.length + 1
								: chosenOptionsArray.length}{" "}
							of {config.questions.length}
						</span>
						<h2>
							{chosenOptionsArray.length < config.questions.length
								? config.questions[chosenOptionsArray.length]
								: config.questions[config.questions.length - 1]}
						</h2>
					</div>
					<div className="options" related-question={chosenOptionsArray.length}>
						{currentOptions.map((item) => (
							<Option
								key={item}
								name={item}
								onClick={() => selectAnswer(item)}
								image={optionImage(item)}
							></Option>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductFinder;
