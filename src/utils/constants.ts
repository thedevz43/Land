// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Indian States and Districts
export const INDIAN_STATES = [
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TS', name: 'Telangana' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'WB', name: 'West Bengal' },
  { code: 'KL', name: 'Kerala' },
  { code: 'BR', name: 'Bihar' },
  { code: 'OR', name: 'Odisha' },
  { code: 'PB', name: 'Punjab' },
  { code: 'HR', name: 'Haryana' },
] as const;

export const DISTRICTS_BY_STATE: Record<string, string[]> = {
  'TS': ['Hyderabad', 'Rangareddy', 'Medchal', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Nalgonda'],
  'KA': ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Mangaluru', 'Hubli-Dharwad', 'Belagavi', 'Kalaburagi', 'Davanagere'],
  'AP': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Kurnool', 'Kadapa', 'Anantapur'],
  'TN': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli', 'Erode', 'Vellore'],
  'MH': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Kolhapur', 'Solapur'],
  'UP': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Meerut', 'Ghaziabad', 'Noida'],
};

export const TALUKS_BY_DISTRICT: Record<string, string[]> = {
  'Hyderabad': ['Secunderabad', 'Charminar', 'Khairatabad', 'Musheerabad', 'Nampally'],
  'Rangareddy': ['Chevella', 'Rajendranagar', 'Shamshabad', 'Ibrahimpatnam', 'Maheshwaram'],
  'Bengaluru Urban': ['Bengaluru North', 'Bengaluru South', 'Bengaluru East', 'Anekal', 'Yelahanka'],
  'Mysuru': ['Mysuru', 'Nanjangud', 'T. Narasipura', 'K.R. Nagar', 'Hunsur'],
};

// User Roles
export const USER_ROLES = {
  CITIZEN: 'citizen',
  OFFICER: 'officer',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Mutation Status
export const MUTATION_STATUS = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Date Formatting
export const formatIndianDate = (date: Date | string): string => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

// Currency Formatting
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Survey Number Format
export const formatSurveyNumber = (surveyNo: string, subDivision?: string): string => {
  return subDivision ? `${surveyNo}/${subDivision}` : surveyNo;
};
