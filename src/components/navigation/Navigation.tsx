import Link from 'next/link';

const links = [
  { path: '/', title: 'home' },
  { path: '/calendar', title: 'calendar' },
];

export const Navigation = () => {
  return (
    <nav className='fixed top-16 left-0 z-30 bg-accent/80 text-secondary w-full p-4 flex gap-4 uppercase'>
      {links.map((link) => (
        <Link
          href={link.path}
          key={link.title}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};
