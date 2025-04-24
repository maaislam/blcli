const skipButton = (id) => {
  const html = `
        <button class="btn-secondary pull-right ${id}__extras-choice-button-skip">Skip</button>
    `;
  return html.trim();
};

export default skipButton;
