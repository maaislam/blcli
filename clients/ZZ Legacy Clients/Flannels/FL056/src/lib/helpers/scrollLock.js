// @flow
// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi
// Older browsers don't support event options, feature detect it.
var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
    var passiveTestOptions = {
        get passive() {
            hasPassiveEvents = true;
            return undefined;
        }
    };
    window.addEventListener('testPassive', null, passiveTestOptions);
    window.removeEventListener('testPassive', null, passiveTestOptions);
}
var isIosDevice = typeof window !== 'undefined' &&
    window.navigator &&
    window.navigator.platform &&
    /iP(ad|hone|od)/.test(window.navigator.platform);
var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting;
var previousBodyPaddingRight;
// returns true if `el` should be allowed to receive touchmove events
var allowTouchMove = function (el) {
    return locks.some(function (lock) {
        if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
            return true;
        }
        return false;
    });
};
var preventDefault = function (rawEvent) {
    var e = rawEvent || window.event;
    // For the case whereby consumers adds a touchmove event listener to document.
    // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
    // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
    // the touchmove event on document will break.
    if (allowTouchMove(e.target)) {
        return true;
    }
    // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom)
    if (e.touches.length > 1)
        return true;
    if (e.preventDefault)
        e.preventDefault();
    return false;
};
var setOverflowHidden = function (options) {
    // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
    // the responsiveness for some reason. Setting within a setTimeout fixes this.
    setTimeout(function () {
        // If previousBodyPaddingRight is already set, don't set it again.
        if (previousBodyPaddingRight === undefined) {
            var reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
            var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
            if (reserveScrollBarGap && scrollBarGap > 0) {
                previousBodyPaddingRight = document.body.style.paddingRight;
                document.body.style.paddingRight = scrollBarGap + "px";
            }
        }
        // If previousBodyOverflowSetting is already set, don't set it again.
        if (previousBodyOverflowSetting === undefined) {
            previousBodyOverflowSetting = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
    });
};
var restoreOverflowSetting = function () {
    // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
    // the responsiveness for some reason. Setting within a setTimeout fixes this.
    setTimeout(function () {
        if (previousBodyPaddingRight !== undefined) {
            document.body.style.paddingRight = previousBodyPaddingRight;
            // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
            // can be set again.
            previousBodyPaddingRight = undefined;
        }
        if (previousBodyOverflowSetting !== undefined) {
            document.body.style.overflow = previousBodyOverflowSetting;
            // Restore previousBodyOverflowSetting to undefined
            // so setOverflowHidden knows it can be set again.
            previousBodyOverflowSetting = undefined;
        }
    });
};
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function (targetElement) {
    return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};
var handleScroll = function (event, targetElement) {
    var clientY = event.targetTouches[0].clientY - initialClientY;
    if (allowTouchMove(event.target)) {
        return false;
    }
    if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
        // element is at the top of its scroll
        return preventDefault(event);
    }
    if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
        // element is at the top of its scroll
        return preventDefault(event);
    }
    event.stopPropagation();
    return true;
};
export const disableBodyScroll = function (targetElement, options) {
  console.log('disable bodyscroll called!');
    if (isIosDevice) {
        // targetElement must be provided, and disableBodyScroll must not have been
        // called on this targetElement before.
        if (!targetElement) {
            // eslint-disable-next-line no-console
            console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
            return;
        }
        if (targetElement && !locks.some(function (lock) { return lock.targetElement === targetElement; })) {
            var lock = {
                targetElement: targetElement,
                options: options || {}
            };
            locks = locks.concat([lock]);
            targetElement.ontouchstart = function (event) {
                if (event.targetTouches.length === 1) {
                    // detect single touch
                    initialClientY = event.targetTouches[0].clientY;
                }
            };
            targetElement.ontouchmove = function (event) {
                if (event.targetTouches.length === 1) {
                    // detect single touch
                    handleScroll(event, targetElement);
                }
            };
            if (!documentListenerAdded) {
                document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
                documentListenerAdded = true;
            }
        }
    }
    else {
        setOverflowHidden(options);
        var lock = {
            targetElement: targetElement,
            options: options || {}
        };
        locks = locks.concat([lock]);
    }
};
export const clearAllBodyScrollLocks = function () {
    if (isIosDevice) {
        // Clear all locks ontouchstart/ontouchmove handlers, and the references
        locks.forEach(function (lock) {
            lock.targetElement.ontouchstart = null;
            lock.targetElement.ontouchmove = null;
        });
        if (documentListenerAdded) {
            document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
            documentListenerAdded = false;
        }
        locks = [];
        // Reset initial clientY
        initialClientY = -1;
    }
    else {
        restoreOverflowSetting();
        locks = [];
    }
};
export const enableBodyScroll = function (targetElement) {
  console.log('enable body scroll called!');
    if (isIosDevice) {
        if (!targetElement) {
            // eslint-disable-next-line no-console
            console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
            return;
        }
        targetElement.ontouchstart = null;
        targetElement.ontouchmove = null;
        locks = locks.filter(function (lock) { return lock.targetElement !== targetElement; });
        if (documentListenerAdded && locks.length === 0) {
            document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
            documentListenerAdded = false;
        }
    }
    else if (locks.length === 1 && locks[0].targetElement === targetElement) {
        restoreOverflowSetting();
        locks = [];
    }
    else {
        locks = locks.filter(function (lock) { return lock.targetElement !== targetElement; });
    }
};

