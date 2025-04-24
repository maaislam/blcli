export const makeElementSticky = (elem) => {
    // Get the sticky element
    var stickyElement = document.querySelector(`${elem}`);

    // Get the offset position of the sticky element
    var stickyElementOffset = stickyElement.offsetTop - 100;

    // Add a scroll event listener to the window
    window.addEventListener("scroll", function () {
        // Check if the user has scrolled past the offset position of the sticky element
        if (window.pageYOffset >= stickyElementOffset) {
            // If they have, add the "sticky" class to the sticky element
            stickyElement.classList.add("make-sticky");
        } else {
            // If they haven't, remove the "sticky" class from the sticky element
            stickyElement.classList.remove("make-sticky");
        }
    });
};