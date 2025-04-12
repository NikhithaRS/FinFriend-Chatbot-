import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16"> {/* Added padding for fixed navigation */}
        <div className="max-w-7xl mx-auto bg-white min-h-[calc(100vh-4rem)] shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}