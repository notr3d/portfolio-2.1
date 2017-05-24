var body = document.body;

//toggle buttons

var toggleButtons = document.querySelectorAll('.toggle-button');
for (var i = 0; i < toggleButtons.length; i++){
	toggleButtons[i].addEventListener('click', function(){
		this.classList.toggle('active');
	});
};

//site aside

/*var siteAsideToggleButtons = document.querySelectorAll('.site-aside__toggle-button');
for (var i = 0; i < siteAsideToggleButtons.length; i++){
	siteAsideToggleButtons[i].addEventListener('click', function(){
		body.classList.toggle('aside-on');
	});
};*/

//sites json init

var xhr = new XMLHttpRequest();
xhr.open('GET', 'sites.json', false);
xhr.send();
var sitesJSON = JSON.parse(xhr.responseText);

var sitesContainer = document.querySelector('#sites');

sitesJSON.forEach(function(site){
	var sitesItem = document.createElement('div');
	sitesItem.classList.add('sites__item');
	var sitesItemTemplate = 
		'<div data-modal="' + site.path + '" data-tooltip="' + site.name + '" class="sites__inner">' +
			'<div class="sites__title">' + site.name + '</div>' +
		'</div>';
	sitesItem.insertAdjacentHTML('afterbegin', sitesItemTemplate);
	;
	if (site.hasOwnProperty('big') && site.big == true){
		sitesItem.classList.add('sites__item--big')
	};	
	
	sitesContainer.appendChild(sitesItem);	
});


//site modal
var prevButton = document.querySelector('.modal__button--prev');
var nextButton = document.querySelector('.modal__button--next');

prevButton.addEventListener('click', function(){
	openModal(this.dataset['modal']);
});

nextButton.addEventListener('click', function(){
	openModal(this.dataset['modal']);
});

var modal = document.querySelector('.modal');
var modalTitle = modal.querySelector('#modal-title');
var modalText = modal.querySelector('#modal-text');
var modalFeats = modal.querySelector('#modal-feats');
var modalPics = modal.querySelector('#modal-pics');

var openModal = function(modalId){
	body.classList.add('modal-open');
	
	modal.classList.add('active');		
	modalFeats.innerHTML = '';
	modalPics.innerHTML = '';
	
	sitesJSON.forEach(function(site, i){
		if (site.path == modalId){
			modalTitle.innerHTML = site.name;
			modalText.innerHTML = site.text;	
			if (site.feats){				
				for (let i = 0; i < site.feats.length; i++){
					var feat = document.createElement('span');
					feat.innerHTML = site.feats[i];
					modalFeats.appendChild(feat);
				}
			};
			
			var prevSite, nextSite;
			
			if (i == 0){
				prevSite = sitesJSON[sitesJSON.length - 1];
				nextSite = sitesJSON[i + 1];
			} else if (i == sitesJSON.length - 1){
				prevSite = sitesJSON[i - 1];
				nextSite = sitesJSON[0];			 
		  } else {
				prevSite = sitesJSON[i - 1];
				nextSite = sitesJSON[i + 1];
			};					
			
			prevButton.dataset['modal'] = prevSite.path;
			prevButton.dataset['tooltip'] = prevSite.name;
			
			nextButton.dataset['modal'] = nextSite.path;
			nextButton.dataset['tooltip'] = nextSite.name;
			
			if (site.pics){
				for (let i = 0; i < site.pics.length; i++){
					var pic = document.createElement('div');
					pic.classList.add('modal__pic');
					var img = '<img src="pics/' + site.path + '/' + site.pics[i] + '">';
					pic.insertAdjacentHTML('afterbegin', img);
					modalPics.appendChild(pic);
				}
			}
		}
	});
};

var closeModal = function(){
	modal.classList.remove('active');
	body.classList.remove('modal-open');
}

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
		openModal(this.dataset['modal']);
	})
};

var modalCloseButton = modal.querySelector('.modal__button--close');
modalCloseButton.addEventListener('click', function(){
	closeModal();
});

document.addEventListener('keyup', function(e){
	if (e.key == 'Escape'){
		closeModal();
	};
	if (e.key == 'ArrowLeft'){
		prevButton.click();
	};
	if (e.key == 'ArrowRight'){
		nextButton.click();
	};
	
});

var modalNavButtons = modal.querySelectorAll('.modal__button');
for (var i = 0; i < modalNavButtons.length; i++){
	modalNavButtons[i].addEventListener('click', function(e){
		e.stopPropagation();
	})
};




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

//scrolltop button

var scrollTopButton = document.querySelector('.scroll-top');
var scrollToEl = function(i){
	/*var disnance = pageYOffset;
	var step = 50;
	var time = 1;
	var timer = setInterval(function(){
		disnance -= step;
		if (disnance <= 0){
			clearInterval(timer)
		} else {
			scrollTo(0, disnance);
		};		
	}, time);*/
	var step = 50;
	var time = 1;
	var distance = 0;
	if (pageYOffset > i){ //top		
		distance = pageYOffset - i;
		var timer = setInterval(function(){
			if (distance > 0){
				scrollTo(0, pageYOffset - step);
				distance -= step;
			} else if (distance <= 0){
				clearInterval(timer);
			}
		})
	} else if (pageYOffset < i){ //bot		
		distance = i - pageYOffset;
		var timer = setInterval(function(){
			if (distance > 0){
				scrollTo(0, pageYOffset + step);
				distance -= step;
			} else if (distance <= 0){
				clearInterval(timer);
			}
		})
	}
}
scrollTopButton.addEventListener('click', function(){	
   scrollToEl(0);
});
//var pageYThreshold = 50;

var siteNav = document.querySelector('.site-nav');
var siteNavOffsetTop = siteNav.offsetTop;
var contentSections = document.querySelectorAll('.site-content .section');
var contentSectionTopCoords = [];
for (let i = 0; i < contentSections.length; i++){
	contentSectionTopCoords.push(contentSections[i].offsetTop)
};
document.addEventListener('scroll', function(){
	//console.log(pageYOffset);
	
	/*if (pageYOffset > pageYThreshold){
		scrollTopButton.classList.add('active')
	} else {
		scrollTopButton.classList.remove('active')
	};*/
	
	if (pageYOffset > siteNavOffsetTop){
		siteNav.classList.add('active')
	} else if (pageYOffset < siteNavOffsetTop){
		siteNav.classList.remove('active')
	};
	
	for (let i = 0; i <= contentSectionTopCoords.length; i++){
		if (pageYOffset > contentSectionTopCoords[contentSectionTopCoords.length - i]){
			for (let i = 0; i < siteNavButtons.length; i++){
				siteNavButtons[i].classList.remove('active')
			}
			siteNavButtons[contentSectionTopCoords.length - i].classList.add('active');		
			return;
		}
	}
});


//site-nav 

var siteNavButtons = document.querySelectorAll('.site-nav a');
for (let i = 0; i < siteNavButtons.length; i++){
	siteNavButtons[i].addEventListener('click', function(e){
		e.preventDefault();
		var id = this.hash.substr(1);
		var currentSection = document.getElementById(id)
		var currentSectionOffsetTop = currentSection.offsetTop;
		scrollToEl(currentSectionOffsetTop);
	})
}