import { motion } from 'framer-motion';

const NetworkBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 flex items-center justify-center bg-[#fafafb]">
      {/* Dynamic Aurora Glows */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 opacity-40" />

      {/* Interconnected Tech Grid */}
      <div className="w-[180vw] h-[180vh] relative animate-[spin_240s_linear_infinite]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(55deg) rotateY(5deg)' }}>
        <svg width="100%" height="100%" viewBox="0 0 1200 1200" className="absolute inset-0">
          <defs>
            <linearGradient id="globalLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0056b3" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0056b3" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#fadb5f" stopOpacity="0.3" />
            </linearGradient>
            <filter id="globalGlow">
               <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
               <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
          </defs>
          
          {/* Animated Connecting Lines */}
          <g stroke="url(#globalLineGrad)" strokeWidth="1">
            {[...Array(50)].map((_, i) => {
               const x1 = Math.random() * 1200;
               const y1 = Math.random() * 1200;
               const x2 = Math.random() * 1200;
               const y2 = Math.random() * 1200;
               return (
                 <g key={i}>
                   <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="4, 8" className="opacity-30" />
                   <motion.circle 
                     r="3" fill="#0056b3" filter="url(#globalGlow)"
                     animate={{ x: [x1, x2, x1], y: [y1, y2, y1] }}
                     transition={{ duration: 12 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
                   />
                 </g>
               )
            })}
          </g>

          {/* Static Background Nodes */}
          <g fill="#0056b3">
            {[...Array(60)].map((_, i) => (
               <circle 
                key={`n-${i}`} 
                cx={Math.random() * 1200} 
                cy={Math.random() * 1200} 
                r={Math.random() * 4 + 1} 
                className="opacity-20" 
               />
            ))}
          </g>
          
          {/* Accent Glow Nodes */}
          <g fill="#fadb5f">
            {[...Array(15)].map((_, i) => (
               <motion.circle 
                key={`a-${i}`} 
                cx={Math.random() * 1200} 
                cy={Math.random() * 1200} 
                r={2} 
                animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
                transition={{ duration: 4 + Math.random() * 6, repeat: Infinity }}
                className="opacity-30" 
               />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default NetworkBackground;
