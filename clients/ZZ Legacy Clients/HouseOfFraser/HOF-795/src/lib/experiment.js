/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import {
    events,
    logMessage,
    pollerLite,
    observer,
} from "../../../../../lib/utils";
import debounce from "lodash/debounce";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;
let stageNumber = 0;
let stage0,
    stage1,
    stage2,
    stage3,
    stage4,
    quizHeader,
    quizProgressBarInner,
    quizBody,
    backwardsButton,
    theQuiz;

// hub page functionality removed
// let hubPages = [
//     "https://www.houseoffraser.co.uk/men",
//     "https://www.houseoffraser.co.uk/women",
//     "https://www.houseoffraser.co.uk/kids",
//     "https://www.houseoffraser.co.uk/bags-and-luggage",
//     "https://www.houseoffraser.co.uk/shoes-and-boots",
//     "https://www.houseoffraser.co.uk/home-and-furniture",
//     "https://www.houseoffraser.co.uk/electricals",
//     //'https://www.houseoffraser.co.uk/sports', - adding to exp nov 29th
// ];

let categoryPages = [
    "/gifting-offer",
    //"/christmas/christmas-gifts",
    //"/christmas/gifts-for-babies",
    //"/christmas/christmas-gifts-for-dads",
    //"/christmas/gift-ideas-for-her",
    //"/christmas/gift-ideas-for-him",
    //"/christmas/gift-ideas-for-kids",
    //"/christmas/christmas-presents-for-mum",
    //"/christmas/luxury-gifts",
    //"/christmas/secret-santa-gifts",
    //"/christmas/stocking-fillers",
    //"/christmas/christmas-gifts/fraser-bear",
    //"/christmas/christmas-gifts/gym-gifts",
    //"/kids-and-baby/games-and-puzzles",
    //"/christmas/gifts-for-grandparents",
    //"/christmas/gifts-for-couples",
    //"/home-and-furniture/partyware",
    //"/christmas/home",
    //"/christmas/home/dining",
    //"/christmas/gifts-for-foodies",
    //"/christmas/home-accessories-gifts",
    //"/christmas/themes",
    //"/christmas/themes/christmas-nights",
    //"/christmas/themes/cosy-christmas",
    //"/christmas/themes/christmas-party",
    //"/christmas/themes/white-christmas",
    //"/christmas/themes/merry-and-blush",
    //"/christmas/clothing",
    //"/christmas/clothing/christmas-dresses",
    //"/christmas/clothing/christmas-jumpers",
    //"/christmas/clothing/christmas-pyjamas",
    //"/christmas/trees-and-decorations",
    //"/christmas/trees-and-decorations/christmas-trees",
    //"/christmas/trees-and-decorations/tree-decorations",
    //"/christmas/trees-and-decorations/room-decorations",
    //"/christmas/trees-and-decorations/crackers",
    //"/christmas/trees-and-decorations/wreaths-and-garlands",
    //"/christmas/trees-and-decorations/advent-calendars",
    //"/christmas/trees-and-decorations/stocking-and-sacks",
    //"/christmas/trees-and-decorations/wrapping-paper-and-christmas-cards",
    //"/christmas/tv-advert",
    "/women/coats-and-jackets",
    "/men/coats-and-jackets",
    "/sale/women/coats-and-jackets",
    "/bags-and-luggage/handbags",
    "/sale/men/coats-and-jackets",
    "/sale/men/hoodies-and-sweatshirts",
    "/sale/men/tops-and-t-shirts",
    "/women/dresses",
    "/sale/women/dresses",
    "/sale/bags-and-luggage/handbags",
    "/shoes-and-boots/ladies-boots",
    "/men/hoodies-and-sweatshirts",
    "/sale/kids-and-baby",
    "/sale/beauty",
    "/sale/shoes-and-boots/ladies-boots",
    "/shoes-and-boots/mens-trainers",
    "/men/mens-t-shirts",
    "/sale/women/tops",
    "/men/mens-polo-shirts",
    "/sale/men/shirts",
    "/men/jeans",
    "/sale/men/jeans",
    "/men/shirts",
    "/sale/shoes-and-boots/mens-trainers-sale",
    "/women/edits/winter-coats",
    "/women/knitwear",
    "/sale/home-and-furniture",
    "/sale/men/knitwear",
    "/shoes-and-boots/ladies-trainers",
    "/shoes-and-boots/mens-shoes",
];

const checkProgress = () => {
    if (stageNumber == 0) {
        quizProgressBarInner.setAttribute("data-percent", 0);
        quizProgressBarInner.innerText = "0%";
        backwardsButton.classList.remove("active");
    } else if (stageNumber == 1) {
        backwardsButton.classList.add("active");
        quizProgressBarInner.setAttribute("data-percent", 25);
        quizProgressBarInner.innerText = "25%";
    } else if (stageNumber == 2) {
        quizProgressBarInner.setAttribute("data-percent", 50);
        quizProgressBarInner.innerText = "50%";

        if (localStorage.getItem(`${ID}-hideprice`) == "true") {
            document
                .querySelector(`.${ID}-overhundred`)
                .classList.add("hidden");
        } else {
            document
                .querySelector(`.${ID}-overhundred`)
                .classList.remove("hidden");
        }
    } else if (stageNumber == 3) {
        quizProgressBarInner.setAttribute("data-percent", 75);
        quizProgressBarInner.innerText = "75%";

        if (localStorage.getItem(`${ID}-hideprice`) == "true") {
            document
                .querySelector(`.${ID}-overhundred`)
                .classList.add("hidden");
        } else {
            document
                .querySelector(`.${ID}-overhundred`)
                .classList.remove("hidden");
        }
    } else if (stageNumber == 4) {
        backwardsButton.classList.add("active");
        quizProgressBarInner.setAttribute("data-percent", 50);
        quizProgressBarInner.innerText = "50%";
    }
};

const closeQuiz = () => {
    stageNumber = 0;
    moveBackwardsStage();
    quizBody.classList.remove(`${ID}-calculating`);
    quizProgressBarInner.setAttribute("data-percent", 0);
    quizProgressBarInner.innerText = "0%";
    let allStages = document.querySelectorAll(`.${ID}-quiz--stage`);
    [].slice.call(allStages).forEach((stage) => {
        stage.classList.remove("active");
    });
    stage0.classList.add("active");
    theQuiz.classList.remove(`${ID}-active`);
    document.documentElement.classList.remove(`${ID}-noscroll`);
};

const moveForwardStage = () => {
    const header = document.querySelector(`.${ID}-quiz--header`);
    header.classList.remove(`stage${stageNumber - 1}`);
    header.classList.add(`stage${stageNumber}`);
    checkProgress();
    if (stageNumber == 0) {
        // do stage 0 stuff
    } else if (stageNumber == 1) {
        // do stage 1 stuff
        stage0.classList.remove("active");
        stage1.classList.add("active");
    } else if (stageNumber == 2) {
        // do stage 2 stuff
        stage1.classList.remove("active");
        stage2.classList.add("active");
    } else if (stageNumber == 3) {
        stage1.classList.remove("active");
        stage2.classList.remove("active");
        stage3.classList.add("active");
    } else if (stageNumber == 4) {
        stage0.classList.remove("active");
        stage4.classList.add("active");
    }
};

const moveBackwardsStage = () => {
    const header = document.querySelector(`.${ID}-quiz--header`);
    header.classList.remove(`stage${stageNumber + 1}`);
    header.classList.add(`stage${stageNumber}`);
    quizBody.classList.remove(`${ID}-calculating`);
    checkProgress();

    if (stageNumber == 0) {
        // do stage 0 stuff

        stage0.classList.add("active");
        stage1.classList.remove("active");
        stage4.classList.remove("active");
    } else if (stageNumber == 1) {
        // do stage 1 stuff
        stage1.classList.add("active");
        stage2.classList.remove("active");
        stage3.classList.remove("active");
    } else if (stageNumber == 2) {
        // do stage 2 stuff
        stage2.classList.add("active");
        stage3.classList.remove("active");
    } else if (stageNumber == 3) {
        // do stage 2 stuff
        stage2.classList.add("active");
        stage3.classList.remove("active");
    } else if (stageNumber == 4) {
        // do stage 2 stuff
        stage0.classList.add("active");
        stage4.classList.remove("active");
    }
};

const buildQuiz = (placement) => {
    let quizHTML = `
  
        <div class="${ID}-quiz ${window.location.href.indexOf("/just-for-you") > -1
            ? `${ID}-finder-jfy`
            : `${ID}-finder-homepage`
        } ${placement == "url" ? `${ID}-finder-url` : `${ID}-finder-modal`}">
        
        <div class="${ID}-quiz--controlbar">

            <button id="${ID}-quiz--backbutton" class="${ID}-quiz--backbutton">
                <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.8674 0.83914C6.0547 0.63623 6.04205 0.3199 5.83914 0.132598C5.63623 -0.0547036 5.3199 -0.0420504 5.1326 0.16086L5.8674 0.83914ZM0.5 5.91667L0.132598 5.57753C-0.0441997 5.76906 -0.0441997 6.06428 0.132598 6.25581L0.5 5.91667ZM5.1326 11.6725C5.3199 11.8754 5.63623 11.888 5.83914 11.7007C6.04205 11.5134 6.0547 11.1971 5.8674 10.9942L5.1326 11.6725ZM5.1326 0.16086L0.132598 5.57753L0.867401 6.25581L5.8674 0.83914L5.1326 0.16086ZM0.132598 6.25581L5.1326 11.6725L5.8674 10.9942L0.867401 5.57753L0.132598 6.25581Z" fill="white"/></svg>
                <span class="${ID}-quiz--controlbarbutton">Previous Question</span>      
            </button>
        
            <button id="${ID}-quiz--exit" class="${ID}-quiz--exit"> 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L22 22" stroke="white" stroke-width="2"/><path d="M2 22L22 2" stroke="white" stroke-width="2"/></svg>
                <span class="${ID}-quiz--controlbarbutton">${placement == "url" ? `Go Home` : `Exit Guide`
        }</span> 
            </button>
        
        </div>

        <div class="${ID}-quiz--header">
        
        </div>
        
        <div class="${ID}-quiz--progress">
        
            <div class="${ID}-quiz--progressinner" data-percent="0">0%</div>
        
        </div>

        

        <div class="${ID}-quiz--body">
            <div class="${ID}-quiz--stage ${ID}-quiz--stage0 ${stageNumber == 0 ? "active" : ""
        }">

            <h2> Who are you buying a gift for? </h2>  

            <div class="${ID}-quiz--stageoptions">
                <button class="${ID}-quiz--button ${ID}-gender-option option-him" data-option="option-him"><span>FOR HIM</span></button>
                <button class="${ID}-quiz--button ${ID}-gender-option option-her" data-option="option-her"><span>FOR HER</span></button>
                <button class="${ID}-quiz--button ${ID}-gender-option option-couples" data-option="option-couples"><span>FOR A COUPLE</span></button>
                <button class="${ID}-quiz--button ${ID}-gender-option option-junior" data-option="option-junior"><span>FOR KIDS & BABY</span></button>
            </div>
            </div>

            <div class="${ID}-quiz--stage ${ID}-quiz--stage1 ${stageNumber == 1 ? "active" : ""
        }">

            <h2> What do they like? </h2>  

            <div class="${ID}-option-him">
                <button class="${ID}-quiz--button ${ID}-category-option option-clothing" data-option="option-men-clothing"><span>Clothing &amp; Accessories</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-grooming" data-option="option-men-grooming"><span>Grooming</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-sportsfitness" data-option="option-men-sportsfitness"><span>Sports &amp; Fitness</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-electronics" data-option="option-men-electronics"><span>Electronics</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-activities" data-direct="/brand/virgin-experience-days" data-option="option-men-activities"><span>Activities</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-giftcards" data-direct="giftcards" data-option="option-men-giftcards"><span>Gift Cards</span></button>
            </div>

            <div class="${ID}-option-her">
                <button class="${ID}-quiz--button ${ID}-category-option option-clothing" data-option="option-women-clothing"><span>Clothing &amp; Accessories</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-beauty" data-option="option-women-beauty"><span>Beauty</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-sportsfitness" data-option="option-women-sportsfitness"><span>Sports &amp; Fitness</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-home" data-option="option-women-home"><span>Home</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-activities" data-direct="/brand/virgin-experience-days" data-option="option-women-activities"><span>Activities</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-giftcards" data-direct="giftcards" data-option="option-women-giftcards"><span>Gift Cards</span></button>
            </div>

            <div class="${ID}-option-couples">
                <button class="${ID}-quiz--button ${ID}-category-option option-activities" data-direct="/brand/virgin-experience-days" data-option="option-couples-activities"><span>Activities</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-home" data-option="option-couples-home"><span>Home</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-games" data-hideprice="true" data-direct="/home-and-furniture/partyware" data-option="option-couples-games"><span>Games &amp; Puzzles</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-giftcards" data-direct="giftcards" data-option="option-couples-giftcards"><span>Gift Cards</span></button>
            </div>

            <div class="${ID}-option-junior">
                <button class="${ID}-quiz--button ${ID}-category-option option-toysgames" data-option="option-kids-toysgames"><span>Toys &amp; Games</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-clothing" data-option="option-kids-clothing"><span>Clothing &amp; Accessories</span></button>
                <button class="${ID}-quiz--button ${ID}-category-option option-activities" data-option="option-kids-activities"><span>Activities</span></button>
            </div>     
            
            </div>

            <div class="${ID}-quiz--stage ${ID}-quiz--stage2 ${stageNumber == 2 ? "active" : ""
        }">
            
                <h2> What do they like? </h2>    

                <!-- Mens -->

                <div class="${ID}-option-men-clothing">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-tops" data-option="/men/tops-and-t-shirts"><span>Tops</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-knitwear" data-option="/men/knitwear"><span>Knitwear</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-coatsjackets" data-option="/men/coats-and-jackets"><span>Coats &amp; Jackets</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-bags" data-option="/bags-and-luggage/mens-bags"><span>Bags</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-shoes" data-option="/shoes-and-boots/mens-shoes"><span>Shoes</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-accessories" data-option="/accessories/men"><span>Accessories</span></button>
                </div>

                <div class="${ID}-option-men-grooming">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-giftsets" data-option="/beauty/mens-gift-sets"><span>Gift Sets</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-skincare" data-option="/beauty/mens-skincare"><span>Skincare</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-shaving" data-hideprice="true" data-option="/beauty/mens-shaving"><span>Shaving</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-haircare" data-hideprice="true" data-option="/beauty/mens-haircare"><span>Haircare</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-beardcare" data-hideprice="true" data-option="/beauty/beard-care"><span>Beard Care</span></button>
                </div>

                <div class="${ID}-option-men-sportsfitness">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-gymclothes" data-option="/sports/fitness-and-training/gym-clothes/mens-gym-clothes"><span>Gym Clothes</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-gymtrainers" data-option="/sports/fitness-and-training/gym-trainers/men"><span>Gym Trainers</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-footballboots" data-option="/sports/football/football-boots/mens-football-boots"><span>Football Boots</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-fitnessequipment" data-option="/sports/fitness-and-training/fitness-equipment"><span>Fitness Equipment</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-gymaccessories" data-option="/sports/fitness-and-training/gym-accessories"><span>Gym Accessories</span></button>
                </div>

                <div class="${ID}-option-men-electronics">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-radiosspeakers" data-option="/electricals/radios-and-speakers"><span>Radios &amp; Speakers</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-headphones" data-option="/electricals/headphones"><span>Headphones</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-gaming" data-option="/gaming"><span>Gaming</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-electrictoothbrushes" data-hideprice="true" data-option="/electricals/electric-toothbrushes"><span>Electric Toothbrushes</span></button>
                </div>

                <!-- Womens -->

                <div class="${ID}-option-women-clothing">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-handbags" data-option="/bags-and-luggage/handbags"><span>Handbags</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-dresses" data-option="/women/dresses"><span>Dresses</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-coatsjackets" data-option="/women/coats-and-jackets"><span>Coats &amp; Jackets</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-lingerie" data-option="/women/lingerie"><span>Lingerie</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-shoes" data-option="/shoes-and-boots/ladies-shoes"><span>Shoes</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-accessories" data-option="/accessories/women"><span>Accessories</span></button>
                </div>

                <div class="${ID}-option-women-beauty">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-perfumes" data-option="/beauty/perfumes/womens"><span>Perfumes</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-makeup" data-option="/beauty/makeup"><span>Makeup</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-skincare" data-option="/beauty/skincare"><span>Skincare</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-bathbody" data-option="/beauty/bath-and-body"><span>Bath &amp; Body Care</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-haircare" data-option="/beauty/haircare"><span>Haircare</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-giftsets" data-option="/beauty/beauty-gift-sets"><span>Gift Sets</span></button>
                </div>

                <div class="${ID}-option-women-sportsfitness">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-gymclothes" data-option="/sports/fitness-and-training/gym-clothes/womens-gym-clothes"><span>Gym Clothes</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-gymtrainers" data-option="/sports/fitness-and-training/gym-trainers/women"><span>Gym Trainers</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-sportsbras" data-hideprice="true" data-option="/sports/sports-bras"><span>Sports Bras</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-fitnessequipment" data-option="/sports/fitness-and-training/fitness-equipment"><span>Fitness Equipment</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-gymaccessories" data-option="/sports/fitness-and-training/gym-accessories"><span>Gym Accessories</span></button>
                </div>

                <div class="${ID}-option-women-home">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-dining" data-option="/home-and-furniture/dining"><span>Dining</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-electricals" data-option="/electricals/kitchen-electricals"><span>Kitchen Electricals</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-kitchen" data-option="/home-and-furniture/kitchen"><span>Kitchen</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-radiosspeakers" data-option="/electricals/radios-and-speakers"><span>Radios &amp; Speakers</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-homeaccessories" data-option="/home-and-furniture/home-accessories"><span>Home Accessories</span></button>
                </div>

                <!-- Couples -->

                <div class="${ID}-option-couples-home">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-radiosspeakers" data-option="/electricals/radios-and-speakers"><span>Radios &amp; Speakers</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-dining" data-option="/home-and-furniture/dining"><span>Dining</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-electricals" data-option="/electricals/kitchen-electricals"><span>Kitchen Electricals</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-kitchen" data-option="/home-and-furniture/kitchen"><span>Kitchen</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-homeaccessories" data-option="/home-and-furniture/home-accessories"><span>Home Accessories</span></button>
                </div>

                <!-- Kids -->

                <div class="${ID}-option-kids-toysgames">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-gamespuzzles" data-hideprice="true" data-option="/kids-and-baby/games-and-puzzles"><span>Games &amp; Puzzles</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-buildingblocks" data-option="/kids-and-baby/building-blocks-and-construction"><span>Building Blocks</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-dollhouses" data-option="/kids-and-baby/dolls-and-doll-houses"><span>Dolls & Doll Houses</span></button>
                </div>

                <div class="${ID}-option-kids-clothing">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-girlsclothing" data-option="/kids-and-baby/kids-clothing/girls"><span>Girls Clothing</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-boysclothing" data-option="/kids-and-baby/kids-clothing/boys"><span>Boys Clothing</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-babyclothing" data-option="/kids-and-baby/baby"><span>Baby Clothing</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-footwear" data-option="/shoes-and-boots/kids-footwear"><span>Kids Footwear</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-accessories" data-hideprice="true" data-option="/accessories/kids-accessories"><span>Kids Accessories</span></button>
                </div>

                <div class="${ID}-option-kids-activities">
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-bikes" data-option="/kids-and-baby/kids-bikes-trikes-and-scooters"><span>Bikes, Trikes, Scooters</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-rollerskates" data-option="/kids-and-baby/roller-skates-and-skate-shoes"><span>Roller Skates</span></button>
                    <button class="${ID}-quiz--button ${ID}-catlevtwo-option option-sciencelearning" data-hideprice="true" data-option="/kids-and-baby/science-and-learning-toys"><span>Science &amp; Learning Toys</span></button>
                </div>
                
                
            </div>

            <div class="${ID}-quiz--stage ${ID}-quiz--stage3 ${stageNumber == 3 ? "active" : ""
        }">
            
                <h2> How much would you like to spend? </h2>

                <div class="${ID}-quiz--pricerange">
                    <button class="${ID}-quiz--button ${ID}-price-option" data-price="0-25"><span>Under £25</span></button>
                    <button class="${ID}-quiz--button ${ID}-price-option" data-price="0-50"><span>Under £50</span></button>
                    <button class="${ID}-quiz--button ${ID}-price-option" data-price="0-100"><span>Under £100</span></button>
                    <button class="${ID}-quiz--button ${ID}-price-option ${ID}-overhundred" data-price="100-10000"><span>Over £100</span></button>
                </div>
                
            </div>

            <div class="${ID}-quiz--stage ${ID}-quiz--stage4 ${stageNumber == 4 ? "active" : ""
        }">
            
            <p> Getting JUST FOR YOU... </p>

            <div class="${ID}-quiz--justforyou swiper-container">
                <div class="${ID}-button ${ID}-button-prev"> <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 1L10 9L1 1" stroke="#000" stroke-width="2"/></svg></div>
                <div class="${ID}-button ${ID}-button-next"> <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 1L10 9L1 1" stroke="#000" stroke-width="2"/></svg></div>
            
                <div class="swiper-wrapper">

                </div>
            </div>          
            
            </div>
        </div>
    
    `;

    let quizInsertionPoint = document.body;
    if (placement == "url") {
        document
            .querySelector(".ContentWrapper")
            .classList.add(`${ID}-url-quiz-wrapper`);
        quizInsertionPoint = document.querySelector(".ContentWrapper");
    }

    quizInsertionPoint.insertAdjacentHTML("afterbegin", quizHTML);
    theQuiz = document.querySelector(`.${ID}-quiz`);
    stage0 = document.querySelector(`.${ID}-quiz--stage0`);
    stage1 = document.querySelector(`.${ID}-quiz--stage1`);
    stage2 = document.querySelector(`.${ID}-quiz--stage2`);
    stage3 = document.querySelector(`.${ID}-quiz--stage3`);
    stage4 = document.querySelector(`.${ID}-quiz--stage4`);
    quizHeader = theQuiz.querySelector(`.${ID}-quiz--header`);
    quizProgressBarInner = document.querySelector(`.${ID}-quiz--progressinner`);
    quizBody = document.querySelector(`.${ID}-quiz--body`);
    backwardsButton = document.getElementById(`${ID}-quiz--backbutton`);
    // Event Handlers

    // Go back handler
    backwardsButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (stageNumber == 4) {
            stageNumber = 0;
        } else if (localStorage.getItem(`${ID}-direct`) == "true") {
            stageNumber = stageNumber - 2;
            localStorage.setItem(`${ID}-direct`, false);
        } else {
            stageNumber--;
        }

        moveBackwardsStage();
        fireEvent(
            `Click - user has clicked the back button to go to stage ${stageNumber + 1
            }`
        );
    });

    // Stage 0 event handler

    let stage0Buttons = document.querySelectorAll(`.${ID}-gender-option`);

    [].slice.call(stage0Buttons).forEach((button) => {
        button.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                localStorage.setItem(
                    `${ID}-gender-option`,
                    e.target.getAttribute("data-option")
                );
                stage1.setAttribute(
                    "data-active",
                    e.target.getAttribute("data-option")
                );
                quizHeader.setAttribute(
                    "data-active",
                    e.target.getAttribute("data-option")
                );
                stageNumber = 1;
                moveForwardStage();

                fireEvent(
                    "Visible - user has got to stage 1 and selected: " +
                    e.target.getAttribute("data-option") +
                    " for their gender"
                );
            },
            false
        );
    });

    // Stage 1 event handler

    let stage1Buttons = document.querySelectorAll(`.${ID}-category-option`);

    [].slice.call(stage1Buttons).forEach((button) => {
        button.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                e.stopPropagation();

                localStorage.setItem(
                    `${ID}-category-option`,
                    e.target.getAttribute("data-stageurl")
                );
                localStorage.setItem(
                    `${ID}-catcode-option`,
                    e.target.getAttribute("data-catcode")
                );

                if (
                    e.target.getAttribute("data-hideprice") !== "" &&
                    e.target.getAttribute("data-hideprice") !== null
                ) {
                    localStorage.setItem(`${ID}-hideprice`, true);
                } else {
                    localStorage.setItem(`${ID}-hideprice`, false);
                }

                if (
                    e.target.getAttribute("data-direct") !== "" &&
                    e.target.getAttribute("data-direct") !== null
                ) {
                    localStorage.setItem(`${ID}-last-url`, "");
                    if (e.target.getAttribute("data-direct") == "giftcards") {
                        quizBody.classList.add(`${ID}-calculating`);
                        quizProgressBarInner.setAttribute("data-percent", 100);
                        quizProgressBarInner.innerText = "100%";
                        fireEvent(
                            "Visible - user has got to stage 2 and selected: Gift Cards"
                        );
                        let fullURL =
                            "https://www.houseoffraser.co.uk/brand/gift/voucher-gift-card-976018#colcode=97601891";
                        window.location.href = fullURL;
                    } else {
                        localStorage.setItem(
                            `${ID}-catlevtwo-option`,
                            e.target.getAttribute("data-direct")
                        );
                        localStorage.setItem(`${ID}-direct`, true);
                        stageNumber = 3;
                        moveForwardStage();
                        fireEvent(
                            `Visible - user has got to stage 2 and selected: ${e.target.getAttribute(
                                "data-option"
                            )}`
                        );
                    }
                } else {
                    stage2.setAttribute(
                        "data-active",
                        e.target.getAttribute("data-option")
                    );
                    localStorage.setItem(`${ID}-direct`, false);
                    stageNumber = 2;
                    moveForwardStage();
                }

                fireEvent(
                    "Visible - user has got to stage 2 and selected: " +
                    e.target.innerText +
                    " for their category"
                );
            },
            false
        );
    });

    // Stage 2 event handler

    let stage2Buttons = document.querySelectorAll(`.${ID}-catlevtwo-option`);

    [].slice.call(stage2Buttons).forEach((button) => {
        button.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (
                    e.target.getAttribute("data-hideprice") !== "" &&
                    e.target.getAttribute("data-hideprice") !== null
                ) {
                    localStorage.setItem(`${ID}-hideprice`, true);
                } else {
                    localStorage.setItem(`${ID}-hideprice`, false);
                }

                localStorage.setItem(
                    `${ID}-catlevtwo-option`,
                    e.target.getAttribute("data-option")
                );
                stageNumber = 3;
                moveForwardStage();

                fireEvent(
                    "Visible - user has got to stage 3 and selected: " +
                    e.target.innerText +
                    " for their 2nd level category"
                );
            },
            false
        );
    });

    // Stage 3 event handler

    let stage3Buttons = document.querySelectorAll(`.${ID}-price-option`);

    [].slice.call(stage3Buttons).forEach((button) => {
        button.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                e.stopPropagation();

                quizBody.classList.add(`${ID}-calculating`);
                let stageURL = localStorage.getItem(`${ID}-catlevtwo-option`);
                let pricerange = e.target.getAttribute("data-price");
                quizProgressBarInner.setAttribute("data-percent", 100);
                quizProgressBarInner.innerText = "100%";
                let fullURL = `https://www.houseoffraser.co.uk${stageURL}#dcp=1&dppp=100&OrderBy=rank&Filter=APRI%5E${encodeURIComponent(
                    pricerange
                )}`;
                logMessage("Full URL used: " + fullURL);
                fireEvent(
                    "Visible - user has got to stage 3 and selected: " +
                    e.target.innerText +
                    " for their price"
                );
                fireEvent(
                    "Redirect - user has got to stage 3 and been redirected to: " +
                    fullURL
                );
                localStorage.setItem(`${ID}-last-url`, fullURL);
                window.location.href = fullURL;
            },
            false
        );
    });

    let exitButton = document.getElementById(`${ID}-quiz--exit`);
    exitButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (placement == "url") {
            window.location.href = document.referrer;
        } else {
            closeQuiz();
        }

        fireEvent("Click - user has clicked the exit button to close the quiz");
    });

    document.documentElement.addEventListener("click", (e) => {
        if (e.target.classList.contains(`${ID}-noscroll`)) {
            closeQuiz();
            fireEvent(
                "Click - user has clicked outside the modal to close the quiz"
            );
        }
    });
};

const trackAllItems = () => {
    let navlist = document.getElementById("navlist");
    let allClickableItems = navlist.querySelectorAll("li");
    [].slice.call(allClickableItems).forEach((item) => {
        item.addEventListener("click", () => {
            fireEvent(
                "Click - user has clicked on an item on the PLP directly after using the gift finder"
            );
        });
    });
};

const addPLPTrigger = () => {
    if (
        !document.querySelector(`.${ID}-quiz--catpagelink`) &&
        document.getElementById("navlist").querySelectorAll("li").length > 16
    ) {
        let placeButtonHTML = `
            <li class="${ID}-quiz--catpagelink"><button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-quiz--catpagebutton">
                <div class="${ID}-quiz--placebuttontextholder">
                    <h2> Looking for the perfect gift? </h2>
                    <p> Find Now </p>
                </div>
            </button> </li>
        `;

        document
            .getElementById(`navlist`)
            .querySelector("li:nth-child(17)")
            .insertAdjacentHTML("afterend", placeButtonHTML);

        document
            .getElementById(`${ID}-quiz--placebutton`)
            .addEventListener("click", () => {
                document.documentElement.classList.add(`${ID}-noscroll`);
                document
                    .querySelector(`.${ID}-quiz`)
                    .classList.add(`${ID}-active`);
                fireEvent(`Click - user has clicked the gift finder button on the category page: ${window.location.href}`);
            });

        checkElemHeight();

        window.addEventListener(
            "resize",
            debounce(
                () => {
                    checkElemHeight();
                },
                250,
                { trailing: true }
            )
        );
    }
};

const checkElemHeight = () => {
    let nextElemHeight = parseInt(
        document
            .querySelector(`.${ID}-quiz--catpagelink`)
            .nextElementSibling.getBoundingClientRect().height
    );
    document.querySelector(`.${ID}-quiz--catpagelink`).style.height =
        nextElemHeight + "px";
};

export default () => {
    setup();

    logMessage(ID + " Variation: " + VARIATION);

    fireEvent("Conditions Met");

    // -----------------------------
    // Add events that apply to both variant and control
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (shared.VARIATION == "control") {
        return;
    }

    // Write experiment code here
    // ...

    document.documentElement.classList.add(`${ID}-experiment-begins`);

    if (window.location.href.indexOf("/gift-finder") > -1 && VARIATION == 2) {
        buildQuiz("url");
    } else {
        buildQuiz("modal");

        let bgImage = `<img src="https://blcro.fra1.digitaloceanspaces.com/HOF-795/HOF-795-button-desktop.jpg" class="${ID}-quiz--placebuttonimg" alt="background gift finder image" />`;
        if (window.outerWidth < 992 && window.outerWidth > 600) {
            bgImage = `<img src="https://blcro.fra1.digitaloceanspaces.com/HOF-795/HOF-795-button-tablet.jpg" class="${ID}-quiz--placebuttonimg" alt="background gift finder image" />`;
        } else if (window.outerWidth < 600) {
            bgImage = `<img src="https://blcro.fra1.digitaloceanspaces.com/HOF-795/HOF-795-button-mobile.jpg" class="${ID}-quiz--placebuttonimg" alt="background gift finder image" />`;
        }

        if (window.location.href.indexOf("/just-for-you") > -1) {
            pollerLite([`.HOF-637-justforthem`], () => {
                let placeButtonHTML = `
                    <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton">
                        ${bgImage}
                        <div class="${ID}-quiz--placebuttontextholder">
                            <h2> Looking for the perfect gift? </h2>
                            <p> Find Now </p>
                        </div>
                    </button>
                `;

                document
                    .querySelector(`.HOF-637-justforthem`)
                    .insertAdjacentHTML("afterend", placeButtonHTML);

                document
                    .getElementById(`${ID}-quiz--placebutton`)
                    .addEventListener("click", () => {
                        document.documentElement.classList.add(
                            `${ID}-noscroll`
                        );
                        document
                            .querySelector(`.${ID}-quiz`)
                            .classList.add(`${ID}-active`);
                        fireEvent(
                            "Click - user has clicked the gift finder button on the Just for You page"
                        );
                    });
            });
        } 
        
        // else if (document.body.classList.contains("Home")) {
        //     pollerLite([`.HOF_HOME1`], () => {
        //         let placeButtonHTML = `
        //             <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-homebutton">
        //                 ${bgImage}
        //                 <div class="${ID}-quiz--placebuttontextholder">
        //                     <h2> Looking for the perfect gift? </h2>
        //                     <p> Find Now </p>
        //                 </div>
        //             </button>  
        //         `;

        //         document
        //             .querySelector(`.HOF_HOME1`)
        //             .insertAdjacentHTML("afterend", placeButtonHTML);

        //         document
        //             .getElementById(`${ID}-quiz--placebutton`)
        //             .addEventListener("click", () => {
        //                 document.documentElement.classList.add(
        //                     `${ID}-noscroll`
        //                 );
        //                 document
        //                     .querySelector(`.${ID}-quiz`)
        //                     .classList.add(`${ID}-active`);
        //                 fireEvent(
        //                     "Click - user has clicked the gift finder button on the Homepage"
        //                 );
        //             });
        //     });
        // } 
        
        else if (window.location.href.indexOf("/christmas") > -1) {
            pollerLite([`#hofLandingPage .dy-placeholder`], () => {

                bgImage = `<img src="https://www.houseoffraser.co.uk/images/marketing/dy-assets/hof-hub-banner-dy-giftfinder-d-2.jpg" class="${ID}-quiz--placebuttonimg" alt="background gift finder image" />`;
                if (window.outerWidth < 992 && window.outerWidth > 600) {
                    bgImage = `<img src="https://blcro.fra1.digitaloceanspaces.com/HOF-795/HOF-795-button-tablet.jpg" class="${ID}-quiz--placebuttonimg" alt="background gift finder image" />`;
                } else if (window.outerWidth < 600) {
                    bgImage = `<img src="https://www.houseoffraser.co.uk/images/marketing/dy-assets/hof-hub-banner-dy-giftfinder-m-2.jpg" class="${ID}-quiz--placebuttonimg" alt="background gift finder image" />`;
                }

                let placeButtonHTML = `
                    <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-quiz--xmaspagebutton">
                        ${bgImage}
                        <div class="${ID}-quiz--placebuttontextholder">
                            <h2> Looking for the perfect gift? </h2>
                            <p> Find Now </p>
                        </div>
                    </button>  
                `;

                document
                    .querySelector(`#hofLandingPage .pboxes.gift-cat`)
                    .insertAdjacentHTML("afterbegin", placeButtonHTML);

                document
                    .getElementById(`${ID}-quiz--placebutton`)
                    .addEventListener("click", () => {
                        document.documentElement.classList.add(
                            `${ID}-noscroll`
                        );
                        document
                            .querySelector(`.${ID}-quiz`)
                            .classList.add(`${ID}-active`);
                        fireEvent(
                            "Click - user has clicked the gift finder button on the Christmas Page"
                        );
                    });
            });
        } 
        
        // Removing the hub pages from the experiment
        // else if (hubPages.find((page) => window.location.href == page)) {
        //     pollerLite([`#hofLandingPage .giftSection`], () => {
        //         let placeButtonHTML = `
        //             <button id="${ID}-quiz--placebutton" class="${ID}-quiz--placebutton ${ID}-quiz--hubpagebutton">
        //                 ${bgImage}
        //                 <div class="${ID}-quiz--placebuttontextholder">
        //                     <h2> Looking for the perfect gift? </h2>
        //                     <p> Find Now </p>
        //                 </div>
        //             </button>  
        //         `;

        //         document
        //             .querySelector(`#hofLandingPage .giftSection`)
        //             .insertAdjacentHTML("afterbegin", placeButtonHTML);

        //         document
        //             .getElementById(`${ID}-quiz--placebutton`)
        //             .addEventListener("click", () => {
        //                 document.documentElement.classList.add(
        //                     `${ID}-noscroll`
        //                 );
        //                 document
        //                     .querySelector(`.${ID}-quiz`)
        //                     .classList.add(`${ID}-active`);
        //                 fireEvent(
        //                     "Click - user has clicked the gift finder button on the Evergreen Hub Page: " +
        //                     window.location.href
        //                 );
        //             });
        //     });
        // }

        // // place navigation trigger
        if (window.outerWidth < 768) {
            pollerLite([".mobMenuGroup"], () => {
                let navQuizTriggerHTML = `

                <li data-id="3820032" id="mob-outlet" class="root mmHasChild has-dropdown  hofGroupI"><a class="${ID}-mobileplacebutton menuitemtext MobMenChevron">Gift Finder</a></li>
                
                `;
                let insertionPoint = document.querySelector(".mobMenuGroup");
                insertionPoint.insertAdjacentHTML(
                    "beforeend",
                    navQuizTriggerHTML
                );

                document
                    .querySelector(`.${ID}-mobileplacebutton`)
                    .addEventListener("click", () => {
                        document.documentElement.classList.add(
                            `${ID}-noscroll`
                        );
                        document
                            .querySelector(`.${ID}-quiz`)
                            .classList.add(`${ID}-active`);
                        fireEvent(
                            "Click - user has clicked the gift finder button in the Nav on mobile"
                        );
                    });
            });
        } else {
            pollerLite(["#topMenu .SubMenuWrapper"], () => {
                let navQuizTriggerHTML = `
                    <a href="#" id="${ID}-navbutton" class="${ID}-navbutton">Looking for the perfect gift? Try our gift finder</a> 
                `;
                document.documentElement.classList.add(`${ID}-nav-item-added`);
                let allSubmenuWrappers = document.querySelectorAll(
                    "#topMenu .SubMenuWrapper"
                );

                [].slice.call(allSubmenuWrappers).forEach((subMenu) => {
                    if (!subMenu.querySelector("ul.Brands")) {
                        subMenu.insertAdjacentHTML(
                            "beforeend",
                            navQuizTriggerHTML
                        );
                    }
                });

                [].slice
                    .call(document.querySelectorAll(`.${ID}-navbutton`))
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            document.documentElement.classList.add(
                                `${ID}-noscroll`
                            );
                            document
                                .querySelector(`.${ID}-quiz`)
                                .classList.add(`${ID}-active`);
                            fireEvent(
                                "Click - user has clicked the gift finder button in the Nav on desktop"
                            );
                        });
                    });
            });
        }

        // Onward tracking category page

        if (document.body.classList.contains("flanProdList")) {
            pollerLite(["#navlist"], function () {
                if (
                    categoryPages.find(
                        (page) => window.location.href.indexOf(page) > -1
                    )
                ) {
                    addPLPTrigger();
                }

                observer.connect(
                    document.getElementById("navlist"),
                    function () {
                        if (
                            categoryPages.find(
                                (page) =>
                                    window.location.href.indexOf(page) > -1
                            )
                        ) {
                            addPLPTrigger();
                        }
                    },
                    {
                        config: {
                            attibutes: true,
                            childList: true,
                            subTree: true,
                        },
                    }
                );
            });
        }
    }

    if (
        document.body.classList.contains("flanProdList") &&
        localStorage.getItem(`${ID}-last-url`) &&
        localStorage.getItem(`${ID}-last-url`) !== ""
    ) {
        localStorage.setItem(`${ID}-last-url`, "");

        pollerLite(["#navlist"], function () {
            trackAllItems();

            observer.connect(
                document.getElementById("navlist"),
                function () {
                    trackAllItems();
                },
                {
                    config: {
                        attibutes: true,
                        childList: true,
                        subTree: true,
                    },
                }
            );
        });
    }
};
