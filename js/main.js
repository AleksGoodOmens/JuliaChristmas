import { actions, createCityMarkers } from './city.js';
import { Countdown } from './countdown.js';
import { fetchData } from './helpers/helpers.js';
import { hideOnScroll } from './hideOnScroll.js';
import { renderSlides, Slider } from './slider.js';

window.addEventListener('DOMContentLoaded', async () => {
	const banner = document.querySelector('.banner');
	const bannerText = document.querySelector('.banner__text span');
	let isPaused = false;

	banner.addEventListener('click', (e) => {
		if (e.target.closest('.banner__icon')) {
			bannerText.style.animationPlayState = 'running';
		} else if (e.target.closest('.banner__text')) {
			bannerText.style.animationPlayState = 'paused';
		}

		isPaused = !isPaused;
	});

	new Countdown('.countdown', '2025-01-01T00:00:00').init();

	const photos = await fetchData('./data/data.json');
	if (photos) new Slider(`.promo__slider`, photos).init();

	const wishes = await fetchData('./data/wishes.json');
	if (wishes) {
		renderSlides('.swiper-wrapper', 'slider__slide swiper-slide', wishes);
	}
	createCityMarkers();

	actions.init('#dedmoroz', '.scale__bar', new Date(Date.UTC(2025, 0, 1, 0, 0, 0)));

	hideOnScroll('.banner', 300, 500);
});
