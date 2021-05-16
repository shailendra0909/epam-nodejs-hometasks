const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    dialect: 'postgres',
    query: { raw: true }
});

/* const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection(); */


sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables generated!`)
    });



module.exports = sequelize;