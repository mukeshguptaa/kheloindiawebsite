import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Search, Download, ChevronLeft, ChevronRight, FileText, Briefcase, Bell, Newspaper, BookOpen, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

// TYPES
type DocCategory = 'all' | 'reports' | 'circulars' | 'tenders' | 'press-releases' | 'sop';

interface DocumentItem {
  id: number;
  type: string;
  category: DocCategory;
  title: string;
  date: string;
  // Tender specific
  status?: string;
  deadline?: string;
  daysLeft?: number;
  issuer?: string;
  refNo?: string;
}

// MOCK DATA
const allDocuments: DocumentItem[] = [
  // REPORTS / CIRCULARS / PRESS / SOPs
  { id: 1, type: 'EOI', category: 'reports', title: 'EOI to finalise host states for Khelo India Youth & University Games for the next 5 years', date: '14 Oct 2025' },
  { id: 2, type: 'Press', category: 'press-releases', title: 'Discipline-wise participation in all editions of Khelo India Games', date: '12 Oct 2025' },
  { id: 3, type: 'Circular', category: 'circulars', title: 'Dissolution of steering committee for conduct of Volleyball and Beach Volleyball KIUG 2025', date: '10 Oct 2025' },
  { id: 4, type: 'Circular', category: 'circulars', title: 'Application for engagement of technical officials for KIUG 2025 (Volleyball Sports)', date: '08 Oct 2025' },
  { id: 5, type: 'SOP', category: 'sop', title: 'Khelo India Athlete Training SOP - Athletics discipline', date: '05 Oct 2025' },
  { id: 6, type: 'Press', category: 'press-releases', title: 'National coaching certification drive starts across 28 states', date: '02 Oct 2025' },
  { id: 7, type: 'Circular', category: 'circulars', title: 'Revised guidelines for state-level Khelo India centres', date: '28 Sep 2025' },
  { id: 8, type: 'SOP', category: 'sop', title: 'SOP for Management of High Performance Centres', date: '20 Sep 2025' },
  { id: 9, type: 'EOI', category: 'reports', title: 'Annual Performance Report 2024-25 - Financial Summary', date: '15 Sep 2025' },
  
  // TENDERS
  {
    id: 101,
    title: 'Request for proposal for production and telecast rights for Khelo India Games',
    category: 'tenders',
    type: 'RFP',
    status: 'Open',
    deadline: '22 Oct 2025',
    daysLeft: 8,
    issuer: 'Ministry of Youth Affairs and Sports',
    refNo: 'MYAS/RFP/2025/048',
    date: '14 Oct 2025'
  },
  {
    id: 102,
    title: 'Hiring of sponsors for 3 upcoming editions of Khelo India Games',
    category: 'tenders',
    type: 'Limited',
    status: 'Closing soon',
    deadline: '17 Oct 2025',
    daysLeft: 3,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/RFP-LTD/2025/012',
    date: '12 Oct 2025'
  },
  {
    id: 103,
    title: 'Procurement of PAC Yonex make badminton equipment',
    category: 'tenders',
    type: 'Bid',
    status: 'Open',
    deadline: '28 Oct 2025',
    daysLeft: 14,
    issuer: 'Sports Authority of India',
    refNo: 'SAI/PROC/2025/088',
    date: '10 Oct 2025'
  }
];

const categoryConfig = [
  { id: 'all', label: 'All documents', icon: Layers, subtitle: 'Complete archive of official documents, tenders, and notices' },
  { id: 'reports', label: 'Reports', icon: FileText, subtitle: 'Annual performance reports and initiative impact studies' },
  { id: 'circulars', label: 'Circulars', icon: Bell, subtitle: 'Official notifications and administrative updates' },
  { id: 'tenders', label: 'Tenders', icon: Briefcase, subtitle: 'Procurement opportunities and project bidding information' },
  { id: 'press-releases', label: 'Press Releases', icon: Newspaper, subtitle: 'Latest official news and media announcements' },
  { id: 'sop', label: 'SOPs', icon: BookOpen, subtitle: 'Standard Operating Procedures for centers and event management' },
];

const years = [
  { id: '2025', label: '2025' },
  { id: '2024', label: '2024' },
  { id: '2023', label: '2023' },
  { id: 'earlier', label: 'Earlier' },
];

const tenderStatusFilters = [
  { id: 'all', label: 'All status' },
  { id: 'Open', label: 'Open' },
  { id: 'Closing soon', label: 'Closing soon' },
  { id: 'Closed', label: 'Closed' },
];

// COMPONENTS
const DocumentRow: React.FC<{ doc: DocumentItem }> = ({ doc }) => {
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
      case 'SOP':
        return 'bg-[#F0FDF4] text-[#166534] dark:bg-[#166534]/20 dark:text-[#86efac]';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-400';
    }
  };

  return (
    <li className="group hover:bg-[#F9FAFB] dark:hover:bg-white/5 transition-colors border-b border-[#EEF0F3] dark:border-white/5 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-center p-[14px_18px] gap-4">
        <div className={cn(
          "w-[70px] flex-shrink-0 flex items-center justify-center py-1 rounded-[4px] text-[10px] font-bold tracking-[0.5px] uppercase font-sans",
          getTagStyles(doc.type)
        )}>
          {doc.type}
        </div>
        
        <div className="flex-1 min-w-0">
          <button className="text-left text-[14px] text-[#0F1A2A] dark:text-[#F4F5F7] font-sans leading-[1.45] font-normal line-clamp-2 transition-colors focus:ring-2 focus:ring-[#db4001] focus:ring-offset-2 rounded px-0.5 outline-none hover:text-[#db4001]">
            {doc.title}
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 flex-shrink-0 sm:min-w-[200px]">
          <span className="text-[12px] text-[#8A94A6] dark:text-[#515c65] font-sans tabular-nums whitespace-nowrap order-last sm:order-first">
            {doc.date}
          </span>
          
          <a 
            href="#" 
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#db4001] text-[#db4001] rounded-[6px] text-[12px] font-semibold tracking-[1px] uppercase font-sans hover:bg-[#db4001] hover:text-white transition-all group/pdf"
          >
            <Download size={14} strokeWidth={2.5} />
            <span>PDF</span>
          </a>
        </div>
      </div>
    </li>
  );
};

const TenderCard: React.FC<{ tender: DocumentItem }> = ({ tender }) => {
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-[#EAF3DE] text-[#3B6D11] dark:bg-[#3B6D11]/20 dark:text-[#86efac]';
      case 'Closing soon': return 'bg-[#FAEEDA] text-[#854F0B] dark:bg-[#854F0B]/20 dark:text-[#fbbf24]';
      case 'Closed': return 'bg-[#EEF0F3] text-[#828792] dark:bg-white/10 dark:text-[#8A94A6]';
      default: return 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-400';
    }
  };

  const getDeadlineStyles = (status: string) => {
    if (status === 'Closing soon') return 'bg-[#FAEEDA] text-[#854F0B] dark:bg-[#854F0B]/20';
    if (status === 'Closed') return 'bg-[#EEF0F3] text-[#828792] dark:bg-white/10';
    return 'text-[#515c65] dark:text-[#B9C1CC]';
  };

  return (
    <div className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] p-[18px] flex flex-col gap-4 hover:border-[#8A94A6] transition-all group shadow-sm">
      <div className="flex items-center justify-between">
        <div className={cn("px-2.5 py-1 rounded-[4px] text-[10px] font-bold tracking-[0.5px] uppercase font-sans", getStatusBadgeStyles(tender.status || ""))}>
          {tender.status}
        </div>
        <div className={cn("px-2 py-1 rounded-[4px] text-[11px] font-semibold font-sans", getDeadlineStyles(tender.status || ""))}>
          {tender.status === 'Open' && `Closes ${tender.deadline}`}
          {tender.status === 'Closing soon' && `${tender.daysLeft} days left`}
          {tender.status === 'Closed' && `Closed ${tender.deadline}`}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-[14px] font-semibold text-[#0F1A2A] dark:text-[#F4F5F7] leading-[1.4] font-sans mb-2 line-clamp-3 hover:text-[#db4001] cursor-pointer">
          {tender.title}
        </h3>
        <div className="text-[12px] text-[#8A94A6] dark:text-[#515c65] font-sans mb-1">{tender.issuer}</div>
        <div className="text-[11px] text-[#8A94A6] dark:text-[#515c65] font-sans tabular-nums">Ref: {tender.refNo}</div>
      </div>

      <div className="flex items-start gap-2 pt-2 border-t border-[#EEF0F3] dark:border-white/5">
        {tender.status !== 'Closed' && (
          <button className="px-4 py-2 bg-[#db4001] text-white rounded-[6px] text-[12px] font-semibold tracking-[1px] uppercase font-sans hover:opacity-90">
            Apply now
          </button>
        )}
        <button className="flex items-center gap-2 px-4 py-2 border border-[#db4001] text-[#db4001] rounded-[6px] text-[12px] font-semibold tracking-[1px] uppercase font-sans hover:bg-[#FFF2EE] dark:hover:bg-[#db4001]/10">
          <Download size={14} strokeWidth={2.5} />
          <span>PDF</span>
        </button>
      </div>
    </div>
  );
};

export const Documents = () => {
  const { category = 'all' } = useParams<{ category: DocCategory }>();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeYear, setActiveYear] = useState('2025');
  const [activeStatus, setActiveStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const currentCategoryModel = categoryConfig.find(c => c.id === category) || categoryConfig[0];

  const filteredDocs = allDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (doc.refNo && doc.refNo.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = category === 'all' || doc.category === category;
    const matchesYear = activeYear === 'all' || activeYear === 'earlier' || doc.date.includes(activeYear);
    const matchesStatus = activeStatus === 'all' || doc.status === activeStatus;
    
    return matchesSearch && matchesCategory && matchesYear && (category === 'tenders' ? matchesStatus : true);
  });

  // Preserve filters on category switch (handled automatically by state remaining in component)
  const handleCategorySwitch = (newCat: string) => {
    navigate(`/documents/${newCat}`);
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] dark:bg-[#060C18] pt-24 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <div className="text-[#db4001] font-bold text-[12px] tracking-[1.5px] uppercase mb-3 font-sans">
              SAI · DOCUMENTS & RESOURCES
            </div>
            <h1 className="text-[32px] font-normal text-[#0F1A2A] dark:text-[#F4F5F7] tracking-[-0.5px] mb-2 font-georgia leading-tight">
              {currentCategoryModel.label}
            </h1>
            <p className="text-[14px] text-[#515c65] dark:text-[#8A94A6] font-sans">
              {currentCategoryModel.subtitle}
            </p>
          </div>

          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#8A94A6]" />
            </div>
            <input
              type="text"
              placeholder="Search documents, IDs, or keywords…"
              className="w-full h-[40px] pl-10 pr-4 bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[8px] text-[14px] text-[#0F1A2A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#db4001] transition-all shadow-sm font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-[24px]">
          {/* Sidebar */}
          <nav aria-label="Filters" className="w-full md:w-[260px] flex-shrink-0">
            <div className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] p-2 flex flex-col gap-6 sticky top-28 transition-colors">
              {/* CATEGORY SECTION */}
              <div>
                <div className="px-4 py-3 text-[#8A94A6] font-semibold text-[11px] tracking-[1px] uppercase font-sans border-b border-[#EEF0F3] dark:border-white/5 mb-2">
                  DOCUMENTS
                </div>
                <div className="flex flex-col gap-0.5">
                  {categoryConfig.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySwitch(cat.id)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 text-[14px] font-sans transition-all border-l-2 text-left",
                        category === cat.id
                          ? "text-[#db4001] bg-[#FFF2EE] dark:bg-[#db4001]/10 border-[#db4001] font-semibold"
                          : "text-[#0F1A2A] dark:text-[#B9C1CC] border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                      )}
                    >
                      <cat.icon size={18} className={category === cat.id ? "text-[#db4001]" : "text-[#8A94A6]"} />
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* TENDER SPECIFIC FILTERS */}
              {category === 'tenders' && (
                <div className="border-t border-[#EEF0F3] dark:border-white/5 pt-4">
                  <div className="px-4 py-3 text-[#8A94A6] font-semibold text-[11px] tracking-[1px] uppercase font-sans border-b border-[#EEF0F3] dark:border-white/5 mb-2">
                    TENDER STATUS
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {tenderStatusFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setActiveStatus(filter.id)}
                        className={cn(
                          "flex items-center justify-between px-4 py-2.5 text-[14px] font-sans transition-all border-l-2",
                          activeStatus === filter.id
                            ? "text-[#db4001] bg-[#FFF2EE] dark:bg-[#db4001]/10 border-[#db4001] font-semibold"
                            : "text-[#0F1A2A] dark:text-[#B9C1CC] border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                        )}
                      >
                        <span>{filter.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* YEAR FILTER (Always Visible) */}
              <div className="border-t border-[#EEF0F3] dark:border-white/5 pt-4">
                <div className="px-4 py-3 text-[#8A94A6] font-semibold text-[11px] tracking-[1px] uppercase font-sans border-b border-[#EEF0F3] dark:border-white/5 mb-2">
                  PUBLICATION YEAR
                </div>
                <div className="flex flex-col gap-0.5">
                  {years.map((y) => (
                    <button
                      key={y.id}
                      onClick={() => setActiveYear(y.id)}
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 text-[14px] font-sans transition-all border-l-2",
                        activeYear === y.id
                          ? "text-[#db4001] bg-[#FFF2EE] dark:bg-[#db4001]/10 border-[#db4001] font-semibold"
                          : "text-[#0F1A2A] dark:text-[#B9C1CC] border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                      )}
                    >
                      <span>{y.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {filteredDocs.length > 0 ? (
              <>
                {category === 'tenders' ? (
                  /* Cards for Tenders */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredDocs.map(doc => (
                      <TenderCard key={doc.id} tender={doc} />
                    ))}
                  </div>
                ) : category === 'all' ? (
                   /* Grouped or Mixed View for All */
                   <div className="space-y-8">
                     <div className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] overflow-hidden shadow-sm">
                       <ul className="divide-y divide-[#EEF0F3] dark:divide-white/5">
                         {filteredDocs.map(doc => {
                           if (doc.category === 'tenders') return null;
                           return <DocumentRow key={doc.id} doc={doc} />;
                         })}
                       </ul>
                     </div>
                     
                     {filteredDocs.some(d => d.category === 'tenders') && (
                       <div>
                         <h3 className="text-[12px] font-bold text-[#8A94A6] uppercase tracking-wider mb-4 px-2">Active Tenders</h3>
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                           {filteredDocs.filter(d => d.category === 'tenders').map(doc => (
                             <TenderCard key={doc.id} tender={doc} />
                           ))}
                         </div>
                       </div>
                     )}
                   </div>
                ) : (
                  /* Row view for others */
                  <div className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] overflow-hidden shadow-sm">
                    <ul className="divide-y divide-[#EEF0F3] dark:divide-white/5">
                      {filteredDocs.map(doc => (
                        <DocumentRow key={doc.id} doc={doc} />
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 rounded-[12px] py-24 text-center">
                <FileText size={48} className="mx-auto text-[#EEF0F3] mb-4 opacity-50" />
                <p className="text-[#8A94A6] font-sans text-[16px]">No documents found matching your criteria.</p>
              </div>
            )}

            {/* Pagination Placeholder */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[#EEF0F3] dark:border-white/5 bg-white dark:bg-[#0F1A2A] text-[#B9C1CC] hover:bg-gray-50 transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              {[1, 2].map((page) => (
                <button
                  key={page}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-[8px] transition-all text-[14px] font-semibold",
                    page === 1 ? "bg-[#db4001] text-white shadow-sm" : "bg-white dark:bg-[#0F1A2A] border border-[#EEF0F3] dark:border-white/5 text-[#B9C1CC]"
                  )}
                >
                  {page}
                </button>
              ))}
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[#EEF0F3] dark:border-white/5 bg-white dark:bg-[#0F1A2A] text-[#B9C1CC] hover:bg-gray-50 transition-all"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .font-georgia { font-family: Georgia, serif; }
      `}} />
    </main>
  );
};

export default Documents;
