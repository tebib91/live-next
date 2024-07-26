import { useEffect, useState } from 'react';

function useSystemResults() {
  const [results, setResults] = useState<{
    cpuLoad: number;
    ramUsage: number;
    diskUsage: number;
    networkUsage: { upload: number; download: number };
    systemInfo: {
      platform: string;
      arch: string;
      release: string;
      uptime: number;
      hostname: string;
      type: string;
    };
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/system`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          setError('Failed to fetch system data');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(fetchResults, 50000);
    fetchResults(); // Initial fetch

    return () => clearInterval(interval);
  }, []);

  return { results, loading, error };
}

export default useSystemResults;
