import React from 'react';
import { User, Page } from '../types';
import { LogoIcon } from './icons';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  setPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, setPage }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-dark-bg/80 backdrop-blur-sm border-b border-cyan-glow/30 z-50 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setPage(Page.Browse)}
          >
            <LogoIcon className="h-8 w-8 text-cyan-glow" />
            <span className="font-orbitron text-xl sm:text-2xl font-bold text-cyan-glow tracking-widest uppercase" style={{ textShadow: '0 0 8px #00ffff' }}>
              PromptCraft
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPage(Page.PostItem)}
              className="hidden sm:inline-block px-4 py-2 font-tech text-base border-2 border-cyan-glow text-cyan-glow rounded-md transition-all duration-300 hover:bg-cyan-glow hover:text-dark-bg hover:shadow-cyan-glow-sm"
            >
              Report Item
            </button>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-glow/30 border-2 border-cyan-glow/50 font-orbitron text-cyan-glow text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button onClick={onLogout} className="px-4 py-2 font-tech text-base bg-cyan-glow/20 border border-cyan-glow text-cyan-glow rounded-md transition-all duration-300 hover:bg-cyan-glow/40 hover:shadow-cyan-glow-sm">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={onLogin} className="px-4 py-2 font-tech text-base bg-cyan-glow text-dark-bg border-2 border-cyan-glow rounded-md font-bold transition-all duration-300 hover:shadow-cyan-glow-sm">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
