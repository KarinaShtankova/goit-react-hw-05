import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../movie-api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>Autor: {author}</p>
              <p> {content}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !reviews.length &&   (
        <p> We don&apos;t have any reviwes for this movie. </p>
      )}
    </div>
  );
}
