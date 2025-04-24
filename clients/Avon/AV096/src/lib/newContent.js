const renderNewContent = (id) => {
  const newsletterContainer =
    document.querySelector('.fieldset-description') || document.querySelector('.logged-in-customer-newsletter');

  const newsletterText = newsletterContainer.querySelector('label.checkbox__label');
  const title = document.createElement('div');

  newsletterContainer.classList.add(`${id}__fieldset-description`);
  newsletterContainer.querySelector('.checkbox-wrapper').classList.add(`${id}__checkbox`);

  title.classList.add(`${id}__title`);
  title.innerHTML = 'Get more out of your samples!';

  newsletterText.innerHTML =
    'Tick here to keep up to date on news and offers,<br class="AV096__show--desktop"><span class="AV096__hide--desktop">&nbsp;</span>including promotions related to your samples.';
  newsletterContainer.prepend(title);
};

export default renderNewContent;
