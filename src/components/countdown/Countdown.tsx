'use client';

import { useEffect, useState } from 'react';
import styles from './countdown.module.css';
import { Count } from '../count/Count';
import { Achieve } from '../achieve/Achieve';

interface Props {
  date: Date;
}

export const Countdown = (props: Props) => {
  const [nextYear] = useState(new Date(props.date).getTime());
  const [achieve, setAchieve] = useState(false);

  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (achieve) return;
    const updateTimer = () => {
      const currentDate = new Date().getTime();
      const timeLeft = nextYear - currentDate;
      if (timeLeft <= 0) {
        console.log(timeLeft);
        setAchieve(true);
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTimer({
        days,
        hours,
        minutes,
        seconds,
      });
    };
    updateTimer();
    const interval = setInterval(() => updateTimer(), 1000);

    return () => clearInterval(interval);
  }, [nextYear, achieve]);

  return (
    <>
      {!achieve && (
        <div className={styles['countdown']}>
          {Object.entries(timer).map((item) => {
            return (
              <Count
                key={item[0]}
                value={item[1]}
                title={item[0]}
              />
            );
          })}
        </div>
      )}
      {achieve && <Achieve message='Happy new Year! Best wishes!' />}
    </>
  );
};
