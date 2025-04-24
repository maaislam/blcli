import shared from "./shared";

const departments = {
    'Health & pharmacy': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/176D0BA2EC9B564E468F0DEAB5FC0407BDE708CA8F130C63609FFB110D89D131.jpg?meta=/BO082---Homepage-Categories/health.jpg',
        link: 'https://www.boots.com/health-pharmacy'
    },
    'Beauty & skincare': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0C82742B9B07CE23EA35DA778C85920E9B32C3242E9F748DE7FCA4F10489A845.jpg?meta=/BO082---Homepage-Categories/Beauty.jpg',
        link: 'https://www.boots.com/beauty'
    },
    'Fragrance': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/270D99C06A8169467D772C6BA2B4856B5DC505F9B33EEF05FEE993E616E7F567.jpg?meta=/BO082---Homepage-Categories/fragrance.jpg',
        link: 'https://www.boots.com/fragrance'
    },
    'Baby & child': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/45E9DE719A397D90C70BE21052855F5E23FC8880A14B6657D2EA1B10CFE65165.jpg?meta=/BO082---Homepage-Categories/babychild.jpg',
        link: 'https://www.boots.com/baby-child'
    },
    'Toiletries': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8B186AAB6ABB1558DCFEDA98B60F787F0BDDFCFC5D3B1F1B0323D18552904250.jpg?meta=/BO082---Homepage-Categories/toiletries.jpg',
        link: 'https://www.boots.com/toiletries'
    },
    'Electrical': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/6EE9CCBEE48984A01B9D1346EDD890BCAAD3715D80266B30EDC0A0DC349090A9.jpg?meta=/BO082---Homepage-Categories/eletrical.jpg',
        link: 'https://www.boots.com/electrical'
    },
    "Men's": {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3D75C3F3DAB42654A0DC53205FC749743CAA634B3780F60757A7B64A18A421E7.jpg?meta=/BO082---Homepage-Categories/mens.jpg',
        link: 'https://www.boots.com/mens'
    },
    "Photo": {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E57A7FCA3531970065F321DCFBB78BFC93B8FAACF05DC642B1A3D80B728BB3FE.jpg?meta=/BO082---Homepage-Categories/photo.jpg',
        link: 'https://www.boots.com/photo'
    },
    "Opticians": {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FB49018BDF21FD1BE1C7AD11D17CF9F3FD484696D8C96764A4352306D27EA8D4.jpg?meta=/BO082---Homepage-Categories/opticians.jpg',
        link: 'https://www.boots.com/opticians'
    },
    'Sun & holiday': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/6A5D506AF27D3D96343DEF39ADA85F23EEC49958A04AC9676E9839980692076C.jpg?meta=/BO082---Homepage-Categories/sunholiday.jpg',
        link: 'https://www.boots.com/holidays'
    },
    'Gifts': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/67AEB87D96D3EE480044E3AE8A8BD998606E65A977E4BB3D05457D7DE1FC92CD.jpg?meta=/BO082---Homepage-Categories/gift.jpg',
        link: 'https://www.boots.com/gift'
    },
    'Wellness': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/47A9F9B93BC36A7EF4A454622308421D0AEBF79F8582276AF8E9BAB31AB8F8D7.jpg?meta=/BO082---Homepage-Categories/wellness.jpg',
        link: 'https://www.boots.com/wellness'
    }
}

const services = {
    'Appointment booking': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/5437E0331D9ED6F56170CE93E13AA08097FD31E66129CC9EE83DB9AD603AD857.png?meta=/BO082---Homepage-Categories/noun_appointment_3382092.png',
        link: 'https://www.boots.com/appointment-booking',
    },
    'Health & pharmacy': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E8FBB3FA08835FF7C6DE31BB4C93FD57DF3CB381271007A0A97A46AB6E619766.png?meta=/BO082---Homepage-Categories/noun_Health_2929883.png',
        link: 'https://www.boots.com/health-pharmacy-advice',
    },
    'Beauty': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CC090F3D4BA1C7B8D2D532BFC7785FC4A98DBE52676E807FA2CEB5743FF5E380.png?meta=/BO082---Homepage-Categories/noun_beauty_1934831.png',
        link: 'https://www.boots.com/book-a-beauty-appointment',
    },
    'Opticians': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/33E9F28522CB24D9E56D2E9C4CBB5B47E2000952FB5A45BB37F2621E867256E9.png?meta=/BO082---Homepage-Categories/noun_Glasses_2694723.png',
        link: 'https://www.boots.com/opticians-service',
    },
    'Hearing care': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4755BAD8BFFCD938D589B67A48BD91B7800E0ABFB347E37EB505228BB4756256.png?meta=/BO082---Homepage-Categories/noun_earcare_2034487.png',
        link: 'https://www.boots.com/hearingcare',
    },
    'Photo': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D42F95C463534475DDF8CD1EBEFFD071BCF199C1F9ABE80402984F3F1DB7C932.png?meta=/BO082---Homepage-Categories/noun_Camera_2410788.png',
        link: 'https://www.boots.com/photo-service',
    },
    'Boots parenting club': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F7C1F4C6CFD1F79D8BB4E1138EE0D2F3FA2150CEAB0AB4D5BCCFC056224E3CB4.png?meta=/BO082---Homepage-Categories/noun_Baby_3539417.png',
        link: 'https://www.boots.com/parenting-club',
    },
    'Insurance': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/B8B4C47B3B0F10102EB67272C73F98649669B47D17AAA517A63251EAF5E4AF0B.png?meta=/BO082---Homepage-Categories/noun_Travel_2697326.png',
        link: 'https://www.boots.com/insurance',
    },
    'Boots for business': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/C679EECF5EFCCD881F854E4609A123A24E5E0CD7A5648A1F576B129659E51B6C.png?meta=/BO082---Homepage-Categories/noun_Briefcase_1758223.png',
        link: 'https://www.boots.com/boots-for-business',
    },

}

const { ID } = shared;

export const addDepartments = () => {
    Object.keys(departments).forEach((i) => {
        const data = departments[i];
        const department = document.createElement('div');
        department.classList.add(`${ID}-departmentBlock`);
        department.innerHTML = `
        <a href="${data.link}">
            <div class="${ID}-icon" style="background-image:url(${data.icon})"></div><span>${[i][0]}</span>
        </a>`;

        document.querySelector(`.${ID}-departments .${ID}-blocks`).appendChild(department);
    });
}

export const addServices = () => {

    Object.keys(services).forEach((i) => {
        const data = services[i];
        const service = document.createElement('div');
        service.classList.add(`${ID}-serviceBlock`);
        service.innerHTML = `<a href="${data.link}"><span style="background-image:url(${data.icon})"></span><p>${[i][0]}</p></a>`;
    

        document.querySelector(`.${ID}-services .${ID}-links`).appendChild(service);
    });

}