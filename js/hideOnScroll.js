export function hideOnScroll(element, offset, delay) {
	const hideElement = document.querySelector(element);
	hideElement.style.transition = `opacity ${delay}ms ease-in-out`;
	let timer;
	function debounce(func, wait) {
		let timeout;

		return function (...args) {
			clearTimeout(timeout); // Очищаем предыдущий таймер
			timeout = setTimeout(() => func.apply(this, args), wait); // Устанавливаем новый таймер
		};
	}

	function handleScroll() {
		if (window.scrollY >= offset) {
			hideElement.style.opacity = 0;
			timer = setTimeout(() => {
				hideElement.style.display = 'none';
			}, delay);
		} else {
			clearTimeout(timer);
			hideElement.style.opacity = 1;
			hideElement.style.display = 'flex';
		}
	}

	window.addEventListener('scroll', debounce(handleScroll, 100));
}
