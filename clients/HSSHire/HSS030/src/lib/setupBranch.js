
import overlay from './overlay';

const methods = {
    branch: null,
    elements: {},
    setElements() {
        this.elements.phoneNumber = this.branch.querySelector('a');
    },
    setup() {
        // Change phone number text
        this.elements.phoneNumber.innerHTML = 'Call Us';
    },
    addEvents() {
        this.elements.phoneNumber.addEventListener('click', (e) => {
            e.preventDefault();
            // Get href
            let number = e.target.getAttribute('href');
            // Open overlay
            overlay.open();
            // Update overlay phone number
            overlay.updatePhoneNumber(number);
        });
    },
    init(branch) {

        // Set branch
        this.branch = branch;

        // Set elements and settings
        this.setElements();

        // Setup each branch
        this.setup();

        // Add events
        this.addEvents();
    },
 };

const setupBranch = (branch) => {
    methods.init(branch);
};

export default setupBranch;