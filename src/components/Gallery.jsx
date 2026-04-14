import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="py-32 bg-white overflow-hidden relative border-t border-zinc-100">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 font-serif">
               Our <br/> <span className="text-zinc-400">Visual</span> <span className="gradient-text">Journey</span>
             </h2>
          </motion.div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.8 }}
              className="relative rounded-[3rem] overflow-hidden group cursor-pointer break-inside-avoid shadow-2xl bg-zinc-100 border border-zinc-200 p-2 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-primary/20"
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative rounded-[2.5rem] overflow-hidden">
                <img 
                  src={img} 
                  alt={`Center photo ${index}`} 
                  className="w-full h-auto object-cover transform transition-transform duration-[1.2s] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-16">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedImage(null)}
               className="absolute inset-0 bg-primary-dark/95 backdrop-blur-2xl cursor-zoom-out"
             />
             
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative z-10 max-w-6xl w-full"
             >
                <div className="relative w-full overflow-hidden rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.4)] border border-white/10 group">
                   <img 
                     src={selectedImage} 
                     alt="Expanded view" 
                     className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                   />
                </div>
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="px-8 py-4 bg-white text-primary-dark rounded-full font-black uppercase text-xs tracking-widest transition-all border border-white/20 flex items-center gap-3"
                  >
                    <X size={18} /> Close
                  </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
