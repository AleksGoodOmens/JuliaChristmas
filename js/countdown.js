export class Countdown {
	constructor(containerSelector, date) {
		this.container = document.querySelector(containerSelector);
		this.days = document.querySelector('#days');
		this.hours = document.querySelector('#hours');
		this.minutes = document.querySelector('#minutes');
		this.seconds = document.querySelector('#seconds');
		this.nextYear = new Date(date);
	}

	init() {
		this.timerInterval = setInterval(() => this.updateTimer(), 1000);
		this.container.style.opacity = 1;
	}

	updateTimer() {
		const currentDate = new Date();
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
		title.textContent = 'С новым годом!';
		this.container.appendChild(title);
	}
}
