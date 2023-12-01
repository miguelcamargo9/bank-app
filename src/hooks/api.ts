import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
}

export default useApi;
