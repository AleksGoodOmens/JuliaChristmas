import Image from 'next/image';
import { INews } from '../../../types/interfaces';

export const NewsCard = ({ picSrc, alt, date, title, desc }: INews) => {
  return (
    <article className='relative  min-w-3xs'>
      <Image
        className='absolute w-full h-full object-center object-cover overflow-hidden rounded-4xl'
        src={picSrc}
        alt={alt}
        width={100}
        height={100}
      />
      <div className='relative mx-auto w-fit translate-y-[-50%] p-3 bg-green-700 text-secondary'>{date}</div>
      <div className='grid place-content-center gap-4 p-2 relative bg-gradient-to-b from-stone-900/25 to-stone-900 rounded-4xl text-secondary'>
        <h3 className='text-center'>{title}</h3>
        <p>{desc}</p>
        <button className='bg-transparent font-bold text-xl px-4 py-2'>READ MORE +</button>
      </div>
    </article>
  );
};
