import styles from './promo.module.css';
import { Countdown } from '../countdown/Countdown';
import { PromoSlider } from '../promo-slider/PromoSlider';
import { Anchor } from '../anchor/Anchor';
export const Promo = () => {
  return (
    <section className={styles['promo']}>
      <PromoSlider />
      <div className=' h-full flex flex-col justify-end items-center gap-2'>
        <Countdown date={new Date(new Date().getFullYear() + 1, 0, 1)} />
        <Anchor />
      </div>
    </section>
  );
};
