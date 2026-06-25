import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'treatments' | 'recovery' | 'hygiene' | 'general';
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'treatments' | 'recovery' | 'hygiene' | 'general'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'treatments', label: 'Treatments', icon: BookOpen },
    { id: 'recovery', label: 'Recovery & Comfort', icon: Clock },
    { id: 'hygiene', label: 'Dental Hygiene', icon: Heart },
  ] as const;

  const faqData: FAQItem[] = [
    {
      category: 'treatments',
      question: 'What are ultra-thin porcelain veneers, and how long do they last?',
      answer: 'Ultra-thin porcelain veneers are custom-crafted, microscopic shells bonded to the front of your teeth to correct gaps, chips, and discoloration. Because they require minimal to zero enamel preparation, your natural tooth structure is preserved. With pristine hygiene and regular clinical checkups, porcelain veneers typically last 10 to 15+ years.',
    },
    {
      category: 'treatments',
      question: 'Am I a candidate for clear orthodontic aligners?',
      answer: 'Clear aligners are ideal for correcting mild to moderate dental crowding, spacing, and minor bite alignment issues. During your initial high-precision 3D scan, we map out your biological jaw kinematics to ensure that clear aligners will yield perfect aesthetic and structural results. For extremely severe skeletal corrections, alternative solutions may be proposed.',
    },
    {
      category: 'recovery',
      question: 'What is the recovery process like after receiving a dental implant?',
      answer: 'Our computer-guided implantology is minimally invasive, ensuring high precision and rapid healing. Most patients experience only minor pressure or a dull ache for 2 to 3 days post-surgery, which is easily managed with mild over-the-counter pain relief. The underlying bone integration (osseointegration) takes 3 to 6 months, after which your final bespoke zirconia crown is permanently placed.',
    },
    {
      category: 'recovery',
      question: 'Is professional laser teeth whitening safe for sensitive enamel?',
      answer: 'Absolutely. We utilize advanced cool-LED laser technology coupled with a protective gingival barrier that insulates your sensitive gums. The whitening compound is calibrated to break down stains without penetrating the inner pulp or damaging the enamel crystalline structure. We also perform a post-treatment remineralization process to prevent sensitivity entirely.',
    },
    {
      category: 'hygiene',
      question: 'How often should I get a professional clinical cleaning?',
      answer: 'We recommend a professional clinical cleaning and comprehensive digital diagnostic exam every 6 months. Patients with active periodontal therapy history or those prone to rapid plaque accumulation may benefit from custom intervals of every 3 to 4 months to prevent bone loss and keep breath perfectly fresh.',
    },
    {
      category: 'hygiene',
      question: 'What is the best daily brushing and flossing routine to maintain aesthetic restorations?',
      answer: 'To preserve porcelain veneers or crowns, brush twice daily using a soft-bristled manual or sonic toothbrush and a low-abrasive gel toothpaste (avoid harsh whitening toothpastes containing silica). Clean between teeth daily using premium dental floss or an oral irrigator (water flosser). Regular care prevents margins from developing stains or secondary decay.',
    },
    {
      category: 'general',
      question: 'Does the clinic offer digital dental smile previews before starting treatments?',
      answer: 'Yes, clinical digital smile design is a cornerstone of our practice. Before starting cosmetic veneers or orthodontic alignment, we capture high-definition photographs and digital scans. We then build an interactive 3D smile preview so you can see your final shape, shade, and alignment on your own portrait before we begin.',
    },
    {
      category: 'general',
      question: 'What should I do in the event of a dental emergency, like a chipped restoration?',
      answer: 'Contact our concierge clinical desk immediately. We set aside daily emergency triage slots to address fractured teeth, lost restorations, or acute dental discomfort on the same day. For off-hours, we provide clear instructions for provisional care to keep your smile safe until you arrive.',
    }
  ];

  // Filter and search logic
  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-b border-gray-100 relative overflow-hidden animate-fade-in" id="faq">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Category Badge & Heading */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#255694] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50">
            <Sparkles className="w-3.5 h-3.5" /> Support Center
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e3a8a] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Find immediate, scientifically-backed answers regarding our modern clinical treatments, rapid recovery protocols, and routine hygiene care.
          </p>
        </div>

        {/* Live Search & Filter Panel */}
        <div className="space-y-6 mb-10">
          {/* Elegant Search Input */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search treatments, recovery times, hygiene..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null); // Reset open accordion on search
              }}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 focus:border-[#255694] focus:ring-1 focus:ring-[#255694] rounded-2xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all shadow-sm"
              id="faq-search-input"
            />
          </div>

          {/* Horizontal category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null); // Reset open accordion on category swap
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isActive
                      ? 'bg-[#255694] border-[#255694] text-white shadow-sm shadow-blue-900/15'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-[#1e3a8a]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen 
                        ? 'border-[#255694]/30 shadow-md ring-1 ring-[#255694]/5' 
                        : 'border-gray-200/80 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-5 text-left gap-4 outline-none group focus:bg-slate-50/50"
                      aria-expanded={isOpen}
                      id={`faq-toggle-${index}`}
                    >
                      <span className="text-sm sm:text-base font-extrabold text-[#1e3a8a] leading-snug group-hover:text-[#008ED6] transition-colors">
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen ? 'bg-blue-50 text-[#255694] rotate-180' : 'bg-slate-100/80 text-gray-400 group-hover:bg-slate-100 group-hover:text-gray-600'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200"
              >
                <HelpCircle className="w-8 h-8 text-gray-300 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-bold text-gray-500">No matching questions found.</p>
                <p className="text-xs text-gray-400 mt-1">Try clearing your filters or search keywords.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Have a different question?
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Our patient coordinators are here for you.{' '}
            <a href="#footer" className="text-[#255694] hover:text-[#008ED6] font-extrabold underline decoration-2 underline-offset-4 transition-colors">
              Get in touch directly
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
