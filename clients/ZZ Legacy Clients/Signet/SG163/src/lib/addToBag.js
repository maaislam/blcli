const addToBag = () => {
  const select = document.querySelector('select[name="productNumber"]');
  if(select) {
    const value = select.options[select.selectedIndex].value;
    if (!value) {
      document
        .querySelector("form#basketForm")
        .scrollIntoView({ block: "center" });
    }
  }
};

export default addToBag;
