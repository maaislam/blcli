import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

const loader = () => {
  const loader = document.createElement("div");
  loader.classList.add(`${ID}-loader`);

  const loaderInner = document.createElement("div");
  loaderInner.classList.add(`${ID}-loader-inner`);
  loaderInner.textContent = "Loading";

  loader.append(loaderInner);

  return loader;
};

export default loader;
