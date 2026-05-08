import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import DateFilter from '../components/DateFilter';

const socialPosts = [
  {
    platform: "Instagram",
    image: "https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2025/05/14/20250514150F_X5uavxb-scaled.jpg?quality=80&zoom=1&ssl=1A",
    caption: "Congratulations to Priya Singh on winning Gold at the Khelo India School Games 2025! #KheloIndia #Athletics",
    tall: true
  },
  {
    platform: "Twitter",
    image: "https://images.indianexpress.com/2023/05/yogi-ji.jpg?w=1200",
    caption: "Shooting stars at Karni Singh Ranges — watch these young champions in action! #ShootingIndia",
    tall: false
  },
  {
    platform: "Instagram",
    image: "https://apnnews.in/wp-content/uploads/2025/05/Untitled-design-2025-05-12T161410.501.jpg",
    caption: "The spirit of competition is alive! Grassroots athletes showing incredible determination today.",
    tall: false
  },
  {
    platform: "YouTube",
    image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/gjligcznk7ov9zocrxbw",
    caption: "Highlights: The opening ceremony of Khelo India University Games was a spectacle of culture and sport!",
    tall: true
  },
  {
    platform: "Twitter",
    image: "https://thesportsroom.in/wp-content/uploads/2022/06/01E158DB-47BD-4589-A9C3-14DA6981E37F.jpeg",
    caption: "Record alert! New national junior record in 100m sprint set today at the athletics meet. #Speed",
    tall: true
  },
  {
    platform: "Instagram",
    image: "https://pbs.twimg.com/media/DxXgGpeX0AEi-vi.jpg",
    caption: "Day 3 of #KISG2025 — Wrestling has begun at Siri Fort Sports Complex! Who's your favourite? ",
    tall: false
  }
];

// Deduplicating/Extending data for a fuller page
const morePosts = [
  {
      platform: "Instagram",
      image: "https://www.jagranimages.com/images/newimg/18122023/18_12_2023-khelo-india-para-games-2023-medal-tally-results_23606990.jpg",
      caption: "Inspiration on full display! The Para Games athletes are proving that limits only exist in our minds. #DaringToDream",
      tall: false
  },
  {
      platform: "YouTube",
      image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/p8fndz4e93f9u9u8z7a8",
      caption: "Behind the Scenes: What goes into training a champion? Our coaches share their journey. #CoachingDev",
      tall: true
  },
  {
      platform: "Twitter",
      image: "https://pbs.twimg.com/media/FFrQ5kCVUAEvM_u?format=jpg&name=large",
      caption: "The future is bright! Table tennis trials in Bihar saw record participation from rural talent. #Grassroots",
      tall: false
  },
  {
      platform: "Instagram",
      image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/m9f9v3e9u9u8z7a8b9c1",
      caption: "Victory lap! Celebrating the stars of tomorrow at the state-level felicitation ceremony. #ChampionMindset",
      tall: true
  }
];

export const News = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0A1628] pt-24 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 text-left">
        {/* Page Header */}
        <div className="mb-12 md:mb-16">
          <div className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#db4001] mb-4">KHELOINDIA IN ACTION</div>
          <h1 className="text-[32px] md:text-[46px] font-georgia font-[200] leading-[1.14] text-[#293F54] dark:text-[#F4F5F7] mb-4">
            Live from the field
          </h1>
          <p className="text-[20px] text-[#515c65] dark:text-[#B9C1CC] max-w-[700px] leading-[1.6] font-normal">
            Follow the movement in real time. Stories from the ground, victories on the mat, breakthroughs on the track.
          </p>
        </div>

        {/* Date Filter Section */}
        <DateFilter />

        {/* Masonry Grid Section 1 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-16">
          {socialPosts.map((post, i) => (
            <motion.div
              key={`post-1-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid bg-white dark:bg-white/5 rounded-[8px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative"
            >
              <div className={cn(
                "relative overflow-hidden",
                post.tall ? "aspect-[3/4.2]" : "aspect-[3/2]"
              )}>
                <img 
                  src={post.image} 
                  alt="Social Feed" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <p className="text-[16px] text-[#6B7280] dark:text-[#B9C1CC] leading-relaxed mb-6 font-medium">
                  {post.caption}
                </p>
                <button className="flex items-center gap-2 text-[10.24px] font-bold tracking-[0.1em] uppercase text-[#db4001] hover:opacity-80 transition-colors group/btn">
                  View post <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Separator or Sub-heading for the second part */}
        <div className="mb-12 pt-8 border-t border-gray-100 dark:border-white/5">
             <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8A94A6] mb-2">More updates</div>
        </div>

        {/* Masonry Grid Section 2 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[...morePosts, ...socialPosts.slice(0, 2)].map((post, i) => (
            <motion.div
              key={`post-2-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid bg-white dark:bg-white/5 rounded-[8px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative"
            >
              <div className={cn(
                "relative overflow-hidden",
                post.tall ? "aspect-[3/4.2]" : "aspect-[3/2]"
              )}>
                <img 
                  src={post.image} 
                  alt="Social Feed" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <p className="text-[16px] text-[#6B7280] dark:text-[#B9C1CC] leading-relaxed mb-6 font-medium">
                  {post.caption}
                </p>
                <button className="flex items-center gap-2 text-[10.24px] font-bold tracking-[0.1em] uppercase text-[#db4001] hover:opacity-80 transition-colors group/btn">
                  View post <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .font-georgia { font-family: Georgia, serif; }
      ` }} />
    </main>
  );
};
