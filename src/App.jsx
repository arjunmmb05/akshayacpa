import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { fetchSiteData, updateSiteData } from './lib/api';

const DEFAULT_DATA = {
  hero: {
    title: "Akshaya e Centre Chandappura",
    subtitle: "Experience the next generation of e-Governance. We simplify bureaucracy for you.",
    ctaText: "Explore Services"
  },
  notifications: [
    "Aadhaar enrollment starts at 10 AM daily.",
    "Last date for KEAM application is approaching soon.",
    "New Passport Seva appointments available for next week."
  ],
  services: [
    { title: "Aadhaar Services", description: "Enrollment, Corrections, Bio-metric update & PVC Print.", icon: "shield", documents: ["Original Aadhaar", "Proof of Address", "Passport Photo"] },
    { title: "Passport Seva", description: "New passport, renewal, PCC, and appointment scheduling.", icon: "globe", documents: ["Birth Certificate", "Address Proof", "Photo ID"] },
    { title: "PAN Card", description: "New PAN application, correction, and linking with Aadhaar.", icon: "credit-card", documents: ["Aadhaar Card", "Passport Photo", "Date of Birth Proof"] },
    { title: "E-District", description: "Income, Nativity, Community, Caste & Possession certificates.", icon: "file-text", documents: ["Ration Card", "Village Officer Certificate", "ID Proof"] }
  ],
  posts: [],
  reviews: [
    { name: "Rahul Das", rating: 5, comment: "Excellent service and very helpful staff!" },
    { name: "Ananya K", rating: 4, comment: "Fast processing of my Aadhar update. Highly recommended." },
    { name: "Suresh P", rating: 5, comment: "Best Akshaya centre in the area. Very professional." }
  ],
  contact: {
    address: "Chandappura, Pilathara - Mathamangalam Road, Kerala 670504",
    phone: "+91 85478 02350",
    email: "akshayakn984@gmail.com",
    hours: "Mon - Sat: 9:30 AM - 6:00 PM"
  }
};

// Auth guard — checks sessionStorage
const ProtectedRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem('akshaya_admin_auth');
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem('akshaya_site_data');
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });

  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchSiteData();
      if (data) {
        setSiteData(data);
        localStorage.setItem('akshaya_site_data', JSON.stringify(data));
      }
    };
    loadContent();
  }, []);

  const handleSaveData = async (newData) => {
    setSiteData(newData);
    localStorage.setItem('akshaya_site_data', JSON.stringify(newData));
    try {
      await updateSiteData(newData);
    } catch (error) {
      console.warn("Failed to sync with API. Changes saved locally.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage data={siteData} />} />
        <Route path="/admin/login" element={<AdminLogin onLogin={() => window.location.href = '/admin'} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard data={siteData} onSave={handleSaveData} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
