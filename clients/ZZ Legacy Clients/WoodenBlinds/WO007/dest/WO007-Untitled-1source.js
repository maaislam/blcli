$(document).ready(function () {
    $("select").wrap('<span class="js-select" />');
    $.each($("select"), function () {
        $("select").selectmenu({
            width: "100%"
        })
    });
    $("select").on("selectmenuchange", function (l, t) {
        var i = "#" + $(this).attr("id");
        $(i).trigger("change")
    });
    $(".flyout-inner *").on("touchstart", function (i) {
        if ($(i.target).parents().hasClass("ui-selectmenu-open")) {
            return
        }
        var l = $(".ui-selectmenu-open");
        if (l.length > 0) {
            l.removeClass("ui-selectmenu-open")
        }
    });
    $("select").on("selectmenuclose", function (i, l) {
        $(".ui-selectmenu-menu").appendTo("body")
    });
    var k = $(".navigation > ul > li").length - 2;
    var h = $(".navigation > ul > li").length - 3;
    $(".navigation li:last-child").addClass("nav-item-rhs");
    $(".navigation > ul > li:eq(" + k + ")").addClass("nav-item-rhs");
    $(".navigation > ul > li:eq(" + h + ")").addClass("nav-item-cen");
    $(".sitemap-tree li.sitemap-haschildren").each(function () {
        $(this).prepend('<span title="Expand"/>')
    });
    $(".sitemap-tree span").on("click", function () {
        $(this).toggleClass("opened");
        $(this).parent().find(" > ul").slideToggle("fast")
    });
    $(".jumbotron").on("cycle-initialized", function (l, i) {
        setTimeout(function () {
            $.each($(".cycle-page"), function () {
                $(".cycle-page").show()
            })
        }, 1000)
    });
    $.each($(".jumbotron"), function () {
        $(".jumbotron").cycle({
            speed: 600,
            slides: "> .jumbotron-slide",
            swipe: true
        })
    });
    var a = $(".jumbotron").children(".jumbotron-slide").length;
    if (a <= 1) {
        $(".cycle-next, .cycle-prev").remove()
    } else {
        $(".cycle-next, .cycle-prev").css("display", "visible")
    }

    function j() {
        $(".jumbotron-slide").each(function () {
            var t = $(".jumbotron-content-first", this).height();
            var v = $(".jumbotron-button", this).height() + 30;
            if ($(".jumbotron-content-first p", this).length == 0 && $(".jumbotron-button", this).length == 0) {
                $(".jumbotron-content", this).remove()
            } else {
                if (t > v) {
                    $(".jumbotron-content-last", this).height(t)
                } else {
                    $(".jumbotron-content-first", this).height(v);
                    $(".jumbotron-content-last", this).height(v)
                }
            }
            var l = $(this);
            var i = l.width();
            var u = (i - 619) / 2;
            $("img", this).css("margin-left", u)
        })
    }
    j();
    $(window).resize(function () {
        j()
    }).resize();
    if (!$(".navigation li:first-child").hasClass("nav-current") && $(".navigation li.nav-current").length > 0 && $(".navigation li.nav-current").hasClass("nav-haschildren")) {
        $(".nav-button-expand").show()
    }
    $(".checkout-payment-button").on("click", function (i) {
        if ($(".checkout-discount-box").attr("value") !== "") {
            $.magnificPopup.open({
                items: {
                    src: ".checkout-discount-warning",
                    type: "inline"
                }
            }, 0);
            return false
        }
        return true
    });
    $(".checkout-discount-proceed").click(function () {
        return true;
        $(".checkout-payment-button").trigger("click")
    });
    $(".checkout-discount-apply").click(function () {
        $.magnificPopup.close();
        $(".checkout-discount-box").focus();
        e.stopPropagation();
        return false
    });

    function c() {
        var i = $(window).width();
        if (i < 400) {
            return "xs-mobile"
        }
        if (i < 768) {
            return "mobile"
        }
        if (i < 960) {
            return "tablet"
        }
        return "desktop"
    }
    $(".tooltip").each(function () {
        $(this).attr("tabindex", "0")
    });
    $(".tooltip").on({
        mouseenter: function () {
            var i = "#" + $(this).data("tooltip");
            r(i)
        },
        mouseleave: function () {
            var i = "#" + $(this).data("tooltip");
            m(i)
        },
        focus: function () {
            var i = "#" + $(this).data("tooltip");
            r(i)
        },
        blur: function () {
            var i = "#" + $(this).data("tooltip");
            m(i)
        }
    });

    function r(i) {
        var l = $(i).height() / 2;
        $(i).addClass("tooltip-hovered");
        $(i).addClass("tooltip-hovered").css({
            "margin-top": "-" + l + "px"
        })
    }

    function m(i) {
        $(i).removeClass("tooltip-hovered")
    }
    $(".modal").on("click", function () {
        var t = c();
        var l = $(this).attr("href");
        if (t == "desktop" || t == "tablet") {
            $.magnificPopup.open({
                items: {
                    src: l,
                    type: "inline"
                }
            }, 0)
        }
        var i = $(l).find(".venue-details-extra-map div div");
        if (i.length > 0) {
            $(i[0]).trigger("mapshown")
        }
        return false
    });
    $(".modal-close").on("click", function () {
        $(".modal-window").removeClass("modal-visible")
    });
    $(".course-search-location .course-venue-name").on("click", function () {
        var t = c();
        if (t == "mobile" || t == "xs-mobile") {
            var l = $(this).parent().find(".modal-window");
            l.toggleClass("modal-visible");
            l.toggleClass("mfp-hide");
            var i = l.find(".venue-details-extra-map div div");
            if (i.length > 0) {
                $(i[0]).trigger("mapshown")
            }
        }
    });
    if (!Modernizr.svg) {
        var g = document.getElementsByTagName("img");
        var d = /.*\.svg$/;
        var b = g.length;
        for (var f = 0; f < b; f++) {
            if (g[f].src.match(d)) {
                g[f].src = g[f].src.slice(0, -3) + "png";
                console.log(g[f].src)
            }
        }
    }
    $(".button-disabled").on("click", function () {
        return false
    });
    $("input, textarea").placeholder();
    $("table").wrap('<div class="table-responsive" />');
    var n = /(iPhone|iPod)/g.test(navigator.userAgent);
    if (n) {
        $("input.js-date").addClass("date-ios")
    }
    $("input.datepicker").each(function () {
        $(this).wrap('<div class="js-datepicker" />')
    });
    $(".js-datepicker").each(function () {
        $(this).prepend('<span class="datepicker-icon"><i class="icon-calendar"></i></span>')
    });

    function q() {
        $(".course-search-form-main .datepicker-icon, .home-course-search .datepicker-icon").each(function () {
            var i = $(this).height() + "px";
            $("i", this).css({
                "line-height": i
            })
        })
    }
    q();
    $(".form-number-buttons").each(function () {
        $(this).wrap('<div class="js-number" />');
        $(this).before('<a href="" class="js-number-minus">-</a>');
        $(this).after('<a href="" class="js-number-add">+</a>')
    });
    $(".form-number-buttons").bind("change", function () {
        $(this).parent().parent().find(".button-updatebutton").prop("value", "UPDATE BASKET");
        var t = parseInt($(this).data("items-current"));
        var l = $(this).val();
        if (t > l) {
            var i = parseInt($(this).data("items-added"));
            i = i - (t - l);
            $(this).data("items-added", i);
            $(this).data("items-current", l)
        } else {
            if (t < l) {
                var i = parseInt($(this).data("items-added"));
                i = i + (l - t);
                $(this).data("items-added", i);
                $(this).data("items-current", l)
            }
        }
    });
    $(".js-number-minus").on("click", function (l) {
        l.preventDefault();
        var u = $(this).next();
        var t = parseInt(u.val());
        var i = t - 1;
        if (i < 0) {
            i = 0
        }
        u.val(i);
        u.change()
    });
    $(".js-number-add").on("click", function (l) {
        l.preventDefault();
        var u = $(this).prev();
        var t = parseInt(u.val());
        var i = t + 1;
        u.val(i);
        u.change()
    });
    $("input[type=radio]").each(function () {
        $(this).wrap('<span class="js-radio"/>');
        if ($(this).is(":checked")) {
            $(this).parent().addClass("js-selected")
        }
    });
    $(".rtoverlay").each(function () {
        $(".rtoverlay").magnificPopup({
            type: "image"
        })
    });
    $(".form-radio-inline").on("click", function () {
        var i = $("input", this).attr("name");
        $('input[name="' + i + '"]').parent().each(function () {
            $(this).removeClass("js-selected")
        });
        $(".js-radio", this).addClass("js-selected")
    });
    $("input[type=checkbox]").each(function () {
        $(this).wrap('<span class="js-checkbox"/>');
        if ($(this).is(":checked")) {
            $(this).parent().addClass("js-selected")
        }
    });
    $(".js-checkbox input").on("change", function () {
        $(this).parent().toggleClass("js-selected");
        if ($(this).parent().hasClass("js-selected")) {
            $(this).attr("checked", "checked")
        } else {
            $(this).removeAttr("checked")
        }
    });
    $(".js-radio input, .js-checkbox input").on("focus", function () {
        $(this).parent().addClass("js-focus")
    });
    $(".js-radio input, .js-checkbox input").on("focusout", function () {
        $(this).parent().removeClass("js-focus")
    });
    $(".tab-switcher a").on("click", function () {
        $(".tab-switcher a").removeClass("tab-selected");
        $(".tab-panel").hide();
        var i = $(this).attr("id");
        $(this).addClass("tab-selected");
        $("." + i).fadeIn("fast");
        return false
    });
    $(".nav-button-expand").on("click", function () {
        $(".nav-button-expand > i").toggleClass("icon-arrow-right").toggleClass("icon-arrow-down");
        $(".nav-current > ul").toggleClass("navigation-hovered");
        if ($(".nav-current").hasClass("infront")) {
            $(".navigation-overlay").addClass("hide_overlay").removeClass("show_overlay");
            $(".infront").removeClass("infront")
        } else {
            $(".navigation-overlay").addClass("show_overlay").removeClass("hide_overlay");
            $(".nav-current").addClass("infront")
        }
        return false
    });
    $(".subnav-haschildren").prepend('<i class="icon-arrow-right"></i>');
    $(".subnav-haschildren.subnav-active > i").removeClass("icon-arrow-right").addClass("icon-arrow-down");
    $(".touch .nav-haschildren").on("touchend", function (i) {
        console.log("touchend nav");
        $(".nav-button-expand > i").toggleClass("icon-arrow-right").toggleClass("icon-arrow-down");
        $(".navigation-overlay").addClass("show_overlay").removeClass("hide_overlay");
        if ($(this).hasClass("infront") || ($(".nav-current").length > 0 && $(".nav-current > ul").hasClass("navigation-hovered"))) {
            return true
        } else {
            $("ul", this).toggleClass("navigation-hovered");
            $(this).addClass("infront");
            return false
        }
    });
    $(".touch .nav-haschildren").on("touchstart", function (i) {
        if (!$(this).hasClass("infront")) {
            console.log("preventing default");
            i.preventDefault()
        }
    });
    $(".touch .nav-haschildren").on("click", function (i) {
        console.log("click nav")
    });
    $(".touch .popup").on("touchend", function (i) {
        $(".navigation-overlay").addClass("show_overlay").removeClass("hide_overlay");
        if (!$(this).hasClass("infront")) {
            $(this).addClass("infront");
            $(".infront").find(".touch-dropdown").css("display", "block");
            return false
        } else {
            return true
        }
    });
    $(".navigation-overlay a").on("touchend click", function (i) {
        $(".navigation-overlay").addClass("hide_overlay").removeClass("show_overlay");
        $(".infront").find(".touch-dropdown").css("display", "none");
        $(".infront").children("ul").toggleClass("navigation-hovered");
        $(".infront").removeClass("infront")
    });
    if (!$(".subnav-current").is(".subnav-level-2")) {
        $(".subnav-current").find(" > ul").slideToggle("fast")
    }
    $(".js-subnav i").on("click", function (i) {
        $(this).toggleClass("icon-arrow-right").toggleClass("icon-arrow-down");
        $(this).parent().find(" > ul").toggle()
    });
    $(".js-subnav span").on("click", function (i) {
        $(this).parent().find(" > i").toggleClass("icon-arrow-right").toggleClass("icon-arrow-down");
        $(this).parent().find(" > ul").slideToggle("fast")
    });
    $(".subnav-haschildren.subnav-active > ul").show();

    function s(i) {
        var l = 0;
        $(i).each(function () {
            if ($(this).height() > l) {
                l = $(this).height()
            }
        });
        $(i).height(l)
    }
    s($(".footer section"));
    $(".flyout-inner").height($(window).height() - 50);
    $(".flyout-inner").height($(window).height() - 50);
    $(window).resize(function () {
        if (!window.matchMedia("(max-width: 767px)").matches) {
            $("body").removeClass("flyout-is-open");
            $(".site-container").css({
                height: "auto"
            })
        }
    });
    $(".flyout-close").on("click", function () {
        $(".flyout").removeClass("flyout-out");
        o();
        return false
    });
    $(".flyout-tab").on("click", function (i) {
        if ($(".flyout").hasClass("flyout-out")) {
            o()
        } else {
            p()
        }
        return false
    });
    $("#overlay").on("click", o);

    function p() {
        $("#overlay").removeClass("show_overlay").removeClass("overlay_datepicker");
        $("#overlay").addClass("show_overlay").removeClass("hide_overlay");
        $(".flyout").animate({
            right: "0"
        }, 250).addClass("flyout-out");
        $("body").addClass("flyout-is-open");
        $(".site-container").height($(window).height())
    }

    function o() {
        $("#overlay").addClass("hide_overlay").removeClass("show_overlay");
        $(".flyout").css({
            right: "-20em"
        }).removeClass("flyout-out");
        $("body").removeClass("flyout-is-open");
        $(".site-container").css({
            height: "auto"
        });
        return false
    }
    $(".site-search-icon").on("click", function () {
        $(this).toggleClass("js-selected");
        $(".site-search").toggleClass("site-search-show");
        return false
    });
    $(".checkout-login-panel-button").on("click", function () {
        $(this).removeClass("button-primary").addClass("button button-disabled");
        $(".checkout-login-panel").slideDown("fast");
        return false
    });
    $(".checkout-panel-close").on("click", function () {
        $(".checkout-login-panel-button").removeClass("button button-disabled").addClass("button-primary");
        $(".checkout-login-panel").slideUp("fast");
        return false
    });
    $(".jumbotron-pause").click(function () {
        var i = $(".jumbotron");
        if (i.is(".cycle-paused")) {
            i.cycle("resume");
            $(this).removeClass("paused");
            $(this).find("i").removeClass("icon-arrow-right").addClass("icon-pause")
        } else {
            i.cycle("pause");
            $(this).addClass("paused");
            $(this).find("i").removeClass("icon-pause").addClass("icon-arrow-right")
        }
        return false
    });
    $(".course-change-search").on("click", function () {
        if ($(".show-internal-search").hasClass("hidden")) {
            $(".show-internal-search").removeClass("hidden").addClass("visible-xs-block")
        } else {
            $(".show-internal-search").removeClass("visible-xs-block").addClass("hidden")
        }
        return false
    });
    if ($(".cart-mini").hasClass("cart-added")) {
        window.setTimeout(function () {
            $(".cart-mini").removeClass("cart-added")
        }, 5000)
    }
    $(".scfForm input[type=submit], .scfCheckbox, .scfCheckbox js-checkbox").before("<label/>");
    $(".scfSectionContent > div").each(function () {
        if ($(this).has(".scfRequired").length || $(this).has(".scfValidatorRequired").length) {
            $("label", this).append(' <abbr title="required" class="required">*</abbr>')
        }
    });
    $(".calc-body .BookNowButton").text("Book course now");
    $(".main-content").each(function () {
        $(".main-content").fitVids()
    })
});