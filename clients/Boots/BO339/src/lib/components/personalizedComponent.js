const personalizedComponent = (id) => {
  const html = `
            <div class="${id}__personalizedComponent">
                <label class="${id}__personalizedComponent-text">Show personalised offers</label>
                <label class="${id}__oct-toggle">
                    <input class="${id}__oct-toggle__checkbox"
                        type="checkbox" />
                    <span class="${id}__oct-toggle__slider"
                        aria-hidden="true">
                    </span>
                </label>
            </div>
    `;

  return html.trim();
};

export default personalizedComponent;
