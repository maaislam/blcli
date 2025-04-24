const renderAccordion = (data, config, fireEvent) => {
  const htmlStr = (singleAccData) => `
    <div class="HDA008__accordion">
      <div class="HDA008__accordion--question HDA008__plus">${singleAccData.question}</div>
      <div class="HDA008__accordion--answer HDA008__slide-out-top">${singleAccData.answer}</div>
    </div>`;

  const accordionContainer = document.querySelector(`${config.anchorSelector}`);
  const accordionWrapper = `
  <section class="HDA008__faq">
    <div class="container">
      <div class="HDA008__faq--title">Häufig gestellte Fragen</div>
      <div class="HDA008__faq--wrapper">
        ${data.map((item) => htmlStr(item)).join('\n')}  
      </div>
      <div class="HDA008__faq--end-row">Du hast weitere Fragen? Sieh doch mal in unserem <a target="_blank" class="HDA008__customer-service-btn" href="/kundenservice">FAQ-Bereich nach!</a></div>
    </div>
  </section>
  `;

  accordionContainer.insertAdjacentHTML(`${config.anchorPosition}`, accordionWrapper);
  //attach events & tracking
  document.querySelectorAll('.HDA008__accordion--question').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.target.classList.toggle('HDA008__minus');
      e.target.classList.toggle('HDA008__plus');
      e.target.nextElementSibling.classList.toggle('HDA008__slide-in-top');
      e.target.nextElementSibling.classList.toggle('HDA008__slide-out-top');

      if (e.target.classList.contains('HDA008__minus')) {
        fireEvent(`user opened "${e.target.innerText}" FAQ in ${config.pageType} page`);
      } else if (e.target.classList.contains('HDA008__plus')) {
        fireEvent(`user closed "${e.target.innerText}" FAQ in ${config.pageType} page`);
      }
    });
  });

  document.querySelector('.HDA008__customer-service-btn').addEventListener('click', () => {
    localStorage.setItem('referer', config.pageType);
  });
};

export default renderAccordion;
