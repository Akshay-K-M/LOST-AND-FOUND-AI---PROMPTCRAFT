
import React from 'react';
import { CircuitryIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-8 mt-16 bg-dark-bg border-t border-cyan-glow/20">
      <div className="container mx-auto px-4 text-center text-cyan-glow/50 font-tech">
        <CircuitryIcon className="h-12 w-12 mx-auto mb-4 opacity-20 text-cyan-glow" />
        <p>&copy; {new Date().getFullYear()} PromptCraft Final Round. A Synergy Techfest Project.</p>
        <p>Connecting people, one found item at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;
