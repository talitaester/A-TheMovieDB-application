"use client";
// src/app/page.tsx

import "./globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./login/page";
import Initial from "./initial/page";
import Feed from "./feed/page";
import Favorites from "./favorites/page";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      fetchMovies();
    }
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
            language: "pt-BR",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to fetch movies.");
      } else {
        setError("Failed to fetch movies.");
      }
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
            query: searchTerm,
            language: "pt-BR",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to search movies.");
      } else {
        setError("Failed to search movies.");
      }
      console.error("Failed to search movies:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Initial />
      {/* <Feed /> */}
      {/* <Favorites /> */}
    </>
  );
};

export default MoviesPage;
