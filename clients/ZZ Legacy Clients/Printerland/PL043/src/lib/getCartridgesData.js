const getCorrectRow = () => {
    let row;
    const specCharts = document.querySelectorAll('.spec-chart');
    specCharts.forEach(spec => {
        const header = spec.querySelector('.title__inner a');
        const text = header.innerText;
        if (text == 'Cartridges Included **') {
            row = spec;
        }
    });
    return row;
};

const getProperties = (row) => {
    const properties = [];
    const tableRows = row.querySelectorAll('table tr');
    tableRows.forEach(tableRow => {
        const name = tableRow.querySelector('td:first-child').innerText;
        const unit = tableRow.querySelector('td:last-child').innerText;
        properties.push({
            name,
            unit
        });
    });
    return properties;
};

const getCartridgesData = () => {
    const row = getCorrectRow();
    if (row) {
        const properties = getProperties(row);
        return properties;
    }
    return false;
};

export default getCartridgesData;