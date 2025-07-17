import express from 'express';
import {getCategories} from './routes/category.js'
import { getItemsFromCatId } from './routes/items.js';

const router = new express.Router();

router.get('/categories', getCategories)
router.get('/categories/items/:categoryId', getItemsFromCatId)

export default router;