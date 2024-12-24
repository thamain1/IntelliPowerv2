import React from 'react';
import logo from '../../assets/logo.svg';

export const Header: React.FC = () => (
  <header className="bg-white shadow-sm">
    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
      <img 
        src={logo}
        alt="IntelliPower Logo" 
        className="w-12 h-12"
      />
      <h1 className="text-xl font-semibold text-gray-900">IntelliPower</h1>
      <span className="text-sm text-gray-500">by 4wardmotion</span>
    </div>
  </header>
);