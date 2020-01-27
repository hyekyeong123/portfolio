//이미지를 덮고 있는 박스의 이름을 .ratiobox라고 정한다.

$(document).ready(function(){
	function ratiofit(){
		$(".ratiobox").each(function(){
			var boxW = $(this).width();
			
			var boxH = $(this).height();
			
			var boxRatio = boxH / boxW;
			//가로분의 세로를 구한것이 박스의 비율
	
			var imgW = $(this).children("img").width();
			var imgH = $(this).children("img").height();
			var imgRatio = imgH/imgW;
	
			if(boxRatio<imgRatio){
				$(this).children("img").width(boxW).height("auto");
			}else{
				$(this).children("img").height(boxH).width("auto");
			}
	
		});
	
	};
	ratiofit();
	
	//1. 박스의 종횡비를 구한다.
		
		//우리가 임의로 정했을때 종횡비가 비교적 크다는 것은 보다 세로로 길쭉하다는 뜻
		//원래는 반대 뜻임
		//종횡비 : 세로길이/가로길이
	//2. 그 박스 안에 있는 그림의 종횡비를 구한다.
	//3. 두 종횡비를 비교하여 그림의 사이즈를 정한다
		//만약 박스보다 그림의 종횡비가 크면(박스보다 그림이 더 세로로 길쭉하면)
		//	박스의 가로 길이에 맞춰야한다. 세로는 오토로
		//	그림의 가로길이를 박스의 가로길이로 지정
		//만약 박스보다 그림의 종횡비가 작으면(박스보다 그림이 더 가로로 길쭉하면)
		//박스의 세로 길이에 맞춰야한다. 
	$(window).resize(function(){
		ratiofit();
	});
	
});



