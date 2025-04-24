import shared from "../shared";

export default () => {

    let innerContent;
    const URL = window.location.href;

    // content from jumpers
    const jumperCharacters = { 
        'star-wars-all-i-want-for-christmas-is-r2-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3e8b8d1102214c25a9e0dbdd0a4c41c5.png',
            name: 'Jessica',
            role: 'Head of Marketing',
            intro: 'Looking forward to Christmas?',
            bottomText: 'Are you looking forward to Christmas? We Ar-too! This design is my absolute favourite.',
        },
        'star-wars-at-at-hoth-unisex-knitted-christmas-sweaterjumper': {
            icon: '//cdn.optimizely.com/img/6087172626/303405d66e864568a2fc14be656d2fe9.png',
            name: 'Jon',
            role: 'Graphic Designer',
            intro: 'Happy Hoth-idays!',
            bottomText: 'Happy Hoth-idays! This design is retro Star Wars perfection.',
        },
        'superman-seasonal-suit-up-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/37afb9002ef6422a863d7d33a5e7ad4e.png',
            name: 'Simon',
            role: 'Company Director',
            intro: 'Like a jumper your gran would knit...',
            bottomText: 'It looks like a jumper your Gran would have knitted you, if your Gran had impeccable taste in videogames and pop culture - I love it!',
        },
        'avengers-iron-man-power-gauntlet-knitted-christmas-sweater': {
            icon: '//cdn.optimizely.com/img/6087172626/1a633145fca34e83b63825f68ec80bdb.png',
            name: 'Chaz',
            role: 'Creative Director',
            intro: 'My pick for Christmas...',
            bottomText: 'For the guy who has everything, just like Tony Stark. This is my pick for this Christmas.',
        },
        'batman-goodwill-in-gotham-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/c661469fae4441549331d879fa855bb3.png',
            name: 'Emma',
            role: 'HR Assistant',
            intro: 'I love Bruce Wayne...',
            bottomText: "I love black and I love Bruce Wayne so it's got to be this Batman jumper.",
        },
        'captain-america-knitted-christmas-jumper-sweater': {
            icon: '//cdn.optimizely.com/img/6087172626/3e8b8d1102214c25a9e0dbdd0a4c41c5.png',
            name: 'Jessica',
            role: 'Head of Marketing',
            intro: 'For leaders...',
            bottomText: "I got this one for my brother. He's the leader in our family so it's perfect.",
        },
        'deadpool-merry-chimichanga-knitted-unisex-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/303405d66e864568a2fc14be656d2fe9.png',
            name: 'Jon',
            role: 'Graphic Designer',
            intro: 'Deadpool is my spirit animal...',
            bottomText: "Deadpool is my spirit animal. I'm not taking this off all Winter.",
        },
        'marvel-avengers-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/37afb9002ef6422a863d7d33a5e7ad4e.png',
            name: 'Simon',
            role: 'Company Director',
            intro: 'My favourite Avenger is...',
            bottomText: "I can never pick my favourite Avenger. Luckily I don't have to in this jumper.",
        },
        'jurassic-park-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/1a633145fca34e83b63825f68ec80bdb.png',
            name: 'Chaz',
            role: 'Creative Director',
            intro: 'I feel nostalgic in this',
            bottomText: "I was a kid when Jurassic Park came out so I feel nostalgic in this. Isn't that what Christmas is about?!",
        },
        'wonder-woman-winter-wonder-land-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/c661469fae4441549331d879fa855bb3.png',
            name: 'Emma',
            role: 'HR Assistant',
            intro: 'For warrior women...',
            bottomText: "I got this for my sister. She's a warrior woman and I love her so this jumper was spot on.",
        },
        'captain-marvel-festive-is-a-good-look-for-you-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3e8b8d1102214c25a9e0dbdd0a4c41c5.png',
            name: 'Jessica',
            role: 'Head of Marketing',
            intro: 'For all you Captain Marvels...',
            bottomText: "Captain Marvel is ma girl. I couldn't help this jumper for myself this year.",
        },
        'playstation-12-days-of-play-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/303405d66e864568a2fc14be656d2fe9.png',
            name: 'Jon',
            role: 'Graphic Designer',
            intro: 'For Playstation kids...',
            bottomText: "I'm a Playstation kid. Plus it's pretty much what I'm going to be doing everyday over Christmas. Might as well wear the jumper too!",
        },
        'spider-man-knitted-unisex-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/37afb9002ef6422a863d7d33a5e7ad4e.png',
            name: 'Simon',
            role: 'Company Director',
            intro: 'The ultimate mash up...',
            bottomText: "The detail on this jumper is excellent. It's the ultimate mash up of superhero and festive vibes.",
        },
        'star-wars-the-season-to-be-jolly-it-is-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/1a633145fca34e83b63825f68ec80bdb.png',
            name: 'Chaz',
            role: 'Creative Director',
            intro: 'A little extra Yoda...',
            bottomText: "Everyone needs a little extra of Yoda's sage wisdom. That's why I wear him on my chest!",
        },
        'star-wars-lack-of-cheer-disturbing-unisex-knitted-christmas-sweaterjumper': {
            icon: '//cdn.optimizely.com/img/6087172626/c661469fae4441549331d879fa855bb3.png',
            name: 'Emma',
            role: 'HR Assistant',
            intro: 'Wearing my buddy, Vader...',
            bottomText: "Everyone knows by now. I only where black, like Lord Vader. We have a lot in common.",
        },
        'star-wars-happy-hoth-idays-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3e8b8d1102214c25a9e0dbdd0a4c41c5.png',
            name: 'Jessica',
            role: 'Head of Marketing',
            intro: 'Keep cosy...',
            bottomText: "Is there anything more festive than an ice planet? Bbbrr. I like to keep cosy in this jumper.",
        },
        'legend-of-zelda-tinsel-and-triforces-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/303405d66e864568a2fc14be656d2fe9.png',
            name: 'Jon',
            role: 'Graphic Designer',
            intro: 'Think cosplay at Christmas',
            bottomText: "The colours are spot on in this jumper and that's what I love. Think cosplay at Christmas.",
        },
        'legend-of-zelda-o-hyrule-y-night-christmas-jumper-sweater': {
            icon: '//cdn.optimizely.com/img/6087172626/37afb9002ef6422a863d7d33a5e7ad4e.png',
            name: 'Simon',
            role: 'Company Director',
            intro: 'Fair Isle and Hyrule together...',
            bottomText: "The blend of Fair Isle and Hyrule is almost seamless. Perfect for fans who want to rep everyday.",
        }
    }

    // content for publications
    const publications = {
        'star-wars-happy-hoth-idays-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/73f9430d2b60483784b42a9a80c89856.png',
            name: 'Glamour',
            intro: 'Spark festive spirit...',
            bottomText: "This jumper will spark a festive feeling in even the biggest scrooge",
        },
        'star-wars-lack-of-cheer-disturbing-unisex-knitted-christmas-sweaterjumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3b1e994418f7493cb00f4f2572335d2e.png',
            name: 'Nerdmuch',
            intro: 'Carols with Vader...',
            bottomText: "Christmas carols with Vader? Count us in!",
        },
        'star-wars-the-season-to-be-jolly-it-is-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3000406d4632426791eec7a202370b81.png',
            name: 'Jedi News',
            intro: 'Your favourite Jedi...',
            bottomText: 'Everyone’s favourite pint-sized Jedi lifts Christmas trees as well as X-Wings',
        },
        'star-wars-all-i-want-for-christmas-is-r2-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3420295d80df4800a44e62fb33bf0f0a.png',
            name: 'What Culture',
            intro: 'Looking forward to Christmas?',
            bottomText: "Are you looking forward to Christmas? Merchoid Ar-too",
        },
        'star-wars-tauntaun-tidings-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3000406d4632426791eec7a202370b81.png',
            name: 'Jedi News',
            intro: 'Get toasty...',
            bottomText: "Get toasty with the Tauntaun Tidings sweater! It’s comfy enough to sleep in, without that dreadful smell!",
        },
        'superman-seasonal-suit-up-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/5123a9b00f0d40e08ad8cfee76cdfde3.png',
            name: 'Mirror',
            intro: 'For the Man of Steel in your life...',
            bottomText: "We can imagine the Man of Steel sporting this cozy number from Merchoid around the dinner table on Christmas Day",
        },
        'avengers-iron-man-power-gauntlet-knitted-christmas-sweater': {
            icon: '//cdn.optimizely.com/img/6087172626/b662190fea2641fead68b1a98bb0894b.png',
            name: 'Nerdist',
            intro: 'A homage to Tony Stark...',
            bottomText: "Iron Man’s sweater isn’t just designed to rock around the Christmas tree while listening to AC/DC though. It also pays homage to Tony Stark’s sacrifice at the end of Avengers: Endgame",
        },
        'batman-goodwill-in-gotham-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3420295d80df4800a44e62fb33bf0f0a.png',
            name: 'What Culture',
            intro: 'The sweater you need...',
            bottomText: "The Christmas Sweater you need, not the one you deserve.",
        },
        'captain-america-knitted-christmas-jumper-sweater': {
            icon: '//cdn.optimizely.com/img/6087172626/3420295d80df4800a44e62fb33bf0f0a.png',
            name: 'What Culture',
            intro: 'A festive spin...',
            bottomText: "A festive spin on Cap’s traditional vertical red and white stripes – very slimming in case you get carried away at the dinner table. ",
        },
        'deadpool-once-upon-a-deadpool-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3420295d80df4800a44e62fb33bf0f0a.png',
            name: 'What Culture',
            intro: 'Perfect for chasing bad guys...',
            bottomText: "Looking for the perfect thing to wear while you’re chasing down everyone on your naughty list? Trust Deadpool to provide the answer.",
        },
        'legend-of-zelda-tinsel-and-triforces-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/3b1e994418f7493cb00f4f2572335d2e.png',
            name: 'Nerdmuch',
            intro: 'For Zelda mega fans...',
            bottomText: "If you frequently use Zelda references in your everyday conversations, this sweater is the best choice for you.",
        },
        'legend-of-zelda-o-hyrule-y-night-christmas-jumper-sweater': {
            icon: '//cdn.optimizely.com/img/6087172626/3b1e994418f7493cb00f4f2572335d2e.png',
            name: 'Nerdmuch',
            intro: 'For Zelda mega fans...',
            bottomText: "If you frequently use Zelda references in your everyday conversations, this sweater is the best choice for you.",
        },
        'marvel-avengers-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/8d0798f5bebc4cbd8285a96dac7238a1.png',
            name: 'Nerdreactor',
            intro: 'Awesome holiday designs...',
            bottomText: "Merchoid always comes up with awesome designs for the holidays to prepare you for parties.",
        },
        'captain-marvel-festive-is-a-good-look-for-you-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/8d0798f5bebc4cbd8285a96dac7238a1.png',
            name: 'Nerdreactor',
            intro: 'Awesome holiday designs...',
            bottomText: "Merchoid always comes up with awesome designs for the holidays to prepare you for parties.",
        },
        'wonder-woman-winter-wonder-land-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/8d0798f5bebc4cbd8285a96dac7238a1.png',
            name: 'Nerdreactor',
            intro: 'Awesome holiday designs...',
            bottomText: "Merchoid always comes up with awesome designs for the holidays to prepare you for parties.",
        },
        'spider-man-knitted-unisex-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/8d0798f5bebc4cbd8285a96dac7238a1.png',
            name: 'Nerdreactor',
            intro: 'Awesome holiday designs...',
            bottomText: "Merchoid always comes up with awesome designs for the holidays to prepare you for parties.",
        },
        'jurassic-park-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/8d0798f5bebc4cbd8285a96dac7238a1.png',
            name: 'Nerdreactor',
            intro: 'Awesome holiday designs...',
            bottomText: "Merchoid always comes up with awesome designs for the holidays to prepare you for parties.",
        },
        'playstation-12-days-of-play-knitted-christmas-sweater-jumper': {
            icon: '//cdn.optimizely.com/img/6087172626/8d0798f5bebc4cbd8285a96dac7238a1.png',
            name: 'Nerdreactor',
            intro: 'Awesome holiday designs...',
            bottomText: "Merchoid always comes up with awesome designs for the holidays to prepare you for parties.",
        },
    }

    if(shared.VARIATION === '1') {
        innerContent = jumperCharacters;
        document.body.classList.add(`${shared.ID}-jumpers`); // add class for css purpooses
    } else if(shared.VARIATION === '2') {
        innerContent = publications;
        document.body.classList.add(`${shared.ID}-news`);
    }

    Object.keys(innerContent).forEach((i) => {
        const data = innerContent[i];

        if(URL.indexOf([i][0]) > -1) {
            const boxContent = document.createElement('div');
            boxContent.classList.add(`${shared.ID}-inner_content`);
            boxContent.innerHTML = `
            <div class="${shared.ID}-icon">
                <div class="${shared.ID}-iconInner" style="background-image: url(${data.icon})"></div>
            </div>
            <div class="${shared.ID}-introText">
                <h3>${data.intro}</h3>
                <p>${data.bottomText}</p>     
            </div>`;

            document.querySelector(`.${shared.ID}-featured_box`).appendChild(boxContent);
        }
    });
    
}