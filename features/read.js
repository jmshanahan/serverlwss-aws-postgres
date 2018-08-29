const db = require('../db.js');

module.exports.getTodo = (event, context, callback) => {
  const { id } = event.pathParameters;
  db.todo
    .findOne({ where: { id }, attributes: ['id', 'task', 'completed'] })
    .then(todo => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          todo
        })
      };
      callback(null, response);
    })
    .catch(() => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: `There was an error fetching data with id ${id}`
        })
      };
      callback(null, response);
    });
};
module.exports.listTodos = (event, context, callback) => {
  db.todo
    .findAll({ attributes: ['id', 'task', 'completed'] })
    .then(todos => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          todos
        })
      };
      callback(null, response);
    })
    .catch(() => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: `There was an error fetching todos`
        })
      };
      callback(null, response);
    });
};
