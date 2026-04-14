import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import NotificationTicker from '../components/NotificationTicker';
import Services from '../components/Services';
import PostSection from '../components/PostSection';
import About from '../components/About';
import ReviewsSection from '../components/ReviewsSection';
import Gallery from '../components/Gallery';
import BrandsSection from '../components/BrandsSection';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import { fetchSiteData } from '../lib/api';

const LandingPage = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const refreshData = async () => {
    const updated = await fetchSiteData();
    if (updated) setData(updated);
  };

  return (
    <div className="bg-[#fafafb] text-zinc-900 min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      {/* Pass gallery to Hero for dynamic visual effects */}
      <Hero content={data?.hero} gallery={data?.gallery} />
      <NotificationTicker notifications={data?.notifications} />
      
      <Services services={data?.services} />
      
      <PostSection posts={data?.posts} />

      <About data={data?.about} />
      
      <ReviewsSection reviews={data?.reviews || []} onReviewAdded={refreshData} />
      
      <Gallery images={data?.gallery || []} />

      <Contact content={data?.contact} />

      <BrandsSection brands={data?.brands || []} />

      <WhatsAppButton phone={data?.contact?.phone} />

      <Footer />
    </div>
  );
};

export default LandingPage;
