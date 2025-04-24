const scrollToSection = (href) => {
    const targetSection = document.querySelector(href);
    let top = targetSection.offsetTop;
    // Account for height of top bar
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
};

export default scrollToSection;