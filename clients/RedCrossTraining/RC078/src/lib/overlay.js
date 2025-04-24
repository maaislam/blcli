import shared from './shared';
import { fireEvent } from '../../../../../core-files/services';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const overlay = {
    openClass: 'is-open',
    elements: {},
    setElements() {
        this.elements.overlay = document.querySelector(`.${ID}-overlay`);
        this.elements.overlayOpen = document.querySelectorAll(`.${ID}-overlay-open`);
        this.elements.overlayContent = document.querySelector(`.${ID}-overlay-content`);
        this.elements.close = document.querySelector(`.${ID}-overlay-close`);
    },
    open() {
        this.elements.overlay.classList.add(this.openClass);
        fireEvent('Overlay opened');
    },
    close() {
        this.elements.overlay.classList.remove(this.openClass);
        fireEvent('Overlay closed');
    },
    addEvents() {
        const self = this;
        // Close on close click
        this.elements.close.addEventListener('click', () => {
            self.close();
        });
        this.elements.overlayOpen.forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                self.open();
            });
        });
        this.elements.overlayContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        document.body.addEventListener('click', () => {
            self.close();
        });
        document.addEventListener('keyup', (e) => {
            if (e.which == 27) {
                self.close();
            }
        });
    },
    init() {
        this.setElements();
        this.addEvents();
    },
};

export default overlay;