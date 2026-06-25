import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

// Import local premium assets
import smileBeforeImg from '../assets/images/smile_before_1782239603723.jpg';
import smileAfterImg from '../assets/images/smile_after_1782239624632.jpg';

interface TestimonialCase {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  whatWeDidTitle: string;
  whatWeDidBullets: string[];
  beforeImg: string;
  afterImg: string;
  portraitImg: string;
  caption: string;
  indexLabel: string;
}

export default function BeforeAfter() {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonialCases: TestimonialCase[] = [
    {
      id: 'aesthetic',
      tabLabel: 'Aesthetic dentistry',
      title: 'Christina’s smile, transformed',
      description: 'Christina felt self-conscious about the gaps and uneven shape of her teeth. She wanted a natural, brighter smile that still felt like her own – just more balanced, natural, and confidently beautiful.',
      whatWeDidTitle: 'What we did',
      whatWeDidBullets: [
        'Smile design planning with digital preview',
        'Minimal tooth preparation to preserve enamel',
        'Placement of ultra-thin porcelain veneers'
      ],
      beforeImg: smileBeforeImg,
      afterImg: smileAfterImg,
      portraitImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
      caption: 'Christina’s smile, before and after – confident, complete, and truly hers.',
      indexLabel: '01/04'
    },
    {
      id: 'orthodontics',
      tabLabel: 'Orthodontics',
      title: 'Michael’s path to alignment',
      description: 'Michael had mild crowding and a deep bite that affected his chewing comfort. Using custom clear aligners, we achieved perfect structural alignment while preserving his natural tooth anatomy.',
      whatWeDidTitle: 'What we did',
      whatWeDidBullets: [
        '3D digital scans for high-precision treatment staging',
        'Sequenced transparent medical-grade active aligners',
        'Final aesthetic refinement and high-durability retention'
      ],
      beforeImg: smileBeforeImg,
      afterImg: smileAfterImg,
      portraitImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
      caption: 'Michael’s smile, before and after – beautifully aligned, functional, and natural.',
      indexLabel: '02/04'
    },
    {
      id: 'implantology',
      tabLabel: 'Implantology',
      title: 'Sarah’s gap, seamlessly restored',
      description: 'After losing a molar, Sarah struggled with low chewing efficiency and minor speech changes. We placed a premium titanium implant topped with a high-fidelity zirconia crown that seamlessly matches her existing teeth.',
      whatWeDidTitle: 'What we did',
      whatWeDidBullets: [
        'Computer-guided implant placement for surgical safety',
        'Premium grade-5 titanium screw integration',
        'Hand-crafted aesthetic zirconia tooth crown restoration'
      ],
      beforeImg: smileBeforeImg,
      afterImg: smileAfterImg,
      portraitImg: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop',
      caption: 'Sarah’s smile, before and after – restored strength, complete contour, and peace of mind.',
      indexLabel: '03/04'
    },
    {
      id: 'whitening',
      tabLabel: 'Whitening',
      title: 'Elena’s deep shade renewal',
      description: 'Years of espresso and staining food had aged Elena’s smile. A single, non-invasive active LED-laser whitening treatment lifted her shade dramatically without triggering any nerve or enamel sensitivity.',
      whatWeDidTitle: 'What we did',
      whatWeDidBullets: [
        'Protective gingival barrier application for gums',
        'Cool light-activated clinical gel application',
        'Post-whitening deep remineralization therapy'
      ],
      beforeImg: smileBeforeImg,
      afterImg: smileAfterImg,
      portraitImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      caption: 'Elena’s smile, before and after – refreshed shade, stain-free enamel, and radiant glow.',
      indexLabel: '04/04'
    }
  ];

  const activeCase = testimonialCases[activeCaseIndex] || testimonialCases[0];

  const handleNext = () => {
    setActiveCaseIndex((prev) => (prev + 1) % testimonialCases.length);
    setSliderPosition(50);
  };

  const handlePrev = () => {
    setActiveCaseIndex((prev) => (prev - 1 + testimonialCases.length) % testimonialCases.length);
    setSliderPosition(50);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-gray-100" id="smile-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header matching dropped image */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#008ED6]">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A54] tracking-tight">
            Real stories. Real smiles.
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Nothing speaks louder than the words of those who've experienced true, visible transformation firsthand.
          </p>
        </div>

        {/* Tab Selector Buttons - Responsive Horizontal Scrollable Container */}
        <div className="relative border-b border-gray-100 mb-12">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto whitespace-nowrap gap-8 md:gap-12 pb-3 px-2 scrollbar-none">
            {testimonialCases.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(index);
                  setSliderPosition(50);
                }}
                className={`relative pb-3 text-sm font-bold tracking-tight transition-all cursor-pointer ${
                  activeCaseIndex === index
                    ? 'text-[#008ED6] font-extrabold'
                    : 'text-gray-400 hover:text-[#102A54]'
                }`}
              >
                <span>{item.tabLabel}</span>
                {activeCaseIndex === index && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#008ED6] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout - Grid of Left Text, Middle BeforeAfter Slider, Right Portrait */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            
            {/* Left Column: Client Story & What We Did */}
            <div className="lg:col-span-4 text-left space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#102A54] tracking-tight leading-snug">
                  {activeCase.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                  {activeCase.description}
                </p>
              </div>

              <div className="pt-4">
                <h4 className="text-base font-extrabold text-[#102A54] tracking-tight mb-3">
                  {activeCase.whatWeDidTitle}
                </h4>
                <ul className="space-y-3">
                  {activeCase.whatWeDidBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start text-xs sm:text-sm text-gray-600">
                      <span className="text-[#008ED6] font-extrabold mr-2 select-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Middle Column: Interactive Before/After Split Slider */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-md border border-gray-100 select-none cursor-ew-resize bg-gray-50"
                id="interactive-before-after-slider-container"
              >
                {/* 1. After Image (Background, displayed on the right side) */}
                <img
                  src={activeCase.afterImg}
                  alt="Smile After Treatment"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* 2. Before Image (Overlay clipped based on sliderPosition, displayed on the left side) */}
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                  }}
                >
                  <img
                    src={activeCase.beforeImg}
                    alt="Smile Before Treatment"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* 3. Labels on top of both images */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 select-none">
                  Before
                </div>
                <div className="absolute top-4 right-4 bg-[#008ED6]/80 backdrop-blur-md text-white text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 select-none">
                  After
                </div>

                {/* Vertical Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#008ED6] pointer-events-none z-20 shadow-md"
                  style={{ left: `${sliderPosition}%` }}
                />

                {/* Elegant drag circle overlay */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-gray-100/80 cursor-ew-resize select-none pointer-events-none z-20 group"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <span className="text-[10px] font-black tracking-widest uppercase text-[#102A54]">
                    Drag
                  </span>
                </div>

                {/* Transparent Range Input to capture native inputs nicely */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Smile transformation slider"
                />
              </div>
            </div>

            {/* Right Column: Final portrait photo with customized caption */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm bg-blue-50/50">
                <img
                  src={activeCase.portraitImg}
                  alt={activeCase.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed mt-4 text-left">
                {activeCase.caption}
              </p>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation Buttons & Slider Progress */}
        <div className="flex items-center justify-end mt-12 gap-5" id="testimonials-pagination-controls">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#102A54] text-gray-400 hover:text-[#102A54] bg-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
            aria-label="Previous case"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          
          <span className="text-xs font-extrabold text-[#102A54] tracking-widest">
            {activeCase.indexLabel}
          </span>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#102A54] text-gray-400 hover:text-[#102A54] bg-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
            aria-label="Next case"
          >
            <ArrowRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

      </div>
    </section>
  );
}
