import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { 
  Trophy, 
  Target, 
  Map, 
  ShieldCheck, 
  History, 
  Search, 
  ChevronRight, 
  Building2, 
  Users, 
  School, 
  HeartPulse, 
  Zap, 
  Calendar, 
  FileText, 
  Bell, 
  Briefcase, 
  Newspaper, 
  BookOpen, 
  Instagram,
  Sun,
  Moon,
  Accessibility,
  Languages,
  ChevronDown,
  Menu,
  X,
  Shield,
  Dumbbell,
  Heart,
  Cpu
} from "lucide-react";
import { useState, useEffect } from "react";
import { AccessibilityPanel } from "./AccessibilityPanel";
import { AnimatePresence } from "motion/react";

const aboutLinks = [
  {
    id: "mission",
    title: "Khelo India Mission",
    href: "/mission",
    description: "Our visionary focus on transforming India into a global sporting powerhouse.",
    icon: Target,
  },
  {
    id: "journey",
    title: "Khelo India Journey",
    href: "/journey",
    description: "Chronological evolution of the mission since its inception.",
    icon: History,
  },
  {
    id: "state",
    title: "Khelo India In States",
    href: "/state",
    description: "Geographical impact and state-wise sports excellence centers.",
    icon: Map,
  },
];

const dashboardLinks = [
  {
    id: "infrastructure",
    title: "Infrastructure",
    href: "/dashboard/infrastructure",
    description: "Real-time tracking of sports facilities and project progress across India.",
    icon: Building2,
  },
  {
    id: "competitions",
    title: "Competitions",
    href: "/dashboard/competitions",
    description: "Live updates and historical data from Khelo India Games and leagues.",
    icon: Trophy,
  },
  {
    id: "athletes",
    title: "Khelo India Athletes",
    href: "/dashboard/athletes",
    description: "Comprehensive database and performance tracking of identified talent.",
    icon: Zap,
  },
  {
    id: "academies",
    title: "Academies",
    href: "/dashboard/academies",
    description: "Monitoring of excellence centers and accredited academies.",
    icon: School,
  },
  {
    id: "fit-india",
    title: "Fit India",
    href: "/dashboard/fit-india",
    description: "Metrics and participation data from the nationwide fitness movement.",
    icon: HeartPulse,
  },
  {
    id: "inclusiveness",
    title: "Inclusiveness",
    href: "/dashboard/inclusiveness",
    description: "Data on para-sports, women in sports, and rural outreach programs.",
    icon: Users,
  },
];

const discoverLinks = [
  {
    title: "All about Sports",
    href: "/discover/sports",
    description: "Portal for athletes and parents to access sports resources.",
    icon: Users,
  },
  {
    title: "Sport Facilities",
    href: "/discover/facilities",
    description: "Find and access world-class sports infrastructure.",
    icon: Building2,
  },
  {
    title: "Khelo India Athlete Journey",
    href: "/discover/journey",
    description: "Track the developmental path of identified sporting talent.",
    icon: Map,
  },
  {
    title: "Games Calendar",
    href: "/events",
    description: "Stay updated with upcoming national and regional games.",
    icon: Calendar,
  },
  {
    title: "Game Results",
    href: "/discover/results",
    description: "Official results and standings from all Khelo India competitions.",
    icon: Trophy,
  },
  {
    title: "Compliances",
    href: "/discover/compliances",
    description: "Essential guidelines and regulatory requirements for athletes.",
    icon: ShieldCheck,
  },
];

const documentLinks = [
  {
    title: "REPORTS",
    href: "/documents/reports",
    description: "Annual performance reports and initiative impact studies.",
    icon: FileText,
  },
  {
    title: "CIRCULARS",
    href: "/documents/circulars",
    description: "Official notifications and administrative updates.",
    icon: Bell,
  },
  {
    title: "TENDERS",
    href: "/documents/tenders",
    description: "Procurement opportunities and project bidding information.",
    icon: Briefcase,
  },
  {
    title: "PRESS RELEASES",
    href: "/documents/press-releases",
    description: "Latest official news and media announcements.",
    icon: Newspaper,
  },
  {
    title: "STANDARD OPERATING PROCEDURES",
    href: "/documents/sop",
    description: "Operational guidelines for centers and event management.",
    icon: BookOpen,
  },
];

const mediaLinks = [
  {
    title: "NEWS",
    href: "/media/news",
    description: "Daily updates from the world of Indian sports.",
    icon: Newspaper,
  },
  {
    title: "GALLERY",
    href: "/media/gallery",
    description: "Visual highlights and moments from the field.",
    icon: Instagram,
  },
  {
    title: "ARTICLES",
    href: "/media/articles",
    description: "In-depth features and expert opinions on sports.",
    icon: FileText,
  },
  {
    title: "IMPACT STORIES",
    href: "/media/impact-stories",
    description: "Inspiring tales of transformation through sports.",
    icon: HeartPulse,
  },
];

const missionSubLinks = [
  { title: "Sports infrastructure for medal strategy", icon: Building2 },
  { title: "Strengthening strategic sports assets", icon: Shield },
  { title: "State action plan for sports infrastructure development", icon: Map },
  { title: "Sports competitions & leagues", icon: Trophy },
  { title: "Talent identification and development", icon: Target },
  { title: "Coach & support staff development", icon: Users },
  { title: "Khelo India training facilities", icon: Dumbbell },
  { title: "Fit India movement", icon: Heart },
  { title: "Sports technology", icon: Cpu },
];

const LANGUAGES = [
  "English", "हिंदी", "অসমীয়া", "বাংলা", "Bodo", "डोगरी", "ગુજરાતી", "ಕನ್ನಡ", "كأشُر", "कोंकणी", "मैथिली", "മലയാളം", "মৈতেইলোন", "मराठी", "नेपाली", "ଓଡ଼ିଆ", "ਪੰਜਾਬੀ", "संस्कृतम्", "संताली", "सिन्धी", "தமிழ்", "తెలుగు", "اردو"
];

export const Navbar = () => {
  const location = useLocation();
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>("mission");
  const [isDark, setIsDark] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Sync isMenuOpen with path changes to close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar */}
      <div className="bg-navy text-white py-2 border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsAccessibilityOpen(true)}
              className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2"
            >
              <Accessibility size={12} />
              Accessibility Options
            </button>
            <button className="hover:text-primary transition-colors cursor-pointer">
              Screen Reader Access
            </button>
            <div className="flex items-center gap-2 border-l border-white/20 pl-6">
              <span>Font Size:</span>
              <div className="flex gap-3">
                <button className="hover:text-primary transition-colors">A-</button>
                <button className="text-primary">A</button>
                <button className="hover:text-primary transition-colors">A+</button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer group"
              >
                <Languages size={14} className="text-primary" />
                <span className="text-white group-hover:text-primary transition-colors">{selectedLang}</span>
                <ChevronDown size={10} className={cn("transition-transform text-white/50", isLangOpen && "rotate-180")} />
              </button>
              
              {isLangOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[100]" 
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-[280px] bg-navy border border-white/10 rounded-lg shadow-2xl py-3 z-[101] max-h-[400px] overflow-y-auto grid grid-cols-2 gap-1 px-2 animate-in fade-in zoom-in duration-200">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLang(lang === "English" ? "EN" : lang);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "text-left px-3 py-2 rounded-md text-[10px] font-bold tracking-tight transition-all",
                          ((selectedLang === lang) || (selectedLang === "EN" && lang === "English"))
                            ? "text-primary bg-white/10" 
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-navy/80 dark:backdrop-blur-md dark:border-white/10 transition-colors duration-300">
        <div className="container mx-auto px-4 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={isDark ? "https://i.ibb.co/pj9RQjGL/Khelo-India-White-Logo.png" : "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Khelo_India.svg/960px-Khelo_India.svg.png?_=20250121021840"} 
              alt="Khelo India Logo" 
              className="h-[60px] w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:block ml-auto">
          <NavigationMenuList className="gap-1 justify-end">
            <NavigationMenuItem>
              <Link to="/" className="px-3 py-2 font-display font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors dark:text-white">
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-display font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors bg-transparent border-none dark:text-white">
                About Us
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-transparent border-none shadow-none ring-0 group-data-[viewport=false]/navigation-menu:bg-transparent group-data-[viewport=false]/navigation-menu:ring-0 group-data-[viewport=false]/navigation-menu:shadow-none">
                <div className="flex w-[720px] bg-white dark:bg-navy p-6 gap-8 rounded-2xl shadow-2xl relative z-[100] overflow-hidden isolate">
                  {/* Left Column: Primary Nav */}
                  <div className="w-[45%] flex flex-col gap-8">
                    <ul className="space-y-6">
                      {aboutLinks.map((link) => {
                        const isActive = location.pathname === link.href;
                        const isMission = link.id === "mission";
                        
                        return (
                          <li key={link.title} className="group" onMouseEnter={() => setActiveSubMenu(link.id)}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={link.href}
                                className={cn(
                                  "flex items-start gap-6 p-4 rounded-lg border border-transparent transition-all hover:bg-[#F1F3F5] dark:hover:bg-white/10",
                                  (isActive || (!isMission && activeSubMenu === link.id)) && "bg-[#F1F3F5] dark:bg-white/10"
                                )}
                              >
                                <link.icon className="w-6 h-6 text-[#db4001] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <div className="flex flex-col gap-1.5 min-w-0 pr-4 text-left">
                                  <span className="text-[15px] font-black uppercase tracking-tight text-navy dark:text-white leading-none whitespace-nowrap">
                                    {link.title}
                                  </span>
                                  <span className="text-[13px] text-gray-400 dark:text-white/40 leading-snug font-medium line-clamp-2">
                                    {link.description}
                                  </span>
                                </div>
                                {isMission && (
                                  <div className="ml-auto text-[#db4001] font-bold text-xl leading-none shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">›</div>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-[1px] bg-gray-100 dark:bg-white/10 self-stretch" />

                  {/* Right Column: Dynamic Sub-Nav */}
                  <div className="flex-1">
                    {activeSubMenu === "mission" && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                        key="mission-submenu"
                      >
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#db4001] mb-6">Verticals</h4>
                        <ul className="space-y-2.5">
                          {missionSubLinks.map((item, idx) => (
                            <li key={idx}>
                              <button className="text-[14px] font-semibold text-navy hover:text-[#db4001] transition-colors flex items-center gap-3 group text-left w-full dark:text-white tracking-tight">
                                <item.icon size={16} className="text-[#db4001] shrink-0 opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110" />
                                {item.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-display font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors bg-transparent border-none dark:text-white">
                Discover
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0 bg-transparent border-none shadow-none ring-0 overflow-visible">
                <div className="grid w-[680px] gap-6 p-8 md:grid-cols-2 bg-white dark:bg-navy rounded-xl shadow-2xl relative z-[100] isolate">
                  {discoverLinks.map((link) => (
                    <li key={link.title} className="list-none">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-white/5 group"
                        >
                          <div className="flex items-center gap-3">
                            <link.icon className="w-6 h-6 text-[#db4001] transition-colors" />
                            <div className="text-[13px] font-black uppercase tracking-tight dark:text-white group-hover:text-navy dark:group-hover:text-white transition-colors">
                              {link.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-[11px] leading-snug text-gray-400 dark:text-white/40 mt-2 font-medium">
                            {link.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-display font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors bg-transparent border-none dark:text-white">
                Documents
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0 bg-transparent border-none shadow-none ring-0 overflow-visible">
                <div className="grid w-[680px] gap-6 p-8 md:grid-cols-2 bg-white dark:bg-navy rounded-xl shadow-2xl relative z-[100] isolate">
                  {documentLinks.map((link) => (
                    <li key={link.title} className="list-none">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-white/5 group"
                        >
                          <div className="flex items-center gap-3">
                            <link.icon className="w-6 h-6 text-[#db4001] transition-colors" />
                            <div className="text-[13px] font-black uppercase tracking-tight dark:text-white group-hover:text-navy dark:group-hover:text-white transition-colors">
                              {link.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-[11px] leading-snug text-gray-400 dark:text-white/40 mt-2 font-medium">
                            {link.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-display font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors bg-transparent border-none dark:text-white">
                Media
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0 bg-transparent border-none shadow-none ring-0 overflow-visible">
                <div className="grid w-[680px] gap-6 p-8 md:grid-cols-2 bg-white dark:bg-navy rounded-xl shadow-2xl relative z-[100] isolate">
                  {mediaLinks.map((link) => (
                    <li key={link.title} className="list-none">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-white/5 group"
                        >
                          <div className="flex items-center gap-3">
                            <link.icon className="w-6 h-6 text-[#db4001] transition-colors" />
                            <div className="text-[13px] font-black uppercase tracking-tight dark:text-white group-hover:text-navy dark:group-hover:text-white transition-colors">
                              {link.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-[11px] leading-snug text-gray-400 dark:text-white/40 mt-2 font-medium">
                            {link.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-display font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors bg-transparent border-none dark:text-white">
                Dashboard
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0 bg-transparent border-none shadow-none ring-0 overflow-visible">
                <div className="grid w-[680px] gap-6 p-8 md:grid-cols-2 bg-white dark:bg-navy rounded-xl shadow-2xl relative z-[100] isolate">
                  {dashboardLinks.map((link) => {
                    const isActive = location.pathname === link.href;
                    return (
                      <li key={link.title} className="list-none">
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className={cn(
                              "block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-white/5 group",
                              isActive && "bg-gray-50 dark:bg-white/5"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <link.icon className="w-6 h-6 text-[#db4001] transition-colors" />
                              <div className={cn("text-[13px] font-black uppercase tracking-tight dark:text-white transition-colors", isActive ? "text-[#db4001]" : "group-hover:text-navy dark:group-hover:text-white")}>
                                {link.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-[11px] leading-snug text-gray-400 dark:text-white/40 mt-2 font-medium">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {[
              { name: "FIT India", href: "/fit-india" },
              { name: "Khel Setu", href: "/khel-setu" },
            ].map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link to={item.href} className="px-3 py-2 font-display font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors whitespace-nowrap dark:text-white">
                  {item.name}
                </Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-3 py-2 font-display font-bold uppercase text-xs tracking-widest hover:text-primary transition-colors bg-transparent border-none dark:text-white">
                Connect
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0 bg-transparent border-none shadow-none ring-0 overflow-visible">
                <div className="w-[240px] p-6 bg-white dark:bg-navy rounded-xl shadow-2xl relative z-[100] isolate">
                  <ul className="space-y-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/contact/reach-team" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-white/5 font-display font-black uppercase text-[12px] tracking-widest dark:text-white hover:text-[#db4001]"
                        >
                          Directory
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/contact/raise-concern" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 dark:hover:bg-white/5 font-display font-black uppercase text-[12px] tracking-widest dark:text-white hover:text-[#db4001]"
                        >
                          Grievance Redressal
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <button 
                onClick={toggleTheme}
                className="p-2 text-navy hover:text-primary transition-colors dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <button className="p-2 text-navy hover:text-primary transition-colors dark:text-gray-300">
                <Search size={18} />
              </button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Toggle & Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 text-navy hover:text-primary transition-colors dark:text-white"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-navy dark:text-white hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 top-[72px] bg-white dark:bg-navy z-[40] lg:hidden overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-8 pb-32">
                <nav className="flex flex-col gap-6">
                  {/* About Links */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#db4001] mb-4">About Us</h3>
                    <div className="grid gap-3">
                      {aboutLinks.map((link) => (
                        <Link 
                          key={link.id} 
                          to={link.href} 
                          className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-white/5 rounded-xl transition-colors"
                        >
                          <link.icon className="w-5 h-5 text-primary" />
                          <span className="text-[13px] font-bold dark:text-white uppercase tracking-tight">{link.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Discover Links */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#db4001] mb-4">Discover</h3>
                    <div className="grid gap-3">
                      {discoverLinks.map((link) => (
                        <Link 
                          key={link.title} 
                          to={link.href} 
                          className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-white/5 rounded-xl transition-colors"
                        >
                          <link.icon className="w-5 h-5 text-primary" />
                          <span className="text-[13px] font-bold dark:text-white uppercase tracking-tight">{link.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Dashboard Links */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#db4001] mb-4">Dashboard</h3>
                    <div className="grid gap-3">
                      {dashboardLinks.map((link) => (
                        <Link 
                          key={link.id} 
                          to={link.href} 
                          className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-white/5 rounded-xl transition-colors"
                        >
                          <link.icon className="w-5 h-5 text-primary" />
                          <span className="text-[13px] font-bold dark:text-white uppercase tracking-tight">{link.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Documents & Media */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#db4001] mb-4">Documents</h3>
                      <div className="flex flex-col gap-2">
                        {documentLinks.map((link) => (
                          <Link key={link.title} to={link.href} className="text-[12px] font-bold dark:text-white/80 hover:text-primary transition-colors uppercase py-1">
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#db4001] mb-4">Media</h3>
                      <div className="flex flex-col gap-2">
                        {mediaLinks.map((link) => (
                          <Link key={link.title} to={link.href} className="text-[12px] font-bold dark:text-white/80 hover:text-primary transition-colors uppercase py-1">
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Connect */}
                  <div className="pt-6 border-t border-gray-100 dark:border-white/10">
                    <div className="flex flex-col gap-4">
                      <Link to="/contact/reach-team" className="text-[12px] font-black uppercase tracking-[0.2em] text-navy dark:text-white hover:text-[#db4001] transition-colors">Directory</Link>
                      <Link to="/contact/raise-concern" className="text-[12px] font-black uppercase tracking-[0.2em] text-navy dark:text-white hover:text-[#db4001] transition-colors">Grievance Redressal</Link>
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        </div>
      </div>
      
      <AccessibilityPanel 
        isOpen={isAccessibilityOpen} 
        onClose={() => setIsAccessibilityOpen(false)} 
      />
    </header>
  );
};
