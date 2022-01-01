const menuBtn = document.querySelector('.header__menu');
const mobileMenuBtn = document.querySelector('.mobile-header__menu');
const headerNavSearchBtn = document.querySelector('.header__nav--item-search .header__nav--link');
const searchBackBtn = document.querySelector('.header__search--btn-back');
const headerNavBtns = document.querySelectorAll('.header__nav--link');
const changeAppearanceBtn = document.querySelector('.header__nav--profile-droplist-appearance');
const headerLogo = document.querySelector('.header__logo');
const mobileHeaderLogo = document.querySelector('.mobile-header__logo');
const optionBtns = document.querySelectorAll('.primary__description--option-btn');
const notifyOptionBtns = document.querySelectorAll('.header__nav--notify-droplist-option');

const mainEl = document.querySelector('.main');
const overlayEl = document.querySelector('.overlay');
const headerEl = document.querySelector('.header');
const headerNavItems = document.querySelectorAll('.header__nav--item');
const descriptionEls = document.querySelectorAll('.primary__description');
const notifyDropListItems = document.querySelectorAll('.header__nav--notify-droplist-item');

// mobile btn
[menuBtn, mobileMenuBtn].forEach(e => {
	e.addEventListener('click', function () {
		mainEl.classList.toggle('nav-open');
	});
});

// overlay
overlayEl.addEventListener('click', function () {
	mainEl.classList.remove('nav-open');
});

// search button
headerNavSearchBtn.addEventListener('click', function () {
	headerEl.classList.add('search-open');
});

searchBackBtn.addEventListener('click', function () {
	headerEl.classList.remove('search-open');
});

// clear class function
const removeClass = function (el, c) {
	el.forEach(i => {
		i.classList.remove(c);
	});
};

// header button
headerNavBtns.forEach(btn =>
	btn.addEventListener('click', function () {
		const headerNavItemEl = btn.closest('.header__nav--item');
		if (!headerNavItemEl) return;

		if (headerNavItemEl.classList.contains('droplist-open')) {
			removeClass(headerNavItems, 'droplist-open');
		} else {
			removeClass(headerNavItems, 'droplist-open');
			headerNavItemEl.classList.toggle('droplist-open');
		}
	})
);

// change appearance black or white mode
changeAppearanceBtn.addEventListener('click', function () {
	document.body.classList.toggle('bg-light');
	[headerLogo, mobileHeaderLogo].forEach(logo => {
		console.dir(logo);
	});

	if (document.body.classList.contains('bg-light')) {
		this.innerHTML = `<ion-icon name="contrast-outline" class="header__nav--profile-droplist-icon"></ion-icon>
		<span>外觀：淺色主題</span>
		<ion-icon name="chevron-forward-outline"
		class="header__nav--profile-droplist-icon header__nav--profile-droplist-right"></ion-icon>`;

		[headerLogo, mobileHeaderLogo].forEach(logo => {
			logo.src = './img/logo.png';
		});
	} else {
		this.innerHTML = `<ion-icon name="contrast-outline" class="header__nav--profile-droplist-icon"></ion-icon>
		<span>外觀：深色主題</span>
		<ion-icon name="chevron-forward-outline"
		class="header__nav--profile-droplist-icon header__nav--profile-droplist-right"></ion-icon>`;

		[headerLogo, mobileHeaderLogo].forEach(logo => {
			logo.src = './img/logo-dark.png';
		});
	}
});

// toggle option
optionBtns.forEach(btn =>
	btn.addEventListener('click', function (e) {
		const descriptionEl = e.target.closest('.primary__description');
		if (!descriptionEl) return;
		if (descriptionEl.classList.contains('option-open')) {
			removeClass(descriptionEls, 'option-open');
		} else {
			removeClass(descriptionEls, 'option-open');
			descriptionEl.classList.toggle('option-open');
		}
	})
);

// toggle notify option
notifyOptionBtns.forEach(btn =>
	btn.addEventListener('click', function (e) {
		const notifyDropListItem = e.target.closest('.header__nav--notify-droplist-item');
		if (!notifyDropListItem) return;

		if (notifyDropListItem.classList.contains('notify-option-open')) {
			removeClass(notifyDropListItems, 'notify-option-open');
		} else {
			removeClass(notifyDropListItems, 'notify-option-open');
			notifyDropListItem.classList.toggle('notify-option-open');
		}
	})
);
