/**
 * IDXXX - Description
 * @author User Conversion
 */
import {
  setup
} from './services';
import settings from './settings';
import runPolyfills from './polyfills';

const {
  ID
} = settings;

const activate = () => {
  runPolyfills();
  setup();
  if (window.location.href.indexOf('/account-order/') > -1) {
    // Moves order number to the top
    let orderText;
    orderText = document.querySelector('.statement h4').textContent.trim();
    document.querySelector('#site_torso h1').textContent = orderText;
    document.querySelector('.statement h4').remove();
    // Removes why not refer a friend?
    document.querySelector('.torso_right .notifications').remove();
    // Adds a td to the billing table-row and place the buttons in that td
    const element = document.createElement('td');
    element.setAttribute('width', '33.33333%');
    element.id = 'tableCell';
    const tableRow = document.querySelector('.statement table tbody tr');
    const tdS = tableRow.querySelectorAll('td');
    [].forEach.call(tdS, function (td) {
      td.setAttribute('width', '33.33333%')
    });
    let newContent = '';
    document.querySelector('.statement table tbody tr:nth-child(3) td p a').textContent = 'Track Order';
    document.querySelector('.statement table tbody tr:nth-child(2) td').setAttribute('colspan', '3');
    const trackButton = document.querySelector('.statement table tbody tr:nth-child(3) td p');
    const trackButtonContent = trackButton.innerHTML;
    const buttonWrap = document.createElement('div');
    buttonWrap.classList.add(`${ID}_buttonWrap`);
    buttonWrap.classList.add(`${ID}_buttonWrap--green`);
    buttonWrap.innerHTML = trackButtonContent;
    newContent += buttonWrap.outerHTML;
    const reorderButton = document.querySelector('#order-content tr:nth-child(3) td:nth-child(2)');
    const reorderButtonContent = reorderButton.innerHTML;
    newContent += reorderButtonContent;
    trackButton.parentNode.remove();
    reorderButton.parentNode.remove();
    element.innerHTML = newContent;
    tableRow.insertAdjacentElement('beforeend', element);
    document.querySelector('.statement table tbody tr:nth-child(3)').remove();
    // Adds a view product button
    const orderContent = document.querySelectorAll('#order-content tbody tr');
    let curContent = '';
    [].forEach.call(orderContent, function (curElement, i) {
      const isOutofStock = curElement.querySelector('td:nth-child(3) p');
      if (!isOutofStock) {
        const isCustom = curElement.querySelector('td:nth-child(2) p:nth-child(2)').textContent.indexOf('Customisations:');
        let link;
        if (curElement.querySelector('td:nth-child(2) p a')) {
          link = curElement.querySelector('td:nth-child(2) p a').href;
        }
        const newButton = document.createElement('div');
        const newLink = document.createElement('a');
        newLink.classList.add('button_style');
        newLink.classList.add('green');
        newLink.href = link;
        newLink.textContent = 'View Product';
        newButton.classList.add(`${ID}_buttonWrap`);
        newButton.classList.add(`${ID}_buttonWrap--green`);
        newButton.innerHTML = newLink.outerHTML;
        curElement.querySelector('td:nth-child(3)').insertAdjacentElement('afterbegin', newButton);
        if (isCustom > -1) {
          const target = curElement.querySelector('td:nth-child(2) p:nth-child(2)');
          const content = target.innerHTML;
          const newAccordion = document.createElement('div');
          newAccordion.classList.add(`${ID}_accordionWrap`);
          newAccordion.innerHTML = `
          <input type="checkbox" id="trigger-${i}" name="trigger-${i}">
          <div class="${ID}_accordion__header">
            <div class="${ID}_accordion__title">Customised? <strong>Yes</strong></div>
            <label class="${ID}_accordion__label" for="trigger-${i}"></label>
          </div>
          <div class="${ID}_accordion__body">
            ${content}
          </div>
        `;
          target.insertAdjacentElement('beforebegin', newAccordion);
          target.remove();
        }
      } else {
        curContent += curElement.innerHTML;
        curElement.remove();
        const newTr = document.createElement('tr');
        newTr.id = 'unavailable-products';
        newTr.innerHTML = `
        <td colspan="3">
          <h4>Unavailable Products</h4>
          <table>
            <tbody>
              ${curContent}
            </tbody>
          </table>
        </td>
      `;
        document.querySelector('.statement table tbody').insertAdjacentElement('beforeend', newTr);
      }
    });
  }
};

export default activate;
