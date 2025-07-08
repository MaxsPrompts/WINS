import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <Link href="/" className="text-xl font-bold">
            WINS AI
          </Link>
          <div>
            <Link href="/" className="px-3 hover:text-gray-300">
              Home
            </Link>
            <Link href="/dashboard" className="px-3 hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/auth/login" className="px-3 hover:text-gray-300">
              Login
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; {new Date().getFullYear()} WINS AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
