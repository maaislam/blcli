const getProductRows = (headings) => {
    let allProductRows = document.querySelectorAll('.checkout_main .product_row');
    const relatedRows = [];
    allProductRows.forEach(row => {
        const heading = row.querySelector('.precart_available_head h2');
        if (headings.includes(heading.innerText)) {
            relatedRows.push(row);
        }
    });
    return relatedRows;
};

export default getProductRows;