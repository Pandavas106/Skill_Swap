import React, { useRef, useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';
import { Phone, Video, Smile, Send, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ChatMessagesProps {
  selectedUser: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  } | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ selectedUser }) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, loading } = useMessages(user?.id || '', selectedUser?.id || '');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedUser) return;

    try {
      setIsSending(true);
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: user.id,
            receiver_id: selectedUser.id,
            content: newMessage.trim(),
            timestamp: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center text-muted-foreground">
          <p className="text-lg">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img 
            src={selectedUser.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.full_name)}`}
            alt={selectedUser.full_name}
            className="w-10 h-10 rounded-full object-cover border border-border/40"
          />
          <div>
            <h2 className="text-xl font-bold">{selectedUser.full_name}</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-accent/30 rounded-full transition-colors">
            <Phone className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-accent/30 rounded-full transition-colors">
            <Video className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={message.sender_id === user?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border/40 bg-background/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 hover:bg-accent/30 rounded-full transition-colors"
          >
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-accent/20 dark:bg-accent/30 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            disabled={isSending}
          />
          <button
            type="button"
            className="p-2 hover:bg-accent/30 rounded-full transition-colors"
          >
            <Smile className="h-5 w-5 text-muted-foreground" />
          </button>
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className={cn(
              "p-2 rounded-full transition-colors",
              newMessage.trim() && !isSending
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-accent/30 text-muted-foreground cursor-not-allowed"
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatMessages; 