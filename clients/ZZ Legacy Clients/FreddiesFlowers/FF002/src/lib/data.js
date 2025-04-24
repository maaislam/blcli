const classes = {
    half: {
        add: [
            'iconBoxStackMobile'
        ],
        remove: [
            'md:w-1/3',
            'md:mb-3',
            'lg:mb-6'
        ],
    },
    third: {
        remove: [
            'md:w-1/3',
            'md:mb-3',
            'lg:mb-6'
        ],
        add: [
            'md:w-1/3',
        ]
    },
    full: {
        remove: [
            'md:w-1/3',
            'md:mb-3',
            'lg:mb-6'
        ],
        add: [
            'w-full',
        ]
    }
};

export default {
    boxes: [
        {
            eventLabel: 'Refer a friend & save',
            changeBox: true,
            imageSRC: '/img/free-flowers.9ad3aedb.png',
            text: 'Refer a friend & save',
            classes: {
                remove: classes.half.remove,
                add: [...classes.half.add, 'order-1']
            }
        },
        {
            eventLabel: 'Gift flowers & Regular & one-offs',
            imageSRC: 'data:image/png;base64,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',
            text: 'Gift flowers <br>Regular & one-offs',
            classes: {
                remove: classes.half.remove,
                add: [...classes.half.add, 'order-2', 'iconBoxLeadingText']
            }
        },
        {
            imageSRC: '/img/your-boxes.af5498c6.png',
            classes: {
                remove: classes.half.remove,
                add: [...classes.half.add, 'order-4']
            }
        },
        {
            imageSRC: '/img/upcoming-deliveries.252e8cdb.png',
            text: 'Future deliveries',
            classes: {
                remove: classes.half.remove,
                add: [...classes.half.add, 'order-5']
            }
        },
        {
            eventLabel: 'Rate your flowers',
            accountAfter: true,
            replaceIcon: true,
            imageSRC: '/img/rate-my-flowers.6c69993c.png',
            newImageSRC: '/img/rate-my-flowers.00ea9d6b.svg',
            classes: {
                remove: classes.third.remove,
                add: [...classes.third.add, 'order-6']
            }
        },
        {
            eventLabel: 'Flower blog',
            mobileText: 'See our Flower Blog here',
            imageSRC: '/img/blog.5463425a.png',
            classes: {
                remove: [...classes.third.remove, 'w-1/2'],
                add: [...classes.third.add, 'order-9', 'w-full', 'iconBoxCustom']
            }
        },
        {
            imageSRC: '/img/manage-account.287ca97f.png',
            classes: {
                add: ['hidden']
            }
        },
        {
            imageSRC: '/img/address.e30c5185.png',
            classes: {
                add: ['hidden']
            }
        },
    ],
    offerBox: {
        classes: {
            remove: classes.full.remove,
            add: [...classes.full.add, 'order-3']
        }
        
    }
};