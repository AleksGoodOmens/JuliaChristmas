const cityPoints = [
	{ name: 'Амурск', lat: 50.2279, lon: 136.8792, utcOffset: +10, color: '#C3F3DC' },
	{ name: 'Белогорск', lat: 50.9213, lon: 128.4747, utcOffset: +9, color: '#CECD4E' },
	{ name: 'Крым', lat: 44.9521, lon: 34.1024 - 8, utcOffset: +3, color: '#B4D9D2' },
	{ name: 'Луцк', lat: 50.7472, lon: 25.3254 - 9, utcOffset: +2, color: '#D04543' },
	{ name: 'Резекне', lat: 56.5053, lon: 27.3303 - 9, utcOffset: +2, color: '#F8A71A' },
	{ name: 'Момменайм', lat: 50.1065, lon: 8.6821 - 12, utcOffset: +1, color: '#F3C7B5' },
	{ name: 'Лондон', lat: 51.5074, lon: -0.1278 - 12, utcOffset: 0, color: '#EB563E' },
	{ name: 'Нью-Йорк', lat: 40.7128, lon: -74.006 - 20, utcOffset: -5, color: '#4E8FB2' },
];

// Генерация элементов городов на карте
export function createCityMarkers() {
	const mapElement = document.querySelector('.map__content');
	let mapWidth = mapElement.offsetWidth;
	let mapHeight = mapElement.offsetHeight;

	window.addEventListener('resize', () => {
		mapWidth = mapElement.offsetWidth;
		mapHeight = mapElement.offsetHeight;
	});

	function geoToMap(lat, lon, mapWidth, mapHeight) {
		// Диапазоны широты и долготы для вашей карты
		const mapLatMin = -90,
			mapLatMax = 90; // Широта от -85 до 85
		const mapLonMin = -180,
			mapLonMax = 180; // Долгота от -180 до 180

		const x = ((lon - mapLonMin) / (mapLonMax - mapLonMin)) * mapWidth;
		const y = ((mapLatMax - lat) / (mapLatMax - mapLatMin)) * mapHeight;

		return { x, y };
	}

	function renderCity() {
		cityPoints.forEach((city) => {
			const { x, y } = geoToMap(city.lat, city.lon, mapWidth, mapHeight);

			// Создаем метку
			const cityMarker = document.createElement('div');
			cityMarker.innerHTML = `
			<svg viewBox="0 0 32 36" xmlns="http://www.w3.org/2000/svg">
	<g filter="url(#filter0_d_21_182)">
	<path d="M16 4C13.8921 3.99989 11.8693 4.83176 10.3712 6.31479C8.87323 7.79782 8.02108 9.81216 8 11.92C8 17.4 15.05 23.5 15.35 23.76C15.5311 23.9149 15.7616 24.0001 16 24.0001C16.2384 24.0001 16.4689 23.9149 16.65 23.76C17 23.5 24 17.4 24 11.92C23.9789 9.81216 23.1268 7.79782 21.6288 6.31479C20.1307 4.83176 18.1079 3.99989 16 4ZM16 15C15.3078 15 14.6311 14.7947 14.0555 14.4101C13.4799 14.0256 13.0313 13.4789 12.7664 12.8394C12.5015 12.1999 12.4322 11.4961 12.5673 10.8172C12.7023 10.1382 13.0356 9.51461 13.5251 9.02513C14.0146 8.53564 14.6382 8.2023 15.3172 8.06725C15.9961 7.9322 16.6999 8.00151 17.3394 8.26642C17.9789 8.53133 18.5256 8.97993 18.9101 9.5555C19.2947 10.1311 19.5 10.8078 19.5 11.5C19.5 12.4283 19.1313 13.3185 18.4749 13.9749C17.8185 14.6313 16.9283 15 16 15Z" fill="${city.color}"/>
	</g>
	<defs>
	<filter id="filter0_d_21_182" x="0" y="0" width="32" height="36.0001" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
	<feFlood flood-opacity="0" result="BackgroundImageFix"/>
	<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
	<feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_21_182"/>
	<feOffset dy="4"/>
	<feGaussianBlur stdDeviation="2"/>
	<feComposite in2="hardAlpha" operator="out"/>
	<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
	<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_21_182"/>
	<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_21_182" result="shape"/>
	</filter>
	</defs>
	</svg>
	
			`;

			cityMarker.setAttribute('data-city-name', city.name);
			cityMarker.className = 'city';
			cityMarker.style.left = `${x}px`;
			cityMarker.style.top = `${y}px`;
			cityMarker.style.animation = `bounceMarker 2s ${Math.floor(Math.random() * 3000) + 1}ms infinite`;

			// Добавляем подпись
			const cityLabel = document.createElement('div');
			cityLabel.className = 'city__name';
			cityLabel.innerText = `${city.name}`;
			cityMarker.appendChild(cityLabel);
			mapElement.appendChild(cityMarker);
		});
	}
	renderCity();

	function debounce(func, wait) {
		let timeout;
		return function (...args) {
			const context = this;
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(context, args), wait);
		};
	}

	function updateCityMarkers() {
		mapWidth = mapElement.offsetWidth;
		mapHeight = mapElement.offsetHeight;

		mapElement.querySelectorAll('.city').forEach((marker) => {
			const city = cityPoints.find((city) => city.name === marker.getAttribute('data-city-name'));

			if (city) {
				const { x, y } = geoToMap(city.lat, city.lon, mapWidth, mapHeight);
				marker.style.left = `${x}px`;
				marker.style.top = `${y}px`;
			}
		});
	}

	const debouncedResize = debounce(updateCityMarkers, 100);

	window.addEventListener('resize', debouncedResize);
}

export const actions = {
	obj: undefined,
	track: undefined,
	cityPoints: undefined,
	containerWith: undefined,
	XDay: undefined,
	startTime: undefined,
	endTime: undefined,
	animationDuration: 24 * 3600,
	cities: undefined,
	debouncedHandleResize: null,

	init: function (objSelector, trackSelector, dateUtc) {
		this.obj = document.querySelector(objSelector);
		this.track = document.querySelector(trackSelector);
		this.containerWith = this.track.offsetWidth;
		this.XDay = dateUtc;

		this.startTime = new Date(this.XDay.getTime()).setUTCHours(this.XDay.getUTCHours() - 12);
		this.endTime = new Date(this.XDay.getTime()).setUTCHours(this.XDay.getUTCHours() + 12);
		this.cities = cityPoints.map((city) => ({
			...city,
			newYearTime: new Date(this.XDay.getTime()).setUTCHours(this.XDay.getUTCHours() - city.utcOffset),
		}));

		this.initializeDebouncedResize();
		this.renderCityOnTheScale();
		this.updatePosition();
	},

	initializeDebouncedResize: function () {
		if (this.debouncedHandleResize) {
			window.removeEventListener('resize', this.debouncedHandleResize);
		}

		this.debouncedHandleResize = this.debounce(() => {
			this.containerWith = this.track.offsetWidth;
		}, 100);

		window.addEventListener('resize', this.debouncedHandleResize);
	},

	debounce: function (func, wait) {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), wait);
		};
	},

	updatePosition: function () {
		const now = new Date();

		if (now < this.startTime) {
			requestAnimationFrame(() => this.updatePosition());
			return;
		}

		if (now > this.endTime) {
			this.obj.style.left = `0px`;
			this.obj.style.transform = `scaleX(1) translateX(0)`;
			console.log('С новым годом!');
			return;
		}

		const totalSeconds = Math.floor((now - this.startTime) / 1000);
		const progress = totalSeconds / this.animationDuration;
		const position = (1 - progress) * this.containerWith;

		this.obj.style.left = `${position}px`;
		this.newYearInTheCity(now);

		requestAnimationFrame(() => this.updatePosition());
	},

	newYearInTheCity: function (now) {
		const activeCities = new Set(this.cities.filter((city) => city.newYearTime <= now).map((city) => city.name));

		this.track.querySelectorAll('[data-city-name]').forEach((child) => {
			if (activeCities.has(child.getAttribute('data-city-name'))) {
				child.classList.add('scale__point-active');
			}
		});
	},

	renderCityOnTheScale: function () {
		this.track.innerHTML = '';
		this.cities.forEach((city) => {
			const point = document.createElement('div');
			point.className = 'scale__point';
			point.style.backgroundColor = city.color;
			point.textContent = city.name;
			point.setAttribute('data-city-name', city.name);

			this.track.appendChild(point);
		});
	},
};
