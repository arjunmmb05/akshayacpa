import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/#services' },
    { name: 'Updates', path: '/#updates' },
    { name: 'About', path: '/#about' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'Contact', path: '/#contact' },
  ];

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(id.replace('/', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${isScrolled ? 'pt-3' : 'pt-5'}`}
      >
        <div className={`transition-all duration-500 flex justify-between items-center px-5 ${isScrolled
            ? 'w-[92%] md:w-[75%] max-w-5xl bg-white/80 backdrop-blur-2xl py-3 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.07)] border border-white/60'
            : 'w-full container py-2.5'
          }`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/akshayalogo.png"
                alt="Akshaya Logo"
                className={`transition-all duration-500 ${isScrolled ? 'h-8' : 'h-10'}`}
              />
            </div>
            <div className={`transition-all duration-500 ${isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'} hidden sm:flex flex-col`}>
              <span className="text-sm font-black tracking-tight leading-none text-zinc-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                AKSHAYA E CENTRE
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-primary/70 mt-0.5">
                Chandappura · Kadannappally
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-[11px] font-bold text-zinc-500 hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/5 tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+918547802350"
              className="hidden lg:flex items-center gap-2 text-[11px] font-bold text-zinc-500 hover:text-primary transition-colors tracking-wide"
            >
              <PhoneCall size={13} className="text-primary" />
              +91 85478 02350
            </a>
            <a
              href="#contact"
              className="bg-primary text-white px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-primary/30"
            >
              Get Help
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl pt-24 pb-10 px-8 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2 max-w-sm mx-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-2xl font-black text-zinc-900 hover:text-primary py-4 border-b border-zinc-100 flex justify-between items-center group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {link.name}
                  <span className="text-zinc-200 group-hover:text-primary transition-colors text-xl">→</span>
                </motion.a>
              ))}

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1 }}
                href="#contact"
                className="mt-6 bg-primary text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-primary/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Help Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
