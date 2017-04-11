/*
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
}
*/

var body = document.body;

var toggleButtons = document.querySelectorAll('.js-toggle');
for (var i = 0; i < toggleButtons.length; i++){
	toggleButtons[i].addEventListener('click', function(){
		this.classList.toggle('active');
	});
};

var siteAsideToggleButtons = document.querySelectorAll('.js-aside-toggle-button');
for (var i = 0; i < siteAsideToggleButtons.length; i++){
	siteAsideToggleButtons[i].addEventListener('click', function(){
		body.classList.toggle('aside-on');
	});
}

