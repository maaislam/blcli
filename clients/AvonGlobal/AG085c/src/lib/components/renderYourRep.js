//cross domain test
const renderYourRep = (data, config) => {
  const { id, fireEvent, renderType, anchorElem, anchorPos } = config;
  const { brochureMaker, gdprLine, humanLogo, tickLogo } = data;
  const htmlStr = `
          <div class="${id}__rep ${renderType}">
              <div class="${id}__rep--container">
                  <div class="human-logo">${humanLogo}</div>
                  <div class="details">
                      <div class="prefix-text">You are shopping with your rep</div>
                  </div>
                  <div class="tick-logo">${tickLogo}</div>
              </div>
          </div>`;

  anchorElem.insertAdjacentHTML(anchorPos, htmlStr);
  fireEvent('Conditions Met');
};

export default renderYourRep;
