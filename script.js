const menuBtn = document.querySelector('.header__menu');
const mobileMenuBtn = document.querySelector('.mobile-header__menu');
const headerNavSearchBtn = document.querySelector(
	'.header__nav--item-search .header__nav--link'
);
const searchBackBtn = document.querySelector('.header__search--btn-back');
const headerNavBtns = document.querySelectorAll('.header__nav--link');
const changeAppearanceBtn = document.querySelector(
	'.header__nav--profile-droplist-appearance'
);
const headerLogo = document.querySelector('.header__logo');
const mobileHeaderLogo = document.querySelector('.mobile-header__logo');
const optionBtns = document.querySelectorAll(
	'.primary__description--option-btn'
);
const notifyOptionBtns = document.querySelectorAll(
	'.header__nav--notify-droplist-option'
);

const mainEl = document.querySelector('.main');
const overlayEl = document.querySelector('.overlay');
const headerEl = document.querySelector('.header');
const headerNavItems = document.querySelectorAll('.header__nav--item');
const descriptionEls = document.querySelectorAll('.primary__description');
const notifyDropListItems = document.querySelectorAll(
	'.header__nav--notify-droplist-item'
);

const videoContainer = document.querySelector('.primary');

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
		const notifyDropListItem = e.target.closest(
			'.header__nav--notify-droplist-item'
		);
		if (!notifyDropListItem) return;

		if (notifyDropListItem.classList.contains('notify-option-open')) {
			removeClass(notifyDropListItems, 'notify-option-open');
		} else {
			removeClass(notifyDropListItems, 'notify-option-open');
			notifyDropListItem.classList.toggle('notify-option-open');
		}
	})
);

const calculateDuration = date => {
	const date1 = new Date(Date.now());
	const date2 = new Date(date);
	const diff = new Date(date1.getTime() - date2.getTime());
	if (diff.getUTCFullYear() - 1970 !== 0) {
		return diff.getUTCFullYear() - 1970 + ' 年前';
	} else if (diff.getUTCMonth() !== 0) {
		return diff.getUTCMonth() + ' 月前';
	} else if (diff.getUTCDate() - 1 !== 0) {
		return diff.getUTCDate() - 1 + ' 天前';
	} else if (diff.getUTCHours() !== 0) {
		return diff.getUTCHours() + ' 小時前';
	} else if (diff.getUTCMinutes() !== 0) {
		return diff.getUTCMinutes() + ' 分鐘前';
	} else {
		return diff.getUTCSeconds() + ' 秒前';
	}
};

const formatDuration = duration => {
	return duration
		.replace('PT', '')
		.replace('H', ':')
		.replace('M', ':')
		.replace('S', '');
};

// fetch youtube api
const fetchData = async () => {
	const response = await fetch(
		'https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=statistics&part=snippet&maxResults=200&chart=mostPopular&key=AIzaSyDwd2mf4J_IieSBnr7F4ReCDw7yBZJxEIA'
	);

	const data = await response.json();
	console.log(data);

	let html = '';
	for (const video of data.items) {
		const channelResponse = await fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=AIzaSyDwd2mf4J_IieSBnr7F4ReCDw7yBZJxEIA`
		);

		const channelData = await channelResponse.json();

		html += `
		<div class="primary__item" onclick="window.open('https://www.youtube.com/watch?v=${
			video.id
		}','mywindow');">
			<div class="primary__img-box">
				<img src="${video.snippet.thumbnails.medium.url}" alt="${
			video.snippet.title
		}" class="primary__img"></img>
				<span class="primary__time">${formatDuration(
					video.contentDetails.duration
				)}</span>
				<div class="primary__button-box">
					<button class="primary__btn primary__btn--later">
						<span class="primary__btn--text">稍後觀看</span>
						<ion-icon name="time-outline" class="primary__btn--icon"></ion-icon>
					</button>
					<button class="primary__btn primary__btn--list">
						<span class="primary__btn--text">加入播放清單</span>
						<ion-icon name="list-outline" class="primary__btn--icon"></ion-icon>
					</button>
				</div>
			</div>
			<div class="primary__description">
				<img src="${
					channelData.items[0].snippet.thumbnails.medium.url
				}" alt="img 1 channel logo" class="primary__description--img">
				<div class="primary__description--text">
					<h2 class="primary__description--title">${
						video.snippet.title.length > 50
							? video.snippet.title.slice(0, 70) + '...'
							: video.snippet.title
					}</h2>
					<a href="https://www.youtube.com/channel/${
						video.snippet.channelId
					}" class="primary__description--channel">
						<span>${video.snippet.channelTitle}</span>
						<ion-icon name="checkmark-circle-outline" class="primary__description--channel-icon"></ion-icon>
					</a>
					<p class="primary__description--data">
						<span class="primary__description--amount">
							觀看次數：${
								video.statistics.viewCount >= 10000
									? `${Math.round(video.statistics.viewCount / 10000)}萬`
									: video.statistics.viewCount
							}次
						</span>
						<span class="primary__description--upload">
							${calculateDuration(video.snippet.publishedAt)}
						</span>
					</p>
				</div>
				<button class="primary__description--option-btn">
					<ion-icon name="ellipsis-vertical-outline" class="primary__description--icon"></ion-icon>
				</button>
				<div class="primary__description--option">
					<ul class="primary__description--option-list">
						<li class="primary__description--option-item">
							<button class="primary__description--option-link">
								<ion-icon name="list-outline" class="primary__description--option-icon"></ion-icon>
								<span>加入待播清單</span>
							</button>
						</li>
						<li class="primary__description--option-item">
							<button class="primary__description--option-link">
								<ion-icon name="time-outline" class="primary__description--option-icon"></ion-icon>
								<span>儲存至「稍後觀看」清單</span>
							</button>
						</li>
						<li class="primary__description--option-item">
							<button class="primary__description--option-link">
								<ion-icon name="list-outline" class="primary__description--option-icon"></ion-icon>
								<span>儲存至播放清單</span>
							</button>
						</li>
					</ul>
					<ul class="primary__description--option-list">
						<li class="primary__description--option-item">
							<button class="primary__description--option-link">
								<ion-icon name="ban-outline" class="primary__description--option-icon"></ion-icon>
								<span>不感興趣</span>
							</button>
						</li>
						<li class="primary__description--option-item">
							<button class="primary__description--option-link">
								<ion-icon name="hand-right-outline" class="primary__description--option-icon"></ion-icon>
								<span>不要推薦這個頻道</span>
							</button>
						</li>
						<li class="primary__description--option-item">
							<button class="primary__description--option-link">
								<ion-icon name="flag-outline" class="primary__description--option-icon"></ion-icon>
								<span>檢舉</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>`;
	}
	videoContainer.innerHTML = '';
	videoContainer.insertAdjacentHTML('afterbegin', html);
};

fetchData();
