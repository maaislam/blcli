import tooltip from './tooltip';
import tooltipContent from './tooltipContent';

const table = (id, lists, perClaimValue) => {
  const priceText = perClaimValue.includes('?') ? perClaimValue.replace('?', '') : perClaimValue;

  const html = `
        <table aria-label="Job Costs Table" >
            <thead>
                <tr>
                    <th scope="col">Job Type</th>
                    <th scope="col">Average ${tooltip()} ${tooltipContent(id)}</th>
                    <th scope="col">With HomeServe</th>
                </tr>
            </thead>
            <tbody>
                ${lists
                  .slice(0, 3)
                  .map((item) => {
                    return `
                        <tr>
                            <td>${item.name}</td>
                            <td>£${item.price}</td>
                            <td class="highlight">You pay ${priceText}</td>
                        </tr>
                    `;
                  })
                  .join('\n')}
                
            </tbody>
        </table> 
    `;

  return html.trim();
};

export default table;
