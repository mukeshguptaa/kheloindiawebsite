import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import DateFilter from '../components/DateFilter';

const stories = [
  {
    id: "Anjali",
    name: "ANJALI RANA, 19",
    sport: "ICE HOCKEY · PUNJAB",
    desc: "From a roadside boxing club to the Khelo India Games gold — Anjali's story of discipline and grit.",
    img: "https://news.kiit.ac.in/wp-content/uploads/2018/08/Dutee-Chand-from-KIIT-KISS-won-Silver-Medal-in-Asian-Games-750x430.jpg",
    gender: "HER"
  },
  {
    id: "Anjun",
    name: "ARJUN PATIL, 22",
    sport: "SWIMMING · MAHARASHTRA",
    desc: "A workplace accident at 18 couldn't stop Arjun from reaching the national podium.",
    img: "https://thebridge.in/h-upload/2025/03/24/60950-untitled-design-2025-03-24t204524885.webp",
    gender: "HIS"
  },
  {
    id: "rohan",
    name: "ROHAN NAIR, 15",
    sport: "BADMINTON · KERALA",
    desc: "The youngest swimmer to break the state record, now training for the 2028 Olympics.",
    img: "https://pbs.twimg.com/media/HC5RkpcbYAArqih?format=jpg&name=large",
    gender: "HIS"
  },
  {
    id: "thangjam",
    name: "THANGJAM DEVI, 20",
    sport: "WEIGHTLIFTING · MANIPUR",
    desc: "Carrying the legacy of Manipur's weightlifting excellence to the international stage.",
    img: "https://www.judoinside.com/photos/hans/2018/Youth_Olympic_Games_Team_event_Buenos_Aires/20181010_yog_ijf_day4_teams_9827_thangjam_tababi_devi.jpg",
    gender: "HER"
  }
];

export const ImpactStories = () => {
  return (
    <main className="min-h-screen bg-[#F9FAFB] dark:bg-[#060C18] pt-24 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12 md:mb-16 text-left">
          <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">Impact Stories</div>
          <h1 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.2] max-w-4xl text-[#293F54] dark:text-[#F4F5F7] mb-4">
            Champions born from <br className="hidden md:block" /> every corner of India
          </h1>
          <p className="text-[20px] text-[#515c65] dark:text-[#8A94A6] max-w-[700px] leading-[1.6] font-normal">
            Behind every medal is a story of sacrifice, resilience, and an unshakeable dream. These are the faces of the Khelo India revolution.
          </p>
        </div>

        {/* Date Filter Section */}
        <DateFilter />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feature Story */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 relative rounded-[8px] overflow-hidden group min-h-[600px] md:min-h-[720px] flex flex-col justify-end p-8 md:p-12 mb-8 lg:mb-0"
          >
            <img 
              src="https://scontent-del3-2.xx.fbcdn.net/v/t39.30808-6/669529086_1317784373732895_8097587676032531667_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=wiM41OoL240Q7kNvwHo1_Bn&_nc_oc=Adr8StaH75o_1mJaOE_vdaOjh6JXh9rBVx1L-5BcyXMMYlyyFbzBN0BbiUWU_YNhZ0k&_nc_zt=23&_nc_ht=scontent-del3-2.xx&_nc_gid=Aa1syxbUuJo3ZDlkvVgjeA&_nc_ss=7b289&oh=00_Af0VwDbKtUVRHLEJkQvG8okqbVcdIQ0JvsrcfdVd5gUTkA&oe=69F4C830" 
              alt="Olympic Dream" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060C18] via-[#060C18]/40 to-transparent" />
            
            {/* Top Tags */}
            <div className="absolute top-8 left-8 z-10">
              <span className="bg-[#db4001] text-white px-4 py-2 rounded-[8px] text-[10.24px] font-bold tracking-[0.1em] uppercase">
                ★ STORY OF THE MONTH
              </span>
            </div>
            <div className="absolute top-8 right-8 z-10">
              <span className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-[8px] text-[10.24px] font-bold tracking-[0.1em] uppercase">
                Wrestling - 70kg Freestyle
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[40px] md:text-[61.04px] font-display font-black leading-[1.1] tracking-[-0.02em] text-[#F4F5F7] mb-6 uppercase">
                SENIOR ASIAN WRESTLING <br className="hidden md:block" /> CHAMPION <br className="hidden md:block" /> ABHIMANYU
              </h3>
              
              <p className="text-[16px] text-white/90 mb-6 max-w-[540px] leading-[1.6]">
                India shines bright at the Senior Asian Wrestling Championships 2026 as our powerhouse wrestler, Abhimanyu, clinches the GOLD in the 70kg Freestyle category.
              </p>

              <div className="flex gap-4 text-[#db4001] font-bold text-[12.8px]">
                <span>#GoldMedal</span>
                <span>#AsianChampionships2026</span>
              </div>
            </div>
          </motion.div>

          {/* Side Stories Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#0F1A2A] rounded-[8px] group border border-[#EEF0F3] dark:border-white/5 hover:border-[#db4001]/30 transition-all flex flex-col shadow-sm p-3 gap-3"
              >
                <div className="aspect-[4/3] overflow-hidden relative rounded-[8px]">
                  <img 
                    src={story.img} 
                    alt={story.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-2 pb-1 flex flex-col flex-grow">
                  <div className="text-[#8A94A6] dark:text-[#515c65] text-[10.24px] font-bold uppercase tracking-[0.15em] mb-1">
                    {story.sport}
                  </div>
                  <h4 className="text-[18px] md:text-[20px] font-bold mb-1 tracking-tight text-[#0F1A2A] dark:text-[#F4F5F7] uppercase">
                    {story.name}
                  </h4>
                  <p className="text-[12.8px] text-[#6B7280] dark:text-[#8A94A6] leading-relaxed mb-4 line-clamp-3">
                    {story.desc}
                  </p>
                  <button className="mt-auto flex items-center gap-2 text-[10.24px] font-black uppercase tracking-[0.15em] text-[#db4001] hover:opacity-80 transition-colors group/btn">
                    READ {story.gender} STORY <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support duplicated story rows to make it a full page as requested */}
        <div className="mt-16 pt-16 border-t border-gray-100 dark:border-white/5">
           {/* Section 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 direction-rtl">
                 <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6 lg:order-1 order-2">
                    {stories.slice().reverse().map((story, i) => (
                      <motion.div
                        key={`v2-${story.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-[#0F1A2A] rounded-[8px] group border border-[#EEF0F3] dark:border-white/5 hover:border-[#db4001]/30 transition-all flex flex-col shadow-sm p-3 gap-3"
                      >
                        <div className="aspect-[4/3] overflow-hidden relative rounded-[8px]">
                          <img 
                            src={story.img} 
                            alt={story.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="px-2 pb-1 flex flex-col flex-grow">
                          <div className="text-[#8A94A6] dark:text-[#515c65] text-[10.24px] font-bold uppercase tracking-[0.15em] mb-1">
                            {story.sport}
                          </div>
                          <h4 className="text-[18px] md:text-[20px] font-bold mb-1 tracking-tight text-[#0F1A2A] dark:text-[#F4F5F7] uppercase">
                            {story.name}
                          </h4>
                          <p className="text-[12.8px] text-[#6B7280] dark:text-[#8A94A6] leading-relaxed mb-4 line-clamp-3">
                            {story.desc}
                          </p>
                          <button className="mt-auto flex items-center gap-2 text-[10.24px] font-black uppercase tracking-[0.15em] text-[#db4001] hover:opacity-80 transition-colors group/btn">
                            READ {story.gender} STORY <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-7 relative rounded-[8px] overflow-hidden group min-h-[600px] md:min-h-[720px] flex flex-col justify-end p-8 md:p-12 lg:order-2 order-1"
                  >
                        <img 
                          src="https://thebridge.in/h-upload/2023/06/03/60950-untitled-design-2023-06-03t204524885.webp" 
                          alt="Champion Story" 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060C18] via-[#060C18]/40 to-transparent" />
                        <div className="relative z-10">
                          <h3 className="text-[40px] md:text-[61.04px] font-display font-black leading-[1.1] tracking-[-0.02em] text-[#F4F5F7] mb-6 uppercase">
                            BEYOND THE <br className="hidden md:block" /> FINISH <br className="hidden md:block" /> LINE
                          </h3>
                          <p className="text-[16px] text-white/90 mb-6 max-w-[540px] leading-[1.6]">
                            Breaking boundaries isn't just about the clock. It's about the will to start when everyone else has stopped.
                          </p>
                        </div>
                  </motion.div>
            </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .font-georgia { font-family: Georgia, serif; }
      ` }} />
    </main>
  );
};
