const fakeProceed = (id) => {
  const html = `
        <button type="button" class="${id}__extras-choice-summary-button extras-choice-summary-button btn btn-primary">Proceed to other extras<em class="loading-icon fa fa-spinner fa-pulse fa-2x fa-fw"></em></button>
    `;

  return html.trim();
};

export default fakeProceed;
