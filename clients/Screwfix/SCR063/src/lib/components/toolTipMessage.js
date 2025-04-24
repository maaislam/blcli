export const toolTipMessage = (id) => {
  const html = `
          <div class="${id}__tooltipMessage">
              You’re seeing this ad as it appears relevant to your product search. <span class="${id}__close">Dismiss</span>
          </div>
      `;
  return html;
};
