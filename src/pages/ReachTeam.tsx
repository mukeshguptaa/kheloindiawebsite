import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Phone, 
  Mail, 
  Copy, 
  MapPin, 
  ChevronsUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- DATA ---
const INITIAL_OFFICIALS = [
  {
    id: 1, role: "MINISTER",
    name: "Dr. Mansukh Mandaviya",
    designation: "Hon'ble Minister Of Youth Affairs and Sports",
    phone: "011-23386520, 23381185, 23384183",
    email: "office-moyas@gov.in",
    roomLine: "Room No. 401, C-Wing",
    address: "Shastri Bhawan, New Delhi-110001",
    category: "MINISTERS"
  },
  {
    id: 2, role: null,
    name: "Shri Kshitij Jain, IRS (C&IT:2011)",
    designation: "PS to Minister",
    phone: "011-23386520, 23381185, 23384183",
    email: "office-moyas@gov.in",
    roomLine: "Room No. 411",
    address: "Shastri Bhawan, New Delhi-110001",
    category: "MINISTERS"
  },
  {
    id: 3, role: null,
    name: "Smt. Kritika Padode",
    designation: "Additional Private Secretary to Minister",
    phone: "011-23386520, 23381185",
    email: "office-moyas@gov.in",
    roomLine: "Room No. 411",
    address: "Shastri Bhaawan, New Delhi-110001",
    category: "MINISTERS"
  },
  {
    id: 4, role: "MoS",
    name: "Smt. Raksha Nikhil Khadse",
    designation: "Hon'ble Minister of State for Youth Affairs & Sports",
    phone: "011-23071688",
    email: "mos-yas21@gov.in",
    roomLine: "Room No. 7605, 7th Floor",
    address: "Zone-6, GPOA-3, Netaji Nagar, Africa Avenue Road, New Delhi, 110023",
    category: "MINISTERS"
  },
  {
    id: 5, role: null,
    name: "Ms. Nisha, IAS (UP:2015)",
    designation: "Private Secretary to Hon'ble MoS YA&S",
    phone: "011-23071688",
    email: "ps-mosyas@gov.in",
    roomLine: "Room No. 415-B Wing",
    address: "Shastri Bhawan",
    category: "MINISTERS"
  },
  {
    id: 6, role: null,
    name: "Shri Sanjay Shashikant Aghav",
    designation: "Additional Private Secretary",
    phone: "011-23071688",
    email: "mos-yas21@gov.in",
    roomLine: "Room no. 413, C Wing",
    address: "Shastri Bhawan, New Delhi",
    category: "MINISTERS"
  },
  {
    id: 7, role: null,
    name: "Shri Atul Rajaram Mahajan",
    designation: "Assistant Private Secretary",
    phone: "011-23071688",
    email: "mos-yas21@gov.in",
    roomLine: "Room No. 413, C-Wing",
    address: "Shastri Bhawan, New Delhi",
    category: "MINISTERS"
  },
  {
    id: 8, role: "SECRETARY",
    name: "Shri Hari Ranjan Rao, IAS (MP:94)",
    designation: "Secretary (Sports)",
    phone: "011-23388623",
    email: "secy-sports@nic.in",
    roomLine: "Room No. 3, C-Wing",
    address: "Shastri Bhawan, New Delhi - 110001",
    category: "SECRETARIAT"
  },
  {
    id: 9, role: null,
    name: "Shri Sanjeev Kumar Jha",
    designation: "PPS to Secretary (Sports)",
    phone: "011-23388623",
    email: "secy-sports@nic.in",
    roomLine: "Room No. 4, C-Wing",
    address: "Shastri Bhawan, New Delhi - 110001",
    category: "SECRETARIAT"
  },
  {
    id: 10, role: null,
    name: "Shri Mansoor Hasan Khan (IDAS: 2002)",
    designation: "JS & FA",
    phone: "011-24366414",
    email: "jsfa-myas@gov.in",
    roomLine: "Room No. 102, First Flr",
    address: "SAI Hq, JLN Stadium, New Delhi-110003",
    category: "SECRETARIAT"
  }
];

// Duplicate for demo
const OFFICIALS = Array.from({ length: 45 }, (_, i) => {
  const base = INITIAL_OFFICIALS[i % INITIAL_OFFICIALS.length];
  // Assign different categories for variety in demo if not strictly following the 10
  let category = base.category;
  if (i >= 10 && i < 25) category = "SECRETARIAT";
  if (i >= 25) category = "ADVISORS";
  
  return {
    ...base,
    id: i + 1,
    category
  };
});

type SortConfig = {
  key: string | null;
  direction: 'asc' | 'desc' | null;
};

// --- HELPERS ---
const getInitials = (name: string) => {
  let cleanName = name
    .replace(/(Dr\.|Shri|Smt\.|Ms\.)/g, '')
    .split(/[,(]/)[0]
    .trim();
  const parts = cleanName.split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const ReachTeam = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const pageSize = 10;

  // --- THEME ---
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // --- FILTERING & SORTING ---
  const filteredData = useMemo(() => {
    let result = [...OFFICIALS];

    // Search
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(o => 
        o.name.toLowerCase().includes(s) || 
        o.designation.toLowerCase().includes(s) || 
        o.roomLine.toLowerCase().includes(s) || 
        o.email.toLowerCase().includes(s) ||
        o.address.toLowerCase().includes(s)
      );
    }

    // Sort
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a: any, b: any) => {
        const valA = a[sortConfig.key!] || '';
        const valB = b[sortConfig.key!] || '';
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [search, sortConfig]);

  // Reset to page 1 on filter
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, filteredData.length);

  // --- ACTIONS ---
  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2000);
  };

  const handleCopy = (text: string, type: 'Phone' | 'Email') => {
    // For phone, split comma and take first if multiple, or just join them?
    // Prompt says "writes the raw number(s) to clipboard".
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${type} copied`);
    });
  };

  return (
    <div className="min-h-screen bg-page-bg transition-colors duration-300">
      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 py-12 md:py-20 flex flex-col gap-12">
        
        {/* 1. HERO / INTRO */}
        <section className="flex flex-col gap-2.5 max-w-[720px]">
          <span className="text-[13px] font-bold tracking-[2px] uppercase text-accent">
            OFFICIAL DIRECTORY
          </span>
          <h1 className="text-[46px] font-georgia font-[200] tracking-[-0.5px] leading-[1.2] text-text-primary">
            Reach our Team
          </h1>
          <p className="text-[16px] leading-[1.6] text-text-body">
            Access direct contact information for the Ministry of Youth Affairs & Sports (MYAS) and Sports Authority of India (SAI) leadership, from administrative secretariats to field consultants.
          </p>
        </section>

        {/* Search & Actions Row */}
        <div className="flex flex-col gap-5">
          {/* Search Bar Row */}
          <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-full sm:min-w-[320px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-meta" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, designation, or room number…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search directory"
              className="w-full bg-surface border border-border rounded-ui-element py-3 pl-12 pr-4 text-[14px] text-text-primary placeholder:text-text-meta focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all"
            />
          </div>


        </div>

        {/* Directory Table */}
        <div className="bg-surface rounded-table-card border border-border shadow-theme overflow-x-auto custom-scrollbar">
          <div className="md:min-w-[1000px]">
            {/* Header - Desktop Only */}
            <div className="hidden md:flex bg-surface-elevated px-5 py-3.5 items-center gap-4 border-b border-border">
              <div className="w-[60px] text-[10px] font-bold uppercase tracking-[1.2px] text-text-meta">Photo</div>
              
              <div 
                className="w-[320px] flex items-center justify-between cursor-pointer group"
                onClick={() => handleSort('name')}
                aria-sort={sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-text-meta">Name & Designation</span>
                <ChevronsUpDown size={10} className={cn("transition-colors", sortConfig.key === 'name' ? "text-accent" : "text-text-meta group-hover:text-text-body")} />
              </div>

              <div 
                className="w-[240px] flex items-center justify-between cursor-pointer group"
                onClick={() => handleSort('phone')}
                aria-sort={sortConfig.key === 'phone' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-text-meta">Phone</span>
                <ChevronsUpDown size={10} className={cn("transition-colors", sortConfig.key === 'phone' ? "text-accent" : "text-text-meta group-hover:text-text-body")} />
              </div>

              <div 
                className="hidden xl:flex w-[280px] items-center justify-between cursor-pointer group"
                onClick={() => handleSort('email')}
                aria-sort={sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-text-meta">Email</span>
                <ChevronsUpDown size={10} className={cn("transition-colors", sortConfig.key === 'email' ? "text-accent" : "text-text-meta group-hover:text-text-body")} />
              </div>

              <div 
                className="flex-1 min-w-[260px] flex items-center justify-between cursor-pointer group"
                onClick={() => handleSort('address')}
                aria-sort={sortConfig.key === 'address' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-text-meta">Address</span>
                <ChevronsUpDown size={10} className={cn("transition-colors", sortConfig.key === 'address' ? "text-accent" : "text-text-meta group-hover:text-text-body")} />
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {paginatedData.map((official) => (
                <div key={official.id} className="p-5 flex flex-col md:flex-row md:items-center gap-4 bg-surface hover:bg-page-bg/40 transition-colors group">
                  
                  {/* Mobile Row Header (Photo + Name) */}
                  <div className="flex items-center gap-4 md:contents">
                    {/* Photo Cell */}
                    <div className="w-[60px] shrink-0">
                      <div className={cn(
                        "w-10 h-10 rounded-avatar flex items-center justify-center font-bold text-[12px]",
                        official.role === "MINISTER" ? "bg-accent-tint text-accent" : "bg-page-bg text-text-body"
                      )}>
                        {getInitials(official.name)}
                      </div>
                    </div>

                    {/* Name & Designation cell */}
                    <div className="flex-1 md:w-[320px] md:flex-none flex flex-col gap-1">
                      {official.role && (
                        <div className={cn(
                          "self-start px-1.5 py-0.5 rounded-role-tag text-[9px] font-bold uppercase tracking-[0.8px]",
                          official.role === "MINISTER" ? "bg-accent text-white" : "bg-accent-tint text-accent"
                        )}>
                          {official.role}
                        </div>
                      )}
                      <div className="text-[13px] font-bold text-text-primary">{official.name}</div>
                      <div className="text-[11px] leading-[1.5] text-text-body">{official.designation}</div>
                      {/* Responsive email inline (Visible < 1280px) */}
                      <div className="xl:hidden mt-1 flex items-center gap-2 text-accent font-medium text-[12px] cursor-pointer" onClick={() => window.open(`mailto:${official.email}`)}>
                        <Mail size={12} /> {official.email}
                      </div>
                    </div>
                  </div>

                  {/* Phone Cell */}
                  <div className="md:w-[240px] flex items-center gap-1.5 pl-[76px] md:pl-0">
                    <Phone className="text-accent shrink-0" size={12} />
                    <a 
                      href={`tel:${official.phone.split(',')[0].trim()}`}
                      className="text-[12px] text-text-primary hover:text-accent transition-colors"
                    >
                      {official.phone}
                    </a>
                    <button 
                      onClick={() => handleCopy(official.phone, 'Phone')}
                      aria-label="Copy phone number"
                      className="text-accent opacity-60 hover:opacity-100 transition-opacity ml-1"
                    >
                      <Copy size={12} />
                    </button>
                  </div>

                  {/* Email Cell (Desktop only, > 1280px) */}
                  <div className="hidden xl:flex w-[280px] items-center gap-1.5 overflow-hidden">
                    <Mail className="text-accent shrink-0" size={12} />
                    <a 
                      href={`mailto:${official.email}`}
                      className="text-[12px] font-medium text-accent hover:underline truncate"
                    >
                      {official.email}
                    </a>
                    <button 
                      onClick={() => handleCopy(official.email, 'Email')}
                      aria-label="Copy email address"
                      className="text-text-meta opacity-60 hover:opacity-100 transition-opacity ml-1"
                    >
                      <Copy size={12} />
                    </button>
                  </div>

                  {/* Address Cell */}
                  <div className="flex-1 md:min-w-[260px] flex items-start gap-1.5 pl-[76px] md:pl-0">
                    <MapPin className="text-accent mt-0.5 shrink-0" size={12} />
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[12px] font-semibold text-text-primary">{official.roomLine}</div>
                      <div className="text-[11px] leading-[1.5] text-text-body">{official.address}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div className="text-[12px] text-text-meta text-center sm:text-left">
            Showing {filteredData.length > 0 ? startEntry : 0} to {endEntry} of {filteredData.length} entries
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-7 h-7 flex items-center justify-center rounded-ui-element bg-surface border border-border text-text-body disabled:opacity-40 disabled:cursor-not-allowed hover:bg-page-bg transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => {
                // Show max 5 or surrounding
                if (totalPages <= 5) return true;
                if (p === 1 || p === totalPages) return true;
                return Math.abs(p - currentPage) <= 1;
              })
              .map((p, i, arr) => (
                <React.Fragment key={p}>
                  {i > 0 && arr[i-1] !== p - 1 && <span className="text-text-meta text-[11px]">...</span>}
                  <button 
                    onClick={() => setCurrentPage(p)}
                    className={cn(
                      "w-7 h-7 flex items-center justify-center rounded-ui-element text-[11px] transition-all",
                      currentPage === p 
                        ? "bg-accent text-white font-bold" 
                        : "bg-surface border border-border text-text-body font-medium hover:bg-page-bg"
                    )}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}

            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-ui-element bg-surface border border-border text-text-body disabled:opacity-40 disabled:cursor-not-allowed hover:bg-page-bg transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>

      {/* Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[200] bg-text-primary text-surface px-4 py-2.5 rounded-ui-element text-[13px] font-medium shadow-theme"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


