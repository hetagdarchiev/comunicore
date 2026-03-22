'use client';

import { DragEvent, useState } from 'react';

export const useDragHandler = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [markdownLink, setMarkdownLink] = useState<string | null>(null);

  const handleDrop = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;

    const isFiles = event.dataTransfer.types.every((file) => file === 'Files');
    console.log(isFiles);
    if (!isFiles) return;
    setIsDragging(false);
    console.log(files);

    // Array.from(files).forEach((image) => {
    //   // Make files parser in markdown
    // });
  };
  const handleDragOver = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  return {
    handleDrop,
    handleDragLeave,
    handleDragOver,
    isDragging,
    markdownLink,
    setMarkdownLink,
  };
};
