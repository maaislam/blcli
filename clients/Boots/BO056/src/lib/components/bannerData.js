import shared from "../shared";
import { getLastCategory, getLastDepartment}  from "./getStorage";

/**
 * Adds the banner content based on the last viewed category
 */

const { ID } = shared;

const categories = {
    'christmas': {
        title: 'Christmas',
        innerText: 'However you’re spending Christmas this year, fill it with joy with our amazing range of gifts for all.',
        link: 'https://www.boots.com/christmas/',
        image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E91485AFE47EA8B37CC531856C1C8804A31B75B8D3B7D8A8BE79683491B80DBA.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120169211_10158941015838832_3445358241038450505_o.jpg',
        offerHeading: 'Shop Christmas Offers',
        offerText: 'Our legendary 3 for 2 Christmas presents are back again to give you more for your money.',
        offerLink: 'https://www.boots.com/christmas/christmas-3-for-2',
        offerColour: '#a1c36b',
        innerLinks: {
            '3 for 2 mix & match': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/60E0747F129448E0FFE0E65068D4FD8AF0734493938C7CB23921338DE9EF3F51.png?meta=/BO056---Split-Banner-Personalisation-Test/3for2xmas.png',
              link: 'https://www.boots.com/christmas/christmas-3-for-2',
            },
            'gifts for her': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FBC750A8372BC490E2D6F2F10CA18CD121CAD15A6477C4CDA735963B28F9887E.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforher.png',
              link: 'https://www.boots.com/christmas/gifts-for-her',
            },
            'gifts for him': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3C024324E4C404CF2ED40C3E21805DFD4C17440C90869DD2478DE3E7374542F1.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforhim.png',
              link: 'https://www.boots.com/christmas/gifts-for-him',
            },
            'gifts for kids': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3CDEC466A908C4B59D0187FA04311625ACA50B3D60C92BC8D6630A272C4A0B0.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforkids.png',
              link: 'https://www.boots.com/christmas/christmas-gifts-for-kids',
            },
            'gifts by type': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/69F890DDE43767F5DB335A391D88C57B35C2E09E3D4ADC2CC467BA7162EE4F71.png?meta=/BO056---Split-Banner-Personalisation-Test/gifttype.png',
              link: 'https://www.boots.com/christmas/gift-by-type',
            },
            'advent calendars': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6DE271159759B505517D8F0D95988B5C187C82021ED0CC66C4BD7002F1DF329.png?meta=/BO056---Split-Banner-Personalisation-Test/advent.png',
              link: 'https://www.boots.com/christmas/advent-calendars',
            },
            'star gifts': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3E6DEA92E1A971A3DDBDDDBF085D5896807E435F42796C1BDB42B0568B9EDDD5.png?meta=/BO056---Split-Banner-Personalisation-Test/stargifts.png',
              link: 'https://www.boots.com/christmas/christmas-weekly-offers',
            },
          }
    }, 
    'health-pharmacy': {
        title: 'Health & pharmacy',
        innerText: "You'll find the products and services you need to help you stay healthy at Boots.",
        link: 'https://www.boots.com/health-pharmacy',
        image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CD3068FF21601DF246BC0C1A95178FE611DDB6C72CE6B78C51936B7F36063F01.jpeg?meta=/BO032---Homepage-50-50-Category-Visibility/47fe56f5-min.jpeg',
        offerHeading: 'Health Offers',
        offerText: 'Browse our latest selection of health & pharmacy offers. Shop today & collect 4 Advantage Card Points for every pound you spend.',
        offerLink: 'https://www.boots.com/health-pharmacy/health-offers',
        offerColour: '#d3e9e8',
        innerLinks: {
            'Offers': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/C307E423FEF72112B99D10717A7622896696484389D8A98269D65E32B1DC2D4E.png?meta=/BO056---Split-Banner-Personalisation-Test/offers.png',
                link: 'https://www.boots.com/health-pharmacy/health-offers'
              },
              'Reusable & disposable face masks': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8944342E1764A39516BA208C4D9FB80C3CE12DEE9C2832E5C28BB5755270B030.png?meta=/BO056---Split-Banner-Personalisation-Test/facemask.png',
                link: 'https://www.boots.com/health-pharmacy/surgical-reusable-face-masks'
              },
              'Medicines & treatments': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3A085678A14E55E51F984B956BF81CEA43594EA7E369C07B2903F24B580F1066.png?meta=/BO056---Split-Banner-Personalisation-Test/medicines.png',
                link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
              },
              'Vitamins & supplements': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/518D7E0502E1AF31D6BD386A671F75A318E882B5C2DE7BB6D3BC5BDF5F014402.png?meta=/BO056---Split-Banner-Personalisation-Test/vitamins.png',
                link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements',
              },
              'Sexual pleasure & wellbeing': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/AF7B6B04322CDE34E77F5E7AC3528F26BFE5DA9215A395AC84DDCA06A90CD629.png?meta=/BO056---Split-Banner-Personalisation-Test/pleasure.png',
                link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health',
              },
              "Women's health": {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/5CF4906C129C0881208E84F2E24601083C0E804B6877DCF997405A9AE2882DF4.png?meta=/BO056---Split-Banner-Personalisation-Test/womenhealth.png',
                link: 'https://www.boots.com/health-pharmacy/womenshealth',
              },
              "Lifestyle & wellbeing": {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/A5F918623716FF4B7C4F4B0EF86ECAB5CEC98735D0BCF187B3A7425809174D69.png?meta=/BO056---Split-Banner-Personalisation-Test/lifestyle.png',
                link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing',
              },
              'Incontinence': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/52798EF5B270A8E531585C4B870C252BD2C3978291E28BB283B8290E8157F0C1.png?meta=/BO056---Split-Banner-Personalisation-Test/incontinence-1.png',
                link: 'https://www.boots.com/health-pharmacy/incontinence',
              },
              'Travel health': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/ECDADB5888AA9CA9C8D9042CFC082B8B0393474E9BC25E393851599D3C9D120C.png?meta=/BO056---Split-Banner-Personalisation-Test/travelhealth.png',
                link: 'https://www.boots.com/health-pharmacy/travel-health',
              },
              'Mobility & daily living aids': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F70876A4320F5E353C343DF73C15C002523D58A32A3C54645067CE0D8DFB31A3.png?meta=/BO056---Split-Banner-Personalisation-Test/mobility.png',
                link: 'https://www.boots.com/health-pharmacy/livingaids',
              },
              'Baby & child health': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/C8371C3EA1FDD7E35EAF06AD32F2CA7E29671B5C4B6F7C23A5B3E59F8862E626.png?meta=/BO056---Split-Banner-Personalisation-Test/babychildhealth.png',
                link: 'https://www.boots.com/health-pharmacy/baby-child-health',
              },
              'Men\'s health': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D514195BB84200B726A43D02B811BA48EDEFF4414A76C321C6D25E69B3B882C.png?meta=/BO056---Split-Banner-Personalisation-Test/menshealth.png',
                link: 'https://www.boots.com/health-pharmacy/menshealth',
              },
              'Electrical health & diagnostics': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/924A938943226C14308DBB02A50BFC97175E5F0B32E8EB973E289E77DE0E9A3C.png?meta=/BO056---Split-Banner-Personalisation-Test/electricalhealth.png',
                link: 'https://www.boots.com/health-pharmacy/electrical-health-diagnostics',
              },
              'New in health': {
                icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9019EEA3535F0A712952965B136C28A5CFFE8005D7BFA3AE97EC758AC02C2B97.png?meta=/BO056---Split-Banner-Personalisation-Test/newin-1.png',
                link: 'https://www.boots.com/health-pharmacy/new-in-health'
              }
        },
    }, 
    'beauty': {
        title: 'Beauty & skincare',
        innerText: 'Our beauty haul will let you put your best face forward whilst looking & feeling great.',
        link: 'https://www.boots.com/beauty',
        image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4F1B90C9545E1ECCBB2AE80278C4E7D43CA447D60167A6ADC1523ECEF30FF9A2.jpg?meta=/BO056---Split-Banner-Personalisation-Test/121138042_463541081264329_2442758708360645287_n.jpg',
        offerHeading: 'Beauty & skincare offers',
        offerText: "We've got some fantastic beauty offers available on selected products, including our famous 3-for-2 mix-and-match offers.",
        offerLink: 'https://www.boots.com/beauty/beauty-skincare-offers',
        offerColour: '#ffd8c6',
        innerLinks: {
          'Offers': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/07B992B35FFD41E3F08B0828C088E08686DADD6798CBC8CCBAE74D4751CE11F7.png?meta=/BO056---Split-Banner-Personalisation-Test/offers-1.png',
            link: 'https://www.boots.com/beauty/beauty-skincare-offers',
          },
          'Premium beauty & skincare': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/81C143DA2449C5D6F634F3D706928B9BA6284CCF4E6CBC26AE26A53365FAA71D.png?meta=/BO056---Split-Banner-Personalisation-Test/premium.png',
            link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
          },
          'Make-up': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7006057E3A361DF5C86B10E4A4C962E5C39B2F2ED87C64B001D723B52021204A.png?meta=/BO056---Split-Banner-Personalisation-Test/makeup.png',
            link: 'https://www.boots.com/beauty/makeup',
          
          },
          'Skincare': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/2F2C172D5094DD4EAA29F170258C5A6EE974A172A2A119024BD7F0DCDDCE6948.png?meta=/BO056---Split-Banner-Personalisation-Test/skincare.png',
            link: 'https://www.boots.com/beauty/skincare',
          
          },
          'Hair': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/334EDB9734EE1FD3B075CDCB07FCBA20466667B98E2827BB59FCF81C8F4D1FEE.png?meta=/BO056---Split-Banner-Personalisation-Test/hair-1.png',
            link: 'https://www.boots.com/beauty/hair',
          },
          'Accessories': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/AB772A5C44BEAA47E82ABF93F33BA4A840D62F4A21698E92C6346EF818BABE2D.png?meta=/BO056---Split-Banner-Personalisation-Test/accessories.png',
            link: 'https://www.boots.com/beauty/beauty-accessories',
          },
          'Beauty minis': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/158575C3DE6D14466A2AAE99D878E3801ED79C74BE8EEDC2D3771D0D79CF89CE.png?meta=/BO056---Split-Banner-Personalisation-Test/beautyminis.png',
            link: 'https://www.boots.com/beauty/travel-beauty-minis'
          },
          'Brands': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D7A1527698869401CA937B748EBCE4C888320EDF874D6B7B7A3228147063C64A.png?meta=/BO056---Split-Banner-Personalisation-Test/brands.png',
            link: 'https://www.boots.com/beauty/all-beauty-and-skincare-brands'
          },
          'New in': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6180B3AA103042436BF42DE1AF355793DC2044640A5AE8A1B31B0816E0FA85D.png?meta=/BO056---Split-Banner-Personalisation-Test/newin-2.png',
            link: 'https://www.boots.com/beauty/new-in-beauty-skincare'
          },
          'Top 10': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/094292653B1D5EDB4454DD1FF2AE488D43E1370AF8AB253E459D06503B7260C7.png?meta=/BO056---Split-Banner-Personalisation-Test/top10.png',
            link: 'https://www.boots.com/beauty/recommended',
          },
          'Vegan beauty': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0061A984756C8489D466132A637944AF5435BAE18323583292830FB101EE7120.png?meta=/BO056---Split-Banner-Personalisation-Test/veganbeaut.png',
            link: 'https://www.boots.com/beauty/vegan-range'
          }
        },
    }, 
    'fragrance': {
        title: 'Fragrance',
        innerText: "We've got everything from timeless classics to the latest celebrity fragrances.",
        link: 'https://www.boots.com/fragrance',
        image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7AC849B3CD0CEB5F1EAF2F6600946A4B7FFEFFA49AEE99A6B49E1D2F7560E82A.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120258948_10158941015193832_1068737494197626486_o.jpg',
        offerHeading: 'Fragrance offers',
        offerText: "Whether you're looking for a subtle option to wear to work or a showstopping scent for that big night out, browse our perfume sale to find the perfect blend.",
        offerLink: 'https://www.boots.com/fragrance/fragrance-offers',
        offerColour: '#dcbfb6',
        innerLinks: {
          'Perfume': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/B4DB0A8488092240DA11327C60FD4958A2096950D183D982D9AB53AF8F8E93AD.png?meta=/BO056---Split-Banner-Personalisation-Test/perfume.png',
            link: 'https://www.boots.com/fragrance/perfume',
          },
          'Aftershave': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/52F6BD54A5E6DB3900CBD60CDE88EECB5EAD3B020B5F3989157A52E09AB5C594.png?meta=/BO056---Split-Banner-Personalisation-Test/aftershave.png',
            link: 'https://www.boots.com/fragrance/aftershave',
          },
          'Fragrance gift sets': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/18E7343FA641F329964FA79B23CE4E3A6FFC1EC5C3CD598726014709727F1AA8.png?meta=/BO056---Split-Banner-Personalisation-Test/fraggift.png',
            link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
          },
          'Luxury fragrance': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D66A19566ECED6C4A4827C313484AACDF17E2960FF118191F982A8A365C39CCD.png?meta=/BO056---Split-Banner-Personalisation-Test/luxury.png',
            link: 'https://www.boots.com/fragrance/luxury-fragrance',
          },
          'Vegan fragrance': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/677F523AF5AFC6A0E828DEAD769B2CB751A9B1BA1129D11DCD166A4700579C75.png?meta=/BO056---Split-Banner-Personalisation-Test/vegan.png',
            link: 'https://www.boots.com/fragrance/vegan-fragrances',
          },
          'New in fragrance': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D684FD41F0EEDA5B0690E304EFFD08F2FB8E10169F524A8733812B650E2B858.png?meta=/BO056---Split-Banner-Personalisation-Test/newin.png',
            link: 'https://www.boots.com/fragrance/new-in-fragrance',
          },
          'Recommended': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8785B0CBBF4BDA482056E84062F73431955E5C7F2CADB2D650103BE0E990002E.png?meta=/BO056---Split-Banner-Personalisation-Test/recommended.png',
            link: 'https://www.boots.com/fragrance/recommended-fragrances',
          },
          'Celebrity fragrance': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/051C0693624EF6DD3E0B29ED26611A0FABAB29B43A35AB5F66599E486C3EBC04.png?meta=/BO056---Split-Banner-Personalisation-Test/celeb.png',
            link: 'https://www.boots.com/fragrance/celebrity-fragrance',
          },
          '5* rated perfumes & aftershaves': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FF70CA66B1E0765B8EA8F2634C21F7B8B1241BC039E633C5138852CCFC7462C7.png?meta=/BO056---Split-Banner-Personalisation-Test/5star.png',
            link: 'https://www.boots.com/fragrance/top-rated-fragrance',
          },
          'Home fragrance': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/1F6466EFA3C0AEF546E16F4BD9B555257B69CE83B64EFF25E56A34C4291C7F38.png?meta=/BO056---Split-Banner-Personalisation-Test/homefrag.png',
            link: 'https://www.boots.com/fragrance/fragrance-home-fragrances',
          },
          'Fragrance exclusives': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/DD9FFA85985C960C134431E33EBC6DCA0842F2345CD66D30E29219854FD0B8F8.png?meta=/BO056---Split-Banner-Personalisation-Test/exclusive.png',
            link: 'https://www.boots.com/fragrance/fragrance-exclusives',
          },
        }
    }, 
    'baby-child': {
        title: 'Baby & child',
        innerText: "Whether you’re a mum-to-be or already a proud parent, you’ll find everything you need in our mother and baby range.",
        link: 'https://www.boots.com/baby-child',
        image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/239A1BE12915471D005B6559DD0709D023B238FB2892A481FB3B2D2561BD5B6A.jpg?meta=/BO056---Split-Banner-Personalisation-Test/26232960_10156012837598832_2806794506912920478_o.jpg',
        offerHeading: 'Baby & child offers',
        offerText: "We always have great baby offers on the products that are an absolute necessity, and ones which will just make your life a little bit easier.",
        offerLink: 'https://www.boots.com/baby-child/baby-child-offers',
        offerColour: '#dbf2fe',
        innerLinks: {
          'Baby event': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4D11A75B923539883E51A63BA25289FF59D2364F0198168CDF393187E2D5DA75.png?meta=/BO056---Split-Banner-Personalisation-Test/babyevent.png',
            link: 'https://www.boots.com/baby-child/baby-event'
          },
          'Offers': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0052A301EEB5976F8F951A0E7CDF4E4FF40FF82F3C7ADFFE651D254CAEF40328.png?meta=/BO056---Split-Banner-Personalisation-Test/babyoffers.png',
            link: 'https://www.boots.com/baby-child/baby-child-offers'
          },
        
          'Baby value packs & bundles': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/895AF7F61A19F982FDE76D13F2B732F4518F7AAE366136EF2ABC5CAD2A8EA276.png?meta=/BO056---Split-Banner-Personalisation-Test/babybundles.png',
            link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles'
          },
          'Clothing': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F2F4B5717196C94A45829A35137796163CEEADB9DE2B4F2B7557FCF1A5A67DFA.png?meta=/BO056---Split-Banner-Personalisation-Test/babyclothing.png',
            link: 'https://www.boots.com/baby-child/mothercare-clothing',
          },
          'Feeding': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9495681F214AE688628108F7830C7825146788E3754D7907F2306AF4EC7B564D.png?meta=/BO056---Split-Banner-Personalisation-Test/feeding.png',
            link: 'https://www.boots.com/baby-child/babyfeeding',
          },
          'Bathing & changing': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D4B6A75783CC1BE0ABEF24AFC0419F048682BEFE2CB6C1F0362ED91BC1B58F2.png?meta=/BO056---Split-Banner-Personalisation-Test/bathing.png',
            link: 'https://www.boots.com/baby-child/bathing-changing',
          },
          'Travel': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/140A876BFC473BBCBF53B0D1A492836FF4CAD48589B10A5B26211FC2781EBE84.png?meta=/BO056---Split-Banner-Personalisation-Test/babytravel.png',
            link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
          },
          'Pregnancy & maternity': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E2D9AEC031FE431EB0D5C269EE8C796CE702E96B45288FE5A8D5259072DCC548.png?meta=/BO056---Split-Banner-Personalisation-Test/pregnancy.png',
            link: 'https://www.boots.com/baby-child/pregnancy-maternity',
          },
          'Nursery & bedding': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/933025852F8EEB96C83FBD3AECC08B20C8629A850EB446818734E6FA7676C15E.png?meta=/BO056---Split-Banner-Personalisation-Test/nursery.png',
            link: 'https://www.boots.com/baby-child/nursery-furniture',
          },
          'Toys': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/5500D354A266FC02A39E553B0647B247C9DBA9F1B608454C593166687E53890E.png?meta=/BO056---Split-Banner-Personalisation-Test/toys.png',
            link: 'https://www.boots.com/baby-child/toys/all-toys'
          },
          'Baby & child health': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D297319BC0BAFDB6ABECA1909E33F1BAE304B42291DF3D64BA05CEB6DC597D67.png?meta=/BO056---Split-Banner-Personalisation-Test/babyhealth.png',
            link: 'https://www.boots.com/baby-child/baby-child-health',
          },
          'New in baby & child': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D03A26CA9B033706DE8111E8F271337952F2CAC07DBA34AC805E627FD026FF7C.png?meta=/BO056---Split-Banner-Personalisation-Test/babynew.png',
            link: 'https://www.boots.com/baby-child/new-in-baby-child'
          }
        }
    }, 
    'toiletries': {
        title: 'Toiletries',
        innerText: 'Stock up on essentials or treat yourself to some indulgent skincare or bath products.',
        link: 'https://www.boots.com/toiletries',
        image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/075E5F95386C18597DF3ACE6A0F89EDB079761275FB6F61DD45D374248E8469C.jpg?meta=/BO056---Split-Banner-Personalisation-Test/26172211_10156004535568832_8259767074951849984_o.jpg',
        offerHeading: 'Toiletries offers',
        offerText: 'From half price deals to 2-for-1 steals, we have a huge range of Boots toiletries offers for the whole family.',
        offerLink: 'https://www.boots.com/toiletries/toiletries-offers',
        offerColour: '#feece9',
        innerLinks: {
          'Hair': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/007D3E2B1A141A96FA13FFDC9208D449044931B0B1D3D6F3B1601105FEE8781D.png?meta=/BO056---Split-Banner-Personalisation-Test/hair.png',
            link: 'https://www.boots.com/toiletries/hair',
          },
          'Dental': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D71D237F003B2BD00C90EB4841CB84AE10CFA0C644614CEDC794B496193793B7.png?meta=/BO056---Split-Banner-Personalisation-Test/dental.png',
            link: 'https://www.boots.com/toiletries/bootsdental',
          },
          'Bathroom essentials': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4C0181A2469A2AD502E7D342A341D758401474F7F6F7DEE517A19F934E1BB5A7.png?meta=/BO056---Split-Banner-Personalisation-Test/essential.png',
            link: 'https://www.boots.com/toiletries/washing-bathing',
          },
          'Luxury bath & body': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9B0E11C1F374F3C86876777A1250B3E0D42BAE1E17FA4403D79FE4E131CD441C.png?meta=/BO056---Split-Banner-Personalisation-Test/luxbath.png',
            link: 'https://www.boots.com/toiletries/luxury-bath-body',
          
          },
          "Men's toiletries": {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/BCDC378C68093BD2317C18042273207728E51C65F0E53A4572EC1551BF48EEAE.png?meta=/BO056---Split-Banner-Personalisation-Test/mens.png',
            link: 'https://www.boots.com/toiletries/mens-toiletries',
          },
          'Feminine hygiene': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7C2A64170F23DE992882E5FF443E4FC8C9B3F639BB00263762D034ABB18E3C42.png?meta=/BO056---Split-Banner-Personalisation-Test/femininehyg.png',
            link: 'https://www.boots.com/toiletries/feminine-hygiene',
          },
          'Suncare': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/18CC5B307A5FDCB4A1EACAAE9C1AD32E7682B046CC6E7D0DBA15B866ED50E6D0.png?meta=/BO056---Split-Banner-Personalisation-Test/suncare.png',
            link: 'https://www.boots.com/toiletries/suncare'
          },
          'Fake & gradual tan': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3057F75FAFF12818B9B8D864ACE428005C80BA15C33B7E4659A77069C757AA3.png?meta=/BO056---Split-Banner-Personalisation-Test/faketan.png',
            link: 'https://www.boots.com/toiletries/fake-gradual-tan'
          },
          'Deodorants & antiperspirants': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/806F993CC583489A01C3FBD4C9F4F17B7902343CF91940069966DFD03D3DA2B2.png?meta=/BO056---Split-Banner-Personalisation-Test/deodrant.png',
            link: 'https://www.boots.com/toiletries/deodorants-antiperspirants'
          },
          'Female hair removal': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0CF40B47C73498F0FB149A30F84B7231791F7854B0059605AE6492EF7B312DBA.png?meta=/BO056---Split-Banner-Personalisation-Test/hairemoval.png',
            link: 'https://www.boots.com/toiletries/skincare-female-hair-removal',
          },
        },
    }, 
    'electrical': {
        title: 'Electrical',
        innerText: "Whether you're looking for hair dryers or shavers, we've got the latest products from the biggest brands.",
        link: 'https://www.boots.com/electrical',
        image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/A1E30805865DF2D256198F429E60AB55393DEECA621E0DF944095E8B7F4A2A16.jpg?meta=/BO056---Split-Banner-Personalisation-Test/re21092020-eb-dyson-50-airwrapdryergift-data.jpg',
        offerHeading: 'Electrical offers',
        offerText: 'Browse our electrical offers for fantastic percentage discounts and money off deals.',
        offerLink: 'https://www.boots.com/electrical/electrical-offers',
        offerColour: '#f1f1f1',
        innerLinks: {
          'Hair styling tools': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/117790528DBC70480541CAB66B88B902B9198094BFD2395714BDDC4D0EE1E38D.png?meta=/BO056---Split-Banner-Personalisation-Test/hairstyling.png',
            link: 'https://www.boots.com/electrical/hair-styling-tools',
          },
          'Electrical dental': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CCD2411C69FB946F22BAC1D1ACF9A7AD74D94F0BAC5508D9A7F324119A200105.png?meta=/BO056---Split-Banner-Personalisation-Test/electdental.png',
            link: 'https://www.boots.com/electrical/electrical-dental',
          },
          'Female hair removal tools': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CF624C43521A4976E1692487DB22B9809554D3C52F5CD990DD1438BF57056159.png?meta=/BO056---Split-Banner-Personalisation-Test/elechairremoval.png',
            link: 'https://www.boots.com/electrical/female-hair-removal-tools',
          
          },
          'Male grooming tools': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/48EC4687F0D46F57B51707F0FEE6A4953C73B7DE2F5801287FAF9573EF0FBBA0.png?meta=/BO056---Split-Banner-Personalisation-Test/malegrooming.png',
            link: 'https://www.boots.com/electrical/male-grooming-tools',
          
          },
          'Beauty tools': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D818D6F75828B30D91D55985D8B319975785A23635D01DDE40D7946587602C8.png?meta=/BO056---Split-Banner-Personalisation-Test/beautytool.png',
            link: 'https://www.boots.com/electrical/beauty-tools',
          },
          'Electrical wellbeing': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/EACA650E697C4029B2D9833FD5DE9FAB5C8C49631590C6A8BDE47FF0409C41CA.png?meta=/BO056---Split-Banner-Personalisation-Test/elecwellbeing.png',
            link: 'https://www.boots.com/electrical/electrical-wellbeing',
          },
          'Electrical health & diagnostics': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/6188426A50CBEDB964CB23A79000CD71000E235AC44FBBA3F415AAF3C1C7A214.png?meta=/BO056---Split-Banner-Personalisation-Test/healthdiagnostic.png',
            link: 'https://www.boots.com/electrical/electrical-health-diagnostics'
          },
          'Audio & visual tech': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/19A10AE6CCBB920707943179FA5D231E46B98C95F98C0471A2F8A49E3EA0A391.png?meta=/BO056---Split-Banner-Personalisation-Test/audiovisual.png',
            link: 'https://www.boots.com/electrical/headphones-cameras-accessories'
          },
          'New in': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9E866C3817D2AFADC7B0DC373B1927EA5B4CB90D3CE43DD65A542522BAB5940C.png?meta=/BO056---Split-Banner-Personalisation-Test/new.png',
            link: 'https://www.boots.com/electrical/new-in-electrical'
          },
        },
    }, 
    'mens': {
        title: 'Mens',
        innerText: "Looking good and feeling great has never been easier, from shaving and clippers to men's fragrance, you'll find it all at Boots.",
        link: 'https://www.boots.com/mens',
        image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/28AB0855992A0972C61D2CFC69AA285C9B47333ED377B8610A8F69A2DD774558.jpg?meta=/BO056---Split-Banner-Personalisation-Test/18921026_10155369584383832_1500347153570450761_o.jpg',
        offerHeading: `<span class="${ID}-red">3 for 2</span>`,
        offerText: 'on selected FCUK toiletries',
        offerLink: 'https://www.boots.com/webapp/wcs/stores/servlet/SearchDisplay?langId=-1&showResultsPage=true&categoryId=&sType=SimpleSearch&searchTermScope=&orderBy=&resultCatEntryType=2&minPrice=0&promoNameParam=3+for+2+on+selected+FCUK+mens+-+cheapest+free&catalogId=28501&pageView=grid&advancedSearch=&searchTerm=&storeId=11352&beginIndex=0&maxPrice=&isPromoLink=Y&searchSource=Q&manufacturer=',
        offerColour: '#ddecfb',
        innerLinks: {
          "Men's toiletries": {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/1B5AEED9124DBB4978A65C09A44036502D235796ADCD5C89007A5851A9B17D57.png?meta=/BO056---Split-Banner-Personalisation-Test/mentoiletries.png',
            link: 'https://www.boots.com/mens/mens-toiletries',
          },
          "Men's value packs & bundles": {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3F980E3C207AB16EC221FDFE100EF536D94C9E036835FAF4ACFE470183D4BE75.png?meta=/BO056---Split-Banner-Personalisation-Test/menbundle.png',
            link: 'https://www.boots.com/mens/mens-value-packs-and-bundles',
          },
          'Shaving & grooming': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4F871B449D84415B7153AC686EE2ABC2F76DD6F100F4C8FD33B9A4355C092862.png?meta=/BO056---Split-Banner-Personalisation-Test/menshaving.png',
            link: 'https://www.boots.com/mens/shaving-grooming',
          
          },
          "Men's skincare & body": {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/63DF69D33493669FF9BC115A74F4C0E2A0FF9EF399E81698039787379DEFBF21.png?meta=/BO056---Split-Banner-Personalisation-Test/menskincare.png',
            link: 'https://www.boots.com/mens/skincare-body',
          
          },
          'Male grooming tools': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/65A3D96C6A45F9F793F695E0782824EB52588A5DD75E082A1D0B1D42E61E2E21.png?meta=/BO056---Split-Banner-Personalisation-Test/groomingtool.png',
            link: 'https://www.boots.com/mens/male-grooming-tools',
          },
          'Male incontinence': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/A7626000ACF666F6DD9C55374185B28244EF91FF028BD045019E3C4BC4AEB092.png?meta=/BO056---Split-Banner-Personalisation-Test/incontinence.png',
            link: 'https://www.boots.com/mens/male-incontinence',
          },
          "Men's health": {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/C2F317F7943DA38048F0F7907105812CAD81925CAF34D55230DF06807209A49C.png?meta=/BO056---Split-Banner-Personalisation-Test/menhealth.png',
            link: 'https://www.boots.com/mens/menshealth'
          },
          'Aftershave': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0DBE551C829BB71D4DB5C3C2B8B11A117DB2CD9E473FA1DCED722655F9C59EFA.png?meta=/BO056---Split-Banner-Personalisation-Test/aftershave-1.png',
            link: 'https://www.boots.com/mens/aftershave'
          },
          "Men's gift sets": {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/AD9CD504AFB4083EF451590F4C532F38B8D81F1D0A459A3D58CEE58689B88ABE.png?meta=/BO056---Split-Banner-Personalisation-Test/mengiftset.png',
            link: 'https://www.boots.com/mens/mens-gift-sets'
          },
        },
    }, 
    'gift': {
      title: 'Gift',
      innerText: "Whether you’re looking for a birthday treat or simply fancy making a loved one’s day, we have a huge range of gifts to show them you know them.",
      link: 'https://www.boots.com/gift',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/81C31F772DB59A7A48B1956CAD7AB214EB09B615FB7858E8994B2D8FE1F26D59.jpg?meta=/BO056---Split-Banner-Personalisation-Test/gift.jpg',
      offerHeading: `<span class="${ID}-red">Save 1/3</span>`,
      offerText: 'on Soap & Glory',
      offerLink: 'https://www.boots.com/webapp/wcs/stores/servlet/SearchDisplay?langId=-1&showResultsPage=true&categoryId=&sType=SimpleSearch&searchTermScope=&orderBy=&resultCatEntryType=2&minPrice=0&promoNameParam=Save%201/3%20on%20selected%20Soap%20and%20Glory&catalogId=28501&pageView=grid&advancedSearch=&searchTerm=&storeId=11352&beginIndex=0&maxPrice=&isPromoLink=Y&searchSource=Q&manufacturer=#facet:-105049495153505883971181013249475132111110321151011081019911610110032831119711232971101003271108111114121&productBeginIndex:0&orderBy:7&pageView:grid&minPrice:0&maxPrice:&pageSize:&',
      offerColour: '#febcc6',
      innerLinks: {
        "Gifts for her": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D6F9061AE5EFF8B0011D8532E37E4481C40C51F9EE7F4DAD6099FBC821935122.png?meta=/BO056---Split-Banner-Personalisation-Test/gifther.png',
          link: 'https://www.boots.com/gift/her',
        },
        "Gifts for him": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/2407ED3634F8900BE831705E3DD45A893413937DB03F70A4F327EF4256337FD5.png?meta=/BO056---Split-Banner-Personalisation-Test/gifthim.png',
          link: 'https://www.boots.com/gift/him',
        },
        'Candles & home fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E076B85648CFB2825C66F90D75F3B8EA70332C5E99B26E57AA8DBF0D02D1CF4A.png?meta=/BO056---Split-Banner-Personalisation-Test/candles.png',
          link: 'https://www.boots.com/gift/candles-home-fragrance-for-her',
        
        },
        "Experience days": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/1F8219B45DC07B058D29483BE8EB8DBB0536E2C6C12EFA0906B1C12DC0135D58.png?meta=/BO056---Split-Banner-Personalisation-Test/experienceday.png',
          link: 'https://www.boots.com/gift/experience-days',
        
        },
        'Personalised photo gifts': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4DB0A963ECFE530BE62D0475996DF8592AA6D3D1DEB152EBA5EE4AD57D9ADCDB.png?meta=/BO056---Split-Banner-Personalisation-Test/photogift.png',
          link: 'https://www.boots.com/gift/personalised-photo-gifts',
        },
        'Birthday gifts': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/122B8B758BF5296AEFA25494CF64B6FF0C89AC2FD890CDCD1F9A0F5510F92AD8.png?meta=/BO056---Split-Banner-Personalisation-Test/birthday.png',
          link: 'https://www.boots.com/gift/birthday-gifts',
        },
      },
  }, 
}

const categoriesV2 = {
  'christmas': {
      title: 'Christmas',
      innerText: 'However you’re spending Christmas this year, fill it with joy with our amazing range of gifts for all.',
      link: 'https://www.boots.com/christmas/',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E91485AFE47EA8B37CC531856C1C8804A31B75B8D3B7D8A8BE79683491B80DBA.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120169211_10158941015838832_3445358241038450505_o.jpg',
      innerLinks: {
          '3 for 2 mix & match': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/60E0747F129448E0FFE0E65068D4FD8AF0734493938C7CB23921338DE9EF3F51.png?meta=/BO056---Split-Banner-Personalisation-Test/3for2xmas.png',
            link: 'https://www.boots.com/christmas/christmas-3-for-2',
          },
          'gifts for her': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FBC750A8372BC490E2D6F2F10CA18CD121CAD15A6477C4CDA735963B28F9887E.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforher.png',
            link: 'https://www.boots.com/christmas/gifts-for-her',
          },
          'gifts for him': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3C024324E4C404CF2ED40C3E21805DFD4C17440C90869DD2478DE3E7374542F1.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforhim.png',
            link: 'https://www.boots.com/christmas/gifts-for-him',
          },
          'gifts for kids': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3CDEC466A908C4B59D0187FA04311625ACA50B3D60C92BC8D6630A272C4A0B0.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforkids.png',
            link: 'https://www.boots.com/christmas/christmas-gifts-for-kids',
          },
          'gifts by type': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/69F890DDE43767F5DB335A391D88C57B35C2E09E3D4ADC2CC467BA7162EE4F71.png?meta=/BO056---Split-Banner-Personalisation-Test/gifttype.png',
            link: 'https://www.boots.com/christmas/gift-by-type',
          },
          'advent calendars': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6DE271159759B505517D8F0D95988B5C187C82021ED0CC66C4BD7002F1DF329.png?meta=/BO056---Split-Banner-Personalisation-Test/advent.png',
            link: 'https://www.boots.com/christmas/advent-calendars',
          },
          'star gifts': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3E6DEA92E1A971A3DDBDDDBF085D5896807E435F42796C1BDB42B0568B9EDDD5.png?meta=/BO056---Split-Banner-Personalisation-Test/stargifts.png',
            link: 'https://www.boots.com/christmas/christmas-weekly-offers',
          },
      },
      titleRight: 'Beauty & skincare',
      innerTextRight: 'Our beauty haul will let you put your best face forward whilst looking & feeling great.',
      linkRight: 'https://www.boots.com/beauty',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4F1B90C9545E1ECCBB2AE80278C4E7D43CA447D60167A6ADC1523ECEF30FF9A2.jpg?meta=/BO056---Split-Banner-Personalisation-Test/121138042_463541081264329_2442758708360645287_n.jpg',
      innerLinksRight: {
        'Offers': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/07B992B35FFD41E3F08B0828C088E08686DADD6798CBC8CCBAE74D4751CE11F7.png?meta=/BO056---Split-Banner-Personalisation-Test/offers-1.png',
          link: 'https://www.boots.com/beauty/beauty-skincare-offers',
        },
        'Premium beauty & skincare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/81C143DA2449C5D6F634F3D706928B9BA6284CCF4E6CBC26AE26A53365FAA71D.png?meta=/BO056---Split-Banner-Personalisation-Test/premium.png',
          link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
        },
        'Make-up': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7006057E3A361DF5C86B10E4A4C962E5C39B2F2ED87C64B001D723B52021204A.png?meta=/BO056---Split-Banner-Personalisation-Test/makeup.png',
          link: 'https://www.boots.com/beauty/makeup',
        
        },
        'Skincare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/2F2C172D5094DD4EAA29F170258C5A6EE974A172A2A119024BD7F0DCDDCE6948.png?meta=/BO056---Split-Banner-Personalisation-Test/skincare.png',
          link: 'https://www.boots.com/beauty/skincare',
        
        },
        'Hair': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/334EDB9734EE1FD3B075CDCB07FCBA20466667B98E2827BB59FCF81C8F4D1FEE.png?meta=/BO056---Split-Banner-Personalisation-Test/hair-1.png',
          link: 'https://www.boots.com/beauty/hair',
        },
        'Accessories': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/AB772A5C44BEAA47E82ABF93F33BA4A840D62F4A21698E92C6346EF818BABE2D.png?meta=/BO056---Split-Banner-Personalisation-Test/accessories.png',
          link: 'https://www.boots.com/beauty/beauty-accessories',
        },
        'Beauty minis': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/158575C3DE6D14466A2AAE99D878E3801ED79C74BE8EEDC2D3771D0D79CF89CE.png?meta=/BO056---Split-Banner-Personalisation-Test/beautyminis.png',
          link: 'https://www.boots.com/beauty/travel-beauty-minis'
        },
        'Brands': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D7A1527698869401CA937B748EBCE4C888320EDF874D6B7B7A3228147063C64A.png?meta=/BO056---Split-Banner-Personalisation-Test/brands.png',
          link: 'https://www.boots.com/beauty/all-beauty-and-skincare-brands'
        },
        'New in': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6180B3AA103042436BF42DE1AF355793DC2044640A5AE8A1B31B0816E0FA85D.png?meta=/BO056---Split-Banner-Personalisation-Test/newin-2.png',
          link: 'https://www.boots.com/beauty/new-in-beauty-skincare'
        },
        'Top 10': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/094292653B1D5EDB4454DD1FF2AE488D43E1370AF8AB253E459D06503B7260C7.png?meta=/BO056---Split-Banner-Personalisation-Test/top10.png',
          link: 'https://www.boots.com/beauty/recommended',
        },
        'Vegan beauty': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0061A984756C8489D466132A637944AF5435BAE18323583292830FB101EE7120.png?meta=/BO056---Split-Banner-Personalisation-Test/veganbeaut.png',
          link: 'https://www.boots.com/beauty/vegan-range'
        }
      },
  }, 
  'health-pharmacy': {
      title: 'Health & pharmacy',
      innerText: "You'll find the products and services you need to help you stay healthy at Boots.",
      link: 'https://www.boots.com/health-pharmacy',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CD3068FF21601DF246BC0C1A95178FE611DDB6C72CE6B78C51936B7F36063F01.jpeg?meta=/BO032---Homepage-50-50-Category-Visibility/47fe56f5-min.jpeg',
      innerLinks: {
          'Offers': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/C307E423FEF72112B99D10717A7622896696484389D8A98269D65E32B1DC2D4E.png?meta=/BO056---Split-Banner-Personalisation-Test/offers.png',
              link: 'https://www.boots.com/health-pharmacy/health-offers'
            },
            'Reusable & disposable face masks': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8944342E1764A39516BA208C4D9FB80C3CE12DEE9C2832E5C28BB5755270B030.png?meta=/BO056---Split-Banner-Personalisation-Test/facemask.png',
              link: 'https://www.boots.com/health-pharmacy/surgical-reusable-face-masks'
            },
            'Medicines & treatments': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3A085678A14E55E51F984B956BF81CEA43594EA7E369C07B2903F24B580F1066.png?meta=/BO056---Split-Banner-Personalisation-Test/medicines.png',
              link: 'https://www.boots.com/health-pharmacy/medicines-treatments',
            },
            'Vitamins & supplements': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/518D7E0502E1AF31D6BD386A671F75A318E882B5C2DE7BB6D3BC5BDF5F014402.png?meta=/BO056---Split-Banner-Personalisation-Test/vitamins.png',
              link: 'https://www.boots.com/health-pharmacy/vitaminsandsupplements',
            },
            'Sexual pleasure & wellbeing': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/AF7B6B04322CDE34E77F5E7AC3528F26BFE5DA9215A395AC84DDCA06A90CD629.png?meta=/BO056---Split-Banner-Personalisation-Test/pleasure.png',
              link: 'https://www.boots.com/health-pharmacy/condoms-sexual-health',
            },
            "Women's health": {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/5CF4906C129C0881208E84F2E24601083C0E804B6877DCF997405A9AE2882DF4.png?meta=/BO056---Split-Banner-Personalisation-Test/womenhealth.png',
              link: 'https://www.boots.com/health-pharmacy/womenshealth',
            },
            "Lifestyle & wellbeing": {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/A5F918623716FF4B7C4F4B0EF86ECAB5CEC98735D0BCF187B3A7425809174D69.png?meta=/BO056---Split-Banner-Personalisation-Test/lifestyle.png',
              link: 'https://www.boots.com/health-pharmacy/lifestyle-wellbeing',
            },
            'Incontinence': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/52798EF5B270A8E531585C4B870C252BD2C3978291E28BB283B8290E8157F0C1.png?meta=/BO056---Split-Banner-Personalisation-Test/incontinence-1.png',
              link: 'https://www.boots.com/health-pharmacy/incontinence',
            },
            'Travel health': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/ECDADB5888AA9CA9C8D9042CFC082B8B0393474E9BC25E393851599D3C9D120C.png?meta=/BO056---Split-Banner-Personalisation-Test/travelhealth.png',
              link: 'https://www.boots.com/health-pharmacy/travel-health',
            },
            'Mobility & daily living aids': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F70876A4320F5E353C343DF73C15C002523D58A32A3C54645067CE0D8DFB31A3.png?meta=/BO056---Split-Banner-Personalisation-Test/mobility.png',
              link: 'https://www.boots.com/health-pharmacy/livingaids',
            },
            'Baby & child health': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/C8371C3EA1FDD7E35EAF06AD32F2CA7E29671B5C4B6F7C23A5B3E59F8862E626.png?meta=/BO056---Split-Banner-Personalisation-Test/babychildhealth.png',
              link: 'https://www.boots.com/health-pharmacy/baby-child-health',
            },
            'Men\'s health': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D514195BB84200B726A43D02B811BA48EDEFF4414A76C321C6D25E69B3B882C.png?meta=/BO056---Split-Banner-Personalisation-Test/menshealth.png',
              link: 'https://www.boots.com/health-pharmacy/menshealth',
            },
            'Electrical health & diagnostics': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/924A938943226C14308DBB02A50BFC97175E5F0B32E8EB973E289E77DE0E9A3C.png?meta=/BO056---Split-Banner-Personalisation-Test/electricalhealth.png',
              link: 'https://www.boots.com/health-pharmacy/electrical-health-diagnostics',
            },
            'New in health': {
              icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9019EEA3535F0A712952965B136C28A5CFFE8005D7BFA3AE97EC758AC02C2B97.png?meta=/BO056---Split-Banner-Personalisation-Test/newin-1.png',
              link: 'https://www.boots.com/health-pharmacy/new-in-health'
            }
      },
      titleRight: 'Toiletries',
      innerTextRight: 'Stock up on essentials or treat yourself to some indulgent skincare or bath products.',
      linkRight: 'https://www.boots.com/toiletries',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/075E5F95386C18597DF3ACE6A0F89EDB079761275FB6F61DD45D374248E8469C.jpg?meta=/BO056---Split-Banner-Personalisation-Test/26172211_10156004535568832_8259767074951849984_o.jpg',
      innerLinksRight: {
        'Hair': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/007D3E2B1A141A96FA13FFDC9208D449044931B0B1D3D6F3B1601105FEE8781D.png?meta=/BO056---Split-Banner-Personalisation-Test/hair.png',
          link: 'https://www.boots.com/toiletries/hair',
        },
        'Dental': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D71D237F003B2BD00C90EB4841CB84AE10CFA0C644614CEDC794B496193793B7.png?meta=/BO056---Split-Banner-Personalisation-Test/dental.png',
          link: 'https://www.boots.com/toiletries/bootsdental',
        },
        'Bathroom essentials': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4C0181A2469A2AD502E7D342A341D758401474F7F6F7DEE517A19F934E1BB5A7.png?meta=/BO056---Split-Banner-Personalisation-Test/essential.png',
          link: 'https://www.boots.com/toiletries/washing-bathing',
        },
        'Luxury bath & body': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9B0E11C1F374F3C86876777A1250B3E0D42BAE1E17FA4403D79FE4E131CD441C.png?meta=/BO056---Split-Banner-Personalisation-Test/luxbath.png',
          link: 'https://www.boots.com/toiletries/luxury-bath-body',
        
        },
        "Men's toiletries": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/BCDC378C68093BD2317C18042273207728E51C65F0E53A4572EC1551BF48EEAE.png?meta=/BO056---Split-Banner-Personalisation-Test/mens.png',
          link: 'https://www.boots.com/toiletries/mens-toiletries',
        },
        'Feminine hygiene': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7C2A64170F23DE992882E5FF443E4FC8C9B3F639BB00263762D034ABB18E3C42.png?meta=/BO056---Split-Banner-Personalisation-Test/femininehyg.png',
          link: 'https://www.boots.com/toiletries/feminine-hygiene',
        },
        'Suncare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/18CC5B307A5FDCB4A1EACAAE9C1AD32E7682B046CC6E7D0DBA15B866ED50E6D0.png?meta=/BO056---Split-Banner-Personalisation-Test/suncare.png',
          link: 'https://www.boots.com/toiletries/suncare'
        },
        'Fake & gradual tan': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3057F75FAFF12818B9B8D864ACE428005C80BA15C33B7E4659A77069C757AA3.png?meta=/BO056---Split-Banner-Personalisation-Test/faketan.png',
          link: 'https://www.boots.com/toiletries/fake-gradual-tan'
        },
        'Deodorants & antiperspirants': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/806F993CC583489A01C3FBD4C9F4F17B7902343CF91940069966DFD03D3DA2B2.png?meta=/BO056---Split-Banner-Personalisation-Test/deodrant.png',
          link: 'https://www.boots.com/toiletries/deodorants-antiperspirants'
        },
        'Female hair removal': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0CF40B47C73498F0FB149A30F84B7231791F7854B0059605AE6492EF7B312DBA.png?meta=/BO056---Split-Banner-Personalisation-Test/hairemoval.png',
          link: 'https://www.boots.com/toiletries/skincare-female-hair-removal',
        },
      },
  }, 
  'beauty': {
      title: 'Beauty & skincare',
      innerText: 'Our beauty haul will let you put your best face forward whilst looking & feeling great.',
      link: 'https://www.boots.com/beauty',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4F1B90C9545E1ECCBB2AE80278C4E7D43CA447D60167A6ADC1523ECEF30FF9A2.jpg?meta=/BO056---Split-Banner-Personalisation-Test/121138042_463541081264329_2442758708360645287_n.jpg',
      innerLinks: {
        'Offers': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/07B992B35FFD41E3F08B0828C088E08686DADD6798CBC8CCBAE74D4751CE11F7.png?meta=/BO056---Split-Banner-Personalisation-Test/offers-1.png',
          link: 'https://www.boots.com/beauty/beauty-skincare-offers',
        },
        'Premium beauty & skincare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/81C143DA2449C5D6F634F3D706928B9BA6284CCF4E6CBC26AE26A53365FAA71D.png?meta=/BO056---Split-Banner-Personalisation-Test/premium.png',
          link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
        },
        'Make-up': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7006057E3A361DF5C86B10E4A4C962E5C39B2F2ED87C64B001D723B52021204A.png?meta=/BO056---Split-Banner-Personalisation-Test/makeup.png',
          link: 'https://www.boots.com/beauty/makeup',
        
        },
        'Skincare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/2F2C172D5094DD4EAA29F170258C5A6EE974A172A2A119024BD7F0DCDDCE6948.png?meta=/BO056---Split-Banner-Personalisation-Test/skincare.png',
          link: 'https://www.boots.com/beauty/skincare',
        
        },
        'Hair': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/334EDB9734EE1FD3B075CDCB07FCBA20466667B98E2827BB59FCF81C8F4D1FEE.png?meta=/BO056---Split-Banner-Personalisation-Test/hair-1.png',
          link: 'https://www.boots.com/beauty/hair',
        },
        'Accessories': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/AB772A5C44BEAA47E82ABF93F33BA4A840D62F4A21698E92C6346EF818BABE2D.png?meta=/BO056---Split-Banner-Personalisation-Test/accessories.png',
          link: 'https://www.boots.com/beauty/beauty-accessories',
        },
        'Beauty minis': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/158575C3DE6D14466A2AAE99D878E3801ED79C74BE8EEDC2D3771D0D79CF89CE.png?meta=/BO056---Split-Banner-Personalisation-Test/beautyminis.png',
          link: 'https://www.boots.com/beauty/travel-beauty-minis'
        },
        'Brands': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D7A1527698869401CA937B748EBCE4C888320EDF874D6B7B7A3228147063C64A.png?meta=/BO056---Split-Banner-Personalisation-Test/brands.png',
          link: 'https://www.boots.com/beauty/all-beauty-and-skincare-brands'
        },
        'New in': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6180B3AA103042436BF42DE1AF355793DC2044640A5AE8A1B31B0816E0FA85D.png?meta=/BO056---Split-Banner-Personalisation-Test/newin-2.png',
          link: 'https://www.boots.com/beauty/new-in-beauty-skincare'
        },
        'Top 10': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/094292653B1D5EDB4454DD1FF2AE488D43E1370AF8AB253E459D06503B7260C7.png?meta=/BO056---Split-Banner-Personalisation-Test/top10.png',
          link: 'https://www.boots.com/beauty/recommended',
        },
        'Vegan beauty': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0061A984756C8489D466132A637944AF5435BAE18323583292830FB101EE7120.png?meta=/BO056---Split-Banner-Personalisation-Test/veganbeaut.png',
          link: 'https://www.boots.com/beauty/vegan-range'
        }
      },
      titleRight: 'Fragrance',
      innerTextRight: "We've got everything from timeless classics to the latest celebrity fragrances.",
      linkRight: 'https://www.boots.com/fragrance',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7AC849B3CD0CEB5F1EAF2F6600946A4B7FFEFFA49AEE99A6B49E1D2F7560E82A.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120258948_10158941015193832_1068737494197626486_o.jpg',
      innerLinksRight: {
        'Perfume': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/B4DB0A8488092240DA11327C60FD4958A2096950D183D982D9AB53AF8F8E93AD.png?meta=/BO056---Split-Banner-Personalisation-Test/perfume.png',
          link: 'https://www.boots.com/fragrance/perfume',
        },
        'Aftershave': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/52F6BD54A5E6DB3900CBD60CDE88EECB5EAD3B020B5F3989157A52E09AB5C594.png?meta=/BO056---Split-Banner-Personalisation-Test/aftershave.png',
          link: 'https://www.boots.com/fragrance/aftershave',
        },
        'Fragrance gift sets': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/18E7343FA641F329964FA79B23CE4E3A6FFC1EC5C3CD598726014709727F1AA8.png?meta=/BO056---Split-Banner-Personalisation-Test/fraggift.png',
          link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
        },
        'Luxury fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D66A19566ECED6C4A4827C313484AACDF17E2960FF118191F982A8A365C39CCD.png?meta=/BO056---Split-Banner-Personalisation-Test/luxury.png',
          link: 'https://www.boots.com/fragrance/luxury-fragrance',
        },
        'Vegan fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/677F523AF5AFC6A0E828DEAD769B2CB751A9B1BA1129D11DCD166A4700579C75.png?meta=/BO056---Split-Banner-Personalisation-Test/vegan.png',
          link: 'https://www.boots.com/fragrance/vegan-fragrances',
        },
        'New in fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D684FD41F0EEDA5B0690E304EFFD08F2FB8E10169F524A8733812B650E2B858.png?meta=/BO056---Split-Banner-Personalisation-Test/newin.png',
          link: 'https://www.boots.com/fragrance/new-in-fragrance',
        },
        'Recommended': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8785B0CBBF4BDA482056E84062F73431955E5C7F2CADB2D650103BE0E990002E.png?meta=/BO056---Split-Banner-Personalisation-Test/recommended.png',
          link: 'https://www.boots.com/fragrance/recommended-fragrances',
        },
        'Celebrity fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/051C0693624EF6DD3E0B29ED26611A0FABAB29B43A35AB5F66599E486C3EBC04.png?meta=/BO056---Split-Banner-Personalisation-Test/celeb.png',
          link: 'https://www.boots.com/fragrance/celebrity-fragrance',
        },
        '5* rated perfumes & aftershaves': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FF70CA66B1E0765B8EA8F2634C21F7B8B1241BC039E633C5138852CCFC7462C7.png?meta=/BO056---Split-Banner-Personalisation-Test/5star.png',
          link: 'https://www.boots.com/fragrance/top-rated-fragrance',
        },
        'Home fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/1F6466EFA3C0AEF546E16F4BD9B555257B69CE83B64EFF25E56A34C4291C7F38.png?meta=/BO056---Split-Banner-Personalisation-Test/homefrag.png',
          link: 'https://www.boots.com/fragrance/fragrance-home-fragrances',
        },
        'Fragrance exclusives': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/DD9FFA85985C960C134431E33EBC6DCA0842F2345CD66D30E29219854FD0B8F8.png?meta=/BO056---Split-Banner-Personalisation-Test/exclusive.png',
          link: 'https://www.boots.com/fragrance/fragrance-exclusives',
        },
      }
  }, 
  'fragrance': {
      title: 'Fragrance',
      innerText: "We've got everything from timeless classics to the latest celebrity fragrances.",
      link: 'https://www.boots.com/fragrance',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7AC849B3CD0CEB5F1EAF2F6600946A4B7FFEFFA49AEE99A6B49E1D2F7560E82A.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120258948_10158941015193832_1068737494197626486_o.jpg',
      innerLinks: {
        'Perfume': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/B4DB0A8488092240DA11327C60FD4958A2096950D183D982D9AB53AF8F8E93AD.png?meta=/BO056---Split-Banner-Personalisation-Test/perfume.png',
          link: 'https://www.boots.com/fragrance/perfume',
        },
        'Aftershave': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/52F6BD54A5E6DB3900CBD60CDE88EECB5EAD3B020B5F3989157A52E09AB5C594.png?meta=/BO056---Split-Banner-Personalisation-Test/aftershave.png',
          link: 'https://www.boots.com/fragrance/aftershave',
        },
        'Fragrance gift sets': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/18E7343FA641F329964FA79B23CE4E3A6FFC1EC5C3CD598726014709727F1AA8.png?meta=/BO056---Split-Banner-Personalisation-Test/fraggift.png',
          link: 'https://www.boots.com/fragrance/fragrance-gift-sets',
        },
        'Luxury fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D66A19566ECED6C4A4827C313484AACDF17E2960FF118191F982A8A365C39CCD.png?meta=/BO056---Split-Banner-Personalisation-Test/luxury.png',
          link: 'https://www.boots.com/fragrance/luxury-fragrance',
        },
        'Vegan fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/677F523AF5AFC6A0E828DEAD769B2CB751A9B1BA1129D11DCD166A4700579C75.png?meta=/BO056---Split-Banner-Personalisation-Test/vegan.png',
          link: 'https://www.boots.com/fragrance/vegan-fragrances',
        },
        'New in fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D684FD41F0EEDA5B0690E304EFFD08F2FB8E10169F524A8733812B650E2B858.png?meta=/BO056---Split-Banner-Personalisation-Test/newin.png',
          link: 'https://www.boots.com/fragrance/new-in-fragrance',
        },
        'Recommended': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8785B0CBBF4BDA482056E84062F73431955E5C7F2CADB2D650103BE0E990002E.png?meta=/BO056---Split-Banner-Personalisation-Test/recommended.png',
          link: 'https://www.boots.com/fragrance/recommended-fragrances',
        },
        'Celebrity fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/051C0693624EF6DD3E0B29ED26611A0FABAB29B43A35AB5F66599E486C3EBC04.png?meta=/BO056---Split-Banner-Personalisation-Test/celeb.png',
          link: 'https://www.boots.com/fragrance/celebrity-fragrance',
        },
        '5* rated perfumes & aftershaves': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FF70CA66B1E0765B8EA8F2634C21F7B8B1241BC039E633C5138852CCFC7462C7.png?meta=/BO056---Split-Banner-Personalisation-Test/5star.png',
          link: 'https://www.boots.com/fragrance/top-rated-fragrance',
        },
        'Home fragrance': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/1F6466EFA3C0AEF546E16F4BD9B555257B69CE83B64EFF25E56A34C4291C7F38.png?meta=/BO056---Split-Banner-Personalisation-Test/homefrag.png',
          link: 'https://www.boots.com/fragrance/fragrance-home-fragrances',
        },
        'Fragrance exclusives': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/DD9FFA85985C960C134431E33EBC6DCA0842F2345CD66D30E29219854FD0B8F8.png?meta=/BO056---Split-Banner-Personalisation-Test/exclusive.png',
          link: 'https://www.boots.com/fragrance/fragrance-exclusives',
        },
      },
      titleRight: 'Christmas',
      innerTextRight: 'However you’re spending Christmas this year, fill it with joy with our amazing range of gifts for all.',
      linkRight: 'https://www.boots.com/christmas/',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E91485AFE47EA8B37CC531856C1C8804A31B75B8D3B7D8A8BE79683491B80DBA.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120169211_10158941015838832_3445358241038450505_o.jpg',
      innerLinksRight: {
          '3 for 2 mix & match': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/60E0747F129448E0FFE0E65068D4FD8AF0734493938C7CB23921338DE9EF3F51.png?meta=/BO056---Split-Banner-Personalisation-Test/3for2xmas.png',
            link: 'https://www.boots.com/christmas/christmas-3-for-2',
          },
          'gifts for her': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FBC750A8372BC490E2D6F2F10CA18CD121CAD15A6477C4CDA735963B28F9887E.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforher.png',
            link: 'https://www.boots.com/christmas/gifts-for-her',
          },
          'gifts for him': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3C024324E4C404CF2ED40C3E21805DFD4C17440C90869DD2478DE3E7374542F1.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforhim.png',
            link: 'https://www.boots.com/christmas/gifts-for-him',
          },
          'gifts for kids': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3CDEC466A908C4B59D0187FA04311625ACA50B3D60C92BC8D6630A272C4A0B0.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforkids.png',
            link: 'https://www.boots.com/christmas/christmas-gifts-for-kids',
          },
          'gifts by type': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/69F890DDE43767F5DB335A391D88C57B35C2E09E3D4ADC2CC467BA7162EE4F71.png?meta=/BO056---Split-Banner-Personalisation-Test/gifttype.png',
            link: 'https://www.boots.com/christmas/gift-by-type',
          },
          'advent calendars': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6DE271159759B505517D8F0D95988B5C187C82021ED0CC66C4BD7002F1DF329.png?meta=/BO056---Split-Banner-Personalisation-Test/advent.png',
            link: 'https://www.boots.com/christmas/advent-calendars',
          },
          'star gifts': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3E6DEA92E1A971A3DDBDDDBF085D5896807E435F42796C1BDB42B0568B9EDDD5.png?meta=/BO056---Split-Banner-Personalisation-Test/stargifts.png',
            link: 'https://www.boots.com/christmas/christmas-weekly-offers',
          },
      },
  }, 
  'baby-child': {
      title: 'Baby & child',
      innerText: "Whether you’re a mum-to-be or already a proud parent, you’ll find everything you need in our mother and baby range.",
      link: 'https://www.boots.com/baby-child',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/239A1BE12915471D005B6559DD0709D023B238FB2892A481FB3B2D2561BD5B6A.jpg?meta=/BO056---Split-Banner-Personalisation-Test/26232960_10156012837598832_2806794506912920478_o.jpg',
      innerLinks: {
        'Baby event': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4D11A75B923539883E51A63BA25289FF59D2364F0198168CDF393187E2D5DA75.png?meta=/BO056---Split-Banner-Personalisation-Test/babyevent.png',
          link: 'https://www.boots.com/baby-child/baby-event'
        },
        'Offers': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0052A301EEB5976F8F951A0E7CDF4E4FF40FF82F3C7ADFFE651D254CAEF40328.png?meta=/BO056---Split-Banner-Personalisation-Test/babyoffers.png',
          link: 'https://www.boots.com/baby-child/baby-child-offers'
        },
      
        'Baby value packs & bundles': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/895AF7F61A19F982FDE76D13F2B732F4518F7AAE366136EF2ABC5CAD2A8EA276.png?meta=/BO056---Split-Banner-Personalisation-Test/babybundles.png',
          link: 'https://www.boots.com/baby-child/baby-value-packs-and-bundles'
        },
        'Clothing': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F2F4B5717196C94A45829A35137796163CEEADB9DE2B4F2B7557FCF1A5A67DFA.png?meta=/BO056---Split-Banner-Personalisation-Test/babyclothing.png',
          link: 'https://www.boots.com/baby-child/mothercare-clothing',
        },
        'Feeding': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9495681F214AE688628108F7830C7825146788E3754D7907F2306AF4EC7B564D.png?meta=/BO056---Split-Banner-Personalisation-Test/feeding.png',
          link: 'https://www.boots.com/baby-child/babyfeeding',
        },
        'Bathing & changing': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D4B6A75783CC1BE0ABEF24AFC0419F048682BEFE2CB6C1F0362ED91BC1B58F2.png?meta=/BO056---Split-Banner-Personalisation-Test/bathing.png',
          link: 'https://www.boots.com/baby-child/bathing-changing',
        },
        'Travel': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/140A876BFC473BBCBF53B0D1A492836FF4CAD48589B10A5B26211FC2781EBE84.png?meta=/BO056---Split-Banner-Personalisation-Test/babytravel.png',
          link: 'https://www.boots.com/baby-child/pushchairs-car-seats',
        },
        'Pregnancy & maternity': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E2D9AEC031FE431EB0D5C269EE8C796CE702E96B45288FE5A8D5259072DCC548.png?meta=/BO056---Split-Banner-Personalisation-Test/pregnancy.png',
          link: 'https://www.boots.com/baby-child/pregnancy-maternity',
        },
        'Nursery & bedding': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/933025852F8EEB96C83FBD3AECC08B20C8629A850EB446818734E6FA7676C15E.png?meta=/BO056---Split-Banner-Personalisation-Test/nursery.png',
          link: 'https://www.boots.com/baby-child/nursery-furniture',
        },
        'Toys': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/5500D354A266FC02A39E553B0647B247C9DBA9F1B608454C593166687E53890E.png?meta=/BO056---Split-Banner-Personalisation-Test/toys.png',
          link: 'https://www.boots.com/baby-child/toys/all-toys'
        },
        'Baby & child health': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D297319BC0BAFDB6ABECA1909E33F1BAE304B42291DF3D64BA05CEB6DC597D67.png?meta=/BO056---Split-Banner-Personalisation-Test/babyhealth.png',
          link: 'https://www.boots.com/baby-child/baby-child-health',
        },
        'New in baby & child': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D03A26CA9B033706DE8111E8F271337952F2CAC07DBA34AC805E627FD026FF7C.png?meta=/BO056---Split-Banner-Personalisation-Test/babynew.png',
          link: 'https://www.boots.com/baby-child/new-in-baby-child'
        }
      },
      titleRight: 'Toiletries',
      innerTextRight: 'Stock up on essentials or treat yourself to some indulgent skincare or bath products.',
      linkRight: 'https://www.boots.com/toiletries',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/075E5F95386C18597DF3ACE6A0F89EDB079761275FB6F61DD45D374248E8469C.jpg?meta=/BO056---Split-Banner-Personalisation-Test/26172211_10156004535568832_8259767074951849984_o.jpg',
      innerLinksRight: {
        'Hair': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/007D3E2B1A141A96FA13FFDC9208D449044931B0B1D3D6F3B1601105FEE8781D.png?meta=/BO056---Split-Banner-Personalisation-Test/hair.png',
          link: 'https://www.boots.com/toiletries/hair',
        },
        'Dental': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D71D237F003B2BD00C90EB4841CB84AE10CFA0C644614CEDC794B496193793B7.png?meta=/BO056---Split-Banner-Personalisation-Test/dental.png',
          link: 'https://www.boots.com/toiletries/bootsdental',
        },
        'Bathroom essentials': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4C0181A2469A2AD502E7D342A341D758401474F7F6F7DEE517A19F934E1BB5A7.png?meta=/BO056---Split-Banner-Personalisation-Test/essential.png',
          link: 'https://www.boots.com/toiletries/washing-bathing',
        },
        'Luxury bath & body': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9B0E11C1F374F3C86876777A1250B3E0D42BAE1E17FA4403D79FE4E131CD441C.png?meta=/BO056---Split-Banner-Personalisation-Test/luxbath.png',
          link: 'https://www.boots.com/toiletries/luxury-bath-body',
        
        },
        "Men's toiletries": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/BCDC378C68093BD2317C18042273207728E51C65F0E53A4572EC1551BF48EEAE.png?meta=/BO056---Split-Banner-Personalisation-Test/mens.png',
          link: 'https://www.boots.com/toiletries/mens-toiletries',
        },
        'Feminine hygiene': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7C2A64170F23DE992882E5FF443E4FC8C9B3F639BB00263762D034ABB18E3C42.png?meta=/BO056---Split-Banner-Personalisation-Test/femininehyg.png',
          link: 'https://www.boots.com/toiletries/feminine-hygiene',
        },
        'Suncare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/18CC5B307A5FDCB4A1EACAAE9C1AD32E7682B046CC6E7D0DBA15B866ED50E6D0.png?meta=/BO056---Split-Banner-Personalisation-Test/suncare.png',
          link: 'https://www.boots.com/toiletries/suncare'
        },
        'Fake & gradual tan': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3057F75FAFF12818B9B8D864ACE428005C80BA15C33B7E4659A77069C757AA3.png?meta=/BO056---Split-Banner-Personalisation-Test/faketan.png',
          link: 'https://www.boots.com/toiletries/fake-gradual-tan'
        },
        'Deodorants & antiperspirants': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/806F993CC583489A01C3FBD4C9F4F17B7902343CF91940069966DFD03D3DA2B2.png?meta=/BO056---Split-Banner-Personalisation-Test/deodrant.png',
          link: 'https://www.boots.com/toiletries/deodorants-antiperspirants'
        },
        'Female hair removal': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0CF40B47C73498F0FB149A30F84B7231791F7854B0059605AE6492EF7B312DBA.png?meta=/BO056---Split-Banner-Personalisation-Test/hairemoval.png',
          link: 'https://www.boots.com/toiletries/skincare-female-hair-removal',
        },
      },
  }, 
  'toiletries': {
      title: 'Toiletries',
      innerText: 'Stock up on essentials or treat yourself to some indulgent skincare or bath products.',
      link: 'https://www.boots.com/toiletries',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/075E5F95386C18597DF3ACE6A0F89EDB079761275FB6F61DD45D374248E8469C.jpg?meta=/BO056---Split-Banner-Personalisation-Test/26172211_10156004535568832_8259767074951849984_o.jpg',
      innerLinks: {
        'Hair': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/007D3E2B1A141A96FA13FFDC9208D449044931B0B1D3D6F3B1601105FEE8781D.png?meta=/BO056---Split-Banner-Personalisation-Test/hair.png',
          link: 'https://www.boots.com/toiletries/hair',
        },
        'Dental': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D71D237F003B2BD00C90EB4841CB84AE10CFA0C644614CEDC794B496193793B7.png?meta=/BO056---Split-Banner-Personalisation-Test/dental.png',
          link: 'https://www.boots.com/toiletries/bootsdental',
        },
        'Bathroom essentials': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4C0181A2469A2AD502E7D342A341D758401474F7F6F7DEE517A19F934E1BB5A7.png?meta=/BO056---Split-Banner-Personalisation-Test/essential.png',
          link: 'https://www.boots.com/toiletries/washing-bathing',
        },
        'Luxury bath & body': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9B0E11C1F374F3C86876777A1250B3E0D42BAE1E17FA4403D79FE4E131CD441C.png?meta=/BO056---Split-Banner-Personalisation-Test/luxbath.png',
          link: 'https://www.boots.com/toiletries/luxury-bath-body',
        
        },
        "Men's toiletries": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/BCDC378C68093BD2317C18042273207728E51C65F0E53A4572EC1551BF48EEAE.png?meta=/BO056---Split-Banner-Personalisation-Test/mens.png',
          link: 'https://www.boots.com/toiletries/mens-toiletries',
        },
        'Feminine hygiene': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7C2A64170F23DE992882E5FF443E4FC8C9B3F639BB00263762D034ABB18E3C42.png?meta=/BO056---Split-Banner-Personalisation-Test/femininehyg.png',
          link: 'https://www.boots.com/toiletries/feminine-hygiene',
        },
        'Suncare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/18CC5B307A5FDCB4A1EACAAE9C1AD32E7682B046CC6E7D0DBA15B866ED50E6D0.png?meta=/BO056---Split-Banner-Personalisation-Test/suncare.png',
          link: 'https://www.boots.com/toiletries/suncare'
        },
        'Fake & gradual tan': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3057F75FAFF12818B9B8D864ACE428005C80BA15C33B7E4659A77069C757AA3.png?meta=/BO056---Split-Banner-Personalisation-Test/faketan.png',
          link: 'https://www.boots.com/toiletries/fake-gradual-tan'
        },
        'Deodorants & antiperspirants': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/806F993CC583489A01C3FBD4C9F4F17B7902343CF91940069966DFD03D3DA2B2.png?meta=/BO056---Split-Banner-Personalisation-Test/deodrant.png',
          link: 'https://www.boots.com/toiletries/deodorants-antiperspirants'
        },
        'Female hair removal': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0CF40B47C73498F0FB149A30F84B7231791F7854B0059605AE6492EF7B312DBA.png?meta=/BO056---Split-Banner-Personalisation-Test/hairemoval.png',
          link: 'https://www.boots.com/toiletries/skincare-female-hair-removal',
        },
      },
      titleRight: 'Beauty & skincare',
      innerTextRight: 'Our beauty haul will let you put your best face forward whilst looking & feeling great.',
      linkRight: 'https://www.boots.com/beauty',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4F1B90C9545E1ECCBB2AE80278C4E7D43CA447D60167A6ADC1523ECEF30FF9A2.jpg?meta=/BO056---Split-Banner-Personalisation-Test/121138042_463541081264329_2442758708360645287_n.jpg',
      innerLinksRight: {
        'Offers': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/07B992B35FFD41E3F08B0828C088E08686DADD6798CBC8CCBAE74D4751CE11F7.png?meta=/BO056---Split-Banner-Personalisation-Test/offers-1.png',
          link: 'https://www.boots.com/beauty/beauty-skincare-offers',
        },
        'Premium beauty & skincare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/81C143DA2449C5D6F634F3D706928B9BA6284CCF4E6CBC26AE26A53365FAA71D.png?meta=/BO056---Split-Banner-Personalisation-Test/premium.png',
          link: 'https://www.boots.com/beauty/luxury-beauty-skincare',
        },
        'Make-up': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/7006057E3A361DF5C86B10E4A4C962E5C39B2F2ED87C64B001D723B52021204A.png?meta=/BO056---Split-Banner-Personalisation-Test/makeup.png',
          link: 'https://www.boots.com/beauty/makeup',
        
        },
        'Skincare': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/2F2C172D5094DD4EAA29F170258C5A6EE974A172A2A119024BD7F0DCDDCE6948.png?meta=/BO056---Split-Banner-Personalisation-Test/skincare.png',
          link: 'https://www.boots.com/beauty/skincare',
        
        },
        'Hair': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/334EDB9734EE1FD3B075CDCB07FCBA20466667B98E2827BB59FCF81C8F4D1FEE.png?meta=/BO056---Split-Banner-Personalisation-Test/hair-1.png',
          link: 'https://www.boots.com/beauty/hair',
        },
        'Accessories': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/AB772A5C44BEAA47E82ABF93F33BA4A840D62F4A21698E92C6346EF818BABE2D.png?meta=/BO056---Split-Banner-Personalisation-Test/accessories.png',
          link: 'https://www.boots.com/beauty/beauty-accessories',
        },
        'Beauty minis': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/158575C3DE6D14466A2AAE99D878E3801ED79C74BE8EEDC2D3771D0D79CF89CE.png?meta=/BO056---Split-Banner-Personalisation-Test/beautyminis.png',
          link: 'https://www.boots.com/beauty/travel-beauty-minis'
        },
        'Brands': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D7A1527698869401CA937B748EBCE4C888320EDF874D6B7B7A3228147063C64A.png?meta=/BO056---Split-Banner-Personalisation-Test/brands.png',
          link: 'https://www.boots.com/beauty/all-beauty-and-skincare-brands'
        },
        'New in': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6180B3AA103042436BF42DE1AF355793DC2044640A5AE8A1B31B0816E0FA85D.png?meta=/BO056---Split-Banner-Personalisation-Test/newin-2.png',
          link: 'https://www.boots.com/beauty/new-in-beauty-skincare'
        },
        'Top 10': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/094292653B1D5EDB4454DD1FF2AE488D43E1370AF8AB253E459D06503B7260C7.png?meta=/BO056---Split-Banner-Personalisation-Test/top10.png',
          link: 'https://www.boots.com/beauty/recommended',
        },
        'Vegan beauty': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0061A984756C8489D466132A637944AF5435BAE18323583292830FB101EE7120.png?meta=/BO056---Split-Banner-Personalisation-Test/veganbeaut.png',
          link: 'https://www.boots.com/beauty/vegan-range'
        }
      },
  }, 
  'electrical': {
      title: 'Electrical',
      innerText: "Whether you're looking for hair dryers or shavers, we've got the latest products from the biggest brands.",
      link: 'https://www.boots.com/electrical',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/A1E30805865DF2D256198F429E60AB55393DEECA621E0DF944095E8B7F4A2A16.jpg?meta=/BO056---Split-Banner-Personalisation-Test/re21092020-eb-dyson-50-airwrapdryergift-data.jpg',
      innerLinks: {
        'Hair styling tools': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/117790528DBC70480541CAB66B88B902B9198094BFD2395714BDDC4D0EE1E38D.png?meta=/BO056---Split-Banner-Personalisation-Test/hairstyling.png',
          link: 'https://www.boots.com/electrical/hair-styling-tools',
        },
        'Electrical dental': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CCD2411C69FB946F22BAC1D1ACF9A7AD74D94F0BAC5508D9A7F324119A200105.png?meta=/BO056---Split-Banner-Personalisation-Test/electdental.png',
          link: 'https://www.boots.com/electrical/electrical-dental',
        },
        'Female hair removal tools': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/CF624C43521A4976E1692487DB22B9809554D3C52F5CD990DD1438BF57056159.png?meta=/BO056---Split-Banner-Personalisation-Test/elechairremoval.png',
          link: 'https://www.boots.com/electrical/female-hair-removal-tools',
        
        },
        'Male grooming tools': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/48EC4687F0D46F57B51707F0FEE6A4953C73B7DE2F5801287FAF9573EF0FBBA0.png?meta=/BO056---Split-Banner-Personalisation-Test/malegrooming.png',
          link: 'https://www.boots.com/electrical/male-grooming-tools',
        
        },
        'Beauty tools': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/8D818D6F75828B30D91D55985D8B319975785A23635D01DDE40D7946587602C8.png?meta=/BO056---Split-Banner-Personalisation-Test/beautytool.png',
          link: 'https://www.boots.com/electrical/beauty-tools',
        },
        'Electrical wellbeing': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/EACA650E697C4029B2D9833FD5DE9FAB5C8C49631590C6A8BDE47FF0409C41CA.png?meta=/BO056---Split-Banner-Personalisation-Test/elecwellbeing.png',
          link: 'https://www.boots.com/electrical/electrical-wellbeing',
        },
        'Electrical health & diagnostics': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/6188426A50CBEDB964CB23A79000CD71000E235AC44FBBA3F415AAF3C1C7A214.png?meta=/BO056---Split-Banner-Personalisation-Test/healthdiagnostic.png',
          link: 'https://www.boots.com/electrical/electrical-health-diagnostics'
        },
        'Audio & visual tech': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/19A10AE6CCBB920707943179FA5D231E46B98C95F98C0471A2F8A49E3EA0A391.png?meta=/BO056---Split-Banner-Personalisation-Test/audiovisual.png',
          link: 'https://www.boots.com/electrical/headphones-cameras-accessories'
        },
        'New in': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/9E866C3817D2AFADC7B0DC373B1927EA5B4CB90D3CE43DD65A542522BAB5940C.png?meta=/BO056---Split-Banner-Personalisation-Test/new.png',
          link: 'https://www.boots.com/electrical/new-in-electrical'
        },
      },
      titleRight: 'Christmas',
      innerTextRight: 'However you’re spending Christmas this year, fill it with joy with our amazing range of gifts for all.',
      linkRight: 'https://www.boots.com/christmas/',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E91485AFE47EA8B37CC531856C1C8804A31B75B8D3B7D8A8BE79683491B80DBA.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120169211_10158941015838832_3445358241038450505_o.jpg',
      innerLinksRight: {
          '3 for 2 mix & match': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/60E0747F129448E0FFE0E65068D4FD8AF0734493938C7CB23921338DE9EF3F51.png?meta=/BO056---Split-Banner-Personalisation-Test/3for2xmas.png',
            link: 'https://www.boots.com/christmas/christmas-3-for-2',
          },
          'gifts for her': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FBC750A8372BC490E2D6F2F10CA18CD121CAD15A6477C4CDA735963B28F9887E.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforher.png',
            link: 'https://www.boots.com/christmas/gifts-for-her',
          },
          'gifts for him': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3C024324E4C404CF2ED40C3E21805DFD4C17440C90869DD2478DE3E7374542F1.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforhim.png',
            link: 'https://www.boots.com/christmas/gifts-for-him',
          },
          'gifts for kids': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3CDEC466A908C4B59D0187FA04311625ACA50B3D60C92BC8D6630A272C4A0B0.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforkids.png',
            link: 'https://www.boots.com/christmas/christmas-gifts-for-kids',
          },
          'gifts by type': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/69F890DDE43767F5DB335A391D88C57B35C2E09E3D4ADC2CC467BA7162EE4F71.png?meta=/BO056---Split-Banner-Personalisation-Test/gifttype.png',
            link: 'https://www.boots.com/christmas/gift-by-type',
          },
          'advent calendars': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6DE271159759B505517D8F0D95988B5C187C82021ED0CC66C4BD7002F1DF329.png?meta=/BO056---Split-Banner-Personalisation-Test/advent.png',
            link: 'https://www.boots.com/christmas/advent-calendars',
          },
          'star gifts': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3E6DEA92E1A971A3DDBDDDBF085D5896807E435F42796C1BDB42B0568B9EDDD5.png?meta=/BO056---Split-Banner-Personalisation-Test/stargifts.png',
            link: 'https://www.boots.com/christmas/christmas-weekly-offers',
          },
      },
  }, 
  'mens': {
      title: 'Mens',
      innerText: "Looking good and feeling great has never been easier, from shaving and clippers to men's fragrance, you'll find it all at Boots.",
      link: 'https://www.boots.com/mens',
      image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/28AB0855992A0972C61D2CFC69AA285C9B47333ED377B8610A8F69A2DD774558.jpg?meta=/BO056---Split-Banner-Personalisation-Test/18921026_10155369584383832_1500347153570450761_o.jpg',
      innerLinks: {
        "Men's toiletries": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/1B5AEED9124DBB4978A65C09A44036502D235796ADCD5C89007A5851A9B17D57.png?meta=/BO056---Split-Banner-Personalisation-Test/mentoiletries.png',
          link: 'https://www.boots.com/mens/mens-toiletries',
        },
        "Men's value packs & bundles": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3F980E3C207AB16EC221FDFE100EF536D94C9E036835FAF4ACFE470183D4BE75.png?meta=/BO056---Split-Banner-Personalisation-Test/menbundle.png',
          link: 'https://www.boots.com/mens/mens-value-packs-and-bundles',
        },
        'Shaving & grooming': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4F871B449D84415B7153AC686EE2ABC2F76DD6F100F4C8FD33B9A4355C092862.png?meta=/BO056---Split-Banner-Personalisation-Test/menshaving.png',
          link: 'https://www.boots.com/mens/shaving-grooming',
        
        },
        "Men's skincare & body": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/63DF69D33493669FF9BC115A74F4C0E2A0FF9EF399E81698039787379DEFBF21.png?meta=/BO056---Split-Banner-Personalisation-Test/menskincare.png',
          link: 'https://www.boots.com/mens/skincare-body',
        
        },
        'Male grooming tools': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/65A3D96C6A45F9F793F695E0782824EB52588A5DD75E082A1D0B1D42E61E2E21.png?meta=/BO056---Split-Banner-Personalisation-Test/groomingtool.png',
          link: 'https://www.boots.com/mens/male-grooming-tools',
        },
        'Male incontinence': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/A7626000ACF666F6DD9C55374185B28244EF91FF028BD045019E3C4BC4AEB092.png?meta=/BO056---Split-Banner-Personalisation-Test/incontinence.png',
          link: 'https://www.boots.com/mens/male-incontinence',
        },
        "Men's health": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/C2F317F7943DA38048F0F7907105812CAD81925CAF34D55230DF06807209A49C.png?meta=/BO056---Split-Banner-Personalisation-Test/menhealth.png',
          link: 'https://www.boots.com/mens/menshealth'
        },
        'Aftershave': {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/0DBE551C829BB71D4DB5C3C2B8B11A117DB2CD9E473FA1DCED722655F9C59EFA.png?meta=/BO056---Split-Banner-Personalisation-Test/aftershave-1.png',
          link: 'https://www.boots.com/mens/aftershave'
        },
        "Men's gift sets": {
          icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/AD9CD504AFB4083EF451590F4C532F38B8D81F1D0A459A3D58CEE58689B88ABE.png?meta=/BO056---Split-Banner-Personalisation-Test/mengiftset.png',
          link: 'https://www.boots.com/mens/mens-gift-sets'
        },
      },
      titleRight: 'Christmas',
      innerTextRight: 'However you’re spending Christmas this year, fill it with joy with our amazing range of gifts for all.',
      linkRight: 'https://www.boots.com/christmas/',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E91485AFE47EA8B37CC531856C1C8804A31B75B8D3B7D8A8BE79683491B80DBA.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120169211_10158941015838832_3445358241038450505_o.jpg',
      innerLinksRight: {
          '3 for 2 mix & match': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/60E0747F129448E0FFE0E65068D4FD8AF0734493938C7CB23921338DE9EF3F51.png?meta=/BO056---Split-Banner-Personalisation-Test/3for2xmas.png',
            link: 'https://www.boots.com/christmas/christmas-3-for-2',
          },
          'gifts for her': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FBC750A8372BC490E2D6F2F10CA18CD121CAD15A6477C4CDA735963B28F9887E.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforher.png',
            link: 'https://www.boots.com/christmas/gifts-for-her',
          },
          'gifts for him': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3C024324E4C404CF2ED40C3E21805DFD4C17440C90869DD2478DE3E7374542F1.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforhim.png',
            link: 'https://www.boots.com/christmas/gifts-for-him',
          },
          'gifts for kids': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3CDEC466A908C4B59D0187FA04311625ACA50B3D60C92BC8D6630A272C4A0B0.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforkids.png',
            link: 'https://www.boots.com/christmas/christmas-gifts-for-kids',
          },
          'gifts by type': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/69F890DDE43767F5DB335A391D88C57B35C2E09E3D4ADC2CC467BA7162EE4F71.png?meta=/BO056---Split-Banner-Personalisation-Test/gifttype.png',
            link: 'https://www.boots.com/christmas/gift-by-type',
          },
          'advent calendars': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6DE271159759B505517D8F0D95988B5C187C82021ED0CC66C4BD7002F1DF329.png?meta=/BO056---Split-Banner-Personalisation-Test/advent.png',
            link: 'https://www.boots.com/christmas/advent-calendars',
          },
          'star gifts': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3E6DEA92E1A971A3DDBDDDBF085D5896807E435F42796C1BDB42B0568B9EDDD5.png?meta=/BO056---Split-Banner-Personalisation-Test/stargifts.png',
            link: 'https://www.boots.com/christmas/christmas-weekly-offers',
          },
      },
  }, 
  'gift': {
    title: 'Gift',
    innerText: "Whether you’re looking for a birthday treat or simply fancy making a loved one’s day, we have a huge range of gifts to show them you know them.",
    link: 'https://www.boots.com/gift',
    image: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/81C31F772DB59A7A48B1956CAD7AB214EB09B615FB7858E8994B2D8FE1F26D59.jpg?meta=/BO056---Split-Banner-Personalisation-Test/gift.jpg',
    innerLinks: {
      "Gifts for her": {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/D6F9061AE5EFF8B0011D8532E37E4481C40C51F9EE7F4DAD6099FBC821935122.png?meta=/BO056---Split-Banner-Personalisation-Test/gifther.png',
        link: 'https://www.boots.com/gift/her',
      },
      "Gifts for him": {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/2407ED3634F8900BE831705E3DD45A893413937DB03F70A4F327EF4256337FD5.png?meta=/BO056---Split-Banner-Personalisation-Test/gifthim.png',
        link: 'https://www.boots.com/gift/him',
      },
      'Candles & home fragrance': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E076B85648CFB2825C66F90D75F3B8EA70332C5E99B26E57AA8DBF0D02D1CF4A.png?meta=/BO056---Split-Banner-Personalisation-Test/candles.png',
        link: 'https://www.boots.com/gift/candles-home-fragrance-for-her',
      
      },
      "Experience days": {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/1F8219B45DC07B058D29483BE8EB8DBB0536E2C6C12EFA0906B1C12DC0135D58.png?meta=/BO056---Split-Banner-Personalisation-Test/experienceday.png',
        link: 'https://www.boots.com/gift/experience-days',
      
      },
      'Personalised photo gifts': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/4DB0A963ECFE530BE62D0475996DF8592AA6D3D1DEB152EBA5EE4AD57D9ADCDB.png?meta=/BO056---Split-Banner-Personalisation-Test/photogift.png',
        link: 'https://www.boots.com/gift/personalised-photo-gifts',
      },
      'Birthday gifts': {
        icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/122B8B758BF5296AEFA25494CF64B6FF0C89AC2FD890CDCD1F9A0F5510F92AD8.png?meta=/BO056---Split-Banner-Personalisation-Test/birthday.png',
        link: 'https://www.boots.com/gift/birthday-gifts',
      },
    },
    titleRight: 'Christmas',
      innerTextRight: 'However you’re spending Christmas this year, fill it with joy with our amazing range of gifts for all.',
      linkRight: 'https://www.boots.com/christmas/',
      imageRight: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/E91485AFE47EA8B37CC531856C1C8804A31B75B8D3B7D8A8BE79683491B80DBA.jpg?meta=/BO056---Split-Banner-Personalisation-Test/120169211_10158941015838832_3445358241038450505_o.jpg',
      innerLinksRight: {
          '3 for 2 mix & match': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/60E0747F129448E0FFE0E65068D4FD8AF0734493938C7CB23921338DE9EF3F51.png?meta=/BO056---Split-Banner-Personalisation-Test/3for2xmas.png',
            link: 'https://www.boots.com/christmas/christmas-3-for-2',
          },
          'gifts for her': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/FBC750A8372BC490E2D6F2F10CA18CD121CAD15A6477C4CDA735963B28F9887E.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforher.png',
            link: 'https://www.boots.com/christmas/gifts-for-her',
          },
          'gifts for him': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3C024324E4C404CF2ED40C3E21805DFD4C17440C90869DD2478DE3E7374542F1.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforhim.png',
            link: 'https://www.boots.com/christmas/gifts-for-him',
          },
          'gifts for kids': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F3CDEC466A908C4B59D0187FA04311625ACA50B3D60C92BC8D6630A272C4A0B0.png?meta=/BO056---Split-Banner-Personalisation-Test/giftforkids.png',
            link: 'https://www.boots.com/christmas/christmas-gifts-for-kids',
          },
          'gifts by type': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/69F890DDE43767F5DB335A391D88C57B35C2E09E3D4ADC2CC467BA7162EE4F71.png?meta=/BO056---Split-Banner-Personalisation-Test/gifttype.png',
            link: 'https://www.boots.com/christmas/gift-by-type',
          },
          'advent calendars': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/F6DE271159759B505517D8F0D95988B5C187C82021ED0CC66C4BD7002F1DF329.png?meta=/BO056---Split-Banner-Personalisation-Test/advent.png',
            link: 'https://www.boots.com/christmas/advent-calendars',
          },
          'star gifts': {
            icon: 'https://service.maxymiser.net/cm/images-eu/new-boots-com/3E6DEA92E1A971A3DDBDDDBF085D5896807E435F42796C1BDB42B0568B9EDDD5.png?meta=/BO056---Split-Banner-Personalisation-Test/stargifts.png',
            link: 'https://www.boots.com/christmas/christmas-weekly-offers',
          },
    },
}, 
}

export const bannerDataMarkup = () => {
    const lastCat = getLastCategory();
    const matchingObj = categories[lastCat];
  
    // get department
    const lastDepartment = getLastDepartment();

    
    let lastDepartmentName = '';

    if(getLastDepartment()) {
      lastDepartmentName = lastDepartment.replace(/-/g, ' ');
    } 

    const leftBanner = 
    `<div class="${ID}_bannerContent" style="background-image: url(${matchingObj.image})">
        <div class="${ID}_textBlock">
            <h2>${matchingObj.title}</h2>
            <p>${matchingObj.innerText}</p>
            <a class="${ID}__button ${ID}__blue" href="${matchingObj.link}">Shop ${matchingObj.title.toLowerCase()}</a>
            ${lastDepartmentName !== '' ? `<a class="${ID}__button ${ID}__blue ${ID}-department" href="/${lastDepartment}">Shop ${lastDepartmentName}</a>` : ''}
        </div>
    </div>
    <div class="${ID}_categoryBar ${ID}_carousel">
    <h3></h3>
        <div class="${ID}_categoriesInner">
            <div class="${ID}_categories"></div>
        </div>
    </div>`;

    const rightBanner = 
    `<div class="${ID}_bannerContent">
        <div class="${ID}_textBlock">
            <h2>${matchingObj.offerHeading}</h2>
            <p>${matchingObj.offerText}</p>
            <a class="${ID}__textLink" href="${matchingObj.offerLink}">Shop now</a>
        </div>
    </div>`;

    const rightBannerBlock = document.querySelector(`.${ID}_rightCategory`);
    const leftBannerBlock = document.querySelector(`.${ID}_leftCategory`);

    leftBannerBlock.innerHTML = leftBanner;
    rightBannerBlock.innerHTML = rightBanner;
    rightBannerBlock.style = `background-color: ${matchingObj.offerColour}`;

     
    // create the carousel items
    Object.keys(matchingObj.innerLinks).forEach((i) => {
        const catItem = matchingObj.innerLinks[i];
                
        const carouselItem = document.createElement('div');
        carouselItem.classList.add(`${ID}_category`);

        carouselItem.innerHTML = `
            <div class="${ID}_categoryIcon">
                <a href="${catItem.link}"></a>
                <span style="background-image:url(${catItem.icon})"></span>
                <p>${[i][0]}</p>
            </div>`;

        leftBannerBlock.querySelector(`.${ID}_categories`).appendChild(carouselItem);
    });

}

export const bannerDataMarkupV2 = () => {
  const lastCat = getLastCategory();
  const matchingObj = categoriesV2[lastCat];

  // get department
  const lastDepartment = getLastDepartment();

  
  let lastDepartmentName = '';

  if(getLastDepartment()) {
    lastDepartmentName = lastDepartment.replace(/-/g, ' ');
  } 

  const leftBanner = 
  `<div class="${ID}_bannerContent" style="background-image: url(${matchingObj.image})">
      <div class="${ID}_textBlock">
          <h2>${matchingObj.title}</h2>
          <p>${matchingObj.innerText}</p>
          <a class="${ID}__button ${ID}__blue" href="${matchingObj.link}">Shop ${matchingObj.title.toLowerCase()}</a>
          ${lastDepartmentName !== '' ? `<a class="${ID}__button ${ID}__blue ${ID}-department" href="/${lastDepartment}">Shop ${lastDepartmentName}</a>` : ''}
      </div>
  </div>
  <div class="${ID}_categoryBar ${ID}_carousel">
  <h3></h3>
      <div class="${ID}_categoriesInner">
          <div class="${ID}_categories"></div>
      </div>
  </div>`;

  const rightBanner = 
  `<div class="${ID}_bannerContent" style="background-image: url(${matchingObj.imageRight})">
    <div class="${ID}_textBlock">
        <h2>${matchingObj.titleRight}</h2>
        <p>${matchingObj.innerTextRight}</p>
        <a class="${ID}__button ${ID}__blue" href="${matchingObj.linkRight}">Shop ${matchingObj.titleRight.toLowerCase()}</a>
    </div>
  </div>
  <div class="${ID}_categoryBar ${ID}_carousel">
  <h3></h3>
    <div class="${ID}_categoriesInner">
        <div class="${ID}_categories"></div>
    </div>
  </div>`;

  const rightBannerBlock = document.querySelector(`.${ID}_rightCategory`);
  const leftBannerBlock = document.querySelector(`.${ID}_leftCategory`);
  rightBannerBlock.className = `${ID}_leftCategory ${ID}_maincategory ${ID}_right`;

  leftBannerBlock.innerHTML = leftBanner;
  rightBannerBlock.innerHTML = rightBanner;

   
  // create the carousel items
  Object.keys(matchingObj.innerLinks).forEach((i) => {
      const catItem = matchingObj.innerLinks[i];
              
      const carouselItem = document.createElement('div');
      carouselItem.classList.add(`${ID}_category`);

      carouselItem.innerHTML = `
          <div class="${ID}_categoryIcon">
              <a href="${catItem.link}"></a>
              <span style="background-image:url(${catItem.icon})"></span>
              <p>${[i][0]}</p>
          </div>`;

      leftBannerBlock.querySelector(`.${ID}_categories`).appendChild(carouselItem);
  });

  Object.keys(matchingObj.innerLinksRight).forEach((i) => {
    const catItem = matchingObj.innerLinksRight[i];
            
    const carouselItem = document.createElement('div');
    carouselItem.classList.add(`${ID}_category`);

    carouselItem.innerHTML = `
        <div class="${ID}_categoryIcon">
            <a href="${catItem.link}"></a>
            <span style="background-image:url(${catItem.icon})"></span>
            <p>${[i][0]}</p>
        </div>`;

    rightBannerBlock.querySelector(`.${ID}_categories`).appendChild(carouselItem);
});

}
export const slickOuterCarousel = () => {
  window.jQuery(`.${ID}_bannerOuter`).slick({
      slidesToShow: 1,
      infinite: false,
      arrows: true,
      draggable: false,
      swipeToSlide: false,
      swipe: false,
      swipeToSlide: false,
      draggable: false,
      mobileFirst: true,
      responsive: [
          {
              breakpoint: 767,
              settings: "unslick"
          },
      ]
  });
}

export const slickSmallCategories = () => {
  window.jQuery(`.${ID}_categoriesInner .${ID}_categories`).slick({
      slidesToShow: 3,
      infinite: true,
      arrows: true,
      responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1008,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: "unslick"
          }

        ]
  });
}



