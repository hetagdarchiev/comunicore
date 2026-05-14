'use client';

import { ReactNode } from 'react';

import { useCreateThreadForm } from '../model/useCreateThreadForm';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Input } from '@/shared/ui/input';

type CreateThreadFormProps = {
  children?: ReactNode;
};

export function CreateThreadForm({ children }: CreateThreadFormProps) {
  const {
    title,
    localError,
    isPending,
    titleMaxLength,
    setTitle,
    handleSubmit,
  } = useCreateThreadForm();

  return (
    <div onSubmitCapture={handleSubmit} className='flex flex-col gap-y-2'>
      <Input
        name='thread-title'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder='Заголовок поста'
        maxLength={titleMaxLength}
        disabled={isPending}
        className='rounded-sm bg-white p-1'
      />
      {localError && <ErrorMessage error={localError} />}
      {children}
    </div>
  );
}
