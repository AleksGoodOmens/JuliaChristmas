export class Countdown {
	constructor(daysSelector, hoursSelector, minutesSelector, secondsSelector, date) {
		this.days = document.querySelector(daysSelector);
		this.hours = document.querySelector(hoursSelector);
		this.minutes = document.querySelector(minutesSelector);
		this.seconds = document.querySelector(secondsSelector);
		this.nextYear = new Date(date);
	}

	init() {
		this.timerInterval = setInterval(() => this.updateTimer(), 1000);
	}

	updateTimer() {
		const currentDate = new Date();
		const timeLeft = this.nextYear - currentDate;

		if (timeLeft <= 0) {
			clearInterval(this.timerInterval);
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
}
