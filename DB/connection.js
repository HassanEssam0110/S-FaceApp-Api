import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

// const databaseURI ='mysql://uxoviqwtgtq0auz2:taC26kYHYlp0YarPgFPJ@bmeobopihjexmpowwoc2-mysql.services.clever-cloud.com:3306/bmeobopihjexmpowwoc2'
const databaseURI = process.env.DATABASE_URI;

export const sequelize = new Sequelize(databaseURI, {
    dialect: 'mysql'
});

export const dbConnection = async () => {
    try {
        await sequelize.sync({ alter: false, force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
};

