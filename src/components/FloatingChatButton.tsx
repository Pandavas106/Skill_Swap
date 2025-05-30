import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentChatsPopup from './Chat/RecentChatsPopup';

export default function FloatingChatButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  
  return (
    <>
      {/* Floating Action Button - Added glow and responsiveness */}
      <button
        onClick={togglePopup}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-in-out flex items-center justify-center z-40 
                   shadow-lg hover:shadow-xl 
                   ring-2 ring-primary/50 hover:ring-primary/80 ring-opacity-50 hover:ring-opacity-80 
                   focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-opacity-80"
      >
        {/* Chat Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      <RecentChatsPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}