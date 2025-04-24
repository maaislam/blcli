import personalizedComponent from './personalizedComponent';

const offerFilter = (id, data) => {
  const html = `
        <div class="${id}__offerFlterWrapper">
            ${personalizedComponent(id)}
            <div class="${id}__offerDepartment">Department</div>
            <ul class="${id}__offerFlterList">      
                ${data
                  .map((item) => {
                    return `
                        <li class="${id}__offerFlterItem" data-value="${item}">
                            <label class="custom-option">
                               <input type="checkbox" class="child"/> 
                               ${item}
                            </label>
                        </li>
                    `;
                  })
                  .join('\n')}
            </ul>
            <button class="${id}__offerFilterBtn">view items</button>
        </div>
    `;

  return html.trim();
};

export default offerFilter;
