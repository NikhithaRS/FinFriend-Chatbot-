<<<<<<< HEAD
import { ReactNode } from 'react';
=======
import React, { ReactNode } from 'react';
>>>>>>> 4e3a27c400f15b453e8f827c4f84a02e3a76f6e3

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16"> {/* Added padding for fixed navigation */}
        <div className="max-w-7xl mx-auto bg-white min-h-[calc(100vh-4rem)] shadow-sm">
          {children}
        </div>
=======
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8 flex items-center justify-center font-['Inter']">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {children}
>>>>>>> 4e3a27c400f15b453e8f827c4f84a02e3a76f6e3
      </div>
    </div>
  );
}