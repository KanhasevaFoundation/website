import { api } from './apiClient';

export const trackEvent = async (type, payload = {}) => {
  try {
    const body = {
      type,
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      ...payload,
    };
    await api.post('/api/analytics/event', body);
  } catch (e) {
    // swallow errors
  }
};

export const trackPageView = () => trackEvent('page_view');
export const trackClick = (element) => trackEvent('click', { element });
