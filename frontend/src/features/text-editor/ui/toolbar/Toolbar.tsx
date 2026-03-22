import { RefObject } from 'react';
import clsx from 'clsx';

import { toolsGroup } from '../../model/data';
import {
  MarkdownGetValue,
  MarkdownSetValue,
} from '../../model/types/ctx.types';
import { EditorMode } from '../../model/types/mode.types';

interface Props {
  mode: EditorMode;
  getValues: MarkdownGetValue;
  setValue: MarkdownSetValue;
  markdownFieldRef: RefObject<HTMLTextAreaElement | null>;
}

export function Toolbar(props: Props) {
  const { mode, getValues, setValue, markdownFieldRef } = props;

  return (
    <div
      className={clsx(
        'flex h-full items-center justify-end px-3 text-white',
        mode === 'preview' && 'hidden',
      )}
    >
      {toolsGroup.map((list, index) => (
        <ul
          key={`list-${index}`}
          className='not-last:border-blue-77 flex px-2 not-last:border-r'
        >
          {list.map(({ label, title, toolFn }) => (
            <li key={title} className='size-8'>
              <button
                type='button'
                title={title}
                onClick={() =>
                  toolFn({
                    getValues,
                    setValue,
                    textarea: markdownFieldRef.current,
                  })
                }
                className='hover:bg-blue-20 flex size-full items-center justify-center rounded-sm duration-200'
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
