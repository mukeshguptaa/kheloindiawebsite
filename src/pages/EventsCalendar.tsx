import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  User, 
  Share2, 
  ExternalLink, 
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  FileText, 
  Map, 
  ArrowRight,
  Trophy,
  Users,
  FlaskConical,
  Award,
  AlertCircle,
  Play
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';

// Types
type Stakeholder = 'Athlete' | 'Coach' | 'Scientist' | 'Volunteer';
type Tier = 'Tier 1' | 'Tier 2' | 'Tier 3';

interface Event {
  id: string;
  title: string;
  description: string;
  sport: string;
  tier: Tier;
  category: string;
  stakeholders: Stakeholder[];
  venue: string;
  location: string;
  startDate: Date;
  endDate: Date;
  duration?: string;
  registrationDeadline: Date;
  eligibilityCutoff: string;
  geography: string;
  ageGroup: string;
  status: 'live' | 'closing' | 'upcoming';
  urgencyLabel?: string;
  spotsLeft?: number;
  color: string;
}

// Mock Data
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Senior National Wrestling Trials',
    description: '70kg Freestyle · National Selection Event for Asian Championships qualifier',
    sport: 'Wrestling',
    tier: 'Tier 1',
    category: 'SAI · WFI',
    stakeholders: ['Athlete', 'Coach'],
    venue: 'Indira Gandhi Stadium',
    location: 'Delhi',
    startDate: new Date(2026, 4, 8),
    endDate: new Date(2026, 4, 11),
    duration: '4 days',
    registrationDeadline: new Date(2026, 4, 10, 23, 59),
    eligibilityCutoff: 'Born on or after Jan 1, 2009',
    geography: 'Manipur',
    ageGroup: 'U-17',
    status: 'closing',
    urgencyLabel: 'REG. CLOSES IN 2D',
    spotsLeft: 47,
    color: '#db4001' // Orange/Red
  },
  {
    id: '2',
    title: 'Khelo India Athletics Finals',
    description: 'Final showdown for track and field events with international scouts in attendance.',
    sport: 'Athletics',
    tier: 'Tier 1',
    category: 'KIYG',
    stakeholders: ['Athlete', 'Coach', 'Scientist', 'Volunteer'],
    venue: 'JNU Stadium',
    location: 'Delhi',
    startDate: new Date(2026, 4, 6),
    endDate: new Date(2026, 4, 9),
    duration: '4 days',
    registrationDeadline: new Date(2026, 4, 1),
    eligibilityCutoff: 'Open Category',
    geography: 'Delhi',
    ageGroup: 'Open',
    status: 'live',
    urgencyLabel: 'DAY 4 OF 4',
    color: '#10b981' // Green
  },
  {
    id: '3',
    title: 'Asian Wrestling Champs Qualifier',
    sport: 'Wrestling',
    description: 'Regional selection for the upcoming Asian championships in Mumbai.',
    tier: 'Tier 1',
    category: 'WFI',
    stakeholders: ['Athlete'],
    venue: 'Mumbai Arena',
    location: 'Mumbai',
    startDate: new Date(2026, 4, 12),
    endDate: new Date(2026, 4, 14),
    duration: '3 days',
    registrationDeadline: new Date(2026, 4, 5),
    eligibilityCutoff: 'Pro Tier',
    geography: 'Maharashtra',
    ageGroup: 'Advanced',
    status: 'upcoming',
    urgencyLabel: 'STARTS IN 6 DAYS',
    color: '#3b82f6' // Blue
  },
  {
    id: '4',
    title: 'Sports science briefing — Patiala',
    description: 'Key updates on performance nutrition and biomechanical assessment for coaches and scientists.',
    sport: 'All Sports',
    tier: 'Tier 2',
    category: 'NIS',
    stakeholders: ['Coach', 'Scientist'],
    venue: 'NIS Patiala',
    location: 'Patiala',
    startDate: new Date(2026, 4, 8),
    endDate: new Date(2026, 4, 8),
    duration: '1 day',
    registrationDeadline: new Date(2026, 4, 1),
    eligibilityCutoff: 'Level 2 Certified',
    geography: 'Punjab',
    ageGroup: 'N/A',
    status: 'upcoming',
    color: '#10b981' // Green
  },
  {
    id: '5',
    title: 'Coach orientation — Delhi region',
    description: 'Standardization of training protocols for the North zone talent hubs.',
    sport: 'Multi-sport',
    tier: 'Tier 3',
    category: 'Regional',
    stakeholders: ['Coach'],
    venue: 'SAI Regional Center',
    location: 'Delhi',
    startDate: new Date(2026, 4, 8),
    endDate: new Date(2026, 4, 8),
    duration: '1 day',
    registrationDeadline: new Date(2026, 4, 1),
    eligibilityCutoff: 'Registered Coaches',
    geography: 'Delhi',
    ageGroup: 'N/A',
    status: 'upcoming',
    color: '#d97706' // Gold
  }
];

const STAKEHOLDERS: Stakeholder[] = ['Athlete', 'Coach', 'Scientist', 'Volunteer'];
const SPORTS = ['All', 'Wrestling', 'Athletics', 'Boxing', 'Swimming', 'Archery'];
const TIERS: Tier[] = ['Tier 1', 'Tier 2', 'Tier 3'];
const REGIONS = ['All', 'Manipur', 'Delhi', 'Maharashtra', 'Haryana', 'Punjab'];
const AGES = ['All', 'U-14', 'U-17', 'U-21', 'Open'];

const DEFAULT_FILTERS = {
  programType: ['All'],
  stakeholderRole: ['Athlete'],
  sport: ['All'],
  status: ['Any'],
  geography: ['All States & UTs'],
  ageCategory: ['All'],
  gender: ['Any'],
  tidFocus: ['Any']
};

export const EventsCalendar = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [tempFilters, setTempFilters] = useState(filters);
  const [editingCategory, setEditingCategory] = useState<keyof typeof filters | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 8));
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1)); // State for the month viewed in the calendar
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'timeline'>('month');

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          event.title.toLowerCase().includes(query) || 
          event.venue.toLowerCase().includes(query) || 
          event.location.toLowerCase().includes(query) ||
          event.sport.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // In a real app, we'd use all filters. For this prototype, we'll match sport and stakeholder role.
      const sportMatch = filters.sport.includes('All') || filters.sport.includes(event.sport) || event.sport === 'All Sports';
      const roleMatch = filters.stakeholderRole.includes('All') || event.stakeholders.some(s => filters.stakeholderRole.includes(s as any));
      
      return sportMatch && roleMatch;
    });
  }, [filters]);

  // Events for selected date
  const eventsForSelectedDate = useMemo(() => {
    return filteredEvents.filter(event => {
      const d = selectedDate;
      return d >= event.startDate && d <= event.endDate;
    });
  }, [filteredEvents, selectedDate]);

  const activeEvent = useMemo(() => {
    if (activeEventId) return MOCK_EVENTS.find(e => e.id === activeEventId);
    return eventsForSelectedDate[0] || null;
  }, [activeEventId, eventsForSelectedDate]);

  // Update active event when date changes
  useEffect(() => {
    if (eventsForSelectedDate.length > 0) {
      setActiveEventId(eventsForSelectedDate[0].id);
    } else {
      setActiveEventId(null);
    }
  }, [eventsForSelectedDate]);

  // Calendar Navigation Logic
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Calendar Grid Logic
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDay + 1;
    if (day <= 0 || day > daysInMonth) return null;
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
  });

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter(event => {
      return date >= event.startDate && date <= event.endDate;
    });
  };

  const getFilterCount = () => {
    let count = 0;
    (Object.keys(filters) as (keyof typeof filters)[]).forEach(key => {
      const isDefault = JSON.stringify(filters[key]) === JSON.stringify(DEFAULT_FILTERS[key]);
      if (!isDefault) {
        // For multi-select, we could count items, but usually it's better to count categories or total selected items
        // excluding the "All/Any" option.
        count += filters[key].filter(v => 
          v !== 'All' && v !== 'Any' && v !== 'All States & UTs'
        ).length;
      }
    });
    return count;
  };

  const toggleFilter = (category: keyof typeof filters, option: string) => {
    setTempFilters(prev => {
      const current = prev[category];
      const isDefault = option === 'All' || option === 'Any' || option === 'All States & UTs';
      
      if (isDefault) {
        return { ...prev, [category]: [option] };
      }

      let next = current.filter(item => item !== 'All' && item !== 'Any' && item !== 'All States & UTs');
      
      if (next.includes(option)) {
        next = next.filter(item => item !== option);
        if (next.length === 0) {
          const defaults: Record<string, string> = {
            programType: 'All',
            stakeholderRole: 'Athlete',
            sport: 'All',
            status: 'Any',
            geography: 'All States & UTs',
            ageCategory: 'All',
            gender: 'Any',
            tidFocus: 'Any'
          };
          next = [defaults[category as string]];
        }
      } else {
        next = [...next, option];
      }
      
      return { ...prev, [category]: next };
    });
  };

  const getLabelForCategory = (category: keyof typeof filters) => {
    const values = tempFilters[category];
    if (values.length === 0) return 'Any';
    if (values.length === 1) return values[0];
    return `${values[0]} +${values.length - 1}`;
  };

  const FILTER_OPTIONS = {
    programType: ['All', 'KIYG', 'KIUG', 'KIWG', 'Para Games', 'Fit India Movement', 'Mission 3.0 Initiatives'],
    stakeholderRole: ['Athlete', 'Coach', 'Scientist / Medical Staff', 'Volunteer', 'School Admin', 'Academic / Researcher', 'Sponsor / Partner'],
    sport: ['All', 'Athletics', 'Archery', 'Boxing', 'Badminton', 'Football', 'Hockey', 'Judo', 'Kabaddi', 'Swimming', 'Weightlifting', 'Wrestling', 'Yoga', 'Traditional Sports'],
    status: ['Any', 'Upcoming (Registration Open)', 'Upcoming (Registration Closed)', 'Ongoing (Live Now)', 'Completed (View Results)'],
    geography: ['All States & UTs', 'Zonal (North)', 'Zonal (South)', 'Zonal (East)', 'Zonal (West)', 'SAI Centers', 'Manipur', 'Haryana', 'Odisha', 'Delhi'],
    ageCategory: ['All', 'Under-14 (Grassroots)', 'Under-17', 'Under-21', 'Open Category'],
    gender: ['Any', 'Boys / Men', 'Girls / Women', 'Mixed Events'],
    tidFocus: ['Any', 'National Scouts Present', 'Open Walk-in Trials', 'District Talent Hunt Tour', 'Scholarship Eligibility Events']
  };

  const categoryLabels: Record<keyof typeof filters, string> = {
    programType: 'Program Type',
    stakeholderRole: 'Stakeholder Role',
    sport: 'Sport / Discipline',
    status: 'Event Status',
    geography: 'Geography (State/UT)',
    ageCategory: 'Age Category',
    gender: 'Gender',
    tidFocus: 'Talent ID (TID) Focus'
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#080E17] text-[#293F54] dark:text-[#F4F5F7]">
      {/* HEADER */}
      <section className="pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-[12px] font-bold uppercase text-[#db4001] mb-6 tracking-tight">
            EVENTS · MASTER HUB
          </div>
          <h1 className="text-[46px] font-georgia text-[#293F54] dark:text-white leading-[1.05] mb-6 tracking-tight">
            India is on the field, <br className="hidden sm:block" />
            <span className="text-[#db4001]">all year round.</span>
          </h1>
          <p className="text-[16px] text-[#293F54]/80 dark:text-[#F4F5F7]/70 max-w-3xl leading-[1.5]">
            Every national, regional, and grassroots milestone synced for athletes, coaches, scientists, and volunteers. One page. Many lenses.
          </p>
        </div>
      </section>

      {/* FILTER PANEL OVERLAY */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterPanelOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white dark:bg-[#0B1421] z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {editingCategory && (
                    <button 
                      onClick={() => setEditingCategory(null)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors"
                    >
                      <ChevronLeft size={20} className="text-[#293F54] dark:text-white" />
                    </button>
                  )}
                  <h2 className="text-[18px] font-bold text-[#293F54] dark:text-white">
                    {editingCategory ? categoryLabels[editingCategory] : 'Filters'}
                  </h2>
                </div>
                <button 
                  onClick={() => {
                    setIsFilterPanelOpen(false);
                    setEditingCategory(null);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto relative">
                <AnimatePresence mode="wait">
                  {!editingCategory ? (
                    <motion.div 
                      key="main-filters"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="divide-y divide-gray-100 dark:divide-white/5"
                    >
                      <div className="bg-gray-50/50 dark:bg-[#1A2433]/30 px-6 py-3 border-b border-gray-100 dark:border-white/5">
                        <span className="text-[12px] font-semibold text-[#db4001]">{getFilterCount()} filters active</span>
                      </div>

                      {(Object.entries(categoryLabels) as [keyof typeof filters, string][]).map(([key, label]) => (
                        <div 
                          key={key}
                          onClick={() => setEditingCategory(key)}
                          className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <span className="text-[14px] text-gray-500 font-medium">{label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-semibold text-[#db4001]">
                              {getLabelForCategory(key)}
                            </span>
                            <ChevronRight size={16} className="text-gray-300" />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="sub-filters"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-4"
                    >
                      {FILTER_OPTIONS[editingCategory].map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleFilter(editingCategory, option)}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-xl mb-1 text-[14px] transition-all flex items-center justify-between",
                            tempFilters[editingCategory].includes(option)
                              ? "bg-orange-50 dark:bg-[#db4001]/10 text-[#db4001] font-semibold"
                              : "hover:bg-gray-50 dark:hover:bg-white/5 text-[#293F54] dark:text-gray-300"
                          )}
                        >
                          {option}
                          {tempFilters[editingCategory].includes(option) && (
                            <div className="w-2 h-2 rounded-full bg-[#db4001]" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-white/5 flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 font-semibold text-[14px] border-gray-100 dark:border-white/10"
                  onClick={() => {
                    setTempFilters(DEFAULT_FILTERS);
                    setFilters(DEFAULT_FILTERS);
                    setIsFilterPanelOpen(false);
                    setEditingCategory(null);
                  }}
                >
                  Clear all
                </Button>
                <Button 
                  className="flex-[2] h-12 bg-[#db4001] hover:bg-[#c33901] text-white font-semibold text-[14px] gap-2"
                  onClick={() => {
                    setFilters(tempFilters);
                    setIsFilterPanelOpen(false);
                    setEditingCategory(null);
                  }}
                >
                  Apply <ArrowRight size={18} />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH AND FILTER BAR */}
      <section className="sticky top-[72px] z-30 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#F8F9FA] dark:bg-[#1A2433] rounded-2xl py-4 px-0 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* SEARCH BAR */}
              <div className="flex-1 min-w-[280px] relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search by name, sport, or venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white dark:bg-[#0B1421] rounded-xl border border-gray-100 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/20 text-[14px] text-[#293F54] dark:text-white placeholder:text-gray-400"
                />
              </div>

              {/* FILTER BUTTON */}
              <button 
                onClick={() => {
                  setTempFilters(filters);
                  setIsFilterPanelOpen(true);
                }}
                className="h-12 px-6 bg-white dark:bg-[#0B1421] rounded-xl border border-gray-100 dark:border-white/5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/10 transition-all group shrink-0"
              >
                <SlidersHorizontal size={18} className="text-[#293F54] dark:text-white group-hover:scale-110 transition-transform" />
                <span className="text-[14px] font-semibold text-[#293F54] dark:text-white text-nowrap">Filter</span>
                {getFilterCount() > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 bg-[#db4001] text-white text-[10px] font-bold rounded-full">
                    {getFilterCount()}
                  </span>
                )}
              </button>

              {getFilterCount() > 0 && (
                <button 
                  onClick={() => {
                    setFilters(DEFAULT_FILTERS);
                    setTempFilters(DEFAULT_FILTERS);
                  }}
                  className="text-[13px] font-semibold text-[#4C6EF5] hover:underline px-2 ml-auto"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* ACTIVE FILTER CHIPS */}
            {getFilterCount() > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {(Object.entries(filters) as [keyof typeof filters, string[]][]).map(([key, values]) => {
                  const isDefault = JSON.stringify(values) === JSON.stringify(DEFAULT_FILTERS[key]);
                  if (isDefault) return null;

                  return (
                    <div key={key} className="flex items-center bg-white dark:bg-[#0B1421] rounded-xl border border-gray-100 dark:border-white/5 px-3 py-2">
                      <span className="text-[13px] text-gray-400 font-normal">{categoryLabels[key]} ·</span>
                      <span className="text-[13px] font-semibold flex items-center gap-1.5 ml-1.5 text-[#293F54] dark:text-white">
                        {values[0]} {values.length > 1 ? `+${values.length - 1}` : ''}
                        <button 
                          onClick={() => setFilters(f => ({ ...f, [key]: DEFAULT_FILTERS[key] }))}
                          className="p-0.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded ml-1 transition-colors"
                        >
                          <X size={12} className="text-gray-400 hover:text-[#db4001]" />
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SPLIT VIEW (COLUMNS) */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: CALENDAR PANEL */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-[#0B1421] rounded-2xl border border-gray-100 dark:border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={prevMonth}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <h3 className="text-[15px] font-semibold min-w-[100px] text-center">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                      onClick={nextMonth}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="flex bg-gray-100 dark:bg-[#1A2433] p-1 rounded-lg">
                    <button 
                      onClick={() => setViewMode('month')}
                      className={cn(
                        "text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all",
                        viewMode === 'month' ? "bg-white dark:bg-[#293F54]" : "text-gray-400"
                      )}
                    >
                      Month
                    </button>
                    <button 
                      onClick={() => setViewMode('timeline')}
                      className={cn(
                        "text-[11px] font-semibold px-2.5 py-1 rounded-md transition-all",
                        viewMode === 'timeline' ? "bg-white dark:bg-[#293F54]" : "text-gray-400"
                      )}
                    >
                      Timeline
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 text-center mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-[10px] font-bold text-gray-400 py-2">{day}</div>
                  ))}
                </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, i) => {
                      if (!date) return <div key={i} className="aspect-square" />;
                      
                      const isSelected = selectedDate.getDate() === date.getDate() && 
                                         selectedDate.getMonth() === date.getMonth() && 
                                         selectedDate.getFullYear() === date.getFullYear();
                      const events = getEventsForDay(date);
                      
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={cn(
                            "relative aspect-square flex flex-col items-center justify-center rounded-lg transition-all",
                            isSelected 
                              ? "bg-[#db4001] text-white scale-105 z-10" 
                              : "hover:bg-gray-50 dark:hover:bg-white/5"
                          )}
                        >
                          <span className={cn(
                            "text-[13px] font-medium transition-colors",
                            isSelected ? "text-white" : "text-[#293F54] dark:text-gray-300"
                          )}>
                            {date.getDate()}
                          </span>
                          <div className="flex gap-0.5 mt-0.5 h-1">
                            {events.slice(0, 3).map((event, idx) => (
                              <div 
                                key={idx} 
                                className="w-1 h-1 rounded-full" 
                                style={{ backgroundColor: isSelected ? 'white' : event.color }} 
                              />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/5">
                    {/* Legend from Image */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 rounded-full bg-[#db4001]"></div>
                      <div className="text-[12px] text-gray-400 font-medium">Dot count = events on that day</div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[11px] font-normal text-gray-400 uppercase tracking-tight">
                        {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {eventsForSelectedDate.length} EVENTS
                      </div>
                    </div>

                    <div className="space-y-3">
                      {eventsForSelectedDate.map(event => (
                        <button
                          key={event.id}
                          onClick={() => setActiveEventId(event.id)}
                          className={cn(
                            "w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden group",
                            activeEventId === event.id
                              ? "border-[#db4001] bg-white dark:bg-[#0B1421] ring-1 ring-[#db4001]/10"
                              : "border-transparent bg-gray-50/50 dark:bg-[#1A2433]/30 hover:bg-gray-50 dark:hover:bg-[#1A2433]"
                          )}
                        >
                          <div className="flex flex-col gap-1 flex-1 relative z-10">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: event.color }}
                              />
                              <div className="text-[11px] text-gray-400 font-medium">
                                {event.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {event.duration}
                              </div>
                            </div>
                            <div className={cn(
                              "text-[15px] font-bold leading-tight transition-colors",
                              activeEventId === event.id ? "text-[#293F54] dark:text-white" : "text-gray-600 dark:text-gray-300"
                            )}>
                              {event.title}
                            </div>
                          </div>
                        </button>
                      ))}
                      {eventsForSelectedDate.length === 0 && (
                        <div className="py-8 text-center bg-gray-50 dark:bg-[#1A2433] rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                          <CalendarIcon size={24} className="mx-auto text-gray-300 mb-2" />
                          <div className="text-[13px] text-gray-400">No events scheduled for this day</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
                <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="text-[11px] font-normal text-gray-400 uppercase tracking-tight">
                  EVENTS · {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                </div>

              </div>

              <AnimatePresence mode="wait">
                {activeEvent ? (
                  <motion.div
                    key={activeEvent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white dark:bg-[#0B1421] rounded-2xl border border-gray-100 dark:border-white/10 p-4 h-fit"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="bg-[#db4001] text-white px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-tight">
                          {activeEvent.tier}
                        </div>
                        <div className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase">
                          {activeEvent.category}
                        </div>
                        {activeEvent.urgencyLabel && (
                          <div className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold",
                            activeEvent.status === 'live' ? "bg-red-50 dark:bg-red-900/10 text-red-600" : 
                            activeEvent.status === 'closing' ? "bg-red-50 dark:bg-red-900/10 text-red-600 border border-red-100/50" : 
                            "bg-blue-50 dark:bg-blue-900/10 text-blue-600"
                          )}>
                            {activeEvent.status === 'live' ? <Play size={8} fill="currentColor" /> : <Clock size={8} />}
                            {activeEvent.urgencyLabel}
                          </div>
                        )}
                      </div>
                      <button className="flex items-center gap-2 text-[12px] font-normal text-[#293F54] dark:text-white px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        <Share2 size={14} /> Share
                      </button>
                    </div>

                    <h2 className="text-[20px] font-semibold text-[#293F54] dark:text-white mb-0 leading-tight tracking-tight">
                      {activeEvent.title}
                    </h2>
                    <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-2 max-w-3xl font-normal leading-relaxed">
                      {activeEvent.description}
                    </p>

                    {/* KEY INFO GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-100 dark:border-white/10 rounded-xl overflow-hidden mb-5">
                      {/* VENUE */}
                      <div className="p-4 border-b md:border-r border-gray-100 dark:border-white/10">
                        <div className="text-[10px] font-normal text-gray-400 uppercase tracking-wider mb-2">Venue</div>
                        <div className="text-[15px] font-semibold text-[#293F54] dark:text-white mb-0.5">{activeEvent.venue}</div>
                        <div className="text-[14px] text-gray-500 font-normal">{activeEvent.location}</div>
                      </div>
                      
                      {/* EVENT WINDOW */}
                      <div className="p-4 border-b border-gray-100 dark:border-white/10">
                        <div className="text-[10px] font-normal text-gray-400 uppercase tracking-wider mb-2">Event Window</div>
                        <div className="flex items-center gap-2 text-[15px] font-semibold text-[#293F54] dark:text-white">
                          <span>{activeEvent.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="text-gray-300 font-normal">→</span>
                          <span>{activeEvent.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="text-gray-400 font-normal ml-1">
                            {Math.ceil((activeEvent.endDate.getTime() - activeEvent.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                          </span>
                        </div>
                      </div>

                      {/* REGISTRATION DEADLINE */}
                      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/10">
                        <div className="text-[10px] font-normal text-gray-400 uppercase tracking-wider mb-2">Registration Deadline</div>
                        <div className="text-[15px] font-bold text-[#db4001]">
                          {activeEvent.registrationDeadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · 11:59 PM IST
                        </div>
                      </div>

                      {/* ELIGIBILITY CUTOFF */}
                      <div className="p-4">
                        <div className="text-[10px] font-normal text-gray-400 uppercase tracking-wider mb-2">Eligibility Cutoff</div>
                        <div className="text-[15px] font-semibold text-[#293F54] dark:text-white">
                          {activeEvent.eligibilityCutoff} <span className="text-gray-400 font-normal">({activeEvent.eligibilityCutoff.includes('verification') ? activeEvent.eligibilityCutoff : 'Age verification required'})</span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap gap-2.5">
                      <Button variant="outline" className="h-8 px-3 flex items-center gap-2 border-gray-100 dark:border-white/5 font-semibold text-[12px] rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        {filters.stakeholderRole[0] === 'Athlete' ? 'Register now' : 'Manage roster'} <ArrowUpRight size={14} className="text-[#6B7280]" />
                      </Button>
                      <Button variant="outline" className="h-8 px-3 flex items-center gap-2 border-gray-100 dark:border-white/5 font-semibold text-[12px] rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        Regulations PDF <ArrowUpRight size={14} className="text-[#6B7280]" />
                      </Button>
                      <Button variant="outline" className="h-8 px-3 flex items-center gap-2 border-gray-100 dark:border-white/5 font-semibold text-[12px] rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        Travel & booking <ArrowUpRight size={14} className="text-[#6B7280]" />
                      </Button>
                      <Button variant="outline" className="h-8 px-3 flex items-center gap-2 border-gray-100 dark:border-white/5 font-semibold text-[12px] rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        Athlete guide <ArrowUpRight size={14} className="text-[#6B7280]" />
                      </Button>
                      <Button variant="outline" className="h-8 px-3 flex items-center gap-2 border-gray-100 dark:border-white/5 font-semibold text-[12px] rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        Open in maps <ArrowUpRight size={14} className="text-[#6B7280]" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white dark:bg-[#0B1421] rounded-2xl border border-gray-100 dark:border-white/10 p-12 text-center h-full flex flex-col items-center justify-center">
                    <CalendarIcon size={64} className="text-gray-100 dark:text-white/5 mb-6" />
                    <h3 className="text-[24px] font-bold mb-3">No event selected</h3>
                    <p className="text-gray-400 max-w-sm">Pick an event from the calendar or the list on the left to view full details and required actions.</p>
                  </div>
                )}
              </AnimatePresence>

              {/* "ACT ON THESE NOW" URGENCY SECTION */}
              <div className="mt-12">
                <div className="flex items-end justify-between gap-6 mb-6">
                  <div>
                    <div className="text-[11px] font-normal text-[#db4001] uppercase tracking-tight mb-2">THIS WEEK · MAY 6 — 12</div>
                    <h2 className="text-[18px] font-semibold tracking-tight">Act on these now</h2>
                  </div>
                  <button className="flex items-center gap-2 text-[12px] font-normal text-[#db4001] hover:underline group">
                    All urgent items →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* LIVE CARD */}
                  <div className="group bg-white dark:bg-[#0B1421] p-2.5 rounded-2xl border border-gray-100 dark:border-white/10 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/10 text-red-600 text-[10px] font-semibold">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        LIVE NOW · DAY 4 OF 4
                      </div>
                    </div>
                    <h3 className="text-[14px] font-semibold mb-2 group-hover:text-[#db4001] transition-colors">Khelo India Athletics Finals</h3>
                    <p className="text-[11px] font-normal text-gray-500 mb-6">JNU Stadium, Delhi · Day 4 of 4</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-8 px-3 bg-[#db4001] hover:bg-[#c33901] text-white font-semibold text-[11px]">
                        Watch live <ExternalLink size={12} className="ml-1.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-3 border-gray-100 dark:border-white/10 font-semibold text-[11px]">
                        Schedule
                      </Button>
                    </div>
                  </div>

                  {/* CLOSING CARD */}
                  <div className="group bg-white dark:bg-[#0B1421] p-2.5 rounded-2xl border border-gray-100 dark:border-white/10 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/10 text-amber-600 text-[10px] font-semibold">
                        <Clock size={12} />
                        CLOSES IN 2 DAYS
                      </div>
                    </div>
                    <h3 className="text-[14px] font-semibold mb-2 group-hover:text-[#db4001] transition-colors">Senior National Wrestling Trials</h3>
                    <p className="text-[11px] font-normal text-gray-500 mb-6">70kg Freestyle · U-17 Boys</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-8 px-3 bg-[#db4001] hover:bg-[#c33901] text-white font-semibold text-[11px]">
                        Register now <ExternalLink size={12} className="ml-1.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-3 border-gray-100 dark:border-white/10 font-semibold text-[11px]">
                        Details
                      </Button>
                    </div>
                  </div>

                  {/* UPCOMING CARD */}
                  <div className="group bg-white dark:bg-[#0B1421] p-2.5 rounded-2xl border border-gray-100 dark:border-white/10 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/10 text-blue-600 text-[10px] font-semibold">
                        <CalendarIcon size={12} />
                        STARTS MAY 12
                      </div>
                    </div>
                    <h3 className="text-[14px] font-semibold mb-2 group-hover:text-[#db4001] transition-colors">Asian Wrestling Champs Qualifier</h3>
                    <p className="text-[11px] font-normal text-gray-500 mb-6">Mumbai · 2 days · Team selection</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="h-8 px-3 border-gray-100 dark:border-white/10 font-semibold text-[11px]">
                        Add to calendar <CalendarIcon size={12} className="ml-1.5" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-3 border-gray-100 dark:border-white/10 font-semibold text-[11px]">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

