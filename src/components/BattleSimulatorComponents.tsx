import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, className = '', ...props }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-semibold text-white transition-colors ${
      disabled
        ? 'bg-indigo-400 cursor-not-allowed'
        : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-indigo-800 border-2 border-indigo-600 rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
);

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, max, className = '' }) => (
  <div className={`w-full bg-indigo-900 rounded-full h-2.5 ${className}`}>
    <div
      className="bg-indigo-500 h-2.5 rounded-full"
      style={{ width: `${(value / max) * 100}%` }}
    ></div>
  </div>
);