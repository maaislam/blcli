import products from './products';

const ladderAndSteps = {
    listingPage: 'https://www.hss.com/hire/c/access/ladders-and-steps',
    products: [
        products.platformSteps,
        {
            productTitle: 'Micro Lite Ladder Stay and Ladder M8 Safety Foot',
            variants: [
                {
                    name: 'Ladder M8 Safety Foot (SKU: 86993)',
                    url: 'https://www.hss.com/hire/p/ladder-m8-safety-foot'
                },
                {
                    name: 'Micro Lite Ladder Stay (SKU: 86995)',
                    url: 'https://www.hss.com/hire/p/micro-lite-ladder-stay'
                },
            ],
        },
        {
            productTitle: 'Push Up Ladders',
            variants: [
                {
                    name: 'Treble Ladder 2.5-6.0M T8 (SKU: 85320)',
                    url: 'https://www.hss.com/hire/p/treble-ladder-2-5-6-0m-t8',
                },
                {
                    name: 'Treble Ladder 3.6-9.1M T12 (SKU: 85330)',
                    url: 'https://www.hss.com/hire/p/treble-ladder-3-5-9-1m-t12',
                },
                {
                    name: 'Double Ladder 3.5-6.2M D12 14 (SKU: 85121)',
                    url: 'https://www.hss.com/hire/p/double-ladder-3-5-6-2m-d12-14',
                }
            ]
        },
        products.roofLadder,
        products.combinationLadder
    ]
};

const electricHeaters = {
    listingPage: 'https://www.hss.com/hire/c/heating/electric-heaters',
    products: [
        {
            productTitle: 'Longwave Heater',
            variants: [
                {
                    name: 'Long Wave Heater 110V (SKU: 56241)',
                    url: 'https://www.hss.com/hire/p/long-wave-heater-110v',
                },
                {
                    name: 'Long Wave Heater 240V (SKU: 56242)',
                    url: 'https://www.hss.com/hire/p/long-wave-heater-240v'
                },
            ],
        },
        {
            productTitle: 'Swivel Infrared Heaters',
            variants: [
                {
                    name: '3kW Swivel Radiant Heater - 240V (SKU: 56272)',
                    url: 'https://www.hss.com/hire/p/3kw-swivel-radiant-heater-240v',
                },
                {
                    name: '3kW Swivel Radiant Heater - 110V (SKU: 56271)',
                    url: 'https://www.hss.com/hire/p/3kw-swivel-radiant-heater-110v'
                },
            ],
        },
        {
            productTitle: 'Commercial Infrared Heaters',
            variants: [
                {
                    name: 'Thermoquartz Heater - 110V (SKU: 56281)',
                    url: 'https://www.hss.com/hire/p/thermoquartz-heater-110v',
                },
                {
                    name: 'Thermoquartz Heater - 240V (SKU: 56282)',
                    url: 'https://www.hss.com/hire/p/thermoquartz-heater-240v'
                },
            ],
        },
        {
            productTitle: 'Hot Block 25 3kW',
            variants: [
                {
                    name: 'Hot Cube 25 3kW (SKU: SE810)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-cube-25-3kw-230v'
                },
                {
                    name: 'Vulcan 3kW (SKU: SE824)',
                    url: 'https://www.hss.com/all-seasons-hire/p/vulcan-3kw'
                },
                {
                    name: 'Hot Block 25 3kW (SKU: SE807)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-block-25-3kw',
                },
            ],
        },
        {
            productTitle: 'Hot Block 65 12kW',
            variants: [
                {
                    name: 'Hot Block 65 12kW (SKU: SE808)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-block-65-12kw',
                },
                {
                    name: 'Hot Cube 65 13kW (SKU: SE837)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-cube-65'
                },
            ],
        },
        {
            productTitle: 'Hot Cube 25 3kW',
            variants: [
                {
                    name: 'Hot Cube 25 3kW (SKU: SE810)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-cube-25-3kw-230v',
                },
                {
                    name: 'Vulcan 3kW (SKU: SE824)',
                    url: 'https://www.hss.com/all-seasons-hire/p/vulcan-3kw'
                },
                {
                    name: 'Hot Block 25 3kW (SKU: SE807)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-block-25-3kw'
                },
            ],
        },
        {
            productTitle: 'Electric Fan Heaters - 3kW',
            variants: [
                {
                    name: 'Vulcan 3kW (SKU: SE824)',
                    url: 'https://www.hss.com/all-seasons-hire/p/vulcan-3kw'
                },
                {
                    name: 'Hot Cube 25 3kW (SKU: SE810)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-cube-25-3kw-230v'
                },
                {
                    name: 'Hot Block 25 3kW (SKU: SE807)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-block-25-3kw'
                },
            ],
        },
        {
            productTitle: 'Vulcan 3kW',
            variants: [
                {
                    name: 'Vulcan 3kW (SKU: SE824)',
                    url: 'https://www.hss.com/all-seasons-hire/p/vulcan-3kw',
                },
                {
                    name: 'Hot Cube 25 3kW (SKU: SE810)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-cube-25-3kw-230v'
                },
                {
                    name: 'Hot Block 25 3kW (SKU: SE807)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-block-25-3kw'
                },
            ],
        },
        {
            productTitle: 'Hot Cube 65 13kW',
            variants: [
                {
                    name: 'Hot Cube 65 13kW (SKU: SE837)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-cube-65',
                },
                {
                    name: 'Hot Block 65 12kW (SKU: SE808)',
                    url: 'https://www.hss.com/all-seasons-hire/p/hot-block-65-12kw'
                },
            ],
        },
    ]
};

const airbreakers = {
    listingPage: 'https://www.hss.com/hire/c/breaking-and-drilling/air-breakers',
    products: [
        {
            productTitle: 'Air Breakers - Anti-Vibration',
            variants: [
                {
                    name: 'Medium Duty Anti-Vibration Air Breaker (SKU: 21117)',
                    url: 'https://www.hss.com/hire/p/breaker-medium-21kg-air',
                },
                {
                    name: 'Heavy Duty Anti-Vibration Air Breaker (SKU: 21127)',
                    url: 'https://www.hss.com/hire/p/hvy-air-breaker-anti-vibration'
                },
            ],
        },
    ]
};

const accessTowersPlatforms = {
    listingPage: 'https://www.hss.com/hire/c/access/access-towers-and-platforms',
    products: [
        products.agrTower,
        products.liftShaftTowers,
        products.alloyTowerNarrow18m,
        products.alloyTowerNarrow25m,
        products.alloyTowerFullWidth14518,
        products.alloyTowerFullWidth14525,
        products.advanceGuardRailTowersNarrow08525,
        products.advanceGuardRailTowersFullWidth14525,
        products.nonConductiveTowersFullWidth14518,
        products.nonConductiveTowersNarrow08518,
        products.nonConductiveTowersNarrow08525,
        products.nonConductiveTowersFullWidth14525,
        products.cantileverSystems,
        {
            productTitle: '1.0m Podium Steps',
            variants: [
                {
                    name: '1.0m Anti-Surf Podium Step (SKU: 80840)',
                    url: 'https://www.hss.com/hire/p/1.0m-anti-surf-podium-step',
                },
                {
                    name: '1.0m Podium Step (SKU: 80871)',
                    url: 'https://www.hss.com/hire/p/1.0m-podium-step',
                },
            ],
        }
    ]
};

const workPlatforms = {
    listingPage: 'https://www.hss.com/hire/c/access/work-platforms',
    products: [
        products.agrTower,
        products.liftShaftTowers,
        products.alloyTowerNarrow18m,
        products.alloyTowerNarrow25m,
        products.alloyTowerFullWidth14518,
        products.alloyTowerFullWidth14525,
        products.advanceGuardRailTowersNarrow08525,
        products.advanceGuardRailTowersFullWidth14525,
        products.nonConductiveTowersFullWidth14518,
        products.nonConductiveTowersNarrow08518,
        products.nonConductiveTowersFullWidth14525,
        products.nonConductiveTowersNarrow08525,
        products.cantileverSystems,
        products.platformSteps,
        products.roofLadder,
        products.combinationLadder,
        {
            productTitle: '1Peco & Eco Manual Platform Lifts',
            variants: [
                {
                    name: 'Peco Manual Access Platform (SKU: 69916)',
                    url: 'https://www.hss.com/hire/p/peco-manual-access-platform',
                },
                {
                    name: 'Eco Manual Platform Lift (SKU: 69917)',
                    url: 'https://www.hss.com/hire/p/eco-manual-platform-lift',
                }
            ]
        },
    ]
};

const treslesStagingSteps = {
    listingPage: 'https://www.hss.com/hire/c/access/trestles-stagings-and-steps',
    products: [
        products.platformSteps,
        products.combinationLadder,
        {
            productTitle: 'GRP Ladders',
            variants: [
                {
                    name: '2.9M Double Glass-Fibre Ladder (SKU: 84509)',
                    url: 'https://www.hss.com/hire/p/2-9m-double-glass-fibre-ladder/',
                },
                {
                    name: '3.5M Double Glass-Fibre Ladder (SKU: 84511)',
                    url: 'https://www.hss.com/hire/p/3-5m-double-glass-fibre-ladder',
                }
            ]
        },
        {
            productTitle: 'Superboard Staging',
            variants: [
                {
                    name: '2.4m Board (SKU: 83230)',
                    url: 'https://www.hss.com/hire/p/2-4m-super-board-staging',
                },
                {
                    name: '3.6m Board (SKU: 83232)',
                    url: 'https://www.hss.com/hire/p/3.6m-board',
                },
                {
                    name: '4.8m Board (SKU: 83236)',
                    url: 'https://www.hss.com/hire/p/4.8m-board'
                },
                {
                    name: '6.0 Board (SKU: 83240)',
                    url: 'https://www.hss.com/hire/p/6.0-board'
                },
                {
                    name: '6.6m Board (SKU: 83242)',
                    url: 'https://www.hss.com/hire/p/6.6m-board--'
                },
            ]
        },
        {
            productTitle: 'GRP Platform Steps',
            variants: [
                {
                    name: 'Fibreglass Steps - 6 Tread (SKU: 84606)',
                    url: 'https://www.hss.com/hire/p/fibreglass-steps-6-tread',
                },
                {
                    name: 'Fibreglass Steps - 8 Tread (SKU: 84608)',
                    url: 'https://www.hss.com/hire/p/fibreglass-steps-8-tread',
                },
                {
                    name: 'Fibreglass Steps - 10 Tread (SKU: 84610)',
                    url: 'https://www.hss.com/hire/p/fibreglass-steps-10-tread'
                },
            ]
        },
        {
            productTitle: 'Adjustable Safety Platform Steps',
            variants: [
                {
                    name: 'Adjustable Platform Step up to 1.52M (SKU: 85970)',
                    url: 'https://www.hss.com/hire/p/adjustable-platform-step-upto-1-52m',
                },
                {
                    name: 'Adjustable Platform Step up to 2.23M (SKU: 85972)',
                    url: 'https://www.hss.com/hire/p/adjustable-platform-step-upto-2-23m',
                },
                {
                    name: 'Fibreglass Steps - 10 Tread (SKU: 84610)',
                    url: 'https://www.hss.com/hire/p/fibreglass-steps-10-tread'
                },
            ]
        },
    ]
};

const productData = [
    ladderAndSteps,
    electricHeaters,
    airbreakers,
    accessTowersPlatforms,
    workPlatforms,
    treslesStagingSteps
];

export default productData;