import React from 'react';
import { Upload, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center fixed top-0 w-full z-50">
      <h1 className="text-xl font-bold">I MOSLAM</h1>
      <div className="flex gap-4">
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <Upload className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}