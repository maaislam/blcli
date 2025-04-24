import shared from "./shared";
import settings from "./settings";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import { fireEvent } from "./services";
import { getCookie } from "../../../../../lib/utils";

const overlay = {
  openClass: "is-open",
  elements: {},
  setElements() {
    this.elements.overlay = document.querySelector(`.${ID}-overlay`);
    this.elements.close = document.querySelector(`.${ID}-overlay-close`);
    this.elements.game = document.querySelector(`.${ID}-overlay-game`);
  },
  open() {
    this.elements.overlay.classList.add(this.openClass);
    this.elements.game.src = `${settings.gameURL}?userid=${getCookie("asuid")}`;
    fireEvent("Game opened");
  },
  close() {
    this.elements.overlay.classList.remove(this.openClass);
    this.elements.game.src = "";
    fireEvent("Game closed");
  },
  addEvents() {
    const self = this;
    this.elements.game.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    // Close on close click
    this.elements.close.addEventListener("click", () => {
      self.close();
    });
    document.body.addEventListener("click", () => {
      self.close();
    });
    document.addEventListener("keyup", (e) => {
      if (e.which == 27) {
        self.close();
      }
    });
  },
  eventTracking() {
    const iframe = this.elements.game;
    window.addEventListener('blur', e => {
      if(document.activeElement.className.match(/overlay-game/)) {
        ga('send', 'pageview', '/papa-jump');
        fireEvent('Started Game');
      }
    });

    window.addEventListener('message', m => {
      if(m && m.data && m.data.type == 'game_end') {
        fireEvent('Game End - Score: ' + m.data.score);
        fireEvent('Game End - Duration: ' + m.data.duration);
      }
    });
  },
  init() {
    this.setElements();
    this.addEvents();
    this.eventTracking();
  },
};

export default overlay;
