import API from "./axios";
import { retryWithBackoff, getCachedCasinoData, setCachedCasinoData } from "../utils/apiUtils";

// Get all casinos - OPTIMIZED VERSION with retry and caching
export const getCasinos = async (useCache = true) => {
  // Try to get cached data first if enabled
  if (useCache) {
    const cachedData = getCachedCasinoData();
    if (cachedData) {
      // Return cached data but also try to refresh in background
      refreshCacheInBackground();
      return cachedData;
    }
  }

  // Fetch fresh data with retry logic
  const fetchCasinos = async () => {
    const response = await API.get("/casinos", {
      params: {
        limit: 80 // Limit to 80 casinos for homepage
      },
      timeout: 10000 // 10 second timeout
    });
    return response.data;
  };

  try {
    const data = await retryWithBackoff(fetchCasinos, 3, 1000);

    // Cache the successful response
    if (useCache) {
      setCachedCasinoData(data);
    }

    return data;
  } catch (error) {
    // If we have cached data as fallback, use it
    if (useCache) {
      const cachedData = getCachedCasinoData();
      if (cachedData) {
        console.warn('Using cached casino data due to API failure');
        return cachedData;
      }
    }

    throw error;
  }
};

// Background cache refresh function
const refreshCacheInBackground = async () => {
  try {
    const fetchCasinos = async () => {
      const response = await API.get("/casinos", {
        params: { limit: 80 },
        timeout: 10000
      });
      return response.data;
    };

    const data = await retryWithBackoff(fetchCasinos, 2, 1000);
    setCachedCasinoData(data);
  } catch (error) {
    console.warn('Background cache refresh failed:', error.message);
  }
};

export const createCasino = async (casinoData) => {
  try {
    const response = await API.post("/casinos", casinoData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to create casino";
  }
};

export const updateCasino = async (id, casinoData) => {
  try {
    const response = await API.put(`/casinos/${id}`, casinoData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to update casino";
  }
};

export const deleteCasino = async (id) => {
  try {
    const response = await API.delete(`/casinos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to delete casino";
  }
};

export const getCasinoById = async (id) => {
  try {
    const response = await API.get(`/casinos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch casino by id";
  }
};

export const updateCasinoOrder = async (id, newOrder) => {
  try {
    const response = await API.put(`/casinos/reorder/${id}`, { newOrder });
    return response.data;
  } catch (error) {}
};

export const getCasinoBySlug = async (slug) => {
  try {
    // Use the existing Axios instance that already handles base URLs
    const response = await API.get(`/casinos/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    if (error.message.includes("ERR_BLOCKED_BY_CLIENT")) {
      throw new Error("Please disable ad blockers for this site.");
    }
    throw error.response?.data?.message || "Failed to fetch casino";
  }
};

export const setCasinoEnabled = async (id, enabled) => {
  try {
    const response = await API.patch(`/casinos/${id}/enabled`, { enabled });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update casino status";
  }
};

export const getAllCasinos = async () => {
  try {
    const response = await API.get("/casinos?all=true");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch all casinos";
  }
};
