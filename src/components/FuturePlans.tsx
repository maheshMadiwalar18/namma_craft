import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Brain, Globe, Smartphone, Sparkles, ShieldCheck } from 'lucide-react';

const plans = [
  {
    icon: Brain,
    title: "AI-Driven Discovery",
    description: "Smarter recommendations that understand regional preferences and seasonal trends for a personalized experience."
  },
  {
    icon: Rocket,
    title: "Advanced Auctions",
    description: "Real-time analytics and fair-price prediction to ensure artisans receive the true value of their heritage work."
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Voice-based uploads and multilingual support to empower rural artisans to list products in their local language."
  },
  {
    icon: Smartphone,
    title: "Mobile Ecosystem",
    description: "Dedicated mobile application with low-internet mode for seamless use in remote artisan clusters."
  },
  {
    icon: ShieldCheck,
    title: "Digital Heritage",
    description: "Virtual exhibitions and blockchain-verified authenticity certificates for every handmade masterpiece."
  },
  {
    icon: Sparkles,
    title: "Festival Modes",
    description: "Immersive discovery modes tailored to global cultural festivals and regional celebrations."
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
            <Rocket className="w-3 h-3" /> Our Vision for Tomorrow
          </motion.div>
          <h2 className="text-primary mb-8">Future Plans</h2>
          <p className="text-text-soft text-lg leading-relaxed">
            Our platform is designed to grow into a comprehensive cultural marketplace that supports artisans, home food creators, and collectors worldwide. In the future, we plan to enhance the system with advanced AI features, broader global reach, and deeper cultural engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[40px] border border-highlight/10 shadow-sm hover:shadow-premium transition-all group"
            >
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
            <p className="text-cream/80 text-lg leading-relaxed italic">
              "By continuously combining technology with tradition, our goal is to preserve cultural heritage while creating sustainable global opportunities for local creators."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
