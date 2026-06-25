import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const businessHours = [
    { days: 'Monday – Friday', hours: '08:00 AM – 07:00 PM' },
    { days: 'Saturday', hours: '09:00 AM – 04:00 PM' },
    { days: 'Sunday', hours: 'Closed (Emergency Only)' },
  ];

  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10" id="footer">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo className="brightness-0 invert" size="lg" />
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              The WHITE Curve represents the vanguard of modern boutique dental engineering. We combine state-of-the-art 3D imaging, digital smile planning, and master craftsmanship to redefine aesthetic dentistry.
            </p>
            <div className="flex gap-4">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-brand-sky hover:bg-brand-sky/90 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Slot</span>
              </button>
            </div>
          </div>

          {/* Col 2: Business Hours (3 columns) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-sky">
              Opening Hours
            </h4>
            <div className="space-y-3" id="footer-hours">
              {businessHours.map((bh, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                  <span className="text-gray-300 font-medium">{bh.days}</span>
                  <span className="font-semibold text-white flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-sky shrink-0" />
                    {bh.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Contact (3 columns) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-sky">
              Direct Contact
            </h4>
            <div className="space-y-4 text-xs" id="footer-contact">
              <a
                href="tel:+1555234567"
                className="flex items-start gap-3 hover:text-brand-sky transition-colors text-gray-300 group"
              >
                <Phone className="w-4 h-4 text-brand-sky mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold block text-white">Call Reception</span>
                  <span>+1 (555) 234-567</span>
                </div>
              </a>

              <a
                href="mailto:concierge@thewhitecurve.com"
                className="flex items-start gap-3 hover:text-brand-sky transition-colors text-gray-300 group"
              >
                <Mail className="w-4 h-4 text-brand-sky mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold block text-white">Email Concierge</span>
                  <span>concierge@thewhitecurve.com</span>
                </div>
              </a>

              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-brand-sky mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-white">Boutique Suite</span>
                  <span>742 Premium Plaza, Suite 40B, New York, NY 10019</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Directory (2 columns) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-sky">
              Directory
            </h4>
            <ul className="space-y-2 text-xs text-gray-300" id="footer-directory">
              <li>
                <a href="#services" className="hover:text-brand-sky transition-colors font-medium">Services</a>
              </li>
              <li>
                <a href="#specialists" className="hover:text-brand-sky transition-colors font-medium">Specialists</a>
              </li>
              <li>
                <a href="#smile-gallery" className="hover:text-brand-sky transition-colors font-medium">Smile Gallery</a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-brand-sky transition-colors font-medium">Estimator</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-brand-sky transition-colors font-medium">Patient Stories</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom (Legal and Credits) */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 gap-4">
          <div className="text-center md:text-left">
            <p>© {currentYear} The WHITE Curve Boutique Dentistry. All rights reserved.</p>
            <p className="mt-1">Licensing reference: NYS-DDS-87452-AC. Accredited by the American Academy of Cosmetic Dentistry (AACD).</p>
          </div>
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-brand-sky transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-brand-sky transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-brand-sky transition-colors">HIPAA Disclaimers</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
