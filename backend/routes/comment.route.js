import express from 'express';
import { addComment, getCommentsByArticleId, getAllComments, deleteComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/', addComment);
router.get('/:id', getCommentsByArticleId);
router.get('/', getAllComments);
router.delete('/:id', deleteComment);

export default router;
