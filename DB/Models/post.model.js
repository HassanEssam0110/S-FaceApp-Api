import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.model.js";

const Post = sequelize.define('Post',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
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

// Use a different foreign key name, like 'authorId'
User.hasMany(Post, {
    foreignKey: {
        name: 'authorId',
        allowNull: false,
    },
    as: 'posts'
});

Post.belongsTo(User, {
    foreignKey: {
        name: 'authorId',
        allowNull: false,
    },
    as: 'author'
});

// User.hasMany(Post, {
//     foreignKey: {
//         name: 'author',
//         allowNull: false,
//     },
//     as: 'posts'

// });

// Post.belongsTo(User, {
//     foreignKey: {
//         name: 'author',
//         allowNull: false,
//     },
//     as: 'author'
// });

export default Post;