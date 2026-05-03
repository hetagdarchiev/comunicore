import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { threadCreateMutation } from '@/shared/api/generated/@tanstack/react-query.gen';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const TITLE_MAX_LENGTH = 120;

export function useCreateThreadForm() {
  const [title, setTitle] = useState('');
  const [localError, setLocalError] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation(threadCreateMutation());

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();
    const markdown = (
      document.getElementById('markdown-editor') as HTMLTextAreaElement | null
    )?.value;

    if (!normalizedTitle) {
      setLocalError('Введите заголовок поста');
      return;
    }

    if (!markdown?.trim()) {
      setLocalError('Добавьте текст поста');
      return;
    }

    setLocalError('');

    try {
      const createdThread = await mutateAsync({
        body: {
          title: normalizedTitle,
          content: markdown,
        },
      });

      await queryClient.invalidateQueries({
        predicate: (query) => {
          const firstKey = query.queryKey[0];
          return (
            typeof firstKey === 'object' &&
            firstKey !== null &&
            '_id' in firstKey &&
            firstKey._id === 'threadsList'
          );
        },
      });

      router.push(`/posts/${createdThread.id}`);
    } catch {
      setLocalError('Не удалось опубликовать пост. Попробуйте снова.');
    }
  };

  return {
    title,
    localError,
    isPending,
    titleMaxLength: TITLE_MAX_LENGTH,
    setTitle,
    handleSubmit,
  };
}
