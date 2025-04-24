console.log("Flight Grid change triggered..");

const readCookie = (cookieName) => {
	let name = cookieName + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

// We are reading the test cookie, because dohop want to compare conversions from the control vs v1.
// and the only way we can append utms to the control, is by making variant 1 the control. And variant 1 is variant 2
// So the real control will have 0%  traffic
// Variant 1 (aka new control) will have 50% traffic
// Variant 2 (aka new V1) will have 50% traffic
function applyControlUTMParams(variantValue) {
    // control
    if (variantValue === '1') {
        AngularEj.Services.Worldwide.WorldwideDeepLinkService.prototype.BuildUrlTrackingQueryString = function(n) {
            var t = "";
            return t + "utm_source=" + "easyjet-grid" +  "&utm_medium=" + "referral" + "&utm_campaign=" + "variant_control_desktop";
        };
        // variant 1
    } else if (variantValue === '2') {
        AngularEj.Services.Worldwide.WorldwideDeepLinkService.prototype.BuildUrlTrackingQueryString = function(n) {
            var t = "";
            return t + "utm_source=" + "easyjet-grid" +  "&utm_medium=" + "referral" + "&utm_campaign=" + "variant_1_desktop";
        };
    };

};

let originalCookie = readCookie("_gaexp");
let variantValue = "";

if (originalCookie.includes("!")) {
    let read  = readCookie("_gaexp").split("!");
    for (let i = 0; i < read.length; i++) {
        if (read[i].includes("jYpirp1JSUuy2QzbyrTHsA")) {
            variantValue = read[i].split('.').slice(-1)[0];
            console.log("variant", variantValue);
            applyControlUTMParams(variantValue);
        };
    };
} else {
    let read  = readCookie("_gaexp");
    variantValue = read.split('.').slice(-1)[0];
    console.log("variant", variantValue);
    experimentID = "jYpirp1JSUuy2QzbyrTHsA";
    applyControlUTMParams(variantValue);
};

