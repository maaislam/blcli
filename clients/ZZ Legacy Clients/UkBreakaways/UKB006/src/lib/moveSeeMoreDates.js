export default () => {
  const seeMoreDates = document.querySelector('.see-more-dates');
  document.querySelector('.col-md-12.p0').previousElementSibling.insertAdjacentHTML('beforeend', `<div class='UKB006-seeMoreDates__wrapper'></div>`);
  const newSeeMoreDatesRow = document.querySelector('.UKB006-seeMoreDates__wrapper');
  newSeeMoreDatesRow.insertAdjacentElement('afterbegin', seeMoreDates);
};