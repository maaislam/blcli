import shared from "./shared";

export default () => {
    const brandsObj = {
        'Alien': {
            products: [
                'Alien: 40th Anniversary Ripley In Spacesuit Pop! Vinyl Figure',
                'Alien: 40th Anniversary Limited Edition Coin',
                'Alien: Nostromo Emergency Kit Limited Edition Collector\'s Box',
                'Alien: Limited Edition Lithograph Set',
                'Alien: 40 th Anniversary Limited Edition Gold Coin',
                'Alien: Mommy\'s Little Ovomorph Egg Cookie Jar',
            ]
        },
        "Assassin\'s Creed": {
            products: [
                'Assassin\'s Creed: Crest Necktie',
                'Assassin\'s Creed: Ezio 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Atari': {
            products: [
                'Atari: Japanese Logo Messenger Bag',
                'Atari 2600 Classic Hoodie',
            ]
        },
        'The Avengers': {
            products: [
                'Captain America: Suit Up Bathrobe',
                'Captain America: Stars and Straps Backpack',
                'Avengers Endgame: \'Fine. I\'ll Pour It Myself\' Thanos Infinity Gauntlet Mug',
                'Avengers: Clean In A Click Infinity Gauntlet Thanos Bathrobe',
                'Avengers: No Infinity Stone Unturned Thanos Slippers',
                'Marvel: Avengers Knitted Christmas Sweater/Jumper',
                'Avengers Endgame: Advanced Tech Men\'s Quantum Hoodie',
                'Avengers Endgame: Advanced Tech Women\'s Quantum Hoodie',
                'Avengers Endgame: Advanced Tech Quantum Cap',
                'Avengers: Phase Three Commemorative Limited Edition Hoodie',
                'Avengers: Part Of The Team Hoodie',
                'Avengers: Something To Write Home About A5 Notebook',
                'Avengers Endgame: \'Whatever It Takes\' Quantum Hoodie',
                'Marvel: Merchoid Exclusive 2019 Pocket Pop! Vinyl Christmas Advent Calendar',
                'Avengers: Premium Quantum Jacket',
                'Marvel: Iron Man 8 inch Cable Guy Phone and Controller Holder',
                'Avengers: A Hard Days Fight Infinity Gauntlet Wearable Cushion',
                'Avengers: Open A New Reality 3D Infinity Gauntlet Thanos Keychain',
            ]
        },
        'Back to the Future': {
            products: [
                'Back To The Future: Clock Tower Limited Edition Coin',
                'Back To The Future: VHS A5 Notebook',
            ]
        },
        'Banjo-Kazooie': {
            products: [
                'Banjo Kazooie: Limited Edition Coin',
                'Banjo Kazooie: Stubbins Plush',
                'Banjo Kazooie: 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Batman': {
            products: [
                'Batman: Waiting In The Wings Batarang Prop Replica',
                'Batman: Heads Or Fails Harvey Dent & Two-Face Coin Display',
                'Batman: Power To The People Collectable Light',
                'Batman: Wayne Aerospace Batwing Desk Lamp',
                'Batman: Fetch Me The Bat Slippers',
                'Batman: Goodwill In Gotham Christmas Sweater',
                'Batman: Pour Me Another, Alfred Glass Decanter',
                'Batman: 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Black Panther': {
            products: [
                'Black Panther: Straight Outta Wakanda Bathrobe',
                'Black Panther: Wakandan Wishes Knitted Christmas Sweater',
                'Black Panther: Premium Limited Edition Jacket',
                'Black Panther: 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Borderlands': {
            products: [
                'Borderlands: CL4P-TP Failsafe Messenger Bag',
                'Borderlands: On the Rampage Psycho Buzz Axe',
                'Borderlands 3: Maliwan Pistol Cosplay Replica',
                'Borderlands 3: Wildstyle Snapback Cap',
                'Borderlands 3: Maliwan Zip Hoodie',
                'Borderlands 3: Psycho Mask Prop Replica',
                'Borderlands 3: \'The Most Powerful Siren On Pandora\' Maya Mini Epics Figure',
                'Borderlands: Claptrap 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Capcom': {
            products: [
                'Resident Evil 2: Official Police Business RPD Cap',
                'Resident Evil 2: Leon Kennedy RPD Premium Hoodie',
                'Resident Evil 2: Loyalty Bonus Umbrella Corp. Gift Set',
            ]
        },
        'Captain America': {
            products: [
                'Captain America: Suit Up Bathrobe',
                'Captain America: Stars and Straps Backpack',
                'Captain America: Red White And Blue Knitted Christmas Sweater',
                'Captain America: Premium Limited Edition Jacket',
                'Marvel: Captain America Geeki Tikis Plastic Tumbler',
                'Captain America: I Could Wear This All Day Premium Hoodie',
            ]
        },
        'Crash Bandicoot': {
            products: [
                'Crash Bandicoot: Ultimate Power Is Mine Uka Uka Mug',
                'Crash Bandicoot: Extra Life Doormat',
                'Crash Bandicoot: Aku Aku 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Cyberpunk': {
            products: [
                'Cyberpunk 2077: V-Female Pop! Vinyl Figure',
                'Cyberpunk 2077: Johnny Silverhand Pop! Vinyl Figure',
                'Cyberpunk 2077: Johnny Silverhand 2 Pop! Vinyl Figure',
            ]
        },
        'DC Comics': {
            products: [
                'Green Lantern: Light-Up Ring Replica',
                'Harley Quinn: Daddy\'s Lil Monster Official Replica Shirt',
                'Superman Luxury 19 inch Christmas Stocking',
                'Harley Quinn:  \'Diamond Gal\' Replica Cosplay Tattoo Tights',
                'Wonder Woman: Winter Wonder-land Knitted Christmas Sweater',
                'Harley Quinn: Laugh Your Head Off Beanie',
                'Harley Quinn: Yes Siree Bob Cuffs',
                'Batman: Waiting In The Wings Batarang Prop Replica',
                'Batman: Heads Or Fails Harvey Dent & Two-Face Coin Display',
                'Justice League: Aquaman Trident Cosplay Replica',
                'Superman: Man Of Fleece Bathrobe',
                'Wonder Woman: Rain Killer Sword Handle Umbrella',
                'Batman: Fetch Me The Bat Slippers',
                'Wonder Woman: This Is How Amazonians Relax Slippers',
                'Superman: Man of Tomorrow Premium Jacket',
                'Superman: Seasonal Suit Up Knitted Christmas Sweater',
                'Batman: Goodwill In Gotham Christmas Sweater',
                'The Flash: Central City Celebrations Christmas Sweater',
                'Wonder Woman: The Most Wonder-ful Time Of The Year Knitted Christmas Sweater',
                'Joker: Premium Red Blazer',
                'Aquaman: Atlantean Tidings Christmas Sweater Jumper',
                'Birds of Prey: Replica Joker Choker',
                'Birds of Prey Replica Joker and Jack 2pc Necklace Set',
                'Birds of Prey 5 Pack of Earrings',
                'Birds of Prey Harley Quinn Caution Tape Handbag',
                'Birds of Prey Harley Quin Faux Denim Ripstock Backpack',
                'Birds of Prey AOP Dad Hat',
                'Birds of Prey: Harley Quinn Cosplay Distressed Tee',
                'Birds of Prey: Harley Quinn Cosplay Distressed Shorts',
                'Birds of Prey: Harley Quinn Cosplay Body Suit',
                'Birds of Prey: Harley Quinn Inspired Jacket',
                'Birds Of Prey: Harley Quinn Logo Embroidery Cap',
            ]
        },
        'Deadpool': {
            products: [
                'Deadpool: Mercs for Money Wallet',
                'Deadpool: Watch The Face Stress Ball',
                'Deadpool: Red Man Walking Tech Hoodie',
                'Deadpool: Once Upon A Deadpool Knitted Christmas Sweater',
                'Deadpool: 8 inch Cable Guy Phone and Controller Holder',
                'Deadpool: Posing 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Disney': {
            products: [
                'Beauty and the Beast: Chip Mug',
                'Beauty and the Beast: Enchanted To Meet You Rose Light',
                'Mary Poppins: Practically Perfect In Every Way Umbrella',
                'Beauty and the Beast: Tale As Old As Tea Time Mrs Potts Tea Pot',
                'Beauty and the Beast: Merry Beastmas Knitted Christmas Sweater',
                'Aladdin: We WISH You A Merry Christmas Knitted Christmas Sweater',
                'Lion King: Hakuna Holidays Knitted Christmas Sweater',
                'Sleeping Beauty: Horns At The Ready Maleficent Cap',
                'Mary Poppins: Wise Words Cup/Saucer Set',
                'Mary Poppins: \'As I Expected\' Tape Measure Latte Mug',
                'Mary Poppins: \'That\'s As It Should Be\' Umbrella Accessory Dish',
                'Mary Poppins: Have A Supercalifragilisticexpialidocious Christmas Knitted Sweater',
                'Mary Poppins: Element Of Fun Mini Backpack',
                'Dumbo: Up And Up And Up Bracelet Set',
                'Aladdin: Genie In An Egg Cup',
                'Dumbo: The World\'s Smallest Little Elephant Shaped Mug',
                'Toy Story: Just A Couple Of Blocks Away Bo Peep Lamp',
                'Lion King: \'I\'m Surrounded By Idiots\' Scar Mug',
                'Aladdin: Official Wish Granter Genie Heat Changing Mug',
                'Dumbo: Big Scenes At The Big Top Shaped Mug',
                'Disney: 99% Sure I Am A Disney Princess Mug',
                'The Little Mermaid: Flippin Awesome Mug',
                'Lion King: \'Just Can\'t Wait To Be King\' Simba Shaped Mug',
                'Toy Story: \'You\'ve Just Got To Believe In Yourself\' Rex Mug',
                'Toy Story: Buzz Lightyear To The Rescue Snapback Cap',
                'The Little Mermaid: Part Of Your Holidays Knitted Christmas Sweater',
                'Aladdin: Diamond In The Rough Cakeworthy Flannel Shirt',
                'Snow White: Fairest Of Them All Cakeworthy Flannel Shirt',
                'Aladdin: Ticket To Ride Magic Carpet Cakeworthy Passport Holder',
                'Frozen: Let It Snow Elsa Cold Change Glass',
                'Toy Story: Spud On A Mug Mr Potato Head Shaped Mug',
                'Toy Story: Buzz Lightyear 8 inch Cable Guy Phone and Controller Holder',
                'Disney: Mickey Mouse 8 inch Cable Guy Phone and Controller Holder',
                'The Nightmare Before Christmas: Dancing In the Dark Giant Heat Change Mug',
                'Nightmare Before Christmas: \'What\'s This ? \' Knitted Christmas Sweater',
                'Frozen II: Best Day Of My Life Olaf Snow Globe',
                'Harry Potter: Hermione Granger \'Tools Of The Trade\' Prop Replica Bag',
                'Kingdom Hearts: Keyblade Master Keychain',
                '101 Dalmatians: My Lucky Pup Shaped Mug',
            ]
        },
        'Donkey Kong': {
            products: [
                'Donkey Kong: Hail to the Kong Barrel-Shaped Mug',
                'Donkey Kong: Monkey Business Necktie',
                'Donkey Kong: Let\'s Get Down To Business Tie Backpack',
                'Donkey Kong: Keep Rollin \'Money Box',
            ]
        },
        'Doom': {
            products: [
                'Doom: 25th Anniversary Limited Edition Coin',
                'Doom: Slayer Stubbins Plush',
                'Doom: Military Combat Tech Hoodie',
                'Doom: Eternal Slayer Cap',
            ]
        },
        'Dragon Ball Z': {
            products: [
                'Dragon Ball Z: Round The World Trip Electronic Dragon Radar Keyring',
                'Dragon Ball Z: Caffeine Conqueror Vegeta Saiyan Pod Heat Change Mug',
                'Dragon Ball Z: Faithful Companion Puar Plush',
                'Dragon Ball: Welcome To Kame House Doormat',
                'Dragon Ball Z: \'Turn You Into Candy\' Majin Buu Silicone Ice/Baking Tray',
                'Dragon Ball Z: Things Are Hotting Up Kid Goku Silicone Ice/Baking Tray',
                'Dragon Ball Z: Move Over King Cold Frieza Silicone Ice/Baking Tray',
                'Dragon Ball Super: They\'re No P(l)ushovers Plush Set',
                'Dragon Ball Z: Battle Armour Vegeta Cosplay T-Shirt',
                'Dragon Ball: Family Heirloom Replica 4-Star Ball with Base',
                'Dragon Ball: \'I Summon You Forth\' Giant 80cm Shenron Plush',
                'Dragon Ball Z: Wish for Zeni Shenron Premium Wallet',
                'Dragon Ball Z: Eternal Dragon Sidekick Shenron Premium Messenger Bag',
            ]
        },
        'Dungeons & Dragons': {
            products: [
                'Dungeons & Dragons: Wallet Of Holding Bifold Wallet',
                'Dungeons & Dragons: Hat Of Disguise D20 Dice Cap',
                'Dungeons & Dragons: Adventure Awaits Logo T-Shirt',
                'Dungeons & Dragons: Critical Hit D20 Dice T-Shirt',
                'Dungeons and Dragons: Chamber Of Holding Savings Bank',
                'Dungeons and Dragons: +1 Fire Magic Heat Change Mug',
                'Dungeons and Dragons: Light Your Path D20 Light',
                'Dungeons and Dragons: The Lesser Important D12 3D Mug',
                'Dungeons and Dragons: Words Are The Mightiest Weapon Notebook and Pencil',
                'Dungeons and Dragons: For Whom The Dice Rolls D20 Keyring',
            ]
        },
        'Fallout': {
            products: [
                'Fallout: Nuclear Option Bomb Mug',
                'Fallout: Survival Instincts Backpack',
                'Fallout: All In (Dis)Order Messenger Bag',
                'Fallout: Rocket Fuel Nuka Cola Mug',
                'Fallout: Chess Set',
                'Fallout: Limited Edition Coin',
                'Fallout: Nuka World Token Replica',
                'Fallout: Vault 111 Boy 8 inch Cable Guy Phone and Controller Holder',
                'Fallout: Limited Edition Lithograph Set',
                'Fallout: Endurance Limited Edition Metal Perk Card',
                'Fallout: Charisma Limited Edition Metal Perk Card',
                'Fallout: Intelligence Limited Edition Metal Perk Card',
                'Fallout: Agility Limited Edition Metal Perk Card',
                'Fallout: Luck Limited Edition Metal Perk Card',
                'Fallout: Vault Dweller Collector\'s Box',
                'Fallout: Bottle And Cappy Pennant Flag',
                'Fallout: Sunset Sarsaparilla Pennant Flag',
            ]
        },
        'Final Fantasy': {
            products: [
                'Final Fantasy: Sugar And Strife Cloud Plushy',
                'Final Fantasy: One Winged Angel Sephiroth Plushy',
            ]
        },
        'Friends': {
            products: [
                'Friends: Apartment Peephole Frame Replica',
                'Friends: Central Perk Cappuccino Mug',
                'Friends: \'The One Where They\'re In The Kitchen\' Apron',
                'Friends: What Came First? Chick and Duck Egg Cup Set',
                'Friends: How You Doin? Heat Change Mug',
                'Friends: The One With The Holiday Armadillo Knitted Christmas Sweater',
                'Friends: \'The One Where They All Lit Up\' Central Perk Neon Light',
                'Friends: Central Perk Stocking',
                'Friends: You Are My Lobster Bathrobe',
                'Friends: The One With The Photo Frame Mug',
            ]
        },
        'Frozen': {
            products: [
                'Frozen: Let It Snow Elsa Cold Change Glass',
                'Frozen II: Best Day Of My Life Olaf Snow Globe',
                'Frozen: Olaf 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Game of Thrones': {
            products: [
                'Game of Thrones: Hand of the King Pin',
                'Game of Thrones: Chugger of Dragons Shot Glasses',
                'Game of Thrones: Memories Of The North Stark Notebook',
                'Game of Thrones: Drink Fit For A King Iron Throne Tankard',
                'Game of Thrones: Bound in Blood Sigil Tankard',
                'Game of Thrones: The Green One Shall Be... Rhaegal Dragon Egg Prop Replica',
                'Game of Thrones: Red And Black Dread Drogon Dragon Egg Prop Replica',
                'Game of Thrones: Blue Blazes Viserion Dragon Egg Prop Replica',
                'Game Of Thrones: Winter Is Coming Stark Cushion',
                'Game Of Thrones: Fire & Blood Targaryen Cushion',
                'Game Of Thrones: Welcome To Winterfell Doormat',
                'Game Of Thrones: Everlasting Winter Night King Shaped Mug',
                'Game Of Thrones: Cold Beverages Are Coming Freezer Tankard',
                'Game Of Thrones: Winter Is Coming Stark Knitted Christmas Sweater',
                'Game Of Thrones: Fire & Blood Targaryen Knitted Christmas Sweater',
                'Game Of Thrones: Drink\'s Landing Premium Decanter Set',
                'Game Of Thrones: Premium Stark Jacket',
                'Game Of Thrones: Premium Targaryen Jacket',
            ]
        },
        'Gears of War': {
            products: [
                'Gears Of War: Bound By Blood Tech Hoodie',
                'Gears Of War: Keep A Lid On It Snapback Cap',
                'Gears Of War 5: "Cole Train" Augustus Cole 16 cm Action Figure',
                'Gears of War: ...And A Happy New Gear!Knitted Christmas Sweater(includes Gears 5 Lancer DLC Code)',
            ]
        },
        'Geek': {
            products: [
                'One Small Step Astronaut Light',
                'Game Over Light',
                'Blast Off Lamp',
                'The Shining: Welcome To The Overlook Hotel Doormat',
                'Evil Dead 2: Book Of The Dead Necronomicon Prop Replica',
                'Haynes Retro Radio Advent Calendar',
                'Yu - Gi - Oh!: Official Game Flip Coin',
                'Dungeons & Dragons: Roll Your Own Way Logo Hoodie',
                'Watch Dogs: Legion DedSec LDN Chapter T - Shirt',
                'Gundam: RX - 78 - 2 Backpack',
            ]
        },
        'Ghostbusters': {
            products: [
                'Ghostbusters: Employee Welcome Kit',
                'Ghostbusters: \'Who You Gonna Call?\' Cakeworthy Bomber Jacket',
                'Ghostbusters: \'I Ain\'t Afraid Of No Ghost!\' Cakeworthy Flannel Shirt',
                'Ghostbusters: Be Kind, Rewind Cakeworthy Passport Holder',
                'Ghostbusters: Little Spud Slimer Candy Dish',
                'Ghostbusters: The Green Ghost Slimer Surprise Mug',
                'Ghostbusters: The Chosen One Stay Puft Cookie Jar',
                'Ghostbusters: Ecto-1 License Plate Replica',
            ]
        },
        'Green Lantern': {
            products: [
                'Green Lantern: Light-Up Ring Replica',
                'DC: Green Lantern Seeking Out Evil Prop Replica Lamp',
            ]
        },
        'Gremlins': {
            products: [
                'Gremlins: Evil Unleashed Stripe Icon Light',
                'Gremlins: Too Hot To Handle Heat Change Mug',
                'Gremlins: Hug In A Mug Gizmo Shaped Mug',
            ]
        },
        'Guardians of the Galaxy': {
            products: [
                'Guardians of the Galaxy: Awesome Mix Vol. 2 Doormat',
                'Guardians of the Galaxy Vol. 2: Yeah Baby/Gears Shift Replica Long Sleeve Shirt',
                'Guardians Of The Galaxy: Loose Leaf Baby Groot Shaped Mug',
                'Guardians Of The Galaxy: Woodland Creature Rocket Shaped Mug',
            ]
        },
        'Harley Quinn': {
            products: [
                'Harley Quinn: Daddy\'s Lil Monster Official Replica Shirt',
                'Harley Quinn: \'Diamond Gal\' Replica Cosplay Tattoo Tights',
                'Harley Quinn: Laugh Your Head Off Beanie',
                'Harley Quinn: Yes Siree Bob Cuffs',
                'Harley Quinn: In Hot Water Heat Change Mug',
                'Birds of Prey: Replica Joker Choker',
                'Birds of Prey Replica Joker and Jack 2pc Necklace Set',
                'Birds of Prey 5 Pack of Earrings',
                'Birds of Prey Harley Quinn Caution Tape Handbag',
                'Birds of Prey Harley Quin Faux Denim Ripstock Backpack',
                'Birds of Prey AOP Dad Hat',
                'Birds of Prey: Harley Quinn Cosplay Distressed Tee',
                'Birds of Prey: Harley Quinn Cosplay Distressed Shorts',
                'Birds of Prey: Harley Quinn Cosplay Body Suit',
                'Birds of Prey Harley Quinn Inspired Jacket',
                'Birds Of Prey: Harley Quinn Logo Embroidery Cap',
            ]
        },
        'Harry Potter': {
            products: [
                'Harry Potter: TV Remote Control Wand',
                'Harry Potter: Time Turner Necklace',
                'Harry Potter: Set of 4 Hogwarts Bookmarks',
                'Harry Potter: Gryffindor Wizarding Bathrobe',
                'Harry Potter: Deathly Hallows Watch',
                'Harry Potter: Enchanted Colour Changing Goblet',
                'Harry Potter: Hidden Book Savings Money Box',
                'Harry Potter: Hogwarts and Hallows Women\'s Bathrobe',
                'Harry Potter: Alohomora Doormat',
                'Harry Potter: Gryffindor Wizarding Ladies Bathrobe',
                'Harry Potter: Never Far from Home Earring Set',
                'Harry Potter: First Class Carriage Women\'s Robe',
                'Harry Potter: Silence Is Golden Golden Snitch Light',
                'Harry Potter: Patronus Penpals Hogwarts Letter Writing Set',
                'Harry Potter: Old No. 86 Potion Bottle Light',
                'Harry Potter: Stupefying Skincare Hogwarts Toiletry Bag',
                'Harry Potter: Time After Time Spinning Time Turner Necklace',
                'Harry Potter: All Mapped Out Marauder\'s Map Prop Replica',
                'Harry Potter: (Wax) Sealed With A Kiss Satchel',
                'Harry Potter: Gryffindor Knitted Christmas Sweater',
                'Harry Potter: Slytherin Knitted Christmas Sweater',
                'Harry Potter: Which House Are You ? Sorting Hat Doormat',
                'Harry Potter: Ravenclaw Knitted Christmas Sweater',
                'Harry Potter: Toil and Trouble Cauldron Mug',
                'Harry Potter: Your Way To Greatness Sorting Hat Mug',
                'Harry Potter: Ravenclaw Wizarding Bathrobe',
                'Harry Potter: Hufflepuff Wizarding Bathrobe',
                'Harry Potter: \'Drying Managed\' Marauder\'s Map Towel',
                'Harry Potter: Gryffindor Quidditch Captain Jersey Replica',
                'Harry Potter: Kept On A Tight Leash Dobby Necklace',
                'Harry Potter: Caught In The Act Golden Snitch Earrings',
                'Harry Potter: Instant Win Sterling Silver Golden Snitch Earrings',
                'Harry Potter: Got A Hold On Me Dark Mark Choker Necklace',
                'Harry Potter: Just In Time Platform 9 3 / 4 Watch',
                'Harry Potter: A Cut Above The Rest Gryffindor Sword Letter Opener With Stand',
                'Harry Potter: Luck On My Side Felix Felicis Pendant and Display',
                'Harry Potter: \'Mortal Once More\' Replica Horcrux Locket Display',
                'Harry Potter: Handwriting Practice Hogwarts Writing Quill Set',
                'Harry Potter: \'Don\'t Be Put-Out(er)\' Replica Deluminator',
                'Harry Potter: (Don\'t) Drink Up Replica Crystal Goblet',
                'Harry Potter: Angry Drunk Replica Mad-Eye Moody Flask',
                'Harry Potter: The Tea Chooses The Wizard Sorting Hat Heat Changing Coasters',
                'Harry Potter: Inseperable Incantations Notebook Set',
                'Harry Potter: \'It\'s Like Magic\' Hogwarts Trunk Savings Bank and Wand',
                'Harry Potter: Golden Glow Snitch Clip Light',
                'Harry Potter: I\'d Rather Stay At Hogwarts This Christmas Advent Calendar',
                'Harry Potter: Manage Your Mischief Marauder\'s Map Sequin Notebook',
                'Harry Potter: Glow In The Dark Lumos Mug',
                'Harry Potter: Bolt From The Brew Mug',
                'Harry Potter: Tessomancy Teaset',
                'Harry Potter: Slytherin House Pride Mug',
                'Harry Potter: Exceptionally Ordinary Luna Lovegood A5 Notebook',
                'Harry Potter: Distinct Dottiness Luna Lovegood Cosmetics Pouch',
                'Harry Potter: \'I Open At The Close\' Golden Snitch Handbag',
                'Harry Potter: Clean Journey Hogwarts Express Towel',
                'Harry Potter: Floating On Air Golden Snitch Slippers',
                'Harry Potter: Don\'t Tread On Me Hedwig Slippers',
                'Harry Potter: One Of The Locals Leaky Cauldron Mug',
                'Harry Potter: Expecto Linteum Towel',
                'Harry Potter: Keep It In The Owlery Hedwig Umbrella',
                'Harry Potter: Magic In The Kitchen Gryffindor Apron',
                'Harry Potter: Magical Masterchef Slytherin Apron',
                'Harry Potter: Disappeaing Act Golden Snitch Money Box',
                'Harry Potter: Christmas In The Wizarding World Advent Calendar',
                'Harry Potter: 2019 Pocket Pop! Vinyl Christmas Advent Calendar',
                'Harry Potter: 2019 Jewellery Advent Calendar',
                'Harry Potter: Make No Bones About It Skele-Gro Water Bottle',
                'Harry Potter: Part Of The Family \'H\' Replica Christmas Sweater',
                'Harry Potter: Wintertime Weasleys \'R\' Replica Christmas Sweater',
                'Harry Potter: I\'d Rather Stay at Hogwarts Christmas Sweater',
                'Harry Potter: 2019 Lego Christmas Advent Calendar',
                'Harry Potter: Premium Slytherin Padded Unisex Jacket',
                'Harry Potter: Premium Gryffindor Padded Unisex Jacket',
                'Harry Potter: Premium Hufflepuff Padded Unisex Jacket',
                'Harry Potter: Premium Ravenclaw Padded Unisex Jacket',
                'Harry Potter: Breaking The Wall Platform 9 3/4 Bookends',
                'Harry Potter: Wizarding Wealth Gringotts Vault Money Bank',
                'Harry Potter: Gryffindor Decorative Goblet',
                'Harry Potter: Slytherin Decorative Goblet',
                'Harry Potter: Hufflepuff Decorative Goblet',
                'Harry Potter: Rockin\' Ravenclaw Knitted Christmas Sweater',
                'Harry Potter: Ho Ho Hufflepuff Knitted Christmas Sweater',
                'Harry Potter: Slytherin Sleigh Bells Knitted Christmas Sweater',
                'Harry Potter: Cries In Vain Electronic Interactive Mandrake Plush',
                'Harry Potter: Keeper Of Galleons Hedwig Zip Purse',
                'Harry Potter: Glorious Gryffindor House Mascot Plush & Cushion Set',
                'Harry Potter: Snuggly Slytherin House Mascot Plush & Cushion Set',
                'Harry Potter: Relaxing Ravenclaw House Mascot Plush & Cushion Set',
                'Harry Potter: Homely Hufflepuff House Mascot Plush & Cushion Set',
                'Harry Potter: Rubeus Hagrid Magical Umbrella Prop Replica',
                'Harry Potter: Master Of Death Deathly Hallows Icon Light',
                'Harry Potter: Best Of The Best Triwizard Cup Icon Light',
                'Harry Potter: First Year Welcome Pack Gift Set',
                'Harry Potter: Muggle Surface Protection House Crest Metal Coasters',
                'Harry Potter: Muggle Storage Gryffindor Handbag',
                'Harry Potter: Emergency Snack Storage Hufflepuff Handbag',
                'Harry Potter: Quills & Parchment Carrier Ravenclaw Handbag',
                'Harry Potter: Essential Potions Storage Slytherin Handbag',
            ]
        },
        'Haynes': {
            products: [
                'Haynes Build Your Own Retro Radio Electronic Kit',
                'Haynes Build Your Own Electro Synth Electronic Kit',
            ]
        },
        'Hulk, The': {
            products: [
                'Marvel: Hulk Geeki Tikis Plastic Tumbler',
                'Hulk: 12 inch XL Cable Guy Phone and Controller Holder',
            ]
        },
        'IT': {
            products: [
                'IT: Raining Blood Pennywise Liquid Reactive Umbrella',
                'IT: Hide And Seek Pennywise Heat Change Mug',
                'IT: Floating Around Pennywise Balloon Light',
                'IT: None The (Penny)wiser Beanie',
            ]
        },
        'Iron Man': {
            products: [
                'Avengers: Iron Man Power Gauntlet Knitted Christmas Sweater',
                'Marvel: Iron Man 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Jaws': {
            products: [
                'Jaws: Limited Edition Coin',
                'Jaws: Beach Closed Doormat',
                'Jaws: Amity Island Summer Of \'75 Kit',
                'Jaws: Bruce The Shark Cosplay Mask',
                'Jaws: Welcome To Amity Island Collector\'s Box',
            ]
        },
        'Jumanji': {
            products: [
                'Jumanji: Miniature Electronic Game Board',
                'Jumanji: Collector Board Game Replica',
            ]
        },
        'Jurassic Park': {
            products: [
                'Jurassic Park: Doyouthinkheheardous Earring Pack',
                'Jurassic Park: Knitted Christmas Sweater',
                'Jurassic Park: Visitor Centre Limited Edition Legacy Kit',
                'Jurassic World: Deluxe Welcome Kit',
                'Jurassic Park: \'six Foot Turkey\' Velociraptor Magnetic Bottle Opener',
                'Jurassic Park: \'Find Nedry\' Dilophosaurus Limited Edition Coin',
                'Jurassic Park: For Your Safety, No Trespassing T-Shirt',
                'Jurassic Park: No Trespassing Backpack',
                'Jurassic Park: Hazards At Work Snapback Cap',
                'Jurassic Park: Gift Shop Money Wallet',
                'Jurassic Park: Border Patrol Tape Hoodie',
                'Jurassic Park: Dennis Nedry License Plate Replica',
            ]
        },
        'Justice League': {
            products: [
                'Superman Luxury 19 inch Christmas Stocking',
                'Wonder Woman: Winter Wonder-land Knitted Christmas Sweater',
                'Batman: Waiting In The Wings Batarang Prop Replica',
                'Batman: Heads Or Fails Harvey Dent & Two-Face Coin Display',
                'Justice League: Aquaman Trident Cosplay Replica',
            ]
        },
        'Kingdom Hearts': {
            products: [
                'Kingdom Hearts: Que Sora Sora Sublimated Socks',
                'Kingdom Hearts: Spring Water Keyblade Handle Umbrella',
                'Harry Potter: Hermione Granger \'Tools Of The Trade\' Prop Replica Bag',
                'Kingdom Hearts: Keyblade Master Keychain',
            ]
        },
        'Legend of Zelda': {
            products: [
                'Zelda: Messenger Bag with Embroidered Hylian Crest Logo',
                'Zelda: Highway to Hyrule Biker Jacket',
                'Zelda: Majora\'s Mask Metal Keyring',
                'Zelda: Heroine of Hyrule Ladies Cosplay Hoodie',
                'Zelda: Link\'s Armor Bracer',
                'Zelda: Skyward Sword Link\'s Master Sword Replica',
                'Zelda: Skyward Sword Hylian Shield Replica',
                'Zelda: Hero of Hyrule Men\'s Cosplay Hoodie',
                'Zelda: Link Beanie Hat with Elven Ears',
                'Zelda: Triforce Golden Power Lamp',
                'Zelda: The Leggings of Zelda',
                'Zelda: Heat Changing Stained Glass Window Mug',
                'Zelda: Breath of the Wild Cosplay Hoodie',
                'Legend Of Zelda: A Clean Slate Sheikah Drawing Pad',
                'Zelda: Song of Storms Umbrella Master Sword',
                'Zelda: Tri This For Size Ring',
                'Zelda: Breakin\' All The Hyrules Ring',
                'Legend of Zelda: A Link Between Words Notebook',
                'Zelda: Green Goddess Satin Robe Night Dress',
                'Legend of Zelda: Light Up My (Extra) Life Heart Lamp',
                'Legend of Zelda: Get The Green Light Rupee Lamp',
                'Legend of Zelda: Hero of Time Vinyl LP Set',
                'Legend of Zelda: Hylian Hero Hoard Rupee Chest',
                'Legend of Zelda: Majora\'s Mat',
                'Legend of Zelda: Finders Keepers Storage Box',
                'Legend of Zelda: Hyrule Necktie',
                'Legend Of Zelda: Giant\'s Wallet Shoulder Bag',
                'Legend Of Zelda: Round Up The Rupees Purse',
                'Legend Of Zelda: Upgraded Wallet',
                'Legend of Zelda: Golden Touch Handbag',
                'Legend of Zelda: Link Cosplay Hoodie',
                'Legend of Zelda: \'Gimme Five!\' Blue Rupee Icon Light',
                'Legend Of Zelda: Time To Save Hyrule Triforce Alarm Clock',
                'Legend Of Zelda: Calming Compendium Mug',
                'Legend Of Zelda: I Need Some Healing Potion Jar Light',
                'Legend Of Zelda: Seal The Darkness Master Sword Light',
                'Legend Of Zelda: Hylian Handwriting Triforce Light Up Notebook',
                'Legend Of Zelda: Stick It To \'Em Magnet Set',
                'Legend Of Zelda: \'The Darkened Bag\' Twilight Princess Handbag',
            ]
        },
        'Lord of the Rings': {
            products: [
                'Lord of the Rings: The One Ring Replica',
                'Lord of The Rings: One Ring Heat Change Mug',
                'Lord Of The Rings: The Prancing Pony Mug',
                'Lord Of The Rings: Battle For Middle Earth Chess Set',
                'Lord Of The Rings: The Lord Of Mordor Heat Change Mug',
            ]
        },
        'Marvel': {
            products: [
                'Spiderman: Premium Hoodie',
                'Spiderman: Logo Messenger Bag',
                'Captain America: Suit Up Bathrobe',
                'Guardians of the Galaxy: Awesome Mix Vol. 2 Doormat',
                'Guardians of the Galaxy Vol. 2: Yeah Baby/Gears Shift Replica Long Sleeve Shirt',
                'Captain America: Stars and Straps Backpack',
                'Deadpool: Mercs for Money Wallet',
                'Marvel: Eight Legged Geeks Necklace',
                'Avengers Endgame: \'Fine. I\'ll Pour It Myself\' Thanos Infinity Gauntlet Mug',
                'Black Panther: Straight Outta Wakanda Bathrobe',
                'Spider-Man: White Spider Premium Hoodie',
                'Spider-Man: ‘Tis The Season To Be Spidey Knitted Christmas Sweater',
                'Captain America: Red White And Blue Knitted Christmas Sweater',
                'Black Panther: Wakandan Wishes Knitted Christmas Sweater',
                'Thor: Merry Mjölnir Knitted Christmas Sweater',
                'Venom: Season of the Symbiote Knitted Christmas Sweater',
                'Avengers: Clean In A Click Infinity Gauntlet Thanos Bathrobe',
                'Avengers: No Infinity Stone Unturned Thanos Slippers',
                'Marvel: We Are Venom Doormat',
                'Spider-Man: Swingin’ Through The Snow Knitted Christmas Sweater',
                'Marvel: Avengers Knitted Christmas Sweater/Jumper',
                'Venom: Bare Your Teeth Snapback Cap',
                'Thor: Premium Limited Edition Jacket',
                `Avengers Endgame: Advanced Tech Men's Quantum Hoodie`,
                'Avengers Endgame: Advanced Tech Women\'s Quantum Hoodie',
                'Spider-Man: Iron Spider Premium Limited Edition Jacket',
                'Captain America: Premium Limited Edition Jacket',
                'Black Panther: Premium Limited Edition Jacket',
                'Avengers: Phase Three Commemorative Limited Edition Hoodie',
                'Captain Marvel: Protector Of The Skies Mug',
                'Captain Marvel: Literary Legend Notebook',
                'Avengers: Part Of The Team Hoodie',
                'Marvel: Captain America Geeki Tikis Plastic Tumbler',
                'Marvel: Hulk Geeki Tikis Plastic Tumbler',
                'Captain Marvel: \'I\'m Not Gonna Fight Your War\' Bathrobe',
                'Captain Marvel: \'Try To Keep Up\' Slippers',
                'Guardians Of The Galaxy: Loose Leaf Baby Groot Shaped Mug',
                'Guardians Of The Galaxy: Woodland Creature Rocket Shaped Mug',
                'Spider-Man: The Stuff(ing) Of Nightmares 12 inch Plushes - Set of 5',
                'Spider-Man: Frequent Flyer Hoodie',
                'Avengers: Something To Write Home About A5 Notebook',
                'Avengers Endgame: \'Whatever It Takes\' Quantum Hoodie',
                'Spider-Man: White Spider Acid Wash T-Shirt',
                'Captain America: I Could Wear This All Day Premium Hoodie',
                'Spider-Man: Stealth Mission Backpack',
                'Captain Marvel: Festive Is A Good Look For You Knitted Christmas Sweater',
                'Spider-Man: Cover Of Darkness Stealth Suit Snapback Cap',
                'Avengers: Iron Man Power Gauntlet Knitted Christmas Sweater',
                'Marvel: Merchoid Exclusive 2019 Pocket Pop! Vinyl Christmas Advent Calendar',
                'Avengers: Premium Quantum Jacket',
                'Thor: Weaponised Wealth Mjolnir 28cm Money Bank',
                'Black Panther: 8 inch Cable Guy Phone and Controller Holder',
                'Spider-Man: Miles Morales 8 inch Cable Guy Phone and Controller Holder',
                'Hulk: 12 inch XL Cable Guy Phone and Controller Holder',
                'Spider-Man: Web Slinger Premium Hooded Jacket',
                'Deadpool: Once Upon A Deadpool Knitted Christmas Sweater',
                'Deadpool: 8 inch Cable Guy Phone and Controller Holder',
                'Venom: Tongue In Cheek Shaped Mug',
                'Captain Marvel: Faithful Flerken Goose Shaped Mug',
                'Deadpool: Posing 8 inch Cable Guy Phone and Controller Holder',
                'Marvel: Iron Man 8 inch Cable Guy Phone and Controller Holder',
                'Avengers: A Hard Days Fight Infinity Gauntlet Wearable Cushion',
                'Guardians Of The Galaxy: Groot 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Minecraft': {
            products: [
                'Minecraft: Durable Pickaxe Mug',
                'Minecraft: Build A Level Mug',
                'Minecraft: Sky\'s The Limit Level Building Magnets',
            ]
        },
        'Monster Hunter': {
            products: [
                'Monster Hunter World: Deviljho 25 cm Plush',
                'Monster Hunter World: Rathalos 25 cm Plush',
            ]
        },
        'My Hero Academia': {
            products: [
                'My Hero Academia: Nitroglycerin Sweat Bakugou Grenade Shaped Mug',
                'My Hero Academia: Symbol Of Peace All Might Snapback Cap',
                'My Hero Academia: All Heroes Welcome Doormat',
            ]
        },
        'Naruto': {
            products: [
                'Naruto: Konoha Village Cosplay Replica Headband',
                'Naruto Shippuden: Hurricane Chronicles Cosplay Jacket',
            ]
        },
        'Nintendo ': {
            products: [
                'Zelda: Messenger Bag with Embroidered Hylian Crest Logo',
                'Super Mario Bros: Mario Baseball Cap',
                'Zelda: Highway to Hyrule Biker Jacket',
                'Zelda: Majora\'s Mask Metal Keyring',
                'Zelda: Heroine of Hyrule Ladies Cosplay Hoodie',
                'Zelda: Link\'s Armor Bracer',
                'Zelda: Skyward Sword Link\'s Master Sword Replica',
                'Zelda: Skyward Sword Hylian Shield Replica',
                'Zelda: Hero of Hyrule Men\'s Cosplay Hoodie',
                'Zelda: Link Beanie Hat with Elven Ears',
                'Zelda: Triforce Golden Power Lamp',
                'Nintendo: Super Mario Bros Question Block Light with Sound',
                'Zelda: The Leggings of Zelda',
                'Super Mario Bros: Mini Question Block Light',
                'Zelda: Heat Changing Stained Glass Window Mug',
                'Nintendo: Game Boy Heat Changing Mug',
                'Nintendo: NES Classic Hoodie',
                'Zelda: Breath of the Wild Cosplay Hoodie',
                'Legend Of Zelda: A Clean Slate Sheikah Drawing Pad',
                'Zelda: Song of Storms Umbrella Master Sword',
                'Nintendo: Burning Rubber SNES Controller Keychain',
                'Nintendo: Game Girl Zip Around Purse',
                'Zelda: Tri This For Size Ring',
                'Zelda: Breakin\' All The Hyrules Ring',
                'Nintendo: That\'s NES - ty Necklace',
                'Super Mario: Jurassic Perks Earring Set',
                'Super Mario: Ghost Busters Earring Set',
                'Legend of Zelda: A Link Between Words Notebook',
                'Nintendo: Button Basher Purse',
                'Zelda: Green Goddess Satin Robe Night Dress', 'Legend of Zelda: Light Up My(Extra) Life Heart Lamp',
                'Legend of Zelda: Get The Green Light Rupee Lamp',
                'Super Mario: Head Banger Question Block 3 D Light',
                'Super Mario: Bump in the Night Boo 3 D Light',
                'Super Mario: Super Size Me Super Mushroom 3 D Light',
                'Donkey Kong: Hail to the Kong Barrel - Shaped Mug',
                'Super Mario: Level Up Mushroom Light',
                'Nintendo: Game Over Game Boy Alarm Clock',
                'Nintendo: Making A Splash NES Cartridge Coasters',
                'Nintendo: 8 - Bit Spender NES Wallet',
                'Nintendo: He Got Game NES Backpack',
                'Legend of Zelda: Majora\'s Mat',
                'Nintendo: Home Console NES Controller Doormat',
                'Legend of Zelda: Finders Keepers Storage Box',
                'Nintendo: Slide Into Action Game Boy Box Art Coasters',
                'Legend of Zelda: Hyrule Necktie',
                'Donkey Kong: Monkey Business Necktie',
                'Legend Of Zelda: Giant\'s Wallet Shoulder Bag',
                'Legend Of Zelda: Round Up The Rupees Purse',
                'Legend Of Zelda: Upgraded Wallet',
                'Nintendo: 64 Reasons Why N64 Keyring',
                'Nintendo: Original Is Best Super Famicon Keyring',
                'Donkey Kong: Let\'s Get Down To Business Tie Backpack',
                'Legend of Zelda: Golden Touch Handbag',
                'Legend of Zelda: Link Cosplay Hoodie',
                'Super Mario: Raccoon Mario Pixel Pals Light',
                'Super Mario: Wahoo! 1 Up Mushroom Light',
                'Super Mario: In Another Castle Question Block Maze Safe',
                'Legend of Zelda: \'Gimme Five!\' Blue Rupee Icon Light',
                'Nintendo: Time To Step Things Up Game Boy Color Watch',
                'Nintendo: Light Up The World NES Controller Lamp',
                'Nintendo: Power In The Palm Of Your Hand NES Controller Mug',
                'Super Mario: Peek-A-Boo Heat Change Mug',
                'Super Mario: Super Leaf Required Raccoon Cosplay Hat',
            ]
        },
        'One Piece': {
            products: [
                'One Piece: For He\'s A Jolly(Roger) Good Fellow 120 x 70 cm Flag',
                'One Piece: Luffy Straw Hat Cosplay Replica',
                'One Piece: Mugiwara Pirates Barrel Mug',
            ]
        },
        'One Punch Man ': {
            products: [
                'One Punch Man: It\'s A Knockout Saitama Fist Shaped Mug',
                'One Punch Man: \'Just An Average Guy\' Saitama Cosplay T-Shirt',
            ]
        },
        'Overwatch': {
            products: [
                'Overwatch: Roadhog Cute But Deadly Figure',
                'Overwatch: Sentry Mode Bastion Light',
                'Overwatch: Amp It Up Lucio Light',
                'Overwatch: \'Nerf This!\' Loungefly D.VA Mini Backpack',
            ]
        },
        'PlayStation': {
            products: [
                'Playstation: PS1 Messenger Bag',
                'PlayStation: PSOne Console Shaped Bifold Wallet',
                'PlayStation: \'For The Players\' Track Jacket',
                'PlayStation: Throwing Some Shapes Light',
                'PlayStation: Damage Control Stress Controller',
                'PlayStation: Symbols Necktie',
                'PlayStation: The Best Of The Best Game Coasters (Set of 4)',
                'PlayStation: This Is For The Dreamers Alarm Clock',
                'PlayStation: 100% Completion Trophy Glass',
                'PlayStation: Life Before Dualshock Controller Icon Light',
                'PlayStation: Loading Times Watch',
                'PlayStation: Back To The 90s Hoodie',
                'Spyro The Dragon: Ice Variant 8 inch Cable Guy Phone and Controller Holder',
                'PlayStation: On The Move Controller Travel Mug',
            ]
        },
        'Pokemon': {
            products: [
                'Pokemon: Pikachu Silhouette Necktie',
                'Pokemon: Fire It Up Charmander Alarm Clock',
                'Pokemon: \'Pikachu Used Static\' Alarm Clock',
                'Pokemon: \'snorlax Used Rest\' Lamp',
                'Pokemon: Sultry Singer Jigglypuff Lamp',
            ]
        },
        'Resident Evil': {
            products: [
                'Resident Evil: Umbrella Corporation Hoodie',
                'Resident Evil: Shots For A Rainy Day Umbrella Corporation Mini Glasses Set',
                'Resident Evil 2: Limited Edition Coin',
                'Resident Evil 2: Official Police Business RPD Cap',
                'Resident Evil 2: Leon Kennedy RPD Premium Hoodie',
                'Resident Evil 2: Loyalty Bonus Umbrella Corp. Gift Set',
                'Resident Evil 3: Nemesis Stubbins Plush',
                'Resident Evil 2: Show Your True Colours Umbrella Necklace',
            ]
        },
        'Rick and Morty': {
            products: [
                'Rick and Morty: Portal Gun',
                'Monopoly: Rick and Morty Edition (US)',
                'Rick and Morty: Meeseeks and Destroy Snapback Cap',
                'Rick and Morty: Schfif-Schwifty Doormat',
                'Rick and Morty: \'I\'ve Turned Myself Into A...\' Mug',
                'Rick and Morty: Off-Brand Portal Heat Change Mug',
                'Rick and Morty: Numb The Pain Rick Sanchez Hip Flask',
                'Rick and Morty: Morty Box',
                'Rick and Morty: Faces Necktie',
                'Rick and Morty: S01 E01 Pin Badge Set',
                'Rick and Morty: Make Your House A Home Plumbus Candle',
                'Rick and Morty: Snakes Not Included Smartwatch',
                'Rick and Morty: Pocket Portal Gun Keyring Light',
                'Rick and Morty: Made It Myself Ship USB Light',
                'Rick and Morty: Making Life Easier Plumbus Shaped Mug',
                'Rick and Morty: Interdimensional Illumination Portal Gun Light',
                'Rick and Morty: Pickle Juice Pickle Rick Stein',
                'Rick and Morty: A Whole Other Dimension 3D Coasters',
                'Rick & Morty: Let\'s Get Schwifty Knitted Christmas Sweater',
                'Rick and Morty: Wireless Portal Phone Charger',
                'Rick and Morty: Find The Morty Game',
            ]
        },
        'Sailor Moon': {
            products: [
                'Sailor Moon: Beverage Guardian Artemis Shaped Mug',
                'Sailor Moon: Sofa Guardian Luna Cushion',
            ]
        },
        'Skyrim': {
            products: [
                'The Elder Scrolls: Skyrim Limited Edition Coin',
                'The Elder Scrolls: Elsweyr Limited Edition Coin',
            ]
        },
        'Sonic the Hedgehog': {
            products: [
                'Sonic The Hedgehog: 8 inch Cable Guy Phone and Controller Holder',
                'Sonic The Hedgehog: Make A Note Of Your Valuables Lenticular A5 Notebook',
                'Sonic The Hedgehog: Tails 8 inch Cable Guy Phone and Controller Holder',
                'Sonic The Hedgehog: Green Hill Zone Big Box Merch Crate',
                'Sonic The Hedgehog: Knuckles 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Sony': {
            products: [
                'PlayStation: Throwing Some Shapes Light',
                'PlayStation: Damage Control Stress Controller',
            ]
        },
        'Spider-man': {
            products: [
                'Spiderman: Premium Hoodie',
                'Spiderman: Logo Messenger Bag',
                'Marvel: Eight Legged Geeks Necklace',
                'Spider-Man: White Spider Premium Hoodie',
                'Spider-Man: ‘Tis The Season To Be Spidey Knitted Christmas Sweater',
                'Venom: Season of the Symbiote Knitted Christmas Sweater',
                'Marvel: We Are Venom Doormat',
                'Spider-Man: Swingin’ Through The Snow Knitted Christmas Sweater',
                'Venom: Bare Your Teeth Snapback Cap',
                'Spider-Man: Iron Spider Premium Limited Edition Jacket',
                'Spider-Man: The Stuff(ing) Of Nightmares 12 inch Plushes - Set of 5',
                'Spider-Man: Frequent Flyer Hoodie',
                'Spider-Man: White Spider Acid Wash T - Shirt',
                'Spider-Man: Stealth Mission Backpack',
                'Spider-Man: Cover Of Darkness Stealth Suit Snapback Cap',
                'Spider-Man: Miles Morales 8 inch Cable Guy Phone and Controller Holder',
                'Spider-Man: Web Slinger Premium Hooded Jacket',
                'Venom: Tongue In Cheek Shaped Mug',
            ]
        },
        'Spyro the Dragon': {
            products: [
                'Spyro The Dragon: 8 inch Cable Guy Phone and Controller Holder',
                'Spyro The Dragon: Gem Hunter Gear Crate',
                'Spyro The Dragon: Ice Variant 8 inch Cable Guy Phone and Controller Holder',
            ]
        },
        'Square Enix': {
            products: [
                'Final Fantasy: Sugar And Strife Cloud Plushy',
                'Final Fantasy: One Winged Angel Sephiroth Plushy',
                'Kingdom Hearts: Que Sora Sora Sublimated Socks',
            ]
        },
        'Star Wars': {
            products: [
                'Star Wars: Galactic Empire Bathrobe',
                'Star Wars: Jedi Outfit Bathrobe',
                'Star Wars: Trench Run Knitted Christmas Sweater',
                'Star Wars: Chewbacca Adult Fleece Bathrobe',
                'Star Wars: Luxury 19 Inch BB - 8 Christmas Stocking',
                'Star Wars: Rogue One Jyn Erso Pop!Vinyl Bobblehead Figure',
                'Star Wars: Luxury 19 Inch Darth Vader Christmas Stocking',
                'Stormtrooper Decanter',
                'Star Wars: Happy Hoth - idays Knitted Christmas Sweater',
                'Star Wars: Judge, Jury, Executioner Purse',
                'Star Wars: TIE Fighter Poseable Desk Lamp',
                'Star Wars: Fully Armed and Operational Death Star Pet Den',
                'Star Wars: Locked On Target Backpack',
                'Star Wars: \'I Take Orders From Just One Person\' Han Solo Cosplay Hoodie',
                'Star Wars: Cap-tain Of The Ship',
                'Star Wars: Frosty Falcon Knitted Christmas Sweater',
                'Star Wars: Tauntaun Tidings Knitted Christmas Sweater',
                'Star Wars: The Season To Be Jolly It Is Christmas Sweater',
                'Star Wars: Rebel Invaders Christmas Knitted Sweater',
                'Star Wars: Gorgeous Porg-eous Women\'s Bathrobe',
                'Star Wars: All I Want For Christmas Is R2 Knitted Christmas Sweater',
                'Star Wars: X - Wing v TIE Fighter Knitted Christmas Sweater',
                'Star Wars: \'I Must Obey My Master\' Darth Vader Lightsaber LED Light Up Dog Lead',
                'Star Wars: Han Solo Hoth Replica Jacket',
                'Star Wars: \'Choose Your Weapon\' Lightsaber Umbrella',
                'Star Wars: Millennium Falcon Desk Lamp',
                'Star Wars: Teaboy In Training Jedi Academy Mug',
                'Star Wars: Co-Pilot Of The Kitchen Chewbacca Apron',
                'Star Wars: Trust Co-Pilot Loungefly R2D2 Mini Backpack',
                'Star Wars: \'It\'s A Trap!\' Admiral Ackbar Doormat',
                'Star Wars: Astromech Currency Loungefly R2D2 Purse',
                'Star Wars: Starfighter Credits Loungefly X-Wing Pilot Purse',
                'Star Wars: At Ease Stormtrooper Tech Hoodie',
                'Star Wars: Co-Pilot Comfort Chewbacca Cushion',
                'Star Wars: I Find Your Lack Of Cheer Disturbing Knitted Christmas Sweater',
                'Star Wars: Sith Trooper Hoodie',
                'Star Wars: Merry Mandalorian Knitted Christmas Sweater',
                'Star Wars: 105th Battalion Sith Trooper Snapback Cap',
                'Star Wars: \'The Final Chapter\' The Rise Of Skywalker Logo T-Shirt',
                'Star Wars: The Knights Of Ren Episode IX Heat Changing Mug',
                'Star Wars: First Order Sith Trooper 3D Mug',
                'Star Wars: Kintsugi Kylo Ren 3D Mug',
                'Star Wars: Black Series Luke Skywalker Battle Simulation Helmet',
                'Star Wars: Choose Your Path A5 Sequin Notebook',
                'Star Wars: The Empires Ultimate Death Star 3D Mug',
                'Star Wars: Darth Vader 8 inch Cable Guy Phone and Controller Holder',
                'Star Wars: Stormtrooper 8 inch Cable Guy Phone and Controller Holder',
                'Star Wars: Touch The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Tonal The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Photo The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Pocket The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Sketch The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Sketch The Mandalorian The Child/Baby Yoda Hoodie',
                'Star Wars: Eat. Sleep. Levitate. Repeat. The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: This Is My Good Side The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Power Nap The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Precious Cargo The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Retro The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: Silhouette The Mandalorian The Child/Baby Yoda T-Shirt',
                'Star Wars: The Mandalorian The Child/Baby Yoda Talking Plush',
                'Star Wars: Boba Fett 8 inch Cable Guy Phone and Controller Holder',
                'Star Wars: Chewbacca 8 inch Cable Guy Phone and Controller Holder',
                'Star Wars: Dark Side Drinks Darth Vader Shaped Mug',
                'Star Wars: Choose Your Lightsaber XL Heat Change Mug',
                'Star Wars: Death Star Geonosian Maze Puzzle',
                'Star Wars: A New Hope VHS A5 Notebook',
                'Star Wars: The Mandalorian The Child/Baby Yoda Plush Backpack',
                'Star Wars: The Mandalorian The Child/Baby Yoda Life Size Figure',
            ]
        },
        'Suicide Squad': {
            products: [
                'Harley Quinn: Daddy\'s Lil Monster Official Replica Shirt',
                'Harley Quinn: \'Diamond Gal\' Replica Cosplay Tattoo Tights',
                'Harley Quinn: Laugh Your Head Off Beanie',
                'Harley Quinn: Yes Siree Bob Cuffs',
            ]
        },
        'Super Mario Bros': {
            products: [
                'Super Mario Bros: Mario Baseball Cap',
                'Nintendo: Super Mario Bros Question Block Light with Sound',
                'Super Mario Bros: Mini Question Block Light',
                'Super Mario: Jurassic Perks Earring Set',
                'Super Mario: Ghost Busters Earring Set',
                'Super Mario: Head Banger Question Block 3D Light',
                'Super Mario: Bump in the Night Boo 3D Light',
                'Super Mario: Super Size Me Super Mushroom 3D Light',
                'Super Mario: Level Up Mushroom Light',
                'Super Mario: Pipe Dream Handbag',
                'Super Mario: Raccoon Mario Pixel Pals Light',
                'Super Mario: Wahoo! 1 Up Mushroom Light',
                'Super Mario: In Another Castle Question Block Maze Safe',
                'Super Mario: Crack Open A Hot One Yoshi Egg Mug',
                'Super Mario: Peek-A-Boo Heat Change Mug',
                'Super Mario: Super Leaf Required Raccoon Cosplay Hat',
                'Super Mario: Vicious Vegetation Piranha Plant Posable Lamp',
            ]
        },
        'Superman': {
            products: [
                'Superman Luxury 19 inch Christmas Stocking',
                'Superman: Man Of Fleece Bathrobe',
                'Superman: Man of Tomorrow Premium Jacket',
                'Superman: Seasonal Suit Up Knitted Christmas Sweater',
            ]
        },
        'Terminator': {
            products: [
                'Terminator: Head Goblet',
                'Terminator: Just Another (Judgment) Day In The Office Tankard',
            ]
        },
        'Thor': {
            products: [
                'Thor: Merry Mjölnir Knitted Christmas Sweater',
                'Thor: Premium Limited Edition Jacket',
                'Thor: Another! Mjölnir Bottle Opener',
                'Thor: Weaponised Wealth Mjolnir 28cm Money Bank',
            ]
        },
        'Transformers': {
            products: [
                'Transformers: \'Transform And Roll Out\' Optimus Prime Hoodie',
                'Transformers: \'Transform And Rise Up\' Megatron Hoodie',
            ]
        },
        'Warhammer': {
            products: [
                'Warhammer 40k: Defenders Of Humanity Space Marines Hoodie',
                'Warhammer 40k: Iron Will Space Marines Wallet',
                'Warhammer 40k: Earn Our Salvation Space Marines Snapback Cap',
                'Warhammer 40k: Imperialis Backpack',
                'Warhammer 40k: Courage & Honour Ultramarine Stein Mug',
                'Warhammer 40k: Pain Is Temporary Blood Angels Stein Mug',
                'Warhammer 40k: Ultramarines Chapter Tankard',
                'Warhammer 40k: Blood Angels Chapter Tankard',
                'Warhammer 40k: Space Wolves Chapter Tankard',
                'Warhammer 40k: Dark Angels Chapter Tankard',
                'Warhammer 40k: For The Emperor Tankard',
                'Warhammer 40,000: Icy Imperium Knitted Christmas Sweater',
                'Warhammer 40,000: \'slay Bells Ring\' Khorne Chaos Christmas Sweater',
            ]
        },
        'Wonder Woman': {
            products: [
                'Wonder Woman: Winter Wonder-land Knitted Christmas Sweater',
                'Wonder Woman: Rain Killer Sword Handle Umbrella',
                'Wonder Woman: This Is How Amazonians Relax Slippers',
                'Wonder Woman: The Most Wonder-ful Time Of The Year Knitted Christmas Sweater',
            ]
        }
    }

    /* Create the gift banner */
    const giftBanner = () => {
        const brandText = document.querySelector('.main-title').textContent.trim().replace('OFFICIAL', '').replace('MERCHANDISE', '');
        const brand = brandText.trim();
        const giftBanner = document.createElement('div');
        giftBanner.classList.add(`${shared.ID}-giftbanner`);
        giftBanner.innerHTML = `
        <div class="${shared.ID}_innerText">
            <div class="${shared.ID}_text">
                <h3>Looking for <span>${brand}</span> Gifts?</h3>
                <p>Shop them at Merchoid</p>
            </div>
            <div class="${shared.ID}-cta">See Gifts</div>
        </div>`;

        document.querySelector('.brands-bar-container').insertAdjacentElement('afterend', giftBanner);
    }

    const brandText = document.querySelector('.main-title').textContent.trim().replace('OFFICIAL', '').replace('MERCHANDISE', '');
    const brand = brandText.trim();

    const matchingBrands = brandsObj[brand];

    // add the gift banner if more than 3
    if(matchingBrands.products.length >= 3) {
        giftBanner();
    }

    const allProducts = document.querySelectorAll('.item.product.product-item');

    if(matchingBrands) {

        for (let index = 0; index < allProducts.length; index += 1) {
            const productEl = allProducts[index];
            const productName = productEl.querySelector('.product.name.product-item-name');


            if(productName) {
                if(matchingBrands.products.length >= 3) {
                    for (let x = 0; x < matchingBrands.products.length; x += 1) {
                        const objProduct = matchingBrands.products[x];
                            if(productName.innerText === objProduct) {
                                const bestSeller = document.createElement('div');
                                bestSeller.classList.add(`${shared.ID}_bestSelling`);
                                bestSeller.innerHTML = productEl.innerHTML;
                                bestSeller.querySelector('img').src = bestSeller.querySelector('img').getAttribute('data-original');

                                document.querySelector(`.${shared.ID}-products`).appendChild(bestSeller);
                            }
                        }
                    }
                    else {
                        document.querySelector(`.${shared.ID}-bestSellers`).style.display = 'none';
                    }
            }
        }

    }
    else {
        document.querySelector(`.${shared.ID}-bestSellers`).style.display = 'none';
    }
}