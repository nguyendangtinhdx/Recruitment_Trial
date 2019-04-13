function validateUsername() {
	var username = document.getElementById("username").value;
	if (username != '') {
        $('#errUsername').hide();
		return true;
	}
	else {
        $('#errUsername').show();
		return false;
	}
}
function validatePassword() {
	var password = document.getElementById("password").value;
	if (password != '') {
        $('#errPassword').hide();
		return true;
	}
	else {
        $('#errPassword').show();
		return false;
	}
}
// function check validate 
function CheckValidateLogin(){
	if(!validateUsername() && !validatePassword()) {
		return false;
	}
	if(!validateUsername()){
		return false;
	}
	if(!validatePassword()){
		return false;
	}
}

function getData(id, name, age, comment) {
	document.getElementById("getId").value = id;
	document.getElementById("getName").value = name;
	document.getElementById("getAge").value = age;
	document.getElementById("getComment").value = comment;
}

function validateNameAdd() {
	var name = document.getElementById("name").value;
	if (name != '') {
		document.getElementById("errNameAdd").innerHTML = '';
		return true;
	}
	else {
		document.getElementById("errNameAdd").innerHTML = '名前を入力してください。';
		return false;
	}
}
function validateAgeAdd() {
	var age = document.getElementById("age").value;
	if (age < 1 && isNumeric(age)) {
		document.getElementById("errAgeAdd").innerHTML = '年齢は正数で入力してください。';
		return false;
	}
	if (age > 120) {
		document.getElementById("errAgeAdd").innerHTML = '120歳未満の年齢を入力してください';
		return false;
	}
	if(age.length > 0 && !isNumeric(age)){
		document.getElementById("errAgeAdd").innerHTML = '年齢は正数で入力してください。';
		return false;
	}
	if (age != '') {
		document.getElementById("errAgeAdd").innerHTML = '';
		return true;
	}
	else {
		document.getElementById("errAgeAdd").innerHTML = '年齢は正数で入力してください。';
		return false;
	}
}
function isNumeric(value) {
	return /^-{0,1}\d+$/.test(value);
}
// function check validate 
function CheckValidateAdd(){
	if(!validateNameAdd() && !validateAgeAdd()) {
		return false;
	}
	if(!validateNameAdd()){
		return false;
	}
	if(!validateAgeAdd()){
		return false;
	}
}

function validateNameUpdate() {
	var name = document.getElementById("getName").value;
	if (name != '') {
		document.getElementById("errNameUpdate").innerHTML = '';
		return true;
	}
	else {
		document.getElementById("errNameUpdate").innerHTML = '名前を入力してください。';
		return false;
	}
}
function validateAgeUpdate() {
	var age = document.getElementById("getAge").value;
	if (age < 1 && isNumeric(age)) {
		document.getElementById("errAgeUpdate").innerHTML = '年齢は正数で入力してください。';
		return false;
	}
	if (age > 120) {
		document.getElementById("errAgeUpdate").innerHTML = '120歳未満の年齢を入力してください';
		return false;
	}
	if(age.length > 0 && !isNumeric(age)){
		document.getElementById("errAgeUpdate").innerHTML = '年齢は正数で入力してください。';
		return false;
	}
	if (age != '') {
		document.getElementById("errAgeUpdate").innerHTML = '';
		return true;
	}
	else {
		document.getElementById("errAgeUpdate").innerHTML = '年齢は正数で入力してください。';
		return false;
	}
}
// function check validate 
function CheckValidateUpdate(){
	if(!validateNameUpdate() && !validateAgeUpdate()) {
		return false;
	}
	if(!validateNameUpdate()){
		return false;
	}
	if(!validateAgeUpdate()){
		return false;
	}
}