'use client';

import { useState } from 'react';

import { TextAreaDragEvent } from '../types/text-aria-drag-event.type';

export const useDragHandler = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [markdownFile, setMarkdownFile] = useState<string | null>(null);

  const handleDrop = (event: TextAreaDragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const { files } = event.dataTransfer;

    console.log(files);

    // Array.from(files).forEach((image) => {
    //   // Make files parser in markdown
    // });
  };
  const handleDragOver = (event: TextAreaDragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: TextAreaDragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  return {
    handleDrop,
    handleDragLeave,
    handleDragOver,
    isDragging,
    markdownFile,
    setMarkdownFile,
  };
};
