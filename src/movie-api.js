import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGM4N2Y2YjEzN2YwNzAyM2E5M2U3YTg1MDRjODY0NCIsInN1YiI6IjY1ZWI5NDJhMzk0YTg3MDE3Y2MyM2VjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K17PDK3qfWNuklEoepgdjrDZE2y8sNUXDMlzdMjyRZk',
    accept: 'application/json',
  },
  params: {
    language: 'en-US',
  },
};

export const fetchTrendMovie = async () => {
  const url = '/trending/movie/day';
  const newOptions = {
    ...options,
    params: {
      ...options.params,
      include_adult: false,
    },
  };
  const response = await axios.get(url, newOptions);
  return response.data.results;
};

export const fetchSearchMovie = async searchQuery => {
  const url = '/search/movie';
  const newOptions = {
    ...options,
    params: {
      ...options.params,
      include_adult: false,
      query: searchQuery,
    },
  };
  const response = await axios.get(url, newOptions);
  return response.data.results;
};

export const fetchMovieById = async id => {
  const url = `/movie/${id}`;
  const response = await axios.get(url, options);
  return response.data;
};

export const fetchMovieCast = async id => {
  const url = `/movie/${id}/credits`;
  const response = await axios.get(url, options);
  return response.data.cast;
};

export const fetchMovieReviews = async id => {
  const url = `/movie/${id}/reviews`;
  const response = await axios.get(url, options);
  return response.data.results;
};
