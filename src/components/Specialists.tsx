import React from 'react';
import { Dentist } from '../types';
import { motion } from 'motion/react';
import { 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  UserCheck, 
  ArrowRight, 
  Star, 
  Sparkles,
  Calendar
} from 'lucide-react';

interface SpecialistsProps {
  dentists: Dentist[];
  onOpenBooking: (treatmentId?: string, dentistId?: string) => void;
}

export default function Specialists({ dentists, onOpenBooking }: SpecialistsProps) {
  const doctor = dentists[0] || {
    id: 'dr-sanket-aras',
    name: 'Dr. Sanket Aras',
    role: 'Owner, The White Curve',
    specialty: 'BDS | MDS | PhD Scholar',
    experience: '15+ Years',
    bio: 'Endodontist & Aesthetic Dentist, Assistant Professor at D.Y. Patil Dental College & Hospital. Dedicated to precision oral care and advanced smile design.',
    rating: 4.9,
    reviewsCount: 840,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop'
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white border-b border-gray-100 relative overflow-hidden" id="specialists">
      {/* Soft background ambient blurs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Section Category Tag */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#255694] bg-blue-50/80 px-3.5 py-1.5 rounded-full border border-blue-100/50">
            Clinical Leadership
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hidden sm:block">
            SPECIALISTS
          </span>
        </div>

        {/* Master Responsive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Column: Brand Statement & Interactive Hooks */}
          <div className="lg:col-span-5 text-left space-y-8 lg:sticky lg:top-28">
            
            <div className="space-y-5">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-[#1e3a8a] tracking-tight leading-[1.1]"
              >
                Meet the mind <br />
                <span className="inline-flex items-center gap-2 mt-2">
                  <span>behind your</span>
                  <span className="inline-flex items-center -space-x-2 bg-blue-50 p-1 rounded-full border border-blue-100">
                    <img
                      src={doctor.avatarUrl}
                      alt="Dr. Aras Icon"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="w-8 h-8 rounded-full bg-[#255694] flex items-center justify-center ring-2 ring-white shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </span>
                  </span>
                </span>
                <br />
                smile
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium max-w-md"
              >
                Our chief clinical specialist brings unmatched precision, academic expertise, and aesthetic dentistry to every treatment. We combine years of specialized research with a shared passion for personalized, life-long oral care.
              </motion.p>
            </div>

            {/* Premium Pill Booking Button matching the reference screenshot design */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => onOpenBooking(undefined, doctor.id)}
                className="inline-flex items-center gap-3 px-7 py-4 border border-gray-200 hover:border-[#1e3a8a] text-[#1e3a8a] hover:bg-gray-50 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow group"
                id="specialists-consult-trigger"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#1e3a8a] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Static Counter / Specialty Status Display */}
            <div className="pt-8 border-t border-gray-100 flex items-center gap-6">
              <div className="text-left">
                <span className="text-3xl font-black text-[#1e3a8a] block tracking-tight">01/01</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold block mt-0.5">
                  Chief Specialist Profile
                </span>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-left">
                <span className="text-3xl font-black text-emerald-600 block tracking-tight">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold block mt-0.5">
                  Satisfaction Rate
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Two Side-by-Side Cards on Desktop, Stacking on Mobile */}
          <div className="lg:col-span-7 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              
              {/* Card 1: The Master Specialist Profile Card (Pristine Blue Theme as in screenshot) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#255694] rounded-[2.25rem] p-4 sm:p-5 shadow-2xl relative overflow-hidden group border border-blue-400/20 flex flex-col justify-between"
                id="specialist-card-aras"
              >
                {/* Outer image frame with white/blue padding */}
                <div>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-[#173d6e] border border-blue-400/10 shadow-sm">
                    <img
                      src={doctor.avatarUrl}
                      alt={doctor.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    
                    {/* Specialty label exactly mirroring reference image */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#1e3a8a] text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                      Endodontist
                    </div>

                    {/* Star Rating Overlay */}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                      <span>{doctor.rating}</span>
                    </div>
                  </div>

                  {/* Specialist Text Details inside blue card */}
                  <div className="text-left px-2">
                    <h3 className="text-white text-xl sm:text-2xl font-black tracking-tight">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-100/90 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
                      Specialist in root canal treatments, microscopic diagnostics, and pain-free aesthetic restorations.
                    </p>
                  </div>
                </div>

                {/* Card Footer Meta */}
                <div className="px-2 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-blue-200/80">
                  <span>Practicing since 2011</span>
                  <span className="flex items-center gap-1 text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Scholar
                  </span>
                </div>

                {/* Subtle inner card accent glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              </motion.div>

              {/* Card 2: Academic Affiliations and Clinical Philosophy (Crisp White/Silver Contrast Card) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-slate-50 border border-slate-100 rounded-[2.25rem] p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                id="specialist-academic-card"
              >
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#255694] bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
                      Academic Profile
                    </span>
                    <GraduationCap className="w-5 h-5 text-[#255694]" />
                  </div>

                  {/* Doctor Title Info */}
                  <div className="text-left space-y-1">
                    <h4 className="text-lg font-black text-[#1e3a8a] tracking-tight">Dr. Sanket Aras</h4>
                    <p className="text-xs font-extrabold text-[#008ED6] uppercase tracking-wider">
                      BDS | MDS | PhD Scholar
                    </p>
                  </div>

                  {/* Bulleted Credential Highlights */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3 text-xs">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <strong className="text-gray-900 font-bold block leading-tight">Assistant Professor</strong>
                        <span className="text-gray-500">D.Y. Patil Dental College & Hosp.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <strong className="text-gray-900 font-bold block leading-tight">MDS (Endodontics)</strong>
                        <span className="text-gray-500">Specialist root canal therapy & surgery.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <strong className="text-gray-900 font-bold block leading-tight">PhD Scholar & Researcher</strong>
                        <span className="text-gray-500">Active presenter at world dental congresses.</span>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Philosophy Quote */}
                  <div className="pt-4 border-t border-slate-200/60 text-left">
                    <p className="text-xs text-gray-500 italic leading-relaxed font-medium">
                      "I believe advanced clinical dentistry must marry absolute comfort. Our microscope diagnostics preserve maximum natural enamel."
                    </p>
                  </div>
                </div>

                {/* Appointment slots indicator */}
                <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                    <UserCheck className="w-3.5 h-3.5" />
                    Accepting New Patients
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* Global Standard Trust Stats Bar Underneath */}
        <div className="mt-16 bg-blue-50/40 border border-blue-100/50 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6" id="brand-promise-banner">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#255694] shadow-sm shrink-0 border border-blue-100/50">
              <CheckCircle2 className="w-6 h-6 text-[#255694]" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 text-sm">Owner, The White Curve</h4>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                A pristine, state-of-the-art practice loaded with diagnostic microscopes, gentle lasers, and digital smile preview technology.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#255694] shadow-sm shrink-0 border border-blue-100/50">
              <Calendar className="w-6 h-6 text-[#255694]" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 text-sm">Flexible Consultation Slots</h4>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Enjoy hassle-free bookings with dedicated weekend slots, emergency pain-relief triage, and transparent step-by-step guidance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

