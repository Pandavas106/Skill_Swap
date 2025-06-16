import React from 'react';
import { FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/integrations/supabase/types';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const renderMessageContent = () => {
    switch (message.message_type) {
      case 'image':
        return (
          <div className="flex flex-col gap-1">
            <img
              src={message.file_url}
              alt={message.file_name || 'Shared image'}
              className="rounded-lg max-w-[300px] max-h-[300px] object-contain bg-accent"
              loading="lazy"
            />
            <p className="text-xs opacity-70 mt-1">{message.content}</p>
          </div>
        );
      case 'file':
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <FileIcon className="h-4 w-4" />
              <a
                href={message.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate max-w-[300px]"
                download={message.file_name}
              >
                {message.file_name || 'Download file'}
              </a>
            </div>
            <p className="text-xs opacity-70">{message.content}</p>
          </div>
        );      default:
        return (
          <p className="whitespace-pre-wrap break-words" style={{ 
            fontFamily: "'Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', system-ui, -apple-system, sans-serif",
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            {message.content}
          </p>
        );
    }
  };

  return (
    <div
      className={cn(
        'flex gap-2',
        isOwnMessage ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[70%] rounded-lg px-4 py-2',
          message.message_type === 'image' ? 'p-2' : 'px-4 py-2',
          isOwnMessage
            ? 'bg-primary text-primary-foreground'
            : 'bg-accent'
        )}
      >
        {renderMessageContent()}
      </div>
    </div>
  );
};

export default MessageBubble;