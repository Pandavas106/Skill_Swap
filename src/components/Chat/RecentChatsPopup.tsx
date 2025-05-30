import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentChatsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Static placeholder data for recent chats
const recentChats = [
  { id: 'rc1', name: 'Alice Smith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', lastMessage: 'Hey, are you available today?', timestamp: '2m ago' },
  { id: 'rc2', name: 'Bob Johnson', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', lastMessage: 'Received the files, thanks!', timestamp: '1h ago' },
  { id: 'rc3', name: 'Charlie Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', lastMessage: 'Let me know if you need help.', timestamp: 'yesterday' },
];

const RecentChatsPopup: React.FC<RecentChatsPopupProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOpenFullChat = () => {
    onClose(); // Close the pop-up
    navigate('/chat'); // Navigate to the full chat page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-background/90 backdrop-blur-xl rounded-2xl shadow-lg w-full max-w-sm p-6 border border-border/40 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent/50 transition-colors text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h3 className="text-xl font-bold text-foreground mb-6">Recent Chats</h3>

        {/* Recent Chats List */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {recentChats.map(chat => (
            <div
              key={chat.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/30 transition-colors cursor-pointer"
              // onClick={() => navigate(`/chat/${chat.id}`)} // Optional: navigate to specific chat
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover border border-border/40 shadow-sm flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm truncate">{chat.name}</p>
                <p className="text-muted-foreground text-xs truncate max-w-[200px]">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{chat.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Open Full Chat Button */}
        <button
          onClick={handleOpenFullChat}
          className="mt-8 w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg"
        >
          Open Full Chat
        </button>
      </div>
    </div>
  );
};

export default RecentChatsPopup; 