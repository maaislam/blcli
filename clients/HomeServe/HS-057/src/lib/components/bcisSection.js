import table from './table';

const bcisSection = (id, titleName, perClaimValue, policyText, lists) => {
  const section = `
        <div class="${id}__bcis-cost-wrapper">
            <div class="${id}__bcis-cost-container">
                <div class="${id}__contentWrapper">
                    <h2>Remove unexpected costs and stress</h2>
                    <p>Avoid costly repairs with HomeServe’s ${titleName} where you simply pay a ${perClaimValue} excess for each new problem.</p>
                    <div class="small">${policyText}</div>
                </div>
                <div class="${id}__tableWrapper">
                    ${table(id, lists, perClaimValue)}
                </div>
                <div class="${id}__policyWrapper small">${policyText}</div>
            </div>
        </div>
    `;
  return section.trim();
};

export default bcisSection;
