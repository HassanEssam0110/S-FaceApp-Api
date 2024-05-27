import jwt from 'jsonwebtoken';
import User from '../../DB/Models/user.model.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: 'Access denied, please login.' });
        }
        // check if token is valid.
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // check if user is exist.
        const currentUser = await User.findByPk(decoded.userId);
        if (!currentUser) {
            return res.status(401).json({ msg: 'The user that belong to this token does no longer exist.' })
        }
        if (currentUser.isLoggedOut) {
            return res.status(401).json({ msg: 'please login again.' })
        }
        // req.userId = currentUser.userId;
        req.user = currentUser
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid Token, please login again.' })
        }
        else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Expired Token, please login again.' })
        }
        else
            return res.status(500).json({ error })
    }
};