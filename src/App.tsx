import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Treatments from './components/Treatments';
import BeforeAfter from './components/BeforeAfter';
import Specialists from './components/Specialists';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { Treatment, Dentist, Testimonial, SmileTransformation } from './types';

// Importing generated premium assets
import heroImg from './assets/images/white-curev-hero-desktop-img.jpeg';
import smileBeforeImg from './assets/images/smile_before_1782239603723.jpg';
import smileAfterImg from './assets/images/smile_after_1782239624632.jpg';
import drArasImg from './assets/images/Dr._Sanket_Aras_white_curve.png';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedTreatmentId, setPreSelectedTreatmentId] = useState<string>('');
  const [preSelectedDentistId, setPreSelectedDentistId] = useState<string>('');

  // Premium Treatment Catalog
  const treatments: Treatment[] = [
    {
      id: 'veneers',
      name: 'Aesthetic Dentistry',
      category: 'cosmetic',
      description: 'Custom-crafted porcelain veneers and hand-sculpted resins to permanently enhance color, alignment, and spacing while preserving up to 95% of natural enamel.',
      duration: '2 sessions',
      priceEstimate: '$1,200/tooth',
      features: [
        'High-translucency aesthetic clinical ceramic',
        'Extreme durability and stain resistance',
        'Fully personalized shape and color mapping',
        'Artisanal hand-sculpted biocompatible composite bonding',
      ],
      iconName: 'aesthetic',
    },
    {
      id: 'aligners',
      name: 'Orthodontics',
      category: 'orthodontics',
      description: 'Custom invisible clear aligners designed with virtual 3D prediction simulation to safely guide teeth into perfect alignment without traditional wires.',
      duration: '4-8 months',
      priceEstimate: '$2,800',
      features: [
        'Nearly invisible medical-grade material',
        'Includes detailed digital orthodontic simulation',
        'Weekly self-swaps for maximum convenience',
        'Fully removable for dining and oral hygiene',
      ],
      iconName: 'orthodontics',
    },
    {
      id: 'implants',
      name: 'Implantology',
      category: 'restorative',
      description: 'Permanent, natural-looking tooth replacements. Using 3D-guided surgery, our implants restore full function with precise fit and lifelike ceramic crowns.',
      duration: '3-4 months',
      priceEstimate: '$3,500',
      features: [
        'Precision 3D-guided surgical placement',
        'High biocompatibility titanium/zirconia posts',
        'Custom ceramic crowns with natural dentin shading',
        'Restores full biting force and prevents bone loss',
      ],
      iconName: 'implants',
    },
    {
      id: 'whitening',
      name: 'Whitening',
      category: 'cosmetic',
      description: 'Advanced medical-grade activation gels paired with cool-wave LED wavelengths to lift deep discoloration comfortably in under an hour.',
      duration: '45 minutes',
      priceEstimate: '$350',
      features: [
        'Rapid, single-visit laser activation',
        'In-built enamel and sensitivity protection',
        'Lifts up to 8 shades of historic stains',
        'Includes premium home maintenance kit',
      ],
      iconName: 'whitening',
    },
    {
      id: 'surgical',
      name: 'Surgical Dentistry',
      category: 'general',
      description: 'State-of-the-art atraumatic micro-surgery for wisdom teeth removal, bone grafting, and clinical extractions designed for rapid healing and zero discomfort.',
      duration: '1-2 sessions',
      priceEstimate: '$450',
      features: [
        'Advanced local anesthesia and optional sedation',
        'Microsurgical precision with accelerated healing protocols',
        'Atraumatic techniques to conserve adjacent bone',
        'Comprehensive digital post-operative monitoring',
      ],
      iconName: 'surgical',
    },
  ];

  // Specialist Medical Experts
  const dentists: Dentist[] = [
    {
      id: 'dr-sanket-aras',
      name: 'Dr. Sanket Aras',
      role: 'Owner, The White Curve',
      specialty: 'BDS | MDS | PhD Scholar',
      experience: '15+ Years',
      bio: 'Endodontist & Aesthetic Dentist, Assistant Professor at D.Y. Patil Dental College & Hospital. Dedicated to precision oral care and advanced smile design.',
      rating: 4.9,
      reviewsCount: 840,
      avatarUrl: drArasImg,
    },
  ];

  // Verified Client Success Stories
  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      name: 'Sophia Sterling',
      age: 29,
      treatmentName: 'Porcelain Veneers',
      quote: 'My porcelain veneers completely transformed my posture and clinical confidence. Dr. Thorne crafted a curve that looks so natural and blends with my eyes and posture perfectly. Pristine, luxury care from start to finish!',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      date: '2026-05-12',
    },
    {
      id: 't-2',
      name: 'Dr. David Mercer',
      age: 34,
      treatmentName: 'Clear Aligners',
      quote: 'As a surgeon, I appreciate precise engineering. Dr. Patel made my aligner pathway entirely seamless. The 3D tracking predictions were completely accurate, and my teeth aligned beautifully in under 6 months.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      date: '2026-06-02',
    },
    {
      id: 't-3',
      name: 'Emma Lindqvist',
      age: 27,
      treatmentName: 'Smile Whitening',
      quote: 'I was amazed by the lack of sensitivity. The in-office LED treatment took only 45 minutes and lifted years of coffee and tea stains. The clinic felt more like an absolute high-end aesthetic lounge than dentistry.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      date: '2026-06-19',
    },
  ];

  // Cases for Before-and-After slider comparison
  const transformations: SmileTransformation[] = [
    {
      id: 'case-1',
      title: 'Full Aesthetic Redesign Case',
      treatment: 'Porcelain Veneers',
      beforeImg: smileBeforeImg,
      afterImg: smileAfterImg,
      details: 'Patient requested restoration for enamel wear, dark coffee staining, and mild gaps. Dr. Thorne planned and completed 8 upper ceramic porcelain veneers, successfully realigning the smile curve and lifting to a vital shade 1.',
    },
    {
      id: 'case-2',
      title: 'Deep Discoloration Correction',
      treatment: 'Medical Smile Whitening',
      beforeImg: smileBeforeImg,
      afterImg: smileAfterImg,
      details: 'Patient wanted an immediate bright boost prior to cosmetic photo shoots. We administered our in-office LED-stimulated cool laser activation gel. Achieved a solid 8-shade lift in a single 45-minute treatment, zero sensitivity reported.',
    },
  ];

  const handleOpenBooking = (treatmentId?: string, dentistId?: string) => {
    if (treatmentId) setPreSelectedTreatmentId(treatmentId);
    if (dentistId) setPreSelectedDentistId(dentistId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreSelectedTreatmentId('');
    setPreSelectedDentistId('');
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white" id="app-root">
      {/* Premium Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Section */}
      <Hero
        onOpenBooking={() => handleOpenBooking()}
        heroImg={heroImg}
      />

      {/* About Us Showcase Section */}
      <About />

      {/* Treatments & Live Price/Financing Estimator Calculator */}
      <Treatments
        treatments={treatments}
        dentists={dentists}
        onOpenBooking={(tid) => handleOpenBooking(tid)}
      />

      {/* Interactive Case Studies Slider */}
      <BeforeAfter />

      {/* Elite Clinical Team */}
      <Specialists
        dentists={dentists}
        onOpenBooking={(tid, did) => handleOpenBooking(tid, did)}
      />

      {/* Patient Stories Slider */}
      <Reviews testimonials={testimonials} />

      {/* Frequently Asked Questions Section */}
      <FAQ />

      {/* Footer Directory & Hours */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Advanced Interactive Scheduler Slider/Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        treatments={treatments}
        dentists={dentists}
        initialTreatmentId={preSelectedTreatmentId}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919172208080"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
        id="floating-whatsapp-btn"
        title="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6.5 h-6.5"
        >
          <path d="M12.004 0C5.38 0 0 5.38 0 12c0 2.112.551 4.165 1.597 5.973L.053 24l6.192-1.624c1.724.94 3.666 1.436 5.751 1.438 6.621 0 12.001-5.38 12.004-12 .002-3.202-1.242-6.213-3.504-8.477C18.232 1.247 15.215.003 12.004 0zm5.952 16.945c-.244.686-1.214 1.258-1.683 1.323-.469.066-.935.127-3.003-.706-2.502-1.008-4.086-3.528-4.21-3.693-.125-.165-1.021-1.356-1.021-2.585 0-1.229.645-1.834.872-2.081.226-.247.495-.309.66-.309.165 0 .33.001.474.007.152.006.356-.057.556.425.206.495.701 1.711.763 1.835.062.124.103.268.021.433-.083.165-.124.268-.247.412-.124.144-.261.32-.371.43-.124.124-.253.259-.11.505.144.247.64 1.053 1.371 1.703.942.84 1.734 1.103 1.981 1.226.248.124.392.103.536-.062.144-.165.62-.722.784-.969.165-.247.33-.206.557-.124.227.082 1.443.68 1.69.804.248.124.413.186.475.289.062.103.062.597-.182 1.283z" />
        </svg>
        
        {/* Premium Tooltip Label */}
        <span className="absolute right-16 bg-brand-navy text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md border border-white/10">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
