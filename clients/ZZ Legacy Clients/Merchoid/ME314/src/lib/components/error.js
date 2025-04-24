const error = (ID) => {
  const error = document.createElement("div");
  error.classList.add(`${ID}-error`);
  error.innerHTML = /* HTML */ `
    <span></span>
    <h3>No products found that match your selected filters</h3>
  `;

  return error;
};

export default error;
