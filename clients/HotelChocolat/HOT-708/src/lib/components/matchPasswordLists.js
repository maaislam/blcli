import { tickIconDisable, tickIconEnable } from "../assets/svg";

const matchPasswordLists = (id) => {
    const htmlStr = `<ul class='${id}__matchPasswordLists'>
      <li id='characterMatchingText'>
        <span class='tickIconDisabled'>
          ${tickIconDisable}
        </span>
        <span class='tickIconEnabled ${id}__hide'>
          ${tickIconEnable}
        </span>
        <span class='${id}__text ${id}__textDisable'>At least 8 characters</span>
      </li>
      <li id='numberMatchingText'>
        <span class='tickIconDisabled'>
          ${tickIconDisable}
        </span>
        <span class='tickIconEnabled ${id}__hide'>
          ${tickIconEnable}
        </span>
        <span class='${id}__text ${id}__textDisable'>At least 1 number</span>
      </li>
    </ul>`;

    return htmlStr;
};

export default matchPasswordLists;