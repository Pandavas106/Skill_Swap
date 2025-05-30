import React from 'react';
import { Search } from 'lucide-react';

const ChatSidebar = () => {
  // Placeholder data for imaginary users
  const users = [
    { id: '1', name: 'Osman Campos', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', lastMessage: 'You: Hey! We are ready to in...', timestamp: '20m', unread: 0, active: true },
    { id: '2', name: 'Jayden Church', avatar: 'https://randomuser.me/api/portraits/men/33.jpg', lastMessage: 'I prepared some varia...', timestamp: '1h', unread: 0, active: false },
    { id: '3', name: 'Jacob Mcleod', avatar: 'https://randomuser.me/api/portraits/men/34.jpg', lastMessage: 'And send me the proto...', timestamp: '10m', unread: 3, active: false },
    { id: '4', name: 'Jasmin Lowery', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', lastMessage: "You: Ok! Let's discuss it on th...", timestamp: '20m', unread: 0, active: false },
    { id: '5', name: 'Zaid Myers', avatar: 'https://randomuser.me/api/portraits/men/35.jpg', lastMessage: 'You: Hey! We are ready to in...', timestamp: '45m', unread: 0, active: false },
    { id: '6', name: 'Anthony Cordanes', avatar: 'https://randomuser.me/api/portraits/men/36.jpg', lastMessage: 'What do you think?', timestamp: '1d', unread: 0, active: false },
    { id: '7', name: 'Conner Garcia', avatar: 'https://randomuser.me/api/portraits/men/37.jpg', lastMessage: 'You: I think it would be perfe...', timestamp: '2d', unread: 0, active: false },
    { id: '8', name: 'Vanessa Cox', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', lastMessage: 'Voice message', timestamp: '2d', unread: 0, active: false },
  ];

  return (
    <div className="p-4 flex flex-col h-full bg-white dark:bg-background border-r border-border/40">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Messages</h2>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Search or start a new chat..."
          className="w-full px-10 py-2.5 rounded-lg bg-accent/20 dark:bg-accent/30 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-3 rounded-xl transition-colors cursor-pointer ${user.active ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30' : 'hover:bg-accent/30'}`}
          >
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-4 object-cover border border-border/40 shadow-sm" />
            <div className="flex-grow">
              <p className="font-semibold text-base text-foreground mb-0.5">{user.name}</p>
              <p className="text-sm text-muted-foreground truncate max-w-[180px]">{user.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-xs text-muted-foreground mb-1">{user.timestamp}</div>
              {user.unread > 0 && (
                <div className="px-2 py-0.5 text-xs rounded-full bg-purple-500 text-white font-bold min-w-[20px] text-center">{user.unread}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar; 