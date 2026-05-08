import React, { useEffect, useState } from 'react';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- TYPES ---
interface Milestone {
  year: string;
  type: 'text' | 'photo';
  title: string;
  body: string;
  gradient?: 'navy' | 'blue' | 'saffron';
  eyebrow?: string;
  display?: { val: string; caption?: string };
  tag?: string;
  active?: boolean;
  photoUrl?: string;
}

// --- DATA ---
const milestones: Milestone[] = [
  {
    year: "2017",
    type: "photo",
    gradient: "navy",
    photoUrl: "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/01/31/Pictures/inauguration-of-1st-khelo-india-school-games_d9f233bc-069e-11e8-90ea-37dc70df54a3.jpg",
    // eyebrow: "NEW DELHI 2018",
    display: { val: "3,507", caption: "athletes" },
    tag: "LAUNCH",
    title: "First Youth Games",
    body: "The inaugural edition in New Delhi — 16 disciplines, 29 states represented. Originally Khelo India School Games."
  },
  {
    year: "2019",
    type: "text",
    title: "Scholarship programme begins",
    body: "Top 1,000 athletes receive ₹5 lakh annual support."
  },
  {
    year: "2020",
    type: "text",
    title: "University Games debuts",
    body: "KIUG opens a second pathway in Bhubaneswar — 4,000+ college athletes."
  },
  {
    year: "2021",
    type: "text",
    title: "Centres of Excellence established",
    body: "Permanent high-performance training infrastructure across 8 states."
  },
  {
    year: "2022",
    type: "photo",
    gradient: "blue",
    photoUrl: "https://kheltoday.com/wp-content/uploads/2025/01/Teams-at-the-opening-of-KIWG-2025-in-Leh-on-Thursday.-SAI-Media-pix-scaled.jpg",
    // eyebrow: "GULMARG 2022",
    display: { val: "WINTER / SPORT." },
    tag: "NEW FRONTIER",
    title: "Winter Games launched",
    body: "Skiing, snowboarding, and ice hockey enter the programme. Himalayan athletes get their first national stage."
  },
  {
    year: "2023",
    type: "text",
    title: "Mission 2.0 & Para Games",
    body: "Inclusion expands with adaptive disciplines for athletes with disabilities."
  },
  {
    year: "2026",
    type: "photo",
    gradient: "saffron",
    photoUrl: "https://wavemakersunited.com/wp-content/uploads/2025/07/Copia-di-LA-2028-Video.jpg",
    // eyebrow: "MISSION 3.0",
    display: { val: "LA / 2028." },
    tag: "NOW",
    title: "Road to Los Angeles",
    body: "Identify · Nurture · Excel. 10,000+ athletes supported annually. The programme's mature infrastructure aims at one horizon.",
    active: true
  }
];

const GRADIENTS = {
  navy: 'bg-[linear-gradient(135deg,#1a2942_0%,#0F1A2A_100%)]',
  blue: 'bg-[linear-gradient(135deg,#4a6bb4_0%,#143686_100%)]',
  saffron: 'bg-[linear-gradient(135deg,#db4001_0%,#C44A15_100%)]'
};

const EYEBROW_COLORS = {
  navy: 'text-[#FFB088]',
  blue: 'text-[#C9D3EF]',
  saffron: 'text-[#DB4001]'
};

// --- COMPONENTS ---

const MilestoneCard = ({ m }: { m: Milestone }) => {
  const isPhoto = m.type === 'photo';

  return (
    <article 
      className={cn(
        "bg-surface rounded-[14px] overflow-hidden shadow-theme"
      )}
    >
      <div className={cn(
        "flex flex-col md:grid",
        isPhoto ? "md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr] md:min-h-[160px]" : "grid-cols-1"
      )}>
        {isPhoto && (
          <div 
            className={cn(
              "relative p-5 flex flex-col justify-between min-h-[180px] md:min-h-full",
              m.photoUrl ? "bg-center bg-cover bg-no-repeat" : (m.gradient ? GRADIENTS[m.gradient] : GRADIENTS.navy)
            )}
            style={m.photoUrl ? { backgroundImage: `url(${m.photoUrl})` } : {}}
          >
            {/* Photo Overlay if URL present */}
            {m.photoUrl && (
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,26,42,0.2)] to-[rgba(15,26,42,0.85)] z-0" />
            )}
            
            {/* Tag on mobile (hidden in text side, shows in photo tile top-left) */}
            <div className="flex flex-col gap-2 relative z-10 transition-all">
              {m.tag && (
                <div className={cn(
                  "md:hidden inline-block self-start text-[11px] font-bold tracking-[0.8px] uppercase px-2.5 py-1 rounded-[8px]",
                  m.active ? "bg-accent text-white" : "bg-accent-tint text-accent"
                )}>
                  {m.tag}
                </div>
              )}
              <div className={cn(
                "text-[11px] font-bold tracking-[0.8px] uppercase",
                m.gradient ? EYEBROW_COLORS[m.gradient] : "text-white"
              )}>
                {m.eyebrow}
              </div>
            </div>

            <div className="relative z-10 text-white">
              {m.display?.val && (
                <div className={cn(
                  "font-anton leading-[1] whitespace-pre-line",
                  m.display.val.includes('/') 
                    ? "text-[26px] leading-[1.05] tracking-[-0.2px]" 
                    : "text-[40px] tracking-[-0.3px]"
                )}>
                  {m.display.val.replace('/ ', '\n')}
                </div>
              )}
              {m.display?.caption && (
                <div className={cn(
                  "text-[13px] mt-2",
                  m.gradient ? EYEBROW_COLORS[m.gradient] : "opacity-80"
                )}>
                  {m.display.caption}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col justify-center">
          {m.tag && (
            <div className={cn(
              "self-start text-[11px] font-bold tracking-[0.8px] uppercase px-2.5 py-1 rounded-[8px] mb-3",
              isPhoto ? "hidden md:inline-block" : "inline-block",
              m.active ? "bg-accent text-white" : "bg-accent-tint text-accent"
            )}>
              {m.tag}
            </div>
          )}
          <h2 className={cn(
            "font-bold text-[20px] text-text-primary tracking-tight",
            (!m.tag || (isPhoto && m.tag)) && "mt-0"
          )}>
            {m.title}
          </h2>
          <p className="text-[15px] leading-[1.6] text-text-body mt-2">
            {m.body}
          </p>
        </div>
      </div>
    </article>
  );
};

export const Journey = () => {
  return (
    <div className="bg-page-bg min-h-screen text-text-primary transition-colors duration-300 selection:bg-accent/20">
      <main className="max-w-[940px] mx-auto py-16 px-6 md:px-6 lg:px-20 flex flex-col gap-[48px]">
        {/* HERO SECTION */}
        <section className="flex flex-col gap-3.5">
          <span className="font-bold text-[13px] tracking-[2px] uppercase text-accent font-sans">
            THE JOURNEY
          </span>
          <h1 className="text-[46px] font-georgia font-[200] leading-[1.05] tracking-[-0.8px] max-w-[800px]">
            From a First Edition<br className="hidden lg:block" /> to a National Movement
          </h1>
          <p className="font-sans text-[16px] leading-[1.6] text-text-body max-w-[620px]">
            Eight years. One mission. Sport as a pathway, not a privilege.
          </p>
        </section>

        {/* TIMELINE SECTION */}
        <section className="relative pl-[56px] md:pl-[140px] lg:pl-[200px]">
          {/* Spine Line - Centered on the dots/center-point */}
          <div 
            className="absolute left-[18px] md:left-[70px] lg:left-[100px] top-3 bottom-3 w-[2px] bg-border z-0 -translate-x-[50%]" 
          />

          <div className="flex flex-col gap-[48px]">
            {milestones.map((m, idx) => (
              <React.Fragment key={idx}>
                {/* Phase Grouping Headers */}
                {idx === 0 && (
                  <div className="relative mb-2 -ml-[40px] md:-ml-[70px] lg:-ml-[100px] z-20">
                    <div className="inline-flex items-center gap-3 py-2 px-5 bg-[#FDF4F0] dark:bg-white/5 text-accent rounded-full border border-accent/10 dark:border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-[11px] font-bold tracking-[1.5px] uppercase">
                        Phase 1 
                      </span>
                    </div>
                  </div>
                )}
                {m.year === "2022" && (
                  <div className="relative mt-12 mb-2 -ml-[40px] md:-ml-[70px] lg:-ml-[100px] z-20">
                    <div className="inline-flex items-center gap-3 py-2 px-5 bg-[#FDF4F0] dark:bg-white/5 text-accent rounded-full border border-accent/10 dark:border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-[11px] font-bold tracking-[1.5px] uppercase">
                        Phase 2 
                      </span>
                    </div>
                  </div>
                )}

                <div className="relative group">
                {/* Year Label - Small screens: chip above card. Medium/Large: absolute left. */}
                <time 
                  dateTime={m.year}
                  className={cn(
                    "block md:absolute font-anton whitespace-nowrap transition-colors tracking-[0.5px]",
                    // Desktop/Tablet: absolute positioned to the left of card edge
                    "md:top-2 md:text-right md:text-[28px]",
                    "lg:left-[-200px] lg:w-[80px]",
                    "md:left-[-140px] md:w-[60px]",
                    // Mobile: small chip above card
                    "text-[20px] mb-3 px-3.5 py-1 bg-surface-elevated rounded-lg inline-block md:bg-transparent md:p-0 md:rounded-none md:mb-0",
                    m.active ? "text-accent border border-accent/20 md:border-none" : "text-text-primary border border-border md:border-none"
                  )}
                >
                  {m.year}
                </time>

                {/* Spine Dot - Centered on spine line */}
                <div 
                  className={cn(
                    "absolute top-[14px] z-10 rounded-full box-border -translate-x-[50%]",
                    // Center matches spine
                    "lg:left-[-100px] md:left-[-70px] left-[-38px]", 
                    m.active 
                      ? "w-[14px] h-[14px] bg-accent border-[3px] border-page-bg" 
                      : "w-[12px] h-[12px] bg-surface border-2 border-accent"
                  )}
                />

                <MilestoneCard m={m} />
              </div>
            </React.Fragment>
          ))}
          </div>
        </section>
      </main>
    </div>
  );
};
