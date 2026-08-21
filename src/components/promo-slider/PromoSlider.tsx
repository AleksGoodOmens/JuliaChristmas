'use client';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import styles from './styles.module.css';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { IPhoto } from '../../../types/interfaces';

export const PromoSlider = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  useEffect(() => {
    fetch('/data/photos.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPhotos(data);
      });
  }, []);

  return (
    <Swiper
      className={styles.slider}
      effect={'fade'}
      modules={[Autoplay, EffectFade]}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {photos.map((photo) => {
        return (
          <SwiperSlide
            key={photo.id}
            className={styles.slide}
          >
            <Image
              className='w-full h-full animate-bgScaler'
              width={1920}
              height={1080}
              alt={photo.alt}
              src={`/${photo.path}/${photo.image}.${photo.extensions[0]}`}
              key={photo.id}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
