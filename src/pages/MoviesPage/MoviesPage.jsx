import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchSearchMovie } from '../../movie-api';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [params, setParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchQuery = params.get('query' ?? '');

  useEffect(() => {
    if (query.trim() === '' && searchQuery === '') {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchSearchMovie(searchQuery);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query, searchQuery]);

  const handleSubmit = value => {
    setQuery(value);
    params.set('query', value);
    setParams(params);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
    </div>
  );
}
