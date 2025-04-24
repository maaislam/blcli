import shared from '../shared';
const {ID, VARIATION} = shared;

const banner = () => {
    return `
    <div class="${ID}-banner">
        <div class="${ID}-banner__inner">
            <img class="${ID}-banner__image" src="https://ab-test-sandbox.userconversion.com/experiments/${ID}-papa-jump.png"> 
            Play whilst you wait
            <button class="${ID}-button ${ID}-banner__button">Play Now</button>
        </div>
    </div>
    `;
};

export default banner;