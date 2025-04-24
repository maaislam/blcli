const loginBanner = (id, anchorElem, data) => {
  const { closedTitle, title, saveTimeTitle, saveMoneyTitle, saveTime, saveMoney, formSrc, tick, tick2 } = data;

  const renderList = (savingOption, bullet) =>
    savingOption
      .map((option) => `<div class="${id}__save-option"><span>${bullet}</span><div class="save-msg">${option}</div></div>`)
      .join('\n');

  const htmlStr = `
    <div class="${id}__loginbanner" id="${id}__loginbanner">
        <div class="${id}__loginbanner--closed ${id}__hide ${id}__invisible">
            <div class="title ${id}__font-title">${closedTitle}</div>
            <div class="${id}__banner-open ${id}__button">Log in / Register</div>
        </div>
        <div class="${id}__loginbanner--open">
            <div class="${id}__loginbanner--msg">
                <div class="title ${id}__font-title">${title}</div>
                <div class="saving-msg">
                    <div class="time">
                        <div class="time-save--msg ${id}__font-title">${saveTimeTitle}</div>
                        <div class="time-save-options">
                            ${renderList(saveTime, tick)}
                        </div>
                    </div>
                    <div class="money">
                        <div class="money-save--msg ${id}__font-title">${saveMoneyTitle}</div>
                        <div class="money-save-options">
                            ${renderList(saveMoney, tick)}
                        </div>
                    </div>
                </div>
                <div class="${id}__banner-close ${id}__font-title">Close</div>
            </div>
            <div class="${id}__loginbanner--form">
                <div class="${id}__loginform-container" id="${id}__loginform-container">
                
                </div>
                <a href="/create-account/cash" class="${id}__signup--btn ${id}__button">Register</a>
            </div>
        </div>
    </div> 
  `;

  document.querySelectorAll(`.${id}__loginbanner`).forEach((banner) => {
    banner?.remove();
  });

  anchorElem.insertAdjacentHTML('afterend', htmlStr);
  if (window.TP && typeof window.TP.renderLoginForm === 'function') {
    // call renderLoginForm function providing a dom element id as an argument
    window.TP.renderLoginForm(`${id}__loginform-container`);

    // call unmount callback if you want to remove login iframe
  }
};
export default loginBanner;
