import { useEffect, useState } from 'react';

function useSearchResults(query: string) {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/search?query=${query}`);
          if (response.ok) {
            const data = await response.json();
            setResults(data.results);
          } else {
            setError('Failed to fetch search results');
          }
        } catch (err) {
          setError('An error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  return { results, loading, error };
}

export default useSearchResults;
