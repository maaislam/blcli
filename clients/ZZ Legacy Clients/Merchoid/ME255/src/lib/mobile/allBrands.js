/**
 * Brand logic on mobile nav
 */


import shared from "../shared";
//import { brandLinks } from "../navData";
import scrollToElement from "../scrollToEl";

export default () => {

    const { ID } = shared;

    /*
    * add a-z of brands
    */
    const addAllBrands = () => {
        const allBrands = document.createElement('div');
        allBrands.classList.add(`${ID}-allBrandsContainer`);
        allBrands.innerHTML = `
        
        <div class="${ID}-brandLettersWrapper">
            <h3>All Brands</h3>
            <div class="${ID}-brandLetters">
                <span class="${ID}-letter" letter-target="a">A</span>
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
            </div>
        </div>
        <div class="${ID}-brandList">
            <div class="${ID}-brandBlock" letter-name="a"><h4>A</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="b"><h4>B</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="c"><h4>C</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="d"><h4>D</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="e"><h4>E</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="f"><h4>F</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="g"><h4>G</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="h"><h4>H</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="i"><h4>I</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="j"><h4>J</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="k"><h4>K</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="l"><h4>L</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="m"><h4>M</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="n"><h4>N</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="o"><h4>O</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="p"><h4>P</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="q"><h4>Q</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="r"><h4>R</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="s"><h4>S</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="t"><h4>T</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="u"><h4>U</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="v"><h4>V</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="w"><h4>W</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="x"><h4>X</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="y"><h4>Y</h4><div class="${ID}-links"></div></div>
            <div class="${ID}-brandBlock" letter-name="z"><h4>Z</h4><div class="${ID}-links"></div></div>
        </div>`;

        if(window.innerWidth < 1024) {
            document.querySelector(`.${ID}_category.${ID}_brands .${ID}_lvl2Links`).appendChild(allBrands);
        } else {
            document.querySelector(`.${ID}_category.${ID}_brands .${ID}_lvl2Links`).insertAdjacentElement('afterend', allBrands);
        }
    }


    const brandsButton = () => {
        // Brand tab events
        const brandNav = document.querySelector(`.${ID}_navLink.${ID}_category.${ID}_brands`);
        if(brandNav) {
          brandNav.querySelector(`.${ID}_lvl2Links`).insertAdjacentHTML('beforeend', `<div class="${ID}_allBrands">Show all brands</div>`);
    
          
          // smooth scroll 
          const brandButton = brandNav.querySelector(`.${ID}_allBrands`);
          brandButton.addEventListener('click', () => {
            document.querySelector(`.${ID}-allBrandsContainer`).classList.add(`${ID}_allBrands_active`);
            const allbrands = document.querySelector(`.${ID}-allBrandsContainer`);
            const topPos = allbrands.offsetTop;
            scrollToElement(document.querySelector(`.${ID}_brands .${ID}_lvl2Links`), topPos - 50, 600);  

            brandButton.style.display = 'none';
          });
        }
    }

    // add brand links to matching letter
    const addBrandLinks = () => {
        const brands = brandLinks;

        const allBrandContainers = document.querySelectorAll(`.${ID}-brandBlock`);
        for (let index = 0; index < allBrandContainers.length; index += 1) {
            const element = allBrandContainers[index];
            const brandLetter = element.getAttribute(`letter-name`);
            
            if(brands[brandLetter]) {
                const brandData = brands[brandLetter];
                Object.keys(brandData).forEach((i) => {
                    const data = brandData[i];
                    const brandLink = document.createElement('div');
                    brandLink.classList.add(`${ID}-brandLink`);
                    brandLink.innerHTML = `
                    <a href="${data.link}">
                        <span class="${ID}-brandName">${[i][0]}</span>
                    </a>`;
                    element.querySelector(`.${ID}-links`).appendChild(brandLink);

                });
            } else {
                element.classList.add(`${ID}_noResults`);
                document.querySelector(`.${ID}-letter[letter-target=${brandLetter}]`).classList.add(`${ID}_noResults`);
            }
        }
    }

    const letterScroll = () => {

        const brandLetters = document.querySelectorAll(`.${ID}-brandLetters .${ID}-letter`);
        for (let index = 0; index < brandLetters.length; index += 1) {
            const element = brandLetters[index];
            element.addEventListener('click', (e) => {
                const letter = e.currentTarget.getAttribute('letter-target');
                const matchingEl = document.querySelector(`.${ID}-brandBlock[letter-name=${letter}]`);
                if(matchingEl) {
                    const letterPos = matchingEl.offsetTop;
                    if(window.innerWidth >= 1024) {
                        scrollToElement(document.querySelector(`.${ID}_brands .${ID}-brandList`), letterPos - 180, 600);
                    } else {
                        scrollToElement(document.querySelector(`.${ID}_brands .${ID}_lvl2Links`), letterPos - 50, 600); 
                    }
                }
            });
        }
    }

    const addBrandsTitle = () => {
        const brandSection = document.querySelector(`.${ID}_category.${ID}_brands .${ID}_lvl2Links`);
        brandSection.insertAdjacentHTML('afterbegin', '<h3>Top Brands</h3>');
    }
    

    addAllBrands();
    brandsButton();
    addBrandLinks();
    letterScroll();

    if(window.innerWidth >= 1024) {
        addBrandsTitle();
    }
}
