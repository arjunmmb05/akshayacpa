import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Maximize2, X } from 'lucide-react';

const PostSection = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!posts || posts.length === 0) return null;

  return (
    <section id="updates" className="py-32 bg-white relative border-t border-zinc-100">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto"
          >
             <span className="text-zinc-400 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Official Feed</span>
             <h2 className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-tight font-serif mb-6">Latest Highlights</h2>
             <div className="w-24 h-1 bg-gradient-to-r from-zinc-200 to-transparent rounded-full mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer relative bg-zinc-50 p-3 rounded-[2.5rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-[2rem] bg-zinc-200">
                <img 
                  src={post.image} 
                  alt={post.title || 'Update'} 
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1s] ease-out"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 size={20} className="ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="inline-flex items-center gap-2 text-white/90 text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 mb-4">
                     <Calendar size={12} className="text-secondary" />
                     {new Date(post.createdAt).toLocaleDateString()}
                   </div>
                   
                   {post.title && (
                     <h3 className="text-2xl font-black text-white leading-tight mt-2 line-clamp-2 drop-shadow-md">
                       {post.title}
                     </h3>
                   )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md cursor-zoom-out"
             />
             <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 flex flex-col items-center justify-center max-w-[95vw] sm:max-w-4xl"
             >
                <div className="bg-white p-3 rounded-[2.5rem] shadow-2xl inline-block">
                    <img 
                      src={selectedPost.image} 
                      alt={selectedPost.title} 
                      className="w-auto h-auto max-h-[75vh] object-contain rounded-[2rem] bg-zinc-100"
                    />
                    {selectedPost.title && (
                        <div className="px-6 py-6 text-center mt-2 max-w-[600px] mx-auto">
                            <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mb-2 block object-center">
                                Posted on: {new Date(selectedPost.createdAt).toLocaleDateString()}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-zinc-900 leading-tight">
                                {selectedPost.title}
                            </h3>
                        </div>
                    )}
                </div>

                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md"
                >
                   <X size={20} />
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PostSection;
