'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import clsx from 'clsx';

import { Button } from '@/shared/ui/Button';

import { useDragHandler } from '../../model';

interface Props {
  setMarkdown: Dispatch<SetStateAction<string>>;
  markdown: string;
}

export function Editor(props: Props) {
  const { markdown, setMarkdown } = props;

  const {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragging,
    markdownFile,
  } = useDragHandler();

  useEffect(() => {
    if (!markdownFile) return;
    console.log(markdownFile);
  }, [markdownFile]);

  return (
    <form className='grid grid-rows-[1fr_auto] gap-y-4'>
      <textarea
        name='markdown-editor'
        id='markdown-editor'
        className={clsx(
          'h-full resize-none rounded-lg border border-neutral-500 bg-white p-4 duration-200',
          isDragging && 'outline-5 outline-gray-300',
        )}
        onChange={(event) => {
          setMarkdown(event.currentTarget.value);
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        aria-label='Post Editor'
        value={markdown}
        placeholder='Describe text...'
      />
      <Button type='submit' className='w-full'>
        Apply
      </Button>
    </form>
  );
}
