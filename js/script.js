/*var toggleButton = document.querySelector('.js-button');
toggleButton.addEventListener('click', function(){
	this.classList.toggle('active');
});


var body = document.querySelector('body');
var siteAsideToggleButton = document.querySelector('.site-aside__toggle-button');

siteAsideToggleButton.addEventListener('click', function(){
	body.classList.toggle('aside-on');
});

var modal = document.querySelector('.modal');
var modalButton = document.querySelectorAll('.modal-open');
for (var i = 0; i < modalButton.length; i++){
	modalButton[i].addEventListener('click', function(){
		var target = this.dataset['target'];
		openModal(target);
	});
};
var modalCloseButton = document.querySelector('.modal__close');
modalCloseButton.addEventListener('click', function(){
	closeModal();
});


var openModal = function(target){
	modal.classList.add('active');
	//$(modal).children().load('html/test.html')
	loadDoc(target);
}

var closeModal = function(){
	modal.classList.remove('active');
}

function loadDoc(target) {
	target = 'html/' + target + '.html';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.querySelector('.modal__wrapper').innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", target, true);
  xhttp.send();
}*/

var toggleButtons = document.querySelectorAll('.js-toggle');
for (var i = 0; i < toggleButtons.length; i++){
	toggleButtons[i].addEventListener('click', function(){
		this.classList.toggle('active');
	});
};

var siteAsideToggleButton = document.querySelector('.site-aside__toggle-button');
siteAsideToggleButton.addEventListener('click', function(){
	document.body.classList.toggle('aside-on');
});
