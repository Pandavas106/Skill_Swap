import React, { useState } from 'react';
// Import the components
import ChatSidebar from '@/components/Chat/ChatSidebar';
import ChatMessages from '@/components/Chat/ChatMessages';
import SkillProfileSidebar from '@/components/Chat/SkillProfileSidebar';

interface SelectedUser {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  return (
    // Main container: Use flex column to stack Navbar above content, then flex row for content
    // Use h-screen and pt-[70px] to push content below fixed Navbar and take full viewport height.
    // The actual Navbar is fixed, so its height needs to be accounted for by padding/margin on the main content.
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-foreground">
      {/* Placeholder for the fixed Navbar space - REMOVED, handled by padding on content below */}
      {/* <div className="h-[70px] w-full flex-shrink-0"></div> */}

      {/* Content area below Navbar: flex row to arrange sidebars and chat */}
      {/* Use flex-1 to make this container fill the remaining height */}
      {/* Add top padding to push content below fixed navbar */}
      {/* Removed overflow-hidden and h-full from this container and its children for now */}
      <div className="flex flex-1 pt-[70px]">
        {/* Left Sidebar - Adjusted width for better visibility */}
        <div className="w-1/4 min-w-[250px] max-w-[350px] bg-white dark:bg-background border-r border-border/40 overflow-y-auto flex flex-col">
          <ChatSidebar 
            onSelectUser={setSelectedUser}
            selectedUserId={selectedUser?.id}
          />
        </div>

        {/* Center Chat Area - Ensured it takes remaining space */}
        <div className="flex-1 flex flex-col bg-white dark:bg-background">
          <ChatMessages selectedUser={selectedUser} />
        </div>

        {/* Right Sidebar - Adjusted width for better visibility and ensured scrolling */}
        <div className="w-1/5 min-w-[200px] max-w-[300px] bg-white dark:bg-background border-l border-border/40 overflow-y-auto flex flex-col">
          <SkillProfileSidebar selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default Chat; 