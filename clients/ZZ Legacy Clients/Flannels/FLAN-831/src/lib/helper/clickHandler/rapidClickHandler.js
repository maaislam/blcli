function makeTabbable(tabElems, unTabElems) {
  if (unTabElems) for (var e = 0; e < unTabElems.length; e++) unTabElems[e].setAttribute("tabindex", "-1"), unTabElems[e].classList.add("is_disabled");
  if (tabElems) for (e = 0; e < tabElems.length; e++) tabElems[e].removeAttribute("tabindex"), tabElems[e].classList.remove("is_disabled");
}
function expandableSectionClose(section) {
  var e = document.getElementById(section.getAttribute("aria-labelledby")),
    t = section.querySelectorAll("a, button, input, textarea, select, label"),
    t = Array.prototype.slice.call(t);
  e.setAttribute("aria-expanded", !1),
    e.classList.remove("is_expanded"),
    section.setAttribute("aria-hidden", !0),
    section.classList.remove("is_expanded"),
    makeTabbable(!(section.style.height = "0px"), t);
}
function expandableSectionOpen(section) {
  var e = document.getElementById(section.getAttribute("aria-labelledby")),
    t = section.querySelectorAll("a, button, input, textarea, select, label"),
    t = Array.prototype.slice.call(t);
  e.setAttribute("aria-expanded", !0),
    e.classList.add("is_expanded"),
    section.setAttribute("aria-hidden", !1),
    section.classList.add("is_expanded"),
    makeTabbable(t, !(section.style.height = "auto"));
}

export function rapidClickHandler(element, button) {
  (button.classList.contains("is_expanded") ? expandableSectionClose : expandableSectionOpen)(element);
}
