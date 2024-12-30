export class Countdown {
	constructor(containerSelector, date) {
		this.container = document.querySelector(containerSelector);
		this.days = document.querySelector('#days');
		this.hours = document.querySelector('#hours');
		this.minutes = document.querySelector('#minutes');
		this.seconds = document.querySelector('#seconds');
		this.nextYear = new Date(date).getTime();
	}

	init() {
		this.container.style.opacity = 1;
		this.timerInterval = setInterval(() => this.updateTimer(), 1000);
	}

	updateTimer() {
		const currentDate = new Date().getTime();
		const timeLeft = this.nextYear - currentDate;

		if (timeLeft <= 0) {
			clearInterval(this.timerInterval);
			this.final();

			return;
		}

		const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		this.renderTimer(this.days, days);
		this.renderTimer(this.hours, hours);
		this.renderTimer(this.minutes, minutes);
		this.renderTimer(this.seconds, seconds);
	}

	renderTimer(element, value) {
		element.textContent = value < 10 ? `0${value}` : value;
	}

	final() {
		this.container.innerHTML = '';
		this.container.style.display = 'block';
		const title = document.createElement('h1');
		title.className = 'final-title';
		title.textContent = 'С новым годом! Принимайте поздравления!';
		this.container.appendChild(title);

		document.querySelector('.title-before').style.display = 'none';

		document.querySelector(`[href="#slider"]`).style.visibility = null;
		document.querySelector(`.greeting`).style.display = null;
		new Swiper('.swiper', {
			effect: 'cube',
			grabCursor: true,
			loop: true,
			cubeEffect: {
				shadow: true,
				slideShadows: true,
				shadowOffset: 20,
				shadowScale: 0.94,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});
	}
}
