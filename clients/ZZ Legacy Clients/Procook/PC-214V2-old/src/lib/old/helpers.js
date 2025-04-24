export const getUrlParameter = (name, url) => {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
	const regexS = `[\\?&]${name}=([^&#]*)`;
	const regex = new RegExp(regexS);
	const results = regex.exec(url);
	return results == null ? null : results[1];
};

/**
 * Helper add url parameter
 */
export const addUrlParameter = (url, parameterName, parameterValue, atStart) => {
	const replaceDuplicates = true;
	let cl;
	let urlhash;

	parameterName = encodeURIComponent(parameterName);
	parameterValue = encodeURIComponent(parameterValue);

	if (url.lastIndexOf("#") > 0) {
		cl = url.lastIndexOf("#");
		urlhash = url.substring(cl, url.length);
	} else {
		urlhash = "";
		cl = url.length;
	}

	const sourceUrl = url.substring(0, cl);
	const urlParts = sourceUrl.split("?");
	let newQueryString = "";

	if (urlParts.length > 1) {
		const parameters = urlParts[1].split("&");
		for (let i = 0; i < parameters.length; i += 1) {
			const parameterParts = parameters[i].split("=");
			if (!(replaceDuplicates && parameterParts[0] === parameterName)) {
				if (newQueryString === "") {
					newQueryString = "?";
				} else {
					newQueryString += "&";
				}
				newQueryString += `${parameterParts[0]}=${parameterParts[1] ? parameterParts[1] : ""}`;
			}
		}
	}

	if (newQueryString === "") {
		newQueryString = "?";
	}

	if (atStart) {
		newQueryString = `?${parameterName}=${parameterValue}${
			newQueryString.length > 1 ? `&${newQueryString.substring(1)}` : ""
		}`;
	} else {
		if (newQueryString !== "" && newQueryString !== "?") {
			newQueryString += "&";
		}
		newQueryString += `${parameterName}=${parameterValue ? parameterValue : ""}`;
	}

	return urlParts[0] + newQueryString + urlhash;
};

/**
 * Helper to update url parameter
 * @param {String} uri url/uri to update
 * @param {String} key Name of query param
 * @param {String} value Value to update to
 */
export const updateUrlParameter = (uri, key, value) => {
	const re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
	if (uri.match(re)) {
		return uri.replace(re, "$1" + key + "=" + value + "$2");
	} else {
		let hash = "";
		if (uri.indexOf("#") !== -1) {
			hash = uri.replace(/.*#/, "#");
			uri = uri.replace(/#.*/, "");
		}
		const separator = uri.indexOf("?") !== -1 ? "&" : "?";
		return uri + separator + key + "=" + value + hash;
	}
};

export const checkNonStickParameter = () => {
	const nonStick = [
		"gourmetnonstick",
		"aluminiumceramicnonstick",
		"aluminiumgranitenonstick",
		"aluminiumnonstick",
		"stainlesssteelnonstick",
	];

	let isNonStickParam = true;
	for (let i = 0; i < nonStick.length; i += 1) {
		if (location.search.indexOf(nonStick[i]) == -1) {
			isNonStickParam = false;
			break;
		}
	}
	return isNonStickParam;
};
