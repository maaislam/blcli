const target = document.querySelectorAll('.klevuWrap .collection-listing .product-listing');

target.forEach(function (el) {

    if (el.classList.contains('eligible')) el.classList.remove('eligible')

    if (el.querySelector('.yotpo a.text-m') && el.querySelector('.yotpo-stars .sr-only')) {

        let reviewNumber = parseInt(el.querySelector('.yotpo a.text-m').textContent.split(' ')[0].trim());
        let starNumber = parseFloat(el.querySelector('.yotpo-stars .sr-only').textContent.split(' ')[0].trim())
        if (reviewNumber >= 50 && starNumber >= 4) {

            console.log(`Review Number: ${reviewNumber} & Star Number: ${starNumber}`);
            el.classList.add('eligible')
        }
    }

})

console.log(document.querySelectorAll('.klevuWrap .collection-listing .product-listing.eligible').length);