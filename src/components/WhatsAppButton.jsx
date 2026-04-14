import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ phone }) => {
  if (!phone) return null;

  // Format phone number: remove spaces and non-digits
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  return (
    <motion.a
      href={`https://wa.me/${cleanPhone}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-900/40 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute -top-12 right-0 bg-white text-zinc-800 px-4 py-2 rounded-xl text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-100 pointer-events-none">
        Need Help? Chat with us!
        <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white rotate-45 border-r border-b border-zinc-100"></div>
      </div>
      <MessageCircle size={32} fill="white" className="text-[#25D366]" />
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] -z-10 animate-ping opacity-20"></span>
    </motion.a>
  );
};

export default WhatsAppButton;
