import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Phone, Video, Smile, Send, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatMessages = () => {
  // Placeholder data for messages with varied content and features
  const messages = [
    { id: '1', senderName: 'Osman Campos', senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', isCurrentUser: false, content: 'Hey, are you free for a session this week?', timestamp: '10:30 AM', reactions: ['👍', '❤️'] },
    { id: '2', senderName: 'You', senderAvatar: 'https://randomuser.me/api/portraits/men/41.jpg', isCurrentUser: true, content: 'Hey! Yeah, I have some availability.', timestamp: '10:32 AM', quickReplies: ['What times?', 'Send me your availability'] },
    { id: '3', senderName: 'Osman Campos', senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', isCurrentUser: false, content: 'Great! How about Tuesday at 4 PM?', timestamp: '10:35 AM' },
    { id: '4', senderName: 'You', senderAvatar: 'https://randomuser.me/api/portraits/men/41.jpg', isCurrentUser: true, content: { type: 'voice', duration: '0:25' } as { type: 'voice', duration: string }, timestamp: '10:38 AM' },
     { id: '5', senderName: 'Osman Campos', senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', isCurrentUser: false, content: 'Okay, I listened to the voice note. Sounds good. \nHere is a resource I mentioned:\n', timestamp: '10:40 AM', reactions: ['🙌'] },
      { id: '6', senderName: 'Osman Campos', senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', isCurrentUser: false, content: { type: 'image', url: 'https://via.placeholder.com/400x250' } as { type: 'image', url: string }, timestamp: '10:41 AM' },
       { id: '7', senderName: 'You', senderAvatar: 'https://randomuser.me/api/portraits/men/41.jpg', isCurrentUser: true, content: 'Thanks! I will check it out.', timestamp: '10:45 AM' },
        { id: '8', senderName: 'Osman Campos', senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', isCurrentUser: false, content: 'Let me know if you have any questions.', timestamp: '10:48 AM', quickReplies: ['Will do!', 'Looks good'] },
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on initial load and when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Placeholder state for typing indicator
   const [isTyping, setIsTyping] = React.useState(true); // Set to true initially for demo


  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold">Design Chat</h2>
          <p className="text-sm text-muted-foreground">23 members, 10 online</p>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          <Video className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
         {/* Typing Indicator Placeholder */}
         {isTyping && (
            <div className="flex items-center gap-2">
               <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="typing user" className="w-8 h-8 rounded-full object-cover border border-border/40 flex-shrink-0 shadow-sm" />
               <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-3 text-sm">
                  <div className="flex space-x-1">
                     <span className="sr-only">Typing...</span>
                     <span className="dot dot-1 bg-muted-foreground w-1.5 h-1.5 rounded-full animate-blink"></span>
                     <span className="dot dot-2 bg-muted-foreground w-1.5 h-1.5 rounded-full animate-blink animation-delay-200"></span>
                     <span className="dot dot-3 bg-muted-foreground w-1.5 h-1.5 rounded-full animate-blink animation-delay-400"></span>
                  </div>
               </div>
            </div>
         )}
        <div ref={messagesEndRef} /> {/* Scroll to bottom ref */}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-border/40 bg-background/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
           {/* Attachment Icon */}
           <button className="p-2 rounded-full hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">
             <Paperclip className="h-5 w-5" />
           </button>
          <input
            type="text"
            placeholder="Your message..."
            className="flex-grow px-4 py-2 rounded-full bg-accent/20 dark:bg-accent/30 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-foreground text-sm placeholder:text-muted-foreground"
          />
          {/* Emoji Icon */}
          <button className="p-2 rounded-full hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">
            <Smile className="h-5 w-5" />
          </button>
          {/* Send Icon */}
          <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages; 