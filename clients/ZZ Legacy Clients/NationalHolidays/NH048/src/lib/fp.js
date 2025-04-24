/**
 * Function composition
 *
 * Usage:
 *
 * ```
 * const createDuck = quack => quacking(quack)(flying({}));
 * ```
 *
 * becomes
 *
 * ```
 * const createDuck = quack => pipe(
 *   flying,
 *   quacking(quack)
 * )({});
 * ```
 */
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
