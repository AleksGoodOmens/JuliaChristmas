import { PromoSlider } from '@/components/promo-slider/PromoSlider';
import Link from 'next/link';

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='h-80 relative mt-12'>
        <PromoSlider />
      </div>
      <section className='mt-5 container px-3.5 mx-auto py-4'>
        <h1 className='text-4xl text-bold'>Latest News</h1>
        <h2 className='py-4'>Keep up to date with all the news happening in our family at the moment.</h2>

        <div className='grid gap-2 grid-cols-12 '>
          <div className='col-span-9'>{children}</div>
          <nav className='bg-main rounded-xl text-secondary p-4 self-start col-span-3 mt-6'>
            <h3 className='text-2xl font-bold'>In this section</h3>
            <ul className='pl-2 grid gap-2 pt-4'>
              <li>
                <Link href={'/news/calendar'}>Calendar</Link>
              </li>
              <li>
                <Link href={'/letters'}>Letters</Link>
              </li>
              <li>
                <Link href={'/news letters'}>news letters</Link>
              </li>
              <li>
                <Link href={'/contact'}>Contacts</Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
