import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, ChevronRight, Activity, Percent, ArrowRight } from 'lucide-react';
import { Treatment, Dentist } from '../types';

// Import High-Fidelity 3D images
import aestheticDentistryImg from '../assets/images/aesthetic_dentistry.jpeg';
import alignersOrthoImg from '../assets/images/aligners_ortho.jpeg';
import implantologyImg from '../assets/images/implantology.png';
import surgicalDentistryImg from '../assets/images/Surgical_dentistry.png';
import whiteningImg from '../assets/images/whitening.png';

interface TreatmentsProps {
  treatments: Treatment[];
  dentists: Dentist[];
  onOpenBooking: (treatmentId?: string) => void;
}

// Custom High-Fidelity 3D Translucent Blue-Glass SVGs
const AestheticIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="svg-aesthetic">
    <defs>
      <radialGradient id="glow-aesthetic" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="glass-aesthetic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#glow-aesthetic)" />
    <path
      d="M30 30 C30 20, 42 20, 50 25 C58 20, 70 20, 70 30 C70 50, 65 75, 50 85 C35 75, 30 50, 30 30 Z"
      fill="url(#glass-aesthetic)"
      stroke="#e0f2fe"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M42 24 C45 28, 48 28, 50 25" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 25 V65" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
    <path d="M34 32 C38 45, 38 65, 50 78" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.3" />
    <path d="M66 32 C62 45, 62 65, 50 78" stroke="#0284c7" strokeWidth="0.75" strokeOpacity="0.5" />
    <path
      d="M26 30 C26 16, 40 14, 50 21 C60 14, 74 16, 74 30 C74 54, 68 80, 50 90 C32 80, 26 54, 26 30 Z"
      stroke="#38bdf8"
      strokeWidth="1"
      strokeDasharray="4 4"
      strokeOpacity="0.6"
    />
  </svg>
);

const OrthodonticsIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="svg-ortho">
    <defs>
      <radialGradient id="glow-ortho" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="teeth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#glow-ortho)" />
    <path d="M20 65 C20 30, 80 30, 80 65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" strokeOpacity="0.5" />
    <path d="M22 62 C25 50, 32 40, 50 40 C68 40, 75 50, 78 62" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.8" />
    <path d="M22 62 C25 50, 32 40, 50 40 C68 40, 75 50, 78 62" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="25" y="52" width="6" height="10" rx="2" fill="url(#teeth-grad)" stroke="#ffffff" strokeWidth="0.75" transform="rotate(-25 28 57)" />
    <rect x="33" y="44" width="7" height="11" rx="2.5" fill="url(#teeth-grad)" stroke="#ffffff" strokeWidth="0.75" transform="rotate(-12 36.5 49.5)" />
    <rect x="42" y="39" width="8" height="12" rx="3" fill="url(#teeth-grad)" stroke="#ffffff" strokeWidth="1" />
    <rect x="51" y="39" width="8" height="12" rx="3" fill="url(#teeth-grad)" stroke="#ffffff" strokeWidth="1" />
    <rect x="60" y="44" width="7" height="11" rx="2.5" fill="url(#teeth-grad)" stroke="#ffffff" strokeWidth="0.75" transform="rotate(12 63.5 49.5)" />
    <rect x="69" y="52" width="6" height="10" rx="2" fill="url(#teeth-grad)" stroke="#ffffff" strokeWidth="0.75" transform="rotate(25 72 57)" />
  </svg>
);

const ImplantologyIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="svg-implant">
    <defs>
      <radialGradient id="glow-implant" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="screw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#glow-implant)" />
    <path d="M50 15 V5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M30 25 L22 17" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M70 25 L78 17" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
    <path
      d="M35 38 C35 25, 42 22, 50 26 C58 22, 65 25, 65 38 C65 44, 62 46, 50 48 C38 46, 35 44, 35 38 Z"
      fill="url(#crown-grad)"
      stroke="#ffffff"
      strokeWidth="1"
    />
    <path d="M44 48 H56 L53 54 H47 L44 48 Z" fill="#e2e8f0" stroke="#38bdf8" strokeWidth="1" />
    <path d="M46 54 H54 L52 82 C52 84, 48 84, 48 82 L46 54 Z" fill="url(#screw-grad)" stroke="#ffffff" strokeWidth="0.75" />
    <path d="M45 58 L55 60" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M45 64 L55 66" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M45 70 L55 72" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M46 76 L54 78" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const WhiteningIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="svg-whitening">
    <defs>
      <radialGradient id="glow-whitening" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="glass-white" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="42" fill="url(#glow-whitening)" />
    <path
      d="M34 35 C34 22, 43 23, 50 27 C57 23, 66 22, 66 35 C66 52, 61 72, 50 82 C39 72, 34 52, 34 35 Z"
      fill="url(#glass-white)"
      stroke="#ffffff"
      strokeWidth="1.5"
    />
    <path d="M22 50 Q50 30 78 50" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
    <path d="M22 50 Q50 30 78 50" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    <path d="M26 24 L28 28 M28 24 L26 28" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M72 26 L74 30 M74 26 L72 30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M50 12 L50 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <path d="M47 15 H53" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="36" cy="48" r="2" fill="#ffffff" />
    <circle cx="62" cy="54" r="1.5" fill="#ffffff" />
  </svg>
);

const SurgicalIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" id="svg-surgical">
    <defs>
      <radialGradient id="glow-surgical" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="surgical-glass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#glow-surgical)" />
    <path
      d="M32 32 C32 20, 42 18, 50 24 C58 18, 68 20, 68 32 C68 50, 62 74, 50 84 C38 74, 32 50, 32 32 Z"
      fill="url(#surgical-glass)"
      stroke="#e2e8f0"
      strokeWidth="1.5"
    />
    <circle cx="50" cy="50" r="24" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.7" />
    <circle cx="50" cy="50" r="12" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.5" />
    <line x1="50" y1="20" x2="50" y2="80" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.6" />
    <line x1="20" y1="50" x2="80" y2="50" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.6" />
    <path d="M22 36 V28 H30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
    <path d="M78 36 V28 H70" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
    <path d="M22 64 V72 H30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
    <path d="M78 64 V72 H70" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
  </svg>
);

const getIllustrationForId = (id: string) => {
  switch (id) {
    case 'veneers':
      return (
        <img
          src={aestheticDentistryImg}
          alt="Aesthetic Dentistry"
          className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/10"
          referrerPolicy="no-referrer"
        />
      );
    case 'aligners':
      return (
        <img
          src={alignersOrthoImg}
          alt="Orthodontics"
          className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/10"
          referrerPolicy="no-referrer"
        />
      );
    case 'implants':
      return (
        <img
          src={implantologyImg}
          alt="Implantology"
          className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/10"
          referrerPolicy="no-referrer"
        />
      );
    case 'whitening':
      return (
        <img
          src={whiteningImg}
          alt="Whitening"
          className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/10"
          referrerPolicy="no-referrer"
        />
      );
    case 'surgical':
      return (
        <img
          src={surgicalDentistryImg}
          alt="Surgical Dentistry"
          className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/10"
          referrerPolicy="no-referrer"
        />
      );
    default:
      return <AestheticIllustration />;
  }
};

const treatmentMetadata: Record<string, { tagline: string; detailedDesc: string }> = {
  veneers: {
    tagline: 'Artisanal smile architecture, crafted for life',
    detailedDesc: 'Custom-crafted premium porcelain veneers and hand-sculpted biomimetic resins engineered to permanently enhance alignment, color, and spacing while preserving up to 95% of your natural enamel structure.',
  },
  aligners: {
    tagline: 'Virtually invisible aligners, complete control',
    detailedDesc: 'Transform your smile contour using customized high-grade clear alignment shells. Crafted using 3D biomechanical tracking to achieve perfect aesthetic dental balance comfortably and cleanly.',
  },
  implants: {
    tagline: 'Smile restoration, built to last',
    detailedDesc: 'Permanent, natural-looking tooth replacements. Using 3D-guided surgery, our implants restore full chewing function and aesthetics with precise fit, bone integration, and lifelike ceramic crowns.',
  },
  whitening: {
    tagline: 'Lift shades instantly, zero sensitivity',
    detailedDesc: 'Administered via light-activated medical gel formulas. Our advanced cool LED systems eliminate organic coffee, tea, and tobacco pigments in a single 45-minute treatment, leaving enamel strengthened.',
  },
  surgical: {
    tagline: 'Atraumatic surgical precision, rapid recovery',
    detailedDesc: 'State-of-the-art microsurgical procedures covering wisdom teeth extraction and bone preservation. Guided by high-resolution 3D scan alignment to guarantee tissue protection and rapid pain-free healing.',
  },
};

export default function Treatments({ treatments, dentists, onOpenBooking }: TreatmentsProps) {
  // Navigation explorer active treatment state
  const [activeTreatmentId, setActiveTreatmentId] = useState<string | null>(null);

  // Calculator states
  const [calcTreatmentId, setCalcTreatmentId] = useState<string>('implants');
  const [calcArches, setCalcArches] = useState<number>(2); // 1 = Single, 2 = Dual
  const [calcComplexity, setCalcComplexity] = useState<number>(2); // 1 = Simple, 2 = Moderate, 3 = Complex

  // Calculate Estimator values
  const getCalculatorEstimate = () => {
    const baseTreatment = treatments.find(t => t.id === calcTreatmentId);
    if (!baseTreatment) return { total: 0, monthly: 0, visits: 0 };

    let basePrice = 0;
    let baseVisits = 2;

    switch (baseTreatment.id) {
      case 'aligners':
        basePrice = 2800;
        baseVisits = 4;
        break;
      case 'veneers':
        basePrice = 1200; // per veneer
        baseVisits = 2;
        break;
      case 'implants':
        basePrice = 350; // single base step / starting implant
        baseVisits = 3;
        break;
      case 'whitening':
        basePrice = 350;
        baseVisits = 1;
        break;
      case 'surgical':
        basePrice = 450;
        baseVisits = 1;
        break;
      default:
        basePrice = 150;
        baseVisits = 1;
    }

    let total = basePrice;
    
    if (baseTreatment.id === 'veneers') {
      // For veneers, multiply by complexity as number of teeth
      const teethMultiplier = calcComplexity === 1 ? 2 : calcComplexity === 2 ? 6 : 10;
      total = basePrice * teethMultiplier;
    } else if (baseTreatment.id === 'implants') {
      const implantsCount = calcComplexity === 1 ? 1 : calcComplexity === 2 ? 2 : 4;
      total = 3500 * implantsCount;
    } else {
      // For aligners/whitening/surgical
      const archMultiplier = calcArches === 1 ? 0.65 : 1.0;
      const complexMultiplier = calcComplexity === 1 ? 0.85 : calcComplexity === 2 ? 1.0 : 1.3;
      total = Math.round(basePrice * archMultiplier * complexMultiplier);
    }

    const visits = baseVisits + (calcComplexity - 1);
    const monthly = Math.round((total * 0.9) / 24); // 24 month plan

    return {
      total,
      monthly,
      visits,
      formattedTotal: `$${total.toLocaleString()}`,
      formattedMonthly: `$${monthly.toLocaleString()}`,
    };
  };

  const currentCalcTreatment = treatments.find(t => t.id === calcTreatmentId) ?? treatments[0];
  const estimate = getCalculatorEstimate();

  return (
    <section className="relative py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden" id="services">
      {/* Light decorative backdrop shapes */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#255694]">
            SERVICES
          </span>
        </div>

        {/* Main Header */}
        <h2 className="text-center text-3xl sm:text-5xl font-black text-[#1e3a8a] tracking-tight mt-1 mb-4 leading-tight">
          Expert care for every smile
        </h2>

        {/* Intro Description */}
        <p className="text-center text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed mb-12">
          We offer a full spectrum of treatments – each tailored to elevate your health, confidence, and natural beauty.
        </p>

          {/* FIVE HIGH-FIDELITY SERVICE CARDS WITH INTERACTIVE ACCORDION ANIMATION */}
          <div 
            className="flex flex-col md:flex-row gap-4 lg:gap-6 w-full items-stretch min-h-[400px]" 
            id="five-cards-row"
            onMouseLeave={() => setActiveTreatmentId(null)}
          >
            {treatments.map((treatment) => {
              const isActive = activeTreatmentId === treatment.id;
              const meta = treatmentMetadata[treatment.id] || {
                tagline: 'Expert modern care',
                detailedDesc: treatment.description,
              };

              // Map treatment IDs to their corresponding high-fidelity images
              const getTreatmentImage = (id: string) => {
                switch (id) {
                  case 'veneers': return aestheticDentistryImg;
                  case 'aligners': return alignersOrthoImg;
                  case 'implants': return implantologyImg;
                  case 'whitening': return whiteningImg;
                  case 'surgical': return surgicalDentistryImg;
                  default: return aestheticDentistryImg;
                }
              };

              const imgSrc = getTreatmentImage(treatment.id);
              
              return (
                <div
                  key={treatment.id}
                  onMouseEnter={() => setActiveTreatmentId(treatment.id)}
                  onClick={() => {
                    setActiveTreatmentId(treatment.id);
                    setCalcTreatmentId(treatment.id);
                  }}
                  className={`relative overflow-hidden rounded-3xl transition-all duration-500 ease-out select-none cursor-pointer flex flex-col justify-between group ${
                    isActive
                      ? 'md:flex-[3] z-10 h-[450px] md:h-[400px] w-full shadow-2xl ring-2 ring-blue-400/20'
                      : activeTreatmentId !== null
                      ? 'h-[100px] md:h-[400px] md:flex-[0.6] opacity-60 scale-98 hover:opacity-100 hover:scale-100 w-full'
                      : 'h-[350px] md:h-[400px] md:flex-1 w-full hover:scale-[1.02] hover:shadow-lg'
                  }`}
                  id={`service-grid-card-${treatment.id}`}
                >
                  {/* Inactive state view: Full-bleed high fidelity image backgrounds */}
                  {!isActive && (
                    <>
                      <img 
                        src={imgSrc} 
                        alt={treatment.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* High-legibility vignette gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Centered label at bottom */}
                      <div className="absolute bottom-6 inset-x-4 text-center">
                        <span className="text-sm md:text-base font-extrabold tracking-tight text-white leading-tight block truncate">
                          {treatment.name}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Active expanded layout */}
                  {isActive && (
                    <div className="w-full h-full p-4 md:p-5 flex flex-col md:flex-row items-stretch gap-4 md:gap-5 bg-gradient-to-br from-[#24589c] to-[#12315c]">
                      {/* Left Side: 3D model illustration + Giant Title */}
                      <div className="w-full md:w-[45%] h-[180px] md:h-full relative rounded-2xl overflow-hidden flex-shrink-0">
                        <img 
                          src={imgSrc} 
                          alt={treatment.name} 
                          className="absolute inset-0 w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-xl md:text-3xl font-black text-white tracking-tight leading-none block">
                            {treatment.name}
                          </span>
                        </div>
                      </div>

                      {/* Right Side: Floating Translucent Card Details */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 15 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex-1 flex flex-col justify-between bg-black/15 backdrop-blur-md rounded-2xl border border-white/10 p-5 text-left h-full"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-white font-extrabold text-base md:text-lg leading-tight tracking-tight max-w-[80%]">
                              {meta.tagline}
                            </h4>
                            
                            {/* Circular Booking Diagonal Arrow */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenBooking(treatment.id);
                              }}
                              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#1c4b82] flex items-center justify-center transition-all duration-300 flex-shrink-0"
                              title={`Request ${treatment.name}`}
                            >
                              <ArrowRight className="w-5 h-5 -rotate-45" />
                            </button>
                          </div>

                          <p className="text-xs md:text-sm text-blue-100/95 leading-relaxed font-medium">
                            {meta.detailedDesc}
                          </p>
                        </div>

                        {/* Subtle decorative accent */}
                        <div className="pt-3 border-t border-white/10 mt-4 flex items-center gap-1.5 text-[11px] text-blue-100/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          <span>Includes customized follow-up & post-op care support</span>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Centered Primary Action Trigger */}
          <div className="flex justify-center mt-12 mb-16">
            <button
              onClick={() => onOpenBooking(activeTreatmentId ?? undefined)}
              className="flex items-center gap-2.5 bg-[#008ED6] hover:bg-[#008ED6]/90 text-white font-bold px-9 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-103 active:scale-97 transition-all text-sm uppercase tracking-wider"
              id="schedule-a-visit-cta"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a visit</span>
            </button>
          </div>

        {/* INTEGRATED MODERN FINANCIAL CALCULATOR */}
        <div className="mt-16 bg-white text-gray-900 border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden" id="estimator">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* CALCULATOR CONTROLS (7 columns) */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#008ED6] block">Financial transparency</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] tracking-tight mt-1">
                  Smile Treatment Cost Estimator
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Plan your customized aesthetic journey. Adjust options below to view complete instant quotes.
                </p>
              </div>

              {/* Treatment Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">1. Select Desired Treatment</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" id="calc-treatment-picker">
                  {treatments.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCalcTreatmentId(t.id)}
                      className={`p-3 text-center border-2 rounded-2xl transition-all flex flex-col items-center justify-center gap-1.5 ${
                        calcTreatmentId === t.id
                          ? 'border-[#008ED6] bg-blue-50/40 text-[#008ED6] font-bold'
                          : 'border-gray-100 hover:border-gray-200 text-gray-600 bg-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[10px] tracking-tight truncate w-full block leading-none">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific variables depending on the treatment type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Arch Selector (only relevant for certain treatments) */}
                {calcTreatmentId !== 'veneers' && calcTreatmentId !== 'implants' && calcTreatmentId !== 'surgical' ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">2. Arches</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcArches(1)}
                        className={`py-3 rounded-xl border-2 text-xs font-semibold ${
                          calcArches === 1
                            ? 'border-[#008ED6] bg-blue-50/40 text-[#008ED6]'
                            : 'border-gray-100 text-gray-500 bg-white hover:bg-gray-50'
                        }`}
                      >
                        Single Arch
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcArches(2)}
                        className={`py-3 rounded-xl border-2 text-xs font-semibold ${
                          calcArches === 2
                            ? 'border-[#008ED6] bg-blue-50/40 text-[#008ED6]'
                            : 'border-gray-100 text-gray-500 bg-white hover:bg-gray-50'
                        }`}
                      >
                        Dual Arches (Full)
                      </button>
                    </div>
                  </div>
                ) : calcTreatmentId === 'veneers' ? (
                  /* Teeth Count multiplier for veneers */
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">2. Number of Teeth</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: '2 Teeth', val: 1 },
                        { label: '6 Teeth (Smile)', val: 2 },
                        { label: '10 Teeth (Full)', val: 3 },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setCalcComplexity(item.val)}
                          className={`py-3 rounded-xl border-2 text-xs font-semibold leading-none ${
                            calcComplexity === item.val
                              ? 'border-[#008ED6] bg-blue-50/40 text-[#008ED6]'
                              : 'border-gray-100 text-gray-500 bg-white hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Implant Count multiplier */
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">2. Implants Count</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: '1 Implant', val: 1 },
                        { label: '2 Implants', val: 2 },
                        { label: '4 Implants (Full)', val: 3 },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setCalcComplexity(item.val)}
                          className={`py-3 rounded-xl border-2 text-xs font-semibold leading-none ${
                            calcComplexity === item.val
                              ? 'border-[#008ED6] bg-blue-50/40 text-[#008ED6]'
                              : 'border-gray-100 text-gray-500 bg-white hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Case Complexity Selector */}
                {calcTreatmentId !== 'veneers' && calcTreatmentId !== 'implants' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">3. Alignment Case</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Mild', val: 1 },
                        { label: 'Moderate', val: 2 },
                        { label: 'Severe', val: 3 },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setCalcComplexity(item.val)}
                          className={`py-3 rounded-xl border-2 text-xs font-semibold ${
                            calcComplexity === item.val
                              ? 'border-[#008ED6] bg-blue-50/40 text-[#008ED6]'
                              : 'border-gray-100 text-gray-500 bg-white hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Guarantees bar */}
              <div className="p-4 bg-blue-50/30 rounded-2xl border border-[#008ED6]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#1e3a8a] font-semibold">
                <div className="flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-[#008ED6]" />
                  <span>0% Financing Options</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#008ED6]" />
                  <span>5-Year Smile Guarantee</span>
                </div>
              </div>

            </div>

            {/* ESTIMATED OUTPUT PANEL (5 columns) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1c4b82] to-[#12315c] text-white p-8 sm:p-12 flex flex-col justify-between" id="estimator-output-panel">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#bae6fd]">Estimated Plan</span>
                  <h4 className="text-xl font-bold mt-1 text-white">{currentCalcTreatment.name}</h4>
                  <p className="text-xs text-blue-100/70 mt-1">{currentCalcTreatment.description}</p>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-blue-100/80">Est. Total Investment:</span>
                    <span className="text-xl font-extrabold text-white">{estimate.formattedTotal}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 bg-white/5 px-3 rounded-xl border border-white/5">
                    <span className="text-xs text-[#bae6fd] font-bold">Installments (0% APR):</span>
                    <span className="text-base font-extrabold text-[#bae6fd]">{estimate.formattedMonthly}<span className="text-[10px] text-white/70 font-normal">/mo</span></span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-blue-100/80">Clinic Visits Required:</span>
                    <span className="text-sm font-bold flex items-center gap-1 text-white">
                      <Clock className="w-3.5 h-3.5 text-[#bae6fd]" /> {estimate.visits} sessions
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => onOpenBooking(calcTreatmentId)}
                  className="w-full py-4 bg-[#008ED6] hover:bg-[#008ED6]/90 text-white rounded-xl font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2 text-sm active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Lock in this Estimate</span>
                </button>
                <p className="text-center text-[10px] text-blue-200/50">
                  Estimates are finalized following a 3D clinical oral scan.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

