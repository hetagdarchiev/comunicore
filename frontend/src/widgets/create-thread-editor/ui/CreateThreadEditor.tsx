'use client';

import { CreateThreadForm } from '@/features/create-thread';
import { TextEditor } from '@/features/text-editor';

export function CreateThreadEditor() {
  return (
    <CreateThreadForm>
      <TextEditor />
    </CreateThreadForm>
  );
}
