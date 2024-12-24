export const toggleClass = (el, className) => {
	el.classList.toggle(className);
};

export const getScrollbarWidth = () => {
	const div = document.createElement('div');

	div.style.width = '100px';
	div.style.height = '100px';
	div.style.overflow = 'scroll';
	div.style.position = 'absolute';
	div.style.top = '-9999px';

	document.body.appendChild(div);

	const scrollbarWidth = div.offsetWidth - div.clientWidth;

	document.body.removeChild(div);

	return scrollbarWidth;
};

export const fetchData = async (path) => {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error('error while fetch JSON');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('error', error);
	}
};

export const fixScroll = () => {
	document.body.style = `overflow: hidden; padding-right:${getScrollbarWidth()}px`;
};

export const unfixScroll = () => {
	document.body.style = `overflow: unset; padding-right: unset;`;
};
export function renderCards(container, cardsList) {
	container.innerHTML = '';
	cardsList.forEach((card) => {
		const newCard = document.createElement('article');
		newCard.className = 'bestGifts__card card';
		newCard.setAttribute('data-category', card.category.toLowerCase());
		newCard.setAttribute('tabindex', '0');
		newCard.setAttribute('aria-expanded', 'false');
		newCard.setAttribute('data-name', card.name);
		newCard.innerHTML = `
		<div class='card__image'></div>
		<div class="card__content">
			<div class='card__info'>
				<h4 class='card__info-category'>${card.category.toLowerCase()}</h4>
				<h3 class='card__info-name'>${card.name}</h3>
			</div>
		
		</div>
		`;

		container.appendChild(newCard);
	});
}
