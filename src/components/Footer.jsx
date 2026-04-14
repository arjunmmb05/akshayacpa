import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-zinc-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand Info */}
          <div className="flex items-center gap-6">
            <img src="/akshayalogo.png" alt="Akshaya Logo" className="h-10 opacity-80" />
            <div className="h-4 w-[1px] bg-zinc-200 hidden md:block" />
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 leading-none mb-1">Akshaya E Centre</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-400">Chandappura Kadannappally</p>
            </div>
          </div>



          {/* Copyright */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
              Designed & Developed by <a href="https://ideacopa.vercel.app">Ideacopa</a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
