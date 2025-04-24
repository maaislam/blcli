const urls = {
    old: 'https://www.freddiesflowers.com/',
    new: 'https://www.freddiesflowers.com/',
    excluded: [
        'account',
        'password',
        'register',
        'faq',
        'login',
        'tag',
        'tag-rugby',
        'the-delivery',
        'the-flowers',
        'the-arranging',
        'terms-and-conditions',
        'the-introductions'
    ],
};

export default {
    urls,
    currentURL: window.location.href,
    isNewSite: window.location.href.includes('bumper=true'),
    isOldSite: window.location.href.includes(urls.old),
    isExcludedPage: urls.excluded.some(substring => window.location.href.includes(substring)),
    hasCodeInUrl: window.location.href.indexOf('/c/') > -1
}