import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const overlay = {
    openClass: 'is-open',
    elements: {},
    setElements() {
        this.elements.overlay = document.querySelector(`.${ID}-overlay`);
        this.elements.phoneNumber = document.querySelector(`.${ID}-overlay-phone-number`);
        this.elements.close = document.querySelector(`.${ID}-overlay-close`);
        this.elements.liveChatButton = document.querySelector(`.${ID}-overlay-live-chat`);
    },
    updatePhoneNumber(number) {
        this.elements.phoneNumber.href = number;
    },
    openLiveChat() {
        let liveChatFloatingButton = document.querySelector('#comm100-float-button-2 a');
        liveChatFloatingButton.click();
    },
    open() {
        this.elements.overlay.classList.add(this.openClass);
    },
    close() {
        this.elements.overlay.classList.remove(this.openClass);
    },
    addEvents() {
        const self = this;
        // Close on close click
        this.elements.close.addEventListener('click', () => {
            self.close();
        });
        // Open live chat on click
        this.elements.liveChatButton.addEventListener('click', () => {
            // Close overlay
            self.close();
            self.openLiveChat();
        });
    },
    init() {
        this.setElements();
        this.addEvents();
    },
};

export default overlay;