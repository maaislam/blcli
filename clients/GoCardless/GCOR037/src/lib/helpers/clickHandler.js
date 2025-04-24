import { fireEvent } from '../../../../../../core-files/services';


const clickHandler = (event) => {
  const { target } = event;

  if (target.closest('.css-mo3vs8')) {
    if (target.textContent === 'Login') {
      fireEvent('User interacts with Login in the header');
    }
    if (target.textContent === 'Contact Sales') {
      fireEvent('User interacts with Contact Sales in the sticky banner');
    }
  }

  if (target.closest('.css-19nbx3n')) {

    if (target.closest('.css-1kciskq')) {
      fireEvent('User interacts with Sign up in the sticky banner');
    } else {
      fireEvent('User interacts with Signup in the header');
    }
  }

  if (target.closest('.css-be37cy')) {
    fireEvent('User interacts with Sign up in the hero');
  }

  if (target.closest('.css-15hb82r')) {
    fireEvent('User interacts with Contact Sales in the hero');
  }

  if (target.closest('.css-1m3h99c')) {
    fireEvent('User interacts with Payments CTAs in the middle of the page');
  }

  if (target.closest('.css-140tqjo')) {
    fireEvent('User interacts with Learn More CTAs in the middle of the page');
  }

  if (target.closest('.css-ya4zb7') && target.closest('.css-pixkuy')) {
    fireEvent('User interacts with Partner CTA');
  }

  if (target.closest('.css-ee50cx')) {
    fireEvent('User interacts with Case Studies CTA');
  }

  if (target.closest('.css-njlauz')) {
    fireEvent('User interacts with accordian');
  }

  if (target.closest('.css-m5wlkr')) {
    if (target.textContent === 'Get Started' || target.textContent === 'Sign up') {
      fireEvent('User interacts with sign up cta at the bottom of the page');
    }
  }

  if (target.closest('.css-1ec1qxn')) {
    fireEvent('User interacts with Contact Sales cta at the bottom of the page');
  }

  if (target.closest('.css-eh9p4w')) {
    if (target.textContent === 'Contact Sales') {
      fireEvent('User interacts with contact sales cta in the footer');
    }
  }

  if (target.closest('.underline-link')) {
    fireEvent('User interacts with partner anchor in value proposition');
  }

};

export default clickHandler;