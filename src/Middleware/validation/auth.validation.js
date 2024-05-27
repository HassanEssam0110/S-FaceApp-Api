import User from "../../../DB/Models/user.model.js";

// Validate email function
const validateEmail = (email) => {
    const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email);
};



export const registerValidation = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ msg: 'Please provide username, email, and password' })
    }
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ msg: 'Username must be between 3 and 20 characters' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Invalid email" })
    }
    if (password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
    }
    const isExistsEmail = await User.findOne({ where: { email } });
    if (isExistsEmail) {
        return res.status(400).json({ msg: "Email already exists." });
    }
    next();
};

export const loginValidation = async (req, res, next) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ msg: 'Please provide email, and password' })
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Invalid email" })
    }
    if (password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
    }
    next();
};


