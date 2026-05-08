import { Navbar } from "./Navbar";
import { motion, useScroll, useSpring } from "motion/react";
import React, { useEffect } from "react";
import { Phone, Mail, Smartphone, ExternalLink, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { cn } from "../lib/utils";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const [isDark, setIsDark] = React.useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDark();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDark();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Scroll Progress Bar - Fixed to top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <footer className="bg-[#0a1628] dark:bg-[#000B1A] text-white py-[28px] px-0 transition-colors duration-300">
        <div className="container mx-auto px-[32px]">
          {/* HEADER ROW (brand + social icons) */}
          <div className="flex flex-col sm:flex-row justify-between items-center pb-[20px] border-b-[0.5px] border-white/10 mb-[28px] gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://i.ibb.co/pj9RQjGL/Khelo-India-White-Logo.png" 
                alt="Khelo India Logo" 
                className="h-[48px] w-auto"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/55">KHELO INDIA</div>
                <div className="text-[13px] font-medium text-white mt-[2px]">National programme</div>
              </div>
            </div>
            
            <div className="flex items-center gap-[10px]">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "Youtube" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className="w-[32px] h-[32px] rounded-[8px] bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* GRID & LAYOUT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
            {/* COLUMN 1 — QUICK LINKS */}
            <div className="flex flex-col items-start">
              <h3 className="text-[11px] font-medium text-[#db4001] mb-[16px] uppercase tracking-[0.12em]">QUICK LINKS</h3>
              <ul className="flex flex-col gap-[10px]">
                {[
                  "Home", "About Khelo India", "Dashboard", 
                  "Sports infrastructure", "Athlete registration", "Coach registration",
                  "Media gallery", "Documents & circulars", "Tender notices",
                  "RTI portal", "Grievance portal"
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[12px] text-white/75 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2 — OUR PROGRAMMES */}
            <div className="flex flex-col items-start">
              <h3 className="text-[11px] font-medium text-[#db4001] mb-[16px] uppercase tracking-[0.12em]">OUR PROGRAMMES</h3>
              <ul className="flex flex-col gap-[10px]">
                {[
                  { name: "Khelo India School Games", acronym: "KISG" },
                  { name: "Khelo India University Games", acronym: "KIUG" },
                  { name: "Khelo India Winter Games", acronym: "" },
                  { name: "Khelo India Rural Games", acronym: "KIRG" },
                  { name: "Khelo India Athlete Programme", acronym: "KIA" },
                  { name: "Sports infrastructure", acronym: "KISE" },
                  { name: "Sports Science Network", acronym: "" },
                  { name: "Para Sports Programme", acronym: "" },
                  { name: "Fit India Movement", acronym: "" },
                  { name: "Khel Setu portal", acronym: "" }
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-[12px] text-white/75 hover:text-white transition-colors items-baseline">
                      {item.name} {item.acronym && <span className="text-[11px] text-white/40 ml-1">({item.acronym})</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3 — RESOURCES */}
            <div className="flex flex-col items-start">
              <h3 className="text-[11px] font-medium text-[#db4001] mb-[16px] uppercase tracking-[0.12em]">RESOURCES</h3>
              <ul className="flex flex-col gap-[10px]">
                {[
                  "Annual reports", "Policy documents", "Sports Code of India",
                  "Anti-doping guidelines", "Scholarship guidelines",
                  "Selection criteria", "Press releases", "Photo gallery",
                  "Video gallery", "Feedback & suggestions"
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[12px] text-white/75 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 4 — CONTACT US */}
            <div className="flex flex-col items-start">
              <h3 className="text-[11px] font-medium text-[#db4001] mb-[16px] uppercase tracking-[0.12em]">CONTACT US</h3>
              <div className="text-[12px] text-white/75 leading-[1.6] mb-[14px]">
                Sports Authority of India<br />
                Jawaharlal Nehru Stadium Complex<br />
                Lodhi Road, New Delhi 110003
              </div>
              
              <div className="flex flex-col gap-[6px] mb-[24px]">
                <a href="tel:+911124369033" className="text-[12px] text-white/75 hover:text-white transition-colors">011-24369033</a>
                <a href="mailto:kheloindia@sai.gov.in" className="text-[12px] text-white/75 hover:text-white transition-colors">kheloindia@sai.gov.in</a>
              </div>

              <div className="flex flex-col gap-[12px] w-full max-w-[180px]">
                <button className="bg-white/10 rounded-[8px] px-[16px] py-[10px] flex items-center gap-[12px] hover:bg-white/20 transition-all text-left">
                  <Smartphone size={20} className="text-white/60" />
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Get it on</div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-white leading-none">App Store</div>
                  </div>
                </button>
                <button className="bg-white/10 rounded-[8px] px-[16px] py-[10px] flex items-center gap-[12px] hover:bg-white/20 transition-all text-left">
                  <Smartphone size={20} className="text-white/60" />
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Available on</div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-white leading-none">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-[48px] pt-[20px] border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40">
            <div>© 2026 Khelo India. Government of India. All Rights Reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
