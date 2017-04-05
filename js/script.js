var toggleButton = document.querySelector('.js-button');
toggleButton.addEventListener('click', function(){
	this.classList.toggle('active');
});

var body = document.querySelector('body');
var siteAsideToggleButton = document.querySelector('.site-aside__toggle-button');

siteAsideToggleButton.addEventListener('click', function(){
	body.classList.toggle('aside-on');
});

var modal = document.querySelector('.modal');
var modalButton = document.querySelector('#modal');
modalButton.addEventListener('click', function(){
	openModal();
});
var modalCloseButton = document.querySelector('.modal__close');
modalCloseButton.addEventListener('click', function(){
	closeModal();
});


var openModal = function(){
	modal.classList.add('active');
	$(modal).children().load('html/test.html')
}

var closeModal = function(){
	modal.classList.remove('active');
}
