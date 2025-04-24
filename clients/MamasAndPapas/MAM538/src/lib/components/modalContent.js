const modalContent = (id, formHTML) => {
    const htmlStr = `<div class='${id}__modalContent'>
        <div class='${id}-header'>
            <h2 class='title'>Sign Up & Save</h2>
            <p class='discountText'>Get <span>£25</span> off your next order over £250</p>
            <p class='subtext'>Enhance your Mamas & Papas experience. Personalise your journey with tailored recommendations and exclusive offers by letting us know if you are:</p>
        </div>
        <div class='${id}-body'>${formHTML}</div>
    </div>`;

    return htmlStr;
};
export default modalContent;
