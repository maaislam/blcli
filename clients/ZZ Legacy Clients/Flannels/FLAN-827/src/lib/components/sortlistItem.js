const sortlistItem = (id, data) => {
  const { name, controlEquivalent } = data;
  const htmlStr = `<div class="${id}__sortlist--item" data-controlid="${controlEquivalent}">
            <input type="radio" name="${id}__sortgroup" id="${id}__${name}">
            <label for="${id}__${name}">${name}</label>
    </div>`;
  return htmlStr.trim();
};

export default sortlistItem;
