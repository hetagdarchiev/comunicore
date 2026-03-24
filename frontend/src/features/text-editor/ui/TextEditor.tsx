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

import { Editor } from './components/editor';
import { ModeSwitcher } from './components/mode-switcher';
import { Preview } from './components/preview';
import { Toolbar } from './components/toolbar';

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
    <div className='flex h-full flex-col gap-y-2'>
      <div className='flex min-h-0 flex-1 flex-col gap-y-2 overflow-y-hidden'>
        <div className='bg-blue-16 grid grid-cols-[auto_1fr] items-center rounded-md'>
          <ModeSwitcher mode={mode} setMode={setActiveMode} />
          <Toolbar
            mode={mode}
            getValues={getValues}
            setValue={setValue}
            markdownFieldRef={markdownFieldRef}
          />
        </div>
        <div className='relative flex flex-1 flex-col overflow-hidden rounded-lg bg-white'>
          <div className={clsx('h-full', mode === 'edit' ? 'block' : 'hidden')}>
            <Editor form={form} markdownFieldRef={markdownFieldRef} />
          </div>
          <div
            className={clsx(
              'grid h-full grid-rows-[minmax(1rem,10rem)] overflow-y-auto p-4',
              mode === 'preview' ? 'block' : 'hidden',
            )}
          >
            <Preview markdown={markdown ?? ''} />
          </div>
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
