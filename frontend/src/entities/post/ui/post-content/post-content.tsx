import Link from 'next/link';

interface PostContentProps {
  id: string | number;
  title: string;
  children: React.ReactNode;
}

export const PostContent = ({ id, title, children }: PostContentProps) => (
  <div className='mb-4'>
    <Link href={`/posts/${id}`}>
      <h2 className='mb-2.5 text-2xl leading-none font-bold max-sm:text-xl'>
        {title}
      </h2>
    </Link>
    <p className='line-clamp-6 text-base leading-6 font-light tracking-wider'>
      {children}
    </p>
  </div>
);
