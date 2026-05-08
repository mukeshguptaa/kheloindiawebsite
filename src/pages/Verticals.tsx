import { SlantedSection } from "../components/DesignSystem";
import { motion } from "motion/react";
import { 
  Target, 
  Users, 
  Building, 
  Shield, 
  Map, 
  Trophy, 
  Dumbbell, 
  Heart, 
  Cpu 
} from "lucide-react";
import { cn } from "../lib/utils";

const verticals = [
  {
    title: "Sports Infrastructure for Medal Strategy",
    description: "Developing specialized infrastructure aimed at supporting India's strategy for international medal success.",
    icon: Building,
    color: "bg-orange-600",
  },
  {
    title: "Strengthening Strategic Sports Assets",
    description: "Enhancing and maintaining key sports assets that are critical for national-level training and excellence.",
    icon: Shield,
    color: "bg-blue-700",
  },
  {
    title: "State Action Plan for Sports Infrastructure Development",
    description: "Collaborating with states to create localized infrastructure plans that align with national goals.",
    icon: Map,
    color: "bg-green-600",
  },
  {
    title: "Sports Competitions & Leagues",
    description: "Organizing structured competitions and leagues to provide athletes with consistent competitive exposure.",
    icon: Trophy,
    color: "bg-yellow-600",
  },
  {
    title: "Talent Identification and Development",
    description: "A robust system for spotting raw talent early and providing them with a pathway to professional success.",
    icon: Target,
    color: "bg-red-600",
  },
  {
    title: "Coach & Support Staff Development",
    description: "Professionalizing the coaching ecosystem and training support staff in sports science and management.",
    icon: Users,
    color: "bg-purple-600",
  },
  {
    title: "Khelo India Training Facilities",
    description: "Establishing and upgrading training centers equipped with modern amenities for diverse sporting disciplines.",
    icon: Dumbbell,
    color: "bg-indigo-600",
  },
  {
    title: "Fit India Movement",
    description: "Promoting a culture of fitness and wellness among citizens of all ages across the nation.",
    icon: Heart,
    color: "bg-pink-600",
  },
  {
    title: "Sports Technology",
    description: "Integrating cutting-edge technology and data analytics to enhance athlete performance and training efficiency.",
    icon: Cpu,
    color: "bg-cyan-600",
  },
];

export const Verticals = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-navy py-24 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl mb-6">MISSION <span className="text-primary">VERTICALS</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Our multi-dimensional approach to building a robust sports ecosystem in India through 9 strategic pillars.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verticals.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 border border-gray-100 rounded-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white flex flex-col h-full"
              >
                <div className={cn("w-16 h-16 mb-6 flex items-center justify-center rounded-xl text-white flex-shrink-0", v.color)}>
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl mb-4 group-hover:text-primary transition-colors font-display font-bold uppercase leading-tight">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SlantedSection bgClassName="bg-gray-50">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl mb-6">INTEGRATED <span className="text-primary">APPROACH</span></h2>
            <p className="text-gray-600 mb-6">
              Each vertical is designed to complement the others, creating a seamless pathway for athletes from identification to international excellence.
            </p>
            <div className="space-y-4">
              {["Data-Driven Identification", "Standardized Infrastructure", "Certified Coaching"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold uppercase text-xs tracking-widest">
                  <div className="w-1.5 h-1.5 bg-primary slant-edge" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800"
              alt="Athlete"
              className="w-full h-80 object-cover rounded-xl slant-edge shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </SlantedSection>
    </div>
  );
};
