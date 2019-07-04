/*....................jQuery.....................*/
$(document).ready(function() {

/*..header-menu選單功能..*/	
 $('.wrap a').click(function(event) {
  event.preventDefault();
  var headheight = $(".header").height();
  $('html,body').animate({
    scrollTop: $( $.attr(this , 'href') ).offset().top-headheight
    }, 500);
 });

/*..手機版header-menu選單..*/
  $('.head-button').click(function(event) {
    $('.menu').slideToggle(500);
  });
  
/*..六維圖描述開關..*/
    $('.sixdrawmap area').click(function(event) {
    event.preventDefault();
    if(this.alt=="html"){
    $('.html').fadeToggle(500);
	}else if(this.alt=="js"){ 	
    $('.js').fadeToggle(500); 
    }else if(this.alt=="css"){ 	
    $('.css').fadeToggle(500); 
    }else if(this.alt=="vue"){ 	
    $('.vue').fadeToggle(500); 
    }else if(this.alt=="boostrap"){ 	
    $('.boostrap').fadeToggle(500); 
    }else if(this.alt=="git"){ 	
    $('.git').fadeToggle(500); 
    }
  });
});


/*....................JavaScript.....................*/
/*..六維圖響應式擷取螢幕寬高..*/
var area =document.querySelector('.sixdrawmap');
function loadarea(e){
	var sw=document.getElementById("sixdraw").width;
	var sh=document.getElementById("sixdraw").height;
	var str ='<area shape="POLYGON" coords="0,0,'+sw*0.48+',0,'+sw*0.48+','+sh*0.48+'"  alt="html">';
	str +='<area shape="POLYGON" coords="'+sw*0.48+',0,'+sw*0.48+','+sh*0.48+','+sw+',0"  alt="js">';
	str +='<area shape="POLYGON" coords="0,0,'+sw*0.48+','+sh*0.48+',0,'+sh+'"  alt="css">';
	str +='<area shape="POLYGON" coords="'+sw*0.48+','+sh*0.48+','+sw+','+sh+','+sw+',0"  alt="vue">';
	str +='<area shape="POLYGON" coords="0,'+sh+','+sw*0.48+','+sh*0.48+','+sw*0.48+','+sh+'"  alt="boostrap">';
	str +='<area shape="POLYGON" coords="'+sw*0.48+','+sh+','+sw*0.48+','+sh*0.48+','+sw+','+sh+'"  alt="git">';
	area.innerHTML=str;
}
/*..網頁重新載入..*/
function reload(){
	location.reload();
}









