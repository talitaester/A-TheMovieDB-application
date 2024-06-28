// server.ts
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { addUser, getUserById, getUserByUserName, addFavoriteMovie, removeFavoriteMovie, loginUser } from './services';

const app = express();
app.use(express.json());
app.use(cors());

// Rota para adicionar um novo usuário
app.post('/users', async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user = await addUser(user_name, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Rota de login
app.put('/login', async (req: Request, res: Response) => {
  const { user_name, password } = req.body;
  try {
    const user = await loginUser(user_name, password);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ error: 'An unexpected error occurred' });
  }
});

// Rota para buscar um usuário por ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'User not found' });
  }
});

// Rota para buscar um usuário por nome de usuário
app.get('/users/username/:user_name', async (req, res) => {
  const { user_name } = req.params;
  try {
    const user = await getUserByUserName(user_name);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'User not found' });
  }
});

// Rota para buscar os favoritos de um usuário por ID
app.get('/users/:id/favorites', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserById(parseInt(id));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user.favorites);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorite movies' });
  }
});

// Rota para adicionar um filme aos favoritos de um usuário
app.post('/users/:userId/favorites', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { movieTitle } = req.body;

  try {
    const favorite = await addFavoriteMovie(parseInt(userId), movieTitle);
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Erro ao adicionar filme aos favoritos:', error);
    res.status(500).json({ error: 'Erro ao adicionar filme aos favoritos' });
  }
});

// Rota para remover um filme dos favoritos de um usuário
app.delete('/users/:id/favorites', async (req, res) => {
  const { id } = req.params;
  const { movieTitle } = req.body;
  try {
    await removeFavoriteMovie(parseInt(id), movieTitle);
    res.status(200).json({ message: 'Favorite movie removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite movie' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
