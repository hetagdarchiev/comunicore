import { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

import { TEditorMode } from '../../model/types/mode.type';

export function ModeSwitcher({
  setMode,
  mode,
}: {
  setMode: Dispatch<SetStateAction<TEditorMode>>;
  mode: TEditorMode;
}) {
  return (
    <div
      className={clsx(
        'relative flex w-full max-w-50 justify-around gap-x-2 rounded-lg border border-neutral-500 bg-white px-2 py-1 before:absolute before:top-[50%] before:left-0 before:h-8/10 before:w-[50%] before:-translate-y-1/2 before:rounded-md before:bg-neutral-300 before:opacity-50 before:duration-200 before:content-[""]',
        mode === 'editor' && 'before:translate-x-[4%]',
        mode === 'preview' && 'before:translate-x-[96%]',
      )}
    >
      <button
        type='button'
        className='w-full'
        onClick={() => setMode('editor')}
      >
        Edit
      </button>
      <button
        type='button'
        className='w-full'
        onClick={() => setMode('preview')}
      >
        Preview
      </button>
    </div>
  );
}
