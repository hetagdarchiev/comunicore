'use client';

import { useState } from 'react';

import { TEditorMode } from '../model';

import { Editor } from './editor';
import { ModeSwitcher } from './mode-switcher';
import { Preview } from './preview';

export function PostEditor() {
  const [activeMode, setActiveMode] = useState<TEditorMode>('editor');
  const [markdown, setMarkdown] = useState('');

  return (
    <div className='grid size-full grid-rows-[auto_1fr] gap-y-4'>
      <ModeSwitcher mode={activeMode} setMode={setActiveMode} />
      {activeMode === 'editor' ? (
        <Editor markdown={markdown} setMarkdown={setMarkdown} />
      ) : (
        <Preview markdown={markdown} />
      )}
    </div>
  );
}
