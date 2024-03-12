import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function NotFound() {
  return (
    <div className={css.container}>
      <b className={css.title}>Oops! Not found!</b>
      <Link className={css.link} to="/">
        <IoIosArrowBack />
        <p className={css.text}>Back to home page!</p>
      </Link>
    </div>
  );
}
