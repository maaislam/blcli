import { poller } from '../../../../lib/uc-lib';

poller([
  () => {
    let trigger = false;
    if (document.getElementById('register.wantToBeContacted')) {
      trigger = true;
    }
    return trigger;
  },
], () => {
  const input = document.getElementById('register.wantToBeContacted');
  input.checked = false;

  input.parentNode.nextElementSibling.querySelector('label').innerText = 'The information collected on this registration page is used to create an online account that enables the purchase of goods. The information is then used to ship any goods ordered and contact the customer in the event of a query arising with an order placed on our website. We may at times use the contact information collected to inform the customer of special offers or services from ourselves or our group, we will not at any time share your information with 3rd parties. You have the option to opt out of this by leaving this box unchecked, or unchecking the box on the account details page once you have registered.';
});

// poller([
//   () => {
//     let trigger = false;
//     if (document.getElementById('register.wantToBeContacted') && document.getElementById('readMorePara')) {
//       trigger = true;
//     }
//     return trigger;
//   },
// ], () => {
//   const input = document.getElementById('register.wantToBeContacted');
//   const removeNode = document.querySelector('.wanttoBeContactedCheckbox');
//   const readAll = document.querySelector('.wanttoBeContactedCheckbox .readall');
//   const readLess = document.querySelector('.wanttoBeContactedCheckbox .readless');
//   const readMore = document.getElementById('readMorePara');
//   readLess.classList.add('GDPR_toggle');
//   input.checked = false;
//   removeNode.childNodes[0].textContent = '';
//   document.querySelector('.wanttoBeContactedCheckbox').classList.remove('ui-checkbox-on');
//   document.querySelector('.wanttoBeContactedCheckbox').classList.add('ui-checkbox-off');
//   readAll.innerText = 'The information collected on this registration page is used to create an online account that enables the purchase of goods. The information is then used to ship any goods ordered and contact the customer in the event of a query arising with an order placed on our website. We may at times use the contact information collected to inform the customer of special offers or services from ourselves or our group, we will not at any time share your information with 3rd parties. You have the option to opt out of this by leaving this box unchecked, or unchecking the box on the account details page once you have registered.';
//   readLess.innerText = 'The information collected on this registration page is used to create an online account that enables the purchase of goods...';

//   document.querySelector('.wanttoBeContactedCheckbox').addEventListener('touchstart', (e) => {
//     if (e.target === document.getElementById('readMorePara')) {
//       if (readAll.classList.contains('GDPR_toggle')) {
//         readMore.textContent = 'Read More';
//       } else {
//         readMore.textContent = 'Read Less';
//       }
//       readAll.classList.toggle('GDPR_toggle');
//       readLess.classList.toggle('GDPR_toggle');
//     }
//   });
// });
