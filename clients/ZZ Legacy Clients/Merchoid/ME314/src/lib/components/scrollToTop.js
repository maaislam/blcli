const scrollToTop = (ID) => {
  const scrollToTop = document.createElement("div");
  scrollToTop.classList.add(`${ID}-scroll-to-top`);
  scrollToTop.setAttribute("data-scroll-button", "");
  scrollToTop.innerHTML = /* HTML */ `
    <a href="#filters">
      <span>Back to filters</span>
    </a>
  `;

  return scrollToTop;
};

export default scrollToTop;
