import getAccountLink from './getAccountLink';

export default (options) => {
    const currentBoxParent = options.parent;
    currentBoxParent.insertAdjacentHTML('afterend', getAccountLink());
};