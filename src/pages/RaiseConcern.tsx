import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Medal, Calendar, ArrowUpRight, ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  {
    title: "Scholarship & stipends",
    description: "Payment delays, eligibility disputes, refund requests, and disbursement issues.",
    icon: Wallet
  },
  {
    title: "Training & coaching",
    description: "Coach conduct, facility access, program scheduling, and certification concerns.",
    icon: Medal
  },
  {
    title: "Events & registration",
    description: "Selection criteria, logistics, post-event concerns, and tournament disputes.",
    icon: Calendar
  }
];

const STEPS = [
  {
    num: "01",
    title: "You file",
    body: "Submit via the online form. Receive a 12-digit tracking ID."
  },
  {
    num: "02",
    title: "We acknowledge",
    body: "Confirmation sent by SMS and email within 3 working days."
  },
  {
    num: "03",
    title: "Officer reviews",
    body: "Assigned to the relevant department. Investigation begins."
  },
  {
    num: "04",
    title: "Resolved",
    body: "Written response within 21 working days of acknowledgement."
  }
];

const ESCALATIONS = [
  {
    title: "CPGRAMS",
    subtitle: "Central grievance portal",
    href: "https://pgportal.gov.in"
  },
  {
    title: "RTI Portal",
    subtitle: "Information requests",
    href: "https://rtionline.gov.in"
  },
  {
    title: "NADA India",
    subtitle: "Anti-doping concerns",
    href: "https://nadaindia.yas.nic.in"
  }
];

export const RaiseConcern = () => {
  const [trackingId, setTrackingId] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackingId.trim()) {
      setError('Please enter your tracking ID');
      return;
    }
    setError('');
    navigate(`/track/${trackingId.trim().toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-page-bg transition-colors duration-300 font-sans">
      <div className="max-w-[1440px] mx-auto px-8 md:px-[60px] lg:px-[120px] py-12 md:py-20 flex flex-col gap-12">
        
        {/* 1. HERO / INTRO */}
        <section className="flex flex-col gap-2.5 max-w-[720px]">
          <span className="text-[13px] font-bold tracking-[2px] uppercase text-accent">
            REDRESSAL MECHANISM
          </span>
          <h1 className="text-[46px] font-georgia font-[200] tracking-[-0.5px] leading-[1.2] text-text-primary">
            Understand before you file
          </h1>
          <p className="text-[16px] leading-[1.6] text-text-body">
            Grievances are addressed within a defined scope. Knowing what qualifies — and what the process looks like — helps you get the right resolution faster.
          </p>
        </section>

        {/* 2. CATEGORY GRID */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[12px] font-bold tracking-[1.4px] uppercase text-text-meta">
            WHAT KINDS OF ISSUES WE HANDLE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <div 
                key={idx}
                className="bg-surface border border-border rounded-[14px] p-6 flex flex-col gap-3 shadow-theme transition-all"
              >
                <div className="w-12 h-12 rounded-[10px] bg-accent-tint flex items-center justify-center shrink-0">
                  <cat.icon className="w-6 h-6 text-accent" strokeWidth={2} />
                </div>
                <h3 className="text-[16px] font-bold text-text-primary">
                  {cat.title}
                </h3>
                <p className="text-[13px] leading-[1.6] text-text-body">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PROCESS TIMELINE */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[12px] font-bold tracking-[1.4px] uppercase text-text-meta">
            HOW THE PROCESS WORKS
          </h2>
          <div className="bg-surface border border-border rounded-[14px] p-7 md:py-[28px] md:px-[32px] shadow-theme transition-all">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6 lg:gap-6">
              {STEPS.map((step, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <span className="text-[28px] lg:text-[32px] font-bold tracking-[-1px] leading-none text-accent">
                    {step.num}
                  </span>
                  <div className="h-1" /> {/* 4px vertical spacer */}
                  <h3 className="text-[14px] font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-text-body">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CTA BANNER */}
        <section className="bg-accent-tint rounded-[14px] p-6 md:py-8 md:px-8 flex flex-col gap-8 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-[18px] md:text-[20px] font-bold text-text-primary">
                Ready to file a grievance?
              </h3>
              <p className="text-[13px] md:text-[14px] text-text-body">
                Start your submission below. Takes about 5 minutes. You'll receive a tracking ID as soon as you submit.
              </p>
            </div>
            <Link 
              to="/grievance/new"
              className="bg-accent hover:bg-accent/90 text-white transition-all rounded-[10px] py-4 px-8 flex items-center justify-center gap-2.5 shrink-0 group"
            >
              <span className="text-[13px] font-bold tracking-[1.5px] uppercase">
                START FILING
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
          </div>

          {/* New Tracking Feature */}
          <div className="flex flex-col gap-6 pt-2">
            {/* Divider */}
            <div className="h-[1px] w-full bg-accent/20" />
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="shrink-0">
                <span className="text-[14px] font-semibold text-text-primary">
                  Already filed?
                </span>
              </div>
              
              <form 
                onSubmit={handleTrack}
                className="flex-1 flex flex-col gap-2"
              >
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <div className="relative flex-1">
                    <input 
                      type="text"
                      value={trackingId}
                      onChange={(e) => {
                        setTrackingId(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter tracking ID (e.g. GRV2026XXXXX)"
                      className={cn(
                        "w-full h-11 px-4 bg-white border rounded-[8px] text-[14px] focus:outline-none focus:ring-2 transition-all",
                        error 
                          ? "border-red-500 focus:ring-red-200" 
                          : "border-accent/20 focus:border-accent focus:ring-accent/10"
                      )}
                    />
                    {error && (
                      <span className="absolute -bottom-5 left-0 text-[11px] font-medium text-red-500">
                        {error}
                      </span>
                    )}
                  </div>
                  <button 
                    type="submit"
                    className="h-11 px-8 bg-white border border-[#EEF0F3] text-[#293F54] font-bold text-[12.8px] tracking-wide uppercase rounded-[8px] hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shrink-0 group"
                  >
                    Track <ArrowRight className="w-4 h-4 text-[#db4001] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* 5. ESCALATION LADDER */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[12px] font-bold tracking-[1.4px] uppercase text-text-meta">
            IF YOUR ISSUE IS ELSEWHERE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ESCALATIONS.map((esc, idx) => (
              <a 
                key={idx}
                href={esc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${esc.title} — ${esc.subtitle} (opens in new tab)`}
                className="bg-surface border border-border hover:border-accent/30 rounded-[14px] py-[18px] px-5 flex items-center justify-between gap-3 shadow-theme transition-all group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-[14px] font-bold text-text-primary">
                    {esc.title}
                  </h3>
                  <p className="text-[12px] text-text-meta">
                    {esc.subtitle}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-accent shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
