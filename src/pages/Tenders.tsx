import React, { useState } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

// Sample data provided in the prompt
const tendersData = [
  {
    id: 1,
    title: 'Request for proposal for production and telecast rights for five (5) editions of Khelo India Youth Games, University Games, Para Games, Winter Games, and Fit India Quiz (national rounds)',
    category: 'RFP',
    status: 'Open',
    deadline: '22 Oct 2025',
    daysLeft: 8,
    issuer: 'Ministry of Youth Affairs and Sports',
    refNo: 'MYAS/RFP/2025/048',
  },
  {
    id: 2,
    title: 'Request for proposal (limited) for hiring of sponsors for 3 upcoming editions of Khelo India Games',
    category: 'Limited',
    status: 'Closing soon',
    deadline: '17 Oct 2025',
    daysLeft: 3,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/RFP-LTD/2025/012',
  },
  {
    id: 3,
    title: 'Procurement of PAC Yonex make badminton equipment for Khelo India Para Games',
    category: 'Bid',
    status: 'Open',
    deadline: '28 Oct 2025',
    daysLeft: 14,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/PROC/2025/088',
  },
  {
    id: 4,
    title: 'Engagement of an event management agency for accommodation, catering & transportation services and ACT management',
    category: 'Bid',
    status: 'Open',
    deadline: '20 Oct 2025',
    daysLeft: 6,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/EM/2025/01-28',
  },
  {
    id: 5,
    title: 'EOI to finalise host states for Khelo India Youth & University Games for the next 5 years',
    category: 'EOI',
    status: 'Closing soon',
    deadline: '18 Oct 2025',
    daysLeft: 4,
    issuer: 'Ministry of Youth Affairs and Sports',
    refNo: 'MYAS/EOI/2025/HOST',
  },
  {
    id: 6,
    title: 'Application for engagement of technical officials for KIUG 2025 (Volleyball Sports)',
    category: 'EOI',
    status: 'Open',
    deadline: '25 Oct 2025',
    daysLeft: 11,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/KIUG/2025/VOL/047',
  },
  {
    id: 7,
    title: 'Engagement of technical officials for KIYG 2025 Bihar (Beach Volleyball)',
    category: 'EOI',
    status: 'Open',
    deadline: '26 Oct 2025',
    daysLeft: 12,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/KIYG/2025/BCH/051',
  },
  {
    id: 8,
    title: 'Engagement of technical officials for KIUG 2025 (Mallakhamb Sports)',
    category: 'EOI',
    status: 'Open',
    deadline: '30 Oct 2025',
    daysLeft: 16,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/KIUG/2025/MAL/054',
  },
  {
    id: 9,
    title: 'Sports kit procurement for Khelo India Centres in Northeast region',
    category: 'Bid',
    status: 'Closed',
    deadline: '28 Sep 2025',
    daysLeft: -16,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/NE/2025/KIT/022',
  },
  {
    id: 10,
    title: 'Catering services for Khelo India training camps — pan-India rollout',
    category: 'RFP',
    status: 'Closed',
    deadline: '15 Sep 2025',
    daysLeft: -29,
    issuer: 'Ministry of Youth Affairs and Sports',
    refNo: 'MYAS/RFP/2025/CAT/041',
  },
];

const statusFilters = [
  { id: 'all', label: 'All tenders', count: 24 },
  { id: 'Open', label: 'Open', count: 12 },
  { id: 'Closing soon', label: 'Closing soon', count: 4 },
  { id: 'Closed', label: 'Closed', count: 8 },
];

const categoryFilters = [
  { id: 'all', label: 'All categories', count: 24 },
  { id: 'RFP', label: 'RFP', count: 9 },
  { id: 'EOI', label: 'EOI', count: 7 },
  { id: 'Bid', label: 'Bid / procurement', count: 6 },
  { id: 'Limited', label: 'Limited tender', count: 2 },
];

const yearFilters = [
  { id: '2025', label: '2025', count: 16 },
  { id: '2024', label: '2024', count: 8 },
  { id: 'earlier', label: 'Earlier', count: null },
];

export const Tenders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTenders = tendersData.filter(tender => {
    const matchesSearch = 
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tender.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeStatus === 'all' || tender.status === activeStatus;
    const matchesCategory = activeCategory === 'all' || tender.category === activeCategory;
    const matchesYear = activeYear === 'all' || activeYear === 'earlier' || tender.deadline.includes(activeYear);
    return matchesSearch && matchesStatus && matchesCategory && matchesYear;
  });

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-[#EAF3DE] text-[#3B6D11] dark:bg-[#3B6D11]/20 dark:text-[#86efac]';
      case 'Closing soon':
        return 'bg-[#FAEEDA] text-[#854F0B] dark:bg-[#854F0B]/20 dark:text-[#fbbf24]';
      case 'Closed':
        return 'bg-[#EEF0F3] text-[#828792] dark:bg-white/10 dark:text-[#8A94A6]';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-400';
    }
  };

  const getDeadlineChipStyles = (status: string) => {
    switch (status) {
      case 'Closing soon':
        return 'bg-[#FAEEDA] text-[#854F0B] dark:bg-[#854F0B]/20 dark:text-[#fbbf24]';
      case 'Closed':
        return 'bg-[#EEF0F3] text-[#828792] dark:bg-white/10 dark:text-[#8A94A6]';
      default:
        return 'text-[#515c65] dark:text-[#B9C1CC]';
    }
  };

  const getCategoryStyles = (category: string) => {
    if (category === 'EOI') return 'bg-[#FFF2EE] text-[#db4001] dark:bg-[#db4001]/20 dark:text-[#ff8a65]';
    return 'bg-[#F2F4F7] text-[#475467] dark:bg-white/10 dark:text-[#B9C1CC]';
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] dark:bg-[#060C18] pt-24 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <div className="text-[#db4001] font-bold text-[12px] tracking-[1.5px] uppercase mb-3 font-sans">
              SAI · PROCUREMENT & PARTNERSHIPS
            </div>
            <h1 className="text-[32px] font-normal text-[#0F1A2A] dark:text-[#F4F5F7] tracking-[-0.5px] mb-2 font-serif leading-tight">
              Tenders
            </h1>
            <p className="text-[14px] text-[#515c65] dark:text-[#8A94A6] font-sans">
              Open RFPs, EOIs, and procurement opportunities — apply before deadlines
            </p>
          </div>

          <div className="relative max-w-md w-full">
            <label htmlFor="search-tenders" className="sr-only">Search tenders</label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#8A94A6]" />
            </div>
            <input
              id="search-tenders"
              type="text"
              placeholder="Search tenders, RFP numbers, keywords…"
              className="w-full h-[40px] pl-10 pr-4 bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[8px] text-[14px] text-[#0F1A2A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#db4001] transition-all shadow-sm font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-[24px]">
          {/* Sidebar */}
          <nav aria-label="Filters" className="w-full md:w-[240px] flex-shrink-0">
            <div className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] p-2 flex flex-col sm:flex-row md:flex-col md:sticky md:top-28 gap-4 sm:gap-0 overflow-x-auto sm:overflow-x-visible no-scrollbar transition-colors">
              {/* Status Section */}
              <div className="flex-shrink-0 sm:flex-1">
                <div className="px-4 py-3 text-[#8A94A6] font-semibold text-[11px] tracking-[1px] uppercase font-sans border-b sm:border-b-0 border-[#EEF0F3] dark:border-white/5 sm:mb-0 mb-2">
                  STATUS
                </div>
                <div className="flex flex-row sm:flex-col gap-1 sm:gap-0.5">
                  {statusFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveStatus(filter.id)}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 text-[14px] font-sans transition-all border-l-0 sm:border-l-[2px] rounded-full sm:rounded-none whitespace-nowrap",
                        activeStatus === filter.id
                          ? "text-[#db4001] bg-[#FFF2EE] dark:bg-[#db4001]/10 sm:border-[#db4001] font-semibold"
                          : "text-[#0F1A2A] dark:text-[#B9C1CC] border-transparent hover:bg-gray-100 dark:hover:bg-white/5"
                      )}
                      aria-pressed={activeStatus === filter.id}
                    >
                      <span className="sm:mr-0 mr-2">{filter.label}</span>
                      <span className={cn(
                        "text-[12px]",
                        activeStatus === filter.id ? "text-[#db4001]" : "text-[#8A94A6] dark:text-[#515c65]"
                      )}>{filter.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Section */}
              <div className="flex-shrink-0 sm:flex-1 md:mt-4 md:border-t md:border-[#EEF0F3] dark:md:border-white/5">
                <div className="px-4 py-3 text-[#8A94A6] font-semibold text-[11px] tracking-[1px] uppercase font-sans border-b sm:border-b-0 border-[#EEF0F3] dark:border-white/5 sm:mb-0 mb-2">
                  CATEGORY
                </div>
                <div className="flex flex-row sm:flex-col gap-1 sm:gap-0.5">
                  {categoryFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveCategory(filter.id)}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 text-[14px] font-sans transition-all border-l-0 sm:border-l-[2px] rounded-full sm:rounded-none whitespace-nowrap",
                        activeCategory === filter.id
                          ? "text-[#db4001] bg-[#FFF2EE] dark:bg-[#db4001]/10 sm:border-[#db4001] font-semibold"
                          : "text-[#0F1A2A] dark:text-[#B9C1CC] border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                      )}
                      aria-pressed={activeCategory === filter.id}
                    >
                      <span className="sm:mr-0 mr-2">{filter.label}</span>
                      <span className={cn(
                        "text-[12px]",
                        activeCategory === filter.id ? "text-[#db4001]" : "text-[#8A94A6] dark:text-[#515c65]"
                      )}>{filter.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Section */}
              <div className="flex-shrink-0 sm:flex-1 md:mt-4 md:border-t md:border-[#EEF0F3] dark:md:border-white/5">
                <div className="px-4 py-3 text-[#8A94A6] font-semibold text-[11px] tracking-[1px] uppercase font-sans border-b sm:border-b-0 border-[#EEF0F3] dark:border-white/5 sm:mb-0 mb-2">
                  YEAR
                </div>
                <div className="flex flex-row sm:flex-col gap-1 sm:gap-0.5">
                  {yearFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveYear(filter.id)}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 text-[14px] font-sans transition-all border-l-0 sm:border-l-[2px] rounded-full sm:rounded-none whitespace-nowrap",
                        activeYear === filter.id
                          ? "text-[#db4001] bg-[#FFF2EE] dark:bg-[#db4001]/10 sm:border-[#db4001] font-semibold"
                          : "text-[#0F1A2A] dark:text-[#B9C1CC] border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                      )}
                      aria-pressed={activeYear === filter.id}
                    >
                      <span className="sm:mr-0 mr-2">{filter.label}</span>
                      <span className={cn(
                        "text-[12px]",
                        activeYear === filter.id ? "text-[#db4001]" : "text-[#8A94A6] dark:text-[#515c65]"
                      )}>{filter.count || '—'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Main Grid */}
          <div className="flex-1 min-w-0">
            {filteredTenders.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
                {filteredTenders.map((tender) => (
                  <div 
                    key={tender.id} 
                    className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] p-[18px] flex flex-col gap-4 hover:border-[#8A94A6] dark:hover:border-[#8A94A6] transition-all group focus-within:ring-2 focus-within:ring-[#db4001] focus-within:ring-offset-2 outline-none"
                    tabIndex={0}
                  >
                    {/* Status Row */}
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "px-2.5 py-1 rounded-[4px] text-[10px] font-bold tracking-[0.5px] uppercase font-sans",
                        getStatusBadgeStyles(tender.status)
                      )}>
                        {tender.status}
                      </div>
                      <div className={cn(
                        "px-2 px-1 rounded-[4px] text-[11px] font-semibold font-sans transition-colors",
                        getDeadlineChipStyles(tender.status)
                      )}>
                        {tender.status === 'Open' && `Closes ${tender.deadline}`}
                        {tender.status === 'Closing soon' && `${tender.daysLeft} days left`}
                        {tender.status === 'Closed' && `Closed ${tender.deadline}`}
                      </div>
                    </div>

                    {/* Category Tag */}
                    <div>
                      <div className={cn(
                        "inline-flex px-2 py-0.5 rounded-[4px] text-[10px] font-bold tracking-[0.5px] uppercase font-sans",
                        getCategoryStyles(tender.category)
                      )}>
                        {tender.category}
                      </div>
                    </div>

                    {/* Title & Info */}
                    <div className="flex-1">
                      <h3 className="text-[14px] font-semibold text-[#0F1A2A] dark:text-[#F4F5F7] leading-[1.4] font-sans mb-2 line-clamp-3 transition-colors">
                        {tender.title}
                      </h3>
                      <div className="text-[12px] text-[#8A94A6] dark:text-[#515c65] font-sans mb-1 transition-colors">
                        {tender.issuer}
                      </div>
                      <div className="text-[11px] text-[#8A94A6] dark:text-[#515c65] font-sans tabular-nums transition-colors">
                        Ref: {tender.refNo}
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="flex items-start gap-2 pt-2">
                      {tender.status !== 'Closed' && (
                        <a 
                          href="#" 
                          onClick={(e) => e.preventDefault()}
                          className="px-4 py-2 bg-[#db4001] text-white rounded-[6px] text-[12px] font-semibold tracking-[1px] uppercase font-sans hover:opacity-90 transition-all focus:ring-2 focus:ring-[#db4001] focus:ring-offset-2 outline-none whitespace-nowrap"
                        >
                          Apply now
                        </a>
                      )}
                      <a 
                        href="#" 
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-2 px-4 py-2 border border-[#db4001] text-[#db4001] rounded-[6px] text-[12px] font-semibold tracking-[1px] uppercase font-sans hover:bg-[#FFF2EE] dark:hover:bg-[#db4001]/10 transition-all focus:ring-2 focus:ring-[#db4001] focus:ring-offset-2 outline-none whitespace-nowrap"
                      >
                        <Download size={14} strokeWidth={2.5} />
                        <span>PDF</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] py-24 text-center transition-colors">
                <FileText size={48} className="mx-auto text-[#EEF0F3] dark:text-white/10 mb-4" />
                <p className="text-[#8A94A6] dark:text-[#515c65] font-sans text-[16px]">No tenders found matching your filters.</p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[#EEF0F3] dark:border-white/5 bg-white dark:bg-[#0F1A2A] text-[#515c65] dark:text-[#B9C1CC] hover:bg-gray-50 dark:hover:bg-white/10 transition-all focus:ring-2 focus:ring-[#db4001] outline-none"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-[8px] transition-all text-[14px] font-semibold focus:ring-2 focus:ring-[#db4001] outline-none",
                    currentPage === page
                      ? "bg-[#db4001] text-white shadow-sm"
                      : "bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 text-[#515c65] dark:text-[#B9C1CC] hover:bg-gray-50 dark:hover:bg-white/10"
                  )}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[#EEF0F3] dark:border-white/5 bg-white dark:bg-[#0F1A2A] text-[#515c65] dark:text-[#B9C1CC] hover:bg-gray-50 dark:hover:bg-white/10 transition-all focus:ring-2 focus:ring-[#db4001] outline-none"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .font-serif {
          font-family: Georgia, 'Times New Roman', Times, serif;
        }
        .font-sans {
          font-family: Inter, system-ui, -apple-system, sans-serif;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
};
