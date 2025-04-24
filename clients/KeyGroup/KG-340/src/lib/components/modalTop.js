import { arrow } from '../assets/icons';

const modalTop = (id, data) => {
  //const isSelected = data.find(item=> item.url === )
  //const isCalcPage = window.location.href.includes('/equity-release/');

  const selectedText = data[0].name;

  const html = `
        <div class="${id}__modalTop">
            <div class="${id}__modalTop-overlay"></div>
            <div class="${id}__modalTop-content">
               <div class="${id}__modalTop-content-box">
                    <div class="${id}__modalTop-content-one">
                        <div class="${id}__modalTop-content-one-title">Jump to:</div>
                        <div class="${id}__modalTop-content-one-box">
                                <div class="wrapper-dropdown" id="dropdown">
                                    <div class="selected-wrapper">
                                        <div class="selected-display" id="destination">${selectedText}</div>
                                        <div class="icon-wrapper">${arrow}</div>
                                    </div>
                                    <ul class="dropdown">
                                        ${data
                                          .map((item) => {
                                            return item.name
                                              ? `
                                                 <li class="item ${id}__item">
                                                    <a href="${item.url}">${item.name}</a>
                                                </li>
                                            `
                                              : '';
                                          })
                                          .join('\n')}
                                        <div class="dropdown-footer">
                                          <div class="dropdown-footer-title">Ready to see how much you can release?</div>
                                          <button class="dropdown-footer-button">Calculate your tax-free amount</button>
                                        </div>
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div class="${id}__modalTop-content-two">Back to top</div>           
               </div>
            </div>
        </div>
    `;
  return html;
};

export default modalTop;
