import breakpoints from './breakpoints';

export default () => {
    return window.innerWidth <= breakpoints.mobile;
};