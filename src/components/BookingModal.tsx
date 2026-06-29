import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, ChevronRight, ChevronLeft, Check, Phone, Mail, FileText, Barcode, Shield } from 'lucide-react';
import { Treatment, Dentist, BookingState } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatments: Treatment[];
  dentists: Dentist[];
  initialTreatmentId?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  treatments,
  dentists,
  initialTreatmentId = '',
}: BookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingState>({
    treatmentId: initialTreatmentId || (treatments[0]?.id ?? ''),
    dentistId: dentists[0]?.id ?? '',
    date: '',
    timeSlot: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Generate next 14 days starting tomorrow
  const getNextDays = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Skip Tuesdays (Clinic is Closed)
      if (d.getDay() !== 2) {
        days.push({
          fullDate: d.toISOString().split('T')[0],
          dayName: weekdays[d.getDay()],
          dayNum: d.getDate(),
          monthName: months[d.getMonth()],
        });
      }
    }
    return days;
  };

  const availableDays = getNextDays();

  const getTimeSlotsForDate = (dateStr: string) => {
    if (!dateStr) return [];
    // Safely parse local date parts (YYYY-MM-DD)
    const parts = dateStr.split('-');
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const day = d.getDay();
    
    if (day === 0) { // Sunday: 10:00 AM – 02:00 PM, 06:00 PM – 08:00 PM
      return [
        '10:00 AM', '11:15 AM', '12:30 PM', '01:15 PM',
        '06:00 PM', '06:45 PM', '07:30 PM'
      ];
    }
    
    // Monday, Wednesday, Thursday, Friday, Saturday: 05:00 PM – 09:30 PM
    return [
      '05:00 PM', '05:45 PM', '06:30 PM', '07:15 PM', '08:00 PM', '08:45 PM'
    ];
  };

  const handleSelectTreatment = (id: string) => {
    setFormData(prev => ({ ...prev, treatmentId: id }));
  };

  const handleSelectDentist = (id: string) => {
    setFormData(prev => ({ ...prev, dentistId: id }));
  };

  const handleSelectDate = (date: string) => {
    setFormData(prev => {
      const slots = getTimeSlotsForDate(date);
      const isTimeSlotValid = slots.includes(prev.timeSlot);
      return {
        ...prev,
        date,
        timeSlot: isTimeSlotValid ? prev.timeSlot : ''
      };
    });
  };

  const handleSelectTime = (time: string) => {
    setFormData(prev => ({ ...prev, timeSlot: time }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.treatmentId) return;
    if (step === 2 && !formData.dentistId) return;
    if (step === 3 && (!formData.date || !formData.timeSlot)) return;
    
    setErrorMsg('');
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      // Final submission
      if (!formData.name || !formData.email || !formData.phone) {
        setErrorMsg("Please complete all required fields.");
        return;
      }
      
      // Structure the WhatsApp text message
      const treatmentName = selectedTreatment ? selectedTreatment.name : 'Not Specified';
      const dentistName = selectedDentist ? selectedDentist.name : 'Not Specified';
      const formattedNotes = formData.notes.trim() ? formData.notes : 'None';

      const formatDateFriendly = (dateStr: string) => {
        if (!dateStr) return '';
        try {
          const parts = dateStr.split('-');
          const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
          return dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          });
        } catch {
          return dateStr;
        }
      };

      const friendlyDate = formatDateFriendly(formData.date);
      
      const whatsappMessage = 
        `✨ *THE WHITE CURVE* ✨\n` +
        `_Appointment Request Portal_\n\n` +
        `👤 *PATIENT DETAILS*\n` +
        `• *Name:* ${formData.name}\n` +
        `• *Phone:* ${formData.phone}\n` +
        `• *Email:* ${formData.email}\n\n` +
        `📅 *APPOINTMENT DETAILS*\n` +
        `• *Treatment:* ${treatmentName}\n` +
        `• *Specialist:* ${dentistName}\n` +
        `• *Date:* ${friendlyDate}\n` +
        `• *Time Slot:* ${formData.timeSlot}\n\n` +
        `📝 *ADDITIONAL NOTES*\n` +
        `"${formattedNotes}"\n\n` +
        `✉️ _This inquiry was compiled automatically from the web booking portal._`;
        
      const whatsappUrl = `https://wa.me/919303271355?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open structured WhatsApp link in a new tab
      window.open(whatsappUrl, '_blank');

      setBookingConfirmed(true);
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const selectedTreatment = treatments.find(t => t.id === formData.treatmentId);
  const selectedDentist = dentists.find(d => d.id === formData.dentistId);

  const resetForm = () => {
    setStep(1);
    setFormData({
      treatmentId: treatments[0]?.id ?? '',
      dentistId: dentists[0]?.id ?? '',
      date: '',
      timeSlot: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
    });
    setBookingConfirmed(false);
    setErrorMsg('');
  };

  const handleClose = () => {
    onClose();
    // Reset after transition finishes
    setTimeout(() => {
      resetForm();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="booking-system-root">
        {/* Backdrop filter blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-brand-navy to-brand-navy/95 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-brand-sky/20 p-2.5 rounded-xl border border-brand-sky/30">
                <Calendar className="w-5 h-5 text-brand-sky" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">
                  {bookingConfirmed ? "Appointment Confirmed" : "Schedule Your Visit"}
                </h3>
                <p className="text-xs text-blue-100 mt-0.5">
                  {bookingConfirmed ? "Your digital dental ticket" : "The WHITE Curve Premium Dentistry"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              id="close-booking-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          {!bookingConfirmed && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${step >= 1 ? 'bg-brand-sky text-white' : 'bg-gray-200'}`}>1</span>
                <span className={step === 1 ? 'text-brand-navy font-bold' : ''}>Service</span>
              </div>
              <div className="h-0.5 flex-1 mx-3 bg-gray-200">
                <div className="h-full bg-brand-sky transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${step >= 2 ? 'bg-brand-sky text-white' : 'bg-gray-200'}`}>2</span>
                <span className={step === 2 ? 'text-brand-navy font-bold' : ''}>Specialist</span>
              </div>
              <div className="h-0.5 flex-1 mx-3 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${step >= 3 ? 'bg-brand-sky text-white' : 'bg-gray-200'}`}>3</span>
                <span className={step === 3 ? 'text-brand-navy font-bold' : ''}>Time</span>
              </div>
              <div className="h-0.5 flex-1 mx-3 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${step >= 4 ? 'bg-brand-sky text-white' : 'bg-gray-200'}`}>4</span>
                <span className={step === 4 ? 'text-brand-navy font-bold' : ''}>Details</span>
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {bookingConfirmed ? (
                /* LUXURIOUS CONFIRMED BARCODE CARD */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center max-w-md mx-auto"
                  id="booking-success-screen"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-brand-navy text-center">Your Smile Awaits!</h4>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    Your appointment is successfully scheduled. Present this ticket at the reception desk.
                  </p>

                  {/* Digital Ticket */}
                  <div className="w-full mt-6 bg-gradient-to-b from-brand-navy to-brand-navy/95 text-white rounded-2xl shadow-lg border border-brand-sky/20 overflow-hidden relative">
                    {/* Semi-circle punches for ticket styling */}
                    <div className="absolute top-[60%] -left-3 w-6 h-6 bg-white rounded-full" />
                    <div className="absolute top-[60%] -right-3 w-6 h-6 bg-white rounded-full" />
                    
                    {/* Ticket Header */}
                    <div className="p-5 border-b border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-brand-sky font-bold">Appt Ticket</span>
                        <span className="text-sm font-semibold tracking-wide">The WHITE Curve</span>
                      </div>
                      <span className="bg-brand-sky/20 text-brand-sky px-2.5 py-1 rounded-full text-xs font-bold border border-brand-sky/30">
                        Active
                      </span>
                    </div>

                    {/* Ticket Details */}
                    <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                      <div>
                        <span className="text-[10px] text-gray-300 block uppercase font-medium">Patient Name</span>
                        <span className="font-bold">{formData.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-300 block uppercase font-medium">Service</span>
                        <span className="font-bold text-brand-sky truncate block">{selectedTreatment?.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-300 block uppercase font-medium">Specialist</span>
                        <span className="font-bold">{selectedDentist?.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-300 block uppercase font-medium">Date & Time</span>
                        <span className="font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-sky" />
                          {formData.date} - {formData.timeSlot}
                        </span>
                      </div>
                    </div>

                    {/* Ticket Divider Bar */}
                    <div className="px-5 py-2 border-t border-dashed border-white/20 flex items-center justify-between bg-brand-dark">
                      <div className="flex flex-col py-2">
                        <span className="text-[9px] text-gray-400 uppercase font-medium">Booking ID</span>
                        <span className="text-xs font-mono font-bold tracking-wider text-brand-sky">TWC-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </div>
                      <div className="flex flex-col py-2 items-end">
                        <span className="text-[9px] text-gray-400 uppercase font-medium">Est. Price</span>
                        <span className="text-xs font-bold text-white">{selectedTreatment?.priceEstimate}</span>
                      </div>
                    </div>

                    {/* Barcode representation */}
                    <div className="bg-white p-4 flex flex-col items-center justify-center gap-1.5">
                      <Barcode className="w-48 h-10 text-brand-navy" strokeWidth={1} />
                      <span className="text-[9px] font-mono text-gray-400 tracking-widest">
                        *SMILE-CURVE-2026*
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col w-full gap-2">
                    <button
                      onClick={handleClose}
                      className="w-full py-3 bg-brand-sky hover:bg-brand-sky/90 text-white rounded-xl font-semibold transition-all hover:shadow-md text-sm"
                    >
                      Done & Close
                    </button>
                    <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
                      <Shield className="w-3 h-3 text-brand-sky" /> Secure HIPAA compliant booking
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* MULTI STEP WORKFLOW */
                <div className="h-full">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-brand-navy">Choose Specialization</h4>
                        <p className="text-sm text-gray-500">Select the treatment service that fits your smile vision.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="booking-treatments-list">
                        {treatments.map((treatment) => {
                          const isSelected = formData.treatmentId === treatment.id;
                          return (
                            <div
                              key={treatment.id}
                              onClick={() => handleSelectTreatment(treatment.id)}
                              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'border-brand-sky bg-brand-soft/40 shadow-sm'
                                  : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm'
                              }`}
                              id={`booking-treatment-${treatment.id}`}
                            >
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                    treatment.category === 'cosmetic' ? 'bg-amber-100 text-amber-800' :
                                    treatment.category === 'orthodontics' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                                  }`}>
                                    {treatment.category}
                                  </span>
                                  {isSelected && (
                                    <span className="bg-brand-sky text-white p-0.5 rounded-full">
                                      <Check className="w-3.5 h-3.5" />
                                    </span>
                                  )}
                                </div>
                                <h5 className="font-bold text-brand-navy text-sm">{treatment.name}</h5>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{treatment.description}</p>
                              </div>
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs">
                                <span className="text-gray-400 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" /> {treatment.duration}
                                </span>
                                <span className="font-bold text-brand-navy">Est: {treatment.priceEstimate}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-brand-navy">Select a Dental Specialist</h4>
                        <p className="text-sm text-gray-500">Each expert is highly skilled in crafting perfect smiles.</p>
                      </div>

                      <div className="space-y-3" id="booking-dentists-list">
                        {dentists.map((dentist) => {
                          const isSelected = formData.dentistId === dentist.id;
                          return (
                            <div
                              key={dentist.id}
                              onClick={() => handleSelectDentist(dentist.id)}
                              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center gap-4 ${
                                isSelected
                                  ? 'border-brand-sky bg-brand-soft/40 shadow-sm'
                                  : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm'
                              }`}
                              id={`booking-dentist-${dentist.id}`}
                            >
                              <img
                                src={dentist.avatarUrl}
                                alt={dentist.name}
                                referrerPolicy="no-referrer"
                                className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-gray-200 bg-gray-50"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-bold text-brand-navy text-sm">{dentist.name}</h5>
                                  {isSelected && (
                                    <span className="bg-brand-sky text-white p-0.5 rounded-full">
                                      <Check className="w-3.5 h-3.5" />
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-brand-sky font-semibold">{dentist.role}</p>
                                <p className="text-xs text-gray-500 mt-1">{dentist.bio}</p>
                                <div className="flex gap-4 mt-2 text-[10px] text-gray-400 font-medium">
                                  <span>Experience: <strong className="text-gray-600">{dentist.experience}</strong></span>
                                  <span>★ {dentist.rating} ({dentist.reviewsCount} reviews)</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-brand-navy">Choose Date & Time</h4>
                        <p className="text-sm text-gray-500">Pick a convenient time slot for your appointment.</p>
                      </div>

                      {/* Date Horizontal Carousel */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">Available Dates</label>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="booking-dates-slider">
                          {availableDays.map((day) => {
                            const isSelected = formData.date === day.fullDate;
                            return (
                              <button
                                key={day.fullDate}
                                type="button"
                                onClick={() => handleSelectDate(day.fullDate)}
                                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 text-center min-w-[70px] shrink-0 transition-all ${
                                  isSelected
                                    ? 'bg-brand-sky border-brand-sky text-white shadow-md'
                                    : 'border-gray-100 hover:border-gray-200 bg-white text-gray-700'
                                }`}
                                id={`booking-date-${day.fullDate}`}
                              >
                                <span className={`text-[10px] font-bold ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                                  {day.dayName}
                                </span>
                                <span className="text-lg font-extrabold leading-none my-1">{day.dayNum}</span>
                                <span className={`text-[9px] uppercase tracking-wide font-medium ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                                  {day.monthName}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots Grid */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-navy uppercase tracking-wider block">Available Slots</label>
                        {!formData.date ? (
                          <div className="p-4 bg-gray-50 rounded-2xl text-center text-xs text-gray-400">
                            Please select a date first to view active slots.
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="booking-timeslots-grid">
                            {getTimeSlotsForDate(formData.date).map((time) => {
                              const isSelected = formData.timeSlot === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => handleSelectTime(time)}
                                  className={`py-3 px-2 rounded-xl text-xs font-semibold text-center border-2 transition-all ${
                                    isSelected
                                      ? 'border-brand-sky bg-brand-soft/40 text-brand-sky font-bold'
                                      : 'border-gray-100 hover:border-gray-200 text-gray-600 bg-white'
                                  }`}
                                  id={`booking-slot-${time.replace(/[: ]/g, '-')}`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-brand-navy">Personal Details</h4>
                        <p className="text-sm text-gray-500">We will send confirmation details and reminders to this address.</p>
                      </div>

                      <div className="space-y-3" id="booking-form-fields">
                        <div>
                          <label className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1 block">Your Full Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Sophia Miller"
                              required
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky text-gray-800 transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1 block">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="sophia@example.com"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky text-gray-800 transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1 block">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+91 98765 43210"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky text-gray-800 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1 block">Notes / Special Requests (Optional)</label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                            <textarea
                              name="notes"
                              value={formData.notes}
                              onChange={handleInputChange}
                              placeholder="Any previous dental history, preferences, or details about your smile goal..."
                              rows={3}
                              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky/20 focus:border-brand-sky text-gray-800 transition-all resize-none"
                            />
                          </div>
                        </div>

                        {errorMsg && (
                          <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in" id="booking-error-msg">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                            <span>{errorMsg}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          {!bookingConfirmed && (
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={step === 1}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  step === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-brand-navy hover:bg-gray-200'
                }`}
                id="booking-prev-btn"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-brand-sky hover:bg-brand-sky/90 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                id="booking-next-btn"
              >
                {step === 4 ? "Confirm Appointment" : "Continue"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
