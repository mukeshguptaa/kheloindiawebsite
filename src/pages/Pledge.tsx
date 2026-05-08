import { SlantedSection, PowerButton } from "../components/DesignSystem";
import { motion } from "motion/react";
import { ShieldCheck, Heart, Users, Zap, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const hindiPledge = [
  {
    stanza: "हम शपथ लेते हैं कि",
    lines: [
      "खेलों को अपने, जीवन का हिस्सा बनाएंगे,",
      "खेलेंगे और खेलना सिखाएंगे।",
      "खेलों से जुड़ कर हम, स्वस्थ भारत बनाएंगे,",
      "खेल- खिलाड़ी का, हम हौसला बढ़ाएंगे"
    ]
  },
  {
    stanza: "हम शपथ लेते हैं कि",
    lines: [
      "हार- जीत से आगे बढ़, मैं को हम बनाएंगे,",
      "खेलों से खिलेंगे हम, देश का मान बढ़ाएंगे",
      "संकल्प से सिद्धि लाएंगे, हम न्यू इंडिया बनाएंगे,",
      "खेलेंगे और खेलना सिखाएंगे।"
    ]
  }
];

const englishPledge = [
  {
    stanza: "We take a pledge that",
    lines: [
      "We will make sports a part of our lives,",
      "We will play and teach others to play.",
      "By connecting with sports, we will build a healthy India,",
      "We will encourage every sportsperson."
    ]
  },
  {
    stanza: "We take a pledge that",
    lines: [
      "Moving beyond winning and losing, we will turn 'I' into 'We',",
      "Through sports we will bloom, and increase the nation's pride.",
      "Through resolve we will achieve success, we will build a New India,",
      "We will play and teach others to play."
    ]
  }
];

export const Pledge = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2000"
            alt="Pledge"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <ShieldCheck className="mx-auto mb-8 text-white" size={80} />
            <h1 className="text-6xl mb-6 text-white">THE KHELO INDIA <span className="text-navy">PLEDGE</span></h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              A commitment to sports, fitness, and national pride. Join millions of Indians in promising to make sports a part of daily life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-50 p-8 md:p-12 rounded-3xl border-2 border-dashed border-primary/20 relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary rounded-xl" />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-navy rounded-xl" />
            
            <Tabs defaultValue="hindi" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-white border border-gray-200 p-1 rounded-md h-auto">
                  <TabsTrigger value="hindi" className="font-display font-bold uppercase text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2">Hindi</TabsTrigger>
                  <TabsTrigger value="english" className="font-display font-bold uppercase text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2">English</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="hindi" className="mt-0">
                <div className="space-y-12">
                  {hindiPledge.map((section, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="text-center"
                    >
                      <h3 className="text-2xl font-display font-black text-primary mb-6 uppercase tracking-tight">{section.stanza}</h3>
                      <div className="space-y-4">
                        {section.lines.map((line, lIdx) => (
                          <p key={lIdx} className="text-xl md:text-2xl font-medium text-navy leading-relaxed">{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center pt-8"
                  >
                    <h2 className="text-4xl font-display font-black text-navy">जय हिंद</h2>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="english" className="mt-0">
                <div className="space-y-12">
                  {englishPledge.map((section, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="text-center"
                    >
                      <h3 className="text-2xl font-display font-black text-primary mb-6 uppercase tracking-tight">{section.stanza}</h3>
                      <div className="space-y-4">
                        {section.lines.map((line, lIdx) => (
                          <p key={lIdx} className="text-xl md:text-2xl font-medium text-navy leading-relaxed italic">{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center pt-8"
                  >
                    <h2 className="text-4xl font-display font-black text-navy">JAI HIND</h2>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16 text-center border-t border-gray-200 pt-12">
              <PowerButton className="px-12">Take the Pledge</PowerButton>
              <p className="mt-6 text-sm text-gray-500 font-bold uppercase tracking-widest">
                12,456,789 Indians have already pledged
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
