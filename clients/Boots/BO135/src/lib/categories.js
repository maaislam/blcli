import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { scrollToElement } from "./helpers";

const { ID } = shared;

export default () => {
    
    const categoryData = {
        'a': {

            "activity trackers": {
                "link": "https://www.boots.com/wellness/activity-trackers-1"
            },
            "a day the life of Steph Houghton": {
                "link": "https://www.boots.com/womens-football/day-in-the-life-of-steph-houghton"
            },
            "advanced ingredients capsules": {
                "link": "https://www.boots.com/no7-skincare/no7-advanced-ingredients"
            },
            "adult toys": {
                "link": "/health-pharmacy/condoms-sexual-health/adult-toys"
            },
            "advent calendars": {
                "link": "/shop-all-advent-calendars"
            },
            "aftershave": {
                "link": "/fragrance/aftershave/mens-aftershave"
            }, 	
            "all value packs & bundles": {
                "link": "https://www.boots.com/value-packs-and-bundles/all-value-packs-and-bundles"
            },
            "all vegan products": {
                "link": "https://www.boots.com/wellness/all-vegan-products"
            },
            "anti-ageing serums": {
                "link": "https://www.boots.com/no7-skincare/no7-skincare-serums"
            },
            "anti-ageing skincare": {
                "link": "https://www.boots.com/no7-skincare/no7-skincare-anti-ageing-skincare"
            },
            "antibacterial & disinfectants": {
                "link": "https://www.boots.com/health-pharmacy/hand-sanitiser-antibacterial-cleaners-disinfectants"
            },
            "appointment booking": {
                "link": "https://www.boots.com/appointment-booking"
            },
            "At-Home COVID-19 Testing Kits": {
                "link": "https://www.boots.com/covid-19-testing/covid-19-at-home-testing-kits"
            },
        },
        'b': {

            "baby & child offers": {
                "link": "https://www.boots.com/baby-child-offers"
            },
            "baby & child sale": {
                "link": "/sale/baby-child-sale"
            },
            "baby and child savings": {
                "link": "https://www.boots.com/savings/baby-and-child-savings"
            },
            "Baby & child toiletries": {
                "link": "/baby-child/bathing-changing/baby-child-toiletries"
            },
            "baby and kids' clothing": {
                "link": "/baby-child/mothercare-clothing/shop-all-baby-kids-clothing"
            },
            "baby event": {
                "link": "https://www.boots.com/baby-child/baby-event"
            },
            "baby food and weaning": {
                "link": "/baby-child/babyfeeding/baby-food-weaning"
            },
            "baby clothes 0-24 months": {
                "link": "/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months"
            },
            "baby milk & formula": {
                "link": "/baby-child/babyfeeding/baby-milk-formula"
            },
            "baby wipes": {
                "link": "https://www.boots.com/baby-child/bathing-changing/baby-wipes"
            },
            "baby value packs & bundles": {
                "link": "https://www.boots.com/baby-child/baby-value-packs-and-bundles"
            },
            "bath & body": {
                "link": "https://www.boots.com/no7-bath-body"
            },
            "bath & body": {
                "link": "https://www.boots.com/no7/no7-bath-body"
            },
            "bb cream": {
                "link": "https://www.boots.com/beauty/makeup/face/bb-cream"
            },
            "beauty & skincare offers": {
                "link": "https://www.boots.com/beauty/beauty-skincare-offers"
            },
            "beauty & skincare brands": {
                "link": "https://www.boots.com/beauty/all-beauty-and-skincare-brands"
            },
            "beauty minis": {
                "link": "https://www.boots.com/beauty/travel-beauty-minis"
            },
            "beauty savings": {
                "link": "https://www.boots.com/savings/beauty-savings"
            },
            "beauty supplements": {
                "link": "https://www.boots.com/wellness/beautysupplements"
            },
            "beauty value packs & bundles": {
                "link": "https://www.boots.com/beauty/beauty-value-packs-and-bundles"
            },
            "beauty value packs & bundles": {
                "link": "https://www.boots.com/value-packs-and-bundles/beauty-value-packs-and-bundles"
            },
            "best christmas gifts": {
                "link": "https://www.boots.com/christmas/best-christmas-gifts"
            },
            "birthday gifts": {
                "link": "https://www.boots.com/gift/birthday-gifts"
            },
            "black friday": {
                "link": "https://www.boots.com/seasonal/black-friday"
            },
            "blood pressure monitor": {
                "link": "https://www.boots.com/health-pharmacy/electrical-health-diagnostics/blood-pressure-monitors"
            },
            "body wash": {
                "link": "https://www.boots.com/toiletries/washing-bathing/shower-gel"
            },
            "body scrub": {
                "link": "https://www.boots.com/toiletries/washing-bathing/body-scrub"
            },
            "book an eye test": {
                "link": "https://www.boots.com/opticians/eyetest"
            },
            "Boots Beauty Specialists": {
                "link": "https://www.boots.com/boots-beauty-specialists"
            },
            "Boots Care Services": {
                "link": "https://www.boots.com/boots-for-business/carehomeservices"
            },
            "Boots Parenting Club": {
                "link": "https://www.boots.com/parentingadvice/parenting-club"
            },
            "brand A-Z": {
                "link": "https://www.boots.com/brands"
            },
            "bronzer": {
                "link": "https://www.boots.com/beauty/makeup/face/bronzer"
            },
            "brows": {
                "link": "https://www.boots.com/no7-make-up/no7-make-up-brows"
            },
        },
        'c': {
            "car seats & accessories": {
                "link": "/baby-child/pushchairs-car-seats/car-seats-accessories"
            },
            "candles & home fragrance": {
                "link": "https://www.boots.com/gift/candles-home-fragrance-for-her"
            },
            "caring for your glasses": {
                "link": "https://www.boots.com/opticians-advice/glasses-cleaning-and-maintenance"
            },
            "CBD": {
                "link": "https://www.boots.com/wellness/cannabidiol-cbd-oil"
            },
            "celebrity fragrance": {
                "link": "https://www.boots.com/fragrance/celebrity-fragrance"
            },
            "cerave moisturiser": {
                "link": "https://www.boots.com/sitesearch?searchTerm=cerave%20moisturiser"
            },
            "changing bags & mats": {
                "link": "/baby-child/bathing-changing/changing-bags-mats"
            },
        
            "Children in Need": {
                "link": "https://www.boots.com/seasonal/children-in-need"
            },
            "christmas": {
                "link": "/all-christmas"
            },
            "christmas 3 for 2": {
                "link": "/christmas/christmas-3-for-2"
            },
            "christmas gifts for her": {
                "link": "/christmas/gifts-for-her/all-christmas-gifts-for-her"
            },
            "christmas gifts for him": {
                "link": "/christmas/gifts-for-him/all-christmas-gifts-for-him"
            },
            "christmas gifts for kids": {
                "link": "/christmas/christmas-gifts-for-kids/all-christmas-gifts-for-kids"
            },
            "christmas weekly offers": {
                "link": "/christmas-weekly-offers"
            },

            "cleansers & toners": {
                "link": "https://www.boots.com/no7-skincare/no7-skincare-cleansers-toners"
            },
            "clearance": {
                "link": "https://www.boots.com/bootsclearance/all-clearance"
            },
            "collagen": {
                "link": "https://www.boots.com/sitesearch?searchTerm=collagen&sortBy=Bestseller"
            },
            "colleague heroes": {
                "link": "https://www.boots.com/opticians-advice/boots-opticians-colleague-hero"
            },
            "Complete Satisfaction Guarantee": {
                "link": "https://www.boots.com/opticians-service/opticians-complete-satisfaction-guarantee"
            },
            "Concealer & correctors": {
                "link": "/beauty/makeup/face/concealer-correctors"
            },
            "condoms": {
                "link": "https://www.boots.com/health-pharmacy/condoms-sexual-health/condoms"
            },
            "contact lense solution": {
                "link": "https://www.boots.com/sitesearch?searchTerm=contact%20lens%20solution"
            },
            "Corporate DTP Vaccination Service": {
                "link": "https://www.boots.com/boots-for-business/corporate-dtp"
            },
            "corporate eyecare": {
                "link": "https://www.boots.com/boots-for-business/corporateeyecare"
            },
            "Corporate Flu Vaccination Service": {
                "link": "https://www.boots.com/boots-for-business/corporate-flu-jab-service"
            },
            "Corporate Giftcards": {
                "link": "https://www.boots.com/boots-for-business/business-giftcards"
            },
            "Corporate Hepatitis A Vaccination Service": {
                "link": "https://www.boots.com/boots-for-business/hepatitisa"
            },
            "Corporate Hepatitis B Vaccination Service": {
                "link": "https://www.boots.com/boots-for-business/corporate-hepb"
            },
            "Corporate Pneumonia Vaccination Service": {
                "link": "https://www.boots.com/boots-for-business/pneumovac"
            },
            "corporate travel health": {
                "link": "https://www.boots.com/boots-for-business/corporatetravel"
            },
            "cotton buds": {
                "link": "https://www.boots.com/sitesearch?searchTerm=cotton%20buds"
            },
            "cotton pads": {
                "link": "https://www.boots.com/sitesearch?searchTerm=cotton%20pads"
            },
            "Cough, cold & flu": {
                "link": "/health-pharmacy/medicines-treatments/cold-flu-medication"
            },
            
            "COVID-19 PCR Testing Service": {
                "link": "https://www.boots.com/covid-19-testing/covid-19-testing-service"
            },
            "cyber monday": {
                "link": "https://www.boots.com/seasonal/cyber-Monday"
            },
        },
        'd': {
            "Day 2 and Day 2 & 8 COVID-19 Post Travel Testing Service": {
                "link": "https://www.boots.com/covid-19-testing/day-2-day-8-covid-19-testing"
            },
            "deodorants & antiperspirants": {
                "link": "https://www.boots.com/toiletries/deodorants-antiperspirants"
            },
            "deodorant womens": {
                "link": "https://www.boots.com/sitesearch?searchTerm=deodorant%20womens"
            },
            "dewy blusher make-up tutorial": {
                "link": "https://www.boots.com/glamour-beauty/blusher-makeup-tutorial"
            },
            "digestive health": {
                "link": "https://www.boots.com/wellness/digestive-health"
            },
            "discover no7 advanced ingredients capsules": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/no7-advanced-ingredients-capsules-"
            },
            "discover no7 laboratories": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/no7-laboratories-explained"
            },
            "discover no7 line correcting booster serum": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/discover-no7-line-correcting-booster-serum"
            },
            "dry shampoo": {
                "link": "https://www.boots.com/sitesearch?searchTerm=dry%20shampoo"
            },
        },
        'e': {
            "early defence": {
                "link": "https://www.boots.com/no7-skincare/no7-skincare-early-defence"
            },
            "Eid gifts": {
                "link": "https://www.boots.com/seasonal/eid-gifting"
            },
            "electrical beauty savings": {
                "link": "https://www.boots.com/savings/electrical-beauty-savings"
            },
            "electrical sale": {
                "link": "https://www.boots.com/bootsclearance/electrical-clearance"
            },
            "electrical price match promise": {
                "link": "https://www.boots.com/electrical/price-match-promise"
            },
            "electrical offers": {
                "link": "https://www.boots.com/electrical-offers"
            },
            "electrical offers": {
                "link": "https://www.boots.com/electrical/electrical-offers"
            },
            "electrical value packs & bundles": {
                "link": "https://www.boots.com/value-packs-and-bundles/electrical-value-packs-and-bundles"
            },
            "electric beauty tools": {
                "link": "https://www.boots.com/electrical-inspiration-and-advice/must-have-beauty-tools"
            },
            "Electric toothbrushes": {
                "link": "/electrical/electrical-dental/electric-toothbrushes"
            },

            "electric toothbrush buyer's guide": {
                "link": "https://www.boots.com/electrical-inspiration-and-advice/electric-toothbrushes-buyers-guide"
            },
            "energy support": {
                "link": "https://www.boots.com/wellness/supplements-for-energy"
            },
            "Estee Lauder Double Wear": {
                "link": "https://www.boots.com/sitesearch?searchTerm=estee%20lauder%20double%20wear"
            },
             "expert skincare & treatments": {
                "link": "/beauty/skincare/expert-skincare-"
            },
            "everyday low prices": {
                "link": "https://www.boots.com/fragrance-offers/fragrance-offers-every-day-low-prices"
            },
            "everyday stress": {
                "link": "https://www.boots.com/wellness/everyday-stress"
            },
            "eyebrow tips with maybelline": {
                "link": "https://www.boots.com/glamour-beauty/eyebrow-tips"
            },
            "eyes": {
                "link": "https://www.boots.com/no7-make-up/no7-make-up-eyes"
            },
            "eye cream": {
                "link": "https://www.boots.com/beauty/skincare/facial-skincare/eye-cream"
            },
            "eyeliner": {
                "link": "/beauty/makeup/eyes/eye-liner"
            },
            "eye drops": {
                "link": "https://www.boots.com/sitesearch?searchTerm=eye%20drops"
            },
            "eye makeup": {
                "link": "/beauty/makeup/eyes"
            },
            "eye palettes": {
                "link": "/beauty/makeup/eyes/eye-palettes"
            },
            "eye test": {
                "link": "/opticians/eyetest"
            },
            "eyebrow makeup": {
                "link": "/beauty/makeup/eyebrows"
            },
        },
        'f': {
            "face": {
                "link": "https://www.boots.com/no7-make-up/no7-make-up-face"
            },
            "face coverings": {
                "link": "https://www.boots.com/health-pharmacy/reusable-and-disposable-face-masks"
            },
            "face makeup": {
                "link": "/beauty/makeup/face"
            },
            "face masks": {
                "link": "https://www.boots.com/no7-skincare/no7-skincare-masks-exfoliators"
            },
            "face wash": {
                "link": "https://www.boots.com/toiletries/washing-bathing/face-wash"
            },
            "facial skincare": {
                "link": "/beauty/skincare/facial-skincare"
            },
            "father's day": {
                "link": "https://www.boots.com/seasonal/fathers-day"
            },
            "find your perfect no7 foundation": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/when-skincare-meets-makeup-discover-your-perfect-no7-foundation"
            },
            "find your perfect no7 mascara": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/no7-mascaras-explained"
            },
            "find your perfect No7 serum": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/find-your-perfect-no7-serum"
            },
            "foundation finder": {
                "link": "https://www.boots.com/no7-make-up/fed-findertool"
            },
            "foundation": {
                "link": "/beauty/makeup/face/foundation"
            },

            "fragrance brands": {
                "link": "https://www.boots.com/fragrance/all-fragrance-brands"
            },
            "fragrance exclusives": {
                "link": "https://www.boots.com/fragrance/fragrance-exclusives"
            },
            "fragrance hints & tips": {
                "link": "https://www.boots.com/fragrance-advice/how-to-buy-fragrance-online-advice"
            },
            "fragrance offers": {
                "link": "/fragrance/fragrance-offers"
            },
            "fragrance sale": {
                "link": "https://www.boots.com/sale/fragrance-sale"
            },
            "fragrance savings": {
                "link": "https://www.boots.com/savings/fragrance-savings"
            },
            "free contact lens trial": {
                "link": "https://www.boots.com/opticians-offers/free-contact-lens-assessment-trial-service"
            },
            "free gifts": {
                "link": "https://www.boots.com/fragrance-offers/complimentary-free-gifts-and-offers-with-selected-purchases"
            },
        },
        'g': {
            "gift cards": {
                "link": "https://www.boots.com/gift/gift-cards"
            },
            "gifts for dad": {
                "link": "https://www.boots.com/gifting-/gifts-for-men"
            },
            "gifts for her": {
                "link": "/gift/her"
            },
            "gifts for mum": {
                "link": "https://www.boots.com/gifting-/gifts-for-mums"
            },
            "gifts for teachers": {
                "link": "https://www.boots.com/gift/teacher-gifts"
            },
            "Girls clothes - 9 months to 6 years": {
                "link": "/baby-child/mothercare-clothing/mothercare-girls-clothes-9-months-6-years"
            },
            "glasses lenses guide": {
                "link": "https://www.boots.com/opticians-advice/guide-to-your-glasses-lenses"
            },
            "great new price": {
                "link": "https://www.boots.com/great-new-price"
            },
            "great value glasses": {
                "link": "https://www.boots.com/opticians-offers/great-value-glasses-"
            },
        },
        'h': {

            "hand cream": {
                "link": "https://www.boots.com/sitesearch?searchTerm=hand%20cream"
            },
            "hair": {
                "link": "/beauty/hair/all-hair"
            },
            "hair accessories": {
                "link": "/beauty/hair/hair-accessories"
            },
            "hair curlers": {
                "link": "/electrical/hair-styling-tools/hair-curlers"
            },
            "hair dryers": {
                "link": "https://www.boots.com/electrical/hair-styling-tools/hair-dryers"
            },
            "hair dryers buyer's guide": {
                "link": "https://www.boots.com/electrical-inspiration-and-advice/hair-dryers-buying-guide"
            },
            "hair dye": {
                "link": "/beauty/hair/hair-dye/all-hair-dye-at-home-for-men-women"
            },
            "hair loss": {
                "link": "https://www.boots.com/health/hair-loss-help-and-advice"
            },
            "hair straighteners": {
                "link": "/electrical/hair-styling-tools/hair-straighteners"
            },

            "hair stylers sussed": {
                "link": "https://www.boots.com/electrical-inspiration-and-advice/hair-curlers-buyers-guide"
            },
            "hair value packs and bundles": {
                "link": "https://www.boots.com/value-packs-and-bundles/hair-value-packs-and-bundles"
            },
            "halloween beauty products": {
                "link": "https://www.boots.com/beauty/halloween-beauty-products"
            },
            "Health & Beauty magazine": {
                "link": "https://www.boots.com/health-beauty-magazine"
            },
            "health and pharmacy brands": {
                "link": "https://www.boots.com/health-pharmacy/all-health-and-pharmacy-brands"
            },
            "healthcare savings": {
                "link": "https://www.boots.com/savings/healthcare-savings"
            },
            "health": {
                "link": "https://www.boots.com/sale/health-sale"
            },
            "health offers": {
                "link": "https://www.boots.com/health-offers"
            },
            "health offers": {
                "link": "https://www.boots.com/health-pharmacy/health-offers"
            },
            "hearingcare": {
                "link": "https://www.boots.com/hearingcare"
            },
            "hearingcare": {
                "link": "https://www.boots.com/opticians/hearingcare"
            },
            "help with your prescriptions": {
                "link": "https://www.boots.com/prescription-support/prescription-help"
            },
            "holiday value packs & bundles": {
                "link": "https://www.boots.com/holidays/holiday-value-packs-and-bundles"
            },
            "holiday value packs & bundles": {
                "link": "https://www.boots.com/value-packs-and-bundles/holiday-value-packs-and-bundles"
            },
            "home fragrance gifts": {
                "link": "https://www.boots.com/gifting-/home-fragrance-buying-guide"
            },
            "home fragrance": {
                "link": "https://www.boots.com/fragrance/fragrance-home-fragrances"
            },
            "Hospital Outpatient Pharmacies": {
                "link": "https://www.boots.com/boots-for-business/hospitalpharmacy"
            },
            "hot brushes & air stylers": {
                "link": "/electrical/hair-styling-tools/hot-brushes-air-stylers"
            },
            "how to buy fragrance": {
                "link": "https://www.boots.com/fragrance-advice/how-to-buy-fragrance"
            },
            "how to celebrate Father's Day": {
                "link": "https://www.boots.com/gifting-/fathers-day-social-distancing"
            },
            "how to do your make-up like Rihanna": {
                "link": "https://www.boots.com/glamour-beauty/how-to-do-your-makeup-like-rihanna"
            },
            "how to make a spa in a jar": {
                "link": "https://www.boots.com/gifting-/how-to-make-a-spa-in-a-jar"
            },
            "how to order your NHS repeat prescriptions": {
                "link": "https://www.boots.com/prescription-support/order-prescriptions"
            },
            "how to wrap the perfect gift": {
                "link": "https://www.boots.com/gifting-/how-to-wrap-presents"
            },
            "hydraluminous": {
                "link": "https://www.boots.com/no7-skincare/no7-hydraluminous-skincare"
            },
            "Hyaluronic Acid": {
                "link": "https://www.boots.com/sitesearch?searchTerm=hyaluronic%20acid%20&sortBy=Bestseller"
            },
        },
        'i': {
            "immunity & protection": {
                "link": "https://www.boots.com/wellness/immunity-protection"
            },
            "In-store COVID-19 Rapid Antigen Testing Service": {
                "link": "https://www.boots.com/covid-19-testing/covid-19-rapid-test-service"
            },
            "IPL female hair removal": {
                "link": "https://www.boots.com/electrical-inspiration-and-advice/ipl-buyers-guide"
            },
        },
        'k': {
            "kids' Q&A with welsh women's football team": {
                "link": "https://www.boots.com/womens-football/kids-ask-welsh-footballers-questions"
            },
            "kids travel": {
                "link": "https://www.boots.com/holidays/kids-travel"
            },
            "Klarna pay in 3": {
                "link": "https://www.boots.com/opticians-advice/pay-with-klarna"
            },
            "Klarna pay in 3": {
                "link": "https://www.boots.com/opticians-offers/pay-with-klarna"
            },
            "Klarna Pay in 3 Terms & Conditions": {
                "link": "https://www.boots.com/opticians-service/klarna-pay-in-three-terms-conditions"
            },
        },
        'l': {
            "laboratories": {
                "link": "https://www.boots.com/no7-skincare/no7-laboratories"
            },
            "lift & luminate": {
                "link": "https://www.boots.com/no7-skincare/no7-skincare-lift-luminate"
            },
            "lips": {
                "link": "/beauty/makeup/lips"
            },
            "lipsticks": {
                "link": "/beauty/makeup/lips/lipsticks"
            },
            "lip balm": {
                "link": "https://www.boots.com/beauty/makeup/lips/lip-balms-creams"
            },
            "lip gloss": {
                "link": "https://www.boots.com/beauty/makeup/lips/lip-gloss-plumpers"
            },
           
            "luxury beauty & fragrance": {
                "link": "https://www.boots.com/sale/luxury-beauty-sale"
            },
            "luxury fragrance": {
                "link": "https://www.boots.com/fragrance/luxury-fragrance"
            },
            "luxury gifts": {
                "link": "https://www.boots.com/gift/luxury-gifts"
            },
        },
        'm': {
            "make-up": {
                "link": "/beauty/makeup"
            },
            "make-up base tips": {
                "link": "https://www.boots.com/glamour-beauty/makeup-base-tips"
            },
            "makeup brushes & spongess": {
                "link": "beauty/makeup/brushes-sponges"
            },
            "make-up gift sets": {
                "link": "/gift/her/make-up-gift-sets"
            },
            "mascara": {
                "link": "/beauty/makeup/eyes/mascara"
            },
            "maternity pads": {
                "link": "https://www.boots.com/sitesearch?searchTerm=maternity%20pads"
            },
            "men's anti-ageing": {
                "link": "https://www.boots.com/no7-mens/no7-mens-anti-ageing"
            },
            "men's gift sets": {
                "link": "https://www.boots.com/mens/mens-gift-sets"
            },
            "men's moisturise": {
                "link": "https://www.boots.com/no7-mens/no7-mens-moisturise"
            },
            "men's shavers": {
                "link": "/electrical/male-grooming-tools/shavers"
            },
            "men's skincare & body": {
                "link": "https://www.boots.com/mens/skincare-body"
            },

            "men's value packs & bundles": {
                "link": "https://www.boots.com/mens/mens-value-packs-and-bundles"
            },
            "men's value packs & bundles": {
                "link": "https://www.boots.com/value-packs-and-bundles/mens-value-packs-and-bundles"
            },
            "micellar water": {
                "link": "https://www.boots.com/sitesearch?searchTerm=micellar%20water"
            },
            "midnight pharmacy": {
                "link": "https://www.boots.com/prescription-support/midnightpharmacy"
            },
            "moisturiser": {
                "link": "/beauty/skincare/facial-skincare/moisturiser"
            },
            "mother's day": {
                "link": "https://www.boots.com/seasonal/mothers-day"
            },
            "mouthwash": {
                "link": "https://www.boots.com/toiletries/bootsdental/mouthwash"
            },
            "multivitamins": {
                "link": "/health-pharmacy/vitaminsandsupplements/multivitamins"
            },
        },
        'n': {
            "nails": {
                "link": "/beauty/makeup/nails"
            },
            "nail polish": {
                "link": "https://www.boots.com/beauty/makeup/nails/nail-polish"
            },
            "new christmas brands": {
                "link": "/new-christmas-brands"
            },
            "new in baby & child": {
                "link": "https://www.boots.com/baby-child/new-in-baby-child"
            },
            "new in baby & child": {
                "link": "https://www.boots.com/new-to-boots/new-in-baby-child"
            },
            "new in baby & kids clothes": {
                "link": "https://www.boots.com/new-to-boots/new-clothing-collection"
            },
           
            "new in beauty & skincare": {
                "link": "https://www.boots.com/beauty/new-in-beauty-skincare"
            },
            "new in diet & weight management": {
                "link": "https://www.boots.com/new-to-boots/new-in-diet-and-weight-management"
            },
            "new in electrical": {
                "link": "https://www.boots.com/electrical/new-in-electrical"
            },
            "new in electrical": {
                "link": "https://www.boots.com/new-to-boots/new-in-electrical"
            },
            "new in footcare": {
                "link": "https://www.boots.com/new-to-boots/new-in-footcare"
            },
            "new in fragrance": {
                "link": "https://www.boots.com/fragrance/new-in-fragrance"
            },
            "new in fragrance": {
                "link": "https://www.boots.com/new-to-boots/new-in-fragrance"
            },
            "new in hair": {
                "link": "https://www.boots.com/new-to-boots/new-in-hair"
            },
            "new in health": {
                "link": "https://www.boots.com/health-pharmacy/new-in-health"
            },
            "new in health": {
                "link": "https://www.boots.com/new-to-boots/new-in-health"
            },
            "new in luxury bath & body": {
                "link": "https://www.boots.com/new-to-boots/new-in-luxury-bath-body"
            },
            "new in No7": {
                "link": "https://www.boots.com/new-to-boots/no7-new"
            },
            "new in No7": {
                "link": "https://www.boots.com/no7-new"
            },
            "new in No7": {
                "link": "https://www.boots.com/no7/no7-new"
            },
            "new in photo": {
                "link": "https://www.boots.com/new-to-boots/new-in-photo"
            },
            "new in photo": {
                "link": "https://www.boots.com/photo/new-in-photo"
            },
            "new in premium beauty & skincare": {
                "link": "https://www.boots.com/new-to-boots/new-in-luxury--1"
            },
            "new in toiletries": {
                "link": "https://www.boots.com/new-to-boots/new-in-toiletries"
            },
            "new in toiletries": {
                "link": "https://www.boots.com/toiletries/new-in-toiletries"
            },
            "new in wellness": {
                "link": "https://www.boots.com/new-to-boots/new-in-wellness"
            },
            "new in wellness": {
                "link": "https://www.boots.com/wellness/new-in-wellness"
            },
            "NHS Discharge Medicines Review Service": {
                "link": "https://www.boots.com/nhs-services/nhs-discharge-medicines-review-service"
            },
            "NHS electronic prescription registration": {
                "link": "https://www.boots.com/prescription-support/eps"
            },
            "NHS eye care": {
                "link": "https://www.boots.com/opticians-offers/free-nhs-eye-test-vouchers"
            },
            "NHS Lateral Flow Device Distribution Service": {
                "link": "https://www.boots.com/covid-19-testing/nhs-lateral-flow"
            },
            "NHS Minor Ailment Scheme": {
                "link": "https://www.boots.com/nhs-services/minorailments"
            },
            "NHS New Medicine Service": {
                "link": "https://www.boots.com/nhs-services/newmedicines"
            },
            "NHS repeat prescriptions": {
                "link": "https://www.boots.com/online-prescriptions"
            },

            "no7 allbright: career tools & resources": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/no7-allbright"
            },
            "No7 all year round gifts": {
                "link": "https://www.boots.com/no7-gifts/no7-gifts-all-year-round"
            },
            "no 7 bestsellers": {
                "link": "https://www.boots.com/no7-bestsellers"
            },
            "No7 christmas gifts": {
                "link": "https://www.boots.com/no7-gifts/no7-gifts-christmas"
            },
            "no7 clearance": {
                "link": "https://www.boots.com/bootsclearance/no7-clearance-range"
            },
            
            "no7 eye makeup": {
                "link": "/no7-make-up/no7-make-up-eyes"
            },
            "no7 makeup": {
                "link": "/no7/no7-make-up"
            },
            "No7 savings": {
                "link": "https://www.boots.com/savings/no7-savings"
            },
            "No7 shop all": {
                "link": "/no7-shop-all"
            },
            "No7 skincare": {
                "link": "/no7/no7-skincare"
            },
            "no7 retinol range": {
                "link": "/no7-skincare/no7-retinol-range"
            },
            "no7 waiting list": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/no7-waiting-list"
            },
            "no make-up make-up tutorial": {
                "link": "https://www.boots.com/glamour-beauty/no-makeup-makeup-tutorial"
            },
            "nominated pharmacy": {
                "link": "https://www.boots.com/prescription-support/nominated-pharmacy"
            },
            "novelty photo gifts": {
                "link": "https://www.boots.com/photo/novelty-photo-gifts"
            },
            "Nursery Advice Service": {
                "link": "https://www.boots.com/baby-child/nursery-advice-service"
            },
        },
        'o': {
            "offers for over 60s": {
                "link": "https://www.boots.com/opticians-offers/opticians-offers-over-60s"
            },
            "offers for students": {
                "link": "https://www.boots.com/opticians-offers/opticians-offers-students"
            },
            "offers": {
                "link": "https://www.boots.com/offers"
            },
            "ombré eyeshadow tutorial": {
                "link": "https://www.boots.com/glamour-beauty/how-to-ombre-eyeshadow-makeup-tutorial"
            },
            "opticians coronavirus advice": {
                "link": "https://www.boots.com/opticians-advice/opticians-advice-coronavirus"
            },
            "opticians FAQs": {
                "link": "https://www.boots.com/opticians-service/opticians-faqs"
            },
            "opticians frames": {
                "link": "/opticians/glasses/all-frames-boots-opticians"
            },
            "opticians store locator": {
                "link": "https://www.boots.com/opticians-service/opticians-store-locator"
            },
            "opticians terms & conditions": {
                "link": "https://www.boots.com/opticians-service/opticians-terms-conditions"
            },
            "our mission": {
                "link": "https://www.boots.com/no7-inspiration-and-advice/no7unstoppabletogether"
            },
        },
        'p': {
            "paracetamol": {
                "link": "https://www.boots.com/health-pharmacy/medicines-treatments/painrelief/pain-paracetamol?storeId=11352&catalogId=28501"
            },
            "perfume": {
                "link": "/fragrance/perfume/all-perfume"
            },
            "Permanent hair dye": {
                "link": "/beauty/hair/hair-dye/hair-dye-permanent"
            },
            "personalised photo gifts": {
                "link": "https://www.boots.com/gift/personalised-photo-gifts"
            },
            "photo offers": {
                "link": "https://www.boots.com/photo-offers"
            },
            "photo offers": {
                "link": "https://www.boots.com/photo/photo-offers"
            },
            "powder": {
                "link": "/beauty/makeup/face/powder"
            },
            "pregnancy test": {
                "link": "https://www.boots.com/health-pharmacy/womenshealth/familyplanning/pregnancy-tests"
            },
            "premium beauty": {
                "link": "/beauty/luxury-beauty-skincare/luxury-beauty-makeup"
            },
            "premium beauty gifts": {
                "link": "/beauty/luxury-beauty-skincare/luxury-beauty-gift"
            },
            "premium skincare": {
                "link": "/beauty/luxury-beauty-skincare/all-luxury-skincare"
            },
            "premium value packs & bundles": {
                "link": "https://www.boots.com/value-packs-and-bundles/luxury-value-packs-and-bundles"
            },
            "prescription delivery service": {
                "link": "https://www.boots.com/prescription-support/prescription-delivery-service"
            },
            "primer": {
                "link": "https://www.boots.com/beauty/makeup/face/primer"
            },
            "protect & perfect": {
                "link": "https://www.boots.com/no7-skincare/no7-skincare-protect-perfect"
            },
            "Pushchairs, strollers, prams & doubles": {
                "link": "/baby-child/pushchairs-car-seats/pushchairs-strollers-prams-doubles"
            },
        },
        'r': {
            "Radiance+": {
                "link": "https://www.boots.com/no7-skincare/no7-radiance-plus"
            },
            "recipe books & accessories": {
                "link": "https://www.boots.com/wellness/recipe-book-accessories"
            },
            "recycle at Boots": {
                "link": "https://www.boots.com/boots-recycling-scheme"
            },
            "recycle your electricals": {
                "link": "https://www.boots.com/electrical/recycle-your-electricals"
            },
            "restore & renew": {
                "link": "https://www.boots.com/no7-skincare/no7-skincare-restore-renew"
            },
            "retinol range": {
                "link": "https://www.boots.com/no7-skincare/no7-retinol-range"
            },
            "reusable & disposable face masks": {
                "link": "https://www.boots.com/health-pharmacy/reusable-and-disposable-face-masks"
            },
            "Reusable & disposable face masks": {
                "link": "https://www.boots.com/health/surgical-reusable-face-masks"
            },
        },
        's': {

            "Salicylic acid": {
                "link": "https://www.boots.com/sitesearch?searchTerm=salicylic%20acid&sortBy=Bestseller&hierarchicalMenu%5B0%5D=beauty%20%26%20skincare"
            },
            "sale": {
                "link": "/sale"
            },
            "save 10 pounds": {
                "link": "https://www.boots.com/fragrance-offers/fragrance-offers-save-10-pounds"
            },
            "save up to half price on fragrance": {
                "link": "https://www.boots.com/fragrance-offers/fragrance-offers-save-up-to-half-price"
            },
            "secret santa": {
                "link": "https://www.boots.com/christmas/secret-santa"
            },
            "self-care at home": {
                "link": "https://www.boots.com/self-care-at-home"
            },
            "Semi permanent hair dye": {
                "link": "/beauty/hair/hair-dye/semi-permanent"
            },
            "Serum & treatments": {
                "link": "/beauty/skincare/facial-skincare/serum-and-treatments"
            },
            "Shampoo": {
                "link": "/beauty/hair/shampoos"
            },
            "shave": {
                "link": "https://www.boots.com/no7-mens/no7-mens-shave"
            },
            "shop all christmas": {
                "link": "https://www.boots.com/christmas/all-christmas"
            },
            "shop all": {
                "link": "https://www.boots.com/no7-shop-all"
            },
            "shop all": {
                "link": "https://www.boots.com/no7/no7-shop-all"
            },
            "shop all make-up": {
                "link": "https://www.boots.com/no7-make-up/no7-shop-all-make-up"
            },
            "shop all skincare": {
                "link": "https://www.boots.com/no7-skincare/no7-shop-all-skincare"
            },
            "Shower gel": {
                "link": "/toiletries/washing-bathing/shower-gel"
            },
            "skincare": {
                "link": "/beauty/skincare/skincare-all-skincare"
            },
            "skincare savings": {
                "link": "https://www.boots.com/savings/skincare-savings"
            },
            "sleep": {
                "link": "https://www.boots.com/wellness/sleep"
            },
            "soap": {
                "link": "https://www.boots.com/toiletries/washing-bathing/soap-hand-wash"
            },
            "soothers & teethers": {
                "link": "/baby-child/babyfeeding/soothers-teethersp"
            },
            "star gifts": {
                "link": "https://www.boots.com/christmas/christmas-weekly-offers"
            },
            "stocking fillers": {
                "link": "https://www.boots.com/christmas/stocking-fillers"
            },
            "suncare protection": {
                "link": "/holidays/suncare/sunprotection"
            },
            "suncare & fake tan": {
                "link": "https://www.boots.com/no7-suncare"
            },
            "sun cream": {
                "link": "https://www.boots.com/holidays/suncare/sunprotection"
            },
            "support from your local pharmacist": {
                "link": "https://www.boots.com/prescription-support/askapharmacist"
            },
            "sustainable baby": {
                "link": "https://www.boots.com/baby-child/sustainable-baby"
            },
        },
        't': {

            "Teeth whitening": {
                "link": "/toiletries/bootsdental/teeth-whitening"
            },

            "Test to Release (In-store COVID-19 PCR) Testing Service": {
                "link": "https://www.boots.com/covid-19-testing/covid-19-test-to-release"
            },
            "text message service": {
                "link": "https://www.boots.com/prescription-support/text-message-service"
            },
            "thermometers": {
                "link": "https://www.boots.com/health-pharmacy/covid-19-information-products-and-testing/thermometers"
            },
            "toiletries and haircare savings": {
                "link": "https://www.boots.com/savings/toiletries-and-haircare-savings"
            },
            "toiletries offers": {
                "link": "https://www.boots.com/toiletries-offers"
            },
            "toiletries offers": {
                "link": "https://www.boots.com/toiletries/toiletries-offers"
            },
            "toiletries value packs & bundles": {
                "link": "https://www.boots.com/toiletries/toiletries-value-packs-and-bundles"
            },
            "toiletries value packs & bundles": {
                "link": "https://www.boots.com/value-packs-and-bundles/toiletries-value-packs-and-bundles"
            },
            "tools": {
                "link": "https://www.boots.com/no7/no7-make-up-accessories"
            },
            "top 3 spring trends": {
                "link": "https://www.boots.com/glamour-beauty/spring-beauty-trends"
            },
            "top 8 men's aftershave": {
                "link": "https://www.boots.com/fragrance-advice/best-mens-aftershave"
            },
            "top 8 women's perfume": {
                "link": "https://www.boots.com/fragrance-advice/best-womens-perfume"
            },
            "top confidence tips from women's footballers": {
                "link": "https://www.boots.com/womens-football/confidence-tips-from-scotland-and-wales-womens-footballers"
            },
            "top hair clippers & shavers": {
                "link": "https://www.boots.com/electrical-inspiration-and-advice/electric-shavers-buyers-guide"
            },
            "toothbrushes": {
                "link": "https://www.boots.com/toiletries/bootsdental/toothbrushes"
            },
            "toothpaste": {
                "link": "https://www.boots.com/toiletries/bootsdental/toothpaste"
            },
            "toys": {
                "link": "https://www.boots.com/baby-child/toys"
            },
            "travel beauty minis": {
                "link": "/beauty/travel-beauty-minis"
            },
            
            "travel insurance": {
                "link": "https://www.boots.com/holidays/travelinsurance"
            },
            "travel sized toiletries": {
                "link": "https://www.boots.com/sitesearch?searchTerm=travel%20size%20toiletries"
            },
            "travel toiletries": {
                "link": "https://www.boots.com/holidays/travel-toiletries"
            },
            "trending beauty products": {
                "link": "https://www.boots.com/beauty/trending-products"
            },
        },
        'u': {
            "understanding your NHS prescriptions": {
                "link": "https://www.boots.com/prescription-support/understanding-your-prescriptions"
            },
        },
        'v': {
            "valentine's day": {
                "link": "https://www.boots.com/seasonal/valentines"
            },
            "value sets": {
                "link": "https://www.boots.com/no7-online-only"
            },
            "value sets": {
                "link": "https://www.boots.com/no7/no7-online-only"
            },
            "Varifocal Lenses explained": {
                "link": "https://www.boots.com/opticians-advice/varifocal-lenses"
            },
            "Varilux Varifocal Lenses": {
                "link": "https://www.boots.com/opticians-advice/varifocal-varilux-lenses"
            },
            "vegan beauty": {
                "link": "https://www.boots.com/beauty/vegan-range"
            },
            "vegan fragrance": {
                "link": "https://www.boots.com/fragrance/vegan-fragrances"
            },
            "vegan gifts": {
                "link": "https://www.boots.com/christmas/vegan-gifts"
            },
            "vegan products": {
                "link": "https://www.boots.com/wellness/all-vegan-products"
            },
            "visit health hub": {
                "link": "https://www.boots.com/healthhub"
            },
            "vitamin D": {
                "link": "/wellness/vitaminsandsupplements/vitamins-supplements-shop-by-ingredient/vitamin-D"
            },
        },
        'w': {
            "wash": {
                "link": "https://www.boots.com/no7-mens/no7-mens-wash"
            },
            "wellness inspiration": {
                "link": "https://www.boots.com/wellness/wellness-inspiration"
            },
            "what are autoimmune diseases?": {
                "link": "https://www.boots.com/health/what-are-auto-immune-diseases"
            },
            "Winter Flu Jab Service": {
                "link": "https://www.boots.com/flujab"
            },
            "Women's glasses": {
                "link": "/opticians/glasses/opticians-glasses-womens"
            },
        },
        'number': {
            "£5 Friday": {
                "link": "https://www.boots.com/friday-offer"
            },
            "£10 deals": {
                "link": "https://www.boots.com/tuesday-offer"
            },
            "3 for 2 mix & match": {
                "link": "https://www.boots.com/christmas/christmas-3-for-2"
            },
            "5* rated perfumes & aftershaves": {
                "link": "https://www.boots.com/fragrance/top-rated-fragrance"
            },
            "90s make-up tutorial": {
                "link": "https://www.boots.com/glamour-beauty/90s-makeup-tutorial"
            }
        }

    }

    /*
    * add a-z of categories
    */
    const addAllCategories = () => {
        const allCategories = document.createElement('div');
        allCategories.classList.add(`${ID}-allcategoryContainer`);
        allCategories.innerHTML = `
        <div class="${ID}-searchCategory">
            <input type="text" placeholder="Search categories"/>
        </div>
        <div class="${ID}-categoryLettersWrapper">
            <div class="${ID}-categoryLetters">
                <span class="${ID}-letter ${ID}-letterActive" letter-target="a">A</span>
                <span class="${ID}-letter" letter-target="b">B</span>
                <span class="${ID}-letter" letter-target="c">C</span>
                <span class="${ID}-letter" letter-target="d">D</span>
                <span class="${ID}-letter" letter-target="e">E</span>
                <span class="${ID}-letter" letter-target="f">F</span>
                <span class="${ID}-letter" letter-target="g">G</span>
                <span class="${ID}-letter" letter-target="h">H</span>
                <span class="${ID}-letter" letter-target="i">I</span>
                <span class="${ID}-letter" letter-target="j">J</span>
                <span class="${ID}-letter" letter-target="k">K</span>
                <span class="${ID}-letter" letter-target="l">L</span>
                <span class="${ID}-letter" letter-target="m">M</span>
                <span class="${ID}-letter" letter-target="n">N</span>
                <span class="${ID}-letter" letter-target="o">O</span>
                <span class="${ID}-letter" letter-target="p">P</span>
                <span class="${ID}-letter" letter-target="q">Q</span>
                <span class="${ID}-letter" letter-target="r">R</span>
                <span class="${ID}-letter" letter-target="s">S</span>
                <span class="${ID}-letter" letter-target="t">T</span>
                <span class="${ID}-letter" letter-target="u">U</span>
                <span class="${ID}-letter" letter-target="v">V</span>
                <span class="${ID}-letter" letter-target="w">W</span>
                <span class="${ID}-letter" letter-target="x">X</span>
                <span class="${ID}-letter" letter-target="y">Y</span>
                <span class="${ID}-letter" letter-target="z">Z</span>
                <span class="${ID}-letter" letter-target="number">0-9</span>
            </div>
        </div>
        <div class="${ID}-categoryList">
            <div class="${ID}-catBlock ${ID}-active" letter-name="a"><h4>A</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="b"><h4>B</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="c"><h4>C</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="d"><h4>D</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="e"><h4>E</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="f"><h4>F</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="g"><h4>G</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="h"><h4>H</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="i"><h4>I</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="j"><h4>J</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="k"><h4>K</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="l"><h4>L</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="m"><h4>M</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="n"><h4>N</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="o"><h4>O</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="p"><h4>P</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="q"><h4>Q</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="r"><h4>R</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="s"><h4>S</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="t"><h4>T</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="u"><h4>U</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="v"><h4>V</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="w"><h4>W</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="x"><h4>X</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="y"><h4>Y</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="z"><h4>Z</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-catBlock" letter-name="number"><h4>0-9</h4><div class="${ID}-links"></div></div>
        </div>`;

        document.querySelector(`.${ID}-categoryWrapper`).appendChild(allCategories);
    }

    // add category links to matching letter
    const addCatLinks = () => {
        const category = categoryData;

        const allCatContainers = document.querySelectorAll(`.${ID}-catBlock`);
        for (let index = 0; index < allCatContainers.length; index += 1) {
            const element = allCatContainers[index];
            const catLetter = element.getAttribute(`letter-name`);
            
            if(category[catLetter]) {
                const catData = category[catLetter];
                Object.keys(catData).forEach((i) => {
                    const data = catData[i];
                    const catLink = document.createElement('div');
                    catLink.classList.add(`${ID}-catLink`);
                    catLink.setAttribute('data-value', [i][0]);
                    catLink.innerHTML = `
                    <a href="${data.link}">
                        <span class="${ID}-brandName">${[i][0]}</span>
                    </a>`;
                    element.querySelector(`.${ID}-links`).appendChild(catLink);

                });
            } else {
                element.classList.add(`${ID}_noResults`);
                document.querySelector(`.${ID}-letter[letter-target=${catLetter}]`).classList.add(`${ID}_noResults`);
            }
        }
    }

    const categorySearch = () => {
        const searchInput = document.querySelector(`.${ID}-searchCategory input`);
        const categoryLinks = document.querySelectorAll(`.${ID}-catLink`);

        const allCatBlocks = document.querySelectorAll(`.${ID}-catBlock`);


        function filterList() {

            for(var i = 0; i < categoryLinks.length; i++){
                var item = categoryLinks[i];
                var valueLi = item.getAttribute('data-value').toLowerCase().trim();

                item.style.display = valueLi.search(new RegExp(searchInput.value.toLowerCase())) != -1 ? '' : 'none';
            }

            //to show all letters on desktop when searching
            if(window.innerWidth > 600) {
                for (let index = 0; index < allCatBlocks.length; index += 1) {
                    const element = allCatBlocks[index];
                    if(searchInput.value !== '') {
                        element.classList.add(`${ID}-active`);
                    } else {
                        element.classList.remove(`${ID}-active`);
                        document.querySelector(`.${ID}-catBlock`).classList.add(`${ID}-active`);
                    }
                }
            }
        }

        searchInput.addEventListener('keyup', () => {
            document.querySelector(`.${ID}-categoryList`).scrollTo(0,0);
            filterList();

            if(searchInput.value === '') {
                document.querySelector(`.${ID}-categoryList`).classList.remove(`${ID}-searching`);
            } else {
                document.querySelector(`.${ID}-categoryList`).classList.add(`${ID}-searching`);
            }
        });


        searchInput.addEventListener('keydown', function (event) {
            if (event.code == 'Enter') {
                fireEvent(`Enter: ${searchInput.value}`);
            }
            if (event.key == 'Delete') {
               fireEvent(`Delete: ${searchInput.value}`);
            }
            if (event.key == 'Backspace') {
                fireEvent(`Backspace: ${searchInput.value}`);
            }
        });
    }

    const letterScroll = () => {
        const catLetters = document.querySelectorAll(`.${ID}-categoryLetters .${ID}-letter`);
        for (let index = 0; index < catLetters.length; index += 1) {
            const element = catLetters[index];
            element.addEventListener('click', (e) => {
                const letter = e.currentTarget.getAttribute('letter-target');
                const matchingEl = document.querySelector(`.${ID}-catBlock[letter-name=${letter}]`);
                if(matchingEl) {
                   
                    // scroll to on mobile
                    if (window.innerWidth <= 601 || document.querySelector(`.${ID}-searchCategory input`).value !== '') {
                        const letterPos = matchingEl.offsetTop;
                        if(window.innerWidth > 601) {
                            scrollToElement(document.querySelector(`.${ID}-categoryList`), letterPos - 110, 500);
                        } else {
                            scrollToElement(document.querySelector(`.${ID}-categoryList`), letterPos - 150, 500);
                        }
                    } else {

                        // remove current active
                        document.querySelector(`.${ID}-categoryLetters .${ID}-letter.${ID}-letterActive`).classList.remove(`${ID}-letterActive`);
                        document.querySelector(`.${ID}-catBlock.${ID}-active`).classList.remove(`${ID}-active`);

                        // make active letter on desktop
                        e.currentTarget.classList.add(`${ID}-letterActive`);
                        matchingEl.classList.add(`${ID}-active`);
                    }
                }
            });
        }
    }

    const trackCategories = () => {
        const allCategories = document.querySelectorAll(`.${ID}-catLink`);
        for (let index = 0; index < allCategories.length; index += 1) {
            const element = allCategories[index];
            element.querySelector('a').addEventListener('click', () => {
                const elName = element.querySelector('span').textContent;
                fireEvent(`Clicked Category link ${elName}`);
            });
        }
    }

    addAllCategories();
    addCatLinks();
    categorySearch();
    letterScroll();
    trackCategories();
}