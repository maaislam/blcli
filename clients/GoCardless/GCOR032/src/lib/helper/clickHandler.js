import { fireEvent } from '../../../../../../core-files/services';


const clickHandler = (event) => {
    const { target } = event;

    if (target.closest('.css-mo3vs8')) {
        fireEvent('User interacts with Log in CTA in the header');
    }

    if (target.closest('.css-19nbx3n')) {
        fireEvent('User interacts with sign up cta in the header');
    }

    if (target.closest('.css-m5wlkr')) {
        fireEvent('User interacts with Get Started CTA  at the bottom of the article');
    }

    if (target.closest('.css-140tqjo')) {
        fireEvent('User interacts with Learn More CTA at the bottom of the article');
    }

    if (target.closest('.css-1xg51cq')) {

        if (location.pathname === '/solutions/learn-more/') {
            fireEvent('User interacts with sign up CTA in the middle of learn more page');
        } else {
            fireEvent('User interacts with Contact Sales CTA at the bottom of the page');
        }

    }

    if (target.closest('.css-v0118x')) {
        fireEvent(`User interacts with table of contents (please track which option)`);
    }

    if (target.closest('.css-1apknr3')) {
        fireEvent(`User interacts with Contact Sales CTA in the footer`);
    }

    if (target.closest('.css-1gxess1')) {
        fireEvent(`User interacts with sign up CTA in the header of learn more page`);
    }
    if (target.closest('.css-3jircr')) {
        fireEvent(`User interacts with Talk to sales CTA in the header of learn more page`);
    }

    if (target.closest('.css-19tx99q')) {
        fireEvent(`User interacts with Talk to sales CTA in the middle of learn more page`);
    }

    if (target.closest('.css-njlauz')) {
        fireEvent(`User interacts with How it works accordion on learn more page`);
    }

    if (target.closest('.css-1rl68o2')) {
        fireEvent(`User interacts with partners cta on learn more page`);
    }

    if (target.closest('.css-1ju1yd2')) {
        fireEvent(`User interacts with customer stories cta on learn more page`);
    }

    if (target.closest('.GCOR032__sticky-banner')) {
        fireEvent(`User interacts with the modal and opens pop up`);
    }

    if (target.closest('.GCOR032__sticky-banner-cross-icon')) {
        fireEvent(`User clears the modal (mobile only)`);
    }

    if (target.closest('.GCOR032__modal-cross-icon')) {
        fireEvent(`User closes the pop up`);
    }
    if (target.closest('.modal-signup')) {
        fireEvent(`User interacts with sign up on the pop up`);
    }
    if (target.closest('.modal-learn-more')) {
        fireEvent(`User interacts with learn more on the pop up`);
    }
};

export default clickHandler;