import React, { ReactNode } from 'react';
import GovNavbar from '@/components/GovNavbar';
import GovFooter from '@/components/GovFooter';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovNavbar />
      <main className="flex-1">{children}</main>
      <GovFooter />
    </div>
  );
};

export default MainLayout;
