export const postCodeForm = (id) => {
  const html = `
        <section aria-labelledby="stockInfoTitle" class="${id}__postcode-prompt">
            <h2 class="${id}__stockInfoTitle">Add your postcode to see stock information</h2>
            
            <form class="${id}__postcodeForm">
                <label for="postcodeInput" class="${id}__text">Enter your location or postcode</label>
                <input
                type="text"
                class="${id}__postcodeInput"
                name="postcode"
                placeholder="Enter your location or postcode"
                aria-label="Enter your location or postcode"
                required
                />
                <button type="submit" class="${id}__submitBtn">Add</button>
            </form>
            
            <button type="button" class="${id}__no-thanks-btn" aria-label="Dismiss postcode prompt">No thanks</button>
        </section>

    `;
  return html.trim();
};
