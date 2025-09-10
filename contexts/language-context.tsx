"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Language translations
const translations = {
  en: {
    // Navigation & Common
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",

    // Landing Page
    heroTitle: "Smart Tourist Safety Monitoring & Incident Response System",
    heroSubtitle: "AI + Blockchain + Geo-Fencing for Safe & Secure Travel",
    getStarted: "Get Started",
    learnMore: "Learn More",
    features: "Features",
    howItWorks: "How It Works",
    stats: "Stats",

    // Problem Statement
    problemTitle: "Solving India's Tourism Safety Challenge",
    problemDescription:
      "Tourism is the heartbeat of India's economy, but safety challenges in remote and high-risk areas remain unsolved. Our solution provides real-time monitoring, rapid response, and secure digital ID verification for tourists.",

    // Stats
    statsTitle: "Live Impact Statistics",
    statsDescription: "Real-time data from our safety monitoring system",
    touristsProtected: "Tourists Protected",
    alertsProcessed: "Safety Alerts Processed",
    authoritiesConnected: "Authorities Connected",

    // Dashboard
    safetyScore: "Safety Score",
    geoFencingAlerts: "Geo-Fencing Alerts",
    liveLocation: "Live Location",
    recentNotifications: "Recent Notifications",
    digitalId: "Digital Tourist ID",
    travelItinerary: "Travel Itinerary",
    safetyAlerts: "Safety Alerts",

    // Authentication
    welcomeBack: "Welcome Back",
    createAccount: "Create Your Account",
    continueWith: "Continue with",
    faceRecognition: "Face Recognition",
    email: "Email",
    password: "Password",
    phone: "Phone",
    fullName: "Full Name",
    emergencyContact: "Emergency Contact",

    // Police Dashboard
    commandCenter: "Command Center",
    realTimeTracking: "Real-time Tourist Tracking",
    activeAlerts: "Active Alerts",
    touristDetails: "Tourist Details",
    generateEFIR: "Generate E-FIR",
    totalTourists: "Total Tourists",
    emergencyCalls: "Emergency Calls",
    responseTime: "Response Time",
  },
  hi: {
    // Navigation & Common
    login: "लॉगिन",
    signup: "साइन अप",
    dashboard: "डैशबोर्ड",
    settings: "सेटिंग्स",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",

    // Landing Page
    heroTitle: "स्मार्ट पर्यटक सुरक्षा निगरानी और घटना प्रतिक्रिया प्रणाली",
    heroSubtitle: "सुरक्षित यात्रा के लिए AI + ब्लॉकचेन + जियो-फेंसिंग",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    features: "विशेषताएं",
    howItWorks: "यह कैसे काम करता है",
    stats: "आंकड़े",

    // Problem Statement
    problemTitle: "भारत की पर्यटन सुरक्षा चुनौती का समाधान",
    problemDescription:
      "पर्यटन भारत की अर्थव्यवस्था की धड़कन है, लेकिन दूरदराज और उच्च जोखिम वाले क्षेत्रों में सुरक्षा चुनौतियां अनसुलझी रह जाती हैं। हमारा समाधान पर्यटकों के लिए वास्तविक समय निगरानी, त्वरित प्रतिक्रिया और सुरक्षित डिजिटल आईडी सत्यापन प्रदान करता है।",

    // Stats
    statsTitle: "लाइव प्रभाव आंकड़े",
    statsDescription: "हमारी सुरक्षा निगरानी प्रणाली से वास्तविक समय डेटा",
    touristsProtected: "संरक्षित पर्यटक",
    alertsProcessed: "सुरक्षा अलर्ट संसाधित",
    authoritiesConnected: "जुड़े अधिकारी",

    // Dashboard
    safetyScore: "सुरक्षा स्कोर",
    geoFencingAlerts: "जियो-फेंसिंग अलर्ट",
    liveLocation: "लाइव स्थान",
    recentNotifications: "हाल की सूचनाएं",
    digitalId: "डिजिटल पर्यटक आईडी",
    travelItinerary: "यात्रा कार्यक्रम",
    safetyAlerts: "सुरक्षा अलर्ट",

    // Authentication
    welcomeBack: "वापस स्वागत है",
    createAccount: "अपना खाता बनाएं",
    continueWith: "के साथ जारी रखें",
    faceRecognition: "चेहरा पहचान",
    email: "ईमेल",
    password: "पासवर्ड",
    phone: "फोन",
    fullName: "पूरा नाम",
    emergencyContact: "आपातकालीन संपर्क",

    // Police Dashboard
    commandCenter: "कमांड सेंटर",
    realTimeTracking: "वास्तविक समय पर्यटक ट्रैकिंग",
    activeAlerts: "सक्रिय अलर्ट",
    touristDetails: "पर्यटक विवरण",
    generateEFIR: "ई-एफआईआर जेनरेट करें",
    totalTourists: "कुल पर्यटक",
    emergencyCalls: "आपातकालीन कॉल",
    responseTime: "प्रतिक्रिया समय",
  },
  bn: {
    // Navigation & Common
    login: "লগইন",
    signup: "সাইন আপ",
    dashboard: "ড্যাশবোর্ড",
    settings: "সেটিংস",
    profile: "প্রোফাইল",
    logout: "লগআউট",

    // Landing Page
    heroTitle: "স্মার্ট পর্যটক নিরাপত্তা পর্যবেক্ষণ ও ঘটনা প্রতিক্রিয়া সিস্টেম",
    heroSubtitle: "নিরাপদ ভ্রমণের জন্য AI + ব্লকচেইন + জিও-ফেন্সিং",
    getStarted: "শুরু করুন",
    learnMore: "আরও জানুন",
    features: "বৈশিষ্ট্য",
    howItWorks: "এটি কীভাবে কাজ করে",
    stats: "পরিসংখ্যান",
  },
  ta: {
    // Navigation & Common
    login: "உள்நுழைய",
    signup: "பதிவு செய்க",
    dashboard: "டாஷ்போர்டு",
    settings: "அமைப்புகள்",
    profile: "சுயவிவரம்",
    logout: "வெளியேறு",

    // Landing Page
    heroTitle: "ஸ்மார்ட் சுற்றுலா பாதுகாப்பு கண்காணிப்பு மற்றும் சம்பவ பதில் அமைப்பு",
    heroSubtitle: "பாதுகாப்பான பயணத்திற்கு AI + பிளாக்செயின் + ஜியோ-ஃபென்சிங்",
    getStarted: "தொடங்குங்கள்",
    learnMore: "மேலும் அறிக",
    features: "அம்சங்கள்",
    howItWorks: "இது எப்படி வேலை செய்கிறது",
    stats: "புள்ளிவிவரங்கள்",
  },
  te: {
    // Navigation & Common
    login: "లాగిన్",
    signup: "సైన్ అప్",
    dashboard: "డాష్‌బోర్డ్",
    settings: "సెట్టింగులు",
    profile: "ప్రొఫైల్",
    logout: "లాగ్ అవుట్",

    // Landing Page
    heroTitle: "స్మార్ట్ టూరిస్ట్ సేఫ్టీ మానిటరింగ్ & ఇన్సిడెంట్ రెస్పాన్స్ సిస్టమ్",
    heroSubtitle: "సురక్షిత ప్రయాణం కోసం AI + బ్లాక్‌చెయిన్ + జియో-ఫెన్సింగ్",
    getStarted: "ప్రారంభించండి",
    learnMore: "మరింత తెలుసుకోండి",
    features: "లక్షణాలు",
    howItWorks: "ఇది ఎలా పని చేస్తుంది",
    stats: "గణాంకాలు",
  },
  mr: {
    // Navigation & Common
    login: "लॉगिन",
    signup: "साइन अप",
    dashboard: "डॅशबोर्ड",
    settings: "सेटिंग्स",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",

    // Landing Page
    heroTitle: "स्मार्ट पर्यटक सुरक्षा निरीक्षण आणि घटना प्रतिसाद प्रणाली",
    heroSubtitle: "सुरक्षित प्रवासासाठी AI + ब्लॉकचेन + जिओ-फेन्सिंग",
    getStarted: "सुरुवात करा",
    learnMore: "अधिक जाणून घ्या",
    features: "वैशिष्ट्ये",
    howItWorks: "हे कसे कार्य करते",
    stats: "आकडेवारी",
  },
  gu: {
    // Navigation & Common
    login: "લોગિન",
    signup: "સાઇન અપ",
    dashboard: "ડેશબોર્ડ",
    settings: "સેટિંગ્સ",
    profile: "પ્રોફાઇલ",
    logout: "લોગઆઉટ",

    // Landing Page
    heroTitle: "સ્માર્ટ પર્યટક સુરક્ષા મોનિટરિંગ અને ઘટના પ્રતિસાદ સિસ્ટમ",
    heroSubtitle: "સુરક્ષિત મુસાફરી માટે AI + બ્લોકચેન + જિયો-ફેન્સિંગ",
    getStarted: "શરૂ કરો",
    learnMore: "વધુ જાણો",
    features: "લક્ષણો",
    howItWorks: "આ કેવી રીતે કામ કરે છે",
    stats: "આંકડા",
  },
  kn: {
    // Navigation & Common
    login: "ಲಾಗಿನ್",
    signup: "ಸೈನ್ ಅಪ್",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    profile: "ಪ್ರೊಫೈಲ್",
    logout: "ಲಾಗ್ ಔಟ್",

    // Landing Page
    heroTitle: "ಸ್ಮಾರ್ಟ್ ಪ್ರವಾಸಿ ಸುರಕ್ಷತೆ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಘಟನೆ ಪ್ರತಿಕ್ರಿಯೆ ವ್ಯವಸ್ಥೆ",
    heroSubtitle: "ಸುರಕ್ಷಿತ ಪ್ರಯಾಣಕ್ಕಾಗಿ AI + ಬ್ಲಾಕ್‌ಚೈನ್ + ಜಿಯೋ-ಫೆನ್ಸಿಂಗ್",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    stats: "ಅಂಕಿಅಂಶಗಳು",
  },
  ml: {
    // Navigation & Common
    login: "ലോഗിൻ",
    signup: "സൈൻ അപ്പ്",
    dashboard: "ഡാഷ്‌ബോർഡ്",
    settings: "ക്രമീകരണങ്ങൾ",
    profile: "പ്രൊഫൈൽ",
    logout: "ലോഗ് ഔട്ട്",

    // Landing Page
    heroTitle: "സ്മാർട്ട് ടൂറിസ്റ്റ് സേഫ്റ്റി മോണിറ്ററിംഗ് & ഇൻസിഡന്റ് റെസ്പോൺസ് സിസ്റ്റം",
    heroSubtitle: "സുരക്ഷിത യാത്രയ്ക്കായി AI + ബ്ലോക്ക്‌ചെയിൻ + ജിയോ-ഫെൻസിംഗ്",
    getStarted: "ആരംഭിക്കുക",
    learnMore: "കൂടുതൽ അറിയുക",
    features: "സവിശേഷതകൾ",
    howItWorks: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    stats: "സ്ഥിതിവിവരക്കണക്കുകൾ",
  },
  or: {
    // Navigation & Common
    login: "ଲଗଇନ୍",
    signup: "ସାଇନ୍ ଅପ୍",
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    settings: "ସେଟିଂସ",
    profile: "ପ୍ରୋଫାଇଲ୍",
    logout: "ଲଗଆଉଟ୍",

    // Landing Page
    heroTitle: "ସ୍ମାର୍ଟ ପର୍ଯ୍ୟଟକ ସୁରକ୍ଷା ମନିଟରିଂ ଏବଂ ଘଟଣା ପ୍ରତିକ୍ରିୟା ସିଷ୍ଟମ୍",
    heroSubtitle: "ସୁରକ୍ଷିତ ଯାତ୍ରା ପାଇଁ AI + ବ୍ଲକଚେନ୍ + ଜିଓ-ଫେନ୍ସିଂ",
    getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    learnMore: "ଅଧିକ ଜାଣନ୍ତୁ",
    features: "ବିଶେଷତା",
    howItWorks: "ଏହା କିପରି କାମ କରେ",
    stats: "ପରିସଂଖ୍ୟାନ",
  },
}

type Language = keyof typeof translations
type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
  availableLanguages: { code: Language; name: string; nativeName: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const availableLanguages = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn" as Language, name: "Bengali", nativeName: "বাংলা" },
  { code: "ta" as Language, name: "Tamil", nativeName: "தமிழ்" },
  { code: "te" as Language, name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr" as Language, name: "Marathi", nativeName: "मराठी" },
  { code: "gu" as Language, name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn" as Language, name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml" as Language, name: "Malayalam", nativeName: "മലയാളം" },
  { code: "or" as Language, name: "Odia", nativeName: "ଓଡ଼ିଆ" },
]

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem("preferred-language", language)
  }, [language])

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
