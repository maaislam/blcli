const viewMoreCover = (id) => {
    const htmlStr = `
    <div class='${id}__viewMoreCoverWrapper'>
        <div class="${id}__text">View cover for</div>
        <div class='${id}__viewMoreCover'>
            <a href="/insurance-cover/gas-and-boiler-comparison" class='${id}__heatingCover ${id}__coverUrl' data-cover="heating">Heating</a>
            <a href="/insurance-cover/plumbing-and-drainage-comparison" class='${id}__plumbingCover ${id}__coverUrl' data-cover="plumbing">Plumbing</a>
            <a href="/insurance-cover/electrical-comparison" class='${id}__electricsCover ${id}__coverUrl' data-cover="electrics">Electrics</a>
            <a href="/insurance-cover/landlords-comparison" class='${id}__landlordsCover ${id}__coverUrl' data-cover="landlords">Landlords</a>
        </div>
    </div>
    `;

    return htmlStr;
};

export default viewMoreCover;
