export const targetMatched = (target, selectorString) => target.matches(selectorString) || target.closest(selectorString);
