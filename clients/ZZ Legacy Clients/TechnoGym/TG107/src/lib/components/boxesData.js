/*
* Add attributes to matching elements so they can be clicked
*/
export default () => {
    const boxes = {
        '#group_1 .action-radio:first-of-type': 'fullpay',
        '#group_1 .action-radio:last-of-type': 'monthly',
        '#group_2 [rel="a"] .action-radio:first-of-type': 'rebel-full',
        '#group_2 [rel="b"] .action-radio:first-of-type': 'rebel-monthly',
        '#group_2 [rel="a"] .action-radio:nth-child(2)': 'revolution-full',
        '#group_2 [rel="b"] .action-radio:nth-child(2)': 'revolution-monthly',
        '#group_2 [rel="a"] .action-radio:last-of-type': 'combinedClass-full',
        '#group_2 [rel="b"] .action-radio:last-of-type': 'combinedClass-monthly',
    }

    // add the names to the classes
   for (const key in boxes) {
       if (boxes.hasOwnProperty(key)) {
           const element = boxes[key];
           document.querySelector(`${key}`).setAttribute('box-data', element);
       }
   }

   // loop through and remove all disabled classes
   const allExistingBoxes = document.querySelectorAll('.groups .wrapper_action .disabled');
   for (let index = 0; index < allExistingBoxes.length; index += 1) {
       const element = allExistingBoxes[index];
       if(element.classList.contains('disabled')) {
           element.classList.remove('disabled');
       }
   }
}

