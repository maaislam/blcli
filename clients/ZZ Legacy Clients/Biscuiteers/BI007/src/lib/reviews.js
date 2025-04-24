let currentProduct = document.querySelector('.product-content__description h1');
if(!currentProduct) {
    currentProduct = document.querySelector('[name=productView] h1');
}

let currentProductName = 'product';
if(currentProduct) {
    currentProductName = currentProduct.textContent.trim();
}

const reviews = {
    '/biscuits/london-collection': {
        'person': 'Lauren',
        'avatar': '//www.sitegainer.com/fu/up/vnjgvghoa5w8ai9.jpg',
        'review': "Lauren is our digital marketing manager and still can't quite believe she lives and works in London. She loves black cabs, red double decker buses and, of courses, our London Biscuit Tin"
    },
    '/biscuits/mini-hamper-engagement': {
        'person': 'Nicola',
        'avatar': '//www.sitegainer.com/fu/up/eioyeodyflit2je.jpg',
        'review': `Nicola is our Head of Marketing, known to her friends as the engagement gift queen. In 2017 she has celebrated at least 5 friends' engagements so our ${currentProductName} has been sent a fair few times...`
    },
    '/biscuits/engagement-biscuit-tin': {
        'person': 'Nicola',
        'avatar': '//www.sitegainer.com/fu/up/eioyeodyflit2je.jpg',
        'review': `Nicola is our Head of Marketing, known to her friends as the engagement gift queen. In 2017 she has celebrated at least 5 friends' engagements so our ${currentProductName} has been sent a fair few times...`
    },
    '/biscuits/personalised-pencil-card-591': {
        'person': 'Cassie',
        'avatar': '//www.sitegainer.com/fu/up/as8itv91e6yl5b9.jpg',
        'review': "Cassie, our Head of Brand, is a stationery fanatic with all of her pens and pads colour coordinated. This Personalised pencil card is her top pick."
    },
    '/biscuits/birthday-treats-biscuit-tin': {
        'person': 'Caroline',
        'avatar': '//www.sitegainer.com/fu/up/fzba4oc8tb0r1m2.jpg',
        'review': "Caroline from our Corporate and Bespoke team is always going to Afternoon Tea with her girlfriends so this Patisserie Biscuit Tin is the obvious choice for her favourite biscuits!"
    },
    '/biscuits/cheese-and-biscuits-gift-tin': {
        'person': 'Caroline',
        'avatar': '//www.sitegainer.com/fu/up/fzba4oc8tb0r1m2.jpg',
        'review': "Most of the Biscuiteers are partial to bit of cheese but Caroline is a fromage fanatic. The Say Cheese tin is one of her favourite tins of all time (although she might be a bit biased!)"
    },
    '/biscuits/hen-biscuit-box': {
        'person': 'Sinead',
        'avatar': '//www.sitegainer.com/fu/up/4i5l6842scj8soq.jpg',
        'review': "Sinead our Sales and Marketing Assistant is potentially the worlds most experienced Hen Party planner (8 hens organised at the last count). These are a MUST at her parties."
    },
    '/mother-s-day/tea-for-two-biscuit-tin': {
        'person': 'Sinead',
        'avatar': '//www.sitegainer.com/fu/up/4i5l6842scj8soq.jpg',
        'review': "If the kettle at Biscuiteers HQ is still warm, you can bet that's because Sales and Marketing Assistant Sinead has been making a cuppa. Her top pick: Tea for Two Biscuit Tin"
    },
    '/biscuits/frida-jolly-ginger-gingerbread': {
        'person': 'Hayley',
        'avatar': '//www.sitegainer.com/fu/up/jf8qlpbezsyq0ii.jpg',
        'review': "Hayley, from our Corporate and Bespoke team, spent 18 months travelling around South America. Frida reminds her of the fabulous time she spent exploring the cities!"
    },
    '/biscuits/fruit-basket-biscuit-tin': {
        'person': 'Hayley',
        'avatar': '//www.sitegainer.com/fu/up/jf8qlpbezsyq0ii.jpg',
        'review': "Hayley, from our Corporate and Bespoke team, likes to make sure she gets her 5 a day. The Fruit Basket tin is her top pick!"
    },
    '/biscuits/easter-egg-mini-biscuit-collection': {
        'person': 'Francesca',
        'avatar': '//www.sitegainer.com/fu/up/jf8qlpbezsyq0ii.jpg',
        'review': ""
    },
    '/biscuits/twelve-days-christmas-biscuit-gift-tin': {
        'person': 'Francesca',
        'avatar': '//www.sitegainer.com/fu/up/jf8qlpbezsyq0ii.jpg',
        'review': ""
    },
    '/biscuits/the-good-life-biscuit-tin': {
        'person': 'Becky',
        'avatar': '//www.sitegainer.com/fu/up/kt0cw0xnra6teiq.jpg',
        'review': "Commercial Director Becky dreams of a cottage garden, complete with a greenhouse for growing veg. The Good Life Biscuit tin has perfect produce everytime!"
    },
    '/mother-s-day/butterfly-biscuit-mini-collection-biscuit-tin': {
        'person': 'Becky',
        'avatar': '//www.sitegainer.com/fu/up/kt0cw0xnra6teiq.jpg',
        'review': "Commercial Director Becky dreams of a gorgeous garden full of fluttering butterflies! Our Butterfly Biscuit tin is her top choice!"
    },
    '/mother-s-day/bouquet-biscuit-tin': {
        'person': 'Emily',
        'avatar': '//www.sitegainer.com/fu/up/lnkw9beq9szp9f0.jpg',
        'review': "Emily our Digital Marketing Executive (and a real green fingered type) knows the names and meaning of hundreds of plants and flowers. This Bouquet Biscuit Tin features some of her favourites."
    },
    '/biscuits/beatrix-potter-biscuit-tin': {
        'person': 'Emily',
        'avatar': '//www.sitegainer.com/fu/up/lnkw9beq9szp9f0.jpg',
        'review': "Growing up Emily's favourite author was Beatrix Potter. Whenever she can, she sends the Beatrix Potter Biscuit Tin to celebrate any new arrivals!"
    },
    '/biscuits/fruit-basket-biscuit-tin': {
        'person': 'Matty',
        'avatar': '//www.sitegainer.com/fu/up/jc1xcxplslzj0cz.jpg',
        'review': "Matty from our Customer Service team is all about bright colours (you should see her jumper collection!) so our Fruit Basket Collection, with its super cheery colour pallette, is her favourite collection"
    },
    '/biscuits/champagne-charlie': {
        'person': 'Matty',
        'avatar': '//www.sitegainer.com/fu/up/jc1xcxplslzj0cz.jpg',
        'review': "Never one to pass on the fizz our Customer Service Executive Matty loves our Champagne Charlie Jolly Ginger!"
    },
    '/mother-s-day/fashionista-biscuit-gift-tin': {
        'person': 'Daisy',
        'avatar': '//www.sitegainer.com/fu/up/6ta3pvw0qvi4x1x.jpg',
        'review': "It's an unsual day at Biscuiteers HQ if a parcel containing the lastest trends doesn't arrive for our Marketing and PR Executive Daisy. It's no surprise the Fashionista tin is her firm favourite!"
    },
    '/biscuits/birthday-treats-biscuit-tin': {
        'person': 'Daisy',
        'avatar': '//www.sitegainer.com/fu/up/6ta3pvw0qvi4x1x.jpg',
        'review': "An avid Bake Off fan Daisy really knows her petit fours from her eclairs. This patisserie inspired tin is one of her favourites to send for birthdays!"
    },
    '/mother-s-day/butterfly-biscuit-mini-collection-biscuit-tin': {
        'person': 'Lucy',
        'avatar': '//www.sitegainer.com/fu/up/wlzm7rvh6tat2w8.jpg',
        'review': `Lucy is our head biscuit designer and this ${currentProductName} has been inspired by her trips to the Butterfly rooms at the Natural History Museum`
    },
    '/mother-s-day/butterfly-celebration-cake': {
        'person': 'Lucy',
        'avatar': '//www.sitegainer.com/fu/up/wlzm7rvh6tat2w8.jpg',
        'review': `Lucy is our head biscuit designer and this ${currentProductName} has been inspired by her trips to the Butterfly rooms at the Natural History Museum`
    },
    '/biscuits/cool-for-cats-biscuit-card': {
        'person': 'Margarida',
        'avatar': '//www.sitegainer.com/fu/up/ern5rbwcwjegxmw.jpg',
        'review': `Our production manager Margarida is 100% a cat person. Talk to her for 5 minutes and she'll be showing you videos of cats. This ${currentProductName} is her top pick.`
    },
    '/biscuits/cool-for-cats-biscuit-card': {
        'person': 'Margarida',
        'avatar': '//www.sitegainer.com/fu/up/ern5rbwcwjegxmw.jpg',
        'review': `Our production manager Margarida is 100% a cat person. Talk to her for 5 minutes and she'll be showing you videos of cats. This ${currentProductName} is her top pick.`
    },
    '/biscuits/super-hero-biscuit-tin': {
        'person': 'David',
        'avatar': '//www.sitegainer.com/fu/up/zje5ziz28bjoclw.jpg',
        'review': `Our Head of Manufacturing David is a bit of a super hero geek (just try testing his comic book knowledge!). His favourite collection is our ${currentProductName} biscuits!`
    },
    '/biscuits/batman-jolly-ginger-gingerbread-man': {
        'person': 'David',
        'avatar': '//www.sitegainer.com/fu/up/zje5ziz28bjoclw.jpg',
        'review': `Our Head of Manufacturing David is a bit of a super hero geek (just try testing his comic book knowledge!). His favourite collection is our ${currentProductName} biscuits!`
    },
    '/biscuits/personalised-teapot-biscuit-card': {
        'person': 'Rebecca',
        'avatar': '//www.sitegainer.com/fu/up/4vbbilw43f3pqwe.jpg',
        'review': "Packing manager Rebecca is Biscuiteers' resident tea expert, there isn't an Oolong or Darjeeling she doesn't know about. Her pick is this Tea for Two Biscuit tin, inspired by vintage china tea sets."
    },
    '/mother-s-day/london-tea-for-two-gift-certificate': {
        'person': 'Rebecca',
        'avatar': '//www.sitegainer.com/fu/up/4vbbilw43f3pqwe.jpg',
        'review': "Packing manager Rebecca is Biscuiteers' resident tea expert, there isn't an Oolong or Darjeeling she doesn't know about. Her favourite? The Afternoon Tea Gift Certificate!"
    },
    '/biscuits/under-the-sea-biscuit-tin': {
        'person': 'Julia',
        'avatar': '//www.sitegainer.com/fu/up/aplxzxsif3eew9f.jpg',
        'review': "Biscuit designer Julia's favourite collection is inspired by her love of Blue Planet and all things 'under the sea'"
    },
    '/biscuits/apres-ski-biscuit-tin': {
        'person': 'Edwina',
        'avatar': '//www.sitegainer.com/fu/up/lnkw9beq9szp9f0.jpg',
        'review': "Northcote Road shop manager Edwina loves the apres ski tin. As a former chalet host it's a tasty reminder of the afternoon tea she would make."
    },
    '/mother-s-day/audrey-hepburn-jolly-ginger-gingerbread': {
        'person': 'Becky W',
        'avatar': '//www.sitegainer.com/fu/up/4i5l6842scj8soq.jpg',
        'review': "Senior Retail Manager Becky's favourite film is Breakfast at Tiffany (she has watched it over 50 times) and so our Audrey Jolly Ginger is her absolute favourite biscuit!"
    },
    '/biscuits/portobello-road-biscuit-box': {
        'person': 'Simone',
        'avatar': '//www.sitegainer.com/fu/up/4i5l6842scj8soq.jpg',
        'review': "Simone is the Assistant Manager at our Notting Hill boutique. Everyday she walks past the candy coloured houses on Portobello Road, which are the inspiration for her favourite collection."
    },
    '/biscuits/cheese-and-biscuits-gift-tin': {
        'person': 'Paulina',
        'avatar': '//www.sitegainer.com/fu/up/4i5l6842scj8soq.jpg',
        'review': "Dispatch manager Paulina is partial to a spot of cheese and biscuits so our Say cheese tin is her pick every time!"
    },
    '/biscuits/doggy-treats-carrier-case': {
        'person': 'Orshe',
        'avatar': '//www.sitegainer.com/fu/up/jf8qlpbezsyq0ii.jpg',
        'review': `Purchasing controller Orshe loves all things dog related. She's particularly fond of our ${currentProductName} which make her very popular at the dog park in the morning!`
    },
    '/biscuits/doggy-biscuit-treats': {
        'person': 'Orshe',
        'avatar': '//www.sitegainer.com/fu/up/jf8qlpbezsyq0ii.jpg',
        'review': `Purchasing controller Orshe loves all things dog related. She's particularly fond of our ${currentProductName} which make her very popular at the dog park in the morning!`
    },
    '/biscuits/beatrix-potter-biscuit-tin': {
        'person': 'Rachel',
        'avatar': '//www.sitegainer.com/fu/up/jf8qlpbezsyq0ii.jpg',
        'review': "Rachel's favourite book as a child was 'The Tales of Peter Rabbit'. Our Beatrix Potter biscuits are a reminder of bedtime tales!"
    },
    '/biscuits/jemima-puddle-duck-biscuit-card': {
        'person': 'Rachel',
        'avatar': '//www.sitegainer.com/fu/up/jf8qlpbezsyq0ii.jpg',
        'review': "Rachel's favourite book as a child was 'The Tales of Peter Rabbit'. Our Beatrix Potter biscuits are a reminder of bedtime tales!"
    }
};

export default reviews;
