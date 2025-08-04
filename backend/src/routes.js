import express from 'express';
import {getCategories} from './routes/categories.js'
import { getItemsFromCatId } from './routes/items.js';
import { getUser } from './routes/users.js';
import { authenticate } from './authMiddleware.js';
import { login, googleLogin } from './routes/login.js';

const router = new express.Router();

// Categories / Items
router.get('/categories', getCategories)
router.get('/categories/items/:categoryId', getItemsFromCatId)

// Users
router.post('/login', login);
router.get('/login/google', googleLogin);
router.get('/user', authenticate, getUser);

export default router;