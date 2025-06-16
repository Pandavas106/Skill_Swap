import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatSidebar from '@/components/Chat/ChatSidebar';
import ChatMessages from '@/components/Chat/ChatMessages';
import SkillProfileSidebar from '@/components/Chat/SkillProfileSidebar';
import { cn } from '@/lib/utils';

interface SelectedUser {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [chatConnectionId, setChatConnectionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  
  // Handle responsive layout
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const isTablet = typeof window !== 'undefined' ? window.innerWidth <= 1024 : false;

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
    setIsProfileOpen(!isTablet);
  }, [isMobile, isTablet]);
  useEffect(() => {
    const initializeChat = async () => {
      try {
        if (user && selectedUser) {
          await loadChatConnection();
        } else {
          setChatConnectionId(null);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
        // Handle the error appropriately
      }
    };

    initializeChat();
  }, [user, selectedUser]);

  const loadChatConnection = async () => {
    if (!user || !selectedUser) return;

    try {
      const { data, error } = await supabase
        .from('chat_connections')
        .select('id')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .or(`user1_id.eq.${selectedUser.id},user2_id.eq.${selectedUser.id}`)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setChatConnectionId(data.id);
      } else {
        const { data: newConnection, error: createError } = await supabase
          .from('chat_connections')
          .insert({
            user1_id: user.id,
            user2_id: selectedUser.id
          })
          .select('id')
          .single();

        if (createError) throw createError;
        setChatConnectionId(newConnection.id);
      }
    } catch (error) {
      console.error('Error managing chat connection:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 flex-none border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
        {selectedUser && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{selectedUser.full_name}</span>
            {isTablet && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar */}
        <aside
          className={cn(
            "w-60 border-r border-border",
            "transition-transform duration-200 ease-in-out lg:translate-x-0",
            isMobile ? "fixed inset-y-14 left-0 z-40 bg-background" : "relative",
            !isSidebarOpen && "-translate-x-full"
          )}
        >
          <ScrollArea className="h-full">
            <div className="p-4">
              <ChatSidebar 
                onSelectUser={(user) => {
                  setSelectedUser(user);
                  if (isMobile) setIsSidebarOpen(false);
                }}
                selectedUserId={selectedUser?.id}
              />
            </div>
          </ScrollArea>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 min-w-0 bg-background">
          <ChatMessages
            selectedUser={selectedUser}
            chatConnectionId={chatConnectionId}
          />
        </main>

        {/* Right Sidebar */}
        <aside
          className={cn(
            "w-80 border-l border-border",
            "transition-transform duration-200 ease-in-out lg:translate-x-0",
            isTablet ? "fixed inset-y-14 right-0 z-40 bg-background" : "relative",
            !isProfileOpen && "translate-x-full"
          )}
        >
          <ScrollArea className="h-full">
            <div className="p-4">
              <SkillProfileSidebar
                selectedUser={selectedUser}
                chatConnectionId={chatConnectionId}
              />
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile/Tablet Backdrop */}
        {(isMobile || isTablet) && (isSidebarOpen || isProfileOpen) && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={() => {
              setIsSidebarOpen(false);
              setIsProfileOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;