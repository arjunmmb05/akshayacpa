import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = ({ content, gallery }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [0, 280]);

  const { title, subtitle, ctaText } = content || {};

  const images = gallery && gallery.length > 0 ? gallery : [
    "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=600&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-[#f7f8fc]"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/10 to-blue-400/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">

          {/* Left: Text Block */}
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            className="flex flex-col items-start justify-center"
          >
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="leading-[1.02] tracking-tight text-zinc-900 drop-shadow-sm font-serif"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}
            >
              <span className="gradient-text block">Akshaya</span>
              <span className="text-zinc-900">Chandappura</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-zinc-500 mt-8 leading-relaxed max-w-lg font-medium"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
            >
              {subtitle || "Your trusted digital gateway for government services. Fast, secure, and citizen-first."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-12 w-full sm:w-auto"
            >
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center justify-center gap-3 group text-sm"
              >
                <span>{ctaText || 'Explore Services'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <a
                href="tel:+918547802350"
                className="btn-outline flex items-center justify-center gap-3 text-sm group"
              >
                Call Us Now
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Gallery Columns */}
          <div className="hidden lg:block h-[750px] overflow-hidden relative mask-fade-edges-vertical">
            <div className="grid grid-cols-2 gap-4 p-2">
              <motion.div style={{ y: yColumn1 }} className="space-y-4 pt-16">
                {[...images, ...images].map((img, i) => (
                  <div
                    key={`col1-${i}`}
                    className="rounded-3xl overflow-hidden shadow-xl bg-white border border-zinc-100 p-1.5"
                  >
                    <img src={img} className="w-full aspect-[4/5] object-cover rounded-2xl" loading="lazy" alt="" />
                  </div>
                ))}
              </motion.div>
              <motion.div style={{ y: yColumn2 }} className="space-y-4 -mt-48">
                {[...images.slice().reverse(), ...images].map((img, i) => (
                  <div
                    key={`col2-${i}`}
                    className="rounded-3xl overflow-hidden shadow-xl bg-white border border-zinc-100 p-1.5"
                  >
                    <img src={img} className="w-full aspect-square object-cover rounded-2xl" loading="lazy" alt="" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
