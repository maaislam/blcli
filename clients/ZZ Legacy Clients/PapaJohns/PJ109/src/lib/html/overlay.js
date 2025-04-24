import shared from '../shared';
import crossYellow from '../icons/crossYellow';
const {ID, VARIATION} = shared;

const overlay = () => {
    const crossHTML = `${crossYellow(`${ID}-close--large ${ID}-overlay-close ${ID}-overlay__close`)}`;
    return `
    <div class="${ID}-overlay">
        <div class="${ID}-overlay__game-container">
            <iframe class="${ID}-overlay__game ${ID}-overlay-game"></iframe>
            ${crossHTML}
        </div>
    </div>
    `;
};

export default overlay;