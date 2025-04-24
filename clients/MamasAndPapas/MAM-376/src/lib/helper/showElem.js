const showElem = (elemClass, ID) => {
    document.querySelector(`.${elemClass}`).classList.remove(`${ID}-hide-elem`)
}


export default showElem