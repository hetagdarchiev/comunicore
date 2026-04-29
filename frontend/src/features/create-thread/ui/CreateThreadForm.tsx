'use client';

import { ReactNode } from 'react';

import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { Input } from '@/shared/ui/Input';

import { useCreateThreadForm } from '../model/useCreateThreadForm';

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
    <div onSubmitCapture={handleSubmit}>
      <Input
        name='thread-title'
        icon={''}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder='Заголовок поста'
        maxLength={titleMaxLength}
        disabled={isPending}
      />
      {localError && <ErrorMessage error={localError} />}
      {children}
    </div>
  );
}
