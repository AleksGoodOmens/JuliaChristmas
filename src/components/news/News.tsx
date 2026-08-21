import { NewsCard } from '../news-card/NewsCard';
import news from '../../data/news.json';

export const News = () => {
  return (
    <div className='container mx-auto my-4'>
      <h2 className='py-4 text-3xl text-foreground mb-4'>Latest news</h2>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {news.map(({ id, alt, picSrc, date, desc, title }) => (
          <NewsCard
            key={id}
            alt={alt}
            picSrc={picSrc}
            date={date}
            desc={desc}
            title={title}
            id={id}
          />
        ))}
      </div>
    </div>
  );
};
