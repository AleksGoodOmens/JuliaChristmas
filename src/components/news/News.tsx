import { NewsCard } from '../news-card/NewsCard';

export const News = () => {
  return (
    <div className='container mx-auto my-4'>
      <h2 className='py-4 text-3xl text-foreground mb-4'>Latest news</h2>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <NewsCard
          alt='julia'
          picSrc='/photos/DSC_6950.jpeg'
          date='21 dec 2024'
          desc='Julia Love Nikita!'
          title='Mummy loves her sone!'
        />
        <NewsCard
          alt='julia'
          picSrc='/photos/DSC_6950.jpeg'
          date='21 dec 2024'
          desc='Julia Love Nikita!'
          title='Mummy loves her sone!'
        />
        <NewsCard
          alt='julia'
          picSrc='/photos/DSC_6950.jpeg'
          date='21 dec 2024'
          desc='Julia Love Nikita!'
          title='Mummy loves her sone!'
        />
      </div>
    </div>
  );
};
