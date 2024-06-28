"use client";

import './page.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('API Key:', process.env.TMDB_API_KEY);

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: process.env.TMDB_API_KEY,
            language: 'pt-BR',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'Failed to fetch movies.');
        } else {
          setError('Failed to fetch movies.');
        }
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: searchTerm,
          language: 'pt-BR',
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to search movies.');
      } else {
        setError('Failed to search movies.');
      }
      console.error('Failed to search movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <h1>Filmes Populares</h1>
      <input
        type="text"
        placeholder="Pesquisar por título"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Pesquisar</button>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
        ))}
      </div> */}
      heloo world
    </>
  );
};

export default MoviesPage;
