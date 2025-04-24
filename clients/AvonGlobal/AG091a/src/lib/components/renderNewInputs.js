const renderNewInputs = (config) => {
  const { id, anchorElem, anchorPos, fireEvent } = config;

  const generateInput = (details) => {
    const { name, label, type } = details;
    const htmlStr = `
      <div class="${name}-block">
        <label for="${name}">${label}</label>
        <input type="${type}" id="${name}" name="${name}" value="" placeholder="${type === 'number' ? ' xxx xxx xx xx' : ''}">
      </div>
      `;
    return htmlStr;
  };
  const inputRenderData = [
    { name: `${id}_name`, label: 'YOUR NAME', type: 'text' },
    { name: `${id}_email`, label: 'EMAIL ADDRESS', type: 'email' },
    { name: `${id}_number`, label: 'PHONE NUMBER', type: 'number' },
  ];

  const inputContainer = `
    <div class="${id}__new-container">
      <div class="${id}__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.6129 0.209705C1.22061 -0.0953203 0.653377 -0.0675907 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L4.58579 6L0.292893 10.2929L0.209705 10.3871C-0.0953203 10.7794 -0.0675907 11.3466 0.292893 11.7071C0.683418 12.0976 1.31658 12.0976 1.70711 11.7071L6 7.41421L10.2929 11.7071L10.3871 11.7903C10.7794 12.0953 11.3466 12.0676 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L7.41421 6L11.7071 1.70711L11.7903 1.6129C12.0953 1.22061 12.0676 0.653377 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L6 4.58579L1.70711 0.292893L1.6129 0.209705Z" fill="#707677"/>
        </svg>
      </div>
      <div class="${id}__titleblock">
        <div class="${id}__titleblock--title">Your contact information</div>
        <div class="${id}__titleblock--subtitle">Enter your contact information so your representative can contact you to discuss delivery details and payment</div>
      </div>
      <div class="${id}__inputs">
        ${inputRenderData.map((item) => generateInput(item)).join('\n')}
      </div>
    </div>`;

  anchorElem.insertAdjacentHTML(anchorPos, inputContainer);
  fireEvent('Conditions Met');
};

export default renderNewInputs;
