'use client';

import { KeyboardEvent, useCallback, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { MdEditorKeyBoard } from '../lib/mdEditor';
import { MarkDownSchema } from '../schema/markdown.schema';
import { toolsGroup } from '../tools';
import { MdTools, ToolsName } from '../types/mdTools.types';

export const useEditorKeyBoard = (form: UseFormReturn<MarkDownSchema>) => {
  const { getValues, setValue } = form;

  const toolsMap = useMemo(() => {
    const map = new Map<ToolsName, MdTools>();
    toolsGroup.flat().forEach((t) => {
      if (map.has(t.title)) {
        console.warn(`Duplicate tool: ${t.title}`);
      }
      return map.set(t.title, t);
    });
    return map;
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) =>
      MdEditorKeyBoard.handleKeyDown(
        event,
        {
          textarea: event.currentTarget,
          getValues,
          setValue,
        },
        toolsMap,
      ),
    [getValues, setValue, toolsMap],
  );

  return {
    onKeyDown,
  };
};
