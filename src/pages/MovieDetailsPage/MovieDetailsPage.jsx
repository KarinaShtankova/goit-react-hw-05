import { useEffect, useState, useRef, Suspense } from 'react';
import { fetchMovieById } from '../../movie-api';
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';
import { clsx } from 'clsx';
import { IoIosArrowBack } from 'react-icons/io';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieById(movieId);

        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';
  return (
    <div className={css.container}>
      <Link className={css.linkGoBack} to={backLinkRef.current}>
        <IoIosArrowBack />
        <p className={css.textGoBack}> Go back</p>
      </Link>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div>
          <div className={css.movieContainer}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
            <div>
              <h2 className={css.upperTitle}>{movie.title}</h2>
              <p>User score: {Math.round(movie.vote_average * 10)}%</p>
              <h3 className={css.title}>Overview</h3>
              <p>{movie.overview}</p>
              <h3 className={css.title}>Genres</h3>
              <ul className={css.genreList}>
                {movie.genres.map(genre => (
                  <li className={css.genre} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={css.addInfoContainer}>
            <h3 className={css.addInfoTitle}>Additional information</h3>
            <ul className={css.navList}>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return clsx(css.link, isActive && css.isActive);
                  }}
                  to="cast"
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return clsx(css.link, isActive && css.isActive);
                  }}
                  to="reviews"
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
