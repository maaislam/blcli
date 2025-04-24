import { fireEvent } from '../../../../../../core-files/services';


const clickHandler = (event) => {
    const { target } = event;

    // Add class to trigger custom matrics
    if (target.closest('.css-mo3vs8')) {
        console.log('User interacts with Log in CTA in the header');
    }

    if (target.closest('.css-19nbx3n')) {
        console.log('User interacts with sign up cta in the header');
    }

    if (target.closest('.css-m5wlkr')) {

        if (target.textContent === 'Get Started' || target.textContent === 'Sign up') {
            console.log('User interacts with sign up CTA  at the bottom of the article');
        }
    }

    if (target.closest('.css-140tqjo')) {
        if (target.textContent === 'How it works') {
            console.log('User interacts with How it works  CTA  at the bottom of the article');
        }

        if (target.textContent === 'Learn more' || target.textContent === 'Learn More') {
            console.log('User interacts with learn more CTA  at the bottom of the article');
        }
    }

    if (target.closest('.css-1xg51cq')) {
        console.log('User interacts with Contact Sales CTA at the bottom of the page');
    }

    if (target.closest('.css-1apknr3') && target.textContent === 'Contact Sales') {
        console.log(`User interacts with Contact Sales CTA in the footer`);
    }

    if (target.closest('.css-v6yn4w')) {
        console.log('User interacts with sign up CTA in the header of learn more page');
    }

};

export default clickHandler;