import { SlantedSection, PowerButton } from "../components/DesignSystem";
import { motion } from "motion/react";
import { 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  Building2, 
  Map, 
  Trophy, 
  Users, 
  Dumbbell, 
  Heart, 
  Cpu,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const Mission = () => {
  const verticals = [
    { title: "Sports infrastructure for medal strategy", icon: Building2 },
    { title: "Strengthening strategic sports assets", icon: Shield },
    { title: "State action plan for sports infrastructure development", icon: Map },
    { title: "Sports competitions & leagues", icon: Trophy },
    { title: "Talent identification and development", icon: Target },
    { title: "Coach & support staff development", icon: Users },
    { title: "Khelo India training facilities", icon: Dumbbell },
    { title: "Fit India movement", icon: Heart },
    { title: "Sports technology", icon: Cpu },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 power-slant bg-primary" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-primary text-white px-4 py-1 font-display font-bold uppercase text-xs tracking-widest mb-6 slant-edge">
              <span className="inline-block transform skew-x-[10deg]">Visionary Focus</span>
            </div>
            <h1 className="text-6xl text-white mb-6">KHELO INDIA MISSION 3.0</h1>
            <p className="text-xl text-gray-400">
              Transforming India into a global sporting powerhouse through technology, inclusivity, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Pillars Restored */}
      <section className="py-24 bg-white dark:bg-[#141C2B]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {/* Talent ID */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[#F4F5F7] dark:bg-white/5 flex items-center justify-center rounded-[4px]">
                <Target className="text-[#db4001]" size={32} />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-[#0F1A2A] dark:text-[#F4F5F7] tracking-tight mb-4">Talent identification</h3>
                <p className="text-[#6B7280] dark:text-[#B9C1CC] leading-relaxed text-[15px]">
                  We use advanced data analytics and grassroots scouting to find the next generation of champions in every corner of the country.
                </p>
              </div>
            </div>

            {/* Athlete Support */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[#F4F5F7] dark:bg-white/5 flex items-center justify-center rounded-[4px]">
                <Shield className="text-[#db4001]" size={32} />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-[#0F1A2A] dark:text-[#F4F5F7] tracking-tight mb-4">Athlete support</h3>
                <p className="text-[#6B7280] dark:text-[#B9C1CC] leading-relaxed text-[15px]">
                  Providing comprehensive support including coaching, nutrition, sports science, and financial assistance.
                </p>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[#F4F5F7] dark:bg-white/5 flex items-center justify-center rounded-[4px]">
                <Zap className="text-[#db4001]" size={32} />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-[#0F1A2A] dark:text-[#F4F5F7] tracking-tight mb-4">Infrastructure development</h3>
                <p className="text-[#6B7280] dark:text-[#B9C1CC] leading-relaxed text-[15px]">
                  Building state-of-the-art sports complexes and excellence centers that meet international standards.
                </p>
              </div>
            </div>

            {/* Global Competitiveness */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[#F4F5F7] dark:bg-white/5 flex items-center justify-center rounded-[4px]">
                <Globe className="text-[#db4001]" size={32} />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-[#0F1A2A] dark:text-[#F4F5F7] tracking-tight mb-4">Global competitiveness</h3>
                <p className="text-[#6B7280] dark:text-[#B9C1CC] leading-relaxed text-[15px]">
                  Ensuring Indian athletes are prepared to compete and win at the highest levels of international sports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Pillars Grid */}
      <section className="py-24 bg-[#F4F5F7] dark:bg-[#0A1628] transition-colors duration-300 border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-16">
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#db4001] mb-4 text-center lg:text-left">MISSION VERTICALS</div>
            <h2 className="text-[32px] md:text-[48px] font-semibold leading-tight text-[#24272A] dark:text-[#F4F5F7] text-center lg:text-left max-w-4xl">
              Building a robust sports ecosystem through 9 strategic pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticals.map((v, i) => {
              const Icon = v.icon;
              return (
                <Link 
                  to="/verticals" 
                  key={i}
                  className="group p-8 bg-white dark:bg-[#141C2B] rounded-[8px] border border-[#EEF0F3] dark:border-[#26334A] hover:border-[#db4001]/30 hover:shadow-xl hover:shadow-[#db4001]/5 transition-all flex flex-col h-full no-underline"
                >
                  <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-[8px] bg-[#F4F5F7] dark:bg-[#0F1A2A] text-[#db4001] shadow-sm group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0F1A2A] dark:text-[#F4F5F7] tracking-tight leading-tight group-hover:text-[#db4001] transition-colors">
                    {v.title}
                  </h3>
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[2px] text-[#8A94A6] dark:text-[#8896AC]">LEARN MORE</span>
                    <ArrowUpRight size={14} className="text-[#8A94A6] group-hover:text-[#db4001] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <SlantedSection bgClassName="bg-primary" className="text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl mb-6 text-white">BE PART OF THE REVOLUTION</h2>
          <p className="text-white/80 mb-10 text-lg">
            Join the thousands of athletes and coaches who are transforming the face of Indian sports.
          </p>
          <button className="bg-white text-primary font-display font-bold uppercase px-10 py-4 rounded-sm slant-edge hover:bg-navy hover:text-white transition-all">
            <span className="inline-block transform skew-x-[10deg]">Register Now</span>
          </button>
        </div>
      </SlantedSection>
    </div>
  );
};
