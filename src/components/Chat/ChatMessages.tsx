import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Phone, Video } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/useAuth';
import type { MessageType } from '@/integrations/supabase/types';
import ChatInputBar from './ChatInputBar';

interface ChatMessagesProps {
  selectedUser: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  } | null;
  chatConnectionId: string | null;
}

export default function ChatMessages({ selectedUser }: Readonly<ChatMessagesProps>) {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, loading, sendMessage } = useMessages(user?.id || '', selectedUser?.id || '');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only scroll if there are messages to scroll to, and after the messages have settled
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]); // Dependency on messages array

  const handleSendMessage = async (
    content: string,
    messageType: MessageType = 'text',
    fileUrl?: string,
    fileName?: string
  ) => {
    if (!user || !selectedUser) {
      console.warn("Attempted to send message without a user or selected user.");
      return;
    }

    try {
      await sendMessage(content, messageType, fileUrl, fileName);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col">
      {/* Chat Header */}
      {selectedUser ? (
        <div className="flex items-center justify-between p-4 border-b border-border bg-background/95">
          <div className="flex items-center gap-3">
            <img
              src={selectedUser.avatar_url || '/placeholder.svg'}
              alt={selectedUser.full_name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{selectedUser.full_name}</h3>
              <p className="text-xs text-muted-foreground">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-accent rounded-full">
              <Phone className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-accent rounded-full">
              <Video className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 border-b border-border bg-background/95">
          <p className="text-center text-muted-foreground">Select a user to start chatting</p>
        </div>
      )}

      {/* Messages Area */}
      {(() => {
        let messagesContent;
        if (loading) {
          messagesContent = (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          );
        } else if (messages.length > 0) {
          messagesContent = (
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwnMessage={message.sender_id === user?.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          );
        } else {
          messagesContent = (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground">Start a conversation!</p>
            </div>
          );
        }
        return <div className="flex-1 overflow-y-auto p-4">{messagesContent}</div>;
      })()}

      {/* Chat Input */}
      <ChatInputBar
        onSendMessage={handleSendMessage}
        disabled={!selectedUser}
      />
    </div>
  );
}