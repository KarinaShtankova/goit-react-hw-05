import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../movie-api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    if (!movieId) return;
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        setCast(data);
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
      {cast && (
        <ul>
          {cast.map(({ id, character, name, profile_path }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : defaultImg
                }
                alt="photo"
                width={250}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !cast.length && (
        <p> We don&apos;t have any cast information for this movie. </p>
      )}
    </div>
  );
}
