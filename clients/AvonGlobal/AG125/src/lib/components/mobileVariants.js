import mobileVariant from './mobileVariant';

const mobileVariantDropdown = (id, sliderItem) => {
  const allVariants = sliderItem.querySelectorAll(`.${id}__variant-item`);

  console.log('🚀 ~ mobileVariantDropdown ~ allVariants', allVariants);

  const variantSelectModal = `<div class="${id}__mobile-variant-selector-wrapper">
  <div class="${id}_overlay"></div>
  <div class="${id}__mobile-variant-list-wrapper">
    <div class="${id}__heading">
      <div class="${id}__close-icon">
        <svg aria-hidden="true" class="icon icon-close" viewBox="0 0 12 12" style="width: 12px;height: 12px;"><path d="M12 .978 11.022 0 6 5.029.978-.001 0 .98 5.029 6 0 11.023.978 12 6 6.97 11.022 12l.978-.978L6.971 6 12 .978z"></path></svg>
      </div>
      <div>Select a Shade</div>
    </div>
    ${[...allVariants].map((variant, index) => mobileVariant(id, variant)).join('')}
  </div>
</div>`;

  return variantSelectModal;
};

export default mobileVariantDropdown;
