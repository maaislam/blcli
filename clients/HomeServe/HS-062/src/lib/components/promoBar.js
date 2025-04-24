const promoBar = (id, text) => {
  const { mainText, anotherText } = text;
  const html = `
        <div class="${id}__promoBar">
            <p>${mainText} ${anotherText ? `<span>${anotherText}</span>` : ''}</p>        
        </div>
    `;
  return html.trim();
};

export default promoBar;
