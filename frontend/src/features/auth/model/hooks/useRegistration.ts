'use client';

import { useRouter } from 'next/navigation';

import { userCreateMutation } from '@/shared/api/generated/@tanstack/react-query.gen';
import { AppRouter } from '@/shared/config/app-router';
import { getErrorMessage } from '@/shared/lib/helpers/getErrorMessage';
import { useMutation } from '@tanstack/react-query';

export const useRegistration = () => {
  const router = useRouter();

  const registrationMutate = useMutation({
    ...userCreateMutation(),
    onSuccess: (_, variables) => {
      const email = variables.body.email;
      const searchParams = new URLSearchParams({ email });

      router.push(`${AppRouter.verification}?${searchParams.toString()}`);
    },
    onError: (error) => getErrorMessage(error),
  });

  return registrationMutate;
};
