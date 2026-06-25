import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { Testimonial } from '../types';

interface ReviewsProps {
  testimonials: Testimonial[];
}

export default function Reviews({ testimonials }: ReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex] || testimonials[0];

  return (
    <section className="py-24 bg-gray-50/50 border-b border-gray-100" id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-brand-sky bg-brand-soft px-3 py-1.5 rounded-full border border-brand-sky/10">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-4">
            Loved by Thousands of Confident Smiles
          </h2>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Read about our patients' direct clinical transformations, detailing their journey from custom smile designs to lifelong confidence.
          </p>
        </div>

        {/* Carousel Slide Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="reviews-carousel-wrapper">
          
          {/* Left: Highlighted Huge Quote Card (8 columns) */}
          <div className="lg:col-span-8 relative">
            <div className="absolute -top-10 -left-6 text-brand-sky/10 z-0">
              <Quote className="w-32 h-32" />
            </div>

            <div className="relative bg-white border border-gray-100 p-8 sm:p-12 rounded-[2.5rem] shadow-xl z-10" id="review-card">
              <div className="flex items-center gap-1.5 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="text-lg sm:text-xl font-bold text-brand-navy leading-relaxed italic">
                    "{current.quote}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <img
                      src={current.avatarUrl}
                      alt={current.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border border-gray-100 bg-gray-100 shrink-0"
                    />
                    <div>
                      <h4 className="font-extrabold text-brand-navy text-sm flex items-center gap-1.5">
                        {current.name}, {current.age}
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">
                        Treatment: <span className="text-brand-sky uppercase font-extrabold tracking-wider text-[10px]">{current.treatmentName}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Info metrics & Slider Buttons (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-8 lg:pl-6 text-left">
            <div>
              <h3 className="text-5xl font-black text-brand-navy tracking-tight">
                4.9★
              </h3>
              <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-wider">
                Average Clinical Patient Rating
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Based on over 1,420 independent verified client reviews across Google, Trustpilot, and Doctoralia.
              </p>
            </div>

            {/* Slider Navigation controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-gray-200 hover:border-brand-navy text-gray-600 hover:text-brand-navy bg-white flex items-center justify-center transition-all hover:shadow-sm"
                aria-label="Previous review"
                id="review-prev-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Position Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeIndex === index ? 'w-6 bg-brand-sky' : 'w-2.5 bg-gray-200'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-gray-200 hover:border-brand-navy text-gray-600 hover:text-brand-navy bg-white flex items-center justify-center transition-all hover:shadow-sm"
                aria-label="Next review"
                id="review-next-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
