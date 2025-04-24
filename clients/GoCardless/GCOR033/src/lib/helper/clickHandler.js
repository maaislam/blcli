import { fireEvent } from '../../../../../../core-files/services';


const clickHandler = (event) => {
    const { target } = event;

    console.warn(target);

    // Add class to trigger custom matrics
    if (
        document.querySelector('#ready-to-get-started') &&
        !document.querySelector('#ready-to-get-started.first-section')
    ) {
        document.querySelector('#ready-to-get-started').classList.add(`first-section`);
    }

    if (target.closest('.css-mo3vs8')) {
        fireEvent('User interacts with Log in CTA in the header');
    }

    if (target.closest('.css-19nbx3n')) {
        fireEvent('User interacts with sign up cta in the header');
    }

    if (target.closest('.css-jhvn9x')) {
        fireEvent('User interacts with Contact Sales CTA at the bottom of the page');
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

        if (target.closest('.first-section')) {
            if (location.pathname === '/solutions/learn-more/') {
                fireEvent('User interacts with sign up CTA in the middle of learn more page');
            } else {
                fireEvent('User interacts with sign up CTA in the middle of learn more section');
            }

        } else {
            if (location.pathname === '/solutions/learn-more/') {
                fireEvent('User interacts with sign up CTA at the bottom of learn more page');
            } else {
                fireEvent('User interacts with “sign up” CTA at the bottom of the page');
            }

        }

    }

    if (target.closest('.css-19tx99q')) {

        if (target.closest('.first-section')) {
            if (location.pathname === '/solutions/learn-more/') {
                fireEvent(`User interacts with Talk to sales CTA in the middle of learn more page`);
            } else {
                fireEvent(`User interacts with Talk to sales CTA in the middle of learn more section`);
            }

        } else {
            if (location.pathname === '/solutions/learn-more/') {
                fireEvent('User interacts with Talk to sales CTA  at the bottom of learn more page');
            } else {
                fireEvent('User interacts with “Talk to sales” at the bottom of the page');
            }
        }

    }

    if (target.closest('.css-1apknr3')) {
        fireEvent(`User interacts with “contact sales” CTA in the footer`);
    }

    if (target.closest('.css-1gxess1')) {

        if (location.pathname === '/solutions/learn-more/') {
            fireEvent(`User interacts with sign up CTA in the header of learn more page`);
        } else {
            fireEvent(`User interacts with sign up CTA in the first section of learn more section of the page`);
        }
    }

    if (target.closest('.css-3jircr')) {
        if (location.pathname === '/solutions/learn-more/') {
            fireEvent(`User interacts with Talk to sales CTA in the header of learn more page`);
        } else {
            fireEvent(`User interacts with Talk to sales CTA in the first section of learn more section of the page`);
        }

    }

    if (target.closest('.css-njlauz')) {
        if (location.pathname === '/solutions/learn-more/') {
            fireEvent(`User interacts with How it works accordion on learn more page`);
        } else {
            fireEvent(`User interacts with How it works accordion`);
        }
    }

    if (target.closest('.css-x135zj')) {
        if (location.pathname === '/solutions/learn-more/') {
            fireEvent(`User interacts with video on customer section on learn more page`);
        } else {
            fireEvent(`User interacts with video on customer section`);
        }

    }

    if (target.closest('.css-1ju1yd2')) {
        if (location.pathname === '/solutions/learn-more/') {
            fireEvent(`User interacts with customer stories cta on learn more page`);
        } else {
            fireEvent(`User interacts with customer stories cta on learn more section`);
        }
    }

    if (target.closest('.css-1rl68o2')) {
        if (location.pathname === '/solutions/learn-more/') {
            fireEvent(`User interacts with “See all...” Cta on partner section on learn more page`);
        } else {
            fireEvent(`User interacts with “See all...” Cta on partner section`);
        }
    }

    if (target.closest('.css-pixkuy')) {
        if (location.pathname === '/solutions/learn-more/') {
            fireEvent(`User interacts with “Read more...” Cta on customer section on learn more page`);
        } else {
            fireEvent(`User interacts with “Read more...” Cta on customer section`);
        }
    }

};

export default clickHandler;