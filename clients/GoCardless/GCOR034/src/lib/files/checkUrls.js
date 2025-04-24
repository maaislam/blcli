export const checkUrls = function () {
    if (window.GCOR034TargetUrls) {
        return window.GCOR034TargetUrls.some(function (targetUrl) {
            if (window.location.href.includes(targetUrl)) {
                return true;
            }
        });
    }
}