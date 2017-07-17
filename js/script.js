var body = document.body;

//toggle all buttons

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

var siteCategories = ['Все'];

sitesJSON.forEach(function(site){  
	var sitesItem = document.createElement('div');
	sitesItem.classList.add('sites__item');
  sitesItem.style.order = Math.floor(Math.random() * sitesJSON.length)
	sitesItem.setAttribute('data-cat', site.category);
	var sitesItemTemplate = 
		'<div data-modal="' + site.path + '" data-tooltip="' + site.name + ' " class="sites__inner">' +
      '<div class="sites__pic">' + 
        '<img src="pics/' + site.path + '/' + site.pics[Math.floor(Math.random() * site.pics.length)].filename + '">' +
      '</div>' +
			'<div class="sites__title">' + site.name + '</div>' +
		'</div>';
	sitesItem.insertAdjacentHTML('afterbegin', sitesItemTemplate);	;
//	if (site.hasOwnProperty('big') && site.big == true){
//		sitesItem.classList.add('sites__item--big')
//	};	
	
	sitesContainer.appendChild(sitesItem);	
	
	siteCategories.push(site.category);  
});

//site cats init
siteCategories = Array.from(new Set(siteCategories));
var siteCategoriesContainer = document.getElementById('categories');
for (let i = 0; i < siteCategories.length; i++){
	var siteCategoriesItem = document.createElement('button');
	siteCategoriesItem.setAttribute('id', siteCategories[i]);
	var siteCategoriesItemText = document.createTextNode(siteCategories[i]);
	siteCategoriesItem.appendChild(siteCategoriesItemText);
	
	siteCategoriesContainer.appendChild(siteCategoriesItem)
};
siteCategoriesContainer.firstElementChild.classList.add('active');

//site cats fancy effect init
var siteCategoriesBG = document.createElement('span');
siteCategoriesBG.classList.add('sites__bg');
siteCategoriesContainer.appendChild(siteCategoriesBG);

//site cats fancy effect 
var siteCatsBGMove = function(btn){
  siteCategoriesBG.style.width = btn.offsetWidth;
  siteCategoriesBG.style.height = btn.offsetHeight;
  siteCategoriesBG.style.left = btn.offsetLeft;
  siteCategoriesBG.style.top = btn.offsetTop;
}

//site filter 
var filterSites = function(catId){	
	for (let i = 0; i < sitesContainer.children.length; i++){
		sitesContainer.children[i].classList.remove('hidden')
		if (catId != sitesContainer.children[i].dataset['cat'] && catId != 'Все'){
			sitesContainer.children[i].classList.add('hidden')
		}
	}	
}


for (let i = 0; i < siteCategoriesContainer.children.length; i++){
	siteCategoriesContainer.children[i].addEventListener('click', function(){
		for (let i = 0; i < this.parentNode.children.length; i++){
			this.parentNode.children[i].classList.remove('active')
		};
		this.classList.add('active');		
		filterSites(this.id);
    siteCatsBGMove(this);
    for (let i = 0; i < sitesContainer.children.length; i++){
      sitesContainer.children[i].classList.add('faded-in');
    }
	})
}

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
var modalLink = modal.querySelector('#modal-link');
var modalPics = modal.querySelector('#modal-pics');

var openModal = function(modalId){
	body.classList.add('modal-open');
	
	modal.classList.add('active');		
	modalFeats.innerHTML = '';
  modalPics.parentElement.scrollTop = 0;
	modalPics.innerHTML = '';
	
	sitesJSON.forEach(function(site, i){
		if (site.path == modalId){
			modalTitle.innerHTML = site.name;
			modalText.innerHTML = site.text;
      if (site.link){
        modalLink.parentElement.classList.add('active');
        modalLink.setAttribute('href', 'http://' + site.link);
      } else {
        modalLink.parentElement.classList.remove('active');
      }
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
          var picContent = "";
          if (site.pics[i].title){
            picContent = '<h3>' + site.pics[i].title + '</h3>';
          }
          picContent += '<img src="pics/' + site.path + '/' + site.pics[i].filename + '">';
					pic.insertAdjacentHTML('afterbegin', picContent);
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

var modalBodyitems = modal.querySelector('.modal__body').children;
for (let i = 0; i < modalBodyitems.length; i++){
  modalBodyitems[i].addEventListener('click', function(e){
    e.stopPropagation();
  });
}

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

var scrollTopButton = document.querySelectorAll('.scroll-top');
var scrollToEl = function(i){
//	var step;
//	var time = 5;
//	var distance = 0;
//	if (pageYOffset > i){ //top		
//		distance = pageYOffset - i;
//		step = distance / 10;
//		var timer = setInterval(function(){
//			if (distance > step){
//				distance -= step;
//				console.log(distance)
//				scrollTo(0, pageYOffset - step);
//			} else if (distance <= step){
//				clearInterval(timer);
//			}
//		})
//	} else if (pageYOffset < i){ //bot		
//		distance = i - pageYOffset;
//		step = distance / 10;
//		var timer = setInterval(function(){
//			if (distance > step){
//				distance -= step;
//				console.log(distance)
//				scrollTo(0, pageYOffset + step);
//			} else if (distance <= step){
//				clearInterval(timer);
//			}
//		})
//	}
	var distance = 0;
	var step = 50;
	var time = 5;
	var timer;
	if (pageYOffset > i){
		distance = pageYOffset - i;
		timer = setInterval(function(){
			if (distance > step){
				distance -= step;
				scrollTo(0, pageYOffset - step);
			} else if (distance <= step){
				scrollTo(0, pageYOffset - distance);
				clearInterval(timer);
			}
		})
	} else if (pageYOffset < i){
		distance = i - pageYOffset;
		timer = setInterval(function(){
			if (distance > step){
				distance -= step;
				scrollTo(0, pageYOffset + step);
			} else if (distance <= step){
				scrollTo(0, pageYOffset + distance);
				clearInterval(timer);
			}
		})
	}
}
for (let i = 0; i < scrollTopButton.length; i++){
  scrollTopButton[i].addEventListener('click', function(){
    if (this.classList.contains('scroll-top--page')){
      scrollToEl(0);
    } else {
      this.parentElement.scrollTop = 0;
    }
  })
}
//var pageYThreshold = 50;

var siteNav = document.querySelector('.site-nav');
var siteNavOffsetTop = siteNav.offsetTop;
var contentSections = document.querySelectorAll('.site-content .section');
var contentSectionTopCoords = [];
for (let i = 0; i < contentSections.length; i++){
	contentSectionTopCoords.push(contentSections[i].offsetTop)
};

var fadeInClasses = ['fade-in--top', 'fade-in--left'];
var fadeInInit = function(elArray){
  for (let i = 0; i < elArray.length; i++){
    var el = document.querySelectorAll(elArray[i]);
    for (let j = 0; j < el.length; j++){
      el[j].classList.add('fade-in');
      el[j].classList.add(fadeInClasses[Math.floor(Math.random() * fadeInClasses.length)]);
    }
  }
}
fadeInInit(['.section-heading', '.sites__head', '.sites__item', '.fancy-table', '.contacts'])
var fadeInEls = document.querySelectorAll('.fade-in');


document.addEventListener('scroll', function(){
  //fadeIn
  for (let i = 0; i < fadeInEls.length; i++){
    if (pageYOffset + window.innerHeight > fadeInEls[i].offsetTop + fadeInEls[i].offsetHeight * 0.25){
      fadeInEls[i].classList.add('faded-in')
    }
  };
  
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
    if (pageYOffset + window.innerHeight == document.body.scrollHeight){
      for (let i = 0; i < siteNavButtons.length; i++){
				siteNavButtons[i].classList.remove('active');
			}
      siteNavButtons[siteNavButtons.length - 1].classList.add('active');
    } else if (pageYOffset + siteNav.offsetHeight > contentSectionTopCoords[contentSectionTopCoords.length - i]){
			for (let i = 0; i < siteNavButtons.length; i++){
				siteNavButtons[i].classList.remove('active')
			}
			siteNavButtons[contentSectionTopCoords.length - i].classList.add('active');	
			return;
		} else {
      for (let i = 0; i < siteNavButtons.length; i++){
				siteNavButtons[i].classList.remove('active')
			}
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

//fancy buttons
var showClicled = function(button){
	var x = event.clientX - button.offsetLeft;
	var y = event.clientY - button.offsetTop;
	var circle = document.createElement('span');
	circle.style.left = x;
	circle.style.top = y;
	button.appendChild(circle);
	var radius = 0;
	var margin = 0;
	var size = 0;
	if (button.offsetWidth >= button.offsetHeight){
		size = button.offsetWidth * 2;
	} else {
		size = button.offsetHeight * 2;
	};	
	var drawCircle;	
	drawCircle = setInterval(function(){		
		if (radius < size){
			radius += 3;
			margin = -radius / 2;
			circle.style.width = radius;
			circle.style.height = radius;
			circle.style.marginLeft = margin;
			circle.style.marginTop = margin;
		} else {
			clearInterval(drawCircle);
			circle.classList.add('hidden');
			setTimeout(function(){
				circle.remove();
			}, 300)
		}
	})
}
var fancyButtons = document.querySelectorAll('.fancy-button');
for (let i = 0; i < fancyButtons.length; i++){
	fancyButtons[i].addEventListener('mousedown', function(){
		showClicled(this)
	});
};


