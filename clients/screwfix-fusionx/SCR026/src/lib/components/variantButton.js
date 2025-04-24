const variantButton = (id, data, groupName) => {
  const htmlStr = `
    
    <div class="${id}__variantbtn"
        data-variantvalue="${data}" data-varianttype="${groupName}">
        <span class="${id}__variantbtn--text">
            ${data}
        </span>
    </div>`;

  return htmlStr.trim();
};

export default variantButton;
