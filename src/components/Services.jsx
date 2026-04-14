import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Globe, CreditCard, FileText, 
  Zap, GraduationCap, Users, Plane, X, FileCheck, ArrowUpRight, Search
} from 'lucide-react';

const icons = {
  shield: ShieldCheck, globe: Globe, 'credit-card': CreditCard,
  'file-text': FileText, zap: Zap, 'graduation-cap': GraduationCap,
  users: Users, plane: Plane,
};

const Services = ({ services }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const displayServices = (services || []).filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-[1.1] font-serif">
              Digital Services <br/> <span className="text-zinc-400">&amp; Documentation</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full md:w-80 group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayServices.length > 0 ? (
            displayServices.map((service, index) => {
              const Icon = icons[service.icon] || Globe;
              
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedService(service)}
                  className="group relative bg-zinc-50/50 p-8 rounded-[2.5rem] border border-zinc-100 hover:bg-white hover:border-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer flex flex-col h-[300px] noise-overlay"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 flex items-center justify-center text-primary bg-white rounded-3xl group-hover:bg-primary group-hover:text-white shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    
                    <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-300 group-hover:border-primary group-hover:text-primary group-hover:rotate-45 transition-all duration-500">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1">
                    <h3 className="font-black text-zinc-900 text-xl tracking-tight leading-tight mb-3 font-serif">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed limit-lines">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-primary transition-colors">
                      View Documents
                    </span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-zinc-400 font-bold">No services found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setSelectedService(null)}
               className="absolute inset-0 bg-primary-dark/40 backdrop-blur-xl"
             />
             <motion.div
               layoutId={`card-${selectedService.title}`}
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl relative z-10"
             >
                <div className="p-10 pb-6 border-b border-zinc-50">
                   <div className="flex justify-between items-center mb-8">
                      <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                         <FileCheck size={28} />
                      </div>
                      <button onClick={() => setSelectedService(null)} className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl text-zinc-400 hover:text-zinc-900 transition-all">
                         <X size={20} />
                      </button>
                   </div>
                   <h3 className="text-3xl font-black text-zinc-900 tracking-tight font-serif">{selectedService.title}</h3>
                </div>
                
                <div className="p-10 pt-8 bg-zinc-50/50">
                   <p className="text-zinc-500 text-sm mb-6 font-medium">Please bring the following original documents for processing:</p>
                   <div className="space-y-3 mb-10 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                     {(selectedService.documents || []).map((doc, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ opacity: 0, x: -10 }} 
                         animate={{ opacity: 1, x: 0 }} 
                         transition={{ delay: i * 0.1 }}
                         className="flex gap-4 items-center p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:border-primary/20 transition-all"
                       >
                         <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                            <span className="text-xs font-black text-primary">{i + 1}</span>
                         </div>
                         <span className="text-zinc-700 font-bold text-sm tracking-tight">{doc}</span>
                       </motion.div>
                     ))}
                   </div>
                   <button onClick={() => setSelectedService(null)} className="btn-primary w-full shadow-primary/30 py-5 text-sm uppercase tracking-widest">
                     Close
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
