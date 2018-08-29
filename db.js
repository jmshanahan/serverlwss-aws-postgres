require('dotenv').config({ path: 'variables.env' });
const Sequelize = require('sequelize');
// ElephantSQL endpoint
const sequelize = new Sequelize(
  `postgres://${process.env.ELEPHANT_USERNAME}:${
    process.env.ELEPHANT_PASSWORD
  }@horton.elephantsql.com:5432/uctpaawy`,
  { dialect: 'postgres' }
);

// AWS RDS endpoint
// const sequelize = new Sequelize(
//   `postgres://${process.env.RDS_USERNAME}:${
//     process.env.RDS_PASSWORD
//   }@todo-db.cat3rck2gj0s.eu-west-1.rds.amazonaws.com:5432/todo_db`
// );

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const todo = require('./models/todo')(sequelize, Sequelize);

const db = {
  Sequelize,
  sequelize,
  todo
};
db.sequelize.sync(/* {force:true} */);

module.exports = db;
