import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ChatUser {
  id: string;
  full_name: string;
  avatar_url: string | null;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
  active?: boolean;
}

interface ChatSidebarProps {
  onSelectUser: (user: ChatUser) => void;
  selectedUserId?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelectUser, selectedUserId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchChatConnections = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch chat connections
        const { data: connections, error: connectionsError } = await supabase
          .from('chat_connections')
          .select('*')
          .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);

        if (connectionsError) {
          console.error('Error fetching connections:', connectionsError);
          throw connectionsError;
        }

        // Get connected user IDs
        const connectedUserIds = connections?.map(conn => 
          conn.user1_id === user.id ? conn.user2_id : conn.user1_id
        ) || [];

        if (connectedUserIds.length === 0) {
          setUsers([]);
          return;
        }

        // Fetch user profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', connectedUserIds);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          throw profilesError;
        }

        // Fetch last messages for each connection
        const { data: messages, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${user.id},receiver_id.in.(${connectedUserIds.join(',')})),and(sender_id.in.(${connectedUserIds.join(',')}),receiver_id.eq.${user.id})`)
          .order('timestamp', { ascending: false });

        if (messagesError) {
          console.error('Error fetching messages:', messagesError);
          throw messagesError;
        }

        // Combine data
        const chatUsers = profiles?.map(profile => {
          const lastMessage = messages?.find(
            m => (m.sender_id === profile.id || m.receiver_id === profile.id)
          );

          return {
            id: profile.id,
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
            lastMessage: lastMessage?.content,
            timestamp: lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            }) : '',
            unread: 0, // You can implement unread count logic if needed
            active: false // You can implement online status if needed
          };
        }) || [];

        setUsers(chatUsers);
        setRetryCount(0); // Reset retry count on successful fetch
      } catch (error) {
        console.error('Error fetching chat connections:', error);
        setError('Failed to load chats. Please try again.');
        toast.error('Failed to load chats');
        
        // Implement retry logic
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1);
          setTimeout(fetchChatConnections, 2000 * (retryCount + 1)); // Exponential backoff
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChatConnections();

    // Set up real-time subscription for new messages and connections
    const channel = supabase
      .channel('chat_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_connections',
          filter: `or(user1_id.eq.${user.id},user2_id.eq.${user.id})`,
        },
        () => {
          fetchChatConnections();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(sender_id.eq.${user.id},receiver_id.eq.${user.id})`,
        },
        () => {
          fetchChatConnections();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, retryCount]);

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserClick = (user: ChatUser) => {
    onSelectUser(user);
  };

  const handleRetry = () => {
    setRetryCount(0);
    setError(null);
  };

  return (
    <div className="p-4 flex flex-col h-full bg-white dark:bg-background border-r border-border/40">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Messages</h2>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search or start a new chat..."
          className="w-full px-10 py-2.5 rounded-lg bg-accent/20 dark:bg-accent/30 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-destructive mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            {searchQuery ? 'No users found' : 'No recent chats'}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`w-full flex items-center p-3 rounded-xl transition-colors cursor-pointer ${
                selectedUserId === user.id 
                  ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30' 
                  : 'hover:bg-accent/30'
              }`}
            >
              <img 
                src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}`} 
                alt={user.full_name} 
                className="w-12 h-12 rounded-full mr-4 object-cover border border-border/40 shadow-sm" 
              />
              <div className="flex-grow text-left">
                <p className="font-semibold text-base text-foreground mb-0.5">{user.full_name}</p>
                <p className="text-sm text-muted-foreground truncate max-w-[180px]">{user.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-muted-foreground mb-1">{user.timestamp}</div>
                {user.unread > 0 && (
                  <div className="px-2 py-0.5 text-xs rounded-full bg-purple-500 text-white font-bold min-w-[20px] text-center">
                    {user.unread}
                  </div>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar; 