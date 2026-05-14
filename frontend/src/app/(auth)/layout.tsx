'use client';

import React from 'react';

export default function EnhancedAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#E0E7FF] p-4 before:absolute before:inset-0 before:bg-[radial-gradient(#C7D2FE_2px,transparent_2px)] before:[background-size:32px_32px] before:opacity-5 after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.01)_100%)]'>
      <div className='relative z-10 w-full max-w-150'>
        <div className='flex flex-col gap-y-6 rounded-3xl bg-white p-10 shadow-[0_32px_64px_-12px_rgba(31,41,55,0.14),0_16px_32px_-6px_rgba(31,41,55,0.1)] shadow-indigo-900/10'>
          {children}
        </div>
      </div>
    </div>
  );
}
