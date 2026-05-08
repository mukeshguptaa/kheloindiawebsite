import { SlantedSection } from "../components/DesignSystem";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Trophy,
  Users, 
  Target,
  Zap, 
  Dumbbell, 
  Activity,
  Wind,
  Crosshair,
  Waves,
  Bike,
  Circle,
  Microscope, 
  HandHelping, 
  School, 
  GraduationCap, 
  Briefcase,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ExternalLink,
  ArrowUpRight,
  Building2,
  Globe,
  Leaf,
  Search,
  MapPin,
  Calendar,
  Heart,
  Send,
  Shield,
  Map,
  Cpu,
  Clock,
  Newspaper
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { cn } from "../lib/utils";
import { MiniCalendar } from "../components/MiniCalendar";

const EventCountdown = ({ targetDate, type = "secondary", label, venue, eyebrow }: { targetDate: Date, type?: "primary" | "secondary", label: string, venue?: string, eyebrow?: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now < targetDate) {
        setTimeLeft({
          days: differenceInDays(targetDate, now),
          hours: differenceInHours(targetDate, now) % 24,
          minutes: differenceInMinutes(targetDate, now) % 60,
          seconds: differenceInSeconds(targetDate, now) % 60,
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (type === "primary") {
    return (
      <div className="bg-white dark:bg-[#141C2B] rounded-[8px] p-10 md:p-14 shadow-sm border border-[#EEF0F3] dark:border-[#26334A] transition-colors duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <div className="text-[#db4001] text-[12.8px] font-bold tracking-[0.1em] mb-3">{eyebrow}</div>
            <h3 className="text-[24px] font-[200] text-[#293f54] dark:text-[#F4F5F7] tracking-tight">
              {label}
            </h3>
          </div>
          <div className="text-[12.8px] text-[#8A94A6] dark:text-[#8896AC] font-medium">
            {venue}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-8 md:gap-12 pt-8 border-t border-[#EEF0F3] dark:border-white/5">
          {[
            { label: "DAYS", value: timeLeft.days.toLocaleString() },
            { label: "HRS", value: timeLeft.hours.toString().padStart(2, '0') },
            { label: "MIN", value: timeLeft.minutes.toString().padStart(2, '0') },
            { label: "SEC", value: timeLeft.seconds.toString().padStart(2, '0') },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col">
              <div className="text-[48px] md:text-[64px] font-bold text-[#0F1A2A] dark:text-[#F4F5F7] tabular-nums leading-none">
                {unit.value}
              </div>
              <div className="text-[10.24px] text-[#8A94A6] dark:text-[#8896AC] font-bold tracking-[0.15em] mt-3">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#141C2B] rounded-[8px] p-8 shadow-sm border border-[#EEF0F3] dark:border-white/5 flex flex-col h-full transition-colors duration-300">
      <h4 className="text-[12.8px] font-bold text-[#0F1A2A] dark:text-[#F4F5F7] uppercase tracking-tight mb-1">
        {label}
      </h4>
      <div className="text-[12.8px] text-[#8A94A6] dark:text-[#8896AC] font-medium mb-8">
        {venue}
      </div>
      <div className="mt-auto flex items-baseline gap-3">
        <span className="text-[31.25px] font-bold text-[#0F1A2A] dark:text-[#F4F5F7] tabular-nums leading-none">
          {timeLeft.days.toLocaleString()}
        </span>
        <span className="text-[10.24px] text-[#8A94A6] dark:text-[#8896AC] font-bold uppercase tracking-[0.15em]">
          DAYS TO GO
        </span>
      </div>
    </div>
  );
};

const socialMentions = [
  {
    id: 'hero',
    source: 'The Indian Express',
    handle: '',
    headline: '12 medals, 3 records broken: Khelo India Youth Games wrap up in Bhopal',
    excerpt: 'Athletes from 28 states competed across 25 disciplines, with five new national records set. The event saw unprecedented participation from rural corners of the country.',
    timestamp: '2h ago',
    url: '#',
    type: 'press',
    isHero: true,
    thumbnail: 'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/v1747325268/primary/ysbrvjt25fjp7vdf8ebz'
  },
  {
    id: '1',
    source: 'PMO India',
    handle: '@PMOIndia',
    headline: 'Proud of our young athletes representing India at the youth games. #KheloIndia',
    timestamp: '2h ago',
    url: '#',
    type: 'social'
  },
  {
    id: '2',
    source: 'Khelo India',
    handle: '@kheloindia',
    headline: 'Behind the scenes at the trials in Bhopal — a glimpse of the next generation.',
    timestamp: '1d ago',
    url: '#',
    type: 'social'
  },
  {
    id: '3',
    source: 'The Hindu',
    handle: '@the_hindu',
    headline: 'Khelo India scheme expands to 1,000 new districts across the country.',
    timestamp: '3d ago',
    url: '#',
    type: 'press'
  },
  {
    id: '4',
    source: 'Aakash Singh',
    handle: '@aakash_para_athlete',
    headline: 'The new high-performance equipment at the SAI center has completely transformed my training regime.',
    timestamp: '1w ago',
    url: '#',
    type: 'user'
  }
];

const liveNowEvents = [
  {
    id: 'live-1',
    status: 'LIVE NOW',
    title: 'Khelo India athletics finals',
    subtext: 'JLN Stadium, Delhi · Day 4',
    url: '#',
    actionLabel: 'Watch',
    ariaLabel: 'Watch Khelo India athletics finals live'
  },
  {
    id: 'live-2',
    status: 'LIVE NOW',
    title: 'Wrestling semi-finals',
    subtext: 'IG Stadium, Delhi · 65kg category',
    url: '#',
    actionLabel: 'Watch',
    ariaLabel: 'Watch Wrestling semi-finals live'
  },
  {
    id: 'soon-1',
    status: 'STARTS IN 1H 24M',
    title: 'Swimming heats — 200m freestyle',
    subtext: 'SAI Aquatic Centre, Bhopal',
    url: '#',
    actionLabel: 'Remind',
    ariaLabel: 'Set reminder for Swimming heats — 200m freestyle'
  }
];

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeHubIndex, setActiveHubIndex] = useState(0);
  const [hubSearchQuery, setHubSearchQuery] = useState("");
  const [hubActiveFilter, setHubActiveFilter] = useState("All Hubs");

  const hubs = [
    {
      id: 1,
      name: "SAI Jawaharlal Nehru Stadium",
      location: "New Delhi, NCR",
      distance: "0.8 km",
      category: "Training centre",
      type: "Training",
      image: "https://cricketstadium.com.in/wp-content/uploads/2025/02/clipboard-image-1740594989.webp",
      sportsCount: "12",
      hours: "6 AM–10 PM",
      facilities: ["Athletics Track", "Football Turf", "Gym", "Medical Centre", "Hostel", "Cafeteria"],
    },
    {
      id: 2,
      name: "Delhi University Sports Complex",
      location: "North Campus, Delhi",
      distance: "5.1 km",
      category: "University",
      type: "Schools",
      image: "https://www.du.ac.in/uploads/sports/sports_complex_1.jpg",
      sportsCount: "8",
      hours: "7 AM–8 PM",
      facilities: ["Rugby Stadium", "Swimming Pool", "Indoor Courts", "Archery Ground", "Wellness Centre"],
    },
    {
      id: 3,
      name: "Indira Gandhi Indoor Stadium",
      location: "IP Estate, Delhi",
      distance: "8.2 km",
      category: "Stadium",
      type: "Events",
      image: "https://www.delhitourism.gov.in/delhitourism/tourist_place/indira_gandhi.jpg",
      sportsCount: "15",
      hours: "5 AM–11 PM",
      facilities: ["Cycling Velodrome", "Gymnastics Hall", "Wrestling Arena", "Boxing Rings", "Recovery Zone"],
    },
    {
      id: 4,
      name: "Karni Singh Shooting Range",
      location: "Tughlakabad, Delhi",
      distance: "14 km",
      category: "Training centre",
      type: "Training",
      image: "https://sportsauthorityofindia.nic.in/sai_new/public/assets/front/img/karni-singh.jpg",
      sportsCount: "4",
      hours: "9 AM–6 PM",
      facilities: ["10m Range", "25m Range", "50m Range", "Trap & Skeet", "Equipment Store"],
    },
    {
      id: 5,
      name: "Siri Fort Sports Complex",
      location: "Siri Fort, New Delhi",
      distance: "4.5 km",
      category: "Stadium",
      type: "Training",
      image: "https://res.cloudinary.com/simplotel/image/upload/x_0,y_157,w_1048,h_589,r_0,c_crop,q_80,fl_progressive/w_1200,h_675,c_fit/siri-fort-sports-complex-new-delhi_v4i1x5",
      sportsCount: "22",
      hours: "6 AM–9 PM",
      facilities: ["Tennis Courts", "Badminton Hall", "Skating Rink", "Golf Course", "Aerobics Studio"],
    }
  ];

  const filteredHubs = hubs.filter(hub => {
    const matchesSearch = hub.name.toLowerCase().includes(hubSearchQuery.toLowerCase()) || 
                         hub.location.toLowerCase().includes(hubSearchQuery.toLowerCase());
    const matchesFilter = hubActiveFilter === "All Hubs" || hub.type === hubActiveFilter;
    return matchesSearch && matchesFilter;
  });

  const selectedHub = filteredHubs[activeHubIndex] || filteredHubs[0] || hubs[0];

  const slides = [
    {
      image: "https://indiaeducationdiary.in/wp-content/uploads/2021/07/Ritu-Phogat-1.jpg",
      title: "Where young<br />talents become<br />national icons.",
      subtitle: "Empowering athletes. Transforming communities. Building champions for the next generation."
    },
    // {
    //   image: "https://the-aiff.com/media/uploads/2024/07/Khelo-India-Image-1.jpeg",
    //   title: "Celebrating sporting<br />excellence at<br />grassroots.",
    //   subtitle: "From local grounds to global podiums, our athletes are making India proud every day."
    // },
    {
      image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/bsmaienccdsshg3ckgcv",
      title: "Building a<br />fitter, stronger<br />nation together.",
      subtitle: "Join the movement that's inspiring millions to embrace sports as a way of life."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden bg-white dark:bg-[#141C2B] transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[82.5vh] flex items-center bg-navy overflow-hidden">
        {/* Carousel Backgrounds */}
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1.05 : 1.1
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover [filter:contrast(1.05)_saturate(1.1)]"
              referrerPolicy="no-referrer"
            />
            {/* Horizontal: dark behind text on the left, image visible on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
            {/* Vertical: subtle bottom fade for subtitle legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        ))}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative min-h-[450px] md:h-[500px] flex items-center py-16 md:py-0">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  pointerEvents: currentSlide === index ? "auto" : "none"
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-x-0 inset-y-0 flex flex-col justify-center max-w-5xl"
              >
                <h1 
                  className="text-[31.25px] sm:text-[39.06px] md:text-[48.83px] lg:text-[75px] text-white mb-6 leading-[1.1] tracking-tight uppercase font-display font-bold max-w-xl md:max-w-2xl lg:max-w-5xl [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                <p className="text-[22px] text-white/80 mb-0 font-medium max-w-2xl leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                  {slide.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.1. SPORTS TICKER (SWAPPED FROM FOOTER) */}
      <div className="bg-[#060C17] border-t border-white/5 py-[17px] overflow-hidden relative z-20">
        <motion.div 
          animate={{ x: [0, -1400] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {[
            { name: "Athletics", icon: Activity },
            { name: "Boxing", icon: Zap },
            { name: "Badminton", icon: Wind },
            { name: "Wrestling", icon: Users },
            { name: "Shooting", icon: Crosshair },
            { name: "Swimming", icon: Waves },
            { name: "Weightlifting", icon: Dumbbell },
            { name: "Archery", icon: Target },
            { name: "Football", icon: Circle },
            { name: "Cricket", icon: Trophy },
            { name: "Gymnastics", icon: Activity },
            { name: "Cycling", icon: Bike }
          ].concat([
            { name: "Athletics", icon: Activity },
            { name: "Boxing", icon: Zap },
            { name: "Badminton", icon: Wind },
            { name: "Wrestling", icon: Users },
            { name: "Shooting", icon: Crosshair },
            { name: "Swimming", icon: Waves },
            { name: "Weightlifting", icon: Dumbbell },
            { name: "Archery", icon: Target },
            { name: "Football", icon: Circle },
            { name: "Cricket", icon: Trophy },
            { name: "Gymnastics", icon: Activity },
            { name: "Cycling", icon: Bike }
          ]).map((sport, i) => {
            const Icon = sport.icon;
            return (
              <div key={i} className="flex items-center group cursor-default">
                <Icon size={16} className="text-white opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="ml-3 text-white font-display font-bold text-[10.24px] tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                  {sport.name}
                </span>
                <span className="mx-12 h-4 w-[1px] bg-white/20" />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* 2. LATEST NEWS & CIRCULARS */}
      <section className="py-16 md:py-32 bg-[#F4F5F7] dark:bg-[#0B1421] transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="mb-12 md:mb-16">
                <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">NEWS</div>
                <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.2] text-[#293F54] dark:text-[#F4F5F7] mb-4">
                  Latest from <span className="text-[#293F54] dark:text-[#F4F5F7]">Khelo India</span>
                </h2>
                <p className="text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-[950px] leading-[1.6]">
                  Khelo India is transforming India into a global sporting powerhouse by identifying talent at the grassroots level and nurturing them through structured training.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { 
                    title: "Khelo India Games 2026 announced", 
                    date: "Oct 12, 2025", 
                    type: "NEWS",
                    desc: "The upcoming games will feature 25 sports disciplines across five major cities with record participation expected."
                  },
                  { 
                    title: "New training academies launched across states", 
                    date: "Oct 10, 2025", 
                    type: "CIRCULAR",
                    desc: "State-of-the-art facilities are being established to provide world-class training to grassroots athletes."
                  },
                  { 
                    title: "Athlete scholarship program expanded", 
                    date: "Oct 08, 2025", 
                    type: "PRESS RELEASES",
                    desc: "Financial support for top-performing athletes has been increased to cover international training and equipment."
                  },
                  { 
                    title: "National coaching certification drive starts", 
                    date: "Oct 05, 2025", 
                    type: "NEWS",
                    desc: "A nationwide initiative to standardize coaching excellence and certify 5,000 new mentors."
                  },
                  { 
                    title: "Grassroots talent identification camp in Ranchi", 
                    date: "Oct 02, 2025", 
                    type: "TENDERS",
                    desc: "Over 2,000 young athletes participated in the regional trials for the upcoming national academy intake."
                  },
                ].map((news, i) => (
                  <Link 
                    to="#" 
                    key={i} 
                    className="flex items-center gap-[24px] p-[32px] bg-white dark:bg-[#141C2B] rounded-[8px] border border-[#EEF0F3] dark:border-[#26334A] hover:border-[#db4001]/30 transition-all group cursor-pointer no-underline"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#db4001]">{news.type}</span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-[12px] font-medium text-[#8A94A6] dark:text-[#B9C1CC]">{news.date}</span>
                      </div>
                      <h4 className="text-[25px] font-sans font-[600] normal-case leading-tight text-[#293f54] dark:text-[#F4F5F7] mb-3 transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-[18px] text-[#515c65] dark:text-[#B9C1CC] leading-relaxed max-w-[600px] tracking-normal">
                        {news.desc}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <ArrowRight className="text-gray-300 dark:text-[#8896AC] group-hover:text-[#db4001] group-hover:translate-x-1 transition-all" size={20} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-[#151b2c] p-8 rounded-[8px] h-full border border-[#EEF0F3] dark:border-white/5 flex flex-col transition-colors duration-300">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[25px] font-sans font-[600] tracking-tight text-[#293f54] dark:text-white">Upcoming events</h3>
                </div>

                <MiniCalendar />

                {/* LIVE NOW & STARTING SOON SECTION */}
                {liveNowEvents.length > 0 && (
                  <div className="mt-8 mb-8">
                    <div className="text-[11px] font-medium tracking-[1.5px] uppercase text-[#8A94A6] dark:text-[#8896AC] mb-4">
                      LIVE NOW & STARTING SOON
                    </div>
                    <div className="flex flex-col gap-2">
                      {liveNowEvents.map((event) => (
                        <div 
                          key={event.id}
                          className="p-[12px_14px] rounded-[8px] border border-[#EEF0F3] dark:border-white/5 bg-white dark:bg-[#1A2942] flex flex-col gap-2 group transition-all hover:border-[#db4001]/20"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {event.status === 'LIVE NOW' ? (
                                <div className="flex items-center gap-2">
                                  <span className="relative flex h-[7px] w-[7px]">
                                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D85A30] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#D85A30]"></span>
                                  </span>
                                  <span className="text-[10px] font-medium tracking-[0.5px] uppercase text-[#993C1D] dark:text-[#FFA07A]">
                                    LIVE NOW
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Clock size={12} className="text-[#993C1D] dark:text-[#FFA07A]" />
                                  <span className="text-[10px] font-medium tracking-[0.5px] uppercase text-[#993C1D] dark:text-[#FFA07A]">
                                    {event.status}
                                  </span>
                                </div>
                              )}
                            </div>
                            <a 
                              href={event.url} 
                              aria-label={event.ariaLabel}
                              className="flex items-center gap-1 text-[12px] font-medium text-[#993C1D] dark:text-[#FFA07A] hover:opacity-80 transition-opacity min-h-[24px]"
                            >
                              {event.actionLabel} <ArrowUpRight size={14} />
                            </a>
                          </div>
                          <div>
                            <h5 className="text-[14px] font-medium text-[#0F1A2A] dark:text-[#F4F5F7] leading-tight mb-1">
                              {event.title}
                            </h5>
                            <p className="text-[12px] text-[#515c65] dark:text-[#8A94A6]">
                              {event.subtext}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex-1 space-y-6 overflow-hidden">
                  <div>
                    <div className="text-[12.8px] font-medium tracking-[0.15em] text-[#8A94A6] dark:text-[#8896AC] mb-4">This week</div>
                    <div className="space-y-4">
                      {/* KYUG Event */}
                      <div className="flex gap-4 items-start pb-5 border-b border-[#EEF0F3] dark:border-white/[0.06]">
                        <div className="w-[50px] h-[50px] bg-[#FFF3EC] dark:bg-[#3A1E10] rounded-[8px] flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-[10.24px] font-bold text-[#db4001] dark:text-[#f97316] tracking-wider mb-0">Apr</span>
                          <span className="text-[20px] font-bold text-[#db4001] dark:text-[#f97316] leading-none">17</span>
                        </div>
                        <div className="pt-0.5">
                          <h4 className="text-[16px] font-semibold text-[#293f54] dark:text-white tracking-tight leading-tight mb-1">Khelo India Games</h4>
                          <p className="text-[12.8px] text-[#8A94A6] dark:text-[#8896AC] mb-2">Online · 10:00 AM IST</p>
                          <span className="inline-block px-2 py-1 bg-[#F4F5F7] dark:bg-white/5 text-[#8A94A6] dark:text-[#8896AC] text-[10.24px] font-bold uppercase tracking-widest rounded-[8px]">
                            CLOSED
                          </span>
                        </div>
                      </div>

                      {/* Talent Hunt Camp */}
                      <div className="flex gap-4 items-start pb-5 border-b border-gray-50 dark:border-white/[0.06]">
                        <div className="w-[50px] h-[50px] bg-[#FFF3EC] dark:bg-[#3A1E10] rounded-[8px] flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-[10.24px] font-bold text-[#db4001] dark:text-[#f97316] tracking-wider mb-0">Apr</span>
                          <span className="text-[20px] font-bold text-[#db4001] dark:text-[#f97316] leading-none">22</span>
                        </div>
                        <div className="pt-0.5">
                          <h4 className="text-[16px] font-semibold text-[#293f54] dark:text-white tracking-tight leading-tight mb-1">KI talent hunt camp</h4>
                          <p className="text-[12.8px] text-[#8A94A6] dark:text-[#8896AC] mb-2">Ranchi, Jharkhand · 3 days</p>
                          <span className="inline-block px-2 py-1 bg-[#FFF3EC] dark:bg-[#3A1E10] text-[#db4001] dark:text-[#f97316] text-[10.24px] font-bold uppercase tracking-widest rounded-[8px]">
                            2 DAYS LEFT
                          </span>
                        </div>
                      </div>

                      {/* Swimming Trials */}
                      <div className="flex gap-4 items-start pb-2">
                        <div className="w-[50px] h-[50px] bg-[#FFF3EC] dark:bg-[#3A1E10] rounded-[8px] flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-[10.24px] font-bold text-[#db4001] dark:text-[#f97316] tracking-wider mb-0">Apr</span>
                          <span className="text-[20px] font-bold text-[#db4001] dark:text-[#f97316] leading-none">28</span>
                        </div>
                        <div className="pt-0.5">
                          <h4 className="text-[16px] font-semibold text-[#293f54] dark:text-white tracking-tight leading-tight mb-1">State swimming trials</h4>
                          <p className="text-[12.8px] text-[#8A94A6] dark:text-[#8896AC] mb-2">Bhopal, MP · Final state selection</p>
                          <span className="inline-block px-2 py-1 bg-[#FFF3EC] dark:bg-[#3A1E10] text-[#db4001] dark:text-[#f97316] text-[10.24px] font-bold uppercase tracking-widest rounded-[8px]">
                            8 DAYS LEFT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="text-[12.8px] font-medium tracking-[0.15em] text-[#8A94A6] dark:text-[#8896AC] mb-4">Next month</div>
                    <div className="space-y-4">
                      {/* Infrastructure Deadline */}
                      <div className="flex gap-4 items-start">
                        <div className="w-[50px] h-[50px] bg-[#FAECE7] dark:bg-[#3a1f15] rounded-[8px] flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-[10.24px] font-bold text-[#db4001] dark:text-[#f97316] tracking-wider mb-0">May</span>
                          <span className="text-[20px] font-bold text-[#db4001] dark:text-[#f97316] leading-none">01</span>
                        </div>
                        <div className="pt-0.5">
                          <h4 className="text-[16px] font-semibold text-[#293f54] dark:text-white tracking-tight leading-tight mb-1">Infrastructure scheme deadline</h4>
                          <p className="text-[12.8px] text-[#8A94A6] dark:text-[#8896AC] mb-2">Final day to submit proposals</p>
                          <span className="inline-block px-2 py-1 bg-[#FFF3EC] dark:bg-[#3A1E10] text-[#db4001] dark:text-[#f97316] text-[10.24px] font-bold uppercase tracking-widest rounded-[8px]">
                            11 DAYS LEFT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-10 py-4 border border-[#EEF0F3] dark:border-[#26334A] rounded-[8px] font-bold uppercase text-[12.8px] tracking-normal text-[#293f54] dark:text-[#f97316] bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
                  VIEW FULL CALENDAR <ArrowRight size={16} className="text-[#db4001] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="py-24 bg-white dark:bg-[#0B1421] border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-16 text-center">
            <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">
              OUR VISIONARIES
            </div>
            <h2 className="text-[42px] sm:text-[48px] font-serif text-[#293f54] dark:text-[#F4F5F7] leading-tight tracking-tight mb-4">
              Driving India’s Sporting Revolution
            </h2>
            <p className="text-[18px] text-[#515c65] dark:text-[#B9C1CC] max-w-[720px] mx-auto leading-relaxed">
              Guided by vision and commitment, our leaders are shaping a stronger, more inclusive sporting future for India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 sm:gap-x-16 gap-y-12 md:gap-y-0">
            {/* Shri Narendra Modi Profile Wrapper */}
            <div className="md:contents">
              <div className="flex flex-col items-center group md:row-start-1 self-end">
                <div className="relative mb-8 md:mb-8 w-full flex justify-center items-end h-[350px] md:h-[480px]">
                  <img 
                    src="https://i.ibb.co/23L2m4Bt/Narendra-Modi-Transparent.png" 
                    alt="Shri Narendra Modi"
                    className="w-full h-auto max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="text-center mb-2 md:row-start-2 self-start">
                <h3 className="text-[25px] font-semibold text-[#293f54] dark:text-[#F4F5F7] tracking-tight whitespace-nowrap">Shri Narendra Modi</h3>
              </div>
              <div className="text-center md:row-start-3 self-start">
                <p className="text-[14px] text-[#515c65] dark:text-[#B9C1CC] font-medium tracking-normal whitespace-nowrap">Hon'ble Prime Minister of India</p>
              </div>
            </div>

            {/* Shri Mansukh L. Mandaviya Profile Wrapper */}
            <div className="md:contents">
              <div className="flex flex-col items-center group md:row-start-1 self-end">
                <div className="relative mb-8 md:mb-8 w-full flex justify-center items-end h-[350px] md:h-[480px]">
                  <img 
                    src="https://sportsauthorityofindia.nic.in/sai_new/public/assets/front/img/mansukh.webp" 
                    alt="Shri Mansukh L. Mandaviya"
                    className="w-[70%] h-auto max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="text-center mb-2 md:row-start-2 self-start">
                <h3 className="text-[25px] font-semibold text-[#293f54] dark:text-[#F4F5F7] tracking-tight whitespace-nowrap">Shri Mansukh L. Mandaviya</h3>
              </div>
              <div className="text-center md:row-start-3 self-start">
                <p className="text-[14px] text-[#515c65] dark:text-[#B9C1CC] font-medium leading-relaxed tracking-normal whitespace-nowrap">
                  Hon'ble Minister of Youth Affairs and Sports
                </p>
              </div>
            </div>

            {/* Smt. Raksha Khadse Profile Wrapper */}
            <div className="md:contents">
              <div className="flex flex-col items-center group md:row-start-1 self-end">
                <div className="relative mb-8 md:mb-8 w-full flex justify-center items-end h-[350px] md:h-[480px]">
                  <img 
                    src="https://sportsauthorityofindia.nic.in/sai_new/public/assets/front/img/raksha.webp" 
                    alt="Smt. Raksha Khadse"
                    className="w-[60%] h-auto max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="text-center mb-2 md:row-start-2 self-start">
                <h3 className="text-[25px] font-semibold text-[#293f54] dark:text-[#F4F5F7] tracking-tight whitespace-nowrap">Smt. Raksha Khadse</h3>
              </div>
              <div className="text-center md:row-start-3 self-start">
                <p className="text-[14px] text-[#515c65] dark:text-[#B9C1CC] font-medium leading-relaxed tracking-normal whitespace-nowrap">
                  Hon'ble Minister of State for Youth Affairs and Sports
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pt-32 pb-32 bg-white dark:bg-[#0B1421] border-t border-gray-100 dark:border-white/5 transition-colors duration-300 overflow-hidden">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(#db4001 1px, transparent 1px)', 
               backgroundSize: '48px 48px' 
             }} 
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="text-left">
              <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-6">Khelo India</div>
              <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.14] text-[#293F54] dark:text-[#F4F5F7] mb-4">
                Shaping the Future of  <br /> Indian Sport
              </h2>
              <p className="text-[18px] md:text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-[600px] leading-[1.6] mb-10 font-normal">
                Launched in 2017 by the Ministry of Youth Affairs & Sports, Khelo India is India's flagship national sports development mission designed to revive the sports culture at grassroots, identify talent, build world-class infrastructure, and produce Olympic-level champions for Bharat.
              </p>
              <button className="w-full sm:w-[420px] py-4 border border-[#EEF0F3] dark:border-[#26334A] rounded-[8px] font-bold uppercase text-[12.8px] tracking-normal text-[#293f54] dark:text-white bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 group mx-auto lg:mx-0">
                Learn About Khelo India <ArrowRight size={16} className="text-[#db4001] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Impact Story Visual - DYNAMIC ORBITAL SYSTEM (Enhanced prominence) */}
            <div className="hidden lg:flex items-center justify-center relative h-[450px] overflow-visible">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* 0. VELOCITY STREAKS (Background layer for speed) */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1]">
                  {[
                    { w: "120px", h: "4px", t: "20%", l: "10%", d: 10 },
                    { w: "180px", h: "3px", t: "45%", l: "60%", d: 12 },
                    { w: "90px", h: "5px", t: "70%", l: "25%", d: 8 },
                    { w: "150px", h: "2px", t: "35%", l: "80%", d: 15 },
                  ].map((line, i) => (
                    <motion.div
                      key={`speed-${i}`}
                      animate={{ x: [-200, 800], opacity: [0, 1, 0] }}
                      transition={{ duration: line.d, repeat: Infinity, ease: "linear", delay: i * 2 }}
                      className="absolute bg-[#db4001] rounded-full blur-[1px]"
                      style={{ width: line.w, height: line.h, top: line.t, left: line.l }}
                    />
                  ))}
                </div>

                {/* 1. Orbit Paths (Drifting/Rotating motion) */}
                {[
                  { size: 400, rotation: 120, d: 45, color: "#0081C8", driftX: 15, driftY: 10 }, 
                  { size: 320, rotation: -90, d: 38, color: "#FCB131", driftX: -10, driftY: 15 },
                  { size: 240, rotation: 45, d: 32, color: "#00A651", driftX: 10, driftY: -15 },
                ].map((orbit, i) => (
                  <motion.div
                    key={`orbit-${i}`}
                    animate={{ 
                      rotate: 360,
                      x: [0, orbit.driftX, 0],
                      y: [0, orbit.driftY, 0],
                    }}
                    transition={{ 
                      rotate: { duration: orbit.d, repeat: Infinity, ease: "linear" },
                      x: { duration: orbit.d / 2, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: orbit.d / 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute rounded-full border border-dashed border-navy/10 dark:border-white/10"
                    style={{ width: orbit.size, height: orbit.size }}
                  />
                ))}

                {/* 2. Floating Concentric Rings (Enhanced fluid motion) */}
                {[
                  { color: "#0081C8", x: -90, y: -50, size: 210, d: 25, drift: 30 },
                  { color: "#FCB131", x: 80, y: -80, size: 160, d: 28, drift: 25 },
                  { color: "#000000", x: 20, y: 30, size: 260, d: 22, drift: 25 },
                  { color: "#00A651", x: -80, y: 120, size: 140, d: 24, drift: 35 },
                  { color: "#EE334E", x: 110, y: 70, size: 200, d: 32, drift: 40 },
                ].map((circle, idx) => (
                  <motion.div
                    key={`ring-${idx}`}
                    animate={{ 
                      x: [0, circle.drift, -circle.drift/2, 0],
                      y: [0, -circle.drift/2, circle.drift, 0],
                      scale: [1, 1.05, 0.95, 1]
                    }}
                    transition={{ 
                      duration: circle.d, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute rounded-full border-[2px] opacity-[0.2] dark:opacity-[0.35]"
                    style={{
                      width: circle.size,
                      height: circle.size,
                      borderColor: circle.color,
                      left: `50%`,
                      top: `50%`,
                      marginLeft: circle.x - (circle.size / 2),
                      marginTop: circle.y - (circle.size / 2),
                    }}
                  />
                ))}

                {/* 3. Pulsing Data Points (Technological Focus) */}
                {[
                  { color: "#0081C8", r: 150, d: 20, delay: 0 },
                  { color: "#EE334E", r: 200, d: 25, delay: 2 },
                  { color: "#FCB131", r: 110, d: 18, delay: 1 },
                  { color: "#00A651", r: 130, d: 22, delay: 4 },
                  { color: "#000000", r: 180, d: 30, delay: 3 },
                  { color: "#db4001", r: 160, d: 15, delay: 5 },
                  { color: "#0081C8", r: 150, d: 20, delay: 10 },
                  { color: "#EE334E", r: 200, d: 25, delay: 12.5 },
                  { color: "#FCB131", r: 110, d: 18, delay: 9 },
                ].map((pulse, i) => (
                  <motion.div
                    key={`pulse-${i}`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: pulse.d, repeat: Infinity, ease: "linear", delay: pulse.delay }}
                    className="absolute z-20"
                    style={{ width: pulse.r * 2, height: pulse.r * 2 }}
                  >
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
                      style={{ 
                        backgroundColor: pulse.color,
                        boxShadow: `0 0 25px ${pulse.color}`
                      }}
                    />
                  </motion.div>
                ))}

                {/* 4. Typographic Accents (Bold labels) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                   {[
                     { text: "GRASSROOTS", x: "15%", y: "25%", color: "#0081C8" },
                     { text: "PERFORMANCE", x: "80%", y: "40%", color: "#EE334E" },
                     { text: "INFRASTRUCTURE", x: "35%", y: "75%", color: "#00A651" },
                     { text: "VELOCITY", x: "65%", y: "15%", color: "#FCB131" },
                   ].map((label, i) => (
                     <motion.div
                       key={`label-${i}`}
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 0.5 }}
                       className="absolute text-[10.24px] font-black tracking-[0.3em] uppercase"
                       style={{ left: label.x, top: label.y, color: label.color }}
                     >
                       {label.text}
                     </motion.div>
                   ))}
                </div>

                {/* Central Focus (Sharper) */}
                <div className="relative">
                  <div className="absolute inset-0 w-40 h-40 bg-[#db4001] blur-[70px] opacity-[0.12]" />
                  <div className="absolute inset-0 w-56 h-56 bg-[#0081C8] blur-[90px] opacity-[0.08] -translate-x-12" />
                  <div className="w-6 h-6 bg-navy dark:bg-white rounded-full opacity-[0.15] shadow-2xl scale-110" />
                </div>
              </div>

              {/* Graduate Fade Out */}
              <div className="absolute bottom-[-150px] left-[-100px] right-[-100px] h-full bg-gradient-to-b from-transparent via-transparent to-[#F4F5F7] dark:to-[#0B1421] pointer-events-none z-20" />
            </div>
          </div>
        </div>
      </section>

      {/* KHELO INDIA MISSION 3.0 BANNER */}
      <section className="relative bg-[#030E20] overflow-hidden min-h-[504px] sm:min-h-[576px] transition-colors duration-300">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://i.ibb.co/q39yX0FX/Chat-GPT-Image-Apr-27-2026-01-24-39-PM.png" 
            alt="Indian woman athlete in high-performance action" 
            className="w-full h-full object-cover object-[75%_center] grayscale sm:grayscale-0 brightness-[0.4] sm:brightness-75 lg:brightness-100"
            referrerPolicy="no-referrer"
          />
          {/* Responsive Gradient Overlays */}
          <div className="absolute inset-0 hidden sm:block" 
               style={{ background: 'linear-gradient(90deg, rgba(3, 14, 32, 0.82) 40%, rgba(3, 14, 32, 0) 100%)' }} />
          <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-[#030E20]/60 to-[#030E20]" />
        </div>

        <div className="container mx-auto px-[32px] sm:px-[42px] relative z-20 flex flex-col justify-center py-24 min-h-[504px] sm:min-h-[576px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-full sm:max-w-[75%]"
          >
            {/* TIER 5 (quietest) — EYEBROW LABEL */}
            <div className="text-white text-[12.8px] font-medium uppercase tracking-[0.15em] mb-[16px]">
              Now Active
            </div>

            {/* TIER 1 (LOUDEST) — WORDMARK */}
            <h2 className="text-[46px] font-[200] text-[#ff5d19] leading-[1.1] tracking-[-0.02em] mb-[24px] font-serif">
              Khelo India Mission 3.0
            </h2>

            {/* TIER 2 (second-loudest) — PULL-QUOTE */}
            <div className="text-white/90 text-[18px] font-normal font-sans leading-[1.4] tracking-tight max-w-[704px] mb-[50px]">
              Every champion starts as a child with a dream. Khelo India 3.0 bridges that dream to the Olympic podium by identifying grassroots talent, nurturing it through sports science and expert coaching, and empowering athletes to shine on the world stage.
            </div>

    

            {/* CTA ROW */}
            <div className="flex items-center gap-[12px] mt-2">
              <button className="bg-transparent text-white border border-white/30 px-8 py-2.5 sm:py-3 rounded-[8px] text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF7135] hover:border-[#FF7135] transition-all flex items-center gap-4 active:scale-95 group">
                Meet the athletes <ChevronRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* NEW: JOURNEY TIMELINE SECTION */}
      <section className="pt-24 pb-0 bg-white dark:bg-[#0B1421] transition-colors duration-300">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">JOURNEY SO FAR</div>
            <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] text-[#293F54] dark:text-[#F4F5F7] tracking-tight mb-4">
              The Khelo India Story
            </h2>
            <p className="text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-2xl mx-auto leading-relaxed font-normal">
              How a policy framework grew into a nationwide movement shaping athletes, infrastructure, and sporting culture.
            </p>
          </div>

          {/* Journey Timeline Wrapper */}
          <div className="mb-0">
            <div className="bg-transparent rounded-[8px] py-[52px] px-[36px] relative max-w-7xl mx-auto overflow-hidden transition-colors duration-300">
              {/* Connecting Rail - Horizontal (Desktop/Tablet) */}
              <div 
                className="absolute top-[65px] left-[10%] right-[10%] h-[1.5px] rounded-[1px] hidden sm:block z-0" 
                style={{ 
                  background: 'linear-gradient(90deg, #D1D5DB 0%, #D1D5DB 75%, #F4754E 85%, #db4001 100%)' 
                }}
              />

              <div className="flex flex-col sm:grid sm:grid-cols-5 gap-12 sm:gap-4 relative z-10">
                {[
                  { year: "2017", title: "The Foundation", desc: "Policy framework laid" },
                  { year: "2018", title: "The Inception", desc: "Program launched" },
                  { year: "2019", title: "Scaling up", desc: "University games begin" },
                  { year: "2021–24", title: "Khelo India 2.0", desc: "Scheme restructured" },
                  { year: "2025 · NOW", title: "Khelo Bharat Niti", desc: "New national sports policy", active: true },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-row sm:flex-col items-center sm:items-center gap-6 sm:gap-0 sm:text-center group cursor-default"
                  >
                    <div className="relative flex items-center justify-center flex-shrink-0 h-[32px] w-[32px] sm:mb-6">
                      {item.active ? (
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing Ripple */}
                          <motion.div 
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute w-[56px] h-[56px] bg-[#db4001] rounded-full blur-md opacity-20" 
                          />
                          <div className="absolute w-[44px] h-[44px] bg-[#db4001]/20 rounded-full" />
                          <div className="absolute w-[32px] h-[32px] bg-[#db4001] rounded-full flex items-center justify-center z-10 shadow-lg shadow-orange-500/20">
                             <div className="w-[10px] h-[10px] bg-white rounded-full" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-[24px] h-[24px] bg-white border-[2px] border-[#D1D5DB] rounded-full z-10 flex items-center justify-center">
                          <div className="w-[8px] h-[8px] bg-[#9CA3AF] rounded-full" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-start sm:items-center">
                      <div className={cn(
                        "text-[14px] font-semibold mb-2 sm:mb-3",
                        item.active ? "text-[#db4001]" : "text-[#7B8B9E] dark:text-[#8896AC]"
                      )}>
                        {item.year}
                      </div>
                      <h3 className={cn(
                        "font-semibold text-[25px] leading-tight tracking-normal mb-2 flex items-center gap-1.5",
                        item.active ? "text-[#293f54] dark:text-white" : "text-[#293f54] dark:text-[#F4F5F7]"
                      )}>
                        {item.title.includes("NITI") ? (
                          <>
                            {item.title.split("NITI")[0]}
                            <span className="text-[#9CA3AF] font-bold">Niti</span>
                          </>
                        ) : item.title}
                      </h3>
                      <p className="text-[18px] text-[#515c65] dark:text-[#8896AC] font-normal leading-relaxed whitespace-nowrap">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 bg-white dark:bg-[#0B1421] transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4 text-center">WHAT WE HAVE ACHIEVED</div>
            <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.2] text-[#293F54] dark:text-[#F4F5F7] mb-4 text-center max-w-4xl mx-auto">
              The scale of India's sports mission
            </h2>
            <p className="text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-[700px] mx-auto leading-[1.6] font-normal">
              Every number represents a dream pursued, a talent nurtured,<br /> a champion in the making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-3 max-w-6xl mx-auto">
            {/* Hero Stat Card */}
            <div className="bg-[#db4001] rounded-xl p-8 flex flex-col justify-between text-white transition-all shadow-sm min-h-[310px]">
              <div className="text-[10.24px] sm:text-[12.8px] font-bold tracking-[0.15em] text-white/85">
                Headline impact
              </div>
              <div className="mt-8 sm:mt-0">
                <div className="text-[58px] sm:text-[61.04px] font-medium leading-none tracking-tight mb-2 flex items-baseline">
                  3,500<span className="text-[31.25px] ml-1 opacity-90">+</span>
                </div>
                <div className="text-[16px] sm:text-[16px] font-bold mb-2 tracking-wide">Khelo India athletes</div>
                <p className="text-[12.8px] sm:text-[16px] text-white/85 leading-relaxed font-normal">
                  supported annually with training, nutrition and scholarship.
                </p>
              </div>
            </div>

            {/* Supporting Tiles Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {[
                { value: "900+", label: "Infrastructure projects" },
                { value: "1,000+", label: "Khelo India schools" },
                { value: "200+", label: "Universities" },
                { value: "₹5L", label: "Scholarship / athlete" },
                { value: "36", label: "States & UTs" },
                { value: "25", label: "Sports disciplines" },
              ].map((stat, i) => (
                <div key={i} className="bg-[#F3F4F6] dark:bg-[#151B2C] rounded-md p-6 flex flex-col justify-center transition-colors duration-300">
                  <div className="text-[28px] sm:text-[31.25px] font-bold text-[#db4001] leading-none mb-1.5">{stat.value}</div>
                  <div className="text-[12.8px] sm:text-[16px] font-bold text-[#1F2836] dark:text-white leading-tight tracking-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center flex justify-center">
            <button className="w-full sm:w-[420px] py-4 border border-[#EEF0F3] dark:border-[#26334A] rounded-[8px] font-bold uppercase text-[12.8px] tracking-normal text-[#293f54] dark:text-white bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
              VIEW FULL DASHBOARD <ArrowRight size={16} className="text-[#db4001] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ASMITA */}
      <section className="relative bg-[#030E20] overflow-hidden min-h-[504px] sm:min-h-[576px] transition-colors duration-300">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://i.ibb.co/chYvvXqy/Chat-GPT-Image-Apr-27-2026-01-12-39-PM.png" 
            alt="Indian woman athlete in high-performance action" 
            className="w-full h-full object-cover object-[75%_center] grayscale sm:grayscale-0 brightness-[0.4] sm:brightness-75 lg:brightness-100"
            referrerPolicy="no-referrer"
          />
          {/* Responsive Gradient Overlays */}
          <div className="absolute inset-0 hidden sm:block" 
               style={{ background: 'linear-gradient(90deg, rgba(3, 14, 32, 0.82) 40%, rgba(3, 14, 32, 0) 100%)' }} />
          <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-[#030E20]/60 to-[#030E20]" />
        </div>

        <div className="container mx-auto px-[32px] sm:px-[42px] relative z-20 flex flex-col justify-center py-24 min-h-[504px] sm:min-h-[576px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-full sm:max-w-[75%]"
          >
            {/* TIER 5 (quietest) — EYEBROW LABEL */}
            <div className="text-white text-[12.8px] font-medium uppercase tracking-[0.15em] mb-[16px]">
              WOMEN IN SPORTS
            </div>

            {/* TIER 1 (LOUDEST) — WORDMARK */}
            <h2 className="text-[46px] font-[200] text-[#ff5d19] leading-[1.1] tracking-[-0.02em] mb-[24px] font-serif">
              Asmita
            </h2>

            {/* TIER 2 (second-loudest) — PULL-QUOTE */}
            <div className="text-white/90 text-[18px] font-normal font-sans leading-[1.4] tracking-tight max-w-[704px] mb-[50px]">
              Khelo India Women’s League is a nationwide movement empowering women in sports from first-time players in villages to hidden champions in small towns, creating pathways for every girl to rise, compete, and shine.
            </div>

            {/* CTA ROW */}
            <div className="flex items-center gap-[12px] mt-2">
              <button className="bg-transparent text-white border border-white/30 px-8 py-2.5 sm:py-3 rounded-[8px] text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF7135] hover:border-[#FF7135] transition-all flex items-center gap-4 active:scale-95 group">
                Know More<ArrowRight size={16} className="text-[#db4001] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. FIND YOUR NEAREST KHELO INDIA HUB */}
      <section className="relative py-32 bg-[#F9FAFB] dark:bg-[#141C2B] transition-colors duration-300">
        {/* Seam fade — only visible in dark; transparent in light */}
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-[#0B1421] to-transparent opacity-0 dark:opacity-100 transition-opacity" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-7xl mx-auto">
            <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">DISCOVER LOCAL IMPACT</div>
            <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.14] text-[#293F54] dark:text-[#F4F5F7] mb-4">
              Discover nearby Khelo India hubs
            </h2>
            <p className="text-[18px] md:text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-4xl leading-[1.6] mx-auto font-normal">
              Powering athletes, students, and partners with seamless access to sports ecosystems.
            </p>
          </div>

          <div className="bg-[#F3F4F6] dark:bg-[#071324] rounded-lg shadow-sm overflow-hidden max-w-5xl mx-auto p-3 flex flex-col lg:flex-row gap-3 transition-colors duration-300">
            {/* Left Column: Search + Filters + List */}
            <div className="w-full lg:w-[35%] flex flex-col h-[450px] lg:h-[550px]">
              {/* Search Bar */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by city, pin-code..." 
                    value={hubSearchQuery}
                    onChange={(e) => {
                      setHubSearchQuery(e.target.value);
                      setActiveHubIndex(0);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#141C2B] rounded-lg border-none text-[13px] focus:ring-1 focus:ring-[#db4001]/30 dark:text-white shadow-sm placeholder:text-gray-400"
                  />
                </div>
                <button className="bg-[#db4001] text-white w-11 h-11 rounded-lg hover:bg-[#C84A20] transition-colors flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Search size={18} />
                </button>
              </div>

              {/* Filter Chips */}
              <div className="flex gap-1.5 mb-4 overflow-x-auto no-scrollbar">
                {[
                  { label: "All Hubs" },
                  { label: "Training" },
                  { label: "Schools" },
                  { label: "Events" },
                ].map((filter) => (
                  <button 
                    key={filter.label} 
                    onClick={() => {
                      setHubActiveFilter(filter.label);
                      setActiveHubIndex(0);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold transition-all whitespace-nowrap border",
                      hubActiveFilter === filter.label
                        ? "bg-[#db4001] text-white border-[#db4001] shadow-md" 
                        : "bg-white dark:bg-white/5 border-gray-200 dark:border-transparent text-gray-700 dark:text-[#8896AC] hover:border-gray-300"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Hub List */}
              <div className="flex-grow overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                {filteredHubs.length > 0 ? (
                  filteredHubs.map((hub, idx) => (
                    <motion.div 
                      key={hub.id}
                      onClick={() => setActiveHubIndex(idx)}
                      whileHover={{ x: 2 }}
                      className={cn(
                        "p-4 rounded-lg transition-all cursor-pointer flex items-center justify-between border",
                        (selectedHub && selectedHub.id === hub.id)
                          ? "bg-[#FAECE7] dark:bg-[#db4001]/20 border-[#db4001] shadow-sm" 
                          : "bg-white dark:bg-[#141C2B] border-transparent dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0",
                          (selectedHub && selectedHub.id === hub.id)
                            ? "bg-[#db4001]/10 text-[#db4001]" 
                            : "bg-gray-100 dark:bg-white/5 text-gray-400"
                        )}>
                          <MapPin size={16} />
                        </div>
                        <div className="min-w-0 pr-2">
                          <div className={cn(
                            "text-[13.5px] font-bold truncate transition-colors",
                            (selectedHub && selectedHub.id === hub.id) ? "text-[#db4001]" : "text-[#0F1A2A] dark:text-white"
                          )}>
                            {hub.name}
                          </div>
                          <div className="text-[11.5px] text-gray-500 truncate dark:text-gray-400">
                            {hub.location}
                          </div>
                        </div>
                      </div>
                      <div className={cn(
                        "text-[11px] sm:text-[12px] font-bold shrink-0 ml-auto transition-colors pl-2",
                        (selectedHub && selectedHub.id === hub.id) ? "text-[#db4001]" : "text-[#db4001]"
                      )}>
                        {hub.distance}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 py-12">
                    <MapPin size={32} className="mb-3 opacity-20" />
                    <p className="text-[14px]">No hubs found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Detail Preview Card */}
            <div className="flex-grow lg:w-[65%]">
              <div className="bg-white dark:bg-[#141C2B] rounded-md overflow-hidden shadow-sm h-full flex flex-col transition-colors duration-300">
                {/* Hero Section */}
                <div className="relative h-[300px] w-full shrink-0">
                  <img 
                    src={selectedHub.image} 
                    alt={selectedHub.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-2.5 py-1 bg-[#db4001] text-white text-[9px] font-black tracking-[0.15em] rounded mb-2 capitalize">
                      {selectedHub.category}
                    </span>
                    <h2 className="text-white text-[24px] md:text-[28px] font-bold leading-tight tracking-tight">
                      {selectedHub.name}
                    </h2>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 mb-6">
                    <div>
                      <div className="text-[#db4001] text-[18px] sm:text-[20px] font-bold leading-none mb-1.5">{selectedHub.distance}</div>
                      <div className="text-[10px] sm:text-[11px] font-medium text-gray-500 tracking-wider">Distance</div>
                    </div>
                    <div>
                      <div className="text-navy dark:text-white text-[18px] sm:text-[20px] font-bold leading-none mb-1.5">{selectedHub.sportsCount}</div>
                      <div className="text-[10px] sm:text-[11px] font-medium text-gray-500 tracking-wider">Sports</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div className="text-navy dark:text-white text-[18px] sm:text-[20px] font-bold leading-none mb-1.5">{selectedHub.hours}</div>
                      <div className="text-[10px] sm:text-[11px] font-medium text-gray-500 tracking-wider">Open hours</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-white/5 w-full mb-6" />

                  {/* Facilities */}
                  <div className="mb-auto">
                    <div className="text-[11px] font-bold text-gray-400 tracking-[0.15em] mb-4">Facilities</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedHub.facilities.map((fac, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-[11px] sm:text-[12px] font-medium"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button className="flex-grow bg-[#db4001] text-white py-4 rounded-lg font-black text-[13px] tracking-[0.1em] hover:bg-[#C84A20] transition-colors shadow-lg shadow-[#db4001]/10 flex items-center justify-center gap-2">
                      <Map size={16} /> Get directions
                    </button>
                    <button className="sm:px-8 border border-gray-200 dark:border-white/10 text-navy dark:text-white py-4 rounded-lg font-black text-[13px] tracking-[0.1em] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. JOIN KHELO INDIA */}
      <section className="relative py-24 bg-white dark:bg-[#0B1421] transition-colors duration-300">
        {/* Seam fade — only visible in dark; transparent in light */}
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-[#141C2B] to-transparent opacity-0 dark:opacity-100 transition-opacity" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.34] text-[#293F54] dark:text-[#F4F5F7] mb-4">
              Join <span className="text-[#db4001]">Khelo India</span>
            </h2>
            <p className="text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-[750px] mx-auto leading-[1.65] font-normal">
              Be a part of the movement that is redefining sports in India. Whether you play, coach, support, or innovate there’s a place for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
            {[
              { title: "Athletes", desc: "Begin your journey and unlock opportunities to train, compete, and excel.", icon: Dumbbell },
              { title: "Coaches", desc: "Mentor the next generation of champions with structured programs.", icon: Users },
              { title: "Scientists", desc: "Drive performance excellence through research, analytics, and innovation.", icon: Microscope },
              { title: "Volunteers", desc: "Contribute to impactful initiatives and gain hands-on experience.", icon: HandHelping },
              { title: "Schools", desc: "Build strong grassroots programs and nurture young talent.", icon: School },
              { title: "Academics", desc: "Collaborate in advancing sports education and research.", icon: GraduationCap },
              { title: "Sponsors", desc: "Partner with us to support and elevate India’s sporting future.", icon: Briefcase },
              { title: "Not Sure Yet", desc: "Answer 3 questions we'll point you to the right role.", icon: Zap, highlight: true, cta: "Find My Fit" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-[26px] rounded-[8px] border border-[#EEF0F3] dark:border-[#26334A] transition-all cursor-pointer flex flex-col h-full group",
                  item.highlight ? "bg-[#db4001] border-[#db4001] text-white" : "bg-white dark:bg-[#141C2B] dark:text-[#F4F5F7]"
                )}
              >
                <item.icon className={cn("mb-6", item.highlight ? "text-white" : "text-[#db4001]")} size={22} />
                <h3 className={cn("text-[25px] font-semibold uppercase tracking-normal mb-4", item.highlight ? "text-white" : "text-[#293f54] dark:text-[#F4F5F7]")}>{item.title}</h3>
                <p className={cn("text-[12.8px] leading-[1.55] mb-8", item.highlight ? "text-[#FCDCBE]" : "text-[#6B7280] dark:text-[#8896AC]")}>
                  {item.desc}
                </p>
                <div className={cn(
                  "mt-auto flex items-center gap-2 font-black uppercase text-[10.24px] tracking-[1.3px] transition-colors",
                  item.highlight ? "text-white" : "text-[#0F1A2A] dark:text-[#F4F5F7] group-hover:text-[#db4001]"
                )}>
                  {item.cta || "Get Started"} <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. #IMPACT STORIES */}
      <section className="py-16 md:py-24 bg-[#F4F5F7] dark:bg-[#141C2B] transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:mb-16 text-left">
            <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">Impact Stories</div>
            <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.2] max-w-4xl text-[#293F54] dark:text-[#F4F5F7] mb-4">
              Champions born from <br className="hidden md:block" /> every corner of India
            </h2>
            <p className="text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-[700px] leading-[1.6] font-normal">
              Behind every medal is a story of sacrifice, resilience, and an unshakeable dream. These are the faces of the Khelo India revolution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Feature Story */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="lg:col-span-7 relative rounded-[8px] overflow-hidden group min-h-[720px] flex flex-col justify-end p-12"
            >
              <img 
                src="https://scontent-del3-1.cdninstagram.com/v/t51.82787-15/669646814_18315389650286458_69708641184772995_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzg3Mjk3Mzc0MzA2MTAxMjA0NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQzOS5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=fxDVEHouB0cQ7kNvwGXH2jU&_nc_oc=AdpxZzgpilYngCmeDfk-FVajmU07lMOAZlGisncY_ZCCr85cJqJUDfJijz0zyebCkCM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=UlrzzbH9WrCdCmQoVTks2w&_nc_ss=7a22e&oh=00_Af5zg5rFQkBIPA7VNwkbl_EzCKeiuVlTru8prJGYG6_yUw&oe=69FF5C38" 
                alt="Olympic Dream" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
              
              {/* Top Tags */}
              <div className="absolute top-8 left-8 z-10">
                <span className="bg-[#db4001] text-white px-4 py-2 rounded-[8px] text-[10.24px] font-bold tracking-[0.1em] uppercase">
                  ★ STORY OF THE MONTH
                </span>
              </div>
              <div className="absolute top-8 right-8 z-10">
                <span className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-[8px] text-[10.24px] font-bold tracking-[0.1em] uppercase">
                  Wrestling - 70kg Freestyle
                </span>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-[52px] md:text-[61.04px] font-display font-black leading-[1.1] tracking-[-0.02em] text-white mb-6 uppercase">
                  SENIOR ASIAN WRESTLING <br /> CHAMPION <br /> ABHIMANYU
                </h3>
                
                <p className="text-[16px] text-white/80 mb-6 max-w-[540px] leading-[1.6]">
                  India shines bright at the Senior Asian Wrestling Championships 2026 as our powerhouse wrestler, Abhimanyu, clinches the GOLD in the 70kg Freestyle category.
                </p>

                
                <div className="flex gap-4 text-[#db4001] font-bold text-[12.8px]">
                  <span>#GoldMedal</span>
                  <span>#AsianChampionships2026</span>
                </div>
              </div>
            </motion.div>

            {/* IMPACT STORIES */}
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: "Anjali",
                  name: "ANJALI RANA, 19",
                  sport: "ICE HOCKEY · PUNJAB",
                  desc: "From a roadside boxing club to the Khelo India Games gold — Anjali's story of discipline and grit.",
                  img: "https://news.kiit.ac.in/wp-content/uploads/2018/08/Dutee-Chand-from-KIIT-KISS-won-Silver-Medal-in-Asian-Games-750x430.jpg",
                  gender: "HER"
                },
                {
                  id: "Anjun",
                  name: "ARJUN PATIL, 22",
                  sport: "SWIMMING · MAHARASHTRA",
                  desc: "A workplace accident at 18 couldn't stop Arjun from reaching the national podium.",
                  img: "https://thebridge.in/h-upload/2025/03/24/60950-untitled-design-2025-03-24t204524885.webp",
                  gender: "HIS"
                },
                {
                  id: "rohan",
                  name: "ROHAN NAIR, 15",
                  sport: "BADMINTON · KERALA",
                  desc: "The youngest swimmer to break the state record, now training for the 2028 Olympics.",
                  img: "https://pbs.twimg.com/media/HC5RkpcbYAArqih?format=jpg&name=large",
                  gender: "HIS"
                },
                {
                  id: "thangjam",
                  name: "THANGJAM DEVI, 20",
                  sport: "WEIGHTLIFTING · MANIPUR",
                  desc: "Carrying the legacy of Manipur's weightlifting excellence to the international stage.",
                  img: "https://www.judoinside.com/photos/hans/2018/Youth_Olympic_Games_Team_event_Buenos_Aires/20181010_yog_ijf_day4_teams_9827_thangjam_tababi_devi.jpg",
                  gender: "HER"
                }
              ].map((story, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-[#141C2B] rounded-[8px] group border border-[#EEF0F3] dark:border-white/[0.05] hover:border-[#db4001]/30 transition-all flex flex-col shadow-sm p-3 gap-3"
                >
                  <div className="aspect-[4/3] overflow-hidden relative rounded-[8px]">
                    <img 
                      src={story.img} 
                      alt={story.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-2 pb-1 flex flex-col flex-grow bg-transparent transition-colors duration-300">
                    <div className="text-[#8A94A6] dark:text-[#8896AC] text-[10.24px] font-bold uppercase tracking-[0.15em] mb-1">
                      {story.sport}
                    </div>
                    <h4 className="text-[20px] font-bold mb-1 tracking-tight transition-colors text-[#0F1A2A] dark:text-[#F4F5F7] uppercase">
                      {story.name}
                    </h4>
                    <p className="text-[12.8px] text-[#6B7280] dark:text-[#B9C1CC] leading-relaxed mb-4 line-clamp-3">
                      {story.desc}
                    </p>
                  <button className="mt-auto flex items-center gap-2 text-[10.24px] font-black uppercase tracking-[0.15em] text-[#db4001] hover:opacity-80 transition-colors group/btn">
                      READ {story.gender} STORY <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL FEEDS & LIVE HAPPENINGS */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#141C2B] transition-colors duration-300 overflow-hidden">
        <div className="container mx-auto px-4 text-left">
          <div className="mb-12 md:mb-16">
            <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">KHELOINDIA IN ACTION</div>
            <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.14] text-[#293F54] dark:text-[#F4F5F7] mb-4">
              Live from the field
            </h2>
            <p className="text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-[700px] leading-[1.6] font-normal">
              Follow the movement in real time. Stories from the ground, victories on the mat, breakthroughs on the track.
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[
              {
                platform: "Instagram",
                image: "https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2025/05/14/20250514150F_X5uavxb-scaled.jpg?quality=80&zoom=1&ssl=1A",
                caption: "Congratulations to Priya Singh on winning Gold at the Khelo India School Games 2025! #KheloIndia #Athletics",
                tall: true
              },
              {
                platform: "Twitter",
                image: "https://images.indianexpress.com/2023/05/yogi-ji.jpg?w=1200",
                caption: "Shooting stars at Karni Singh Ranges — watch these young champions in action! #ShootingIndia",
                tall: false
              },
              {
                platform: "Instagram",
                image: "https://apnnews.in/wp-content/uploads/2025/05/Untitled-design-2025-05-12T161410.501.jpg",
                caption: "The spirit of competition is alive! Grassroots athletes showing incredible determination today.",
                tall: false
              },
              {
                platform: "YouTube",
                image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/gjligcznk7ov9zocrxbw",
                caption: "Highlights: The opening ceremony of Khelo India University Games was a spectacle of culture and sport!",
                tall: true
              },
              {
                platform: "Twitter",
                image: "https://thesportsroom.in/wp-content/uploads/2022/06/01E158DB-47BD-4589-A9C3-14DA6981E37F.jpeg",
                caption: "Record alert! New national junior record in 100m sprint set today at the athletics meet. #Speed",
                tall: true
              },
              {
                platform: "Instagram",
                image: "https://pbs.twimg.com/media/DxXgGpeX0AEi-vi.jpg",
                caption: "Day 3 of #KISG2025 — Wrestling has begun at Siri Fort Sports Complex! Who's your favourite? ",
                tall: false
              }
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="break-inside-avoid bg-white dark:bg-white/5 rounded-[8px] overflow-hidden border border-gray-50 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative"
              >
                <div className={cn(
                  "relative overflow-hidden",
                  post.tall ? "aspect-[3/4.2]" : "aspect-[3/2]"
                )}>
                  <img 
                    src={post.image} 
                    alt="Social Feed" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <p className="text-[16px] text-[#6B7280] dark:text-[#B9C1CC] leading-relaxed mb-6 font-medium">
                    {post.caption}
                  </p>
                  <button className="flex items-center gap-2 text-[10.24px] font-bold tracking-[0.1em] uppercase text-[#db4001] hover:opacity-80 transition-colors group/btn">
                    View post <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 9.5 WHAT PEOPLE ARE SAYING - BATCHED MENTIONS */}
      <section className="py-24 bg-[#F9FAFB] dark:bg-[#060C18] transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-16">
            <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">In the buzz</div>
            <h2 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.1] text-[#293F54] dark:text-[#F4F5F7] mb-4">
              What people are saying
            </h2>
            <p className="text-[18px] text-[#515c65] dark:text-[#B9C1CC] max-w-[640px] leading-[1.6]">
              Recent mentions of Khelo India from athletes, leaders, and the press across the web.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* HERO CARD (LEFT) */}
            <div className="lg:col-span-7">
              {socialMentions.filter(m => m.isHero).map(hero => (
                <motion.a
                  key={hero.id}
                  href={hero.url}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="block group bg-white dark:bg-[#0F1A2A] rounded-[16px] overflow-hidden border border-[#EEF0F3] dark:border-white/5 hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={hero.thumbnail} 
                      alt={hero.headline}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A2A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-[#0F1A2A]/90 text-[#0F1A2A] dark:text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-[#db4001] flex items-center justify-center text-[#db4001] dark:text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[#293F54] dark:text-[#F4F5F7] font-bold text-[14px]">
                        {hero.source.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#0F1A2A] dark:text-[#F4F5F7]">{hero.source}</div>
                        <div className="text-[12px] text-[#8A94A6] dark:text-[#8896AC]">{hero.timestamp}</div>
                      </div>
                    </div>
                    <h3 className="text-[24px] md:text-[28px] font-bold text-[#0F1A2A] dark:text-[#F4F5F7] leading-tight mb-4 group-hover:text-[#db4001] transition-colors">
                      {hero.headline}
                    </h3>
                    <p className="text-[16px] text-[#515c65] dark:text-[#B9C1CC] leading-relaxed mb-0">
                      {hero.excerpt}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* SUPPORTING CARDS (RIGHT) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {socialMentions.filter(m => !m.isHero).map((mention, i) => (
                <motion.a
                  key={mention.id}
                  href={mention.url}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col p-6 bg-white dark:bg-[#0F1A2A] rounded-[16px] border border-[#EEF0F3] dark:border-white/5 hover:shadow-md hover:border-[#db4001]/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px]",
                        mention.type === 'press' ? "bg-[#0081C8]" : "bg-[#EE334E]"
                      )}>
                        {mention.source.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-[#0F1A2A] dark:text-[#F4F5F7] flex items-center gap-1.5">
                          {mention.source}
                          {mention.handle && (
                            <span className="text-[#8A94A6] dark:text-[#8896AC] font-normal">· {mention.timestamp}</span>
                          )}
                        </div>
                        {mention.handle && (
                          <div className="text-[12px] text-[#8A94A6] dark:text-[#8896AC]">{mention.handle}</div>
                        )}
                        {!mention.handle && (
                           <div className="text-[12px] text-[#8A94A6] dark:text-[#8896AC] font-medium">{mention.timestamp}</div>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-[#8A94A6] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[15px] font-medium text-[#0F1A2A] dark:text-[#F4F5F7] leading-snug group-hover:text-[#db4001] transition-colors">
                    {mention.headline}
                  </p>
                </motion.a>
              ))}

              <motion.button 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-4 flex items-center justify-center gap-2 text-[14px] font-bold text-[#515c65] dark:text-[#8896AC] hover:text-[#db4001] transition-colors group/all"
              >
                View all mentions <ArrowRight size={16} className="transition-transform group-hover/all:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. STATISTICS TICKER (SWAPPED FROM HERO) */}
      <div className="bg-[#060C17] py-4 overflow-hidden relative z-30 border-t border-white/10">
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {[
            { text: "572+ Medals at National Level", icon: Trophy },
            { text: "900+ SAI Centres", icon: Building2 },
            { text: "2.5 Lakh+ Athletes Registered", icon: Users },
            { text: "36 States & UTs Covered", icon: Globe }
          ].concat([
            { text: "572+ Medals at National Level", icon: Trophy },
            { text: "900+ SAI Centres", icon: Building2 },
            { text: "2.5 Lakh+ Athletes Registered", icon: Users },
            { text: "36 States & UTs Covered", icon: Globe }
          ]).map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center group cursor-default">
                <Icon size={16} className="text-primary opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="ml-3 text-white font-display font-bold text-[10.24px] tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                  {stat.text}
                </span>
                <span className="mx-12 h-4 w-[1px] bg-white/20" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
