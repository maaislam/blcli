
const calendarCheckBox = () => {
  const checkbox = document.createElement("div");
  checkbox.classList.add("ej-checkbox");
  checkbox.classList.add("ej-checkbox-worldwide");
  checkbox.classList.add("checked");
  checkbox.innerHTML = `
  <input id="worldwide-flights-checkbox" type="checkbox" aria-label="Show connecting flights*" class="ng-pristine ng-untouched ng-valid" aria-invalid="false" aria-checked="true" checked>
    <label for="worldwide-flights-checkbox">
      <span class="checkbox-container">
        <span class="checkbox" unselectable="on" aria-hidden="true">✓</span>
      </span>
      <span class="checkbox-label-text">
        Show connecting flights*
       </span
    <label>`;

    if(!document.querySelector(".ej-checkbox-worldwide")) {
      document.querySelector('.drawer-content .drawer-tabs').insertAdjacentElement('afterend', checkbox);
    }

    const connectedCheckbox = document.querySelector("#worldwide-flights-checkbox");

    connectedCheckbox.addEventListener('change', function() {
      if (this.checked) {
        document.querySelector('.route-date-picker-drawer').classList.remove('no-worldwide-flights');
        checkbox.classList.add('checked');
      } else {
        document.querySelector('.route-date-picker-drawer').classList.add('no-worldwide-flights');
        checkbox.classList.remove('checked');
      }
    });
}


module.exports  = {
  calendarCheckBox
};