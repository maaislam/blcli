const bookingShortcut = (ID) => {
  const addingShortcutModule = `
        <div class="${ID}-adding-shortcut-module">
            <div class="${ID}-adding-shortcut-module-title">
                    <h3>Add a shortcut to your booking</h3>
            </div>
            <div class="${ID}-adding-shortcut-module-message">
            <p>We’ll add a shortcut to the homepage for your booking so you can access it anytime, easily.</p>
            </div>
            <div class="${ID}-adding-shortcut-module-radio-container">
                <div>
                <input type="radio" id="add" name="bookingShortcut" value="add" checked />
                <label for="add">Add a shortcut</label>
                </div>
                <div>
                <input type="radio" id="remove" name="bookingShortcut" value="remove" />
                <label for="remove">No, thanks</label>
                </div
            </div>
        </div>
    `;

  return addingShortcutModule;
};

export default bookingShortcut;
