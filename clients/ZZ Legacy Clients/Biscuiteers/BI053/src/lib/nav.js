const nav = () => {
    return (`
        <if-not-checkout-process>
            
            <div class="flex flex-middle flex-justify-between BI-test" if-size="!SM">
                
                <div class="nav nav_left">
                    <ul class="nav nav_list__top flex flex-justify-between flex-middle">
                        <li class="nav nav_top__item BI-singleLink">
                            <a href="https://www.biscuiteers.com/father-s-day/fathers-day-biscuits" class="BI-topLink p-t-3 p-r p-r-5-l p-r-5-x p-l-5-x p-b-3 p-l p-l-5-l" rel="noopener"><span class="inline-block fs-7 fs-6-l ls--05 link-1" opt-href="/biscuits" meganav-class="link" meganav-hover-active="1" meganav-hover="main.0" ng-repeat-start="item in ::vm.app.data.meganav.menu track by $index" ng-bind="::item.text">Father's Day</span></a>
                        </li>
                        <li class="nav nav_top__item">
                            <a href="https://www.biscuiteers.com/biscuits" class="BI-topLink p-t-3 p-r p-r-5-l p-r-5-x p-l-5-x p-b-3 p-l p-l-5-l" rel="noopener"><span class="inline-block fs-7 fs-6-l ls--05 link-1" opt-href="/biscuits" meganav-class="link" meganav-hover-active="1" meganav-hover="main.0" ng-repeat-start="item in ::vm.app.data.meganav.menu track by $index" ng-bind="::item.text">Biscuits <i class="icon-right-open fs-3 col-11" ng-if="::!!item.submenu"></i></span></a>

                            
                            <div class="w-12 m-r--100 BI-dropdown" ng-repeat="item in ::vm.app.data.meganav.menu track by $index" ng-if="::item.components.length" meganav="main.0" meganav-hover="main.0">
                                <div class="wrap p-l-4 p-r-4 p-b-8 p-t-8 b-p2">
                                    <div class="bg-col-w">

                                        <div class="flex flex-direction-row flex-wrap-nowrap flex-justify-center flex-top" if-size="!SM">
                                            
                                            <div class="w-5 p-r-4 p-l-0 m-r-0 border-right--pink">
                                                <div class="text BI-lightPink">
                                                    <h2><span style="color: #e679a5;">Biscuits by Occasion</span></h2>
                                                </div>

                                                <ul class="nav nav_list__sub BI-col-2">
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits">View all occasions (18) </a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/send-a-gift/our-top-picks">Top 25</a> 
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/birthday-biscuits">Birthday</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <span class="no-links">&nbsp;</span>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/thank-you-biscuits">Thank you</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <span class="no-links">&nbsp;</span>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/get-well-biscuits">Get well soon</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/send-a-gift/sympathy-gifts">Sympathy</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/send-a-gift/thinking-of-you-gifts">Just because</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <span class="no-links">&nbsp;</span>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/congratulations-biscuits">Congratulations</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/new-baby-biscuits">New Baby</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/new-home-biscuits">New Home</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <span class="no-links">&nbsp;</span>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/wedding-biscuits">Wedding</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/anniversary-biscuits">Anniversary</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/send-a-gift/engagement-gifts">Engagement</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <span class="no-links">&nbsp;</span>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/send-a-gift/best-of-british-gifts">Best of British</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/paddington-bear-biscuits">Paddington</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/biscuits/beatrix-potter-biscuits">Beatrix Potter</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/send-a-gift/mr-men-gifts">Mr. Men</a>
                                                    </li>
                                                    <li class="nav nav_sub__item">
                                                        <a href="https://www.biscuiteers.com/send-a-gift/gosh-collection">GOSH</a>
                                                    </li>
                                                </ul>

                                            </div>

                                            <span class="nav nav_vertBar ng-hide"></span>

                                            <div class="w-7 p-r-0 p-l-4 m-r-0">
                                                <div class="text BI-lightPink">
                                                    <h2><span style="color: #e679a5;">Collection Type</span></h2>
                                                </div>
                                                
                                                <div class="flex flex-direction-row flex-wrap-nowrap flex-justify-center flex-top flex-justify-between">

                                                    <ul class="w-4 nav nav_list__sub">
                                                        <li class="nav nav_sub__item">
                                                            <a href="https://www.biscuiteers.com/biscuits/letterbox-biscuits">Letterbox biscuits</a>
                                                        </li>
                                                        <li class="nav nav_sub__item">
                                                            <a href="https://www.biscuiteers.com/biscuits/jolly-gingers">Jolly Ginger</a>
                                                        </li>
                                                        <li class="nav nav_sub__item">
                                                            <a href="https://www.biscuiteers.com/boutique-icing-cafe">Personalised</a>
                                                        </li>
                                                        <li class="nav nav_sub__item">
                                                            <a href="">&nbsp;</a>
                                                        </li>
                                                        <li class="nav nav_sub__item">
                                                            <a href="https://www.biscuiteers.com/biscuits/mini-biscuit-tins">Biscuit tins</a>
                                                        </li>
                                                        <li class="nav nav_sub__item">
                                                            <a href="https://www.biscuiteers.com/biscuits/gluten-free-biscuit">Gluten free biscuits</a>
                                                        </li>
                                                        <li class="nav nav_sub__item">
                                                            <a href="https://www.biscuiteers.com/biscuits/biscuits-and-fizz">Gift boxes</a>
                                                        </li>
                                                        <li class="nav nav_sub__item">
                                                            <a href="https://www.biscuiteers.com/biscuits/dog-biscuits">Dog biscuits</a>
                                                        </li>
                                                        <li class="nav nav_sub__item">
                                                            <a href="https://www.biscuiteers.com/chocolates">Chocolates</a>
                                                        </li>
                                                    </ul>


                                                    <div class="w-8 p-r-4 p-l-4">
                                                        <div class="BI-menu_cards flex flex-wrap flex-top flex-justify-center flex-justify-between">
                                                            <div class="w-6 t-c p-l-2 p-r-2">
                                                                <img src="data:image/jpeg;base64,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" style="max-height: 75px; width: auto"/>

                                                                <p>Our iconic gingerbread characters <br />from £6.95</p>

                                                                <a href="https://www.biscuiteers.com/biscuits/jolly-gingers" class="BI-btn m-t-2">Shop Jolly Gingers</a>
                                                            </div>
                                                            <div class="w-6 t-c p-l-2 p-r-2">
                                                                <img src="data:image/jpeg;base64,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" style="width: 80px"/>

                                                                <p>Letterbox friendly gifts - popped straight through the postbox from £6.95</p>

                                                                <a href="https://www.biscuiteers.com/biscuits/letterbox-biscuits" class="BI-btn m-t-2">Shop Letterbox Biscuits</a>
                                                            </div>
                                                        </div>

                                                        <div class="BI-specialBox m-t-4 b-dotted-t-b">
                                                           <div class="b-dotted-r-l flex flex-wrap flex-top flex-justify-center flex-justify-between">
                                                                <div class="w-6 p-t-2 p-b-2">
                                                                    <img src="data:image/jpeg;base64,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"/>    
                                                                </div>
                                                                <div class="w-6 p-l-3 p-r-3 p-t-2 p-b-2 t-c">
                                                                    <p>Want to make your pressie even more special?</p>

                                                                    <p>Personalise your gift with a name or message. We'll ice it on in our very best handwriting</p>

                                                                    <a href="https://www.biscuiteers.com/boutique-icing-cafe" class="BI-btn m-t-2">Shop Personalised</a>
                                                                </div>
                                                           </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>


                        </li>

                        <bar class="fs-5 col-11" ng-repeat-end="" ng-if="!$last"></bar>

                        <li class="nav nav_top__item BI-res">
                            <a href="https://www.biscuiteers.com/biscuits" class="BI-topLink p-t-3 p-r p-r-5-l p-r-5-x p-l-5-x p-b-3 p-l p-l-5-l" rel="noopener"><span class="inline-block fs-7 fs-6-l ls--05 link-1" opt-href="/biscuits" meganav-class="link" meganav-hover-active="1" meganav-hover="main.0" ng-repeat-start="item in ::vm.app.data.meganav.menu track by $index" ng-bind="::item.text">Subscriptions &amp; Gifts <i class="icon-right-open fs-3 col-11" ng-if="::!!item.submenu"></i></span></a>


                            <div class="w-4 m-r--100 ng-hide-animate hide-fade ng-hide BI-dropdown BI-dropdown--single" ng-repeat="item in ::vm.app.data.meganav.menu track by $index" ng-if="::item.components.length" meganav="main.0" meganav-hover="main.0">
                                <div class="b-p2">
                                    <div class="bg-col-w b-a">

                                    <div class="flex flex-direction-row flex-wrap-nowrap flex-justify-center flex-top" if-size="!SM">
                                            
                                        <div class="w-12">

                                            <ul class="nav nav_list__sub">
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/biscuiteers-subscriptions" class="p-l-5 p-r-4">Subscriptions</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/gift-cards" class="p-l-5 p-r-4">E-Gift cards</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/icing-classes-and-equipment/icing-class-gift-certificates" class="p-l-5 p-r-4">Experience gifts</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/send-a-gift/gifts-for-home-bakers" class="p-l-5 p-r-4">Biscuiteers merchandise</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/icing-classes-and-equipment/biscuiteers-book-of-iced-biscuits" class="p-l-5 p-r-4">Biscuiteers books</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/send-a-gift/master-icing-kit" class="p-l-5 p-r-4">DIY Icing Kits</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/send-a-gift/biscuiteers-tea" class="p-l-5 p-r-4">Biscuiteers Tea</a>
                                                </li>
                                            </ul>

                                        </div>

                                    </div>


                                </div>
                            </div>


                        </li>
                    </ul>
                </div>
                <div class="nav nav_right">
                    <ul class="nav nav_list__top flex flex-justify-between flex-middle">

                        <li class="nav nav_top__item BI-res BI-singleLink">
                            <a href="https://www.biscuiteers.com/corporate-gifts" class="BI-topLink p-t-3 p-r p-r-5-l p-r-5-x p-l-5-x p-b-3 p-l p-l-5-l" rel="noopener"><span class="inline-block fs-7 fs-6-l ls--05 link-1" opt-href="/biscuits" meganav-class="link" meganav-hover-active="1" meganav-hover="main.0" ng-repeat-start="item in ::vm.app.data.meganav.menu track by $index" ng-bind="::item.text">Corporate Gifting</span></a>
                        </li>

                        <bar class="fs-5 col-11" ng-repeat-end="" ng-if="!$last"></bar>


                        <li class="nav nav_top__item BI-res">
                            <a href="https://www.biscuiteers.com/boutique-icing-cafe" class="BI-topLink p-t-3 p-r p-r-5-l p-r-5-x p-l-5-x p-b-3 p-l p-l-5-l" rel="noopener"><span class="inline-block fs-7 fs-6-l ls--05 link-1" opt-href="/biscuits" meganav-class="link" meganav-hover-active="1" meganav-hover="main.0" ng-repeat-start="item in ::vm.app.data.meganav.menu track by $index" ng-bind="::item.text">Icing Cafes &amp Experiences <i class="icon-right-open fs-3 col-11" ng-if="::!!item.submenu"></i></span></a>


                            <div class="w-4 m-r--100 ng-hide-animate hide-fade ng-hide BI-dropdown BI-dropdown--single" ng-repeat="item in ::vm.app.data.meganav.menu track by $index" ng-if="::item.components.length" meganav="main.0" meganav-hover="main.0">
                                <div class="b-p2">
                                    <div class="bg-col-w b-a">

                                    <div class="flex flex-direction-row flex-wrap-nowrap flex-justify-center flex-top" if-size="!SM">
                                            
                                        <div class="w-12">

                                            <ul class="nav nav_list__sub">
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/boutique-icing-cafe" class="p-l-5 p-r-4">Café locations</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/school" class="p-l-5 p-r-4">School of icing</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/mothers-day-afternoon-tea" class="p-l-5 p-r-4">Afternoon Tea</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/boutique-icing-cafe/biscuiteers-icing-cafe" class="p-l-5 p-r-4">DIY icing café</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/boutique-icing-cafe/private-icing-parties" class="p-l-5 p-r-4">Parties & Events</a>
                                                </li>
                                                <li class="nav nav_sub__item">
                                                    <a href="https://www.biscuiteers.com/cafe-cakes-and-pre-orders" class="p-l-5 p-r-4">Café cakes</a>
                                                </li>
                                                
                                            </ul>

                                        </div>

                                    </div>


                                </div>
                            </div>


                        </li>

                    </ul>
                </div>

            </div>
            
        </if-not-checkout-process>
    `);    
};

export default nav;