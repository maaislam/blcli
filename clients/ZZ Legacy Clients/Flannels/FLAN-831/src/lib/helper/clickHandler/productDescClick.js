export function productDescClick(productDesc, button) {
  productDesc.hasClass("showLess")
    ? (productDesc.removeClass("showLess"), productDesc.addClass("showMore"), button.find(`span`).text("Show Less"), button.attr("aria-expanded", "true"))
    : (productDesc.removeClass("showMore"), productDesc.addClass("showLess"), button.find(`span`).text("Read More"), button.attr("aria-expanded", "false"));
}
