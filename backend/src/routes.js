import express from 'express';
import {test} from './routes/test.js'

const router = new express.Router();

router.get('/test', test)

export default router;