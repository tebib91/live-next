'use client';

import useDebounce from '@/app/hooks/useDebounce';
import useSearchResults from '@/app/hooks/useSearchResults';
import styles from '@/assets/styles/Search.module.css';
import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { results, loading, error } = useSearchResults(debouncedQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Type to search"
          className={styles.inputSearch}
        />
      </div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      {results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((file: string, index: number) => (
            <li key={index} className={styles.resultItem}>
              {file}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
