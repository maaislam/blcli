export const topRatedMarkUp = (id) => {

    const htmlStr = `
    <div class="site-navigation-megamenu top-rated ${id}-site-navigation-megamenu">
        <ul class="third-level">
            <li class="mobile-navigation-header">
                <span class="mobile-navigate-back"><svg class="icon icon-arrow-left" viewBox="0 0 16 14" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.59077 6.07471e-05L7.60197 1.07405L2.73958 6.23836L16 6.23836L16 7.76176L2.73958 7.76176L7.60197 12.9261L6.59077 14.0001L3.0598e-07 7.00006L6.59077 6.07471e-05Z">
                        </path>
                    </svg></span>
                <span class="mobile-navigation-title chech">Top Rated</span>
            </li>
            <li class="third-level-listing all-top-rated"><a href="/collections/bestsellers">All Top Rated</a></li>
            <li class="third-level-listing all-make-up"><a href="/collections/make-up">Make-up</a></li>
            <li class="third-level-listing all-skin-care"><a href="/collections/skincare">Skincare</a></li>
            <li class="third-level-listing all-bath-body"><a href="/collections/bath-body">Bath & Body</a></li>
            <li class="third-level-listing all-fragrance"><a href="/collections/fragrance">Fragrance</a></li>

        </ul>
    </div>`;

    return htmlStr.trim();
};
