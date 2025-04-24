import shared from "../shared";

export function scrollToElement(element) {
    let topPosition;

    if(shared.VARIATION === '1') {
        if(window.innerWidth >= 767) {
            topPosition = element.getBoundingClientRect().top + window.scrollY;
        } else {
            topPosition = element.getBoundingClientRect().top + window.scrollY - 80;
        }
    } else {
        topPosition = element.getBoundingClientRect().top + window.scrollY - 80;
    }
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: topPosition,
    });
}