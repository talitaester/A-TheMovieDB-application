"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard';
import Navbar from '@/components/Navbar';

// Interface para os dados do usuário e dos filmes
interface User {
  id: number;
  username: string;
  favorites: string[]; // Lista de títulos dos filmes favoritos
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  director: string;
  price: number;
}

export default function Favorites() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      // Obter dados do usuário e seus filmes favoritos do backend local
      const response = await axios.get<User>('http://localhost:3000/users/2'); // Substitua pelo endpoint correto

      const userData: User = {
        id: response.data.id,
        username: response.data.username,
        favorites: response.data.favorites,
      };

      // Mapear os títulos dos filmes favoritos para os objetos Movie
      const fetchedMovies = await fetchMovieDetails(userData.favorites);

      // Setar os filmes na state para renderização
      setMovies(fetchedMovies);
    } catch (error) {
      setError('Failed to fetch user data.');
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar detalhes dos filmes na API TMDB usando os títulos
  const fetchMovieDetails = async (favoriteTitles: string[]) => {
    try {
      const fetchedMovies = await Promise.all(favoriteTitles.map(async (title, index) => {
        // Aqui você pode fazer a busca no seu banco de dados local ou utilizar uma API externa se necessário
        // Exemplo simplificado com dados estáticos
        return {
          id: index + 1,
          title: title,
          poster_path: `https://example.com/posters/${title}.jpg`, // Exemplo de caminho de imagem
          director: 'Desconhecido',
          price: 0.00,
        };
      }));

      return fetchedMovies;
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
      return [];
    }
  };

  return (
    <div className="w-screen h-screen relative items-start justify-start flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-4 pl-12">
        <h2 className="mt-5 text-lg font-semibold px-2">Meus Favoritos</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <section className="flex flex-row gap-3">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}

              image={movie.poster_path}
              title={movie.title}
              price={movie.price}
              director={movie.director}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
