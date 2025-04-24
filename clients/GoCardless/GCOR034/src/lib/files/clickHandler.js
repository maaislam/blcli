import { fireEvent } from '../../../../../../core-files/services';


const clickHandler = (event) => {
    const { target } = event;

    if (target.closest('.css-mo3vs8')) {
        fireEvent('User interacts with Log in CTA in the header');
    }

    if (target.closest('.css-19nbx3n')) {
        fireEvent('User interacts with sign up cta in the header');
    }

    if (target.closest('.css-140tqjo')) {
        fireEvent('User interacts with Learn More CTA at the bottom of the article');
    }

    if (target.closest('.css-m5wlkr')) {
        if (target.textContent === 'Get Started' || target.textContent === 'Sign up') {
            fireEvent('User interacts with sign up CTA  at the bottom of the article');
        }
    }

    if (target.closest('.css-1xg51cq')) {
        fireEvent('User interacts with Contact Sales CTA at the bottom of the page');
    }

    if (target.closest('.css-eh9p4w')) {

        if (target.textContent === 'FAQ') {
            fireEvent('User interacts with FAQs in the footer');
        }

        if (target.textContent === 'Contact Sales') {
            fireEvent('User interacts with Contact Sales CTA in the footer');
        }
    }

    if (target.closest('.faq-content')) {
        let accordionNumber = target.closest('.faq-content')?.classList[0]?.split('faq-content0')[1];
        if (accordionNumber) {
            if (target.closest('.faq-content').classList.contains('active')) {
                fireEvent(`User expands Question ${accordionNumber}`);
            } else {
                fireEvent(`User collapses Question ${accordionNumber}`);
            }
        }
    }

    if (target.closest('.sign-up')) {
        fireEvent('User interacts with Sign up CTA');
    }

    if (target.closest('.learn-more')) {
        fireEvent('User interacts with learn more CTA');
    }

    if (target.closest('.GCOR034__sticky-banner')) {
        fireEvent('User interacts with the modal and anchors down to FAQs');
    }

    if (target.closest('.GCOR034__sticky-banner-cross-icon')) {
        fireEvent('User clears the modal (mobile only)');
    }

    if (target.closest('.learn-more-A2')) {
        fireEvent('User interacts with Learn More... link within the second question');
    }

    if (target.closest('.sign-up-A2')) {
        fireEvent('User interacts with Sign up link within the second question');
    }

    if (target.closest('.partner-A4')) {
        fireEvent('User interacts with partners link within the fourth question');
    }

    if (target.closest('.sign-up-A5')) {
        fireEvent('User interacts with sign up link within the fifth question');
    }

    if (target.closest('.contact-sales-A6')) {
        fireEvent('User interacts with contact sales link within the sixth question');
    }

    if (target.closest('.reviews-A7')) {
        fireEvent('User interacts with reviews link within the seventh question');
    }

};

export default clickHandler;