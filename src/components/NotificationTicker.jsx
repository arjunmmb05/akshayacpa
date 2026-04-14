import { motion } from 'framer-motion';
import { BellRing } from 'lucide-react';

const NotificationTicker = ({ notifications }) => {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="bg-primary-dark text-white py-3 overflow-hidden border-y border-white/10 relative z-20">
      <div className="container mx-auto px-6 flex items-center">
        <div className="flex items-center gap-2 bg-secondary text-primary-dark px-3 py-1 rounded font-black text-[10px] uppercase tracking-tighter mr-6 shrink-0 shadow-lg">
          <BellRing size={14} className="animate-bounce" />
          Live Updates
        </div>
        
        <div className="flex-1 overflow-hidden relative h-6">
          <motion.div
            className="flex gap-20 whitespace-nowrap absolute"
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear"
            }}
          >
            {notifications.map((note, index) => (
              <span key={index} className="text-sm font-medium tracking-wide">
                • {note}
              </span>
            ))}
            {/* Duplicated for smooth loop */}
            {notifications.map((note, index) => (
              <span key={`dup-${index}`} className="text-sm font-medium tracking-wide">
                • {note}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTicker;
