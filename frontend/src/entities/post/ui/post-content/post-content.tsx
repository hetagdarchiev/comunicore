import Link from 'next/link';
import {ReactNode} from "react";

import { renderHtml } from '@/shared/lib/markdown';

interface PostContentProps {
  id: string | number;
  title: string;
  children: ReactNode;
}

export const PostContent = ({ id, title, children }: PostContentProps) => (
  <div className='mb-4'>
    <Link href={`/posts/${id}`}>
      <h2 className='mb-2.5 text-2xl leading-none font-bold max-sm:text-xl'>
        {title}
      </h2>
    </Link>
    <div
      className='line-clamp-6 text-base leading-6 font-light tracking-wider'
      dangerouslySetInnerHTML={{ __html: renderHtml(String(children ?? '')) }}
    />
  </div>
);
