import bcrypt from 'bcryptjs';
import User from '../../DB/Models/user.model.js';
import { generateToken } from '../utils/token.utils.js';


export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 9);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ msg: "register successfully", user });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }
        // Update the isLoggedOut field to false and save the user instance
        user.isLoggedOut = false;
        await user.save();
        const token = generateToken(user.id);
        res.status(200).json({ user, token });
    } catch (err) {
        console.log(`error : ${err}`);
        res.status(500).json({ error: err.message });
    }
};

export const logout = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    user.isLoggedOut = true;
    await user.save();
    res.status(200).json({ message: 'Logged out', user });
};
