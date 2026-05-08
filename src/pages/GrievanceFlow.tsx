import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  User, 
  Users, 
  Medal, 
  Building2, 
  Globe, 
  UserX, 
  Info, 
  Wallet, 
  Calendar, 
  FileText, 
  Upload, 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Copy, 
  Download,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- TYPES & CONSTANTS ---

interface FileData {
  name: string;
  size: string;
}

interface FormData {
  role: string | null;
  category: string | null;
  subject: string;
  incidentDate: string;
  description: string;
  attachments: FileData[];
  name: string;
  athleteId: string;
  mobile: string;
  mobileVerified: boolean;
  email: string;
  state: string;
  city: string;
  consents: {
    dataHandling: boolean;
    accuracy: boolean;
    slaUnderstanding: boolean;
  };
}

const INITIAL_DATA: FormData = {
  role: null,
  category: null,
  subject: '',
  incidentDate: '',
  description: '',
  attachments: [],
  name: '',
  athleteId: '',
  mobile: '',
  mobileVerified: false,
  email: '',
  state: '',
  city: '',
  consents: {
    dataHandling: false,
    accuracy: false,
    slaUnderstanding: false,
  }
};

const ROLES = [
  { id: 'athlete', title: 'Athlete', icon: User, subtitle: 'Registered Khelo India athlete.' },
  { id: 'parent', title: 'Parent / guardian', icon: Users, subtitle: 'Filing on behalf of a minor.' },
  { id: 'coach', title: 'Coach / official', icon: Medal, subtitle: 'Certified coach or team manager.' },
  { id: 'institution', title: 'Institution', icon: Building2, subtitle: 'School, academy, or federation.' },
  { id: 'public', title: 'General public', icon: Globe, subtitle: 'Citizen or other stakeholder.' },
  { id: 'anonymous', title: 'File anonymously', icon: UserX, subtitle: 'No identity — no status updates.' },
];

const CATEGORIES = [
  { id: 'scholarship', title: 'Scholarship & stipends', icon: Wallet, subtitle: 'Payments, refunds, eligibility' },
  { id: 'training', title: 'Training & coaching', icon: Medal, subtitle: 'Coaches, facilities, programs' },
  { id: 'events', title: 'Events & registration', icon: Calendar, subtitle: 'Selection, logistics, disputes' },
  { id: 'documents', title: 'Documents & certificates', icon: FileText, subtitle: 'IDs, approvals, records' },
];

const FAQS: Record<string, Array<{ q: string; a: string }>> = {
  scholarship: [
    { q: "Payment delayed by less than 30 days?", a: "Most Q3 payments are processing until May 15." },
    { q: "Bank details changed recently?", a: "Updates require 14-day re-verification window." }
  ],
  training: [
    { q: "Facility unavailable during weekends?", a: "Weekly maintenance usually occurs on the last Sunday of each month." },
    { q: "Coach not present for scheduled session?", a: "Check the central register for approved leave notices." }
  ],
  events: [
    { q: "Selection list not published?", a: "Final lists are usually out 14 days before the event start date." },
    { q: "Registration link inactive?", a: "Portals close strictly at 11:59 PM on the deadline day." }
  ],
  documents: [
    { q: "Certificate contains spelling error?", a: "Use the 'Correction Request' tool in your athlete dashboard." },
    { q: "Digital ID not loading?", a: "Clear browser cache or try the official Khel Setu app." }
  ]
};

const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

// --- COMPONENTS ---

export const GrievanceFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem('khelo-grievance-draft');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(60);
  const [trackingId, setTrackingId] = useState('');

  // Auto-save
  useEffect(() => {
    if (step < 6) {
      localStorage.setItem('khelo-grievance-draft', JSON.stringify(formData));
    }
  }, [formData, step]);

  // History sync
  useEffect(() => {
    if (step === 6) {
      window.history.replaceState(null, '', location.pathname);
      localStorage.removeItem('khelo-grievance-draft');
    }
  }, [step, location.pathname]);

  // Timer for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVerifying && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isVerifying, resendTimer]);

  // Validation
  const isStepValid = useMemo(() => {
    const isAnonymous = formData.role === 'anonymous';
    switch (step) {
      case 1: return !!formData.role;
      case 2: return !!formData.category;
      case 3: return formData.subject.length > 0 && !!formData.incidentDate && formData.description.length > 20;
      case 4: 
        if (isAnonymous) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        return (
          !!formData.name && 
          formData.mobile.length >= 10 && 
          formData.mobileVerified && 
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
          !!formData.state &&
          !!formData.city &&
          formData.consents.dataHandling
        );
      case 5: return formData.consents.accuracy && formData.consents.slaUnderstanding;
      default: return true;
    }
  }, [step, formData]);

  const handleNext = () => {
    if (step === 5) {
      // Finalize
      const id = `KHI-2026-0421-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setTrackingId(id);
      setStep(6);
      window.scrollTo(0, 0);
    } else {
      setStep(s => s + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step === 1) navigate('/contact/raise-concern');
    else setStep(s => s - 1);
    window.scrollTo(0, 0);
  };

  const updateData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const getSLA = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const stepLabels = ["Your role", "Category", "Details", "Contact", "Review", "Done"];

  return (
    <div className="min-h-screen bg-page-bg py-12 px-10 transition-colors duration-300 font-sans">
      <div className="max-w-[820px] mx-auto flex flex-col gap-6">
        
        {/* SHELL - 1. Breadcrumbs */}
        <div className="flex items-center gap-2 h-4">
          <button 
            onClick={handleBack}
            className={cn(
              "text-accent text-[14px] font-bold hover:opacity-80 transition-opacity flex items-center gap-1",
              step === 6 && "hidden"
            )}
          >
            <ArrowLeft size={14} /> BACK
          </button>
          {step > 1 && step < 6 && (
            <>
              <span className="text-text-meta text-[14px]">|</span>
              <span className="text-text-meta text-[14px]">
                {ROLES.find(r => r.id === formData.role)?.title}
                {formData.category && ` · ${CATEGORIES.find(c => c.id === formData.category)?.title}`}
                {formData.subject && ` · ${formData.subject.length > 20 ? formData.subject.substring(0, 20) + '...' : formData.subject}`}
              </span>
            </>
          )}
        </div>

        {/* SHELL - 2. Progress Bar */}
        <div className="flex gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={6}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 h-[3px] rounded-[2px] transition-colors duration-500",
                step === 6 ? "bg-success" : (i + 1 <= step ? "bg-accent" : "bg-border")
              )}
            />
          ))}
        </div>

        {/* SHELL - 3. Progress Labels */}
        <div className="flex justify-between">
          {stepLabels.map((lbl, i) => (
            <div key={i} className="w-[16.6%] text-center first:text-left last:text-right">
              <span className={cn(
                "text-[13px] transition-all",
                i + 1 === step ? "font-bold text-accent" : "font-normal text-text-meta"
              )}>
                {i + 1}. {lbl}
              </span>
            </div>
          ))}
        </div>

        {/* SHELL - 4. Title Block */}
        <div className={cn("flex flex-col gap-1.5", step === 6 && "hidden")}>
          <span className="text-accent text-[13px] font-bold tracking-[1.5px] uppercase">
            STEP {step} OF 6
          </span>
          <h1 className="text-text-primary text-[30px] font-semibold tracking-[-0.3px] leading-[1.2]">
            {step === 1 && "Who are you filing as?"}
            {step === 2 && "What's the issue about?"}
            {step === 3 && "Tell us what happened"}
            {step === 4 && "Your contact details"}
            {step === 5 && "Review before submitting"}
          </h1>
          <p className="text-text-body text-[15px] leading-[1.6]">
            {step === 1 && "This helps us route your grievance to the right officer. Your role also affects which categories and fields you'll see."}
            {step === 2 && "Pick the closest category. We'll show relevant self-serve answers first — you can still file if they don't help."}
            {step === 3 && "The more context you give us, the faster the officer can investigate."}
            {step === 4 && "We'll send you the tracking ID, acknowledgement, and resolution here. Your mobile number will be verified via OTP."}
            {step === 5 && "Check that everything is correct. You can't edit after submission — you'd need to add a follow-up."}
          </p>
        </div>

        {/* --- STEP CONTENT --- */}
        <div className="flex flex-col gap-6">
          
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const isSelected = formData.role === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => updateData({ role: r.id })}
                      className={cn(
                        "bg-surface rounded-lg p-[18px] border text-left flex flex-col gap-2.5 transition-all",
                        isSelected ? "border-2 border-accent" : "border-border hover:border-accent/40"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        isSelected ? "bg-accent-tint" : "bg-page-bg dark:bg-surface-elevated"
                      )}>
                        <Icon size={18} className={isSelected ? "text-accent" : "text-text-primary"} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-text-primary text-[15px] font-bold">{r.title}</span>
                        <span className="text-text-body text-[13px] leading-[1.5]">{r.subtitle}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {formData.role === 'anonymous' && (
                <div className="bg-accent-tint rounded-lg p-[12px] px-[14px] flex gap-[10px]">
                  <Info size={14} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-text-primary text-[13px] leading-[1.5]">
                    <span className="font-bold">Filing anonymously?</span> You won't receive a tracking ID, status updates, or responses. For accountability and faster resolution, we recommend identified filing.
                  </p>
                </div>
              )}
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CATEGORIES.map((c) => {
                  const Icon = c.icon;
                  const isSelected = formData.category === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => updateData({ category: c.id })}
                      className={cn(
                        "bg-surface rounded-lg py-[14px] px-[16px] border text-left flex items-center gap-3 transition-all",
                        isSelected ? "border-2 border-accent bg-accent-tint" : "border-border hover:border-accent/40"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        isSelected ? "bg-white" : "bg-page-bg dark:bg-surface-elevated"
                      )}>
                        <Icon size={16} className={isSelected ? "text-accent" : "text-text-primary"} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-text-primary text-[15px] font-bold">{c.title}</span>
                        <span className="text-text-body text-[13px]">{c.subtitle}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {formData.category && (
                <div className="bg-accent-tint rounded-lg py-[18px] px-[20px] flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
                  <span className="text-accent text-[13px] font-bold tracking-[1.2px] uppercase">
                    BEFORE YOU FILE — COMMON {formData.category.toUpperCase()} FIXES
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {FAQS[formData.category].map((f, i) => (
                      <div key={i} className="bg-surface rounded-lg py-[10px] px-[12px] flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-text-primary text-[14px] font-bold">{f.q}</span>
                          <span className="text-text-body text-[13px] leading-[1.5]">{f.a}</span>
                        </div>
                        <button className="text-accent text-[12px] font-bold tracking-[0.5px] shrink-0 whitespace-nowrap">READ →</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="bg-surface rounded-lg p-[22px] border border-border flex flex-col gap-5 shadow-theme">
              <div className="flex flex-col gap-1.5">
                <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">SUBJECT *</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={e => updateData({ subject: e.target.value })}
                  placeholder="e.g., Q3 2026 scholarship not received"
                  className="bg-surface border border-border rounded-lg py-2.5 px-3 text-[15px] focus:ring-2 focus:ring-accent focus:outline-none transition-all placeholder:text-text-meta"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">WHEN DID IT HAPPEN *</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.incidentDate}
                    onChange={e => updateData({ incidentDate: e.target.value })}
                    className="w-full bg-surface border border-border rounded-lg py-2.5 px-3 pr-10 text-[15px] focus:ring-2 focus:ring-accent focus:outline-none transition-all"
                  />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-meta pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-end">
                  <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">DESCRIBE THE ISSUE *</label>
                  <button className="text-accent text-[12px] font-bold tracking-[0.5px] mb-1.5">HELP ME STRUCTURE THIS</button>
                </div>
                <textarea 
                  value={formData.description}
                  onChange={e => updateData({ description: e.target.value })}
                  className="bg-surface border border-border rounded-lg py-2.5 px-3 text-[15px] leading-[1.6] min-h-[120px] focus:ring-2 focus:ring-accent focus:outline-none transition-all"
                />
                <span className="self-end text-text-meta text-[13px]">{formData.description.length} / 1000 characters</span>
              </div>

              <div className="bg-page-bg rounded-lg p-[12px] px-[14px] flex gap-[10px]">
                <Info size={14} className="text-accent shrink-0 mt-0.5" />
                <p className="text-text-body text-[13px] leading-[1.5]">
                  <span className="font-bold text-text-primary">Try to cover:</span> When did it happen? Who was involved? What did you do to resolve it? What outcome do you want?
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">SUPPORTING DOCUMENTS</label>
                <div className="flex flex-wrap gap-2 mb-1.5">
                  {formData.attachments.map((file, i) => (
                    <div key={i} className="bg-accent-tint rounded-lg py-2 px-2.5 flex items-center gap-1.5">
                      <FileText size={11} className="text-accent" />
                      <span className="text-accent text-[13px] font-medium max-w-[120px] truncate">{file.name}</span>
                      <span className="text-text-meta text-[13px]">{file.size}</span>
                      <button onClick={() => updateData({ attachments: formData.attachments.filter((_, idx) => idx !== i) })} className="hover:text-accent transition-colors">
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    const demoFile = { name: `Upload_${formData.attachments.length + 1}.pdf`, size: '1.2MB' };
                    if (formData.attachments.length < 3) updateData({ attachments: [...formData.attachments, demoFile] });
                  }}
                  className="bg-surface border border-dashed border-border rounded-lg py-4 px-3 flex flex-col items-center gap-1.5 hover:border-accent/40 transition-colors"
                >
                  <Upload size={14} className="text-text-meta" />
                  <span className="text-text-body text-[13px]">Drop files here — PDF or JPG up to 10MB · max 3 files</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="bg-surface rounded-lg p-[22px] border border-border flex flex-col gap-5 shadow-theme">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.role !== 'anonymous' && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">FULL NAME *</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => updateData({ name: e.target.value })}
                        className="bg-surface border border-border rounded-lg py-2.5 px-3 text-[15px] focus:ring-2 focus:ring-accent focus:outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">ATHLETE ID</label>
                      <input 
                        type="text" 
                        value={formData.athleteId}
                        onChange={e => updateData({ athleteId: e.target.value })}
                        className="bg-surface border border-border rounded-lg py-2.5 px-3 text-[15px] focus:ring-2 focus:ring-accent focus:outline-none transition-all"
                      />
                    </div>
                  </>
                )}
              </div>

              {formData.role !== 'anonymous' && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">MOBILE NUMBER *</label>
                    <button 
                      onClick={() => !formData.mobileVerified && setIsVerifying(true)}
                      className={cn(
                        "text-[12px] font-bold tracking-[0.5px] mb-1.5 flex items-center gap-1",
                        formData.mobileVerified ? "text-success cursor-default" : "text-accent"
                      )}
                    >
                      {formData.mobileVerified ? <><Check size={10} /> VERIFIED</> : "VERIFY NOW →"}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-page-bg dark:bg-surface-elevated px-3 py-2.5 rounded-lg text-[15px] text-text-primary font-medium">+91</div>
                    <input 
                      type="tel" 
                      value={formData.mobile}
                      onChange={e => updateData({ mobile: e.target.value.replace(/\D/g, '').slice(0, 10), mobileVerified: false })}
                      className="flex-1 bg-surface border border-border rounded-lg py-2.5 px-3 text-[15px] focus:ring-2 focus:ring-accent focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">EMAIL *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => updateData({ email: e.target.value })}
                  placeholder={formData.role === 'anonymous' ? "We'll use this to send you the tracking ID." : ""}
                  className="bg-surface border border-border rounded-lg py-2.5 px-3 text-[15px] focus:ring-2 focus:ring-accent focus:outline-none transition-all"
                />
              </div>

              {formData.role !== 'anonymous' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">STATE *</label>
                    <div className="relative">
                      <select 
                        value={formData.state}
                        onChange={e => updateData({ state: e.target.value })}
                        className="w-full appearance-none bg-surface border border-border rounded-lg py-2.5 px-3 pr-10 text-[15px] focus:ring-2 focus:ring-accent focus:outline-none transition-all outline-none"
                      >
                        <option value="">Select State</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-meta pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-text-primary text-[12px] font-bold tracking-[0.5px] uppercase">CITY / DISTRICT *</label>
                    <input 
                      type="text" 
                      value={formData.city}
                      onChange={e => updateData({ city: e.target.value })}
                      className="bg-surface border border-border rounded-lg py-2.5 px-3 text-[15px] focus:ring-2 focus:ring-accent focus:outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="bg-page-bg dark:bg-surface-elevated rounded-lg p-[12px] px-[14px] flex gap-[14px] items-start">
                <input 
                  type="checkbox" 
                  id="dataHandling"
                  checked={formData.consents.dataHandling}
                  onChange={e => updateData({ consents: { ...formData.consents, dataHandling: e.target.checked } })}
                  className="mt-0.5 w-[16px] h-[16px] rounded-[4px] accent-accent border-border"
                />
                <label htmlFor="dataHandling" className="text-text-primary text-[13px] leading-[1.5]">
                  I consent to the processing of my personal data for the purpose of this grievance, in accordance with the <button className="text-accent font-bold">Data Handling Policy</button>.
                </label>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="flex flex-col gap-5">
              <div className="bg-surface rounded-lg p-[22px] border border-border flex flex-col gap-5 shadow-theme">
                <div className="flex justify-between items-center">
                  <span className="text-text-meta text-[12px] font-bold tracking-[1.2px] uppercase">SUBMISSION SUMMARY</span>
                  <button onClick={() => setStep(3)} className="text-accent text-[13px] font-bold">EDIT →</button>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { l: 'Filing as', v: ROLES.find(r => r.id === formData.role)?.title },
                    { l: 'Category', v: CATEGORIES.find(c => c.id === formData.category)?.title },
                    { l: 'Subject', v: formData.subject },
                    { l: 'When it happened', v: new Date(formData.incidentDate).toLocaleDateString('en-IN') },
                    { l: 'Description', v: formData.description, full: true },
                    { l: 'Attachments', v: formData.attachments.length > 0 ? formData.attachments.map(f => f.name).join(', ') : 'None' },
                    ...(formData.role !== 'anonymous' ? [
                      { l: 'Filed by', v: `${formData.name}${formData.athleteId ? ` · ${formData.athleteId}` : ''}` },
                      { l: 'Mobile', v: `+91 ${formData.mobile.replace(/(\d{5})(\d{5})/, '$1 $2')} · VERIFIED`, success: true },
                      { l: 'Email', v: formData.email },
                    ] : [
                      { l: 'Filed by', v: <span className="text-text-meta italic">Anonymous</span> },
                    ])
                  ].map((row, i) => (
                    <div key={i} className="flex py-2">
                      <span className="w-[160px] shrink-0 text-text-body text-[14px] py-1">{row.l}</span>
                      <div className={cn(
                        "flex-1 text-[14px] font-medium py-1 leading-[1.5]",
                        row.success ? "text-success" : "text-text-primary"
                      )}>
                        {row.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface rounded-lg p-[18px] px-[22px] border border-border flex flex-col gap-4 shadow-theme">
                <div className="flex gap-[14px] items-start">
                  <input 
                    type="checkbox" 
                    id="accuracy"
                    checked={formData.consents.accuracy}
                    onChange={e => updateData({ consents: { ...formData.consents, accuracy: e.target.checked } })}
                    className="mt-0.5 w-[16px] h-[16px] rounded-[4px] accent-accent border-border"
                  />
                  <label htmlFor="accuracy" className="text-text-primary text-[14px] leading-[1.5]">
                    All information provided is accurate to the best of my knowledge.
                  </label>
                </div>
                <div className="flex gap-[14px] items-start">
                  <input 
                    type="checkbox" 
                    id="sla"
                    checked={formData.consents.slaUnderstanding}
                    onChange={e => updateData({ consents: { ...formData.consents, slaUnderstanding: e.target.checked } })}
                    className="mt-0.5 w-[16px] h-[16px] rounded-[4px] accent-accent border-border"
                  />
                  <label htmlFor="sla" className="text-text-primary text-[14px] leading-[1.5]">
                    I understand this grievance will be acknowledged within 3 working days and resolved within 21 working days of acknowledgement.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="flex flex-col gap-6 items-center">
              <div className="max-w-[520px] text-center flex flex-col items-center gap-4 py-4">
                <div className="w-[64px] h-[64px] rounded-full bg-success-bg flex items-center justify-center mb-2">
                  <Check size={32} className="text-success" strokeWidth={2.5} />
                </div>
                <h1 className="text-text-primary text-[32px] font-semibold tracking-[-0.3px]">Grievance submitted</h1>
                <p className="text-text-body text-[16px] leading-[1.6]">
                  We've received your submission. You'll get an acknowledgement by SMS and email within 3 working days.
                </p>
              </div>

              {formData.role !== 'anonymous' ? (
                <>
                  <div className="w-full bg-surface rounded-lg p-6 border border-border flex flex-col items-center gap-3 shadow-theme">
                    <span className="text-text-meta text-[12px] font-bold tracking-[1.2px] uppercase text-center">YOUR TRACKING ID</span>
                    <span className="text-text-primary text-[30px] font-bold tracking-[2px] font-mono">{trackingId}</span>
                    <button className="bg-accent-tint rounded-lg py-2 px-3.5 flex items-center gap-2 hover:bg-accent hover:text-white group transition-colors">
                      <Copy size={14} className="text-accent group-hover:text-white" />
                      <span className="text-accent group-hover:text-white text-[13px] font-bold tracking-[0.5px]">COPY TO CLIPBOARD</span>
                    </button>
                    <span className="text-text-meta text-[13px] mt-2">Save this ID. You'll need it to track status or add follow-ups.</span>
                  </div>

                  <div className="w-full bg-surface rounded-lg p-6 px-[22px] border border-border flex flex-col gap-6 shadow-theme">
                    <span className="text-text-meta text-[12px] font-bold tracking-[1.2px] uppercase">WHAT HAPPENS NEXT</span>
                    <div className="flex flex-col">
                      {[
                        { t: 'Submitted', c: `Just now · ${new Date().toLocaleDateString('en-IN')} ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`, status: 'done' },
                        { t: 'Acknowledgement', c: `Expected by ${getSLA(3)} — confirmation sent by SMS and email.`, status: 'active', num: '2' },
                        { t: 'Officer reviews', c: `Expected by ${getSLA(7)}.`, status: 'upcoming', num: '3' },
                        { t: 'Resolution', c: `Expected by ${getSLA(21)} — within 21 working days.`, status: 'upcoming', num: '4' }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4.5 mb-6 last:mb-0">
                          <div className={cn(
                            "w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 mr-4",
                            item.status === 'done' ? "bg-success" : (item.status === 'active' ? "bg-accent-tint border-2 border-accent" : "bg-surface border-[1.5px] border-border")
                          )}>
                            {item.status === 'done' ? <Check size={14} className="text-white" /> : <span className={cn("text-[14px] font-bold", item.status === 'active' ? "text-accent" : "text-text-meta")}>{item.num}</span>}
                          </div>
                          <div className="flex flex-col">
                            <span className={cn("text-[15px] font-bold", item.status === 'upcoming' ? "text-text-body font-medium" : "text-text-primary")}>{item.t}</span>
                            <span className="text-text-meta text-[13px]">{item.c}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button className="bg-surface rounded-lg border border-border py-4 px-4 flex items-center justify-center gap-1.5 font-bold text-text-primary text-[13px] tracking-[0.5px] hover:bg-page-bg transition-colors uppercase">
                      <Download size={14} className="text-text-primary" /> DOWNLOAD RECEIPT
                    </button>
                    <Link to="/dashboard" className="bg-accent rounded-lg py-4 px-4 flex items-center justify-center gap-1.5 font-bold text-white text-[13px] tracking-[0.5px] hover:opacity-90 transition-opacity uppercase">
                      TRACK THIS GRIEVANCE <ArrowRight size={14} />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-text-primary text-[15px] leading-[1.6]">
                    Your submission has been logged anonymously. For accountability and faster resolution, consider filing with your identity next time.
                  </p>
                  <Link to="/contact/raise-concern" className="mt-4 inline-block text-accent font-bold text-[15px] underline">Back to grievance landing page</Link>
                </div>
              )}
            </div>
          )}

          {/* --- BUTTON BAR --- */}
          {step < 6 && (
            <div className={cn("flex justify-between items-center mt-4", step === 1 && "justify-end")}>
              {step > 1 && (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleBack}
                    className="bg-surface border border-border rounded-lg py-2.5 px-6 font-bold text-text-primary text-[13px] tracking-[0.5px] hover:bg-page-bg transition-colors"
                  >
                    ← BACK
                  </button>
                  {step === 2 && (
                    <p className="hidden md:block text-text-meta text-[13px]">
                      These don't match my situation — <span className="text-text-primary font-semibold">I still want to file</span>
                    </p>
                  )}
                </div>
              )}
              <button 
                disabled={!isStepValid}
                onClick={handleNext}
                className={cn(
                  "bg-accent rounded-lg py-2.5 px-6 font-bold text-white text-[13px] tracking-[0.5px] transition-opacity",
                  !isStepValid ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                )}
              >
                {step === 4 ? "REVIEW →" : (step === 5 ? "SUBMIT GRIEVANCE →" : "CONTINUE →")}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* --- OTP MODAL --- */}
      <AnimatePresence>
        {isVerifying && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsVerifying(false)}
              className="absolute inset-0 bg-navy/60 dark:bg-black/70" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-surface rounded-lg w-full max-w-[400px] p-[28px] flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-text-primary text-[20px] font-semibold">Enter verification code</h2>
                <p className="text-text-body text-[15px] leading-[1.6]">We sent a 6-digit code to +91 {formData.mobile.substring(0, 5)} {formData.mobile.substring(5)}</p>
              </div>

              <div className="flex justify-between gap-2">
                {otp.map((val, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={e => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value.replace(/\D/g, '');
                      setOtp(newOtp);
                      if (e.target.value && i < 5) {
                        const next = e.target.nextElementSibling as HTMLInputElement;
                        next?.focus();
                      }
                    }}
                    className="w-[44px] h-[52px] bg-surface border border-border rounded-lg text-center text-[18px] font-bold text-text-primary focus:ring-2 focus:ring-accent focus:outline-none transition-all"
                  />
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-text-meta text-[13px] text-center">Resend code in 0:{resendTimer.toString().padStart(2, '0')}</p>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      updateData({ mobileVerified: true });
                      setIsVerifying(false);
                      setOtp(['', '', '', '', '', '']);
                    }}
                    className="w-full bg-accent text-white py-3 rounded-lg font-bold text-[14px] tracking-[1px] uppercase hover:opacity-90 transition-opacity"
                  >
                    VERIFY
                  </button>
                  <button 
                    onClick={() => setIsVerifying(false)}
                    className="w-full bg-transparent text-text-body py-2 rounded-lg font-bold text-[13px] tracking-[1px] uppercase hover:text-text-primary transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
