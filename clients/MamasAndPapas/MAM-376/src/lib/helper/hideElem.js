const hideElem = (elemClass, ID) => {
    document.querySelector(`.${elemClass}`).classList.add(`${ID}-hide-elem`)
}


export default hideElem