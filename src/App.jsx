import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MessageSquare, MapPin, Calendar, Clock, Award, ShieldCheck, 
  Sparkles, Star, Activity, HeartPulse, CheckCircle2, 
  Zap, Compass, User, Play, X, Menu, ArrowRight, ExternalLink, ChevronRight, Shield, Check, Globe,
  TrendingUp, RefreshCw, Feather, Smile, Moon, Users, Sun, ArrowLeft, ThumbsUp, MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

function AnimatedCounter({ targetNumber, suffix = "", decimals = 0, duration = 3000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * targetNumber);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, targetNumber, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'reviews'
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: 'Varmakalai Therapy',
    location: 'Salem Clinic',
    date: '',
    message: ''
  });

  const PHONE_NUMBER = "8838631454";
  const WHATSAPP_LINK = `https://wa.me/918838631454?text=Hello%20Mahas%20Varma%20%26%20Spine%20Care,%20I%20want%20to%20book%20an%20appointment.`;
  const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Mahas+varma+and+spine+care%E2%84%A2/@11.6970391,78.1746558,17z/data=!4m8!3m7!1s0x3babf185b9b15d5f:0xc047139a038d31d2!8m2!3d11.6970391!4d78.1746558!9m1!1b1!16s%2Fg%2F11sbyp3j_z?entry=ttu";

  const googleReviewsData = [
    {
      name: "Janani",
      details: "1 review · 1 photo",
      time: "3 months ago",
      stars: 5,
      comment: "I recommend vithiyar 'Elavarasan' for their exceptional work in Varma Thokkanam for Face and Head. His deep knowledge of traditional techniques is absolutely appreciable. He applies a perfect varma points to release deep seated tension. After a session of Face and Head Thokkanam I felt an incredible sense of clarity, facial relaxation and energy flow. Reduced tension, headache, and stress!",
      response: "Thanks mam 😊"
    },
    {
      name: "Gowri Shankar",
      details: "7 reviews",
      time: "3 months ago",
      stars: 5,
      comment: "I had a sprained neck and frozen shoulder which was unresolved for many years despite several treatments. Dr. Elavarasan has sorted out the issue superbly. He has the ability to analyse the problem and execute the solution with magic hands. Neck is a very sensitive part of the body and he cured me. Just trust him!",
      response: "Thank you so much sir"
    },
    {
      name: "Venkatalakshmi Gopal",
      details: "1 review",
      time: "6 months ago",
      stars: 5,
      comment: "I was suffering from L5 S1 disc bulge years of pain on my lower back with numbness in legs. I visited Dr. Elavarasan for treatment. After a few sessions of therapy I am pain free walking properly and able to do my daily activities. His expertise in Varma therapy has given me a new lease on life.",
      response: null
    },
    {
      name: "Dr. S.S. Gomathi",
      details: "2 reviews",
      time: "9 months ago",
      stars: 5,
      comment: "Heartfelt thanks to doctor Mr. Elavarasan, for the Varma treatment. I approached him for severe C3 and C4 disc prolapse problem in chronic stage. The treatment was very effective and the results have been very satisfying.",
      response: "Thank you Mam 😊"
    },
    {
      name: "Abinaya",
      details: "3 reviews",
      time: "9 months ago",
      stars: 5,
      comment: "Struggling with ankle and foot pain for a while. Dr. Elavarasan sir was so precise, and I could feel the difference immediately. The pain reduced, and my foot feels stronger now. Highly recommended ❤️",
      response: "Thank you so much sister 😊❤️"
    },
    {
      name: "Jagadish Thilagar",
      details: "10 reviews · 1 photo",
      time: "7 months ago",
      stars: 5,
      comment: "My migraine issue was resolved after visiting Maha’s Varma and Spine Care. He treated me effectively by identifying the right nerve and addressing it with great care.",
      response: "Thank you so much"
    },
    {
      name: "Dhivya Sathishkumar",
      details: "Local Guide · 29 reviews",
      time: "a year ago",
      stars: 5,
      comment: "Apollo surgeon suggested emergency surgery for my c6 c7 disc bulge costing 5L. Came to Elavarasan sir, from day 1 pain reduced. By 11th day, whole upper back fixed! Saved me from surgery. Miracle improvement in 10 days!",
      response: null
    },
    {
      name: "M I",
      details: "Local Guide · 12 reviews (Japanese Patient)",
      time: "2 months ago",
      stars: 5,
      comment: "Dr. Elavarasan's treatment was wonderful. The pressure was just right, and he was considerate enough to make sure it wasn't too painful. Thank you very much 😊",
      response: "Thank you 🙏mam"
    }
  ];

  const images = {
    logo: "/logo.jpg",
    hero: "/1 img.jpg",
    landmark: "/landmark img.jpg",
    celebrating1: "/celebrating imag.jpg",
    celebrating2: "/celebrati img 2.jpg",
    celebrating3: "/cleebratie img 3.jpg",
    img2: "/img 2.jpg",
    img3: "/3.jpg",
    img4: "/4.jpg",
    img5: "/5.jpg",
    img6: "/6.jpg",
    img7: "/7.jpg",
    img8: "/8.jpg",
    img9: "/9.jpg",
    img10: "/10.jpg",
    photo1: "/1.jpeg",
    photo2: "/2.jpeg",
    photo3: "/3.jpeg",
    photo4: "/4.jpeg",
    fullBodyThokkanam: "/full_body_thokkanam_v2.png",
    l4l5s1BackPain: "/l4_l5_s1_back_pain.png",
    faceHeadThokkanam: "/face_head_varma_thokkanam.png",
    cervicalNeckPain: "/cervical_neck_pain.png",
    sciaticaRelief: "/sciatica_relief.png",
    migraineHeadache: "/migraine_headache.png",
    kneePainTherapy: "/knee_pain_therapy.png"
  };

  const videos = [
    { title: "Varmakalai Vital Pressure Point Session", src: "/vedio 1.mp4", tag: "Varmakalai" },
    { title: "Spine Realignment & Bone Setting", src: "/vedio 2.mp4", tag: "Spine Care" },
    { title: "Head & Face Thokkanam Massage", src: "/vedio 3.mp4", tag: "Thokkanam" },
    { title: "Facial Points Pressure Rejuvenation", src: "/vedio 4.mp4", tag: "Facial Care" }
  ];

  const services = [
    {
      title: "Cervical & Neck Pain",
      subtitle: "Spine & Neck Care",
      desc: "Traditional Varma therapy techniques focused on neck stiffness, cervical discomfort, and mobility support.",
      image: images.cervicalNeckPain,
      benefits: ["Nerve pressure release", "Restores neck mobility", "Relieves shoulder stiffness", "Reduces radiating pain"]
    },
    {
      title: "L4–L5–S1 Back Pain",
      subtitle: "Spine & Disc Care",
      desc: "Traditional therapy approaches for lower back discomfort, lumbar stiffness, and mobility support.",
      image: images.l4l5s1BackPain,
      benefits: ["Supports lower back mobility", "Lower back stabilization", "Supports comfortable movement", "Non-surgical therapy approach"]
    },
    {
      title: "Sciatica Relief",
      subtitle: "Nerve Entrapment Therapy",
      desc: "Targeted Varma point therapy releasing sciatic nerve entrapment, shooting leg pain, and walking discomfort.",
      image: images.sciaticaRelief,
      benefits: ["Targeted pressure-point therapy", "Supports pain management", "Supports walking comfort", "Muscle relaxation"]
    },
    {
      title: "Whole Spine Pain & Stiffness",
      subtitle: "Full Spinal Alignment",
      desc: "Traditional spine-focused therapy supporting posture, flexibility, and comfortable movement.",
      image: images.img10 || "/10.jpg",
      benefits: ["Posture and mobility support", "Spinal flexibility support", "Muscle tension relief", "Comfort-focused care"]
    },
    {
      title: "Migraine & Headache",
      subtitle: "Cranial Nerve Relief",
      desc: "Traditional pressure-point therapy focused on head and neck tension, stress-related discomfort, and headache support.",
      image: images.migraineHeadache,
      benefits: ["Relieves vascular pressure", "Reduces migraine frequency", "Mental clarity & calm", "Eases sinus tension"]
    },
    {
      title: "Knee Pain Therapy",
      subtitle: "Joint & Muscular Care",
      desc: "Traditional Varmakalai-based joint therapy focused on knee comfort, mobility, and muscular relaxation.",
      image: images.kneePainTherapy,
      benefits: ["Eases joint friction", "Strengthens knee ligaments", "Reduces swelling & pain", "Restores stair mobility"]
    },
    {
      title: "Heel Pain & Plantar Support",
      subtitle: "Foot & Tendon Relief",
      desc: "Targeted traditional pressure-point therapy focused on heel discomfort, foot stiffness, and walking comfort.",
      image: images.img8,
      benefits: ["Heel spur pain relief", "Plantar fascia relaxation", "Arch tension reduction", "Comfortable walking"]
    },
    {
      title: "Paralysis & Bell’s Palsy Support",
      subtitle: "Neurological Re-Activation",
      desc: "Supportive traditional therapy for selected neurological and muscular mobility needs, including facial and motor function support.",
      image: images.img9,
      benefits: ["Facial nerve awakening", "Muscle tone restoration", "Enhanced nerve impulse", "Motor function support"]
    },
    {
      title: "Lymphatic Thokkanam Massage",
      subtitle: "Therapeutic Detoxification",
      desc: "Therapeutic manual techniques intended to support comfortable movement, relaxation, and healthy fluid circulation.",
      image: images.img3,
      benefits: ["Supports fluid circulation", "Relaxation support", "Comfort-focused care", "Personalized treatment"]
    },
    {
      title: "Full-Body Varma Thokkanam Massage",
      subtitle: "Holistic 9-Step Healing",
      desc: "Traditional Tamil Siddha-inspired physical touch therapy focused on relaxation, mobility, and general well-being.",
      image: images.fullBodyThokkanam,
      benefits: ["Traditional Varma point techniques", "Deep physical relaxation", "Supports relaxation and well-being", "Supports circulation"]
    },
    {
      title: "Face & Head Varma Thokkanam",
      subtitle: "Cranial & Facial Rejuvenation",
      desc: "Traditional head and face Thokkanam focused on relaxation, facial muscle comfort, and a refreshed feeling.",
      image: images.faceHeadThokkanam,
      benefits: ["Facial nerve relaxation", "Reduces stress & anxiety", "Glow & skin rejuvenation", "Relieves facial tension"]
    },
    {
      title: "Nadi & Head Oil Thokkanam",
      subtitle: "Herbal Oil Therapy",
      desc: "Herbal oil head and traditional Thokkanam therapy focused on relaxation, head comfort, and restful well-being.",
      image: images.img6,
      benefits: ["Relaxation support", "Cooling and soothing sensation", "Stress-relief support", "Promotes restful routines"]
    },
    {
      title: "Neurological & Muscular Pain",
      subtitle: "Specialized Pain Care",
      desc: "Customized Varmakalai therapy for selected muscular discomfort, spasms, nerve-related symptoms, and chronic pain support.",
      image: images.img7,
      benefits: ["Targeted therapy approach", "Supports muscle relaxation", "Customized therapy plan", "Supports comfortable movement"]
    }
  ];

  const benefitsList = [
    { icon: <ShieldCheck className="w-6 h-6 text-emerald-800" />, title: "Pain Management", desc: "Targeting root nerve points for long-term relief." },
    { icon: <Activity className="w-6 h-6 text-teal-700" />, title: "Improved Blood Flow", desc: "Stimulating vascular and lymphatic circulation." },
    { icon: <Feather className="w-6 h-6 text-emerald-800" />, title: "Stress Reduction", desc: "Calming nervous system and mental strain." },
    { icon: <Moon className="w-6 h-6 text-indigo-800" />, title: "Better Sleep Quality", desc: "Supporting relaxation and healthy sleep routines." },
    { icon: <Zap className="w-6 h-6 text-amber-600" />, title: "Increased Mobility", desc: "Easing joint stiffness and muscular tightness." },
    { icon: <Smile className="w-6 h-6 text-emerald-800" />, title: "Mental Relaxation", desc: "Releasing trapped emotional and physical tension." },
    { icon: <Sun className="w-6 h-6 text-amber-600" />, title: "Enhanced Energy Levels", desc: "Unblocking vital Varma energy pathways." },
    { icon: <TrendingUp className="w-6 h-6 text-teal-700" />, title: "Recovery Support", desc: "Supporting mobility, comfort, and overall well-being." }
  ];

  const whyChooseUs = [
    { title: "Experienced Practitioners", desc: "Practitioners with experience in Varmakalai, traditional therapy, and spine-focused care." },
    { title: "Personalized Treatment Plans", desc: "Individualized assessment and therapy plans based on the person’s needs." },
    { title: "Natural Therapy Approaches", desc: "Traditional, non-invasive therapy approaches tailored to individual needs." },
    { title: "Safe Clinical Environment", desc: "A calm, private, and comfort-focused treatment environment." },
    { title: "Modern Facilities", desc: "Combining traditional Tamil healing practices with a modern, organized clinic environment." },
    { title: "Trusted Patient Care", desc: "Patient-focused care across our Salem and Malaysia locations." }
  ];

  const galleryList = [
    { src: images.photo1, category: "Clinic & Patients", title: "Patient Consultation & Varma Therapy" },
    { src: images.photo2, category: "Clinic & Patients", title: "Master Elavarasan Treatment Session" },
    { src: images.photo3, category: "Clinic & Patients", title: "Spine & Varma Care Clinical Practice" },
    { src: images.photo4, category: "Clinic & Patients", title: "Specialized Varma Alignment Session" },
    { src: images.hero, category: "Therapy", title: "Varma Pressure Point Therapy" },
    { src: images.celebrating1, category: "Achievements", title: "Award Recognition & Excellence" },
    { src: images.celebrating2, category: "Achievements", title: "Master Varma Certification" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Format WhatsApp prefilled message with booking details
    const text = `Hello Mahas Varma & Spine Care,%0A%0AI want to book an appointment:%0A• *Name:* ${encodeURIComponent(formData.name)}%0A• *Phone:* ${encodeURIComponent(formData.phone)}%0A• *Treatment:* ${encodeURIComponent(formData.treatment)}%0A• *Location:* ${encodeURIComponent(formData.location)}%0A• *Preferred Date:* ${encodeURIComponent(formData.date)}%0A• *Notes/Details:* ${encodeURIComponent(formData.message || 'None')}`;
    const whatsappUrl = `https://wa.me/918838631454?text=${text}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans selection:bg-emerald-700 selection:text-white">
      
      {/* Top Header Bar */}
      <header className="bg-[#04241c] text-white text-xs py-2.5 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="bg-amber-500 text-slate-950 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider">Luxury Sanctuary</span>
            <span className="text-emerald-200 flex items-center space-x-1.5">
              <img src={images.logo} alt="Mahas Varma & Spine Care logo" className="w-5 h-5 rounded-full object-cover border border-amber-400/50" />
              <span>Mahas Varma & Spine Care • Salem & Agastya Poornalya (Malaysia)</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            {/* GOOGLE REVIEWS TOP BADGE BUTTON - Hidden on Mobile */}
            <button 
              onClick={() => setCurrentView(currentView === 'home' ? 'reviews' : 'home')}
              className="hidden sm:flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-amber-300 font-bold px-3 py-1 rounded-full transition border border-amber-400/40"
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>5.0 ⭐ (23 Reviews)</span>
            </button>
            
            <a href={`tel:${PHONE_NUMBER}`} className="hover:text-amber-300 flex items-center space-x-1 font-bold">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Call: 8838631454</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Glassmorphism Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-amber-200/40 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <a href="#" onClick={() => setCurrentView('home')} className="flex items-center space-x-3 group">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-emerald-900/20 border-2 border-amber-400/60 bg-black flex-shrink-0"
              >
                <img src={images.logo} alt="Mahas Varma & Spine Care logo" className="w-full h-full object-cover" />
              </motion.div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-extrabold text-slate-900 block leading-tight tracking-tight">
                  Mahas Varma
                </span>
                <span className="text-[10px] font-bold gold-gradient-text tracking-widest uppercase block -mt-1">
                  & Spine Care Clinic
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700">
              <button onClick={() => setCurrentView('home')} className={`hover:text-emerald-800 transition ${currentView === 'home' ? 'text-emerald-900 font-bold' : ''}`}>Home</button>
              <a href="#about" onClick={() => setCurrentView('home')} className="hover:text-emerald-800 transition">About</a>
              <a href="#services" onClick={() => setCurrentView('home')} className="hover:text-emerald-800 transition">Services</a>
              <a href="#gallery" onClick={() => setCurrentView('home')} className="hover:text-emerald-800 transition">Gallery</a>
              <button 
                onClick={() => setCurrentView(currentView === 'home' ? 'reviews' : 'home')}
                className="flex items-center space-x-1 hover:text-amber-600 transition font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Google Reviews (5.0★)</span>
              </button>
              <a href="#videos" onClick={() => setCurrentView('home')} className="hover:text-emerald-800 transition">Videos</a>
              <a href="#contact" onClick={() => setCurrentView('home')} className="hover:text-emerald-800 transition">Contact</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsAppointmentModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md transition"
              >
                Book Now
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contact</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button 
                onClick={() => { setCurrentView(currentView === 'home' ? 'reviews' : 'home'); setMobileMenuOpen(false); }}
                className="flex items-center space-x-1 bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-full text-[11px] shadow"
              >
                <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                <span>5.0★</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
            <button onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-1.5 text-slate-700 font-semibold">Home</button>
            <button onClick={() => { setCurrentView('reviews'); setMobileMenuOpen(false); }} className="flex items-center space-x-2 py-2 text-amber-700 font-bold bg-amber-50 px-3 rounded-xl border border-amber-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>Google Reviews (5.0★ Rating)</span>
            </button>
            <a href="#about" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-700 font-semibold">About Us</a>
            <a href="#services" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-700 font-semibold">Services</a>
            <a href="#gallery" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-700 font-semibold">Gallery</a>
            <a href="#videos" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-700 font-semibold">Videos</a>
            <a href="#contact" onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} className="block py-1.5 text-slate-700 font-semibold">Contact</a>
            <div className="pt-2 flex flex-col gap-2">
              <a href={`tel:${PHONE_NUMBER}`} className="py-3 text-center rounded-xl bg-emerald-50 text-emerald-950 font-bold text-xs">Call 8838631454</a>
              <button onClick={() => { setIsAppointmentModalOpen(true); setMobileMenuOpen(false); }} className="py-3 text-center rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow">Book Now</button>
            </div>
          </div>
        )}
      </nav>

      {/* RENDER VIEW CONDITIONALLY */}
      {currentView === 'reviews' ? (
        /* DEDICATED GOOGLE REVIEWS & RATINGS PAGE */
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          
          {/* Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-950 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Website</span>
            </button>
            
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow transition"
            >
              <span>Write a Google Review</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Rating Header Box */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-amber-400/30 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-emerald-900/80 px-3.5 py-1 rounded-full border border-amber-400/30">Verified Patient Rating</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">Google Reviews & Testimonials</h1>
              <p className="text-xs text-emerald-200 max-w-xl">
                Read authentic patient experiences for Dr. Elavarasan at Mahas Varma & Spine Care Clinic, Salem.
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-amber-300/40 text-center min-w-[220px]">
              <span className="text-5xl font-serif font-extrabold text-amber-300">5.0</span>
              <div className="flex justify-center text-amber-400 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-200 font-medium">Based on 23 Google Reviews</p>
            </div>
          </div>

          {/* Review Filter Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["varma treatment", "effective treatment", "nerve issues", "spine care", "back pain", "cervical disc", "face & head thokkanam"].map((tag, idx) => (
              <span key={idx} className="bg-white border border-emerald-100 text-slate-700 font-semibold text-xs px-4 py-2 rounded-full shadow-sm">
                #{tag}
              </span>
            ))}
          </div>

          {/* Patient Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {googleReviewsData.map((rev, idx) => (
              <div key={idx} className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif font-bold text-base text-slate-900">{rev.name}</h3>
                      <p className="text-[11px] text-slate-400">{rev.details} • {rev.time}</p>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                </div>

                {rev.response && (
                  <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
                    <span className="font-bold text-[10px] uppercase text-emerald-800">Response from Owner:</span>
                    <p className="italic text-emerald-900">{rev.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="text-center bg-emerald-50 p-8 rounded-3xl border border-emerald-100 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-slate-900">Ready to Experience Pain Relief?</h3>
            <div className="flex justify-center gap-4">
              <button onClick={() => setCurrentView('home')} className="px-6 py-3 bg-emerald-900 text-white rounded-full font-bold text-xs shadow">Book Appointment Now</button>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-amber-500 text-slate-950 rounded-full font-bold text-xs shadow">WhatsApp Consultation</a>
            </div>
          </div>

        </div>
      ) : (
        /* MAIN HOMEPAGE CONTENT */
        <>
          {/* HERO SECTION */}
          <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/80 via-teal-50/20 to-[#fafbfc] overflow-hidden">
            
            <motion.div 
              animate={{ scale: [1, 1.2, 1], y: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-5 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" 
            />
            <motion.div 
              animate={{ scale: [1, 1.25, 1], y: [0, -25, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-40 right-10 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" 
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white border border-amber-300/60 text-emerald-900 text-xs font-bold shadow-sm">
                  <img src={images.logo} alt="Mahas Varma & Spine Care logo" className="w-5 h-5 rounded-full object-cover border border-amber-400" />
                  <span>Mahas Varma & Spine Care Sanctuary</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                  Varmakalai & Spine Care
                  <br />
                  <span className="gold-gradient-text">in Salem</span>
                </h1>

                <p className="text-lg sm:text-xl font-semibold text-emerald-900">
                  Mahas Varma & Spine Care
                </p>

                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                  Experience traditional Tamil Varmakalai therapy and personalized spine care at Mahas Varma & Spine Care in Salem, with treatment approaches designed to support mobility, relaxation, comfort, and overall well-being.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm text-center shadow-xl shadow-amber-500/20 transition flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4 text-slate-950" />
                    <span>Book Appointment</span>
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-sm text-center border border-emerald-200 shadow-sm transition flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Consultation</span>
                  </motion.a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-emerald-100">
                  {[
                    { text: "Certified Practitioners" },
                    { text: "Natural Healing" },
                    { text: "Personalized Plans" },
                    { text: "Natural Therapy" }
                  ].map((badge, idx) => (
                    <div key={idx} className="bg-white/90 p-3 rounded-2xl border border-emerald-100 shadow-sm text-center text-xs font-bold text-slate-800 flex items-center justify-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 relative"
              >
                <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-100/60 to-amber-100/40 border border-amber-200/50 shadow-2xl relative">
                  <div className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden">
                    <img src={images.hero} alt="Varmakalai therapy session at Mahas Varma & Spine Care in Salem" className="w-full h-80 object-cover rounded-xl shadow hover:scale-105 transition duration-500" />
                    <img src={images.landmark} alt="Mahas Varma & Spine Care Salem clinic" className="w-full h-80 object-cover rounded-xl shadow hover:scale-105 transition duration-500" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-amber-300/40 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl gold-badge-icon flex items-center justify-center flex-shrink-0 text-amber-900 font-bold">
                      <Award className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Traditional Varma Science</h4>
                      <p className="text-xs text-slate-500 font-medium">Traditional Non-Invasive Care</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* THREE HERO HIGHLIGHT CARDS */}
          <section className="-mt-12 pb-16 px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Varmakalai Healing",
                  desc: "Traditional Tamil Varmakalai practice focused on pressure-point techniques, relaxation, and mobility support.",
                  icon: <Sparkles className="w-6 h-6 text-amber-700" />,
                  link: "#services"
                },
                {
                  title: "Modern Spine Therapy",
                  desc: "Spine-focused traditional therapy, mobility support, and care approaches for back, neck, and sciatica discomfort.",
                  icon: <Activity className="w-6 h-6 text-amber-700" />,
                  link: "#services"
                },
                {
                  title: "Our Sanctuary",
                  desc: "A calm care environment with Varmakalai-focused practitioners serving patients in Salem and Malaysia.",
                  icon: <ShieldCheck className="w-6 h-6 text-amber-700" />,
                  link: "#contact"
                }
              ].map((card, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -8 }}
                  className="luxury-glass-card p-8 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h3 className="text-2xl font-serif font-extrabold text-slate-900">{card.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="w-12 h-12 rounded-full gold-badge-icon flex items-center justify-center text-amber-900 shadow">
                      {card.icon}
                    </div>
                    <a href={card.link} className="text-xs font-bold text-emerald-900 hover:text-amber-600 flex items-center space-x-1">
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ANIMATED CLINIC STATS COUNTER BAR */}
          <section className="py-12 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white relative overflow-hidden shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { target: 5.0, suffix: "★", decimals: 1, label: "Google Rating", sub: "23+ Google Reviews" },
                  { target: 13, suffix: "+", decimals: 0, label: "Therapy Services", sub: "Varmakalai, Spine & Traditional Care" },
                  { target: 108, suffix: "", decimals: 0, label: "Varma Points Mastered", sub: "Traditional Tamil Science" },
                  { target: 2, suffix: "", decimals: 0, label: "Sanctuary Centers", sub: "Salem & Malaysia" }
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="space-y-1 p-4 rounded-2xl bg-white/5 border border-amber-400/20 backdrop-blur-md"
                  >
                    <div className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-300 tracking-tight">
                      <AnimatedCounter targetNumber={stat.target} suffix={stat.suffix} decimals={stat.decimals} duration={3000} />
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">{stat.label}</div>
                    <div className="text-[11px] text-emerald-300/80">{stat.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT SECTION WITH MASTER PRACTITIONER PROFILE */}
          <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-emerald-50 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5 relative"
              >
                <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white p-8 rounded-3xl border border-amber-400/30 shadow-2xl space-y-6">
                  <div className="flex items-center space-x-4">
                    <img src={images.logo} alt="P. Elavarasan, Founder and Chief Varma Therapist" className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-md" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-emerald-900/80 px-3 py-1 rounded-full border border-amber-400/30">Master Practitioner</span>
                      <h3 className="text-2xl font-serif font-bold text-white mt-1">P. ELAVARASAN</h3>
                      <p className="text-xs text-amber-300 font-medium">Founder & Chief Varma Therapist</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-emerald-800/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-200">Qualifications & Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Dip. Varmakalai",
                        "B.Pharm.",
                        "Dip. Aromatherapy",
                        "Thai Massage",
                        "Pranic Healing",
                        "Dip. Siddha Medicine & Science"
                      ].map((cert, i) => (
                        <span key={i} className="bg-amber-400/10 border border-amber-400/40 text-amber-300 font-semibold text-xs px-3 py-1.5 rounded-xl shadow-sm flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{cert}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-emerald-100">
                    <p className="font-serif italic text-emerald-200">
                      "Traditional Varma Therapy & Wellness Centre dedicated to holistic pain relief, spinal correction, and natural recovery."
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
                  <img src={images.logo} alt="Mahas Varma & Spine Care logo" className="w-5 h-5 rounded-full object-cover border border-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-900">
                    About Mahas Varma & Spine Care
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 leading-tight">
                  Traditional Varma Therapy & Wellness Centre
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Led by <strong>P. Elavarasan</strong>, Mahas Varma & Spine Care combines traditional Tamil Varmakalai practices, Siddha-informed approaches, and natural physical therapies. Our centres serve patients in <strong>Salem, Tamil Nadu</strong> and <strong>Kuala Lumpur, Malaysia</strong> with personalized, non-invasive care focused on comfort, mobility, and well-being.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Dip. Varmakalai Certified Care",
                    "Non-Invasive Spine-Focused Care",
                    "Dip. Siddha Medicine & Science",
                    "Nerve & Spine Comfort Support",
                    "Aromatherapy & Herbal Oils",
                    "Stress, Sinus & Cranial Care",
                    "Thai & Pranic Healing Therapies"
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + (idx * 0.08) }}
                      className="flex items-center space-x-2 text-xs font-semibold text-slate-800 bg-emerald-50/60 px-4 py-3 rounded-2xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fafbfc]">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-900 bg-emerald-100/70 px-3.5 py-1.5 rounded-full">Our Core Offerings</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900">Varmakalai, Spine Care & Traditional Therapy Services</h2>
                <p className="text-slate-500 text-sm">Displaying premium service cards with specific healing benefits.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((svc, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -6 }}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between hover:shadow-xl transition duration-300"
                  >
                    <div>
                      <div className="h-52 rounded-2xl overflow-hidden relative mb-5">
                        <img src={svc.image} alt={`${svc.title} at Mahas Varma & Spine Care`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 bg-slate-950/90 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-md">
                          {svc.subtitle}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{svc.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{svc.desc}</p>

                      <div className="mb-4">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 mb-2">Key Benefits:</h4>
                        <ul className="space-y-1.5">
                          {svc.benefits.map((b, i) => (
                            <li key={i} className="flex items-center text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2 flex-shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, treatment: svc.title }));
                        setIsAppointmentModalOpen(true);
                      }}
                      className="w-full py-3 bg-emerald-50 hover:bg-emerald-900 text-emerald-900 hover:text-white font-bold text-xs rounded-2xl text-center transition flex items-center justify-center space-x-1"
                    >
                      <span>Book {svc.title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* GALLERY SECTION */}
          <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-emerald-100">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-900 bg-emerald-100/70 px-3.5 py-1.5 rounded-full">Clinical Moments & Patient Care</span>
                <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900">Photo & Clinical Gallery</h2>
                <p className="text-xs sm:text-sm text-slate-600">A glimpse into real patient sessions, Varma treatment practices, and award-winning care by Master Elavarasan.</p>
              </div>

              {/* Gallery Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-2">
                {['all', 'Clinic & Patients', 'Therapy', 'Achievements'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveGalleryFilter(filter)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition capitalize ${
                      activeGalleryFilter === filter
                        ? 'bg-emerald-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter === 'all' ? 'All Photos' : filter}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryList
                  .filter(item => activeGalleryFilter === 'all' || item.category === activeGalleryFilter)
                  .map((item, idx) => (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="group relative rounded-3xl overflow-hidden shadow-sm border border-emerald-100/80 bg-slate-950 aspect-[4/3]"
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition duration-300 flex flex-col justify-end p-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-amber-400/30 w-fit mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-sm font-serif font-bold text-white leading-snug">{item.title}</h3>
                      </div>
                    </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* VIDEOS SECTION */}
          <section id="videos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-emerald-50/30 to-white border-t border-emerald-100">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200 shadow-sm">Live Clinical Demonstrations</span>
                <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900">Authentic Therapy Video Gallery</h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">Observe real Varmakalai pressure point release, spinal corrections, and facial thokkanam treatment sessions led by Master Elavarasan.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((v, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl overflow-hidden border border-emerald-100/80 shadow-xl flex flex-col group transition"
                  >
                    <div className="relative aspect-video bg-slate-950 overflow-hidden">
                      <video 
                        src={v.src} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                        controls 
                        preload="metadata" 
                      />
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-emerald-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-md flex items-center space-x-1.5">
                          <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{v.tag}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Master Elavarasan Live Session</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-slate-900 leading-snug">{v.title}</h3>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setIsAppointmentModalOpen(true)}
                          className="px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-900 text-emerald-900 hover:text-white font-bold text-xs transition flex items-center space-x-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book This Therapy</span>
                        </button>
                        <span className="text-xs text-slate-400 font-medium">Mahas Varma™</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>



          {/* LOCATION SECTION WITH EMBEDDED GOOGLE MAP */}
          <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 emerald-gradient-header text-white border-t border-amber-400/20">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-amber-400/30">Sanctuary Locations & Contact</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Mahas Varma & Spine Care</h2>
                <p className="text-sm text-emerald-200">Phone: <strong className="text-amber-300">8838631454</strong></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Salem Clinic */}
                <div className="bg-emerald-950/80 p-8 rounded-3xl border border-amber-400/30 space-y-4 shadow-xl">
                  <h3 className="text-2xl font-serif font-bold text-amber-300">Salem Sanctuary Clinic</h3>
                  <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                    <strong>Mahas Varma & Spine Care™</strong><br />
                    Raju Udaiyar, 27, Kannankurichi Main Rd,<br />
                    Behind Police Station, Salem (M.Corp.),<br />
                    Tamil Nadu 636008
                  </p>
                  <p className="text-xs text-amber-400 font-semibold">Landmark: Behind Police Station, Kannankurichi Main Road</p>
                  <p className="text-xs text-emerald-300">Business Hours: 9:00 AM - 8:30 PM (Daily)</p>
                  
                  {/* Embedded Map */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden border border-emerald-700/60 shadow-inner">
                    <iframe
                      title="Mahas Varma Salem Google Map"
                      src="https://maps.google.com/maps?q=Mahas%20varma%20and%20spine%20care%E2%84%A2%20Raju%20udaiyar%2027%20Kannankurichi%20Main%20Rd%20behind%20police%20station%20Salem%20Tamil%20Nadu%20636008&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a href={`tel:${PHONE_NUMBER}`} className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition">Call Now</a>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-emerald-800 border border-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition">WhatsApp Now</a>
                    <a href="https://www.google.com/maps/dir//Mahas+varma+and+spine+care%E2%84%A2,+Raju+udaiyar,+27,+Kannankurichi+Main+Rd,+behind+police+station,+Salem+(M.Corp.),+Tamil+Nadu+636008/@11.6537351,78.1382972,11z" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-slate-900 text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-800 transition">Open Directions Map</a>
                  </div>
                </div>

                {/* Malaysia Clinic */}
                <div className="bg-emerald-950/80 p-8 rounded-3xl border border-amber-400/30 space-y-4 shadow-xl">
                  <h3 className="text-2xl font-serif font-bold text-amber-300">Agastya Poornalya Clinic (Malaysia)</h3>
                  <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                    <strong>Pusat Kesihatan Agasthya Poornalaya</strong><br />
                    Jalan Kasipillay, Putra Majestik,<br />
                    Sentul, 51200 Kuala Lumpur,<br />
                    Malaysia
                  </p>
                  <p className="text-xs text-amber-400 font-semibold">Landmark: Putra Majestik, Sentul, Kuala Lumpur</p>
                  <p className="text-xs text-emerald-300">Business Hours: 9:30 AM - 8:00 PM (Daily)</p>
                  
                  {/* Embedded Map */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden border border-emerald-700/60 shadow-inner">
                    <iframe
                      title="Agastya Poornalya Malaysia Google Map"
                      src="https://maps.google.com/maps?q=Pusat%20Kesihatan%20Agasthya%20Poornalaya%2C%20Jalan%20Kasipillay%20Putra%20Majestik%2C%20Sentul%2C%2051200%20Kuala%20Lumpur%2C%20Malaysia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a href={`tel:${PHONE_NUMBER}`} className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition">Call Now</a>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-emerald-800 border border-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition">WhatsApp Now</a>
                    <a href="https://www.google.com/maps/search/?api=1&query=Pusat+Kesihatan+Agasthya+Poornalaya+Jalan+Kasipillay+Putra+Majestik+Sentul+51200+Kuala+Lumpur+Malaysia" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-slate-900 text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-800 transition">Open Directions Map</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="bg-[#021d17] text-slate-400 py-12 px-4 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img src={images.logo} alt="Mahas Varma & Spine Care logo" className="w-10 h-10 rounded-full object-cover border border-amber-400/60 shadow-md" />
              <div>
                <h4 className="text-amber-300 font-serif font-bold text-sm leading-tight">Mahas Varma & Spine Care</h4>
                <span className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest">Luxury Sanctuary</span>
              </div>
            </div>
            <p className="text-slate-400">P. Elavarasan — Traditional Varma Therapy & Wellness Centre. The Art of Healing, The Science of Spine.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold">Services</h4>
            <p><a href="#services" onClick={() => setCurrentView('home')} className="hover:text-amber-300">Varmakalai Healing</a></p>
            <p><a href="#services" onClick={() => setCurrentView('home')} className="hover:text-amber-300">Modern Spine Therapy</a></p>
            <p><a href="#services" onClick={() => setCurrentView('home')} className="hover:text-amber-300">Facial Therapy</a></p>
            <p><a href="#services" onClick={() => setCurrentView('home')} className="hover:text-amber-300">Head & Face Thokkanam</a></p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold">Quick Links</h4>
            <p><button onClick={() => setCurrentView('reviews')} className="hover:text-amber-300">Google Reviews (5.0★)</button></p>
            <p><a href="#about" onClick={() => setCurrentView('home')} className="hover:text-amber-300">About Us</a></p>
            <p><a href="#gallery" onClick={() => setCurrentView('home')} className="hover:text-amber-300">Photo & Clinical Gallery</a></p>
            <p><a href="#contact" onClick={() => setCurrentView('home')} className="hover:text-amber-300">Locations & Directions</a></p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold">Contact Info</h4>
            <p>Phone: <strong className="text-white">8838631454</strong></p>
            <p>Centers: Salem & Malaysia</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-emerald-950/60 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Mahas Varma & Spine Care. All Rights Reserved. Verified 5.0 Star Google Reviews Module.
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <motion.a 
          whileHover={{ scale: 1.1 }}
          href={WHATSAPP_LINK} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
        </motion.a>
        <motion.a 
          whileHover={{ scale: 1.1 }}
          href={`tel:${PHONE_NUMBER}`} 
          className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 shadow-xl flex items-center justify-center"
        >
          <Phone className="w-5 h-5" />
        </motion.a>
      </div>

      {/* APPOINTMENT MODAL POPUP (OPENS OVER CURRENT PAGE) */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white max-w-2xl w-full rounded-3xl border border-emerald-100 shadow-2xl overflow-hidden relative my-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAppointmentModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-3">
                <img src={images.logo} alt="Mahas Varma & Spine Care logo" className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 mx-auto shadow-md" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-900 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">Official Slot Booking</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 mt-2">Mahas Varma & Spine Care</h2>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">Fill in your consultation details below to send directly to WhatsApp!</p>
                </div>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-950">Appointment Slot Prepared!</h3>
                  <p className="text-xs text-emerald-800">
                    Thank you <strong>{formData.name}</strong>. WhatsApp has been opened with your appointment request. Please send the message on WhatsApp to confirm!
                  </p>
                  <button 
                    onClick={() => setIsAppointmentModalOpen(false)} 
                    className="mt-2 px-6 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-full shadow"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Patient Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-xs text-slate-900 focus:border-emerald-700 outline-none bg-emerald-50/20"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 8838631454"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-xs text-slate-900 focus:border-emerald-700 outline-none bg-emerald-50/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Treatment Type</label>
                      <select
                        value={formData.treatment}
                        onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-xs text-slate-900 focus:border-emerald-700 outline-none bg-white font-medium"
                      >
                        <option>Cervical & Neck Pain</option>
                        <option>L4–L5–S1 Back Pain</option>
                        <option>Sciatica Relief</option>
                        <option>Whole Spine Pain & Stiffness</option>
                        <option>Migraine & Headache</option>
                        <option>Knee Pain Therapy</option>
                        <option>Heel Pain & Plantar Support</option>
                        <option>Paralysis & Bell’s Palsy Support</option>
                        <option>Lymphatic Thokkanam Massage</option>
                        <option>Full-Body Varma Thokkanam Massage</option>
                        <option>Face & Head Varma Thokkanam</option>
                        <option>Nadi & Head Oil Thokkanam</option>
                        <option>Neurological & Muscular Pain</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Clinic Center</label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-xs text-slate-900 focus:border-emerald-700 outline-none bg-white font-medium"
                      >
                        <option>Salem Clinic</option>
                        <option>Agastya Poornalya Clinic (Malaysia)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-xs text-slate-900 focus:border-emerald-700 outline-none bg-white font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Health Issue / Pain Details</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your symptoms (e.g. back pain, sciatica, neck stiffness)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-emerald-200 text-xs text-slate-900 focus:border-emerald-700 outline-none bg-emerald-50/20"
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-950 fill-slate-950" />
                      <span>Submit & Send Booking to WhatsApp</span>
                    </button>
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="px-5 py-3.5 rounded-2xl bg-emerald-950 text-amber-400 font-bold text-xs text-center flex items-center justify-center space-x-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Direct Call</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
