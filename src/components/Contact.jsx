import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { submitInquiry } from '../lib/api';

const Contact = ({ content }) => {
  const { address, phone, email, hours } = content || {
    address: "Chandappura, Pilathara - Mathamangalam Road, Kerala 670504",
    phone: "+91 85478 02350",
    email: "akshayakn984@gmail.com",
    hours: "Mon - Sat: 9:30 AM - 6:00 PM"
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // 1. Send SMTP Email via Serverless Function
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        throw new Error('Email service failed');
      }

      // 2. Also save to Local Admin Panel as backup
      await submitInquiry(formData);

      setFormData({ name: '', email: '', message: '' });
      alert("Your inquiry has been sent to our email and saved in the Admin Panel!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. We saved your message to the Admin Panel, but the email notification failed. Please ensure setup is complete.");
      
      // Fallback: Still save to local storage even if email fails
      try { await submitInquiry(formData); } catch (e) {}
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactOptions = [
    { icon: MapPin, label: "Location", value: address },
    { icon: Phone, label: "Contact No", value: phone },
    { icon: Mail, label: "Email Info", value: email },
    { icon: Clock, label: "Center Hours", value: hours }
  ];

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          
          {/* Info Side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1] font-serif mb-10">
                Contact <br/> <span className="text-zinc-400">the</span> <span className="gradient-text">Directorate</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-medium mb-16 leading-relaxed max-w-lg">
                Require specialized assistance? Visit our center or reach out via phone. Our team is ready to facilitate your requirements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                {contactOptions.map((opt, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="flex gap-5 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-sm">
                      <opt.icon size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1.5">{opt.label}</h4>
                      <p className="text-zinc-800 font-bold leading-relaxed">{opt.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16">
                <a 
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-[#1EBE5D] transition-all shadow-xl shadow-[#25D366]/20"
                >
                  <MessageSquare size={18} fill="currentColor" />
                  WhatsApp Support
                </a>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2 w-full lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-50 p-6 sm:p-12 md:p-16 rounded-3xl md:rounded-[4rem] border border-zinc-100 shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-zinc-900 mb-2 tracking-tighter font-serif">Inquiry Portal</h3>
                <p className="text-zinc-400 text-sm mb-12 font-bold">Specify your requirements below.</p>
                
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white border border-zinc-200 rounded-2xl px-8 py-5 text-zinc-800 font-bold focus:border-primary transition-all outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white border border-zinc-200 rounded-2xl px-8 py-5 text-zinc-800 font-bold focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Message</label>
                    <textarea 
                      rows={4} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white border border-zinc-200 rounded-2xl px-8 py-5 text-zinc-800 font-bold focus:border-primary transition-all outline-none resize-none"
                    />
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    className="btn-primary w-full py-6 text-xs uppercase font-black tracking-widest flex items-center justify-center gap-4 group shadow-primary/20"
                  >
                    {isSubmitting ? "Dispatching..." : "Send Inquiry"} <Send size={18} />
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

export default Contact;
