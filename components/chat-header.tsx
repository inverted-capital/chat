'use client';

import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon } from './icons';
import { Settings2 as Settings } from 'lucide-react';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

function PureChatHeader({ selectedModelId }: { selectedModelId: string }) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />
      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={() => {
                router.push('/');
                router.refresh();
              }}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}
      <ModelSelector
        selectedModelId={selectedModelId}
        className="order-1 md:order-2"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="order-3 md:order-3 md:px-2 px-2 md:h-fit ml-auto"
            onClick={() => {
              // Implement the logic to show the document editor/stateboard/artifact area
            }}
          >
            <Settings />
            <span className="md:sr-only">Document Editor</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Document Editor</TooltipContent>
      </Tooltip>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
