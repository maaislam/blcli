import shared from './shared';
const {ID, VARIATION} = shared;

const overlay = () => {
    return `
    <div class="${ID}-overlay">
        <iframe class="${ID}-overlay__game"></iframe>
    </div>
    `;
};

export default overlay;