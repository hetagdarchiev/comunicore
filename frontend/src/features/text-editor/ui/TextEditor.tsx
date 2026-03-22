'use client';

import { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import clsx from 'clsx';

import { Button } from '@/shared/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  MarkDownSchema,
  markdownSchema,
} from '../model/schema/markdown.schema';
import { EditorMode } from '../model/types/mode.types';

import { Editor } from './editor';
import { ModeSwitcher } from './mode-switcher';
import { Preview } from './preview';
import { Toolbar } from './toolbar';

export function TextEditor() {
  const [mode, setActiveMode] = useState<EditorMode>('edit');
  const form = useForm<MarkDownSchema>({
    resolver: zodResolver(markdownSchema),
    mode: 'onChange',
    defaultValues: {
      markdown: '',
    },
  });

  const {
    control,
    formState: { isValid },
    getValues,
    setValue,
  } = form;

  const markdown = useWatch({
    control: control,
    name: 'markdown',
  });

  const markdownFieldRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className='grid h-full grid-rows-[1fr_auto] gap-y-2'>
      <div className='relative flex flex-col gap-y-2 overflow-hidden'>
        <div className='bg-blue-16 sticky z-100 grid grid-cols-[auto_1fr] items-center rounded-md'>
          <ModeSwitcher mode={mode} setMode={setActiveMode} />
          <Toolbar
            mode={mode}
            getValues={getValues}
            setValue={setValue}
            markdownFieldRef={markdownFieldRef}
          />
        </div>
        <div
          className={clsx(
            'h-full overflow-hidden rounded-lg bg-white',
            mode === 'edit' ? 'block' : 'hidden',
          )}
        >
          <Editor form={form} markdownFieldRef={markdownFieldRef} />
        </div>
        <div
          className={clsx(
            'h-full overflow-hidden rounded-lg bg-white',
            mode === 'preview' ? 'block' : 'hidden',
          )}
        >
          <Preview markdown={markdown ?? ''} />
        </div>
      </div>
      <Button
        form='text-editor-form'
        disabled={!isValid}
        type='submit'
        className='w-full'
      >
        Apply
      </Button>
    </div>
  );
}
