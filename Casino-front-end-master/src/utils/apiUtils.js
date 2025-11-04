// Utility functions for API reliability and caching

// Retry function with exponential backoff
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      // Don't retry on client errors (4xx)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

// Cache utilities
const CACHE_KEY = 'casino_data_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export const getCachedCasinoData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Error reading casino cache:', error);
    return null;
  }
};

export const setCachedCasinoData = (data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Error caching casino data:', error);
  }
};

// Error classification
export const classifyError = (error) => {
  if (!error) return 'unknown';

  // Network errors
  if (!error.response) {
    if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
      return 'network';
    }
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return 'timeout';
    }
    return 'network';
  }

  const status = error.response.status;

  if (status >= 500) return 'server';
  if (status === 429) return 'rate_limit';
  if (status >= 400) return 'client';
  if (status === 401) return 'auth';

  return 'unknown';
};

// Get user-friendly error message
export const getErrorMessage = (error) => {
  const errorType = classifyError(error);

  switch (errorType) {
    case 'network':
      return 'Network connection failed. Please check your internet connection and try again.';
    case 'timeout':
      return 'Request timed out. The server is taking too long to respond.';
    case 'server':
      return 'Server error occurred. Please try again in a few moments.';
    case 'rate_limit':
      return 'Too many requests. Please wait a moment before trying again.';
    case 'auth':
      return 'Authentication failed. Please refresh the page.';
    case 'client':
      return error.response?.data?.message || 'Invalid request. Please try again.';
    default:
      return error.response?.data?.message || 'Failed to load casinos. Please try again.';
  }
};
