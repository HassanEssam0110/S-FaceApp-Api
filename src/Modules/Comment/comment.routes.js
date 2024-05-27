import { Router } from 'express';
import { verifyToken } from '../../Middleware/verifyToken.middleware.js';
import { addComponent, deleteComment, getAllComments, getCommentById, updateComment } from './comment.controller.js';
const router = Router();

router.use(verifyToken)

router.route('/')
    .get(getAllComments)
    .post(addComponent)

router.route('/:id')
    .get(getCommentById)
    .put(updateComment)
    .delete(deleteComment)


export default router;