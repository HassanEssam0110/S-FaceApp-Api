import User from "../../../DB/Models/user.model.js";
import Post from "../../../DB/Models/post.model.js";
import Comment from './../../../DB/Models/comment.model.js';

export const getUserPostWithComments = async (req, res, next) => {
    try {
        const { userId, postId } = req.params;
        const data = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'username', 'email'],
            include: [
                {
                    model: Post,
                    as: 'posts',
                    where: { id: postId },
                    attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: Comment,
                            as: 'comments',
                            attributes: ['id', 'content', 'createdAt', 'updatedAt'],
                        },
                    ]
                }
            ]
        });

        if (!data) {
            return res.status(404).json({ msg: 'Not Found' });
        }

        res.status(200).json({ data });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};

export const getLogedUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id,
            { attributes: { exclude: ['password', 'deletedAt'] } });
        res.status(200).json({ user });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
}