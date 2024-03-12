import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
import { MdSearch } from 'react-icons/md';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const search = form.elements.search.value;
    form.reset();
    if (search.trim() === '') {
      toast.error('Enter text to search for movies.');
    }
    onSubmit(search);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="search"
        placeholder="Search movies"
      />
      <button className={css.btn} type="submit">
        <MdSearch size={24} className={css.icon} />
      </button>
    </form>
  );
}
