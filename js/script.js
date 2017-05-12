var body = document.body;

//toggle buttons

var toggleButtons = document.querySelectorAll('.js-toggle');
for (var i = 0; i < toggleButtons.length; i++){
	toggleButtons[i].addEventListener('click', function(){
		this.classList.toggle('active');
	});
};

//site aside

var siteAsideToggleButtons = document.querySelectorAll('.site-aside__toggle-button');
for (var i = 0; i < siteAsideToggleButtons.length; i++){
	siteAsideToggleButtons[i].addEventListener('click', function(){
		body.classList.toggle('aside-on');
	});
};

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
			
			var folder = 'pics'
			var path = folder + '/' + site.path + '/';
			$.ajax({
				url: path,
				success: function(data){
					var pics = [];
					var pic = $(data).find('a[href$=".jpg"]');
					pic.each(function(){
						var picName = $(this).prop('href').split('/');
						picName = picName[picName.length - 1];
						pics.push(picName);						
					});
					for (let i = 0; i < pics.length; i++){
						var pic = document.createElement('div');
						pic.classList.add('modal__pic');
						var img = '<img src="' + 'https://notr3d.github.io/portfolio-2.1/' + path + pics[i] + '">'
						pic.insertAdjacentHTML('afterbegin', img);
						modalPics.appendChild(pic)
					}
				},
				error: function(){
					console.log('pics not found')
				}
			})	
		}
	});
};

var closeModal = function(){
	modal.classList.remove('active');
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