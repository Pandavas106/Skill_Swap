import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Message, MessageType } from '@/integrations/supabase/types';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useMessages(senderId: string, receiverId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial messages
  const fetchMessages = useCallback(async () => {
    if (!senderId || !receiverId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [senderId, receiverId]);

  // Set up real-time subscription
  useEffect(() => {
    if (!senderId || !receiverId) return;

    fetchMessages();

    // Create a unique channel name for this chat
    const channelName = `chat_${[senderId, receiverId].sort().join('_')}`;
    
    const channel = supabase.channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId}))`,
        },
        (payload: { new: Message }) => {
          const newMessage = payload.new;
          setMessages(currentMessages => {
            // Check if message already exists
            if (currentMessages.some(msg => msg.id === newMessage.id)) {
              return currentMessages;
            }
            return [...currentMessages, newMessage];
          });
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      channel.unsubscribe();
    };
  }, [senderId, receiverId, fetchMessages]);
  // Send message function
  const sendMessage = async (
    content: string,
    messageType: MessageType = 'text',
    fileUrl?: string,
    fileName?: string
  ): Promise<void> => {
    if (!senderId || !receiverId || !content.trim()) {
      throw new Error('Cannot send message: Invalid input');
    }

    try {
      console.log('Sending message with content:', content);
      console.log('Message type:', messageType);
      
      const timestamp = new Date().toISOString();      const messageData = {
        sender_id: senderId,
        receiver_id: receiverId,
        content: content.trim(),
        message_type: messageType,
        created_at: timestamp,
        timestamp: timestamp, // Add timestamp field
        ...(messageType !== 'text' && {
          file_url: fileUrl,
          file_name: fileName,
        }),
      };
      
      console.log('Message data being sent:', messageData);

      const { error } = await supabase
        .from('messages')
        .insert([messageData]);

      if (error) throw error;

      // Optimistically add the message to the state
      const newMessage: Message = {
        id: `temp_${Date.now()}`, // Will be replaced by real ID from subscription
        ...messageData
      };

      setMessages(current => [...current, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    refreshMessages: fetchMessages
  };
}