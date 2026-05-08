import React, { useState } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

// Sample data provided in the prompt
const reportsData = [
  { id: 1, type: 'EOI', title: 'EOI to finalise host states for Khelo India Youth & University Games for the next 5 years', date: '14 Oct 2025' },
  { id: 2, type: 'Press', title: 'Discipline-wise participation in all editions of Khelo India Games', date: '12 Oct 2025' },
  { id: 3, type: 'Circular', title: 'Dissolution of steering committee for conduct of Volleyball and Beach Volleyball KIUG 2025', date: '10 Oct 2025' },
  { id: 4, type: 'EOI', title: 'Application for engagement of technical officials for KIUG 2025 (Volleyball Sports)', date: '08 Oct 2025' },
  { id: 5, type: 'Policy', title: 'Induction report of Khelo India athletes — Athletics discipline', date: '05 Oct 2025' },
  { id: 6, type: 'Press', title: 'National coaching certification drive starts across 28 states', date: '02 Oct 2025' },
  { id: 7, type: 'Circular', title: 'Revised guidelines for state-level Khelo India centres', date: '28 Sep 2025' },
  { id: 8, type: 'Press', title: 'Bhopal to host KIYG 2025 swimming trials in November', date: '24 Sep 2025' },
  { id: 9, type: 'EOI', title: 'Invitation of expression of interest from partners for various campaigns under Fit India movement', date: '20 Sep 2025' },
  { id: 10, type: 'Policy', title: 'Athlete scholarship program expanded to cover international training', date: '15 Sep 2025' },
];

const categories = [
  { id: 'all', label: 'All reports', count: 47 },
  { id: 'Press', label: 'Press releases', count: 18 },
  { id: 'Circular', label: 'Circulars', count: 12 },
  { id: 'Policy', label: 'Policy updates', count: 9 },
  { id: 'EOI', label: 'EOI / calls', count: 8 },
];

const years = [
  { id: '2025', label: '2025', count: 22 },
  { id: '2024', label: '2024', count: 31 },
  { id: '2023', label: '2023', count: 28 },
  { id: 'earlier', label: 'Earlier', count: null },
];

export const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReports = reportsData.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || report.type === activeCategory;
    // For simplicity with sample data, we'll just check if the year matches the date string if year is filtered
    const matchesYear = activeYear === 'all' || activeYear === 'earlier' || report.date.includes(activeYear);
    return matchesSearch && matchesCategory && matchesYear;
  });

  const getTagStyles = (type: string) => {
    switch (type) {
      case 'EOI':
        return 'bg-[#FFF2EE] text-[#db4001] dark:bg-[#db4001]/20 dark:text-[#ff8a65]';
      case 'Press':
        return 'bg-[#EBF5FF] text-[#0066CC] dark:bg-[#0066CC]/20 dark:text-[#64b5f6]';
      case 'Circular':
        return 'bg-[#F2F4F7] text-[#475467] dark:bg-white/10 dark:text-[#B9C1CC]';
      case 'Policy':
        return 'bg-[#FEFBE8] text-[#854D0E] dark:bg-[#fbbf24]/20 dark:text-[#fdd835]';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-400';
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] dark:bg-[#060C18] pt-24 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <div className="text-[#db4001] font-bold text-[12px] tracking-[1.5px] uppercase mb-3 font-sans">
              SAI · NEWS & UPDATES
            </div>
            <h1 className="text-[32px] font-normal text-[#0F1A2A] dark:text-[#F4F5F7] tracking-[-0.5px] mb-2 font-serif leading-tight">
              Reports
            </h1>
            <p className="text-[14px] text-[#515c65] dark:text-[#8A94A6] font-sans">
              Official announcements, circulars, and policy updates
            </p>
          </div>

          <div className="relative max-w-md w-full">
            <label htmlFor="search-reports" className="sr-only">Search reports</label>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#8A94A6]" />
            </div>
            <input
              id="search-reports"
              type="text"
              placeholder="Search reports, circular numbers, keywords…"
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
              <div className="flex-shrink-0 sm:flex-1">
                <div className="px-4 py-3 text-[#8A94A6] font-semibold text-[11px] tracking-[1px] uppercase font-sans border-b sm:border-b-0 border-[#EEF0F3] dark:border-white/5 sm:mb-0 mb-2">
                  CATEGORY
                </div>
                <div className="flex flex-row sm:flex-col gap-1 sm:gap-0.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 text-[14px] font-sans transition-all border-l-0 sm:border-l-[2px] rounded-full sm:rounded-none whitespace-nowrap",
                        activeCategory === cat.id
                          ? "text-[#db4001] bg-[#FFF2EE] dark:bg-[#db4001]/10 sm:border-[#db4001] font-semibold"
                          : "text-[#0F1A2A] dark:text-[#B9C1CC] border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                      )}
                      aria-pressed={activeCategory === cat.id}
                    >
                      <span className="sm:mr-0 mr-2">{cat.label}</span>
                      <span className={cn(
                        "text-[12px]",
                        activeCategory === cat.id ? "text-[#db4001]" : "text-[#8A94A6] dark:text-[#515c65]"
                      )}>{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 sm:flex-1 md:mt-4 md:border-t md:border-[#EEF0F3] dark:md:border-white/5">
                <div className="px-4 py-3 text-[#8A94A6] font-semibold text-[11px] tracking-[1px] uppercase font-sans border-b sm:border-b-0 border-[#EEF0F3] dark:border-white/5 sm:mb-0 mb-2">
                  YEAR
                </div>
                <div className="flex flex-row sm:flex-col gap-1 sm:gap-0.5">
                  {years.map((y) => (
                    <button
                      key={y.id}
                      onClick={() => setActiveYear(y.id)}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 text-[14px] font-sans transition-all border-l-0 sm:border-l-[2px] rounded-full sm:rounded-none whitespace-nowrap",
                        activeYear === y.id
                          ? "text-[#db4001] bg-[#FFF2EE] dark:bg-[#db4001]/10 sm:border-[#db4001] font-semibold"
                          : "text-[#0F1A2A] dark:text-[#B9C1CC] border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                      )}
                      aria-pressed={activeYear === y.id}
                    >
                      <span className="sm:mr-0 mr-2">{y.label}</span>
                      <span className={cn(
                        "text-[12px]",
                        activeYear === y.id ? "text-[#db4001]" : "text-[#8A94A6] dark:text-[#515c65]"
                      )}>{y.count || '—'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Main List */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] overflow-hidden transition-colors">
              <ul className="divide-y divide-[#EEF0F3] dark:divide-white/5">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <li key={report.id} className="group hover:bg-[#F9FAFB] dark:hover:bg-white/5 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center p-[14px_18px] gap-4">
                        <div className={cn(
                          "w-[70px] flex-shrink-0 flex items-center justify-center py-1 rounded-[4px] text-[10px] font-bold tracking-[0.5px] uppercase font-sans",
                          getTagStyles(report.type)
                        )}>
                          {report.type}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <button className="text-left text-[14px] text-[#0F1A2A] dark:text-[#F4F5F7] font-sans leading-[1.45] font-normal line-clamp-2 transition-colors focus:ring-2 focus:ring-[#db4001] focus:ring-offset-2 rounded px-0.5 outline-none">
                            {report.title}
                          </button>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 flex-shrink-0 sm:min-w-[200px]">
                          <span className="text-[12px] text-[#8A94A6] dark:text-[#515c65] font-sans tabular-nums whitespace-nowrap order-last sm:order-first transition-colors">
                            {report.date}
                          </span>
                          
                          <a 
                            href="#" 
                            onClick={(e) => e.preventDefault()}
                            className="flex items-center gap-2 px-3 py-1.5 border border-[#db4001] text-[#db4001] rounded-[6px] text-[12px] font-semibold tracking-[1px] uppercase font-sans hover:bg-[#db4001] hover:text-white dark:hover:text-white transition-all active:scale-95 focus:ring-2 focus:ring-[#db4001] focus:ring-offset-2 outline-none group/pdf"
                          >
                            <Download size={14} strokeWidth={2.5} className="group-hover/pdf:translate-y-0.5 transition-transform" />
                            <span>PDF</span>
                          </a>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-16 text-center">
                    <p className="text-[#8A94A6] dark:text-[#515c65] font-sans text-[14px]">No reports found matching your filters.</p>
                  </li>
                )}
              </ul>
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[#EEF0F3] dark:border-white/5 bg-white dark:bg-[#0F1A2A] text-[#515c65] dark:text-[#B9C1CC] hover:bg-gray-50 dark:hover:bg-white/10 transition-all focus:ring-2 focus:ring-[#db4001] outline-none"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
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
