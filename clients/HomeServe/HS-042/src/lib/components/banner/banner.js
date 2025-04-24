export const banner = (id) => {
  const html = `
        <div class="${id}__banner">
            <div class="container">
                <h1>Contact us</h1>
                <p>Whether you want to make a claim, ask us a question or need a hand fixing a problem at home, you'll find out how to do it all right here.</p>
            </div>
        </div>
    `;
  return html.trim();
};
