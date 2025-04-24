const productActionHandler = (id, fireEvent, addToCart) => {
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    // console.log(target);

    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
    const inputBox = target.closest(`.${id}__cartbtn--container`)?.querySelector('input');
    //console.log(inputBox);

    if (targetMatched(`.${id}__plus-btn`)) {
      inputBox.value = parseInt(inputBox.value) + 1;
      //console.log('Interactions with quantity +');
    } else if (targetMatched(`.${id}__minus-btn`)) {
      inputBox.value = parseInt(inputBox.value <= 0 ? 2 : inputBox.value) - 1;
      //console.log('Interactions with quantity -');
    } else if (targetMatched(`.add-to-cart`)) {
      const card = target.closest(`.ProductListItem`) || target.closest(`.Modal`);
      const currentSku = target.getAttribute('data-sku');

      card.classList.add('adding');
      console.log(currentSku);

      addToCart(currentSku, parseInt(inputBox.value)).then((res) => {
        //fireEvent('Add to bag of hero product from homepage');
        if (document.getElementById(`${id}_ModalImages_modal`)?.classList.contains('Visible')) {
          fireEvent('User clicks add to bag in quick view box');
        }
        location.reload();
        //   setTimeout(() => {
        //     card.classList.remove('adding');
        //     console.log(res);
        //     //const imgSrc = card.querySelector(`.${id}__img--wrapper>img`).getAttribute('src');
        //     //updateMinicart(res, imgSrc);
        //   }, 1500);
      });
    } else if (targetMatched(`.${id}__variant`)) {
      const variantSku = target.closest('[data-varsku]');

      const card = target.closest(`.${id}__prodcard`);
      const selectionBlock = card.querySelector(`.variant-selected .${id}__shade-img`);

      target.closest('.variant-selector').classList.toggle(`${id}__hide`);
      variantSku.getAttribute('data-type') != 'Shade'
        ? (selectionBlock.innerText = variantSku.querySelector('.variant-name').innerText)
        : (card.querySelector(`.variant-selected .${id}__shade-img`).style.backgroundImage = `url(${target
            .closest('[data-img]')
            .getAttribute('data-img')})`);
      card.querySelector(`.${id}__variant.selected`)?.classList.remove('selected');
      variantSku.classList.add('selected');
      card.querySelector('.add-to-cart').setAttribute('data-sku', variantSku.getAttribute('data-varsku'));
    } else if (targetMatched(`.variant-selected`)) {
      target.closest(`.${id}__cartbtn--container`).querySelector('.variant-selector').classList.toggle(`${id}__hide`);

      const isPlp = () =>
        !!(document.querySelector('[ng-controller="ProductListController"]') && !document.querySelector('#Search'));
      const isSearch = () =>
        !!(document.querySelector('[ng-controller="ProductListController"]') && document.querySelector('#Search'));
      const isOpenModal = () => document.getElementById(`${id}_ModalImages_modal`)?.classList.contains('Visible');
      const clickPosition = () => {
        return isPlp() && !isOpenModal()
          ? 'PLP'
          : isSearch() && !isOpenModal()
          ? 'SRP'
          : isOpenModal() && (isSearch() || isPlp())
          ? 'Modal'
          : '';
      };
      fireEvent(`Clicks a colour drop down on ${clickPosition()}`);
    } else if (targetMatched(`.${id}_trackExclusive`)) {
      fireEvent('Clicks exclusive offer');
    }
    if (targetMatched(`.${id}__img--wrapper`) || targetMatched(`.${id}__prodcard--title`)) {
      // localStorageSave('hero-product-user', 'true');
    }
  });
};
export default productActionHandler;
