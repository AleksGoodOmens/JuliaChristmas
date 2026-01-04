'use client';
import { useState } from 'react';
import styles from './banner.module.css';

interface Props {
  messages: string | string[];
}

export const Banner = ({ messages }: Props) => {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div
      className={styles['banner']}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles['banner__icon']}>!</div>
      <div className={styles['banner__container']}>
        <span className={`${styles['banner__text']} ${isPaused ? styles['pause'] : ''}`}>
          {Array.isArray(messages) ? messages.map((message) => `${message}           `) : messages}
        </span>
      </div>
      <div className={styles['banner__icon']}>!</div>
    </div>
  );
};
