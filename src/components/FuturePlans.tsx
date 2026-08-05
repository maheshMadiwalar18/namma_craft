import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Lightbulb, Globe, Smartphone, Heart, ShieldCheck } from 'lucide-react';
import { HandwrittenNote } from './HandwrittenNote';

const plans = [
  {
    icon: Lightbulb,
    title: "Smarter Discovery",
    description: "Enhanced recommendations that understand regional preferences and seasonal trends for a better experience."
  },
  {
    icon: Rocket,
    title: "Advanced Auctions",
    description: "Real-time analytics and fair-price guidance to ensure artisans receive the true value of their work."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Voice-based uploads and multilingual support to empower rural artisans to list products easily."
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Dedicated mobile application with offline modes for use in remote artisan clusters."
  },
  {
    icon: ShieldCheck,
    title: "Heritage Preservation",
    description: "Virtual exhibitions and verified authenticity certificates for every handcrafted piece."
  },
  {
    icon: Heart,
    title: "Festival Modes",
    description: "Tailored discovery modes for cultural festivals and regional celebrations."
  }
];

export const FuturePlans = () => {
  return (
    <section className="section-spacing bg-cream relative overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Rocket className="w-3 h-3" /> Our Vision
          </motion.div>
          <h2 className="text-primary mb-8">Roadmap</h2>
          <p className="text-text-soft text-lg leading-relaxed">
            Our platform is built to grow into a comprehensive cultural marketplace that supports artisans, home food creators, and collectors worldwide. We plan to enhance the experience with deeper cultural engagement and broader global reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[40px] border border-highlight/10 shadow-sm hover:shadow-premium transition-all group relative"
            >
              {index === 0 && (
                <div className="absolute -top-6 -right-6 z-10 hidden lg:block">
                  <HandwrittenNote rotation={10} className="!bg-accent/10 !text-accent !border-accent/20 !text-sm">
                    "Coming Soon"
                  </HandwrittenNote>
                </div>
              )}
              <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-accent mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <plan.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-4">{plan.title}</h3>
              <p className="text-text-soft text-sm leading-relaxed">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-12 bg-primary rounded-[48px] text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-cream/80 text-lg leading-relaxed italic mb-8">
              "By combining support with tradition, we aim to preserve cultural heritage while creating sustainable opportunities for creators."
            </p>
            <div className="flex justify-center">
              <HandwrittenNote rotation={-2} className="!bg-white/10 !text-white !border-white/20 !text-lg">
                "Preserving craftsmanship for the future."
              </HandwrittenNote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
