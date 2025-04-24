var isMatch = false;

if (
    document.querySelector('#pdpMain') ||
    document.querySelector('#search-result-items')
) {
    isMatch = true;
}

return isMatch;


let isMatch = false;

if (
    window.jQuery &&
    jQuery("script#pdpData").length &&
    JSON.parse(jQuery("script#pdpData").text()).categoryType === "fashion"
) {
    isMatch = true;
}

return isMatch;