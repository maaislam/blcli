export const makeElementSticky = (elem) => {
    var stickyElement = document.querySelector(`${elem}`);
    var stickyElementOffset = stickyElement.offsetTop - 100;
    window.addEventListener("scroll", function () {
        if (window.pageYOffset >= stickyElementOffset) {
            stickyElement.classList.add("make-sticky");
        } else {
            stickyElement.classList.remove("make-sticky");
        }
    });
};