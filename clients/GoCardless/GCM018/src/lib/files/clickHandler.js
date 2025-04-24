import { fireEvent } from '../../../../../../core-files/services';


const clickHandler = (event) => {
    const { target } = event;

    if (target.closest('.css-mo3vs8')) {
        fireEvent('User interacts with Log in CTA in the header');
    }

    if (target.closest('.css-19nbx3n')) {
        if (target.textContent === 'Sign up') {
            fireEvent('User interacts with sign up cta in the header');
        }

        if (target.textContent === 'Contact sales') {
            fireEvent('User interacts with contact sales cta in the header');
        }
    }

    if (target.closest('.css-140tqjo')) {
        if (target.textContent === 'Learn More') {
            fireEvent('User interacts with Learn More CTA at the bottom of the article');
        }

        if (target.textContent === 'Watch demo') {
            fireEvent('User interacts with watch demoCTA at the bottom of the article');
        }
    }

    if (target.closest('.css-m5wlkr')) {
        if (target.textContent === 'Get Started' || target.textContent === 'Sign up') {
            fireEvent('User interacts with sign up CTA  at the bottom of the article');
        }

        if (target.textContent === 'Contact sales') {
            fireEvent('User interacts with contact sales CTA  at the bottom of the article');
        }
    }

    if (target.closest('.css-1cr3yw6')) {
        fireEvent('User interacts with log in CTA in the burger menu');
    }

    if (target.closest('.css-1rhoc2k')) {
        if (target.textContent === 'Sign up') {
            fireEvent('User interacts with sign up CTA  in the burger menu');
        }

        if (target.textContent === 'Contact sales') {
            fireEvent('User interacts with contact sales CTA  in the burger menu');
        }
    }

    if (target.closest('.css-1xg51cq')) {
        fireEvent('User interacts with Contact Sales CTA at the bottom of the page');
    }

    if (target.closest('.css-1apknr3')) {
        if (target.textContent === 'Contact Sales') {
            fireEvent('User interacts with Contact Sales CTA in the footer');
        }

    }

    if (target.closest('.css-y6l269')) {
        if (target.textContent === 'Learn More') {
            fireEvent('User interacts with Learn More CTA in the sticky banner');
        }

        if (target.textContent === 'Watch demo') {
            fireEvent('User interacts with watch demo CTA in the sticky banner');
        }
    }

    if (target.closest('.css-znvs2p')) {
        if (target.textContent === 'Sign up') {
            fireEvent('User interacts with sign up CTA in the sticky banner');
        }

        if (target.textContent === 'Contact sales') {
            fireEvent('User interacts with Contact Sales CTA in the sticky banner');
        }
    }

};

export default clickHandler;