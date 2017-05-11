var body = document.body;

//toggle buttons

var toggleButtons = document.querySelectorAll('.js-toggle');
for (var i = 0; i < toggleButtons.length; i++){
	toggleButtons[i].addEventListener('click', function(){
		this.classList.toggle('active');
	});
};

//site aside

var siteAsideToggleButtons = document.querySelectorAll('.js-aside-toggle-button');
for (var i = 0; i < siteAsideToggleButtons.length; i++){
	siteAsideToggleButtons[i].addEventListener('click', function(){
		body.classList.toggle('aside-on');
	});
};

//site modal

/*var xhttp = new XMLHttpRequest();
var folder = 'html/';
var target = '';
var path = '';
var openModal = function(modalId, prev, next){
	modal.classList.add('active');
	
  target = modalId + '.html'; 
	path = folder + target;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
//      modalWrapper.innerHTML = this.responseText;
			console.log(this.responseText)
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();	
	
	if (prev){
		document.querySelector('.modal__button--prev').dataset['tooltip'] = prev.dataset['modal'];
	};
	if (next){
		document.querySelector('.modal__button--next').dataset['tooltip'] = next.dataset['modal'];
	}
};

var closeModal = function(){
	modal.classList.remove('active');
}

var modal = document.querySelector('.modal');
var modalWrapper = modal.querySelector('.modal__wrapper');
modal.addEventListener('click', function(){
	closeModal();
});

var modalBody = modal.querySelector('.modal__body');
modalBody.addEventListener('click', function(e){
	e.stopPropagation();
});

var modalOpenButtons = document.querySelectorAll('[data-modal]');
for (var i = 0; i < modalOpenButtons.length; i++){
	modalOpenButtons[i].addEventListener('click', function(){
		openModal(this.dataset['modal'], this.previousElementSibling, this.nextElementSibling);
	})
};

var modalCloseButton = modal.querySelector('.js-modal-close');
modalCloseButton.addEventListener('click', function(){
	closeModal();
});

document.addEventListener('keydown', function(e){
	if (e.key == 'Escape'){
		closeModal();
	}
});

var modalNavButtons = modal.querySelectorAll('.modal__button');
for (var i = 0; i < modalNavButtons.length; i++){
	modalNavButtons[i].addEventListener('click', function(e){
		e.stopPropagation();
	})
};

modal.querySelector('.modal__button--prev').addEventListener('click', function(){
	openModal(this.dataset['tooltip']);
});

modal.querySelector('.modal__button--next').addEventListener('click', function(){
	openModal(this.dataset['tooltip']);
});*/







//sites json init

var xhr = new XMLHttpRequest();
xhr.open('GET', 'sites.json', false);
xhr.send();
var sitesJSON = JSON.parse(xhr.responseText);

var sitesContainer = document.querySelector('#sites');

sitesJSON.forEach(function(site){
	var sitesItem = document.createElement('div');
	sitesItem.classList.add('sites__item')
	sitesItem.insertAdjacentHTML('afterbegin', 
		'<div data-modal="test-1" data-tooltip="' + site.name + '" class="sites__inner">' +
			'<div class="sites__title">' + site.name + '</div>' +
		'</div>'
		);
	;
	if(site.hasOwnProperty('big') && site.big) {
		sitesItem.classList.add('sites__item--big')
	}
	sitesContainer.appendChild(sitesItem);
});





//tooltips

var toolTipItems = document.querySelectorAll('[data-tooltip]');
var tooltip = document.querySelector('.tooltip');
for (var i = 0; i < toolTipItems.length; i++){
	toolTipItems[i].addEventListener('mouseenter', function(){
		tooltip.innerHTML = this.dataset['tooltip'];
		tooltip.classList.add('active');
	});
	toolTipItems[i].addEventListener('mousemove', function(){
		tooltip.style.top = event.clientY + 5;
		if (event.clientX + tooltip.clientWidth + 5 > window.innerWidth){
			tooltip.style.left = event.clientX - tooltip.clientWidth - 5;
		} else {
			tooltip.style.left = event.clientX + 10;
		}
	});
	toolTipItems[i].addEventListener('mouseleave', function(){
		tooltip.innerHTML = '';
		tooltip.classList.remove('active');
	});
	
};