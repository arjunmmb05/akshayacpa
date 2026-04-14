// This API library is designed to work completely standalone using localStorage.
// It allows the site to be hosted for free on Vercel seamlessly without a separate backend.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchSiteData = async () => {
  try {
    await delay(300);
    const saved = localStorage.getItem('akshaya_site_data');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  } catch (error) {
    console.error("Error fetching site data:", error);
    return null;
  }
};

export const updateSiteData = async (data) => {
  try {
    await delay(400);
    localStorage.setItem('akshaya_site_data', JSON.stringify(data));
    return { success: true };
  } catch (error) {
    console.error("Error updating site data:", error);
    throw error;
  }
};

export const submitUserReview = async (review) => {
  try {
    await delay(500);
    const saved = localStorage.getItem('akshaya_site_data');
    if (saved) {
      const data = JSON.parse(saved);
      const updatedReviews = [review, ...(data.reviews || [])];
      data.reviews = updatedReviews;
      localStorage.setItem('akshaya_site_data', JSON.stringify(data));
    }
    return { success: true };
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  try {
    await delay(800);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const submitInquiry = async (inquiry) => {
  try {
    await delay(500);
    const saved = localStorage.getItem('akshaya_site_data');
    if (saved) {
      const data = JSON.parse(saved);
      const updatedInquiries = [{ ...inquiry, id: Date.now(), date: new Date().toLocaleString() }, ...(data.inquiries || [])];
      data.inquiries = updatedInquiries;
      localStorage.setItem('akshaya_site_data', JSON.stringify(data));
    }
    return { success: true };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    throw error;
  }
};
