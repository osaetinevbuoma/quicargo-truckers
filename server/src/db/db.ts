import { Sequelize } from "sequelize";
require('dotenv').config();

const db = (() => {
  const DB_NAME: string = process.env.DB_NAME;
  const DB_USERNAME: string = process.env.DB_USERNAME;
  const DB_PASSWORD: string = process.env.DB_PASSWORD;
  const DB_HOST: string = process.env.DB_HOST;
  const DB_DIALECT: any = process.env.DB_DIALECT;

  let sequelize: Sequelize = null;

  const init = async (): Promise<void> => {
    sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST,
      dialect: DB_DIALECT,
    });

    await sequelize.sync({ alter: true });
  }

  return {
    getInstance: () => {
      if (sequelize === null) init();
      return sequelize;
    }
  }
})();

export default db;
