import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, Clock, Calendar, ExternalLink, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.004 0C5.38 0 0 5.38 0 12c0 2.112.551 4.165 1.597 5.973L.053 24l6.192-1.624c1.724.94 3.666 1.436 5.751 1.438 6.621 0 12.001-5.38 12.004-12 .002-3.202-1.242-6.213-3.504-8.477C18.232 1.247 15.215.003 12.004 0zm5.952 16.945c-.244.686-1.214 1.258-1.683 1.323-.469.066-.935.127-3.003-.706-2.502-1.008-4.086-3.528-4.21-3.693-.125-.165-1.021-1.356-1.021-2.585 0-1.229.645-1.834.872-2.081.226-.247.495-.309.66-.309.165 0 .33.001.474.007.152.006.356-.057.556.425.206.495.701 1.711.763 1.835.062.124.103.268.021.433-.083.165-.124.268-.247.412-.124.144-.261.32-.371.43-.124.124-.253.259-.11.505.144.247.64 1.053 1.371 1.703.942.84 1.734 1.103 1.981 1.226.248.124.392.103.536-.062.144-.165.62-.722.784-.969.165-.247.33-.206.557-.124.227.082 1.443.68 1.69.804.248.124.413.186.475.289.062.103.062.597-.182 1.283z"/>
  </svg>
);

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
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-brand-sky hover:bg-brand-sky/90 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Slot</span>
              </button>
              <a
                href="https://www.instagram.com/the_whitecurve/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-95 text-white rounded-xl transition-all shadow-md flex items-center justify-center active:scale-95 shrink-0"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://wa.me/919172208080"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl transition-all shadow-md flex items-center justify-center active:scale-95 shrink-0"
                title="Chat with us on WhatsApp"
              >
                <WhatsAppIcon className="w-4.5 h-4.5" />
              </a>
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
                href="tel:+919172208080"
                className="flex items-start gap-3 hover:text-brand-sky transition-colors text-gray-300 group"
              >
                <Phone className="w-4 h-4 text-brand-sky mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold block text-white">Call Reception</span>
                  <span>+91 91722 08080</span>
                </div>
              </a>

              <a
                href="mailto:contact@thewhitecurve.com"
                className="flex items-start gap-3 hover:text-brand-sky transition-colors text-gray-300 group"
              >
                <Mail className="w-4 h-4 text-brand-sky mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold block text-white">Email Concierge</span>
                  <span>contact@thewhitecurve.com</span>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/place/The+White+Curve/@18.5877567,73.6988315,918m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bc2bb0d1a361b9d:0xefaa1c6c5689c903!8m2!3d18.5877567!4d73.7014064!16s%2Fg%2F11x7qkgc37"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-brand-sky transition-colors text-gray-300 group"
              >
                <MapPin className="w-4 h-4 text-brand-sky mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-bold block text-white">Our Location</span>
                  <span>Happiness Street, Hinjewadi Phase 2, Pune, Maharashtra 411057</span>
                  <span className="text-[10px] text-brand-sky flex items-center gap-1 mt-1 font-semibold">
                    View on Google Maps <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
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
            <p className="mt-1">Lead Dentist: Dr. Sanket Aras, MDS. Registered Dental Clinic, Hinjewadi Phase 2, Pune.</p>
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
