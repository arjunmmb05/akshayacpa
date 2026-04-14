// This API library connects to the Cloud MongoDB Database via Vercel Serverless Functions
const API_BASE_URL = '/api';

export const fetchSiteData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/content`);
    if (!response.ok) throw new Error('Failed to fetch content');
    return await response.json();
  } catch (error) {
    console.error("Error fetching site data:", error);
    // Fallback to localStorage if API is down
    const saved = localStorage.getItem('akshaya_site_data');
    return saved ? JSON.parse(saved) : null;
  }
};

export const updateSiteData = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update content');
    localStorage.setItem('akshaya_site_data', JSON.stringify(data));
    return await response.json();
  } catch (error) {
    console.error("Error updating site data:", error);
    throw error;
  }
};

export const submitUserReview = async (review) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    if (!response.ok) throw new Error('Failed to submit review');
    return await response.json();
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const submitInquiry = async (inquiry) => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
    if (!response.ok) throw new Error('Failed to send email');
    return await response.json();
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  // Free image upload via Base64 (simplest for free tier without S3/Cloudinary)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
