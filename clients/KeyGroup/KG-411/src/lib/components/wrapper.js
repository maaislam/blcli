const wrapper = (id, data) => {
  const { imgSrc } = data;
  const html = `
        <section class="${id}__navigation navigation  grid-wrapper">
           <img src="${imgSrc}"/>
        </section>
    `;

  return html.trim();
};

export default wrapper;
