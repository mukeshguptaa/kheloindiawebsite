import React, { useState, useMemo } from 'react';
import { ChevronRight, ArrowRight, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// --- DATA ---
interface StateData {
  name: string;
  abbr: string;
  region: string;
  color: string;
  athletes: number;
  centres: number;
  medals: number;
  photoUrl?: string;
}

const ALL_STATES: StateData[] = [
  { name: "ANDHRA PRADESH", abbr: "AP", region: "SOUTH", color: "#C44A15", athletes: 412, centres: 22, medals: 68, photoUrl: "https://images.unsplash.com/photo-1642516861459-5550250bf657?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "ARUNACHAL PRADESH", abbr: "AR", region: "NORTHEAST", color: "#0F6E56", athletes: 68, centres: 6, medals: 14, photoUrl: "https://plus.unsplash.com/premium_photo-1697729733902-f8c92710db07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "ASSAM", abbr: "AS", region: "NORTHEAST", color: "#0F6E56", athletes: 284, centres: 16, medals: 47, photoUrl: "https://images.unsplash.com/photo-1615472910606-9d4f7291944f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "BIHAR", abbr: "BR", region: "EAST", color: "#185FA5", athletes: 398, centres: 24, medals: 52, photoUrl: "https://images.unsplash.com/photo-1622194993926-1801586d460f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "CHHATTISGARH", abbr: "CG", region: "EAST", color: "#185FA5", athletes: 246, centres: 14, medals: 38, photoUrl: "https://plus.unsplash.com/premium_photo-1697729447666-c39f50d595ea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "GOA", abbr: "GA", region: "WEST", color: "#db4001", athletes: 112, centres: 8, medals: 21, photoUrl: "https://plus.unsplash.com/premium_photo-1664304458186-9a67c1330d02?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "GUJARAT", abbr: "GJ", region: "WEST", color: "#db4001", athletes: 687, centres: 36, medals: 124, photoUrl: "https://plus.unsplash.com/premium_photo-1697730464803-fcede713753e?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "HARYANA", abbr: "HR", region: "NORTH", color: "#143686", athletes: 1108, centres: 54, medals: 364 },
  { name: "HIMACHAL PRADESH", abbr: "HP", region: "NORTH", color: "#143686", athletes: 178, centres: 12, medals: 29 },
  { name: "JHARKHAND", abbr: "JH", region: "EAST", color: "#185FA5", athletes: 312, centres: 18, medals: 54 },
  { name: "KARNATAKA", abbr: "KA", region: "SOUTH", color: "#C44A15", athletes: 982, centres: 46, medals: 162 },
  { name: "KERALA", abbr: "KL", region: "SOUTH", color: "#C44A15", athletes: 524, centres: 28, medals: 89 },
  { name: "MADHYA PRADESH", abbr: "MP", region: "WEST", color: "#db4001", athletes: 612, centres: 32, medals: 118 },
  { name: "MAHARASHTRA", abbr: "MH", region: "WEST", color: "#db4001", athletes: 1247, centres: 68, medals: 312 },
  { name: "MANIPUR", abbr: "MN", region: "NORTHEAST", color: "#0F6E56", athletes: 412, centres: 18, medals: 217 },
  { name: "MEGHALAYA", abbr: "ML", region: "NORTHEAST", color: "#0F6E56", athletes: 84, centres: 6, medals: 16 },
  { name: "MIZORAM", abbr: "MZ", region: "NORTHEAST", color: "#0F6E56", athletes: 62, centres: 4, medals: 11 },
  { name: "NAGALAND", abbr: "NL", region: "NORTHEAST", color: "#0F6E56", athletes: 74, centres: 5, medals: 13 },
  { name: "ODISHA", abbr: "OD", region: "EAST", color: "#185FA5", athletes: 586, centres: 30, medals: 102 },
  { name: "PUNJAB", abbr: "PB", region: "NORTH", color: "#143686", athletes: 834, centres: 42, medals: 185 },
  { name: "RAJASTHAN", abbr: "RJ", region: "NORTH", color: "#143686", athletes: 542, centres: 28, medals: 94 },
  { name: "SIKKIM", abbr: "SK", region: "NORTHEAST", color: "#0F6E56", athletes: 38, centres: 3, medals: 6 },
  { name: "TAMIL NADU", abbr: "TN", region: "SOUTH", color: "#C44A15", athletes: 876, centres: 44, medals: 148 },
  { name: "TELANGANA", abbr: "TG", region: "SOUTH", color: "#C44A15", athletes: 468, centres: 24, medals: 76 },
  { name: "TRIPURA", abbr: "TR", region: "NORTHEAST", color: "#0F6E56", athletes: 92, centres: 7, medals: 18 },
  { name: "UTTAR PRADESH", abbr: "UP", region: "NORTH", color: "#143686", athletes: 724, centres: 38, medals: 132 },
  { name: "UTTARAKHAND", abbr: "UK", region: "NORTH", color: "#143686", athletes: 208, centres: 14, medals: 34 },
  { name: "WEST BENGAL", abbr: "WB", region: "EAST", color: "#185FA5", athletes: 642, centres: 34, medals: 108 },
  { name: "CHANDIGARH", abbr: "CH", region: "UNION TERRITORIES", color: "#534AB7", athletes: 148, centres: 8, medals: 28, photoUrl: "https://images.unsplash.com/photo-1697308539764-74be3e4bb76b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "DADRA AND NAGAR HAVELI AND DAMAN AND DIU", abbr: "DH", region: "UNION TERRITORIES", color: "#534AB7", athletes: 42, centres: 3, medals: 7, photoUrl: "https://images.unsplash.com/photo-1642152654432-2ed914826e2d?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "DELHI", abbr: "DL", region: "UNION TERRITORIES", color: "#534AB7", athletes: 512, centres: 26, medals: 92, photoUrl: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "JAMMU AND KASHMIR", abbr: "JK", region: "UNION TERRITORIES", color: "#534AB7", athletes: 194, centres: 12, medals: 32 },
  { name: "LADAKH", abbr: "LA", region: "UNION TERRITORIES", color: "#534AB7", athletes: 48, centres: 4, medals: 8 },
  { name: "LAKSHADWEEP", abbr: "LD", region: "UNION TERRITORIES", color: "#534AB7", athletes: 18, centres: 2, medals: 3 },
  { name: "PUDUCHERRY", abbr: "PY", region: "UNION TERRITORIES", color: "#534AB7", athletes: 74, centres: 5, medals: 14 }
];

const REGIONS = ["ALL", "NORTH", "SOUTH", "EAST", "WEST", "NORTHEAST", "UNION TERRITORIES"];

// --- HELPERS ---
const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-');

// --- CARD COMPONENT ---
interface CardProps {
  state: StateData;
  athletesRank: number;
  medalsRank: number;
}

const StateCard: React.FC<CardProps> = ({ state, athletesRank, medalsRank }) => {
  const isUT = state.region === "UNION TERRITORIES";
  const slug = slugify(state.name);

  const rankingSubtitle = useMemo(() => {
    if (athletesRank <= 10 || medalsRank <= 10) {
      return `Ranked #${athletesRank} by athletes · #${medalsRank} by medals`;
    }
    return "Among India's emerging sport ecosystems";
  }, [athletesRank, medalsRank]);

  return (
    <article className="bg-surface border border-border rounded-[14px] overflow-hidden shadow-theme transition-all duration-300 flex flex-col sm:grid sm:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
      {/* Photo Column */}
      <div 
        aria-hidden="true"
        className="relative min-h-[180px] sm:min-h-full p-[14px] flex flex-col justify-between aspect-[16/9] sm:aspect-auto"
        style={{
          background: state.photoUrl 
            ? `url('${state.photoUrl}') center/cover no-repeat`
            : state.color
        }}
      >
        {/* Placeholder to maintain flex-col justify-between if needed, or just leave empty */}
      </div>

      {/* Content Column */}
      <div className="flex flex-col p-6 sm:p-8 lg:p-10 min-w-0">
        <div className="mb-[20px]">
          <h2 className="font-anton text-[24px] font-bold leading-none text-text-primary mb-2 whitespace-nowrap overflow-hidden text-overflow-ellipsis" title={state.name}>
            {state.name}
          </h2>
          <p className="text-text-meta text-[12px] leading-[1.5] whitespace-nowrap overflow-hidden text-overflow-ellipsis">
            {rankingSubtitle}
          </p>
        </div>

        {/* Stats Block */}
        <div className="grid grid-cols-3 border-y border-border mb-[20px]">
          <div className="py-[14px] pr-4">
            <div className="text-text-meta font-bold text-[9px] tracking-[1.2px] uppercase mb-1">ATHLETES</div>
            <div className="font-anton text-[20px] lg:text-[24px] leading-none text-text-primary tracking-[-0.3px]">
              {state.athletes.toLocaleString()}
            </div>
          </div>
          <div className="py-[14px] px-4 border-x border-border">
            <div className="text-text-meta font-bold text-[9px] tracking-[1.2px] uppercase mb-1">CENTRES</div>
            <div className="font-anton text-[20px] lg:text-[24px] leading-none text-text-primary tracking-[-0.3px]">
              {state.centres}
            </div>
          </div>
          <div className="py-[14px] pl-4">
            <div className="text-text-meta font-bold text-[9px] tracking-[1.2px] uppercase mb-1">MEDALS '25</div>
            <div className="font-anton text-[20px] lg:text-[24px] leading-none text-accent tracking-[-0.3px]">
              {state.medals}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          to={`/states/${slug}`}
          className="mt-auto bg-surface border-[1.5px] border-accent text-accent font-bold text-[11px] tracking-[1.2px] p-[10px_14px] rounded-[8px] flex items-center justify-center gap-[8px] hover:bg-accent hover:text-white transition-all duration-150 whitespace-nowrap overflow-hidden text-overflow-ellipsis uppercase"
        >
          EXPLORE {state.name} <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
};

// --- MAIN PAGE ---
export const State = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [sortConfig, setSortConfig] = useState("alpha");

  // Ranks calculation
  const athleteRanks = useMemo(() => {
    return [...ALL_STATES]
      .sort((a, b) => b.athletes - a.athletes)
      .map((s, idx) => ({ name: s.name, rank: idx + 1 }));
  }, []);

  const medalRanks = useMemo(() => {
    return [...ALL_STATES]
      .sort((a, b) => b.medals - a.medals)
      .map((s, idx) => ({ name: s.name, rank: idx + 1 }));
  }, []);

  const filteredAndSortedStates = useMemo(() => {
    let result = activeFilter === "ALL" 
      ? ALL_STATES 
      : ALL_STATES.filter(s => s.region === activeFilter);

    result = [...result].sort((a, b) => {
      if (sortConfig === "alpha") return a.name.localeCompare(b.name);
      if (sortConfig === "athletes_desc") return b.athletes - a.athletes;
      if (sortConfig === "medals_desc") return b.medals - a.medals;
      if (sortConfig === "centres_desc") return b.centres - a.centres;
      return 0;
    });

    return result;
  }, [activeFilter, sortConfig]);

  const getAthleteRank = (name: string) => athleteRanks.find(r => r.name === name)?.rank || 99;
  const getMedalRank = (name: string) => medalRanks.find(r => r.name === name)?.rank || 99;

  return (
    <div className="bg-page-bg min-h-screen transition-colors duration-300 font-sans">
      <main className="max-w-[1320px] mx-auto py-20 px-4 sm:px-8 md:px-12 lg:px-20">
        
        {/* PAGE HERO */}
        <section className="mb-[48px] flex flex-col gap-[10px]">
          <span className="font-bold text-[11px] tracking-[2px] uppercase text-accent">
            KHELO INDIA IN STATES
          </span>
          <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-georgia font-[200] tracking-[-0.8px] leading-[1.05] text-text-primary">
            Every State. Every Story.
          </h1>
          <p className="text-text-body text-[15px] leading-[1.6] max-w-[640px]">
            From Ladakh to Lakshadweep, 35 states and union territories 
            make up India's sport ecosystem. Explore each one.
          </p>
        </section>

        {/* FILTER / SORT BAR */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-[48px]">
          {/* Left: Filter Chips */}
          <div className="flex flex-wrap gap-4">
            {REGIONS.map(region => (
              <button
                key={region}
                onClick={() => setActiveFilter(region)}
                className={cn(
                  "font-bold text-[11px] tracking-[1px] uppercase p-[10px_14px] rounded-[8px] transition-all",
                  activeFilter === region 
                    ? "bg-accent text-white" 
                    : "bg-surface border border-border text-text-body"
                )}
                role="tab"
                aria-selected={activeFilter === region}
              >
                {region === "ALL" ? `ALL · ${ALL_STATES.length}` : region}
                {region !== "ALL" && activeFilter === region && ` · ${filteredAndSortedStates.length}`}
              </button>
            ))}
          </div>

          {/* Right: Sort Dropdown */}
          <div className="flex items-center gap-4">
            <span className="text-text-meta font-medium text-[12px] tracking-[0.8px] uppercase">SORT BY</span>
            <select
              value={sortConfig}
              onChange={(e) => setSortConfig(e.target.value)}
              className="bg-surface border border-border rounded-[8px] p-[8px_14px] text-[13px] text-text-primary focus:outline-none focus:border-accent appearance-none pr-8 relative cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
            >
              <option value="alpha">Alphabetical (default)</option>
              <option value="athletes_desc">Athletes: high to low</option>
              <option value="medals_desc">Medals: high to low</option>
              <option value="centres_desc">Centres: high to low</option>
            </select>
          </div>
        </section>

        {/* STATE CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredAndSortedStates.map(state => (
            <StateCard 
              key={state.abbr} 
              state={state} 
              athletesRank={getAthleteRank(state.name)}
              medalsRank={getMedalRank(state.name)}
            />
          ))}
        </div>

        {filteredAndSortedStates.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-text-meta italic">No results found for your filter.</p>
          </div>
        )}

      </main>
    </div>
  );
};
