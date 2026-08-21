import { Greeting } from '@/components/greeting/Greeting';
import { Map } from '@/components/map/Map';
import { Promo } from '@/components/promo/Promo';

export default function Home() {
  return (
    <>
      <Promo />
      <Greeting />
      <Map />
    </>
  );
}
