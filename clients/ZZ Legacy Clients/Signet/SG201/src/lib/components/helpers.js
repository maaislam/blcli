import shared from "../../../../../../core-files/shared";

const { ID } = shared;

export const closeNav = () => {
    const burger = document.querySelector(`.${ID}-navToggle`);
    const navClose = document.querySelector(`.Nav__close`);
    const overlay = document.querySelector(`.${ID}-overlay`);

    if(document.querySelector(`.${ID}-navigation`).classList.contains(`${ID}-open`)) {
        document.querySelector(`.${ID}-navigation`).classList.remove(`${ID}-open`);
        document.querySelector(`.${ID}-navigation`).classList.add(`${ID}-closed`);
        document.documentElement.classList.remove(`${ID}-noScroll`);
        burger.classList.remove(`${ID}-hidden`);
        navClose.classList.remove(`${ID}-visible`);
        overlay.classList.remove(`${ID}-visible`);

        if(document.querySelector('.Nav__level.Nav__level-1.Nav__title.Nav__level--active')){
            document.querySelector('.Nav__level.Nav__level-1.Nav__title.Nav__level--active').classList.remove('Nav__level--active')
        }
        if(document.querySelector('.Nav__level.Nav__level-2.Nav__level--active')){
            document.querySelector('.Nav__level.Nav__level-2.Nav__level--active').classList.remove('Nav__level--active')
        }
    }
}

export const hideSearch = () => {
    const search = document.querySelector(`.${ID}-search`);
    const overlay = document.querySelector(`.${ID}-searchoverlay`);
    if(search.classList.contains(`${ID}-open`)) {
        document.documentElement.classList.remove(`${ID}-noScroll`);
        search.classList.remove(`${ID}-open`);
        search.classList.add(`${ID}-closed`);
        overlay.classList.remove(`${ID}-visible`);

        if(document.querySelector('.page-overlay') && document.querySelector('.page-overlay.page-overlay--is-active')) {
            document.querySelector('.page-overlay.page-overlay--is-active').classList.remove('page-overlay--is-active');
        }
    }
}

export const makeHeaderTransparent = (transparent) => {
    if(transparent === true) {
      document.querySelector(`.${ID}-header`).classList.add(`${ID}-transparent`);
    } else {
        document.querySelector(`.${ID}-header`).classList.remove(`${ID}-transparent`);
    }
  
  }