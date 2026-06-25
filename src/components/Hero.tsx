import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  heroImg: string;
}

export default function Hero({ onOpenBooking, heroImg }: HeroProps) {
  return (
    <section
      className="relative min-h-screen pt-24 pb-16 lg:pt-32 flex items-center justify-center bg-white overflow-hidden"
      id="hero"
    >
      {/* Background Image covering entire hero */}
      <img
        src={heroImg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        referrerPolicy="no-referrer"
      />
      {/* Massive Background watermark - signature element of the WHITE Curve UI reference */}
      <div className="absolute inset-x-0 bottom-12 select-none pointer-events-none text-center hidden md:block">
        <h1 className="text-[12vw] font-black leading-none text-gray-50/80 tracking-tighter uppercase whitespace-nowrap">
          The WHITE Curve — Soft. Defined.
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Big Core Headline (Loves spacing and contrast) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-extrabold tracking-tight text-brand-navy leading-[1.05] mb-6">
                Not all smiles <br />
                need fixing, <br />
                some need <br />
                <span className="text-brand-sky relative">
                  vision
                  {/* Subtle underline SVG effect */}
                  <svg className="absolute left-0 -bottom-1 w-full h-2" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9C30 3 70 3 99 9" stroke="#008ED6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-sm mt-8">
                We’re a premium orthodontic and aesthetic clinic crafting confident smiles for those who settle for nothing ordinary.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Sub Headline & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:items-start text-left order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-brand-navy leading-tight">
                Luxury care <br />
                made personal
              </h3>

              {/* Action Button: Matches exact design of blue gradient with Calendar icon */}
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-sky to-brand-navy hover:from-brand-sky/90 hover:to-brand-navy/90 text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-xl active:scale-[0.98] group"
                id="hero-schedule-btn"
              >
                <div className="bg-white/20 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span>Schedule a visit</span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
