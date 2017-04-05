var toggleButton = document.querySelector('.js-button');
toggleButton.addEventListener('click', function(){
	this.classList.toggle('active');
});

var body = document.querySelector('body');
var siteAsideToggleButton = document.querySelector('.site-aside__toggle-button');

siteAsideToggleButton.addEventListener('click', function(){
	body.classList.toggle('aside-on');
});