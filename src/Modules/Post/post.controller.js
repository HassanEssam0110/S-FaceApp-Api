
import Post from "../../../DB/Models/post.model.js";
import User from "../../../DB/Models/user.model.js";

// add new Post 
export const addPost = async (req, res, next) => {
    const { title, content } = req.body;
    try {
        const post = await Post.create({ title, content, authorId: req.user.id });
        console.log(post);
        res.status(201).json(post);
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
}

// get all posts 
export const getAllPosts = async (req, res, next) => {
    try {
        let findObj = {};
        const { author } = req.query;
        if (author) { findObj.authorId = author }
        const posts = await Post.findAll({ where: findObj });
        res.status(200).json({ posts });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};

// get post by id 
export const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ msg: 'Not Found' });
        }
        res.status(200).json({ post });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};

// get Post With Author 
export const getPostWithAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({
            where: { id },
            attributes: { exclude: ['authorId'] },
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'email']
            }]
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);

    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};

// update post
export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await Post.update(
            { title, content },
            {
                where: {
                    id,
                    authorId: req.user.id
                },
            },
        );
        if (!post[0]) {
            return res.status(400).json({ msg: `you can't update this post` });
        }
        res.status(200).json({ msg: 'update successfully.' });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};

// delete post
export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.destroy(
            {
                where: {
                    id,
                    authorId: req.user.id
                },
            },
        );
        console.log(post);

        if (post === 0) {
            return res.status(400).json({ msg: `you can't remove this post` });
        }
        res.status(200).json({ msg: 'delete successfully.' });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};