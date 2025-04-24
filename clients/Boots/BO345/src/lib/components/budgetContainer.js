const budgetContainer = (id, data) => {
  const html = `
    <select aria-labelledby="budget-label" class="choice-select ${id}__budgetContainer" id="${id}__concern" name="${id}__concern">
        ${data
          .map((item) => {
            return `<option value="${item.value}">${item.text}</option>`;
          })
          .join('\n')}
    </select>
  `;
  return html.trim();
};

export default budgetContainer;
