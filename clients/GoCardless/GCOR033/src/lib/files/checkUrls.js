export const checkUrls = function () {
    if (window.GCOR033TargetUrls) {
        return window.GCOR033TargetUrls.some(function (targetUrl) {
            if (window.location.href.includes(targetUrl)) {
                return true;
            }
        });

    }
}