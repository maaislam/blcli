$("body").on("mouseenter", ".tooltip-link", function () {
  var n = $(this);
  Tipped.create(n, $(this).data("target"), {
    inline: !0,
    skin: "custom",
    hook: "topmiddle",
  });
});
