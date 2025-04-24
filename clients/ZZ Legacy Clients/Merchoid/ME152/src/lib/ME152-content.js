const welcomeText = '<hr><div class="ME152-welcome_text"><p><strong>Welcome to Merchoid</strong> The place for all your awesome official geek merch with free worldwide shipping</p></div><hr>';
const topButtons = `<div class="ME152-buttons">
<div class="ME152-button ME152-him" data_gender="men"><span>Shop for him</span></div>
<div class="ME152-button ME152-him" data_gender="women"><span>Shop for her</span></div>
</div>`;

/* eslint-disable*/
const popularBrands = {
  brands:[
    {
      name:'All Brands',
      image: '#',
      query: 'all-brands'
    },
    {
      name:'Infinity War',
      image: '//merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/03/infinitywarbrand.png',
      query: 'infinity-war'
    },
    {
      name:'Black Panther',
      image: '//cdn.optimizely.com/img/6087172626/441cabb82dab4d4794bf0f9a634b5256.jpg',
      query: 'black-panther'
    },
    {
      name:'Rick and Morty',
      image: '//cdn.optimizely.com/img/6087172626/2d02589d95d64410aab3a63de658329b.jpg',
      query: 'rick-and-morty'
    },
    {
      name:'Legend of Zelda',
      image: '//cdn.optimizely.com/img/6087172626/25d3907d3c784648afb9e7aff41dc453.jpg',
      query: 'nintendo-legend-of-zelda'
    },
    {
      name:'Star Wars',
      image: '//cdn.optimizely.com/img/6087172626/37f6d9a33de04195b53154d2a25f0e26.jpg',
      query: 'star-wars'
    },
    {
      name:'Marvel',
      image: '//cdn.optimizely.com/img/6087172626/4c2283012b344488a4f3fbe6a49ce95b.jpg',
      query: 'marvel'
    },
    {
      name:'DC Comics',
      image: '//cdn.optimizely.com/img/6087172626/0c12c68405334a51b88837970389ddb6.jpg',
      query: 'dc-comics'
    },
    {
      name:'Batman',
      image: '//cdn.optimizely.com/img/6087172626/1fa310cb67b24acd99f8dcf6abeef692.gif',
      query: 'batman'
    },
    {
      name:'Superman',
      image: '//cdn.optimizely.com/img/6087172626/dce6ecaa372f4feba94f1ccb1578f6fa.jpg',
      query: 'superman'
    },
    {
      name:'Nintendo',
      image: '//cdn.optimizely.com/img/6087172626/48943f2776f04b0a917878ef620c80fe.jpg',
      query: 'nintendo'
    },
    {
      name:'Fallout',
      image: 'data:image/webp;base64,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',
      query: 'fallout'
    },
    {
      name:'Super Mario Bros',
      image: '//cdn.optimizely.com/img/6087172626/134b52540b3a4aa1ad8eca817a2f4be6.jpg',
      query: 'nintendo-super-mario-bros'
    },
    {
      name:'Harry Potter',
      image: '//cdn.optimizely.com/img/6087172626/c0fab7da537e4cd3a2bf49a6f16e7404.jpg',
      query: 'harry-potter'
    },
    {
      name:'Destiny',
      image: '//cdn.optimizely.com/img/6087172626/7efe5773767d437c804ace3cf8939f8b.jpg',
      query: 'destiny'
    },
    {
      name:'Assassin\'s Creed',
      image: '//cdn.optimizely.com/img/6087172626/331183a2902847ab8814465938911f4a.jpg',
      query: 'assassins-creed'
    },
    {
      name:'Harley Quinn',
      image: '//cdn.optimizely.com/img/6087172626/e0d80e6688964f5ea963065fcf7cbd5b.jpg',
      query: 'harley-quinn'
    },
    {
      name:'Wonder Woman',
      image: '//cdn.optimizely.com/img/6087172626/dae6883f6c2f4556a523e783cdfed72c.jpg',
      query: 'wonder-woman'
    },
    {
      name:'Guardians of the Galaxy',
      image: '//cdn.optimizely.com/img/6087172626/01ef480888f54ab2b7963328cc7b6eb6.jpg',
      query: 'guardians-of-the-galaxy'
    },
    {
      name:'PlayStation',
      image: '//cdn.optimizely.com/img/6087172626/7a4b2e2ddfa844838617b3542b5b2201.jpg',
      query: 'playstation'
    },
    {
      name:'Kingdom Hearts',
      image: '//merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/02/kingdomhearts.jpg',
      query: 'kingdom-hearts'
    },
    {
      name:'Blizzard',
      image: 'data:image/webp;base64,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',
      query: 'blizzard'
    },
    {
      name:'The Avengers',
      image: 'data:image/webp;base64,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',
      query: 'the-avengers'
    },
    {
      name:'Resident Evil',
      image: '//cdn.optimizely.com/img/6087172626/04a27b4ae1e74889b681f1b8b3395e7b.jpg',
      query: 'resident-evil'
    },
    {
      name:'Square Enix',
      image: '//merchoid-pveiw4zwh96ot9z.netdna-ssl.com/wp-content/uploads/2018/02/squareenix.jpg',
      query: 'square-enix'
    },
    {
      name:'Deadpool',
      image: '//cdn.optimizely.com/img/6087172626/f01a7623f0534273a501c3288293484d.jpg',
      query: 'deadpool'
    },
    {
      name:'Deadpool',
      image: '//cdn.optimizely.com/img/6087172626/f01a7623f0534273a501c3288293484d.jpg',
      query: 'deadpool'
    },
    {
      name:'Spiderman',
      image: '//cdn.optimizely.com/img/6087172626/65bd76f4b9fa447c827cae1691c82824.jpg',
      query: 'spiderman'
    },
    {
      name:'Overwatch',
      image: '//cdn.optimizely.com/img/6087172626/d3fb101a26c5420e9c3c6574426bc08a.jpg',
      query: 'overwatch'
    },
    {
      name:'X-Men',
      image: '//cdn.optimizely.com/img/6087172626/d3fb101a26c5420e9c3c6574426bc08a.jpg',
      query: 'x-men'
    },
    {
      name:'Disney',
      image: '//cdn.optimizely.com/img/6087172626/9c22f89caa794f38835bf8841c16dae7.jpg',
      query: 'disney'
    },
    {
      name:'The Walking Dead',
      image: '//cdn.optimizely.com/img/6087172626/38c3ade47e144ed5afe975a7b30adc38.jpg',
      query: 'the-walking-dead'
    },
    {
      name:'Street Fighter',
      image: '//cdn.optimizely.com/img/6087172626/fb72231be40d4629b88bcab2fcaa4e26.jpg',
      query: 'street-fighter'
    },
    {
      name:'Captain America',
      image: '//cdn.optimizely.com/img/6087172626/81b27e5781144a18afb59f12d0798218.jpg',
      query: 'captain-america'
    },
    {
      name:'Sonic the Hedgehog',
      image: '//cdn.optimizely.com/img/6087172626/3b0230320444490e86e604b5742f581f.jpg',
      query: 'sonic-the-hedgehog'
    },
    {
      name:'The Flash',
      image: '//cdn.optimizely.com/img/6087172626/81672ff2dcff40cdad0df72a14f84bb2.jpg',
      query: 'the-flash'
    },
    {
      name:'Suicide Squad',
      image: '//cdn.optimizely.com/img/6087172626/619f60d7f6d54f2988946b5bb1178ca4.jpg',
      query: 'suicide-squad'
    },
    {
      name:'Game of Thrones',
      image: '//cdn.optimizely.com/img/6087172626/9c732c5edd0f4021845237bbb5b87692.jpg',
      query: 'game-of-thrones'
    },
    {
      name:'Pokemon',
      image: '//cdn.optimizely.com/img/6087172626/5c051218e1de4e93a5f3241c4817e8d4.jpg',
      query: 'pokemon'
    },
  ],
}
/* eslint-enable */
export { welcomeText, topButtons, popularBrands };

