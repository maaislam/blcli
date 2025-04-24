const isIncludingVat = () => {
  const vatElemWrapper = document.querySelector('.sh-top--vat');
  const toggleElem = vatElemWrapper.querySelector('.toggle');

  return toggleElem.classList.contains('toggle--off') ? false : true;
};

export default isIncludingVat;
