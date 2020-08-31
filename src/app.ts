import 'reflect-metadata';

import express from 'express';
import './database';

import { getRepository, In } from 'typeorm';

import Post from './entities/Post';
import Category from './entities/Category';

const app = express();

app.use(express.json());

app.get('/create-categories', async (request, response) => {
  const categoriesRepository = getRepository(Category);

  const newCategories = categoriesRepository.create([
    {
      title: 'Node',
    },
    {
      title: 'Express',
    },
    {
      title: 'React',
    },
    {
      title: 'React Native',
    },
  ]);

  const categories = await categoriesRepository.save(newCategories);

  return response.json(categories);
});

app.get('/create-post', async (request, response) => {
  const categoriesRepository = getRepository(Category);
  const postsRepository = getRepository(Post);

  const categories = await categoriesRepository.find({
    where: {
      title: In(['Node', 'Express']),
    },
  });

  const newPost = postsRepository.create({
    title: 'Iniciando um novo projeto',
    post_category: categories.map(category => ({ category })),
  });

  const post = await postsRepository.save(newPost);

  return response.json(post);
});

app.get('/delete-relation', async (request, response) => {
  const categoriesRepository = getRepository(Category);
  const postsRepository = getRepository(Post);

  const findCategory = await categoriesRepository.findOne({
    where: {
      title: 'Node',
    },
  });

  if (!findCategory) return response.status(400);

  const post = await postsRepository.findOne({
    where: {
      title: 'Iniciando um novo projeto',
    },
    relations: ['post_category', 'post_category.category'],
  });

  if (!post) return response.status(400);

  post.post_category = post.post_category.filter(
    post_category => post_category.category_id !== findCategory.id,
  );

  await postsRepository.save(post);

  return response.json(post);
});

app.listen(3333);
