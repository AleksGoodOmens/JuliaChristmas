import Image from 'next/image';
import { INews } from '../../../types/interfaces';
import Link from 'next/link';

export const NewsCard = ({ picSrc, alt, date, title, desc, id }: INews) => {
  return (
    <article className='relative rounded-4xl  min-w-3xs  '>
      <Image
        className='absolute inset-0 w-full h-full object-center object-cover overflow-hidden  rounded-4xl'
        src={picSrc}
        alt={alt}
        width={100}
        height={100}
      />
      <div className='absolute inset-0 rounded-4xl bg-linear-to-b from-stone-900/10 via-stone-900/30 to-stone-900/90' />

      <div
        className='relative mx-auto w-fit translate-y-[-50%] p-3 bg-green-700 
			text-secondary font-bold text-2xl'
      >
        {date}
      </div>
      <div className='grid place-content-center gap-4 p-2 relative  rounded-4xl text-secondary'>
        <h3 className='text-center text-2xl'>{title}</h3>
        <p className='text-center'>{desc}</p>
        <Link
          href={`/news/${id}`}
          className='group text-center bg-transparent font-bold text-xl px-4 py-2 uppercase'
        >
          Read More <span className='inline-block transition-transform duration-300 group-hover:rotate-45'>+</span>
        </Link>
      </div>
    </article>
  );
};
