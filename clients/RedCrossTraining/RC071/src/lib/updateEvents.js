
import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import getCurrentElements from './getCurrentElements';

const mobileBreakpoint = 900;

const tooltips = {
    currentElements: null,
    getParent(tooltip) {
        let container = tooltip.closest(`.${ID}-radio`);
        return container;
    },
    addEvents() {
        this.toolTipEvents();
        this.choiceEvents();
    },
    choiceEvents() {
        const self = this;
        this.currentElements.choices.forEach(choice => {
            // Toggle class on click
            choice.addEventListener('click', (e) => {
                if (e.target.classList.contains(`${ID}-radio`)) {
                    self.resetToolTips(choice);
                    if (window.innerWidth >= mobileBreakpoint) {
                        choice.classList.toggle('has-tooltip');
                    }
                }
            });
        });
    },
    toolTipEvents() {
        const self = this;
        self.currentElements.tooltips.forEach(tooltip => {
            tooltip.addEventListener('click', (e) => {

                // Stop natural events on radio button
                e.stopPropagation();
                e.preventDefault();

                // Get parent/container
                let container = self.getParent(tooltip);

                // Remove all tooltip classes
                self.resetToolTips(container);

                // Add tooltip class to current choice
                container.classList.toggle('has-tooltip');
                  
            });
        });
    },
    resetToolTips(currentChoice) {
        const self = this;
        // Remove all tooltip classes (except current choice)
        self.currentElements.choices.forEach(choice => {
            if (choice !== currentChoice) {
                choice.classList.remove('has-tooltip');
            }
        });
    },
    init() {
        this.currentElements = getCurrentElements();
        this.addEvents();
    },
};

export default () => {
    tooltips.init();
};