import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRecentChats } from '@/hooks/useRecentChats';

interface RecentChatsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecentChatsPopup: React.FC<RecentChatsPopupProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { recentChats, loading } = useRecentChats();

  if (!isOpen) return null;

  const handleOpenFullChat = () => {
    onClose();
    navigate('/chat');
  };

  return (
    <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex justify-center items-center animate-in fade-in">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-sm mx-4">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-xl font-bold">Recent Chats</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-2">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : recentChats.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No recent chats</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentChats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => {
                    navigate('/chat');
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-accent/50 transition-colors text-left"
                >
                  <div className="relative">
                    <img
                      src={chat.user.avatar_url || '/placeholder.svg'}
                      alt={chat.user.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">
                      {chat.user.full_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {chat.status}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleOpenFullChat}
            className="w-full bg-primary text-primary-foreground p-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Open Full Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentChatsPopup;