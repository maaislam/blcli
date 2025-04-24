import { __, getLanguage } from "../helpers";


// Set page names using translations
const treadmills = `${__('Treadmills')}`;
const bikes = `${__('Exercise bikes')}`;
const crossTrainers = `${__('Cross Trainers')}`;
const rowers = `${__('Rowers')}`;

const pageContentObj = {
    [treadmills]: {
        heroImage: '//cdn.optimizely.com/img/8355110909/b40b6d94ca974368905f21a8198ba641.jpg',
        title: 'Treadmills',
        subtitle: 'Our treadmills offer the most biomechanics for safe and comfortable training. The connected interfaces grant exciting workouts and results.',
        mainProducts: {
            'MyRun': {
                subtitle: 'The compact treadmill',
                image: '//cdn.optimizely.com/img/8355110909/81b129ef4d494523894fe602a001a66a.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/3bcff343935347019c525ea3c00ccf2f.jpg',
                description: 'The treadmill that fits any home space thanks to its compact size, and connects to your tablet to offer digital training & coaching.',
                price: `${getLanguage() === 'us' ? `$ 4,470.00` : getLanguage() === 'it' ? `XXX` : `£ 3,250`}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/treadmill-myrun.html`,
            },
            'Run Personal': {
                subtitle: 'Running with Style',
                image: '//cdn.optimizely.com/img/8355110909/9636b030ac804ea7a56a0efd9c6a826e.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/d01188c1a3b94258b87a9e4ae95173ff.jpg',
                description: 'A piece of art designed with hi-end materials for a digitally guided running experience.',
                price: `${getLanguage() === 'us' ? `$ 16,050.00` : `£ 12,500`}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/run-personal.html`,
                line: 'Personal',
                lineLink: `${__('https://www.technogym.com/gb/line/personal/')}`
            },
            'Artis Run': {
                subtitle: 'The treadmill for cutting edge training area',
                image: '//cdn.optimizely.com/img/8355110909/4eabf171819d45e9b18a3eabca5d2c72.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/637332cff779495f9ae758216638ef24.jpg',
                description: 'The most immersive running experience on the largest (21,5") full-HD screen.',
                price: `${getLanguage() === 'us' ? `$ 18,950.00` : '£ 19,850'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/artis-run.html`,
                line: 'Artis',
                lineLink: `${__('https://www.technogym.com/gb/line/artis/')}`
            },
            'Skillrun': {
                subtitle: 'Performance running and power training',
                image:'//cdn.optimizely.com/img/8355110909/4a6a62a7cacd4893827976e4a07bdf9f.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/c3a5deb07eac4ff79355b494c5d6db8c.jpg',
                description: 'The most advanced running equipment in the industry for performance running: cardio and power in one.',
                price: `${getLanguage() === 'us' ? `from $ 13,090.00` : 'From £ 16,130'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/skillrun.html`,
                line: 'Skill Line',
                lineLink: `${__('https://www.technogym.com/gb/skill-line-performance-equipment/')}`
            },
        },
        smallCarousel: {
            'Jog Forma': {
                image: '//cdn.optimizely.com/img/8355110909/eb0c842d6b9c48dca088d72240c5ec15.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/cca4c13e03554420957d1bb7db4c70c5.jpg',
                description: 'Simple and effective cardio workouts, intuitive dashboard and professional grade performance.',
                price: `${getLanguage() === 'us' ? `` : '£ 6,190'}`, 
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/jog-excite-forma.html`,
                line: 'Forma'
            },
            'Excite run 600': {
                image: '//cdn.optimizely.com/img/8355110909/c2bc06bff5e541cdb14959420bdc5d22.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/c39fdfa2a3784a8297fc261fbe40becc.jpg',
                description: 'A versatile and sturdy treadmill offering performance features, guided exercise and entertainment.',
                price: `${getLanguage() === 'us' ? `from $ 8,620.00` : ''}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/treadmill-excite-600.html`,
                line: 'Excite®'
            },
            'Excite run 1000': {
                image: '//cdn.optimizely.com/img/8355110909/494e2b001d4e4af8a5d196f6992724e3.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/5940917cb14a4f6dbba483832f0c3596.jpg',
                description: 'Cutting edge treadmill technology for natural running feeling and unique engaging experience.',
                price: `${getLanguage() === 'us' ? `from $ 11,080.00` : ''}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/treadmill-excite-1000.html`,
                line: 'Excite®'
            },
            /*'Skillmill™ Connect': {
                image: '//cdn.optimizely.com/img/8355110909/1b64c73d3dc94b3292bb8d686bda2a97.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/fba0f7c4a2d54122ac258966b550439f.jpg',
                description: 'State-of-the-art technology for a natural sensation of running, and engaging digital experiences',
                price: `${getLanguage() === 'us' ? `$ 9,740.00` : ''}`,
                link: `https://www.technogym.com/${__('gb')}/skillmill-connect.html`,
            },
            'Skillmill™ Console': {
                image: '//cdn.optimizely.com/img/8355110909/629c3ca1d5ba4521ba21ebb92cfd486c.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/fba0f7c4a2d54122ac258966b550439f.jpg',
                description: 'State-of-the-art technology for a natural sensation of running, and engaging digital experiences',
                link: `https://www.technogym.com/${__('gb')}/skillmill-console-1.html`,
            },
            'Skillmill™ Go': {
                image: '//cdn.optimizely.com/img/8355110909/f877f5e8d7164e168965d2e972bbdd71.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/fba0f7c4a2d54122ac258966b550439f.jpg',
                description: 'State-of-the-art technology for a natural sensation of running, and engaging digital experiences',
                link: `https://www.technogym.com/${__('gb')}/skillmill-go-1.html`,
            },*/
        },
        medCarousel: {
            'Excite run 600 Med': {
                image: '//cdn.optimizely.com/img/8355110909/c2bc06bff5e541cdb14959420bdc5d22.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/a2a5cc1af3cb4430ad92b1999179bafc.jpg',
                description: 'Dedicated to safe cardiovascular training, the treadmill supports complementary handrails.',
                link: `https://www.technogym.com/${__('gb')}/excite-treadmill-run-600-med.html`,
            },
            'Excite run 1000 Med': {
                image: '//cdn.optimizely.com/img/8355110909/494e2b001d4e4af8a5d196f6992724e3.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/f07467e5475241fb8bcbb801ef97d05f.jpg',
                description: 'Safe cardiovascular training and embedded testing protocols for precise assessments.',
                link: `https://www.technogym.com/${__('gb')}/excite-treadmill-run-1000-med.html`,
            },
            'Find more cardio equipment for rehabilitation and prevention': {
                link: `https://www.technogym.com/${__('gb')}/products/shopby/line_internal-excite_med.html`,
            }
        }
    },
    [bikes]: {
        heroImage: '//cdn.optimizely.com/img/8355110909/be7dde0a703443b3b1584722fa4bde43.jpg',
        title: 'Exercise bikes',
        subtitle: 'Realistic motion, addictive programmes and classes, accurate metrics: shift the indoor cycling experience to a higher gearwith our range of bikes and smart trainers.',
        mainProducts: {
            'Technogym Bike': {
                subtitle: 'The best indoor cycling experience',
                image: '//cdn.optimizely.com/img/8355110909/e01168cdc02d448285826b3ab9622f05.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/4aaa5f338f3740a6985e958bf9da1c70.jpg',
                description: 'Live and on-demand cycling classes by top trainers on the professional grade indoor bike.',
                price: `${getLanguage() === 'us' ? `` : `£ 2,450`}`,
                itPrice: '',
                link: `${__('https://www.technogym.com/gb/indoor-cycling-live-bike.html')}`,
            },
            'Bike Personal': {
                subtitle: 'The designer upright bike',
                image: '//cdn.optimizely.com/img/8355110909/da1bcd03f3dd48eab385bae971b9fa30.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/c0a68b23360048558911c5c2598c4bd8.jpg',
                description: 'Guided workouts meet the sleekes shapes for an extraordinary riding experience, including connectivity and entertainment.',
                price: `${getLanguage() === 'us' ? `$ 11,650` : `£ 8,250`}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/bike-personal.html`,
                line: 'Personal',
                lineLink: `${__('https://www.technogym.com/gb/line/personal/')}`
            },
            'Recline Personal': {
                subtitle: 'Design award winning recumbent bike',
                image: '//cdn.optimizely.com/img/8355110909/10d5ebd5bac74100ac32a3f26151f1df.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/3dd4baf25b2a417780c827fbf8eb472a.jpg',
                description: 'Maximum comfort, glemaing details and an advanced multimedia interface team up for the most delightful workout.',
                price: `${getLanguage() === 'us' ? `$ 12,465.00` : '£8,900'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/recline-personal.html`,
                line: 'Personal',
                lineLink: `${__('https://www.technogym.com/gb/line/personal/')}`
            },
            'Skillbike': {
                subtitle: 'Designed with pro cyclists',
                image:'//cdn.optimizely.com/img/8355110909/889772262eda45789ffc0f22f004490d.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/d6c00c87039940119f1e73b76611ef03.jpg',
                description: 'The performance-focused indoor bike offers precious insight to improve your pedalling and the most realistic cycling experience.',
                price: `${getLanguage() === 'us' ? `$ 4,870` : '£4,290.00'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/skillbike.html`,
                line: 'Skill Line',
                lineLink: `${__('https://www.technogym.com/gb/skill-line-performance-equipment/')}`
            },
            'MyCycling': {
                subtitle: 'The smartest trainer with a new training system',
                image: '//cdn.optimizely.com/img/8355110909/c172747b79db42c0a0adf0810b0d237d.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/c172747b79db42c0a0adf0810b0d237d.jpg',
                description: 'Designed for your performance',
                price: `${getLanguage() === 'us' ? `$ 2,240` : getLanguage() === 'it' ? `` : '£1,590'}`,
                link: `https://www.technogym.com/${__('gb')}/mycycling.html`,
             },
        },
        uprightBikes: {
            'Bike Forma': {
                image: '//cdn.optimizely.com/img/8355110909/1ba7492557044a3f871dab295016d00c.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/673db3b7896942cb959b68bdf1c8af88.jpg',
                description: 'A workout-focused indoor bike for comfortable and realistic rides.',
                price: `${getLanguage() === 'us' ? `` : '£2,250'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/bike-excite-forma.html`,
            },
            'Artis Bike': {
                image: '//cdn.optimizely.com/img/8355110909/2ce662c048aa47efa424a745485ee40c.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/9690ca2fd9684cbf9de4531d13b0bf71.png',
                description: 'Total comfort and endless fun in a technologically advanced indoor bike designed for a superior training area.',
                price: `${getLanguage() === 'us' ? `$ 7,980` : '£9,250'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/artis-bike.html`,
            },
            'Excite® Bike': {
                image: '//cdn.optimizely.com/img/8355110909/55056819ccdf4027ab9d12ac02405e71.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/e06aa57cd7f742d8b090ef978040d57c.jpg',
                description: 'Bring effective indoor riding into any cardio area with all the entertainment and connectivity options you need.',
                price: `${getLanguage() === 'us' ? `from $ 4,810` : ''}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/bike-excite-1000.html`,
            },
            'Group cycle™ Connect': {
                image: '//cdn.optimizely.com/img/8355110909/a3c686f044d24c8dad5382ff912ffa3d.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/53d168b89bb94057a5d13dd2da7c610c.jpg',
                description: 'Offering precise power measurement, real-time performance data and tracking of results, this bike knows how to bring performance into focus.',
                price: `${getLanguage() === 'us' ? `from $ 2,590` : '£3,270'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/group-cycle-connect.html`,
            },
            'Group cycle™ Ride': {
                image: '//cdn.optimizely.com/img/8355110909/2101dcac7d5c436fb59f9b8da1d41195.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/28f911acd6814f2c852ac359ba0db14a.jpg',
                description: 'Offering precise power measurement, real-time performance data and tracking of results, this bike knows how to bring performance into focus.',
                price: `${getLanguage() === 'us' ? `` : '£2,450'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/group-cycle-ride.html`,
            },

        },
        recumbentBikes: {
            'Recline Forma': {
                image: '//cdn.optimizely.com/img/8355110909/26caf358f405464394fa4ed1b7279cbe.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/f1dab0cdf92141559dc8f5803cd7ba53.jpg',
                description: 'Get your pedals spinning without strain on your back.',
                price: `${getLanguage() === 'us' ? `` : '£ 2,690'}`, 
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/recline-excite-forma.html`,
            },
           
            'Artis Recline': {
                image: '//cdn.optimizely.com/img/8355110909/3332f44f2b494f47ab801d06bb8bc46d.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/7be4646841b7473f94af7a9ca541ec49.jpg',
                description: 'Ergonomic, connected, delightful: the perfect addition for a moderate workout in  a technologycally advanced training area.',
                price: `${getLanguage() === 'us' ? `$ 8,450` : '£9,850'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/artis-recline.html`,
            },
           
            'Excite® Recline': {
                image: '//cdn.optimizely.com/img/8355110909/578412f14a0141c3b28910cf2ac56c32.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/f853a921894c41858ad5762d38dcc31e.jpg',
                description: "Superior training feel and  great customisation options suit your facility's need for a safe training and entertainment.",
                price: `${getLanguage() === 'us' ? `from $ 5,035` : ''}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/recline-excite-1000.html`,
            }, 
        },
        medCarousel: {
            'Excite Bike MED': {
                image: '//cdn.optimizely.com/img/8355110909/804caa94319147ea928b44340b02ed4b.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/24473a4ffaa24c7aa155f69dc06ad94f.jpg',
                description: 'Indoor cycling exercises with added comfort to suits users with different degrees of mobility.',
                link: `https://www.technogym.com/${__('gb')}/excite-bike-med.html`,
            },
            'Excite Recline Med': {
                image: '//cdn.optimizely.com/img/8355110909/8e1d2e823f204d3a9d0b7c0ad79932c8.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/dd522efaecdd45339b9703c72c22cc82.jpg',
                description: 'The medically certified Excite Recline Med offers cycling exercises which can be performedwith added comfort to users with limited mobility.',
                link: `https://www.technogym.com/${__('gb')}/excite-recline-med.html`,
            },
            'Find more cardio equipment for rehabilitation and prevention': {
                link: `https://www.technogym.com/${__('gb')}/products/shopby/line_internal-excite_med.html`,
            }
        }
    },
    [crossTrainers]: {
        heroImage: '//cdn.optimizely.com/img/8355110909/898c4537cde9418496b2d56ed855fae9.jpg',
        title: 'Cross Trainers',
        subtitle: 'Glide into the most natural motion of our cross trainers. Experience delightfully challenging workouts, with digital guidance included.',
        mainProducts: {
            'Cross Personal': {
                subtitle: 'The designer cross trainer',
                image: '//cdn.optimizely.com/img/8355110909/d6b6a8dd3404416fab80f275fff1500a.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/d6b6a8dd3404416fab80f275fff1500a.jpg',
                description: 'Live and on-demand cycling classes by top trainers on the professional grade indoor bike.',
                price: `${getLanguage() === 'us' ? `$ 14,815` : `£ 11,500`}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/cross-personal.html`,
                line: 'Personal',
                lineLink: `${__('https://www.technogym.com/gb/line/personal/')}`
            },
            'Artis Synchro': {
                subtitle: 'The cross trainer for cutting edge facilities',
                image: '//cdn.optimizely.com/img/8355110909/c3e3511735fb47e58a8722b8853364f0.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/c3e3511735fb47e58a8722b8853364f0.jpg',
                description: 'Glide your way to results',
                price: `${getLanguage() === 'us' ? `$ 12,950` : `£ 12,950`}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/artis-synchro.html`,
                line: 'Artis',
                lineLink: `${__('https://www.technogym.com/gb/line/artis/')}`
            },
            'Artis Vario': {
                subtitle: 'The adaptive cross trainer for cutting edge facilities',
                image: '//cdn.optimizely.com/img/8355110909/2a2625dc17f24ed7b4697a6991e98035.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/2a2625dc17f24ed7b4697a6991e98035.jpg',
                description: 'Adapts to your strideand engages your mind',
                price: `${getLanguage() === 'us' ? `$ 14,950` : '£ 14,950'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/artis-vario.html`,
                line: 'Artis',
                lineLink: `${__('https://www.technogym.com/gb/line/artis/')}`
            },
        },
        smallCarousel: {
            'Synchro Forma': {
                image: '//cdn.optimizely.com/img/8355110909/659fa6a954f64097b2119861a361af3f.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/659fa6a954f64097b2119861a361af3f.jpg',
                description: 'Total body Workout.',
                price: `${getLanguage() === 'us' ? `` : '£ 3,390'}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/synchro-excite-forma.html`,
            },
            'Excite® Synchro': {
                image: '//cdn.optimizely.com/img/8355110909/d6dcfc0c07a04100bb6a2bfe80a254a4.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/d6dcfc0c07a04100bb6a2bfe80a254a4.jpg',
                description: 'State-of-the-art cross trainer for the cardio area.',
                price: `${getLanguage() === 'us' ? `from $ 8,170` : ''}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/synchro-excite-1000.html`,
            },
            'Excite® Vario': {
                image: '//cdn.optimizely.com/img/8355110909/92baaa0b5043480a86ff347ece4467c5.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/92baaa0b5043480a86ff347ece4467c5.jpg',
                description: 'State-of-the-art adaptive cross trainer for the cardio area.',
                price: `${getLanguage() === 'us' ? `from $ 10,635` : ''}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/vario-excite-1000.html`,
            },
        },
    },
    [rowers]: {
        heroImage: '//cdn.optimizely.com/img/8355110909/be7dde0a703443b3b1584722fa4bde43.jpg',
        title: 'Rowers',
        subtitle: 'Our range of rowing machines are designed to train both cardio and strength, whilst providing both a technological and performance-centred workout.',
        mainProducts: {
            'Skillrow': {
                subtitle: 'The unique feeling of rowing on water',
                image: '//cdn.optimizely.com/img/8355110909/c039fba8db234a9c83d59136715f3f24.jpg',
                imageV2: '//cdn.optimizely.com/img/8355110909/c039fba8db234a9c83d59136715f3f24.jpg',
                description: 'Cardio and power in one stroke',
                price: `${getLanguage() === 'us' ? `$ 3,080` : `£ 3,490.00`}`,
                itPrice: '',
                link: `https://www.technogym.com/${__('gb')}/skillrow.html`,
                line: 'Skill Line',
                lineLink: `${__('https://www.technogym.com/gb/skill-line-performance-equipment/')}`
            },
        },
    }
}

const getData = () => {
    const pageTitle = document.querySelector('.category-title h1').textContent.trim();
    const pageContent = pageContentObj[pageTitle];

    return pageContent;
}

export default getData;