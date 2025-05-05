const toBar = (data) => {
  const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const html = `
    <nav class="tab-bar" role="tablist" aria-label="Product information navigation">
        <div class="top-bar-container">
            <div class="top-bar-lists">
            <button
                class="tab"
                role="tab"
                aria-selected="true"
                aria-controls="details"
                id="tab-details"
                data-target="#details"
            >
                Details
            </button>
            ${data
              .map((item) => {
                return `
                <button
                    class="tab"
                    role="tab"
                    aria-selected="false"
                    aria-controls="${item}"
                    id="tab-${item}"
                    data-target="#${item}"
                >
                    ${item.includes('Spec') && isMobile() ? 'Spec' : item.includes('Spec') ? 'Specifications' : `${item}`}
                </button>
                `;
              })
              .join('\n')}
            </div>

            <div class="top-bar-icon" aria-hidden="true">
                <button role="tab" class="top-bar-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                    <path d="M7.5 1V15M7.5 1L13.5 7M7.5 1L1.5 7" stroke="#0053A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>
  `;
  return html.trim();
};

export default toBar;
