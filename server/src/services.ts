// src/services/userService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addUser = async (userName: string, password: string) => {
  return prisma.user.create({
    data: {
      user_name: userName,
      password: password,
    },
  });
};

export const loginUser = async (user_name: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_name: user_name,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error('Incorrect password');
    }

    return user;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const getUserById = async (userId: number) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      favorites: true,
    },
  });
};

export const getUserByUserName = async (userName: string) => {
  return prisma.user.findUnique({
    where: {
      user_name: userName,
    },
    include: {
      favorites: true,
    },
  });
};

export const addFavoriteMovie = async (userId: number, movieTitle: string) => {
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error('Usuário não encontrado');
  }

  return prisma.favorite.create({
    data: {
      userId: userId,
      movieTitle: movieTitle,
    },
  });
};

export const removeFavoriteMovie = async (userId: number, movieTitle: string) => {
  return prisma.favorite.deleteMany({
    where: {
      userId: userId,
      movieTitle: movieTitle,
    },
  });
};

export const getFavoriteMovies = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      favorites: true,
    },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return user.favorites.map(favorite => favorite.movieTitle);
};
