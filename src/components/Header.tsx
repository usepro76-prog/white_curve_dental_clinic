import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, PhoneCall } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Specialists', href: '#specialists' },
    { name: 'Smile Gallery', href: '#smile-gallery' },
    { name: 'Interactive Estimator', href: '#estimator' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50 py-3'
          : 'bg-transparent py-5'
      }`}
      id="app-header"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="outline-none" id="header-logo-link">
          <Logo size="lg" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-gray-600 hover:text-brand-navy tracking-wide transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-sky transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="hidden lg:flex items-center gap-4" id="desktop-ctas">
          <a
            href="tel:+919303271355"
            className="flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-sky transition-colors px-3 py-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-brand-sky" />
            <span>+91 93032 71355</span>
          </a>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-brand-navy hover:bg-brand-sky text-white hover:text-white rounded-full font-bold text-xs tracking-wider transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-1.5 active:scale-95"
            id="header-book-btn"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-brand-navy hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          id="mobile-menu-trigger"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-30 flex flex-col p-6 animate-fade-in border-t border-gray-100" id="mobile-nav-overlay">
          <nav className="flex flex-col gap-5 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-gray-800 hover:text-brand-sky transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-gray-100 pt-6 space-y-4">
            <a
              href="tel:+919303271355"
              className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-brand-navy font-bold rounded-2xl text-sm"
            >
              <PhoneCall className="w-4 h-4 text-brand-sky" />
              <span>+91 93032 71355</span>
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 bg-brand-sky text-white font-extrabold rounded-2xl text-center shadow-lg text-sm flex items-center justify-center gap-2"
              id="mobile-header-book-btn"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
