const closeDropdown = (id) => {
  document.querySelector(`.${id}__variant-dropdown-wrapper.open`) &&
    document.querySelector(`.${id}__variant-dropdown-wrapper.open`).classList.remove('open');
  document.querySelector(`.${id}__variant-dropdown-wrapper[aria-expanded="true"]`) &&
    document.querySelector(`.${id}__variant-dropdown-wrapper[aria-expanded="true"]`).setAttribute('aria-expanded', false);
  document.querySelector(`.${id}__mobile-variant-selector-wrapper`) &&
    document.querySelector(`.${id}__mobile-variant-selector-wrapper`).remove();
};

export default closeDropdown;
