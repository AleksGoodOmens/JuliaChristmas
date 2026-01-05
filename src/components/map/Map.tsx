'use client';

import Image from 'next/image';
import styles from './map.module.css';
import { CityIcon } from '../city-icon/CityIcon';
import geoToMap from '../../../utils/geoToMap';
import { useEffect, useRef, useState } from 'react';
const cityPoints = [
  { name: 'Амурск', lat: 50.2279, lon: 136.8792, utcOffset: +10, color: '#C3F3DC' },
  { name: 'Симферополь', lat: 44.9521, lon: 34.1024 - 8, utcOffset: +3, color: '#B4D9D2' },
  { name: 'Луцк', lat: 50.7472, lon: 25.3254 - 9, utcOffset: +2, color: '#D04543' },
  { name: 'Резекне', lat: 56.5053, lon: 27.3303 - 9, utcOffset: +2, color: '#F8A71A' },
  { name: 'Момменайм', lat: 50.1065, lon: 8.6821 - 12, utcOffset: +1, color: '#F3C7B5' },
  { name: 'Лондон', lat: 51.5074, lon: -0.1278 - 12, utcOffset: 0, color: '#EB563E' },
  { name: 'Нью-Йорк', lat: 40.7128, lon: -74.006 - 20, utcOffset: -5, color: '#4E8FB2' },
];

export const Map = () => {
  const mapRef = useRef<null | HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        setMapSize({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight,
        });
      }
    };

    updateMapSize();

    window.addEventListener('resize', updateMapSize);

    window.addEventListener('load', updateMapSize);

    return () => {
      window.removeEventListener('resize', updateMapSize);
      window.removeEventListener('load', updateMapSize);
    };
  }, []);
  const cities = cityPoints.map((city) => {
    const { x, y } = geoToMap(city.lat, city.lon, mapSize.width, mapSize.height);
    return (
      <CityIcon
        key={city.name}
        x={x}
        y={y}
        name={city.name}
        color={city.color}
      />
    );
  });

  return (
    <section
      className={`${styles.map} container mx-auto`}
      id='map'
    >
      <div
        className={styles['content']}
        ref={mapRef}
      >
        <div className={styles['map__content']}>
          {cities}
          <div className={styles['scale']}>
            <div className={styles['scale__bar']}></div>
            <Image
              id='dedmoroz'
              src='/images/ded2.png'
              alt='Дедушка мороз!'
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
