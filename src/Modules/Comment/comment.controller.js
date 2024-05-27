import Comment from "../../../DB/Models/comment.model.js";
import Post from "../../../DB/Models/post.model.js";
import User from "../../../DB/Models/user.model.js";

// add new comment
export const addComponent = async (req, res, next) => {
    try {
        const { content, postId } = req.body;
        const comment = await Comment.create({ userId: req.user.id, postId, content });
        console.log(comment);
        res.status(201).json(comment);
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
}

// get all comments 
export const getAllComments = async (req, res, next) => {
    try {
        let findObj = {};
        const { postId } = req.query;
        if (postId) { findObj.postId = postId }
        const comments = await Comment.findAll({ where: findObj });
        res.status(200).json({ comments });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};

// get post by id 
export const getCommentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ msg: 'Not Found' });
        }
        res.status(200).json({ comment });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};


// update comment
export const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const comment = await Comment.update(
            { content },
            {
                where: {
                    id,
                    userId: req.user.id
                },
            },
        );
        if (!comment[0]) {
            return res.status(400).json({ msg: `you can't update this comment` });
        }
        res.status(200).json({ msg: 'update successfully.' });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};

// delete post
export const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.destroy(
            {
                where: {
                    id,
                    userId: req.user.id
                },
            },
        );
        console.log(comment);

        if (comment === 0) {
            return res.status(400).json({ msg: `you can't remove this comment` });
        }
        res.status(200).json({ msg: 'delete successfully.' });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};