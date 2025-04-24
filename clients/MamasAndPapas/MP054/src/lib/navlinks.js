/*Change the main links text*/
export default function changeLinks() {

    const mainNav = $('.nav_group.list-unstyled');

    //CHANGE THE TEXT OF THE FIRST SET OF LINKS
    function changeMainLinks() {
        //loop through each nav link, find the a tag if it matches title, change the category
        mainNav.find('.nav_groupLink > a').each(function () {
            var title = $(this).text().trim();
            var newCategory,
                newClass;
            var linkText;

            switch (title) {
                case 'Christmas':
                    linkText = 'Christmas <span>(Stockings, Toys, Gifts...)</span>';
                    newClass = 'mp54-christmas-main';
                    break;
                case 'Baby Clothing':
                    linkText = 'Baby Clothing <span>(Boys, Girls, Unisex...)</span>';
                    newClass = 'mp54-baby-clothing-main';
                    break;
                case 'Nursery':
                    linkText = 'Nursery Furniture<span>(Cotbeds, Wardrobes, Dressers...)</span>';
                    newClass = 'mp54-nursery-main';
                    break;
                case 'Pushchairs & Car Seats':
                    linkText = 'Pushchairs & Car Seats<span>(Pushchairs, Prams, Buggies...)</span>';
                    newClass = 'mp54-pushchairs-main';
                    break;
                case 'Toys & Gifts':
                    linkText = 'Toys & Gifts <span>(Baby Showers, Christening, Birthdays...)</span>';
                    newClass = 'mp54-toysgifts-main';
                    break;
                case 'For Mum':
                    linkText = 'Maternity Clothing<span>(Sleepwear, T Shirts, Leggings...)</span>';
                    newClass = 'mp54-maternity-main';
                    break;
                case 'Bathing & Feeding':
                    linkText = 'Bathing & Feeding<span>(Highchairs, Cutlery, Bath...)</span>';
                    newClass = 'mp54-bathing-main';
                    break;

            }
            if (linkText) {
                var mainLinks = $(this);
                mainLinks.html(linkText);
               mainLinks.closest('.nav_groupLink').addClass(newClass);
            }
        });
    }
    changeMainLinks();

    //Move main links around
    let bathingMain = $('.mp54-bathing-main'),
        clothingMain = $('.mp54-baby-clothing-main'),
        beddingMain = $('.MP54-beddingMain'),
        furnitureMain = $('.mp54-nursery-main');

        bathingMain.insertAfter(clothingMain);
        beddingMain.insertAfter(furnitureMain);


    //CREATE THE TWO NEW LINKS - TOYS & GIFTS
    function addToysGifts() {

        var lastcatLink = $('.MP54-beddingMaincat');

        const addToys = $(`
            <div class="nav_category bg-white pb-3" data-category="nav_CMSLinkComponentModel(toys)">
                <div data-goto-category="nav_primary" class="nav_categoryTitle nav_backArrow cursor-pointer p-3 pl-5 js-navSwitchCategory">
                 <a href="#" title="toys">Toys</a>
               </div>
                 <ul class="nav_group list-unstyled m-0 px-3">
                 </ul>
            </div>`);

        const addGifts = $(`
            <div class="nav_category bg-white pb-3" data-category="nav_CMSLinkComponentModel(gifts)">
                <div data-goto-category="nav_CMSLinkComponentModel(8800848806972@2)" class="nav_categoryTitle nav_backArrow cursor-pointer p-3 pl-5 js-navSwitchCategory">
                <a href="#" title="toys">Gifts</a>
               </div>
            <ul class="nav_group list-unstyled m-0 px-3">
            </ul>
            </div>`);

        addToys.insertAfter(lastcatLink);
        addGifts.insertAfter(lastcatLink);


    }
    addToysGifts();


    //ADD THE DESCRIPTIONS ON EACH LINK
    function linkDesc() {
        //add descriptions of each link
        var $menu = $('.nav_category');
        var map = {
            //Christmas
            'The Ideal Gift': '(Decorations, Toys, Clothing...)',
            'Baby’s First Christmas': '(Baubles, Christmas Toys...)',
            'The Night Before Christmas': '(Cribs, Stockings, Sleepwear....)',
            'Let’s Celebrate – Partywear': '(Occasion Clothing...)',
            'Baby’s First Christmas Dinner': '(Highchairs, Cups, Cutlery...);',
            'Personalised Gifts': '(Decorations, Stockings, Blankets...)',
            'Shop by Price': '(Under £20, £20-£50...)',

            //bedding & interiors
            'Interior Collections': '(Select Interior Designs...)',
            'Baby Bedding': '(Sleep Bags, Duvets, Pillows...)',
            'Moses Baskets & Bedside Sleeping': '(Moses Baskets, Bedside Cribs...)',
            'Blankets': '(Patterned, Knitted...)',
            'Wall Art': '(Wallpaper, Stickers, Prints...)',
            'Curtains': 'Full Length, Window Length...)',
            'Soft Furnishings': '(Changing Mattresses, Art...)',

            //mattresses
            'Mattresses': '(Foam, Sprung...)',
            'Mattress Covers': '(Anti-allergy, Waterproof...)',

            'Night Lights & Monitors': '(Nightlights, Video, Thermometers...)',
            'Cot Mobiles': '(Ceiling, Cot, Musical...)',
            'Dreampods & Swaddling': '(Sleep Bags, Swaddle Wraps...)',
            '3 for 2 Baby Bedding': '(Fitted Sheets, Sleep Bags...)',

            //pushchairs
            'Pushchairs & Prams': '(Prams, Pushchairs, Carrycots...)',
            'Buggies': '(Buggies, Covers, Liners...) ',
            'Car Seats': '(Seats, Bases, Adaptors...) ',
            'Travel Accessories': '(Changing Bags, Footmuff, Carrier....)',


            'Highchairs': '(Highchairs, Booster Seats...)',
            'Feeding': '(Cutlery, Bottles, Pumps...)',
            'Bath Time': '(Bath, Changing Mattresses, Towels...)',

            //clothing
            'All Boys': '(Coats, Trousers, Shoes...)',
            'All Girls': '(Coats, Trousers, Shoes...)',
            'All Unisex': '(Gender Neutral Clothing, Accessories...)',
            'New In': '(Latest Coats, Trousers, Shoes...)',
            'Everyday Wear': '(Casual Clothing, Jumpers, All-in-ones...)',
            'Outerwear': '(Warm Clothing, Pramsuits, Jackets...)',
            'Occasion Wear': '(Smart Clothing, Outfits, Blazers...)',
            'Nightwear': '(Sleep Bags, Swaddle Wraps, Pyjamas...)',
            'Accessories': '(Bibs, Socks, Hats, Shoes...)',
        }

        for (var title in map) {
            $menu.find('a[title="' + title + '"]').append('<span>' + map[title] + '</span>');
        }
    }
    linkDesc();



}