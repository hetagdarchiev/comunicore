'use client';

import { useCallback, useEffect, useState } from 'react';

const DEFAULT_COUNTDOWN = 10;

export const useTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isActive, secondsLeft]);

  const timerStart = useCallback((seconds?: number) => {
    setSecondsLeft(seconds ?? DEFAULT_COUNTDOWN);
    setIsActive(true);
  }, []);

  const timerStop = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    secondsLeft,
    isActive,
    timerStart,
    timerStop,
  };
};
