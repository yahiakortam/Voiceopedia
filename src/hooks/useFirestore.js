import { useState, useEffect } from 'react';
import { getStories, getResources, getOrganizationInfo } from '../lib/firestoreService';

// Custom hook for fetching stories
export const useStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const data = await getStories();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return { stories, loading, error, refetch: () => fetchStories() };
};

// Custom hook for fetching resources
export const useResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await getResources();
        setResources(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return { resources, loading, error, refetch: () => fetchResources() };
};

// Custom hook for fetching organization info
export const useOrganizationInfo = () => {
  const [organizationInfo, setOrganizationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizationInfo = async () => {
      try {
        setLoading(true);
        const data = await getOrganizationInfo();
        setOrganizationInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationInfo();
  }, []);

  return { organizationInfo, loading, error, refetch: () => fetchOrganizationInfo() };
};

