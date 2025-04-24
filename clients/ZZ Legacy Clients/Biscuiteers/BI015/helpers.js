/**
 * Wrapper for TCO API:
 *
 * tco.get('customer').basket.add({products: {id:142,qty:1}}, {},{})
 */
export function addToBasket(productId, qty) {
    tco.get('customer').basket.add({products: {id:productId,qty:qty}}, {},{})
}
