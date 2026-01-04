interface Props {
  message: string;
}

export const Achieve = ({ message }: Props) => {
  return <h2 className='text-center text-3xl py-10'>{message}</h2>;
};
