import { events } from "../../../../../lib/utils";
import { getSiteFromHostname } from "./services";
import shared from "./shared";

const { ID, VARIATION } = shared;

/**
 * All category data
 */
const genderSteps = {
    title: "Who is it for?",
    urlPrefix: 'recipient',
    options: {
        'for him': {
            url: '%7Chim',
            image: 'https://i1.adis.ws/i/ernestjones/1342x1050%20Watches%20lifestyle?w=588&fmt.jpeg.interlaced=true',
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/815B3E3FD7E03E87C732EB662C3724AD16BB725300BEBC83897EF9ABBF774E5B.jpeg?meta=/SG096---Homepage-Gift-Finder/HS20WC11_Christmas_Page_768x896_18.jpeg',
        },
        'for her': {
            url: '%7Cher',
            image: 'https://i1.adis.ws/i/ernestjones/1342x1050%20Earrings?w=588&fmt.jpeg.interlaced=true',
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/8F1A15F4B6CA5DF765BD14A072F2E3EAFCA60329BFD26D477AF92C8E66DFDAA6.jpg?meta=/SG096---Homepage-Gift-Finder/hsamuelforher.jpg',
        }
    }
};

const productStepsFemale = {
    title: "What product are you looking for?",
    urlPrefix: 'category',
    options: {
        'watches': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5E0B4A3EB8B7A857D230C773531D9F38982B9FC5E4044BED571F7DE000FBB513.png?meta=/SG096---Homepage-Gift-Finder/watch.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5E0B4A3EB8B7A857D230C773531D9F38982B9FC5E4044BED571F7DE000FBB513.png?meta=/SG096---Homepage-Gift-Finder/watch.png',
            url: '%7Cwatches',
        },
        'smart watches': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9F33A4785B0C288F67257DF47ABF35819D8401DCE3E3F734FB0B471C04821A83.png?meta=/SG096---Homepage-Gift-Finder/smart_watch.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9F33A4785B0C288F67257DF47ABF35819D8401DCE3E3F734FB0B471C04821A83.png?meta=/SG096---Homepage-Gift-Finder/smart_watch.png',
            url: '%7Csmart+watches',
        },
        'jewellery sets': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/E892C9D5539445F0792CAF4E8461CA073D9224385BE9B126DDAAB1FA816D25E9.png?meta=/SG096---Homepage-Gift-Finder/jewellery.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/E892C9D5539445F0792CAF4E8461CA073D9224385BE9B126DDAAB1FA816D25E9.png?meta=/SG096---Homepage-Gift-Finder/jewellery.png',
            url: '%7Cjewellery+sets',
        },
        'rings': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/FDD6360C36387906C850A8F7E1269A514CEF738E644E088C42FB7346048D32D3.png?meta=/SG096---Homepage-Gift-Finder/ring.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/FDD6360C36387906C850A8F7E1269A514CEF738E644E088C42FB7346048D32D3.png?meta=/SG096---Homepage-Gift-Finder/ring.png',
            url: '%7Crings',
        },
        'earrings': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B3120668CBD4BEBD00DE475A2F92E07B88C4C07E6FF9E58CCC45CD7782EEED6B.png?meta=/SG096---Homepage-Gift-Finder/jewelry_earrings.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B3120668CBD4BEBD00DE475A2F92E07B88C4C07E6FF9E58CCC45CD7782EEED6B.png?meta=/SG096---Homepage-Gift-Finder/jewelry_earrings.png',
            url: '%7Cearrings',
        },
        'necklaces': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/ED77A207231BA5736E666BEA773EE5545A5AF181D41B7F3462EAAB4592487463.png?meta=/SG096---Homepage-Gift-Finder/necklace.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/ED77A207231BA5736E666BEA773EE5545A5AF181D41B7F3462EAAB4592487463.png?meta=/SG096---Homepage-Gift-Finder/necklace.png',
            url: '%7Cnecklaces',
        },
        'bracelets': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5F255AA28A8FB01DBE45B12FC514D6C4470BFB4CAA7643D193F801600F1C8E10.png?meta=/SG096---Homepage-Gift-Finder/bracelet.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5F255AA28A8FB01DBE45B12FC514D6C4470BFB4CAA7643D193F801600F1C8E10.png?meta=/SG096---Homepage-Gift-Finder/bracelet.png',
            url: '%7Cbracelets',
        },
        'beads & charms': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/DCFF7722347113ABDC9EEA87C5588757ED44292329A8E49671A1BFA4D8885FE9.png?meta=/SG096---Homepage-Gift-Finder/charm.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/DCFF7722347113ABDC9EEA87C5588757ED44292329A8E49671A1BFA4D8885FE9.png?meta=/SG096---Homepage-Gift-Finder/charm.png',
            url: '%7Cbeads+&+charms',
        },
        'engagement rings': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B1EF645AB35DFC39CBE99F272534E2F1A76A62E1822E8435DF2FC0B5E4A0B92F.png?meta=/SG096---Homepage-Gift-Finder/rings.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B1EF645AB35DFC39CBE99F272534E2F1A76A62E1822E8435DF2FC0B5E4A0B92F.png?meta=/SG096---Homepage-Gift-Finder/rings.png',
            url: '%7Crings/occasion%7Cengagement',
        },
        'eternity rings': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/6F33AA2B006255201181440A40A1FB783FFFD8B990928A4653DAFFA5F74915C5.png?meta=/SG096---Homepage-Gift-Finder/ring_eternity.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/6F33AA2B006255201181440A40A1FB783FFFD8B990928A4653DAFFA5F74915C5.png?meta=/SG096---Homepage-Gift-Finder/ring_eternity.png',
            url: '%7Crings/style%7Ceternity',
        },
        'pens': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B07947D68BF00CDCF709E72ABACB5AF080BD9D69A09565EC549E1A8DC707AFFC.png?meta=/SG096---Homepage-Gift-Finder/pen_2.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B07947D68BF00CDCF709E72ABACB5AF080BD9D69A09565EC549E1A8DC707AFFC.png?meta=/SG096---Homepage-Gift-Finder/pen_2.png',
            url: 'c%7Cpens',
        },
    }
}

const productStepsMale = {
    title: "What product are you looking for?",
    urlPrefix: 'category',
    options: {
        'watches': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5E0B4A3EB8B7A857D230C773531D9F38982B9FC5E4044BED571F7DE000FBB513.png?meta=/SG096---Homepage-Gift-Finder/watch.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5E0B4A3EB8B7A857D230C773531D9F38982B9FC5E4044BED571F7DE000FBB513.png?meta=/SG096---Homepage-Gift-Finder/watch.png',
            url: '%7Cwatches',
        },
        'smart watches': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9F33A4785B0C288F67257DF47ABF35819D8401DCE3E3F734FB0B471C04821A83.png?meta=/SG096---Homepage-Gift-Finder/smart_watch.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9F33A4785B0C288F67257DF47ABF35819D8401DCE3E3F734FB0B471C04821A83.png?meta=/SG096---Homepage-Gift-Finder/smart_watch.png',
            url: '%7Csmart+watches',
        },
        'rings': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/FDD6360C36387906C850A8F7E1269A514CEF738E644E088C42FB7346048D32D3.png?meta=/SG096---Homepage-Gift-Finder/ring.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/FDD6360C36387906C850A8F7E1269A514CEF738E644E088C42FB7346048D32D3.png?meta=/SG096---Homepage-Gift-Finder/ring.png',
            url: '%7Crings',
        },
        'necklaces': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/ED77A207231BA5736E666BEA773EE5545A5AF181D41B7F3462EAAB4592487463.png?meta=/SG096---Homepage-Gift-Finder/necklace.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/ED77A207231BA5736E666BEA773EE5545A5AF181D41B7F3462EAAB4592487463.png?meta=/SG096---Homepage-Gift-Finder/necklace.png',
            url: '%7Cnecklaces',
        },
        'bracelets': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5F255AA28A8FB01DBE45B12FC514D6C4470BFB4CAA7643D193F801600F1C8E10.png?meta=/SG096---Homepage-Gift-Finder/bracelet.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5F255AA28A8FB01DBE45B12FC514D6C4470BFB4CAA7643D193F801600F1C8E10.png?meta=/SG096---Homepage-Gift-Finder/bracelet.png',
            url: '%7Cbracelets',
        },
        'cufflinks': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/C83BD3314405C3F485EA57C1720868981A275F6218E5BDF2F9D9901C05EB2E50.png?meta=/SG096---Homepage-Gift-Finder/cufflinks.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/C83BD3314405C3F485EA57C1720868981A275F6218E5BDF2F9D9901C05EB2E50.png?meta=/SG096---Homepage-Gift-Finder/cufflinks.png',
            url: '%7Ccufflinks',
        },
        'wallets': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/84BA8082AC5842019AE6CD0F5B892C7D7180CEE5168311B357A6CB2DDBAD6059.png?meta=/SG096---Homepage-Gift-Finder/wallet.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/84BA8082AC5842019AE6CD0F5B892C7D7180CEE5168311B357A6CB2DDBAD6059.png?meta=/SG096---Homepage-Gift-Finder/wallet.png',
            url: '%7Cwallets',
        },
        'pens': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B07947D68BF00CDCF709E72ABACB5AF080BD9D69A09565EC549E1A8DC707AFFC.png?meta=/SG096---Homepage-Gift-Finder/pen_2.png',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B07947D68BF00CDCF709E72ABACB5AF080BD9D69A09565EC549E1A8DC707AFFC.png?meta=/SG096---Homepage-Gift-Finder/pen_2.png',
            url: '%7Cpens',
        },
    }
}

const SmartWatchStyle = {
    title: 'Choose a Strap Style',
    isMultiple: true,
    urlPrefix: 'strap+style',
    options: {
        'bracelet': {
            hsimage: 'https://d34qiagx43sg99.cloudfront.net/8600384-alt1-1490.jpg',
            image: 'https://d34qiagx43sg99.cloudfront.net/4903382-alt1-1490.jpg',
            url: '%7Cbracelet',
        },
        'buckle': {
            hsimage: 'https://d34qiagx43sg99.cloudfront.net/5867681-alt3-1490.jpg',
            image: 'https://d34qiagx43sg99.cloudfront.net/4920783-alt2-1490.jpg',
            url: '%7Cbuckle',
        },
        'strap': {
            hsimage: 'https://d34qiagx43sg99.cloudfront.net/5867495-alt2-1490.jpg',
            image: 'https://d34qiagx43sg99.cloudfront.net/1061003-alt3-1490.jpg',
            url: '%7Cstrap',
        },
    }
}

const strapStyle = {
    title: 'Choose a Strap Material',
    isMultiple: true,
    urlPrefix: 'strap+material',
    options: {
        'metal': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9A5BE918481637BF3ABA6124C16340EE88066BC18AF3666816527612E8321E75.jpg?meta=/SG096---Homepage-Gift-Finder/metal.jpg',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9A5BE918481637BF3ABA6124C16340EE88066BC18AF3666816527612E8321E75.jpg?meta=/SG096---Homepage-Gift-Finder/metal.jpg',
            url: '%7C18ct+rose+gold%7C18ct+yellow+gold%7Cgold+plate+&+ceramic%7Cgold+plated%7Cgold+tone%7Cion+plated%7Crose+gold+plated%7Crose+gold+tone%7Cstainless+steel%7Cstainless+steel+&+18ct+rose+gold%7Cstainless+steel+&+18ct+yellow+gold%7Cstainless+steel+&+ceramic%7Cstainless+steel+&+rose+gold+colour+pvd%7Cstainless+steel+&+rose+gold+plate%7Cstainless+steel+&+yellow+gold+colour+pvd%7Cstainless+steel+&+yellow+gold+plate%7Ctitanium%7Ctri+tone%7Ctwo+colour',
        },
        'leather': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            url: '%7Cleather',
        },
    }
}

const metalType = {
    title: "Choose a Metal Type",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'All': {
            url: '%7C',
        },
        'Yellow Gold': {
            url: '%7Cyellow+gold',
        },
        'Rose Gold': {
            url: '%7Crose+gold',
        },
        'White Gold': {
            url: '%7Cwhite+gold',
        },
        'Platinum': {
            url: '%7Cplatinum',
        },
        'Silver': {
            url: '%7Call+silver',
        },
        'Two Tone Gold': {
            url: '%7Ctwo+colour+gold',
        },
        'Palladium': {
            url: '%7Cpalladium',
        },
        'Titanium': {
            url: '%7Ctitanium',
        },
        'Stainless Steel': {
            url: '%7Cstainless+steel',
        },
    }
}

const metalTypeEngagementAndEarrings = {
    title: "Choose a Metal Type",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'All Metals': {
            url: '%7C',
        },
        'Yellow Gold': {
            url: '%7Cyellow+gold',
        },
        'Rose Gold': {
            url: '%7Crose+gold',
        },
        'White Gold': {
            url: '%7Cwhite+gold',
        },
        'Platinum': {
            url: '%7Cplatinum',
        },
        'Silver': {
            url: '%7Call+silver',
        },
        'Two Tone Gold': {
            url: '%7Ctwo+colour+gold',
        },   
    }
}

const metalTypeEternity = {
    title: "Choose a Metal Type",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'All Metals': {
            url: '%7C',
        },
        'Yellow Gold': {
            url: '%7Cyellow+gold',
        },
        'Rose Gold': {
            url: '%7Crose+gold',
        },
        'White Gold': {
           url: '%7Cwhite+gold',
        },
        'Platinum': {
           url: '%7Cplatinum',
        },
        'Silver': {
            url: '%7Call+silver',
        },
    }
}

const necklaceMetal = {
    title: "Choose a Metal Type",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'All Metals': {
            url: '%7C',
        },
        'Yellow Gold': {
            hsimage: '',
            image: '',
            url: '%7Cyellow+gold',
        },
        'Rose Gold': {
            hsimage: '',
            image: '',
            url: '%7Crose+gold',
        },
        'White Gold': {
            hsimage: '',
            image: '',
            url: '%7Cwhite+gold',
        },
        'Platinum': {
            hsimage: '',
                image: '',
            url: '%7Cplatinum',
        },
        'Silver': {
            hsimage: '',
            image: '',
            url: '%7Call+silver',
        },
        'Two Tone Gold': {
            hsimage: '',
            image: '',
            url: '%7Ctwo+colour+gold',
        },
        'Stainless Steel': {
            hsimage: '',
                image: '',
            url: '%7Cstainless+steel',
        },
        'Rhodium Plated': {
            hsimage: '',
            image: '',
            url: '%7Crhodium+plated',
        },
    }
}

const braceletMetal = {
    title: "Choose a Metal Type",
    isMultiple: true,
    urlPrefix: 'material',
    options: {
        'metal': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9A5BE918481637BF3ABA6124C16340EE88066BC18AF3666816527612E8321E75.jpg?meta=/SG096---Homepage-Gift-Finder/metal.jpg',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9A5BE918481637BF3ABA6124C16340EE88066BC18AF3666816527612E8321E75.jpg?meta=/SG096---Homepage-Gift-Finder/metal.jpg',
            url: '%7C18ct+rose+gold%7C18ct+yellow+gold%7Cgold+plate+&+ceramic%7Cgold+plated%7Cgold+tone%7Cion+plated%7Crose+gold+plated%7Crose+gold+tone%7Cstainless+steel%7Cstainless+steel+&+18ct+rose+gold%7Cstainless+steel+&+18ct+yellow+gold%7Cstainless+steel+&+ceramic%7Cstainless+steel+&+rose+gold+colour+pvd%7Cstainless+steel+&+rose+gold+plate%7Cstainless+steel+&+yellow+gold+colour+pvd%7Cstainless+steel+&+yellow+gold+plate%7Ctitanium%7Ctri+tone%7Ctwo+colour',
        },
        'leather': {
            hsimage: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/69573E6C4242DA4160AC028781044A82FD46C5F15661A3EB4E8F9A9ACAC83BE7.jpg?meta=/SG096---Homepage-Gift-Finder/leather.jpg',
            url: '%7Cleather',
        },
    }
}

const priceBand1 = {
    title: "What is your price range?",
    urlPrefix: '?Nf=P_Current_Price%7CBTWN+',
    options: {
        'all prices': {
            url: '0+9999',
        },
        'under £100': {
            url: '0+100',
        },
        '£100-£250': {
            url: '100+250',
        },
        '£250-£500': {
            url: '250+500',
        },
        '£500-£1000': {
            url: '500+1000',
        },
        '£1000+': {
            url: '1000+9999',
        }
    }
}
const priceBand2 = {
    title: "What is your price range?",
    urlPrefix: '?Nf=P_Current_Price%7CBTWN+',
    options: {
        'all prices': {
            url: '0+9999',
        },
        'under £50': {
            url: '0+50',
        },
        '£50-£100': {
            url: '50+100',
        },
        '£250-£500': {
            url: '250+500',
        },
        '£100-£250': {
            url: '100+250',
        },
        '£250-£500': {
            url: '250+500',
        },
        '£500+': {
            url: '500+9999',
        }
    }
    
};

const priceBand3 = {
    title: "What is your price range?",
    urlPrefix: '?Nf=P_Current_Price%7CBTWN+',
    options: {
        'all prices': {
            url: '0+9999',
        },
        'under £50': {
            url: '0+50',
        },
        '£50-£100': {
            url: '50+100',
        },
        '£100+': {
            url: '100+9999',
        }
    }
}

const priceBand4 = {
    title: "What is your price range?",
    urlPrefix: '?Nf=P_Current_Price%7CBTWN+',
    options: {
        'all prices': {
            url: '0+9999',
        },
        'under £50': {
            url: '0+50',
        },
        '£50-£100': {
            url: '50+100',
        },
        '£100-£250': {
            url: '100+250',
        },
        '£250+': {
            url: '250+9999',
        }
    }
}
const priceBand5 = {
    title: "What is your price range?",
    urlPrefix: '?Nf=P_Current_Price%7CBTWN+',
    options: {
        'all prices': {
            url: '0+9999',
        },
        'under £50': {
            url: '0+50',
        },
        '£50+': {
            url: '50+9999',
        },
    }
}


const paths = {
    'for him/watches': {
        step3: strapStyle,
        step4: priceBand1
    },
    'for him/smart watches': {
        step3: SmartWatchStyle,
        step4: priceBand1
    },
    'for him/rings': {
        step3: metalType,
        step4: priceBand1
    },
    'for him/necklaces': {
        step3: necklaceMetal,
        step4: priceBand1
    },
    'for him/bracelets': {
        step3: braceletMetal,
        step4: priceBand2
    },
    'for him/cufflinks': {
        step4: priceBand3
    },
    'for him/wallets': {
        step4: priceBand3
    },
    'for him/pens': {
        step4: priceBand4
    },
    'for her/watches': {
        step3: strapStyle,
        step4: priceBand1
    },
    'for her/smart watches': {
        step3: SmartWatchStyle,
        step4: priceBand1
    },
    'for her/jewellery sets': {
        step4: priceBand3
    },
    'for her/rings': {
        step3: metalType,
        step4: priceBand1
    },
    'for her/earrings': {
        step3: metalTypeEngagementAndEarrings,
        step4: priceBand1
    },
    'for her/necklaces': {
        step3: necklaceMetal,
        step4: priceBand1
    },
    'for her/bracelets': {
        step4: priceBand1
    },
    'for her/beads & charms': {
        step4: priceBand5
    },
    'for her/engagement rings': {
        step3: metalTypeEngagementAndEarrings,
        step4: priceBand1
    },
    'for her/eternity rings': {
        step3: metalTypeEternity,
        step4: priceBand1
    },
    'for her/pens': {
        step4: priceBand4
    },
};

// HS paths as some are different
const HSpaths = {
    'for him/watches': {
        step3: strapStyle,
        step4: priceBand2
    },
    'for him/smart watches': {
        step3: SmartWatchStyle,
        step4: priceBand2
    },
    'for him/rings': {
        step3: metalType,
        step4: priceBand1
    },
    'for him/necklaces': {
        step3: necklaceMetal,
        step4: priceBand2
    },
    'for him/bracelets': {
        step3: braceletMetal,
        step4: priceBand3
    },
    'for him/cufflinks': {
        step4: priceBand5
    },
    'for him/wallets': {
        step4: priceBand3
    },
    'for him/pens': {
        step4: priceBand5
    },
    'for her/watches': {
        step3: strapStyle,
        step4: priceBand2
    },
    'for her/smart watches': {
        step3: SmartWatchStyle,
        step4: priceBand2
    },
    'for her/jewellery sets': {
        step4: priceBand3
    },
    'for her/rings': {
        step3: metalType,
        step4: priceBand2
    },
    'for her/earrings': {
        step3: metalTypeEngagementAndEarrings,
        step4: priceBand1
    },
    'for her/necklaces': {
        step3: necklaceMetal,
        step4: priceBand2
    },
    'for her/bracelets': {
        step4: priceBand2
    },
    'for her/beads & charms': {
        step4: priceBand5
    },
    'for her/engagement rings': {
        step3: metalTypeEngagementAndEarrings,
        step4: priceBand1
    },
    'for her/eternity rings': {
        step3: metalTypeEternity,
        step4: priceBand1
    },
    'for her/pens': {
        step4: priceBand5
    },
};

/**
 * Finder logic - don't change this
 */

const activeOptions = () => {

    /* If multiple choice question */
    if(document.querySelector(`.${ID}-innerOptions`).classList.contains(`${ID}-multipleChoice`)) {
        const answerOption = document.querySelectorAll(`.${ID}-innerOptions .${ID}-answer`);

        [].forEach.call(answerOption, (answerEl) => {
            answerEl.addEventListener('click', () => {
            
                // don't select more than 3
                if(document.querySelectorAll(`.${ID}-question--active .${ID}-answer--selected`).length === 3) {
                    if(answerEl.classList.contains(`${ID}-answer--selected`)) {
                        answerEl.classList.remove(`${ID}-answer--selected`);
                    }
                } else {
                    if(answerEl.classList.contains(`${ID}-answer--selected`)) {
                        answerEl.classList.remove(`${ID}-answer--selected`);
                    } else {
                        answerEl.classList.add(`${ID}-answer--selected`);

                    }
                }
                
            });
        });
    } else {
        const answerOption = document.querySelectorAll(`.${ID}-innerOptions .${ID}-answer`);
        const nextButton = document.querySelector(`.${ID}-finderBox .${ID}-next`);

        [].forEach.call(answerOption, (answerEl) => {
            answerEl.addEventListener('click', (e) => {

               
                if(e.currentTarget.classList.contains(`${ID}-answer--selected`)) {
                    e.currentTarget.classList.remove(`${ID}-answer--selected`);
        
                // add active, remove any other actives
                } else if(!e.currentTarget.classList.contains(`${ID}-answer--selected`)) {
        
                    for (let index = 0; index < answerOption.length; index += 1) {
                    const element = answerOption[index];
                    element.classList.remove(`${ID}-answer--selected`);
                }
                e.currentTarget.classList.add(`${ID}-answer--selected`);
                nextButton.click();
                  // --- Remove ERROR MESSAGE if option has been selected
                  if (document.querySelector(`p.SG096-error.SG096-errorShow`)) {
                    document.querySelector(`p.SG096-error.SG096-errorShow`).classList.remove(`SG096-errorShow`);
                  }
                }
            });
        });
    }
}


let q1AnswerURL = [];
let q2AnswerURL = [];
let q3AnswerURL  = [];
let q4AnswerURL  = [];
let q1Answer = [];
let q2Answer = [];
let q3Answer  = [];
let q4Answer  = [];


const buildUrl = () => {
  let q3Prefix = '';

  // determine prefix for q3
  if(q2AnswerURL[0].indexOf('%7Cwatches') > -1) {
    q3Prefix = 'strap+material'
  } else if(q2AnswerURL[0].indexOf('%7Csmart+watches') > -1) {
    q3Prefix = 'strap+style'
  }else {
    q3Prefix = 'material'
  }

  return '/webstore/l/search/' + 
    (q1AnswerURL[0] || '')
    + '/' + 
    (q2AnswerURL[0] || '')
    + '/' +
    (q3Prefix + (q3AnswerURL.join('')) || '')
    + '/' + 
    (q4AnswerURL[0] || '') + '&finder=1'
  ;
};


// url is loaded in target step 5

const loadQuestion = (targetStep) => {

    let path;

    if(getSiteFromHostname() === 'ernestjones') {
        path = paths;
    } else if(getSiteFromHostname() === 'hsamuel') {
        path = HSpaths;
    } 

    const questionContainer = document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`);
    const stepTitle = document.querySelector(`.${ID}-finderOptions .${ID}-optionsTitle`);
    const nextButton = document.querySelector(`.${ID}-finderBox .${ID}-next`);
    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);

    nextButton.style.display = 'none';
    nextButton.parentNode.classList.remove(`${ID}-nextShow`);

    if(targetStep == 1) {
        document.querySelector(`.${ID}-options.${ID}-question`).setAttribute('step-no', '1');
        questionContainer.innerHTML = '';
        questionContainer.classList.remove(`${ID}-multipleChoice`);
        questionContainer.classList.remove(`${ID}-centered`);

        q1Answer = [];
        q2Answer = [];
        q3Answer = [];
        q4Answer = [];
        q1AnswerURL = [];
        q2AnswerURL = [];
        q3AnswerURL = [];
        q4AnswerURL = [];

        // rebuild the gender step
        const stepTitle = document.querySelector(`.${ID}-optionsTitle`);
        stepTitle.textContent = genderSteps.title;

        nextButton.textContent = 'Next';

        // build the gender options
        Object.keys(genderSteps.options).forEach((i) => {
            const genderData = genderSteps.options[i];
            const genderOption = document.createElement('div');
            genderOption.classList.add(`${ID}-answer`);
            genderOption.setAttribute('data-result', [i][0]);
            genderOption.setAttribute('data-resultUrl', genderSteps.urlPrefix + genderData.url);
            if(getSiteFromHostname() === 'hsamuel') {
                genderOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${genderData.hsimage})"></div><span>${[i][0]}</span>`;
            } else {
                genderOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${genderData.image})"></div><span>${[i][0]}</span>`;
            }
            document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).appendChild(genderOption);
        });

        nextButton.setAttribute('data-step', 1);

        // hide back button
        backButton.classList.add(`${ID}-backHide`);

    }

    if(targetStep == 2) {
        document.querySelector(`.${ID}-options.${ID}-question`).setAttribute('step-no', '2');
        q2Answer = [];
        q3Answer = [];
        q4Answer = [];
        q2AnswerURL = [];
        q3AnswerURL = [];
        q4AnswerURL = [];

        // clear the inner content
        questionContainer.innerHTML = '';
        questionContainer.classList.remove(`${ID}-multipleChoice`);
        questionContainer.classList.remove(`${ID}-centered`);

        let optionsToShow;

        // render the options based on the gender clicked
        if(q1Answer[0] === 'for him') {
            optionsToShow = productStepsMale;
        } else if(q1Answer[0] === 'for her') {
            optionsToShow = productStepsFemale;
        }

        stepTitle.textContent = optionsToShow.title;
        nextButton.textContent = 'Next';

        // show back button
        backButton.classList.remove(`${ID}-backHide`);

        // add the options for the product type
        Object.keys(optionsToShow.options).forEach((i) => {
            const productData = optionsToShow.options[i];
            const productOption = document.createElement('div');
            productOption.classList.add(`${ID}-answer`);
            productOption.setAttribute('data-result', [i][0]);
            productOption.setAttribute('data-resultUrl', optionsToShow.urlPrefix + productData.url);
            if(getSiteFromHostname() === 'hsamuel') {
                productOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${productData.hsimage})"></div><span>${[i][0]}</span>`;
            } else {
                productOption.innerHTML = `<div class="${ID}-answerImage" style="background-image:url(${productData.image})"></div><span>${[i][0]}</span>`;
            }
            document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).appendChild(productOption);
        });

        // add the next/back step target to the buttons
        nextButton.setAttribute('data-step', 2);
        backButton.setAttribute('data-step', 1);
        
    }

    if(targetStep == 3) {
        
        //nextButton.style.display = 'flex';
        //nextButton.parentNode.classList.add(`${ID}-nextShow`);
        
        document.querySelector(`.${ID}-options.${ID}-question`).setAttribute('step-no', '3');
        q3Answer = [];
        q4Answer = [];
        q3AnswerURL = [];
        q4AnswerURL = [];
        // if there isn't a step 3 go to step 4
        let choices;
        const step3Choices = path[q1Answer[0] + '/' + q2Answer[0]].step3;

        if(!step3Choices) {
            nextButton.setAttribute('data-step', 4);
            backButton.setAttribute('data-step', 2);
            loadQuestion(4);
            return;
        } else {
            choices = path[q1Answer + '/' + q2Answer].step3;
            nextButton.setAttribute('data-step', 3);
            backButton.setAttribute('data-step', 2);
            
        }

        questionContainer.innerHTML = '';

        stepTitle.textContent = choices.title;
        nextButton.textContent = 'Next';

         // allow multiple choices
         //questionContainer.classList.add(`${ID}-multipleChoice`);
          
         console.log(Object.keys(choices.options).length)
         if(Object.keys(choices.options).length >= 2) {
             questionContainer.classList.add(`${ID}-centered`);
         } else {
             questionContainer.classList.remove(`${ID}-centered`);
         }
         
        
        Object.keys(choices.options).forEach((j) => {

            const specificationData = choices.options[j];
            const specificationOption = document.createElement('div');
            specificationOption.classList.add(`${ID}-answer`);
            specificationOption.setAttribute('data-result', [j][0]);
            specificationOption.setAttribute('data-resultUrl', specificationData.url);
            
                if(getSiteFromHostname() === 'hsamuel') {
                    specificationOption.innerHTML = `<div class="${ID}-answerImage" ${specificationData.image ? `style="background-image:url(${specificationData.hsimage})` : ''}"></div><span>${[j][0]}</span>`;
                } else {
                    specificationOption.innerHTML = `<div class="${ID}-answerImage" ${specificationData.image ? `style="background-image:url(${specificationData.image})` : ''}"></div><span>${[j][0]}</span>`;
                }
            
            document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).appendChild(specificationOption);
        });
    }

    /*  Product Specs */
    if(targetStep == 4) {
        q4Answer = [];
        q4AnswerURL = [];
   
        questionContainer.innerHTML = '';
        questionContainer.classList.remove(`${ID}-multipleChoice`);
        questionContainer.classList.remove(`${ID}-centered`);

        document.querySelector(`.${ID}-options.${ID}-question`).setAttribute('step-no', '4');

    
        const step4Choices = path[q1Answer[0] + '/' + q2Answer[0]].step4;

        stepTitle.textContent = step4Choices.title;

        Object.keys(step4Choices.options).forEach((x) => {
            const priceData = step4Choices.options[x];
            const priceOption = document.createElement('div');
            priceOption.classList.add(`${ID}-answer`);
            priceOption.setAttribute('data-result', [x][0]);
            priceOption.setAttribute('data-resultUrl', step4Choices.urlPrefix + priceData.url);
            priceOption.innerHTML = `<span>${[x][0]}</span>`;
            document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).appendChild(priceOption);
        });


        // if choices go back to products, else go to specs
        const step3Choices = path[q1Answer[0] + '/' + q2Answer[0]].step3;
        if(!step3Choices) {
            nextButton.setAttribute('data-step', 4);
            backButton.setAttribute('data-step', 2);
        } else {
            nextButton.setAttribute('data-step', 4);
            backButton.setAttribute('data-step', 3);
        }
        nextButton.textContent = 'Find gifts';

    }

    if(targetStep == 5) {
        const loader = document.querySelector(`.${ID}-loader`);
        loader.classList.add(`${ID}-loaderShow`);

        events.send(`${ID} variation:${VARIATION}`, 'click', `journey: ${q1Answer}, ${q2Answer}, ${q3Answer !== '' ? q3Answer : 'no spec'}, ${q4Answer}`);

        // build the URL and go to the result page
        setTimeout(() => {
            const targetURL = buildUrl();
            window.location.href = targetURL;
        }, 2000);
    }
};

const didClickBack = () => {
    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);
    const currentStep = backButton.getAttribute('data-step');
    const backStep = parseInt(currentStep, 10);// - 1;

    document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`).scrollTop = 0;

    loadQuestion(backStep);
    // remove error message when going 'BACK'
    const errorMessage = document.querySelector(`.${ID}-error`);
    errorMessage.classList.remove(`${ID}-errorShow`);
};

/* Loop through all answers, determines what to do once answers selected based on step */
const didClickNext = () => {
    const questionContainer = document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`);
    const errorMessage = document.querySelector(`.${ID}-error`);
    const nextButton = document.querySelector(`.${ID}-finderBox .${ID}-next`);
    const currentStep = nextButton.getAttribute('data-step');

    questionContainer.scrollTop = 0;

    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);

    const chosenAnswers = questionContainer.querySelectorAll(`.${ID}-answer--selected`);
   
    if(chosenAnswers.length === 0) {
        errorMessage.classList.add(`${ID}-errorShow`);
        // rerun active options
        activeOptions();

    } else {
        errorMessage.classList.remove(`${ID}-errorShow`);

        [].forEach.call(chosenAnswers, (question) => {
        const answer = question.getAttribute('data-result');
        const answerUrl = question.getAttribute('data-resultUrl');
            /*  Gender step */
            if(currentStep == 1) {
                q1AnswerURL.push(answerUrl);
                q1Answer.push(answer);
            } 
            if(currentStep == 2) {
                q2AnswerURL.push(answerUrl);
                q2Answer.push(answer);

            }
            if(currentStep == 3) {
                q3AnswerURL.push(answerUrl);
                q3Answer.push(answer);
            }
            if(currentStep == 4) {
                q4AnswerURL.push(answerUrl);
                q4Answer.push(answer);


            }
            if(currentStep == 3) {
                nextButton.textContent = 'Find gifts';
            } else {
                nextButton.textContent = 'Next';
            }
        });

        const nextStep = parseInt(currentStep, 10) + 1;
        loadQuestion(nextStep);
    }

}

// to be triggered on close of the finder
const resetFinder = () => {
    q1Answer = [];
    q2Answer = [];
    q3Answer = [];
    q4Answer = [];
    q1AnswerURL = [];
    q2AnswerURL = [];
    q3AnswerURL = [];
    q4AnswerURL = [];
    
    const questionContainer = document.querySelector(`.${ID}-finderOptions .${ID}-innerOptions`);
    questionContainer.innerHTML = '';
    
    const errorMsg = document.querySelector(`.${ID}-error`);
    // hide back button for first question
    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);
    backButton.classList.add(`${ID}-backHide`);

    errorMsg.classList.remove(`${ID}-errorShow`);
}

const finderFunctionality = () => {
    /**
     * Trigger gift finder
     */
    const triggerFinderButton = document.querySelector(`.${ID}-finderTrigger`);
    triggerFinderButton.addEventListener('click', () => {
        loadQuestion(1);
        activeOptions();
    });

    /**
     * Next button click
     */
    const nextButton = document.querySelector(`.${ID}-finderBox .${ID}-next`);
    nextButton.addEventListener('click', () => {
        didClickNext();
        activeOptions();
    });

    /**
     * Back button click
     */
    const backButton = document.querySelector(`.${ID}-finderBox .${ID}-back`);
    backButton.addEventListener('click', () => {
        didClickBack();
        activeOptions();
    });

    const closeFinder = document.querySelector(`.${ID}-closeFinder`);
    closeFinder.addEventListener('click', () => {
        resetFinder();
    });

    const overlay = document.querySelector(`.${ID}-finderOverlay`);
    overlay.addEventListener('click', () => {
        resetFinder();
    });

}

export default finderFunctionality;


