import React, { useRef, useState, useEffect } from 'react';
import { Paperclip, Smile, Send, Image, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import type { MessageType } from '@/integrations/supabase/types';
import data from '@emoji-mart/data/sets/14/native.json';
import Picker from '@emoji-mart/react';
import { useTheme } from '@/hooks/use-theme';

// Type for emoji-mart data
interface EmojiData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

interface ChatInputBarProps {
  onSendMessage: (
    content: string, 
    messageType: MessageType,
    fileUrl?: string,
    fileName?: string
  ) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

function ChatInputBar({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Type a message..." 
}: ChatInputBarProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();

  // Handle clicking outside emoji picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showEmojiPicker &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node) &&
        // Check if the click is not inside the emoji picker
        !(event.target as Element)?.closest('.emoji-mart')
      ) {
        setShowEmojiPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled || isSending) return;

    try {
      setIsSending(true);
      console.log('Sending message:', message); // Debug log
      
      // Always send as text type - emojis will render properly
      await onSendMessage(message.trim(), 'text');
      setMessage(''); // Clear input after successful send
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'file' | 'image') => {
    if (!file || disabled) return;

    try {
      setIsUploading(true);

      // Generate a unique file name
      const fileExt = file.name.split('.').pop() ?? '';
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to appropriate Supabase Storage bucket
      const bucket = type === 'image' ? 'chat-images' : 'chat-files';
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl }, error: urlError } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      if (urlError) throw urlError;

      // Send the message with file info
      await onSendMessage(
        type === 'image' ? `Shared an image: ${file.name}` : `Shared a file: ${file.name}`,
        type,
        publicUrl,
        file.name
      );

    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    } finally {
      setIsUploading(false);
      // Reset file inputs
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file, 'file');
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file, 'image');
    }
  };  const handleEmojiSelect = (emoji: EmojiData) => {
    console.log('Selected emoji data:', emoji); // Debug log
    setMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full right-4 mb-2">
          <div className="rounded-lg shadow-lg">            <div className="emoji-mart">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme={theme === 'dark' ? 'dark' : 'light'}
                set="native"
                autoFocus={true}
                emojiSize={22}
                emojiButtonSize={30}
                maxFrequentRows={0}
                previewPosition="none"
                skinTonePosition="none"
                navPosition="bottom"
                perLine={8}
              />
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageSelect}
          className="hidden"
          accept="image/*"
        />

        {/* Attachment button */}
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className={cn(
            "p-2 rounded-full transition-colors",
            disabled || isUploading
              ? "text-muted-foreground cursor-not-allowed opacity-50"
              : "hover:bg-accent text-muted-foreground hover:text-foreground"
          )}
          title={isUploading ? "Uploading..." : "Attach file"}
        >
          <Paperclip className="h-5 w-5" />
        </button>

        {/* Image upload button */}
        <button 
          type="button"
          onClick={() => imageInputRef.current?.click()}
          disabled={disabled || isUploading}
          className={cn(
            "p-2 rounded-full transition-colors",
            disabled || isUploading
              ? "text-muted-foreground cursor-not-allowed opacity-50"
              : "hover:bg-accent text-muted-foreground hover:text-foreground"
          )}
          title={isUploading ? "Uploading..." : "Upload image"}
        >
          <Image className="h-5 w-5" />
        </button>

        {/* Message input */}
        <div className="flex-1 flex items-center bg-accent/50 rounded-full px-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isUploading ? "Uploading..." : placeholder}
            className="flex-1 bg-transparent py-2 focus:outline-none placeholder:text-muted-foreground text-foreground"
            disabled={disabled || isSending || isUploading}
          />
            {/* Emoji picker button */}
          <button 
            type="button"
            ref={emojiButtonRef}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={cn(
              "p-2 rounded-full transition-colors ml-2",
              disabled || isSending || isUploading
                ? "text-muted-foreground cursor-not-allowed opacity-50"
                : showEmojiPicker
                ? "bg-accent text-foreground"
                : "hover:bg-accent text-muted-foreground hover:text-foreground"
            )}
            title={isSending ? "Sending..." : "Add emoji"}
            disabled={disabled || isSending || isUploading}
          >
            <Smile className="h-5 w-5" />
          </button>

          {/* Voice message button */}
          <button 
            type="button"
            className="p-2 hover:bg-accent rounded-full text-muted-foreground hover:text-foreground transition-colors ml-2"
            title="Record voice message"
            disabled={disabled || isUploading}
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled || isSending || isUploading}
          className={cn(
            "p-3 rounded-full transition-colors",
            message.trim() && !disabled && !isSending && !isUploading
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-accent/50 text-muted-foreground cursor-not-allowed"
          )}
          title={isUploading ? "Uploading..." : "Send message"}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export default ChatInputBar;
