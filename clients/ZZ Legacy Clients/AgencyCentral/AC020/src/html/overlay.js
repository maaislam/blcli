// Overlay to be shown on search

const overlayHtml = `
    <div class="ac6-overlay">
        <div class="ac6-overlay__content ac6-absolute ac6-trxym50 ac6-top-50pc ac6-left-50pc">
            <div class="text-center ac6-message ac6-message--first">
                We're checking all recruitment agencies against your requirements...
            </div>
            <div class="text-center ac6-message ac6-message--second hide">
                Just a moment while we create your personalised list...
            </div>
            <div class="ac6-cogs-wrapper">
                <svg class="ac6-cog ac6-cog-1 ac6-animate-rotate ac6-animate-rotate--1">
                    <use xlink:href="#ac6-icon-cog" />
                </svg>
                <svg class="ac6-cog ac6-cog-2 ac6-animate-rotate ac6-animate-rotate--2">
                    <use xlink:href="#ac6-icon-cog" />
                </svg
            </div>
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="ac6-icon-cog" viewBox="0 0 52.4 54.7">
            <path d="M7.2,45.3c-1,0.5-2.2,0.2-2.8-0.8l-4.1-7.1c-0.6-1-0.2-2.2,0.7-2.8l2.8-1.7c0.9-0.6,1.7-1.9,1.7-3v-5.2
            c0-1.1-0.8-2.5-1.7-3L1.1,20c-0.9-0.6-1.3-1.8-0.7-2.8l4.1-7.1c0.6-1,1.8-1.3,2.8-0.8l2.9,1.6c1,0.5,2.5,0.5,3.5,0l4.5-2.6
            c1-0.5,1.7-1.9,1.8-3L20.1,2c0-1.1,0.9-2,2.1-2h8.1c1.1,0,2,0.9,2.1,2l0.1,3.3c0,1.1,0.8,2.4,1.8,3l4.5,2.6c1,0.6,2.5,0.6,3.5,0
            l2.9-1.6c1-0.5,2.2-0.2,2.8,0.8l4.1,7.1c0.6,1,0.2,2.2-0.7,2.8l-2.8,1.7c-0.9,0.6-1.7,1.9-1.7,3v5.2c0,1.1,0.8,2.5,1.7,3l2.8,1.7
            c0.9,0.6,1.3,1.8,0.7,2.8L48,44.5c-0.6,1-1.8,1.3-2.8,0.8l-3.1-1.6c-1-0.5-2.5-0.5-3.5,0l-4.5,2.7c-1,0.5-1.7,1.9-1.8,3l-0.1,3.3
            c0,1.1-0.9,2-2.1,2H22c-1.1,0-2-0.9-2.1-2l-0.1-3.3c0-1.1-0.8-2.4-1.8-3l-4.5-2.6c-1-0.6-2.5-0.6-3.5,0L7.2,45.3z M20.1,37.7
            c5.7,3.3,13.1,1.3,16.4-4.4c3.3-5.7,1.3-13.1-4.4-16.4c-5.7-3.3-13.1-1.3-16.4,4.4C12.4,27.1,14.3,34.4,20.1,37.7z"/>
        </symbol>
    </svg>
`;

export default overlayHtml;
