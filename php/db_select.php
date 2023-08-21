<?php
include "config.php";
// JSON POST 받기
$jsonInput  = file_get_contents('php://input');
//var_dump($jsonInput);

// JSON 변환
//echo $decodedInput->str;
$decodedInput = json_decode($jsonInput);
//var_dump($decodedInput);

//데이터 가져오기
$mysqli = mysqli_connect($host, $user, $pw, $dbName);
if ($mysqli) {
	$sql = "select * from test";
	if (isset($decodedInput->pg)) {
		$sql .= " limit 10 offset  " . ($decodedInput->pg - 1) * 10;
	}
	$result = mysqli_query($mysqli, $sql);
	$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
	echo '{"para":' . JSON_encode($decodedInput), ',"ds":' . JSON_encode($rows) . '}';
	mysqli_close(); 
} else {
	$err = "MySQL 접속 실패 : " . mysqli_connect_error();
	echo '{"err":' . JSON_encode($err) . '}';
}

?>