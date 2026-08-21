import Image from 'next/image';

import news from '../../../data/news.json';

interface Props {
  params: Promise<{ id?: string }>;
}

export default async function CurrentNewsPage({ params }: Props) {
  const { id } = await params;
  const card = news.find((item) => item.id === id);
  console.log(card);
  return (
    <section className=''>
      <h2>{card?.id}</h2>
      {card ? (
        <div className='w-full aspect-3/1 flex place-content-center place-items-center'>
          <Image
            className='w-full h-full object-cover object-center rounded-xl'
            src={card.picSrc}
            alt={card.alt}
            width={400}
            height={267}
          />
        </div>
      ) : (
        'no img'
      )}
      <p className='py-4'>{card?.desc}</p>
    </section>
  );
}
