import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Heart, Zap } from 'lucide-react';

const About = ({ data }) => {
  const content = data || {
    title: "Gateway to Digital India",
    content: "Akshaya is the primary gateway for citizens to access digital government services. We facilitate over 100+ G2C and B2C services with absolute transparency, high efficiency, and professional handling."
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotateImg = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const features = [
    { icon: Shield, title: "Govt. Authorized", desc: "Official partner for state and central services." },
    { icon: Zap, title: "Swift Processing", desc: "Optimized workflows for faster document turnarounds." },
    { icon: Heart, title: "Citizen First", desc: "Dedicated support for elders and complex legal cases." }
  ];

  return (
    <section id="about" ref={ref} className="py-32 bg-[#f7f8fc] overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          {/* Visual Side */}
          <div className="lg:w-1/2 relative w-full">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
               viewport={{ once: true }}
               style={{ rotate: rotateImg }}
               className="aspect-[4/5] md:aspect-[5/6] rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative z-10 group"
            >
              <motion.img 
                style={{ y: imgY, scale: 1.15 }}
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=1200" 
                alt="Akshaya Digital Government" 
                className="w-full h-full object-cover transform origin-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60" />
            </motion.div>
            
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 -z-10 rounded-full blur-[100px]" />
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1] font-serif mb-10">
                The Gateway to <br/> <span className="gradient-text">Digital Services</span>
              </h2>
              
              <div className="space-y-10">
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-medium">
                  {content.content}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-zinc-200">
                  {features.map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                        <feature.icon size={20} />
                      </div>
                      <div>
                        <h5 className="font-black text-zinc-900 text-sm mb-1 tracking-tight">{feature.title}</h5>
                        <p className="text-xs text-zinc-400 font-bold leading-snug">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6">
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary flex items-center gap-3 shadow-primary/20">
                    Learn More About Us
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
