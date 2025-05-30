import React from 'react';
import { Play, MoreHorizontal, SmilePlus } from 'lucide-react';

interface MessageBubbleProps {
  message: {
    id: string;
    senderName: string;
    senderAvatar: string;
    isCurrentUser: boolean;
    content: string | { type: 'image', url: string } | { type: 'voice', duration: string };
    timestamp: string;
    // Add placeholder for reactions (array of emoji strings or objects)
    reactions?: string[];
    // Add placeholder for quick replies
    quickReplies?: string[];
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isCurrentUser = message.isCurrentUser;

  const renderContent = () => {
    if (typeof message.content === 'string') {
      // Text message
      return <p className="text-sm leading-relaxed">{message.content}</p>;
    } else if (message.content.type === 'image') {
      // Image message
      return <img src={message.content.url} alt="" className="rounded-lg max-w-[250px] h-auto object-cover" />;
    } else if (message.content.type === 'voice') {
      // Voice message
      return (
        <div className="flex items-center gap-2 min-w-[150px] px-3 py-2">
          <Play className="h-5 w-5 flex-shrink-0" /> {/* Play button */}
          <div className="h-4 flex-grow bg-white/30 dark:bg-black/30 rounded-full"></div> {/* Waveform placeholder */}
          <span className="text-xs flex-shrink-0">{message.content.duration}</span>
        </div>
      );
    }
    return null; // Should not happen
  };

  return (
    <div className={`flex items-start gap-3 group relative ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <img src={message.senderAvatar} alt={message.senderName} className="w-8 h-8 rounded-full object-cover border border-border/40 flex-shrink-0 shadow-sm" />
      )}
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {!isCurrentUser && <p className="text-xs font-semibold mb-1 text-muted-foreground/80">{message.senderName}</p>}
        <div
          className={`p-3 rounded-2xl shadow-md max-w-xs transition-all duration-200 ease-in-out ${isCurrentUser
            ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-tr-none'
            : 'bg-gray-200 dark:bg-gray-700 text-foreground rounded-tl-none'
          }`}
        >
          {renderContent()}
        </div>

        {/* Hover timestamp and reactions */}
        <div className={`flex items-center gap-2 mt-1 px-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
          <span>{message.timestamp}</span>
          {/* Reactions Placeholder */}
          <div className="flex items-center gap-1">
            {/* Example Reaction */}
            {message.reactions?.map((reaction, index) => (
              <span key={index} className="cursor-pointer hover:scale-110 transition-transform">{reaction}</span>
            ))}
             <SmilePlus className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

         {/* Quick Reply Options */}
         {message.quickReplies && message.quickReplies.length > 0 && (
            <div className={`flex items-center gap-2 mt-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
               {message.quickReplies.map((reply, index) => (
                  <button key={index} className="px-3 py-1 bg-accent/30 rounded-full text-xs text-muted-foreground hover:bg-accent/50 transition-colors">
                     {reply}
                   </button>
               ))}
            </div>
         )}

      </div>
      {isCurrentUser && (
        <img src={message.senderAvatar} alt={message.senderName} className="w-8 h-8 rounded-full object-cover border border-border/40 flex-shrink-0 shadow-sm" />
      )}
    </div>
  );
};

export default MessageBubble; 