import { Greeting } from '@/components/greeting/Greeting';
import { Promo } from '@/components/promo/Promo';

export default function Home() {
  return (
    <section>
      <Promo />
      <Greeting />
    </section>
  );
}
