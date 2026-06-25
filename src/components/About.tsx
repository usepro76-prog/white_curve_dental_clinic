import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import aboutBgImg from '../assets/images/about_us_dental_clinic-bg_img.png';

interface AnimatedCounterProps {
  value: string;
}

function AnimatedCounter({ value }: AnimatedCounterProps) {
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : '';

  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const start = 0;
    const end = targetNumber;
    if (start === end) return;

    const duration = 1500; // 1.5 seconds duration
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutQuad
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * (end - start) + start);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, targetNumber]);

  return (
    <span ref={elementRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28 bg-[#173d6e] text-white" id="about">
      {/* Background Image with High-Fidelity Deep Blue Tint Wash Overlay - Full-Bleed Edge-to-Edge */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={aboutBgImg}
          alt="Clinic Interior Backdrop"
          initial={{ scale: 1.02 }}
          animate={{ 
            scale: [1.02, 1.10, 1.02],
            x: [0, -10, 0],
            y: [0, 5, 0]
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
          }}
          className="w-full h-full object-cover opacity-70 mix-blend-luminosity pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Custom deep blue-tinted gradient overlays matching the reference image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#173d6e]/95 via-[#1c4b82]/90 to-[#14315c]/95 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#008ED6]/15 mix-blend-color-dodge" />
        {/* Soft ambient radial blur to focus attention on the typography */}
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Core Content Layout Aligned with the Standard Site Width */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full gap-16 md:gap-24">
        
        {/* Top row: Brand Title on Left, Section Label on Right */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Left Column: Heading and Description */}
          <div className="max-w-3xl text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in"
            >
              Unveil excellence. <br />
              Discover the Celestia <br />
              Smiles difference.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-xl font-medium"
            >
              At Celestia Smiles, we believe that your smile deserves more than just care – it deserves celebration. Our board-certified experts offer a spa-like, comforting experience paired with cutting-edge dental and orthodontic treatments.
            </motion.p>
          </div>

          {/* Right Column: ABOUT US label exactly as in screenshot */}
          <div className="md:text-right flex-shrink-0 self-start md:self-auto pt-2">
            <span className="text-white/90 text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] block">
              ABOUT US
            </span>
          </div>

        </div>

        {/* Bottom row: The 4 high-fidelity translucent Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {[
            { value: "15+", label: "Years of excellence" },
            { value: "98%", label: "Patient satisfaction rate" },
            { value: "5000+", label: "Smiles transformed" },
            { value: "17", label: "Certified experts" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.05 }}
              className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col justify-between gap-4 transition-all duration-300 group hover:border-white/20 hover:shadow-xl"
              id={`about-stat-card-${idx}`}
            >
              <span className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 origin-left block">
                <AnimatedCounter value={stat.value} />
              </span>
              <span className="text-[10px] md:text-xs text-blue-100/70 font-bold tracking-wide uppercase leading-tight block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
