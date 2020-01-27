$(document).ready(function () {
    var dotMax = 30;
    var dotMin = 10;
    var scrW;
    var scrH;
    var marg;
    var dotLength;
    var moveMin = 50;
    var moveMax = 100;
    var boxY;

    function ini() {
        dotLength = $(".dot").length;
        scrW = $(window).innerWidth();
        scrH = $(window).innerHeight();
        boxY = $("#skills").offset().top;
        // console.log(scrH);
        setmargin();

        for (i = 0; i < dotLength; i++) {
            var ranX = Math.random() * (scrW - marg * 2) + marg;
            var ranY = Math.random() * (scrH - marg * 2) + marg;
            var x = Math.random() * (dotMax - dotMin) + dotMin;
            $(".dot").eq(i).css({
                width: x + "px",
                height: x + "px",
                borderRadius: x / 2 + "px",
                left: ranX + "px",
                top: ranY + "px"
            });
        }

        $("#dline").css({
            width: scrW + "px",
            height: scrH + "px"
        });
    }

    function resize() {
        scrW = $(window).innerWidth();
        scrH = $(window).innerHeight();
        boxY = $("#skills").offset().top;
        $("#dline").css({
            width: scrW + "px",
            height: scrH + "px"
        });
        setmargin();
    }

    function setmargin() {
        if (scrW > scrH) {
            marg = scrH * 0.3
        } else {
            marg = scrW * 0.3
        }
        // console.log(marg);
    }

    ini();

    $(window).resize(function () {
        resize();
    });


    function move(number) {
        var x = $(".dot").eq(number).offset().left;
        var y = $(".dot").eq(number).offset().top;
        // console.log("x:" + x + " y:" + y);
        if (x < marg) {
            $(".dot").eq(number).animate({
                left: marg + 50 + "px"
            }, 3000, function () {
                move(number);
            });
        } else if (x > scrW - marg) {
            $(".dot").eq(number).animate({
                left: scrW - marg - 50 + "px"
            }, 3000, function () {
                move(number);
            });
        } else if (y < marg + boxY) {
            $(".dot").eq(number).animate({
                top: marg + 50 + "px"
            }, 3000, function () {
                move(number);
            });
        } else if (y > scrH - marg + boxY) {
            $(".dot").eq(number).animate({
                top: scrH - marg - 50 + "px"
            }, 3000, function () {
                move(number);
            });
        } else {
            var moveX = Math.random() * (moveMax - moveMin) + moveMin;
            var moveY = Math.random() * (moveMax - moveMin) + moveMin;
            var dX = Math.random();
            var dY = Math.random();
            var size = Math.random() * (dotMax - dotMin) + dotMin;

            if (dX > 0.5) {
                dX = 1
            } else {
                dX = -1
            }
            if (dY > 0.5) {
                dY = 1
            } else {
                dY = -1
            }
            var dur = Math.random() * (4000) + 1000;

            $(".dot").eq(number).animate({
                left: "+=" + (moveX * dX) + "px",
                top: "+=" + (moveY * dY) + "px",
                width: size + "px",
                height: size + "px"
            }, {
                duration: dur,
                step: function () {
                    var delta = $(this).width() / dotMax;
                    $(this).css("border-radius", $(".dot").eq(number).width() / 2 + "px");
                    var dark = delta * 255;
                    dark = parseInt(dark);
                    $(this).css("background-color", "rgb(" + dark + "," + dark + "," + dark + ")");
                    $(this).css("filter", "blur(" + delta * 2.8 + "px)");
                    $(this).css("z-index", parseInt(delta * 100));
                },
                complete: function () {
                    move(number);
                }
            });




        }
    }

    for (i = 0; i < dotLength; i++) {
        move(i);
    }

    $(".dot").mouseover(function () {
        $(this).stop(true, false).css("transform", "scale(1.8)");
        $(this).css("background-color", "white");
        $(this).css("filter", "blur(0px)");
        $(this).css("z-index", "1000");
        var xx = $(this).offset().left;
        var yy = $(this).offset().top - boxY;
        var dn = $(this).attr("alt");
        $("#lline").attr("d", "M" + (xx + 10) + " " + (yy + 10) + "L" + (xx + 30) + " " + (yy - 20) + " L" + (xx + 45) + " " + (yy - 20));
        $("#lline").stop().animate({
            dummy: 1
        }, {
            dur: 250,
            step: function (now, fx) {
                $(this).css("stroke-dasharray", (now * 52) + " 52");
            },
            complete: function () {
                $(".dotname").stop().fadeIn(200);
            }
        });
        $(".dotname").text(dn).css({
            left: xx + 50 + "px",
            top: yy - 30 + "px"
        });

    });

    $(".dot").mouseout(function () {
        $(this).stop().css("transform", "scale(1)");
        $("#lline").stop().animate({
            dummy: 0
        }, {
            dur: 250,
            step: function (now, fx) {
                $(this).css("stroke-dasharray", (now * 52) + " 52");
            }
        });
        var ind = $(this).index(".dot");
        move(ind);
        $(".dotname").stop().fadeOut(200);
    });

    function drawline(aa, bb) {
        $("body").prepend("<div class='tline " + (aa.toString() + bb.toString()) + "'></div>");
        setInterval(moveline, 30, aa, bb);
    }

    function moveline(aa, bb) {
        var ax = $(".dot").eq(aa - 1).offset().left;
        var ay = $(".dot").eq(aa - 1).offset().top;
        var ar = $(".dot").eq(aa - 1).width() / 2;
        var bx = $(".dot").eq(bb - 1).offset().left;
        var by = $(".dot").eq(bb - 1).offset().top;
        var xx = bx - ax;
        var yy = by - ay;
        if (xx < 0) {
            xx *= -1
        }
        if (yy < 0) {
            yy *= -1
        }
        var d = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
        var theta = Math.atan(yy / xx);
        var deg = theta * 180 / Math.PI;
        if (ay > by) {
            deg = 360 - deg
        }
        if (ax > bx) {
            deg = (90 - deg) + 90
        }

        $("." + aa.toString() + bb.toString()).css({
            width: d + "px",
            left: ax + ar + "px",
            top: ay + ar + "px",
            transform: "rotate(" + deg + "deg)"
        });

    }


    var comLen = dotLength * (dotLength - 1) / 2;
    var darray = new Array(comLen);

    for (i = 0; i < dotLength - 1; i++) {
        darray[i] = new Array();
        var secLim = dotLength - (i + 1);
        for (r = 0; r < secLim; r++) {
            darray[i][r] = [i + 1, i + r + 2];
            drawline(darray[i][r][0], darray[i][r][1]);
        }
    }


});
