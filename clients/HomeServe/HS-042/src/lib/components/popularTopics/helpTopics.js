const helpTopics = () => {
  const html = `
        <div class="row pt-4 pb-4 justify-content-center">
            <h2 class="faqCard-module--helpTopicHeading--8af20">Popular help topics</h2>
            <div class="row faqCard-module--helpTopicContainer--9c89b">
                <div class="col-lg-3 col-md-6 faqCard-module--helpTopicCol--b29c3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="faqCard-module--faqHeadingIcon--9729b"><span
                                        class="faqCard-module--hsIcon--0cb0e faqCard-module--hsFaqArrowIcon--a6d94"><i
                                        aria-hidden="true"
                                        class="icon-hs-help"></i></span></div>
                                <div>
                                    <h3 class="faqCard-module--faqHeadingText--c171e">Help &amp; Advice</h3>
                                </div>
                            </div>
                            <div class="card-subtitle text-body-secondary faqCard-module--cardSubHeading--f5744">Access
                                information on a wide range of topics including common FAQs</div>
                            <div class="card-text faqCard-module--cardLinkSection--d9ac0"><a
                                class="faqCard-module--linkText--f5929 popular-link"
                                href="https://www.homeserve.co.uk/help-and-advice">View Help &amp; Advice</a>&nbsp;<span
                                    class="faqCard-module--hsIcon--0cb0e faqCard-module--hsArrowIcon--c109c"><i
                                    aria-hidden="true"
                                    class="icon-hs-arrow-forward"></i></span></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 faqCard-module--helpTopicCol--b29c3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="faqCard-module--faqHeadingIcon--9729b"><span
                                        class="faqCard-module--hsIcon--0cb0e faqCard-module--hsFaqArrowIcon--a6d94"><i
                                        aria-hidden="true"
                                        class="icon-hs-home"></i></span></div>
                                <div>
                                    <h3 class="faqCard-module--faqHeadingText--c171e">Knowledge Hub</h3>
                                </div>
                            </div>
                            <div class="card-subtitle text-body-secondary faqCard-module--cardSubHeading--f5744">Help, guidance
                                and DIY tips</div>
                            <div class="card-text faqCard-module--cardLinkSection--d9ac0"><a
                                class="faqCard-module--linkText--f5929 popular-link"
                                href="https://www.homeserve.co.uk/knowledge-hub">Visit our blog</a>&nbsp;<span
                                    class="faqCard-module--hsIcon--0cb0e faqCard-module--hsArrowIcon--c109c"><i
                                    aria-hidden="true"
                                    class="icon-hs-arrow-forward"></i></span></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 faqCard-module--helpTopicCol--b29c3">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="faqCard-module--faqHeadingIcon--9729b"><span
                                        class="faqCard-module--hsIcon--0cb0e faqCard-module--hsFaqArrowIcon--a6d94"><i
                                        aria-hidden="true"
                                        class="icon-hs-repair"></i></span></div>
                                <div>
                                    <h3 class="faqCard-module--faqHeadingText--c171e">One-off repairs</h3>
                                </div>
                            </div>
                            <div class="card-subtitle text-body-secondary faqCard-module--cardSubHeading--f5744">Got a problem
                                you're not already covered for?</div>
                            <div class="card-text faqCard-module--cardLinkSection--d9ac0"><a
                                class="faqCard-module--linkText--f5929 popular-link"
                                href="https://www.homeserve.co.uk/repairs/">Get a repair</a>&nbsp;<span
                                    class="faqCard-module--hsIcon--0cb0e faqCard-module--hsArrowIcon--c109c"><i
                                    aria-hidden="true"
                                    class="icon-hs-arrow-forward"></i></span></div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="faqCard-module--faqHeadingIcon--9729b"><span
                                        class="faqCard-module--hsIcon--0cb0e faqCard-module--hsFaqArrowIcon--a6d94"><i
                                        aria-hidden="true"
                                        class="icon-hs-no-heating"></i></span></div>
                                <div>
                                    <h3 class="faqCard-module--faqHeadingText--c171e">No heating?</h3>
                                </div>
                            </div>
                            <div class="card-subtitle text-body-secondary faqCard-module--cardSubHeading--f5744">Handy guides
                                for those smaller home repairs</div>
                            <div class="card-text faqCard-module--cardLinkSection--d9ac0"><a
                                class="faqCard-module--linkText--f5929 popular-link"
                                href="https://www.homeserve.co.uk/knowledge-hub">Read our blog</a>&nbsp;<span
                                    class="faqCard-module--hsIcon--0cb0e faqCard-module--hsArrowIcon--c109c"><i
                                    aria-hidden="true"
                                    class="icon-hs-arrow-forward"></i></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  return html.trim();
};

export default helpTopics;
