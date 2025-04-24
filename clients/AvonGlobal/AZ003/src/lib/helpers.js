/**
 * Increasingly helper
 */
const increasinglyModalPr = (_0xcdd5x395) => {
    var _0xcdd5x10 = _0xcdd5x395['querySelector']('.ProductName')['innerText'];
    var _0xcdd5x263 = _0xcdd5x395['querySelector']('.ProductDetails .Prices .Price')['innerText']['replace']('\xA3', '')['replace'](',', '.')['trim']();
    var _0xcdd5x262 = _0xcdd5x395['querySelector']('.ProductImage img')['src'];
    var _0xcdd5x261 = 0;
    if (_0xcdd5x395['querySelector']('.ProductDetails .Prices .ListPrice') != null) {
        _0xcdd5x263 = _0xcdd5x395['querySelector']('.ProductDetails .Prices .ListPrice')['innerText']['replace']('\xA3', '')['replace']('Regular Price', '')['replace'](',', '.')['trim']();
        _0xcdd5x261 = _0xcdd5x395['querySelector']('.ProductDetails .Prices .Price')['innerText']['replace']('\xA3', '')['replace'](',', '.')['trim']()
    };
    _0xcdd5x263 = _0xcdd5x263['replace']('€', '')['replace'](',', '.')['replace']('\xA3', '')['replace']('B\u011B\u017En\xE1 cena', '')['replace']('B\u011B\u017En\xE1cena', '')['replace']('Kč', '')['trim']();
    if (_0xcdd5x261 != 0) {
        _0xcdd5x261 = _0xcdd5x261['replace']('€', '')['replace'](',', '.')['replace']('\xA3', '')['replace']('B\u011B\u017En\xE1 cena', '')['replace']('B\u011B\u017En\xE1cena', '')['replace']('Kč', '')['trim']()
    };
    if (window['location']['host']['includes']('.cz') == true) {
        _0xcdd5x263 = _0xcdd5x263['replace'](/\s/g, '');
        if (_0xcdd5x261 != 0) {
            _0xcdd5x261 = _0xcdd5x261['replace'](/\s/g, '')
        }
    };
    var _0xcdd5x269 = _0xcdd5x395['querySelector']('.ProductImage')['href']['split']('/')[4];
    if (_0xcdd5x269['indexOf']('-') >= 0) {
        var _0xcdd5x399 = _0xcdd5x269['split']('-')[2];
        if (_0xcdd5x399 == undefined) {
            var _0xcdd5x399 = _0xcdd5x269['split']('-')[1]
        }
    };
    if (_0xcdd5x399 != undefined) {
        _0xcdd5x269 = _0xcdd5x399
    };
    var _0xcdd5xfa = '1';
    if (_0xcdd5x395['querySelector']('.Quantity input') != null) {
        _0xcdd5xfa = _0xcdd5x395['querySelector']('.Quantity input')['value']
    };
    if (_0xcdd5x269 != undefined) {
        bundle_vars['plp_added_id'] = _0xcdd5x269;
        var _0xcdd5xf3 = _0xcdd5x395['querySelector']('.ProductImage')['href'];
        setTimeout(function () {
            if (_0xcdd5x261 != 0) {
                plp_listeners(_0xcdd5x10, _0xcdd5x261, _0xcdd5x262, _0xcdd5x263, _0xcdd5xfa, _0xcdd5x269, _0xcdd5xf3)
            } else {
                plp_listeners(_0xcdd5x10, _0xcdd5x261, _0xcdd5x262, _0xcdd5x263, _0xcdd5xfa, _0xcdd5x269, _0xcdd5xf3)
            }
        }, 200)
    }
};

export default increasinglyModalPr;
