$(document).ready(function () {
    var rad;
    $(".circle").each(function () {
        var w = $(this).width();
        var h = $(this).height();
        var title = $(this).attr("data-name");
        var color = $(this).attr("data-color");
        var width = $(this).attr("data-width");
        rad = Math.PI * (w / 2 - width) * 2;
        $(this).attr("viewbox", "0 0 " + w + " " + h);
        $(this).children(".cback").attr({
            cx: w / 2,
            cy: h / 2,
            r: w / 2 - width,
            stroke: "#efefef",
            "stroke-width": width,
            fill: "transparent"
        });
        $(this).children(".cbar").attr({
            cx: w / 2,
            cy: h / 2,
            r: w / 2 - width,
            stroke: color,
            "stroke-width": width,
            fill: "transparent",
            "stroke-dasharray": "0 " + rad,
            style: "transform: rotate(-90deg);transform-origin: center;"
        });
        $(this).children(".ctitle").text(title);
        $(this).children(".ctitle").attr({
            x: w / 2,
            y: h / 2 - 15,
            "font-size": 16,
            "text-anchor": "middle"
        });
        $(this).children(".cvalue").attr({
            x: w / 2,
            y: h / 2 + 25,
            "font-size": 30,
            "text-anchor": "middle"
        });

        start(this);
    });

    function start(who) {
        var value = $(who).attr("data-value") * 0.01;
        $(who).children(".cbar").animate({
            dummy: rad * value
        }, {
            duration: 1000,
            step: function (now, fx) {
                $(this).css("stroke-dasharray", now + " " + rad);
                var n = parseInt(now / rad * 100);
                $(this).siblings(".cvalue").text(n + "%");
            }
        });
    };
    // drop(); v 리사이즈기능넣기
    $(window).resize(function () {
        drop();
    });

    function drop() {
        if ($(window).width() <= 459) {
            $(".circle[data-name='JavaScript']").children('.ctitle').text("JS");
            $(".circle[data-name='Android Studio']").children('.ctitle').text("JDK");
        } else {
            $(".circle[data-name='JavaScript']").children('.ctitle').text("Java Script");
            $(".circle[data-name='Android Studio']").children('.ctitle').text("Android Studio");
        }
    };



});










