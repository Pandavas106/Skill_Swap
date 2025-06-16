import { Outlet } from 'react-router-dom';
import FloatingChatButton from '@/components/FloatingChatButton';

export default function RootLayout() {
  return (
    <div className="relative min-h-screen">
      <Outlet />
      <FloatingChatButton />
    </div>
  );
}
