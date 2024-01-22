import { Sequelize } from "sequelize";

async function connectToDB(dbURI) {
    console.log(`Connecting to database... ${dbURI}`);

    const sequelize = new Sequelize(dbURI, {
        logging: console.log,
        define: {
            timestamps: false,
            underscored: true
        }
    });

    try {
        await sequelize.authenticate();
        console.log(`Connected to DB`);
    } catch (error) {
        console.error(`Unabel to connect to database:`, error);
    };

    return sequelize;
};

export default connectToDB;