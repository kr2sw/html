document.getElementById('btn').onclick = function(ev) {
	//document.getElementById('frm').submit();
	callSelect(pg);
	return false;
};
function callSelect() {
	// 1. XMLHttpRequest객체 생성
	let httpRequest = new XMLHttpRequest(); 

	// 2. onreadystatechange 등록
	httpRequest.onreadystatechange = function() {
		// XMLXttpRequest 객체의 현재 상태와 서버 상의 문서 존재 유무를 확인
		if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
			try {
				let result = JSON.parse(httpRequest.responseText);
				console.log(result);
			} catch(err) {
				console.log(err);
				console.log(httpRequest.responseText); // 서버에 요청하여 응답으로 받은 데이터를 문자열로 반환
			}
		}
	};

	// 3. POST 방식으로 요청을 보내면서 데이터를 동시에 전달함
	let url = document.getElementById('url').value;
	httpRequest.open("PUT", url, true);
	//httpRequest.setRequestHeader("Content-Type", "application/json");
	let pg = document.getElementById('pg').value;
	let txt1 = document.getElementById('id').value;
	let jsonData = {'pg': pg, 'id': txt1};
	httpRequest.send(JSON.stringify(jsonData));

	//var frm1 = new FormData();
	//frm1.set('json', 1);
	//httpRequest.send(frm1);
}