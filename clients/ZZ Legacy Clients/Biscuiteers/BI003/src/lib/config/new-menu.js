/**
 * New menu structure
 *
 * Identify parent and child menus and the order in which they should appear
 * - Specify title to force show a custom submenu title
 * - Null identiiers used to create cusotm content ('links' or 'content')
 */
const newMenu = {
    'christmas': [
        'christmasbiscuits',
        'christmasgifts',
        'giftsbyrecipient',
        'shopbycollection'
    ],
    'biscuits': [
        'biscuitsbyoccasion',
        'christmasbiscuits',
        'biscuitsbytype',
        'biscuitcollections',
        {
            identifier: 'makeyourownbiscuits',
            title: 'make your own'
        },
        {
            identifier: null,
            title: 'personalised biscuits',
            links: [
                {
                    title: 'personalised biscuits',
                    link: '/biscuits/personalised-biscuits'
                }
            ]
        }
    ],
    'sendagift': [
        'giftsbyoccasion',
        'giftsbyrecipient',
        'giftsbypersonality',
        'charity'
    ],
    'chocolates': [
        'chocolatesbytype',
        'chocolatesbyoccasion'
    ],
    'cakes': [
        'cakes'
    ],
    'personalised': [
        {
            identifier: 'personalisedgiftsbytype',
            title: 'gifts by type'
        }
    ],
    'corporate': {
        title: 'corporate and bespoke',
        items: [
            'corporate',
            'bespokeorders',
            'weddings'
        ]
    },
    'ouricingcafes': [
        'locations',
        'icingclasses',
        'hostaparty'
    ],
    'blog': [
        'blog'
    ]
};

export default newMenu;
