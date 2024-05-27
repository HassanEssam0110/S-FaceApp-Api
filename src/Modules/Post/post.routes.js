import { Router } from 'express';
import { addPost, deletePost, getAllPosts, getPostById, getPostWithAuthor, updatePost } from './post.controller.js';
import { verifyToken } from '../../Middleware/verifyToken.middleware.js';
import { addPostValidation } from '../../Middleware/validation/post.validation.js';
const router = Router();

router.use(verifyToken)

router.route('/')
    .get(getAllPosts)
    .post(addPostValidation, addPost)

router.route('/:id')
    .get(getPostById)
    .put(updatePost)
    .delete(deletePost)

router.route('/:id/author')
    .get(getPostWithAuthor)

export default router;