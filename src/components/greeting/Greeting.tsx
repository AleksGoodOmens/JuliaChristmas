'use client';
import { Anchor } from '../anchor/Anchor';
import Image from 'next/image';
import styles from './greetings.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { IPhoto } from '../../../types/interfaces';

import 'swiper/css/effect-cube';
import { News } from '../news/News';

export const Greeting = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  useEffect(() => {
    fetch('./data/wishes.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPhotos(data);
      });
  }, []);

  return (
    <section
      className={styles['greeting']}
      id='slider'
    >
      <h2 className={styles['title-before']}>After new year coming you will see greetings!</h2>

      <div className={styles['content']}>
        <h2 className={styles['title']}> Our greetings! </h2>
        <Swiper
          className={styles['slider']}
          effect={'cube'}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          modules={[Autoplay, EffectCube]}
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
                className={styles['slide']}
              >
                <Image
                  className='block object-cover object-center h-full w-full'
                  width={600}
                  height={600}
                  alt={photo.alt}
                  src={`/${photo.path}/${photo.image}.${photo.extensions[0]}`}
                  key={photo.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Image
          className={styles['snowman']}
          src='/images/slider/Snowman.png'
          alt='snow man'
          width={75}
          height={100}
        />
      </div>
      <Anchor
        href='#map'
        className={'text-center mx-auto mt-4'}
      />
      <News />
    </section>
  );
};
