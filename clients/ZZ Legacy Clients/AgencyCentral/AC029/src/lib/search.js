const searchHTML = `
    <div class="AC029_more-toggle">
      <div class="AC029_search-section">
        <div class="AC029_title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
        <strong>Agency Search</strong> - Improve your results by refining your search</div>
        <div class="AC029_refine-wrap">
          <div class="AC029_refine-sector">
            <span>Refine by sector</span>
            <div class="AC029_reveal-sector">
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=admin&skill=&location_id=233-0" class="AC029_refine-btn">Administration</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=construction&skill=&location_id=233-0" class="AC029_refine-btn">Construction</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=catering&skill=&location_id=233-0" class="AC029_refine-btn">Catering</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=retail&skill=&location_id=233-0" class="AC029_refine-btn">Retail</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=health&skill=&location_id=233-0" class="AC029_refine-btn">Health</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=it&skill=&location_id=233-0" class="AC029_refine-btn">IT</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=mediapr&skill=&location_id=233-0" class="AC029_refine-btn">Media</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=accounting&skill=&location_id=233-0" class="AC029_refine-btn">Accounting</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=marketing&skill=&location_id=233-0" class="AC029_refine-btn">Marketing</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=arts&skill=&location_id=233-0" class="AC029_refine-btn">Arts</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=engineering&skill=&location_id=233-0" class="AC029_refine-btn">Engineering</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=banking&skill=&location_id=233-0" class="AC029_refine-btn">Banking</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=creative&skill=&location_id=233-0" class="AC029_refine-btn">Creative</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/search.htm?location=Greater+London&do=search&order=covers&industry=education&skill=&location_id=233-0" class="AC029_refine-btn">Education</a>
              <a class="AC029_reveal_more_sectors AC029_move-to-search">View all Sectors</a>
            </div>
            <a class="AC029_reveal_more_sectors">View more Sectors</a>
          </div>
          <div class="AC029_refine-sector">
            <span>Refine by location</span>
            <div class="AC029_reveal-sector">
              <a href="https://www.agencycentral.co.uk/agencysearch/byregion/LON.htm?northLondon" class="AC029_refine-btn">North London</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/byregion/LON.htm?eastLondon" class="AC029_refine-btn">East London</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/byregion/LON.htm?southLondon" class="AC029_refine-btn">South London</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/byregion/LON.htm?westLondon" class="AC029_refine-btn">West London</a>
              <a href="https://www.agencycentral.co.uk/agencysearch/byregion/LON.htm?centralLondon" class="AC029_refine-btn">Central London</a>
            </div>
            <a class="AC029_reveal_more_sectors">View all Locations</a>
          </div>
          <a class="AC029_reveal_search">More Search Options</a>
        </div>
      </div>
    </div>
    <div class="AC018_search-wrap clearfix">
        <section class="AC018_search-refine">
          <h2>Learn more about the London recruitment market</h2>
        </section>
        <section class="AC018_search-results clearfix">
             <div class="AC018_results-wrap">
                <div class="AC018_pre-load">
                    <div class="AC018_loader-wrapper">
                        <div class="AC018_loader">
                            <div class="AC018_roller"></div>
                            <div class="AC018_roller"></div>
                        </div>
                        <div class="AC018_loader">
                            <div class="AC018_roller"></div>
                            <div class="AC018_roller"></div>
                        </div>
                        <div class="AC018_loader">
                            <div class="AC018_roller"></div>
                            <div class="AC018_roller"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
`;

export default searchHTML;
