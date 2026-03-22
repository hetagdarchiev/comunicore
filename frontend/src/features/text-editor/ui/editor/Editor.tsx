'use client';

import { RefObject, useCallback, useEffect } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import clsx from 'clsx';

import { toolsGroup } from '../../model/data';
import { useDragHandler } from '../../model/hooks/useDragHandel';
import { renderHtml } from '../../model/lib/markdown';
import { MdEditorKeyBoard } from '../../model/lib/mdEditor/MdEditorKeyBoard';
import { MarkDownSchema } from '../../model/schema/markdown.schema';

interface Props {
  form: UseFormReturn<MarkDownSchema>;
  markdownFieldRef: RefObject<HTMLTextAreaElement | null>;
}

export function Editor({ form, markdownFieldRef }: Props) {
  const { register, reset, handleSubmit, getValues, setValue } = form;

  const {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragging,
    markdownLink,
  } = useDragHandler();

  const { ref, ...mdRedister } = register('markdown');

  useEffect(() => {
    if (!markdownLink) return;
    console.log(markdownLink);
  }, [markdownLink]);

  const onSubmit: SubmitHandler<MarkDownSchema> = useCallback(
    async (data) => {
      const html = renderHtml(data.markdown);

      await new Promise((res) => {
        setTimeout(() => {
          console.log(html);
          reset({ markdown: '' });
          return res(null);
        }, 1000);
      });
    },
    [reset],
  );

  // Make dropDown actions in useDragHandler

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id='text-editor-form'
      className='grid h-full gap-y-4'
    >
      <textarea
        id='markdown-editor'
        className={clsx(
          'h-full resize-none rounded-lg p-4 duration-200',
          isDragging && 'outline-5 outline-gray-300',
        )}
        {...mdRedister}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={(event) =>
          MdEditorKeyBoard.handleKeyDown(
            event,
            {
              textarea: event.currentTarget,
              getValues,
              setValue,
            },
            toolsGroup,
          )
        }
        ref={(el) => {
          ref(el);
          if (markdownFieldRef) {
            markdownFieldRef.current = el;
          }
        }}
        aria-label='Text Editor'
        placeholder='Describe text...'
      />
    </form>
  );
}
