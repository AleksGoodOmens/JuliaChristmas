export class Slider {
	constructor(slideContainer, photoList) {
		this.slider = document.querySelector(slideContainer);
		this.slideClassName = slideContainer.slice(1, -1);
		this.photoList = photoList;
	}

	init() {
		this.slider.innerHTML = '';
		this.renderImages();
		this.changePhoto();
	}

	changePhoto() {
		const currentPhotos = this.slider.querySelectorAll(`.${this.slideClassName}`);
		let counter = this.randomNumber(0, currentPhotos.length);

		setInterval(() => {
			if (currentPhotos) {
				currentPhotos.forEach((photo) => photo.classList.remove(`${this.slideClassName}-active`));
				if (counter >= currentPhotos.length) counter = 0;
				currentPhotos[counter].classList.add(`${this.slideClassName}-active`);
				counter = this.randomNumber(counter, currentPhotos.length);
			}
		}, 10000);
	}

	randomNumber(cur, max) {
		const next = Math.floor(Math.random() * max);

		return cur === next ? this.randomNumber(cur, max) : next;
	}

	renderImages() {
		const initIndex = this.randomNumber(0, this.photoList.length);

		this.photoList.forEach((pic, i) => {
			const picture = document.createElement('picture');
			picture.className =
				i === initIndex ? `${this.slideClassName} ${this.slideClassName}-active` : this.slideClassName;
			pic.extensions.forEach((ext) => {
				let source = document.createElement('source');
				source.srcset = `${pic.path}/${pic.image}.${ext}`;
				source.type = `image/${ext}`;
				if (ext === 'jpg') source.type = 'image/jpeg';
				picture.appendChild(source);
			});

			let img = document.createElement('img');
			img.src = `${pic.path}/${pic.image}.jpeg`;
			img.alt = pic.alt;
			picture.appendChild(img);

			this.slider.appendChild(picture);
		});
	}
}

export const renderSlides = (container, className, arrayPhoto) => {
	arrayPhoto.forEach((pic) => {
		const wrapper = document.createElement('div');
		wrapper.className = className;
		const picture = document.createElement('picture');
		pic.extensions.forEach((ext) => {
			let source = document.createElement('source');
			source.srcset = `${pic.path}/${pic.image}.${ext}`;
			source.type = `image/${ext}`;
			if (ext === 'jpg') source.type = 'image/jpeg';
			picture.appendChild(source);
		});

		let img = document.createElement('img');
		img.src = `${pic.path}/${pic.image}.jpeg`;
		img.alt = pic.alt;
		picture.appendChild(img);
		wrapper.appendChild(picture);

		document.querySelector(container).appendChild(wrapper);
	});
};
