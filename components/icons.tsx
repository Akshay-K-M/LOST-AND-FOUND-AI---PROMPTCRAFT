
import React from 'react';

export const CircuitryIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 100V80M50 80H30V60M50 80H70V60M30 60H10M30 60V40M70 60H90M70 60V40M10 60V20M90 60V20M10 20H40V0M10 20H-10M90 20H60V0M90 20H110M40 40H60" stroke="currentColor" strokeWidth="4"/>
    <circle cx="50" cy="80" r="4" fill="currentColor"/>
    <circle cx="30" cy="60" r="4" fill="currentColor"/>
    <circle cx="70" cy="60" r="4" fill="currentColor"/>
    <circle cx="10" cy="20" r="4" fill="currentColor"/>
    <circle cx="90" cy="20" r="4" fill="currentColor"/>
    <circle cx="40" cy="40" r="4" fill="currentColor"/>
    <circle cx="60" cy="40" r="4" fill="currentColor"/>
  </svg>
);

export const LogoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12h.01" />
    <path d="M12 10v.01" />
    <path d="M14 12h.01" />
    <path d="M10 14v.01" />
    <path d="M12 14h.01" />
    <path d="M12 16v.01" />
    <path d="M14 16h.01" />
    <path d="M4 12a8 8 0 0 1 8-8" />
    <path d="M4 12a8 8 0 0 0 8 8" />
    <path d="M20 12a8 8 0 0 0-8-8" />
    <path d="M20 12a8 8 0 0 1-8 8" />
  </svg>
);

export const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const WandIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082a9.75 9.75 0 0 1 8.25 8.25c.032.249.059.499.082.75m0 0H3.75m16.5 0c0-1.332-.272-2.613-.774-3.8-1.55-3.686-5.022-6.3-8.976-6.3S3.824 7.014 2.274 10.7c-.502 1.187-.774 2.468-.774 3.8m16.5 0h.008v.008h-.008v-.008Zm-3.375 0h.008v.008h-.008v-.008Zm-3.375 0h.008v.008h-.008v-.008Z" />
    </svg>
);

export const TrashIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09c-1.18 0-2.09.954-2.09 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const ImageIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);
