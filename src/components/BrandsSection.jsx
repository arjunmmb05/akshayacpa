import { motion } from 'framer-motion';

const BrandsSection = ({ brands }) => {
  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-zinc-100">
      <div className="flex relative items-center">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center gap-24 whitespace-nowrap"
        >
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className="h-12 w-auto grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img src={brand.logo} alt={brand.name} className="h-full w-auto object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsSection;
