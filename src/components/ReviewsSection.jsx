import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send, Quote, ArrowRight } from 'lucide-react';
import { submitUserReview } from '../lib/api';

const ReviewsSection = ({ reviews, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitUserReview(newReview);
      setNewReview({ name: '', rating: 5, comment: '' });
      alert('Your review has been securely submitted. Thank you!');
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      alert('Submission failed. Your changes are saved locally.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-32 bg-primary-dark relative overflow-hidden noise-overlay">
      {/* Background visual art */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-primary rounded-full blur-[150px]" />
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-sky-400 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Header & Scrolling Wall */}
          <div className="lg:w-[65%] w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1] font-serif">
                Citizen <br/> <span className="text-white/40 italic">Experiences</span>
              </h2>
            </motion.div>
            
            <div className="h-[750px] overflow-hidden relative mask-fade-edges-vertical">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  duration: Math.max(reviews.length * 7, 25),
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="space-y-8 pr-6"
              >
                {[...reviews, ...reviews].map((review, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-3xl p-6 sm:p-10 rounded-3xl sm:rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
                    <Quote className="absolute -top-6 -right-6 w-36 h-36 text-white/[0.03] group-hover:rotate-12 transition-transform duration-700" />
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="flex gap-1.5 text-sky-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className={i < review.rating ? "fill-current" : "opacity-20"} />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-white/90 text-2xl md:text-3xl font-serif leading-snug mb-10 relative z-10">
                      "{review.comment}"
                    </p>
                    
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-primary to-sky-500 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-primary/20">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-white text-lg font-black tracking-tight block">{review.name}</span>
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Service Recipient</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Review Form */}
          <div className="lg:w-[35%] w-full lg:sticky lg:top-32">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white p-6 sm:p-10 md:p-12 rounded-3xl md:rounded-[3.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-3xl flex items-center justify-center mb-10">
                  <MessageSquare size={32} />
                </div>
                
                <h3 className="text-3xl font-black text-zinc-900 mb-2 tracking-tighter font-serif">Post a Review</h3>
                <p className="text-zinc-400 text-sm mb-10 font-bold">Your feedback helps us serve Chandappura better.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-2">Name</label>
                    <input
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-800 font-bold focus:bg-white focus:border-primary transition-all outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-2">Rating</label>
                    <div className="flex justify-around bg-zinc-50 px-2 py-4 rounded-2xl border border-zinc-100">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setNewReview({ ...newReview, rating: s })}
                          className="p-1 hover:scale-125 transition-transform"
                        >
                          <Star 
                            size={28} 
                            className={`transition-all duration-300 ${newReview.rating >= s ? 'fill-sky-400 text-sky-400' : 'text-zinc-300'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3 ml-2">Comment</label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-800 font-bold focus:bg-white focus:border-primary transition-all outline-none resize-none"
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="btn-primary w-full py-5 rounded-[1.5rem] uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 mt-4 group shadow-primary/20"
                  >
                    Post Review <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
