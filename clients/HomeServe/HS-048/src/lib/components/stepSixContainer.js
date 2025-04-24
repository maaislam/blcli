const stepSixContainer = (id) => {
  const html = `
        <div class="${id}__stepSixContainer">
            <form>
                <h1>Any further information?</h1>
                <h3>Step 6 - Optional</h3>
                <p>To help our engineers, would you like to add any further details about the problem you are claiming for?</p>
                <textarea></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;
  return html.trim();
};

export default stepSixContainer;
