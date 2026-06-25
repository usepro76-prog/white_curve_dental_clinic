export interface Treatment {
  id: string;
  name: string;
  category: 'cosmetic' | 'orthodontics' | 'general' | 'restorative';
  description: string;
  duration: string;
  priceEstimate: string;
  features: string[];
  iconName: string;
}

export interface Dentist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
}

export interface BookingState {
  treatmentId: string;
  dentistId: string;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  treatmentName: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  date: string;
}

export interface SmileTransformation {
  id: string;
  title: string;
  treatment: string;
  beforeImg: string;
  afterImg: string;
  details: string;
}
