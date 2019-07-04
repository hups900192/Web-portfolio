//指定DOM元素
var list = document.querySelector('.list');
var sendData = document.querySelector('.send');
var DeleteData = document.querySelector('.del');
var edit = document.querySelector('.edit');
var search = document.querySelector('.search');
var reset = document.querySelector('.reset');

//設定變數
var editdata = {};
var haveclick = false;
var mythis;
var data = JSON.parse(localStorage.getItem('ListData')) || [];

//設定監聽
sendData.addEventListener('click',addData);
DeleteData.addEventListener('click',toggleDone);
edit.addEventListener('click',edit1);
search.addEventListener('click',searchitem);
reset.addEventListener('click',resetvalue);
updatelist(data);

//加入列表,並同步更新網頁與localstorage
function addData(e){
	e.preventDefault();
	var txt1 = document.querySelector('.name').value;
	var txt2 = document.querySelector('.phone').value;
	var txt3 = document.querySelector('.email').value;
	if(txt1 == ""){
		alert("請輸入名字");
		return;
	}
	if(txt2 == ""){
		alert("請輸入電話");
		return;
	}
	for(var i=0;i<data.length;i++){
		if(txt1==data[i].content1&&txt2==data[i].content2){
			alert("已存在相同聯絡資訊");
			return;
		}
	}
	for(var i = 0;i<txt2.length;i++){
		var x = txt2.substr(i,1).charCodeAt();
		if(x<48 || x>57){
			alert("電話需輸入數字!");	
			return;
		}
	}
    var txt = txt1+'_'+txt2;
    var todo = {content1:txt1,content2:txt2,content3:txt3};
   	data.push(todo);
    updatelist(data);
    localStorage.setItem('ListData',JSON.stringify(data));
    haveclick=false;	
}

//顯示網頁內容，依照搜尋內容顯示
function updatelist(items){
	var searchvalue=document.querySelector('.searchvalue').value;
  	str='<tr><th class="chkbxdiv"></th><th>名字</th><th>電話</th><th class="emaildiv">信箱</th></tr>';
  	var len =items.length;
	if(searchvalue.length>0){
  		for(var i=0;i<data.length;i++){
  			var x=data[i].content1;
  			var y=data[i].content2;
  			var z=data[i].content3;
  			if(x.indexOf(searchvalue)>-1 || y.indexOf(searchvalue)>-1||z.indexOf(searchvalue)>-1){
  			str += '<tr class="addList" ><td><input type="checkbox" class="chkbx" data-index='+ i +' name="'+i+'"></td>';
  			str += '<td id=a'+i+' >'+items[i].content1+'</td>';			
			str +='<td id=b'+i+'>'+items[i].content2+'</td>';
			str +='<td id=c'+i+'>'+items[i].content3+'</td></tr>';  
  	  	}
  	}
}
  	else{
  		for(var i=0;i<len;i++){
  			str += '<tr class="addList" ><td><input type="checkbox" class="chkbx" data-index='+ i +' name="'+i+'"></td>';
  			str += '<td id=a'+i+' >'+items[i].content1+'</td>';			
			str +='<td id=b'+i+'>'+items[i].content2+'</td>';
			str +='<td id=c'+i+'>'+items[i].content3+'</td></tr>';   
  	  	}
  	}
  	list.innerHTML=str;
   	var chkbx=document.getElementsByClassName('addList');
   	for(var i=0;i<chkbx.length;i++){
   	chkbx[i].addEventListener('click',check);
   	}  
}

//刪除列表
function toggleDone(e){
	e.preventDefault();
	var checkboxs=document.getElementsByClassName('chkbx');
	var havechecked=false;
	for(var i=0;i<checkboxs.length;i++){
		if(checkboxs[i].checked){
			havechecked=true
			var id1=checkboxs[i].name;
			var spanid1=document.getElementById("a"+id1).innerHTML;
			var spanid2=document.getElementById("b"+id1).innerHTML;
			var spanid3=document.getElementById("c"+id1).innerHTML;
			for(var j=0;j<data.length;j++){
				if(spanid1==data[j].content1 && spanid2==data[j].content2 &&spanid3==data[j].content3){
					data.splice(j,1);
					break;				
				}
			}		
		}		
	}
	if (havechecked) {
		localStorage.setItem('ListData', JSON.stringify(data));
		updatelist(data);
		haveclick=false;
	}
	else{
		alert("請勾選要刪除的項目")
	}
}

//顯示選取的資料
function check(){
	if (haveclick){
		mythis.style.backgroundColor="#a3d1d1";
		mythis.style.color="black";
	}
	mythis = this;
	haveclick=true;
	editdata.content1="";
	editdata.content2="";
	editdata.content3="";
	var inputname=document.querySelector('.name');
	var inputphone=document.querySelector('.phone');
	var inputemail=document.querySelector('.email');
	var x=this.childNodes;
	inputname.value=x[1].innerHTML;
	inputphone.value=x[2].innerHTML;
	inputemail.value=x[3].innerHTML;
	this.style.backgroundColor="#007979";
	this.style.color="white";
	var txt={content1:inputname,content2:inputphone,content3:inputemail};
	editdata.content1=inputname.value;
	editdata.content2=inputphone.value;
	editdata.content3=inputemail.value;
}

//修改聯絡資訊
function edit1(){
	var inputname=document.querySelector('.name').value;
	var inputphone=document.querySelector('.phone').value;
	var inputemail=document.querySelector('.email').value;
	if(haveclick==false){
		alert("尚未指定修改項目");
		return;
	}
	if(inputname == ""){
		alert("請輸入名字");
		return;
	}
	if(inputphone == ""){
		alert("請輸入電話");
		return;
	}
	for(var i=0;i<data.length;i++){
		if(inputname==data[i].content1&&inputphone==data[i].content2&&inputemail==data[i].content3){
			alert("已存在相同聯絡資訊");
			return;
		}
	}
	for(var i = 0;i<inputphone.length;i++){
		var x = inputphone.substr(i,1).charCodeAt();
		if(x<48 || x>57){
			alert("電話需輸入數字!");	
			return;
		}
	}
	for(var i=0;i<data.length;i++){
		if(data[i].content1==editdata.content1&&data[i].content2==editdata.content2&&data[i].content3==editdata.content3){
			data[i].content1=inputname;
			data[i].content2=inputphone;
			data[i].content3=inputemail;
		}
	}
	localStorage.setItem('ListData', JSON.stringify(data));
	updatelist(data);
	haveclick=false;
}

//觸發搜尋
function searchitem(){
	updatelist(data);
}
	
//觸發清空
function resetvalue(){
	document.querySelector('.name').value="";
	document.querySelector('.phone').value="";
	document.querySelector('.email').value="";
	document.querySelector('.searchvalue').value="";		
}











