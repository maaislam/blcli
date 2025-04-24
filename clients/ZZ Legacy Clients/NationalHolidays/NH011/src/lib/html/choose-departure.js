const chooseDepartureHtml = `
<div class="nh11-choose-departure-wrapper">
    <section id="nh11-choose-depature" class="blue departure nh11-choose-departure">
        <a class="nh11-close" title="Close">&times;</a>
        <div class="container">
            <div>
                <h2>To continue your search:</h2>
                <div class="departure-filters">
                    <div class="filter-item">
                        <label>Departure region</label>
                        <select id="ddlRegion">
                            <option value="">Select</option>
                            <option value="6">Kent</option>
                            <option value="4">Midlands</option>
                            <option value="1">North East</option>
                            <option value="2">North West</option>
                            <option value="5">Scotland</option>
                            <option value="3">Yorkshire</option>
                        </select>
                    </div>
                    <div class="filter-item">
                        <label>Departure town</label>
                        <select id="ddlPoint">
                            <option>Choose a region</option>
                        </select>
                    </div>
                    <button type="button" class="orange-btn" id="btnDeptSelect">Select</button>
                </div>
            </div>
        </div>
    </section>
</div> 
`;

export default chooseDepartureHtml;
