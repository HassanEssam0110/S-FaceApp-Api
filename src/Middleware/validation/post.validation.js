export const addPostValidation = async (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ msg: 'Please provide title and content' })
    }
    if (title.length < 3 || title.length > 60) {
        return res.status(400).json({ msg: 'Title must be between 3 and 60 characters' });
    }
    if (content.length < 6 || content.length > 150) {
        return res.status(400).json({ msg: 'content must be between 6 and 150 characters' });
    }
    next();
};