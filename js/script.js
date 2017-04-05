var siteAside = document.querySelector('.site-aside');
var siteAsideToggleButton = document.querySelector('.site-aside__toggle-button');


siteAsideToggleButton.addEventListener('click', function(){
	siteAside.classList.toggle('active')
})