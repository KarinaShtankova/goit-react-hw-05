import toast from 'react-hot-toast';

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
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" />
      <button type="submit">search</button>
    </form>
  );
}
