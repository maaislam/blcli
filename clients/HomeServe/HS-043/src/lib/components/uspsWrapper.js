import uspsItem from './uspsItem';

const uspsWrapper = (id, data) => {
  const html = `
    <div class="${id}__uspsWrapper">
        <div class="${id}__usps-container">
            <div class="${id}__usps-title">
                <h2>Why choose HomeServe?</h2>
            </div>
            <div class="${id}__usps-cards">
                ${data.map((item) => uspsItem(id, item)).join('\n')}
            </div>
        </div>
    </div>
  
  `;
  return html.trim();
};

export default uspsWrapper;
