import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DocumentSkeleton } from './document-skeleton';
import { Editor } from './editor';
import { DiffView } from './diffview';
import { Toolbar } from './toolbar';
import type { UIBlock } from './block';
import type { Suggestion } from '@/lib/db/schema';
import type { Message, CreateMessage, ChatRequestOptions } from 'ai';

interface BlockContentProps {
  isDocumentsFetching: boolean;
  block: UIBlock;
  mode: 'edit' | 'diff';
  isCurrentVersion: boolean;
  getDocumentContentById: (index: number) => string;
  currentVersionIndex: number;
  saveContent: (content: string, debounce: boolean) => void;
  suggestions: Array<Suggestion> | undefined;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  isLoading: boolean;
  stop: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>;
}

export function BlockContent({
  isDocumentsFetching,
  block,
  mode,
  isCurrentVersion,
  getDocumentContentById,
  currentVersionIndex,
  saveContent,
  suggestions,
  append,
  isLoading,
  stop,
  setMessages,
}: BlockContentProps) {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  return (
    <>
      {isDocumentsFetching && !block.content ? (
        <DocumentSkeleton />
      ) : mode === 'edit' ? (
        <Editor
          content={
            isCurrentVersion
              ? block.content
              : getDocumentContentById(currentVersionIndex)
          }
          isCurrentVersion={isCurrentVersion}
          currentVersionIndex={currentVersionIndex}
          status={block.status}
          saveContent={saveContent}
          suggestions={isCurrentVersion ? (suggestions ?? []) : []}
        />
      ) : (
        <DiffView
          oldContent={getDocumentContentById(currentVersionIndex - 1)}
          newContent={getDocumentContentById(currentVersionIndex)}
        />
      )}

      {suggestions ? <div className="md:hidden h-dvh w-12 shrink-0" /> : null}

      <AnimatePresence>
        {isCurrentVersion && (
          <Toolbar
            isToolbarVisible={isToolbarVisible}
            setIsToolbarVisible={setIsToolbarVisible}
            append={append}
            isLoading={isLoading}
            stop={stop}
            setMessages={setMessages}
          />
        )}
      </AnimatePresence>
    </>
  );
}
