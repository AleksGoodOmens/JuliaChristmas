import { addZero } from '../../../utils/addZero';
import styles from './count.module.css';

interface Props {
  value: number;
  title: string;
}

export const Count = ({ value, title }: Props) => {
  return (
    <div className={styles['item']}>
      <div
        id='days'
        className='countdown__number current'
      >
        {addZero(value)}
      </div>
      <h4 className={styles['title']}>{title}</h4>
    </div>
  );
};
