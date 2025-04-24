import elements from './elements';
import setupBranch from './setupBranch';
import buildOverlay from './buildOverlay';

const setupBranches = () => {
    // Append overlay to div
    const overlay = buildOverlay();
    document.body.insertAdjacentHTML('afterbegin', overlay);
    elements.branches.forEach(branch => {
        setupBranch(branch);
    });
};

export default setupBranches;