export const zoomIn = (event) => {
  var element = document.querySelector(".FL064-lens");
  element.style.display = "inline-block";
  var img = event.target;
  var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
  var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
  element.style.backgroundPosition = (-posX) + "px " + (-posY) + "px";
  element.style.backgroundSize = '130%;';

}

export const zoomOut = () => {
  var element = document.querySelector(".FL064-lens");
  element.style.display = "none";
}
