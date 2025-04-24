// Zebra styles taken from BI021 though this test uses a different 
// datepicker plugin
const occasionPicker = {
  render() {
    const html = `
      <div id="bi29-datepicker">
          <span class="Zebra_DatePicker_Icon_Wrapper" style="display: inline-block; position: relative; float: none; top: auto; right: auto; bottom: auto; left: auto; margin: 0px; padding: 0px;">
            <input id="bi29-date" readonly="true">
            <button type="button" class="Zebra_DatePicker_Icon">Pick a date</button>
          </span>
        </span>
      </div>
    `;

    return html;
  },
};

export default occasionPicker;
