export const drinkspiration = (ref, pos) => {
  if (!ref) return;

  ref.insertAdjacentHTML(pos ? pos : 'beforeend', `
    <section class="DO001-drinkspiration">
      <h4>DRINKSPIRATION</h4>
      <p>All our products have been hand selected and tried by our team, we can help you drink better. Discover new drinks, brands and trends with 31DOVER, let us inspire you.</p>

      <span class="cocktail">
        <img src="https://storage.googleapis.com/ucimagehost/do001/cocktails.png" alt="Cocktails"/>
      </span>

      <a href="/blog">FIND OUT MORE</a>
    </section>
  `);
};