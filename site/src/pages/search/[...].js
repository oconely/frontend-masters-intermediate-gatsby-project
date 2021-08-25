import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

import { form, input, button } from '../../styles/search.module.css';

const SearchClientOnly = (props) => {
  const { params } = props;

  const query = decodeURIComponent(params['*']);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('IDLE');

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const query = form.get('search');

    setCurrentQuery(query);
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  const handleSearchReset = () => {
    setCurrentQuery('');
    navigate('/search/');
  };

  const handleBookSearch = async (query) => {
    setStatus('LOADING');
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);

    if (!res.ok) {
      throw new Error(`Search failed: ${res.status}}`);
    }

    const result = await res.json();
    setResult(result);
    setStatus('IDLE');
  };

  useEffect(() => {
    if (currentQuery === '') {
      setResult(null);
      return;
    }
    handleBookSearch(currentQuery);
  }, [currentQuery]);

  return (
    <>
      <h1>Search for a book</h1>
      <form className={form} onSubmit={handleSubmit}>
        <input type="search" name="search" className={input} />
        <button className={button}>search</button>
        <button className={button} type="reset" onClick={handleSearchReset}>
          reset
        </button>
      </form>

      {status === 'LOADING' && <p>Loading results...</p>}

      {status === 'IDLE' && currentQuery !== '' ? (
        <>
          <h2>Search results for "{currentQuery}"</h2>
          <ul>
            {result &&
              result.docs.map((doc) => (
                <li key={doc.key}>
                  <strong>{doc.title}</strong>{' '}
                  {doc.author_name && `by ${doc.author_name?.[0]}`}
                </li>
              ))}
          </ul>
        </>
      ) : null}
    </>
  );
};

export default SearchClientOnly;
