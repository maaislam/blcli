import variantButton from './variantButton';

const variantGroup = (id, variants, groupName) => {
  const htmlStr = `
    <div class="${id}__variantgrp" data-groupname="${groupName}">
        <div class="${id}__variantgrp--wrapper">
            <div class="variant-title">${groupName}</div>
            <div class="variant-selectors">
                ${variants.map((item) => variantButton(id, item, groupName)).join('')}
            </div>
        </div>
    </div>`;

  return htmlStr.trim();
};

export default variantGroup;
