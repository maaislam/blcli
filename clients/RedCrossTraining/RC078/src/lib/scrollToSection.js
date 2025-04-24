const scrollToSection = (href) => {
    const topBar = document.querySelector('.HB-Bar');
    let topBarHeight = topBar?.offsetHeight;
    const targetSection = document.querySelector(href);
    let top = targetSection.offsetTop;
    // Account for height of top bar
    top = topBar ? top - topBarHeight : top;
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
};

export default scrollToSection;