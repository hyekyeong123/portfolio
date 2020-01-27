// Scroll_snap v0.1
// 
// Beerware License
// 제작자 : 한지호(ece125@naver.com)
// 사용하시고 고마우시면 맥주나 한잔 사주세여
//
// -*-*-*-*-*-*-*-*-*-*-개    요*-*-*-*-*-*-*-*-*-*-*-
// scroll_snap은 페이지 내에서 스크롤을 하면 .snapbox라고 이름지어진
// 나열된 박스의 위치로 스크롤이 스냅 되도록 하는 스크립트입니다.
// 중복 스크롤을 막았으므로 한번에 여러번 스크롤되는 것을 막았습니다.
//
// -*-*-*-*-*-*-*-*-*-*-사용방법*-*-*-*-*-*-*-*-*-*-*-
// 1. scroll_snap.js를 html문서의 body태그의 안쪽 맨 하단에 추가하기.
// 2. html문서에서 snap이 되어야 할 박스(예> div, section, article 따위)들에게
//    snapbox라는 클래스 추가하기.
// 3. 끗.
//
// -*-*-*-*-*-*-*-*-*-*-유의사항*-*-*-*-*-*-*-*-*-*-*-
// 본 스크립트를 사용하면 각 박스(.snapbox)로 스크롤만 허용되며
// 기타 다른 부분으로의 스크롤은 모두 금지됩니다.
// 특히 .snapbox가 화면의 높이보다 높아진다면 하단에 숨겨진 내용은
// 볼 수 없게 됩니다.
// 따라서 .snapbox 안쪽의 내용이 박스 바깥으로 벗어나지 않도록 유의하시기 바랍니다.
// 화면의 높이를 측정해서 .snapbox의 높이를 화면의 높이로 지정하시는 것이 바람직합니다.

$(document).ready(function () {

	// 설정값
	var threshold = 500; // 재 스크롤 허용 시간
	var speed = 400; // 스크롤 속도



	var boxlen = $(".snapbox").length;
	var boxoffset = [];
	var current = 0;

	// 각 .snapbox들의 Y위치 측정
	for (i = 0; i < boxlen; i++) {
		boxoffset[i] = parseInt($(".snapbox").eq(i).offset().top);
		//스냅박스 i번째의 탑에서부터의 위치  
	}

	// 현재 snapbox의 번호 추출
	function rechk() {
		var scr = $(window).scrollTop();
		// scr은 윈도우로부터 스크롤한 높이
		scr = Number.parseInt(scr);
		//정수로 바꿔서

		for (i = 0; i < boxlen; i++) {
			if (i >= boxlen - 1) {
				//끝까지 도달하면
				if (scr >= boxoffset[i] && scr < $(document).height()) {
					//윈도우로부터 스크롤한 높이가,, //스냅박스 i번째의 탑에서부터의 위치보다 크거나 같으면
					//즉 스크롤을 한스냅박스의 높이 이상을 했으면
					//또는 윈도우로부터 스크롤한 높이가 다큐멘트의 높이보다 낮다면 
					//??전부 아님?
					current = i;
				}
			} else {
				if (scr >= boxoffset[i] && scr < boxoffset[i + 1]) {
					//윈도우로부터 스크롤한 높이가,, 탑에서부터의 위치보다 크거나 같으면
					//  즉 스크롤을 한스냅박스의 높이 이상을 했으면
					//또는 윈도우로부터 스크롤한 높이가  스냅박스 i+1번째의 탑에서부터의 위치보다 작다면
					current = i;
				}
			}
		}
	}


	// 중복 스크롤 실행 방지 스위치
	var timer = true;

	// 스크롤(스와이프) 시작 되었을때
	$("*").on('scroll touchmove mousewheel DOMMouseScroll', function (e) {
		if (timer) {
			// 중복스크롤 실행 방지 스위치 잠깐 켜고
			timer = false;
			// 스크롤 올렸을때
			if (e.originalEvent.wheelDelta > 0) {
				if (boxoffset[current - 1] != undefined) {
					$("html,body").stop().animate({
						scrollTop: boxoffset[current - 1] + "px"
					}, speed);
				}
			}
			// 스크롤 내렸을때
			else if (e.originalEvent.wheelDelta < 0) {
				if (boxoffset[current + 1] != undefined) {
					$("html,body").stop().animate({
						scrollTop: boxoffset[current + 1] + "px"
					}, speed);
				}
			}
			// 제한시간 후에 스위치 끄기
			setTimeout(function () {
				timer = true;
			}, threshold);
			// 기본 사용자 스크롤 금지하기
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	})


	rechk();
	$(window).scroll(function () {
		rechk();
	});
	$(window).resize(function () {
		rechk();
	});


});