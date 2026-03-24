'use client';

import { RefObject, useCallback, useEffect } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import clsx from 'clsx';

import { useEditorDraft } from '@/features/text-editor/model/hooks/useEditorDraft';
import { useEditorKeyBoard } from '@/features/text-editor/model/hooks/useEditorKeyBoard';

import { useDragHandler } from '../../../model/hooks/useDragHandel';
import { renderHtml } from '../../../model/lib/markdown';
import { MarkDownSchema } from '../../../model/schema/markdown.schema';

interface Props {
  form: UseFormReturn<MarkDownSchema>;
  markdownFieldRef: RefObject<HTMLTextAreaElement | null>;
}

export function Editor({ form, markdownFieldRef }: Props) {
  const { register, reset, handleSubmit } = form;

  const {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragging,
    markdownLink,
  } = useDragHandler();

  const { clearDraft } = useEditorDraft(form);
  const { onKeyDown } = useEditorKeyBoard(form);

  const { ref, ...mdRedister } = register('markdown');

  useEffect(() => {
    if (!markdownLink) return;
    console.log(markdownLink);
  }, [markdownLink]);

  const onSubmit: SubmitHandler<MarkDownSchema> = useCallback(
    async (data) => {
      const html = renderHtml(data.markdown);

      try {
        await new Promise((res) => setTimeout(res, 1000));
        console.log(html);
        reset({ markdown: '' });
        clearDraft();
      } catch (error) {
        console.error(error);
      }
    },
    [reset, clearDraft],
  );

  const setRefs = (element: HTMLTextAreaElement | null) => {
    ref(element);
    markdownFieldRef.current = element;
  };

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
        onKeyDown={onKeyDown}
        ref={(element) => setRefs(element)}
        aria-label='Text Editor'
        placeholder='Describe text...'
      />
    </form>
  );
}
