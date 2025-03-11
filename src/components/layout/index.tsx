import { ReactNode, useState } from 'react';
import Sidebar from './sidebar';
import Navbar from './navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-background flex flex-col">
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full lg:w-[86%] lg:ml-auto">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 bg-secondary/10">
          {children}
        </main>
      </div>
    </div>
  );
}