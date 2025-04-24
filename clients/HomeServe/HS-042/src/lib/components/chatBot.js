export const chatBot = (id) => {
  const html = `
      <div class="${id}__chatBot">
        <span>Message Us</span>
        <img src="https://www.homeserve.co.uk/-/media/live-chat/lc-btn-icon-3" id="LPMimage-1728104510617-16" alt="Message customer support" class="LPMimage" >
      </div>
    `;
  return html.trim();
};
