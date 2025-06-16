import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function FloatingChatButton() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If there's no user, don't show the button
  if (!user) return null;

  return (
    <button
      onClick={() => navigate('/chat')}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 rounded-full 
                 bg-primary text-primary-foreground shadow-lg hover:shadow-xl 
                 flex items-center justify-center z-40 transition-transform hover:scale-105"
      aria-label="Open Chat"
    >
      <MessageSquare className="h-6 w-6" />
    </button>
  );
}