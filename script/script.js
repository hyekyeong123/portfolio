$(document).ready(function () {
	//큐브 주사위
	nav();
	$("#top").mouseover(function () {
		$(this).css("background-color", "red");
		$("#cube").addClass("top");
	});
	$("#top").mouseout(function () {
		$(this).css("background-color", "inherit");
		$("#cube").removeClass("top");
	});

	$("#left").mouseover(function () {
		$(this).css("background-color", "green");
		$("#cube").addClass("left");
	});
	$("#left").mouseout(function () {
		$(this).css("background-color", "inherit");
		$("#cube").removeClass("left");
	});

	$("#front").mouseover(function () {
		$(this).css("background-color", "yellow");
		$("#cube").addClass("front");
	});
	$("#front").mouseout(function () {
		$(this).css("background-color", "inherit");
		$("#cube").removeClass("front");
	});
	//------------------------------------------------------------
	//먼저 전체화면의 높이를 잰후 그 높이 이상을 넘어가면 그때부터 #nav를 display:block하기
	$(window).resize(function () {
		nav();
	});
	$("*").on('scroll touchmove mousewheel DOMMouseScroll', function (e) {
		nav();
	});
	$(window).scroll(function () {
		upscroll();
	});

	function nav() {
		var wh = $(window).height();
		var sh = $(window).scrollTop();
		if (sh >= wh) {
			$("#nav").fadeIn();
		} else {
			$("#nav").fadeOut();
		}
	}
	//프르젝트-------------------------------------- 
	//스크롤을 하면 내용물이 그때 보이게
	upscroll();

	function upscroll() {
		$(".projectbox").each(function () {
			if ($(window).width() > 1100) {
				var bottom_object = $(this).offset().top + $(this).outerHeight();
				//이것들의 top의 좌표 + 이것들의 높이 (전체 차지하고 있는 높이)
				var bottom_window = $(window).scrollTop() + $(window).height(); //현재 스크롤한것의 가장 아래쪽
				if (bottom_window > bottom_object - 500) {
					//윈도우의 가장 하단이 객체의 가장 하단-50(유효한 건가?)보다 크다면
					$(this).animate({
						'opacity': '1'
					}, 800);
				}
			} else {
				$(this).animate({
					'opacity': '1'
				}, 800);
			}
		});
	}
	// <!--projectbox_left의 append에다가 만약 넓이가 1100이하이면 </div><div class='snapbox project'> 생성--></div>
	//이거 안됨 브라우저가 멋대로 <div class='snapbox project'></div>를 생성해버림

	// 아니면 .project에서 .snapbox를 뺀 후 .projectbox에 .snapbox 추가
	if ($(window).width() <= 1100) {
		$(".project").removeClass("snapbox");
		$(".projectbox").addClass("snapbox");
	}
	if ($(window).width() <= 459) {
		//모바일 화면에서는 
		$(".cubea").click(function (e) {
			//cubu의 면들
			var hr = $(this).attr('href');
			e.preventDefault();
			//바로 url로 넘어가지 않게 하기 위해서(모션 보여주고 난 후)
			setTimeout(function () {
				//200초동안 보여주기
				$("html, body").animate({
					scrollTop: $(hr).position().top
					//스크롤 이동을 부드럽게 요소의 위치로 이동시키기
				}, 500, function () {
					$("#cube").removeClass();
					$("#cube").css("backgroundColor", "transition");
					//다시 원래 색상으로 돌려놓기
				});
			}, 200);
		});
	}
	//두번째 스냅박스 ------------------------------------
	$("#score").click(function () {
		$("#skills_nomal").css("display", "none");
		$("#skills_score").css("display", "block");
	});
	$("#nomal").click(function () {
		$("#skills_nomal").css("display", "block");
		$("#skills_score").css("display", "none");
	});


});