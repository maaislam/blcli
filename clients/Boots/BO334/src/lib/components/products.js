import product from './product';

const products = (id, data) => {
  const html = `
        <div class="${id}__container">  
            <h1 class="${id}__container-header">The perfect pairing</h1>  
            <div class="productsWrapper">
                 ${data.map((item) => product(item)).join('\n')}
            </div>
            <div class="${id}__shopall shopall-button">SHOP ALL</div>
        </div>
    
    `;

  return html.trim();
};

export default products;
