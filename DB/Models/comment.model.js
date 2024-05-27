import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.model.js";
import Post from "./post.model.js";

const Comment = sequelize.define('Comment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        paranoid: true,
        timestamps: true,
    }
)

Post.hasMany(Comment, {
    foreignKey: {
        name: 'postId',
        allowNull: false,
    },
    as: 'comments'
});

Comment.belongsTo(Post, {
    foreignKey: {
        name: 'postId',
        allowNull: false,
    },
    as: 'post'
});

User.hasMany(Comment, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    as: 'comments'
});

Comment.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    as: 'user'
});

// User.hasMany(Post);
// Post.belongsTo(User);

export default Comment;