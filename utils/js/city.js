export function createCityMarkers() {
  const mapElement = document.querySelector('.map__content');
  let mapWidth = mapElement.offsetWidth;
  let mapHeight = mapElement.offsetHeight;

  window.addEventListener('resize', () => {
    mapWidth = mapElement.offsetWidth;
    mapHeight = mapElement.offsetHeight;
  });

  function renderCity() {
    cityPoints.forEach((city) => {
      //
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
      this.obj.style.transform = `scaleX(1) translate(50%, -80%)`;
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
    this.cities.forEach((city) => {
      if (city.active) return;

      if (city.newYearTime <= now) {
        city.active = true;

        const cityElementOnScale = this.track.querySelector(`[data-city-name="${city.name}"]`);
        if (cityElementOnScale) {
          cityElementOnScale.classList.add('scale__point-active');
        }

        const cityElementOnMap = document.querySelector(`.city[data-city-name="${city.name}"]`);
        if (cityElementOnMap) {
          cityElementOnMap.style.animation = 'none';
          cityElementOnMap.children[0].style.display = 'none';
          cityElementOnMap.children[1].style.width = null;
          cityElementOnMap.children[1].style.height = null;
          cityElementOnMap.children[1].style.opacity = 1;
        }
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
