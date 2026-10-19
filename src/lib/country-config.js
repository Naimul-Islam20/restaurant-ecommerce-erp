/** Countries offered in the header selector, in display order. */
export const COUNTRY_OPTIONS = {
  BD: { code: "BD", label: "Bangladesh", flag: "🇧🇩", dialCode: "880", phoneMaxLength: 10 },
  IN: { code: "IN", label: "India", flag: "🇮🇳", dialCode: "91", phoneMaxLength: 10 },
  PK: { code: "PK", label: "Pakistan", flag: "🇵🇰", dialCode: "92", phoneMaxLength: 10 },
  NP: { code: "NP", label: "Nepal", flag: "🇳🇵", dialCode: "977", phoneMaxLength: 10 },
  AE: { code: "AE", label: "United Arab Emirates", flag: "🇦🇪", dialCode: "971", phoneMaxLength: 9 },
  SA: { code: "SA", label: "Saudi Arabia", flag: "🇸🇦", dialCode: "966", phoneMaxLength: 9 },
  QA: { code: "QA", label: "Qatar", flag: "🇶🇦", dialCode: "974", phoneMaxLength: 8 },
  KW: { code: "KW", label: "Kuwait", flag: "🇰🇼", dialCode: "965", phoneMaxLength: 8 },
  OM: { code: "OM", label: "Oman", flag: "🇴🇲", dialCode: "968", phoneMaxLength: 8 },
  MY: { code: "MY", label: "Malaysia", flag: "🇲🇾", dialCode: "60", phoneMaxLength: 10 },
  SG: { code: "SG", label: "Singapore", flag: "🇸🇬", dialCode: "65", phoneMaxLength: 8 },
  GB: { code: "GB", label: "United Kingdom", flag: "🇬🇧", dialCode: "44", phoneMaxLength: 10 },
  US: { code: "US", label: "United States", flag: "🇺🇸", dialCode: "1", phoneMaxLength: 10 },
  CA: { code: "CA", label: "Canada", flag: "🇨🇦", dialCode: "1", phoneMaxLength: 10 },
  AU: { code: "AU", label: "Australia", flag: "🇦🇺", dialCode: "61", phoneMaxLength: 9 },
  IT: { code: "IT", label: "Italy", flag: "🇮🇹", dialCode: "39", phoneMaxLength: 10 },
};

export const COUNTRY_LIST = Object.values(COUNTRY_OPTIONS);

export const COUNTRY_CITIES = {
  BD: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"],
  IN: ["Kolkata", "Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"],
  PK: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"],
  NP: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"],
  AE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
  SA: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  QA: ["Doha", "Al Wakrah", "Al Khor"],
  KW: ["Kuwait City", "Hawalli", "Salmiya", "Farwaniya"],
  OM: ["Muscat", "Salalah", "Sohar", "Nizwa"],
  MY: ["Kuala Lumpur", "Penang", "Johor Bahru", "Shah Alam"],
  SG: ["Singapore"],
  GB: ["London", "Birmingham", "Manchester", "Bradford", "Leeds"],
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Detroit"],
  CA: ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  IT: ["Rome", "Milan", "Venice", "Naples"],
};

export function isCountryCode(code) {
  return Object.hasOwn(COUNTRY_OPTIONS, code);
}

export function getCountryConfig(code) {
  return COUNTRY_OPTIONS[code] ?? COUNTRY_OPTIONS.BD;
}
