import { PromoSlider } from '@/components/promo-slider/PromoSlider';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendarCustomStyles.css';

const CalendarPage = () => {
  return (
    <div className='bg-foreground'>
      <div className='h-5 overflow-hidden relative'>
        <PromoSlider />
      </div>
      <div className='container mx-auto'>
        <h2>Calendar</h2>
        <Calendar locale='en' />
      </div>
    </div>
  );
};
export default CalendarPage;
