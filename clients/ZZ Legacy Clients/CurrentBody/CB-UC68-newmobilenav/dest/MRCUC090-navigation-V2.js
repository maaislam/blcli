console.log('UPDATED');

var $ = jQuery;

if ($(window).width() < 800) {

$(function () {
    
    $('body').addClass('UC090V2');

    var newNav = $([
    '<div class="large-12 uc090_mobilenav_wrap clearfix">',
        //'<div class="uc090_message">Message</div>',
        '<div class="uc090-button clearfix">',
                '<div class="uc090_mobnav_button brands">', 
                    '<div class="uc090but-title brands">',
                        'Brands',
                    '</div>',
                '</div>',
               '<div class="uc090_mobnav_button clothing">',
                     '<div class="uc090but-title clothing">',
                        'Clothing',
                     '</div>',
               '</div>',
                '<div class="uc090_mobnav_button gifts">', 
                    '<div class="uc090but-title gifts">',
                        'Gifts',
                    '</div>',
                '</div>',
        '</div>',
    '</div>'
     ].join('')); 
    
  newNav.insertAfter('.wide-nav.dark-header.nav-left');




   //Brand Links 
    var brandLinks = {
        marvelLink: 'http://www.merchoid.com/brand/marvel/',
        batmanLink: 'http://www.merchoid.com/brand/dc-comics-batman/',
        ssLink: 'http://www.merchoid.com/suicide-squad-t-shirts-and-merchandise/',
        swLink: 'http://www.merchoid.com/brand/star-wars/',
    };

    var brandImages = {
        marvelImage: '//cdn.optimizely.com/img/6087172626/9dbe72ba4d714b51b8769aaf810454e9.png',
        ssquadImage: '//cdn.optimizely.com/img/6269321863/dfbfe5ebf0a34370a4a3b58f15fb38e1.png',
        starwarsImage: '//cdn.optimizely.com/img/6269321863/4cd7833a8cd54e77857f8be9356ebb0c.png',
        batmanImage: '//cdn.optimizely.com/img/6269321863/2633520444d4475d9f5f947ea34a2c2b.png',
    };

    //Clothing Links
    var clothingLinks = {
        xmasLink: 'http://www.merchoid.com/geeks-guide-to-ugly-christmas-sweaterjumpers/',
        tshirtLink: 'http://www.merchoid.com/stuff/t-shirts-and-tops/',
        hoodiesLink: 'http://www.merchoid.com/stuff/hoodies-and-sweatshirts/',
        allwomensLink: 'http://www.merchoid.com/stuff/women/',
    };
    
    var giftsLinks ={
        toysLink: 'http://www.merchoid.com/stuff/toys-figures-and-plushies/',
        figuresLink: 'http://www.merchoid.com/stuff/toys-figures-and-plushies/',
        homeofficeLink: 'http://www.merchoid.com/stuff/home-and-office/'
    };
    var imagesgiftLink = {
        toys: '//cdn.optimizely.com/img/6087172626/331310dc7a5f4bfd8908acb5d21b372e.png',
        figures: '//cdn.optimizely.com/img/6087172626/6ef161ae6dbb459e9a39d27de2d7af6d.png',
        homeofficeimg: '//cdn.optimizely.com/img/6087172626/380a379c2fd74d32a0e342ac268310c8.png'
    };

    //Clothing Icons    
    var imagesLink = {

        xmasimage: '//cdn.optimizely.com/img/6087172626/f240c88cf68a4d69a4ff59c668fff2ae.png',
        tshirt: '//cdn.optimizely.com/img/6087172626/75a9ac1b42544cc2bdc6bf2fe9d0f569.png',
        hood: '//cdn.optimizely.com/img/6087172626/3cb3f507872e4747bb5fbecbcb3d7c46.png',
        womens: '//cdn.optimizely.com/img/6087172626/aabaff25f1e24c8f8500ae7ab3125a74.png',

    };

    //Markup
    var Links = $([
                '<div class="uc090-links brands">', //brands
                    '<div class="uc-link">',
                        '<img src="' + brandImages.marvelImage + '"/>',
                        '<a href="' + brandLinks.marvelLink + '">Marvel</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                    '<div class="uc-link">',
                        '<img src="' + brandImages.ssquadImage + '"/>',
                        '<a href="' + brandLinks.ssLink + '">Suicide Squad</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                    '<div class="uc-link">',
                        '<img src="' + brandImages.starwarsImage + '"/>',
                        '<a href="' + brandLinks.swLink + '">Star Wars</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                    '<div class="uc-link">',
                        '<img src="' + brandImages.batmanImage + '"/>',
                        '<a href="' + brandLinks.batmanLink + '">Batman</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                    '<div class="uc-link brandall">',
                        '<a class="ucviewall" href="#">View All</a>',
                            '<ul class="ucbrandall">',
                            '</ul>',
                    '</div>',
                '</div>',
               '<div class="uc090-links gifts">', //gifts
                    '<div class="uc-link">',
                        '<img src="' + imagesgiftLink.toys + '"/>',
                        '<a href="' + giftsLinks.toysLink + '">Toys</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                    '<div class="uc-link">',
                        '<img src="' + imagesgiftLink.figures + '"/>',
                        '<a href="' + giftsLinks.figuresLink + '">Figures & Plushies</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                    '<div class="uc-link">',
                        '<img src="' + imagesgiftLink.homeofficeimg + '"/>',
                        '<a href="' + giftsLinks.homeofficeLink + '">Home & Office</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                '</div>',
                '<div class="uc090-links clothing">', //clothing
                    '<div class="uc-link">',
                        '<img src="' + imagesLink.xmasimage + '"/>',
                        '<a href="' + clothingLinks.xmasLink + '">Christmas Sweaters/Jumpers</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                    '<div class="uc-link">',
                        '<img src="' + imagesLink.tshirt + '"/>',
                        '<a href="' + clothingLinks.tshirtLink + '">T-Shirts</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                   '<div class="uc-link">',
                        '<img src="' + imagesLink.hood + '"/>',
                        '<a href="' + clothingLinks.hoodiesLink + '">Hoodies</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                   '<div class="uc-link">',
                        '<img src="' + imagesLink.womens + '"/>',
                        '<a href="' + clothingLinks.allwomensLink + '">All Womens Clothing</a>',
                        '<img class="uc90-arrow" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
                    '</div>',
                '</div>'
               ].join('')).insertAfter('.uc090-button');




    //click functions//

    $('.uc090_mobnav_button.clothing').click(function () {
        ga('send', 'event', 'Clicked clothing tab UC090v2','tab clicked', {nonInteraction: 1});
        $('.uc090-links.clothing').toggleClass('active').siblings().removeClass('active');
        $('.uc090-links.clothing').toggleClass('arrow_box').siblings().removeClass('arrow_box');
    });

    $('.uc090_mobnav_button.brands').click(function () {
        ga('send', 'event', 'Clicked brands tab UC090v2','tab clicked', {nonInteraction: 1});
        $('.uc090-links.brands').toggleClass('active').siblings().removeClass('active');
        
        $('.uc090-links.brands').toggleClass('arrow_box').siblings().removeClass('arrow_box');
    });
    
    $('.uc090_mobnav_button.gifts').click(function () {
        ga('send', 'event', 'Clicked gifts tab UC090v2','tab clicked', {nonInteraction: 1});
        $('.uc090-links.gifts').toggleClass('active').siblings().removeClass('active');
        $('.uc090-links.gifts').toggleClass('arrow_box').siblings().removeClass('arrow_box');
    });

    $('.uc-link.brandall').click(function () {
        $('.ucbrandall').slideToggle();
        $('.arrow_box').toggleClass('change');
    });
    $('.uc-link.clothall').click(function () {
        $('.ucclothall').slideToggle();
    });
    
    
    //loop through all brands
var allbrandLinks = [
    
        ['Alien','http://www.merchoid.com/brand/alien/'],
        ['Ant-Man','http://www.merchoid.com/brand/ant-man/'], 
        ['Assassin’s Creed','http://www.merchoid.com/brand/assassins-creed/'],
        ['Atari','http://www.merchoid.com/brand/atari/'],
        ['Batman','http://www.merchoid.com/brand/dc-comics-batman/'],
        ['Breaking Bad','http://www.merchoid.com/brand/breaking-bad/'],
        ['Call of Duty','http://www.merchoid.com/brand/call-of-duty/'],
        ['Captain America','http://www.merchoid.com/brand/captain-america/'],
        ['Deadpool','http://www.merchoid.com/brand/deadpool/'],
        ['Destiny','http://www.merchoid.com/brand/destiny/'],
        ['Doctor Who','http://www.merchoid.com/brand/doctor-who/'],
        ['DotA','http://www.merchoid.com/brand/defense-of-the-ancients-dota/'],
        ['Doom','http://www.merchoid.com/brand/doom/'],
        ['Fallout','http://www.merchoid.com/brand/fallout/'],
        ['Game of Thrones','http://www.merchoid.com/brand/game-of-thrones/'],
        ['Guardians of the Galaxy','http://www.merchoid.com/brand/guardians-of-the-galaxy/'],
        ['Halo','http://www.merchoid.com/brand/halo-4/'],
        ['Harry Potter','http://www.merchoid.com/brand/harry-potter/'],
        ['Jurassic Park','http://www.merchoid.com/brand/jurassic-park/'],
        ['Legend of Zelda','http://www.merchoid.com/brand/nintendo-legend-of-zelda/'],
        ['Mass Effect','http://www.merchoid.com/brand/mass-effect/'],
        ['Metal Gear Solid','http://www.merchoid.com/brand/metal-gear-solid/'],
        ['Minecraft','http://www.merchoid.com/brand/minecraft/'],
        ['Plants vs. Zombies','http://www.merchoid.com/brand/plants-vs-zombies/'],
        ['Pokemon','http://www.merchoid.com/brand/pokemon/'],
        ['Portal 2','http://www.merchoid.com/brand/portal-2/'],
        ['Resident Evil','http://www.merchoid.com/brand/resident-evil/'],
        ['Silent Hill','http://www.merchoid.com/brand/silent-hill/'],
        ['Sonic the Hedgehog','http://www.merchoid.com/brand/sonic-the-hedgehog/'],
        ['Space Invaders','http://www.merchoid.com/brand/space-invaders/'],
        ['Star Trek','http://www.merchoid.com/brand/star-trek/'],
        ['Star Wars','http://www.merchoid.com/brand/star-wars/'],
        ['Street Fighter','http://www.merchoid.com/brand/capcom-street-fighter/'],
        ['Suicide Squad','http://www.merchoid.com/suicide-squad-t-shirts-and-merchandise/'],
        ['Superman','http://www.merchoid.com/brand/dc-comics-superman/'],
        ['Super Mario Bros','http://www.merchoid.com/brand/nintendo-super-mario-bros/'],
        ['Team Fortress 2','http://www.merchoid.com/brand/team-fortress-2/'],
        ['Terminator','http://www.merchoid.com/brand/terminator/'],
        ['Tetris','http://www.merchoid.com/brand/tetris/'],
        ['The Avengers','http://www.merchoid.com/brand/the-avengers/'],
        ['The Elder Scrolls','http://www.merchoid.com/brand/the-elder-scrolls/'],
        ['The Punisher','http://www.merchoid.com/brand/the-punisher/'],
        ['The Walking Dead','http://www.merchoid.com/brand/the-walking-dead/'],
        ['Transformers','http://www.merchoid.com/brand/transformers/'],
        ['Watchdogs','http://www.merchoid.com/brand/watchdogs/'],
        ['Wonder Woman','http://www.merchoid.com/brand/dc-comics-wonder-woman/'],
        ['Zelda','http://www.merchoid.com/brand/nintendo-legend-of- zelda/'],
        ['All DC Merchandise','http://www.merchoid.com/brand/dc-comics/'],
        ['All Marvel Merchandise','http://www.merchoid.com/brand/marvel/'],
        ['Atari Merchandise','http://www.merchoid.com/brand/atari/'],
        ['All Nintendo Merchandise','http://www.merchoid.com/brand/nintendo-original/'],
        ['All PlayStation Merchandise','http://www.merchoid.com/brand/playstation/'],
        ['All Sega Merchandise','http://www.merchoid.com/brand/sega/']
          
    ];


    $.each(allbrandLinks, function () {
                var name = this[0],
                    link = this[1];

        $([
        '<li>',
         '<a href="'+link+'">'+name+'</a>',
            '<img class="uc90-arrowsmall" src="//cdn.optimizely.com/img/6269321863/df24de405caf4dd79664ae3c83e054db.png"/>',
        '</li>'
      ].join('')).appendTo('.ucbrandall');

   });
   
    
});
}