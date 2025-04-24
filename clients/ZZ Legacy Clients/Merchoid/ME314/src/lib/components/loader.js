const loader = (ID) => {
  const loader = document.createElement("div");
  loader.classList.add(`${ID}-loader`);
  loader.setAttribute("data-loader", "");
  loader.innerHTML = /* HTML */ `<span></span>`;

  return loader;
};

export default loader;
