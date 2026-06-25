import React from 'react';
import logoImg from '../assets/images/white-curve-logo.png';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const iconSizeClass = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
    xl: 'h-18 w-18',
  }[size];

  return (
    <div className="flex items-center select-none" id="brand-logo">
      {/* High-fidelity actual Logo Image with background removed */}
      <img
        src={logoImg}
        alt="The WHITE Curve Logo"
        referrerPolicy="no-referrer"
        className={`${iconSizeClass} ${className} shrink-0 object-contain`}
      />
    </div>
  );
}
